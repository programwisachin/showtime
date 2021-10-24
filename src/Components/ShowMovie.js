import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import ShowItems from './ShowItems'
import Spinner from './Spinner';

const ShowMovie = (props) => {

    //Creating variables using useState hook
    const [articles, setArticles] = useState([])  //API response is stored in this variable as json
    const [totalResult, setTotalResult] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    // Function to fetch movie
    const fetchMovies = async () => {

        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${props.apiKey}&language=en-US&page=1`
        setLoading(true)
        const data = await fetch(url)  //Fetching movies using fetch() function and storing it in to the data variable
        const parsedData = await data.json() // Response is converted into json format
        setArticles(parsedData.results)
        setLoading(false)
        setTotalResult(parsedData.total_results)
    }

    useEffect(() => {
        fetchMovies() // After component is mounted function is invoked
        // eslint-disable-next-line
    }, [])


    // Function to fetch more data for infinite scroll
    const fetchMoreData = async () => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${props.apiKey}&language=en-US&page=${page + 1}`
        setPage(page + 1)
        const data = await fetch(url)
        const parsedData = await data.json()
        setArticles(articles.concat(parsedData.results))
        setTotalResult(parsedData.total_results)

    }
    return (

        <>
            <div style={{ backgroundColor: "black", color: "white", marginTop: "55px", padding: "23px" }}>
                {loading && <Spinner />}   {/*If loading is true then show spinner*/}
                <div className="container mx-3 my-3"><h1 className="text-center"> Show Time</h1></div>
                <h2 className="my-3 mx-3">Popular Movies</h2>
                <InfiniteScroll
                    dataLength={articles.length} //This is important field to render the next data
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResult}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row ">  {/*Displaying movie card*/}
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.id} >
                                    <ShowItems posterUrl={element.poster_path} title={element.title} overview={element.overview.slice(0, 88)} ratings={element.vote_average} releaseDate={element.release_date} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}

export default ShowMovie
