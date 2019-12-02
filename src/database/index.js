const pg = require("pg");

module.exports = class MovieDatabase {
    constructor() {
        this.pool = new pg.Pool({
            user: "postgres",
            host: "localhost",
            database: "movie_app_mobile",
            password: "root",
            port: 5432
        })
    }

    async getAll() {
        const result = await this.pool.query("SELECT * FROM movies")
        return result.rows
    }

    async getMovieById(id) {
        const result = await this.pool.query("SELECT * FROM movies WHERE id = $1", [id])
        return result.rows[0]
    }

    async insert(movie) {
        const result = await this.pool.query(
            "INSERT INTO movies(name, type, genre, priority) VALUES ($1, $2, $3, $4)",
            [movie.name, movie.type, movie.genre, movie.priority]
        )
        return result.rowCount
    }

    async delete(id) {
        const result = await this.pool.query("DELETE FROM movies WHERE id = $1", [id])
        return result.rowCount
    }

    async update(newMovie) {
        const result = await this.pool.query(
            "UPDATE movies SET name = $2, type = $3, genre = $4, priority = $5 WHERE id = $1",
            [newMovie.id, newMovie.name, newMovie.type, newMovie.genre, newMovie.priority]
        )
        return result.rowCount
    }
}