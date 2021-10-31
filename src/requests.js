const apiKey = process.env.REACT_APP_MOVIES_API  //All request required for website exported
const request = {
    fetchTrending:`/trending/all/week?api_key=${apiKey}&language=en-US`,
    fetchNetfixOriginal:`/discover/tv?api_key=${apiKey}&with_network=213`,
    fetchTopRated:`/movie/top_rated?api_key=${apiKey}&language=en-US`,
    fetchActionMovie:`/discover/movie?api_key=${apiKey}&with_genres=28`,
    fetchComedyMovie:`/discover/movie?api_key=${apiKey}&with_genres=35`,
    fetchHorrorMovie:`/discover/movie?api_key=${apiKey}&with_genres=27`,
    fetchRomanceMovie:`/discover/movie?api_key=${apiKey}&with_genres=10749`,
    fetchDocumentaries:`/discover/movie?api_key=${apiKey}&with_genres=99`,
}

export default request