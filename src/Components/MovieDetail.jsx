import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export const MovieDetail = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const apiKey = 'e1cb8e37ff2e97b7a083743b4ac8b237';
    const [popularMovies, setPopularMovies] = useState([]);
    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
                setPopularMovies(response.data.results);
                setMoviesToDisplay(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPopularMovies();
    }, [apiKey]);

    useEffect(() => {
        const filteredMovies = popularMovies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMoviesToDisplay(filteredMovies);
    }, [searchQuery, popularMovies]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-judul">
                        <h1><b>MovieList</b></h1>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="What do you want to watch?"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                    <button className="btn btn-outline-danger login-btn">Login</button>
                    <button className="btn btn-danger register-btn">Register</button>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    {moviesToDisplay.map((movie, index) => (
                        <div key={index} className="col-md-3" style={{ marginBottom: '50px' }}>
                            <div className="card">
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className="card" alt={movie.title} />
                                <div className="card-body" style={{ height: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <b><h3 className="card-title" style={{ color: '#000', textAlign: 'center' }}>{movie.title}</h3></b>
                                    <p className="card-text" style={{ color: '#000', textAlign: 'justify' }}>{movie.overview}</p>
                                    <a href={`https://www.youtube.com/watch?v=GgKmhDaVo48`} className="btn btn-danger register-btn" style={{ width: '60%', borderRadius: '20px' }}>WATCH TRAILER</a>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};
