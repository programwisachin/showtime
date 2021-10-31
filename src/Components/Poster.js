import React, {useState,useEffect} from 'react'
import "./Poster.css"
function Poster({fetchUrl,title,poster}) {

    const baseUrl = "https://api.themoviedb.org/3"  //base url for request
    const [movie, setMovie] = useState([])

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
    return (
        <div className="posterBlock">
            <h2>{title}</h2>
            <div className="posterDiv">
                {movie.map((element)=>{
                    return <img className={`poster ${poster && 'posterBig'}`} src={`https://image.tmdb.org/t/p/w500${poster?element.poster_path:element.backdrop_path}`} alt={element.name} key={element.id} />
                })}
            </div>
        </div>
    )
}

export default Poster
