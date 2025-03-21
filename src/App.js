import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?t=${searchTerm}&apikey=1ca2ea37`
      );
      setMovies(res.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies", error);

    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?t=${id}&apikey=1ca2ea37`
      );
      setSelectedMovie(res.data);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <h1>Movie Search App</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchMovies}>Search</button>

      {selectedMovie ? (
        <div>
          <h2>{selectedMovie.Title}</h2>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <button onClick={() => setSelectedMovie(null)}>Back</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              style={{ margin: 10, cursor: "pointer" }}
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <img src={movie.Poster} alt={movie.Title} width="100" />
              <p>{movie.Title} ({movie.Year})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
