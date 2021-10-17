import React from 'react'

const ShowItems = (props) => {

    const {posterUrl,title,overview,ratings,releaseDate} = props  //Destructuring props
    return (
        <div className="container my-3" >
            <div className="card" style={{ width: "18rem" }}>
                <img src = {`https://image.tmdb.org/t/p/w500${posterUrl}`} className="card-img-top" alt="" />
                <div className="card-body" style={{backgroundColor:"black",color:"white"}}>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{overview} .....</p>
                    <p className="card-text text-muted">Ratings - {ratings}</p>
                    <p className="card-text text-muted">Date - {releaseDate}</p>
                </div>
            </div>


        </div>
    )
}

export default ShowItems
// "https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg"