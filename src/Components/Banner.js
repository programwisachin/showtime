import React, { useState, useEffect } from "react";
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";

function Banner({ fetchUrl }) {
	const baseUrl = "https://api.themoviedb.org/3"; //base url required to make any request
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState(""); //storing url of the trailer
	const [buttonState, setButtonState] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const length = movies.length;
	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`${baseUrl}${fetchUrl}`);
			const json = await response.json();
			setMovies(json.results.slice(0, 4)); //fetching random movie from the response
			console.log(json.results.slice(0, 4));
			return response;
		}
		fetchData();
		// eslint-disable-next-line
	}, []);
	const opts = {
		//options for displaying trailer

		height: "390",
		width: "890",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		if (trailerUrl) {
			setButtonState(true);
			setTrailerUrl("");
		} else {
			movieTrailer(
				movie?.original_name || movie?.name || movie?.title || ""
			)
				.then((url) => {
					const urlParam = new URLSearchParams(new URL(url).search); //grabbing essential id (v=...) from the url
					setTrailerUrl(urlParam.get("v"));
					setButtonState(false);
				})
				.catch((error) => {
					console.log(error.message); // if error occured display it on console
				});
		}
	};

	const nextSlide = () => {
		setCurrentPage(currentPage === length - 1 ? 0 : currentPage + 1);
	};

	const prevSlide = () => {
		setCurrentPage(currentPage === 0 ? length - 1 : currentPage - 1);
	};

	return (
		<header>
			<NavigateBeforeOutlinedIcon
				style={{ fontSize: "3em", color: "white" }}
				className="leftArrow"
				onClick={prevSlide}
			/>
			<NavigateNextOutlinedIcon
				style={{ fontSize: "3em", color: "white" }}
				className="rightArrow"
				onClick={nextSlide}
			/>
			{movies.map((movie, index) => {
				return (
					<>
						{index === currentPage && (
							<div className="banner" key={index}>
								<div className="bannerContent">
									<h1 className="bannerHead">
										{movie?.name ||
											movie?.original_name ||
											movie?.title}
									</h1>
									<h1 className="bannerDesc">
										{movie?.overview
											? movie?.overview.slice(0, 150)
											: ""}
										...
									</h1>
									<button
										className="bannerBtn"
										onClick={() => {
											handleClick(movie);
										}}
									>
										{buttonState ? "Watch Now " : "Close"}
									</button>
								</div>
								<div
									className="bannerImg"
									style={{
										backgroundSize: "cover",
										backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
										backgroundPosition: "center center",
										width: "65%",
									}}
								>
									<div className="bannerFade"></div>
								</div>
							</div>
						)}
					</>
				);
			})}

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					padding: "8px",
				}}
			>
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}{" "}
				{/*trailer block*/}
			</div>
		</header>
	);
}

export default Banner;
