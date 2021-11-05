import React, {useState,useEffect} from 'react'
import "./Poster.css"
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

function Poster({fetchUrl,title,poster}) {

    const baseUrl = "https://api.themoviedb.org/3"  //base url for request
    const [movie, setMovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")  //storing url of the trailer

    useEffect(() => {

        async function fetchData(){
            const response = await fetch(`${baseUrl}${fetchUrl}`)
            const json = await response.json()
            setMovie(json.results)   //storing response in movie array
            return response
            // eslint-disable-next-line
        }
        fetchData()
        
    }, [fetchUrl])   //setting url as a dependency

    const opts = {   //options for displaying trailer

        height: '390',
        width: '890',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }

    const handleClick = (movie)=>{

        if(trailerUrl){
            setTrailerUrl("")
        }
        else{
            movieTrailer(movie?.original_name || movie?.name || movie?.title || "")
            .then((url)=>{
                const urlParam = new URLSearchParams(new URL(url).search)  //grabbing essential id (v=...) from the url
                setTrailerUrl(urlParam.get('v'))
            }).catch((error)=>{
                console.log(error.message)   // if error occured display it on console
            })
        }
    }
      
    return (
        <div className="posterBlock">
            <h2>{title}</h2>
            <div className="posterDiv">
                {movie.map((element)=>{
                    return <img className={`poster ${poster && 'posterBig'}`} src={`https://image.tmdb.org/t/p/w500${poster?element.poster_path:element.backdrop_path}`} alt={element.name} key={element.id} onClick={()=>{handleClick(element)}}/>
                })}
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}  {/*trailer block*/}
            </div>
        </div>
    )
}

export default Poster
