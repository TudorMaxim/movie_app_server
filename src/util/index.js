module.exports = {
    movieInDb: (movie, moviesFromDb) => {
        return moviesFromDb.map(movie => movie.id).includes(movie.id)
    } 
}