import React, {useState,useEffect} from 'react'
import "./Banner.css"
function Banner({fetchUrl}) {

    const baseUrl = "https://api.themoviedb.org/3"  //base url required to make any request 
    const [movie, setMovie] = useState([])
    useEffect(() => {

        async function fetchData(){
            const response = await fetch(`${baseUrl}${fetchUrl}`)
            const json = await response.json()
            setMovie(json.results[Math.floor(Math.random()*json.results.length-1)])  //fetching random movie from the response
            return response
        }
        fetchData()
        // eslint-disable-next-line
    }, [])
    return (
        <header className="banner" style={{backgroundSize:"cover",backgroundImage:`url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,backgroundPosition:"center center"}}>  {/*setting background image of the banner*/}
            <div className="bannerContent">
            <h1 className="bannerHead">{movie?.name||movie?.original_name?.movie?.title}</h1>  {/*setting title*/}
            <h1 className="bannerDesc">
                {movie?.overview?movie?.overview.slice(0,150):""}...   {/*setting description of banner of only 150 characters*/}
            </h1>
            </div>
            <div className="bannerFade"></div>   {/*div for fading effect on banner image*/}
        </header>
    )
}

export default Banner