import React, { useState, useEffect } from "react";
import "./Banner.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
function Banner({ fetchUrl }) {
	const baseUrl = "https://api.themoviedb.org/3"; //base url required to make any request
	const [movie, setMovie] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("") //storing url of the trailer
	const [buttonState, setButtonState] = useState(true)

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`${baseUrl}${fetchUrl}`);
			const json = await response.json();
			setMovie(
				json.results[
					Math.floor(Math.random() * json.results.length - 1)
				]
			); //fetching random movie from the response
			return response;
		}
		fetchData();
		// eslint-disable-next-line
	}, []);
	const opts = { //options for displaying trailer

        height: '390',
        width: '890',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }

    const handleClick = (movie)=>{

        if(trailerUrl){
			setButtonState(true)
            setTrailerUrl("")
        }
        else{
            movieTrailer(movie?.original_name || movie?.name || movie?.title || "")
            .then((url)=>{
                const urlParam = new URLSearchParams(new URL(url).search)  //grabbing essential id (v=...) from the url
                setTrailerUrl(urlParam.get('v'))
				setButtonState(false)
            }).catch((error)=>{
                console.log(error.message)  // if error occured display it on console
            })
        }
    }
      
	return (
		<header>
			<div className="banner" style={{display:"flex",justifyContent:"space-between"}}>
			<div className="bannerContent">
				<h1 className="bannerHead">
					{movie?.name || movie?.original_name || movie?.title}
				</h1>
				{/*setting title*/}
				<h1 className="bannerDesc">
					{movie?.overview ? movie?.overview.slice(0, 150) : ""}...
					{/*setting description of banner of only 150 characters*/}
				</h1>
				<button className="bannerBtn"  onClick={()=>{handleClick(movie)}}>{buttonState?"Watch Now":"Close"}</button> {/*button to play banner show/movie */}
			</div>
			{/*setting background image of the banner*/}
			<div
				className="bannerImg"
				style={{
					backgroundSize: "cover",
					backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
					backgroundPosition: "center center",
					width: "65%",
				}}
				>
				{/*div for fading effect on banner image*/}
				<div className="bannerFade"></div>
			</div>
			</div>
			<div style={{display:"flex",justifyContent:"center",padding:"8px"}}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}  {/*trailer block*/}
            </div>
		</header>
	);
}

export default Banner;
