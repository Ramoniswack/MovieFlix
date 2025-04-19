import React, {useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';

import MovieCard from './components/MovieCard';


const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const API_OPTIONS =
{
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);


const fetchMovies = async() =>
{
  setisLoading(true);
  setErrorMessage('');
  try{
    const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);

    // alert(response);

    if (!response.ok)
    {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();

    if(data.response === 'False')
    {
      setErrorMessage(data.Error || ' Failed to fetch movies');
      setMovieList([]);
        return;
      
    }
    setMovieList(data.results || []);
  } catch(error)
  {

    console.error(`Error fetching movies: ${error}`);
    setErrorMessage('Error fetching movies. Please try again later.');

  } finally {
    setisLoading(false);
  }
}

  useEffect( () =>
  {
    fetchMovies();
  }, []);
  
  return (


  <main>
    <div className='pattern'/>

    <div className='wrapper'>
      <header>
        <h1>
          <img src='hero-img.png' alt='Hero photos'></img>
          Find<span className='text-gradient'>  Movies</span>  You'll Enjoy Without the Hassle
        </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      </header>

    <section className='all-movies'>
      <h2 className='mt-[40px]'>All Movies</h2>

    {isLoading ? (

    <Spinner />

          // <p className="text-white">Loading...</p>
    ) :errorMessage ? (
      <p className='text-red-500'>{errorMessage} </p>)
    : (
      <ul>
        {MovieList.map((movie) =>(

          <MovieCard key={movie.id} movie={movie} />
          // <p key={movie.id} className='text-white'>{movie.title}</p>
        ))}
      </ul>
    ) }

    </section>
    </div>

  </main>

  )
}

export default App

