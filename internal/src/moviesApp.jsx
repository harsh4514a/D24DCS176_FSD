
import React, { useState } from 'react';
import movies from './movies';
function MovieApp() {
  const [movie, setMovie] = useState('');
  const [message, setMessage] = useState('');
  const apiKey = 'c3ea6ca0f00823ac32f3e461237d6d62';
 const apiUrl = 'https://www.themoviedb.org/movie';
  const getMovie = async () => {
    if (movie.trim() === '') {
      setMessage('Please enter a movie name.');
      return;
    }
    if (!movies.includes(movie)) {
      setMessage('Movie not found');
      return;
    }
    try {
      const response = await fetch(apiUrl + '?query=' + movie + '&api_key=' + apiKey + '&language=en-US');
      if (!response.ok) {
        throw new Error('Movie not found');
      }
      const data = await response.json();
      setMessage(`Movie found: ${data.title}`);
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setMessage('Network error or CORS issue. Please check your API key and network.');
      } else {
        setMessage(error.message);
      }
    }
  };
  return (
    <div>
      <h1>Movies App</h1>
      <input
        type="text"
        placeholder="Enter movie name"
        value={movie}
        onChange={setMovie}
        list="moviesList"
      />
      <datalist id="moviesList">
        {movies.map((movieName) => (
          <option key={movieName} value={movieName} />
        ))}
      </datalist>
      <button onClick={getMovie}>Get Movie</button>
      <p>{message}</p>

    </div>
  );
}

export default MovieApp;