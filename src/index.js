const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./database");

const app = express();
const port = 3000;

const db = new Database();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/movies", async (request, response, next) => {
    let movies = await db.getAll().catch(err => next(err))
    response.status(200).json({
        "movies": movies
    })
})

app.get("/movies/:id", async (request, response, next) => {
    const movieId = parseInt(request.params.id)
    console.log(movieId)
    const movie = await db.getMovieById(movieId).catch(err => next(err))
    if (movie) {
        response.status(200).json({
            "movie": movie
        })
    } else {
        response.status(404).json({
            "messages": `Error: Movie with id ${movieId} does not exist`
        })
    }
    
})

app.post("/movies", async (request, response, next) => {
    const movie = request.body
    movie.priority = parseFloat(movie.priority)

    const cnt = await db.insert(movie).catch(err => next(err))
    if (cnt > 0) {
        response.status(200).json({
            "message": "Movie successfully inserted"
        })
    } else {
        response.status(400).json({
            "message": "Error: Could not insert the movie"
        })
    }
})

app.delete("/movies/:id", async (request, response, next) => {
    const movieId = parseInt(request.params.id);
    const cnt = await db.delete(movieId).catch(err => next(err))
    if (cnt > 0) {
        response.status(200).json({
            "message": "Movie successfully deleted"
        })
    } else {
        response.status(400).json({
            "message": `Error: Movie with id ${movieId} does not exist`
        })
    }
})

app.patch("/movies/:id", async (request, response, next) => {
    const movieId = parseInt(request.params.id);
    const movie = request.body
    movie.id = movieId
    movie.priority = parseFloat(movie.priority)

    const cnt = await db.update(movie).catch(err => next(err))
    if (cnt > 0) {
        response.status(200).json({
            "message": "Movie successfully updated"
        })
    } else {
        response.status(400).json({
            "message": "Error: Could not update the movie"
        })
    }
})

app.listen(port, function () {
    console.log(`Server listenning on port ${port}`)
})