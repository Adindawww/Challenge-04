import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export const Home1 = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSlideCarousel1, setActiveSlideCarousel1] = useState(0);
    const [activeSlideCarousel2, setActiveSlideCarousel2] = useState(0);
    const apiKey = 'e1cb8e37ff2e97b7a083743b4ac8b237';
    const [popularMovies, setPopularMovies] = useState([]);
    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const navigate = useNavigate()

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
        setActiveSlideCarousel2(0);
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

            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    {popularMovies.map((movie, index) => (
                        <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === activeSlideCarousel1 ? 'active' : ''} aria-label={`Slide ${index + 1}`}></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {popularMovies.map((movie, index) => (
                        <div key={index} className={`carousel-item ${index === activeSlideCarousel1 ? 'active' : ''}`}>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className="d-block w-100" alt={`Slide ${index + 1}`} style={{ maxHeight: '1000px' }} />
                            <div className="carousel-caption">
                                <h3><b>{movie.title}</b></h3>
                                <p>{movie.overview}</p>
                                <div>
                                    <a href="https://www.youtube.com/watch?v=GgKmhDaVo48" className="btn btn-danger register-btn" style={{ width: '150px' }}>WATCH TRAILER</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {searchQuery && searchQuery.length > 0 && (
                <div className='search-result'>
                    <h4><b>Search Result: "{searchQuery}"</b></h4>
                </div>
            )}

            {!searchQuery && (
                <div className='judul-home2'>
                    <h3><b>Popular Movies</b></h3>
                    <p><b>See All Movie</b></p>
                </div>
            )}

            <div id="carouselExample2" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {(moviesToDisplay.length > 0 ? moviesToDisplay : []).reduce((chunks, movie, index) => {
                        if (index % 4 === 0) {
                            chunks.push(moviesToDisplay.slice(index, index + 4));
                        }
                        return chunks;
                    }, []).map((chunk, slideIndex) => (
                        <div key={slideIndex} className={`carousel-item ${slideIndex === activeSlideCarousel2 ? 'active' : ''}`}>
                            <div className="d-flex justify-content-between">
                                {chunk.map((movie, itemIndex) => (
                                    <div key={itemIndex} className="carousel-image-container" onClick={() => setActiveSlideCarousel2(slideIndex)}>
                                        <img
                                            onClick={() => navigate(`/DetailMovies/${movie.id}`)}
                                            key={movie.id}
                                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            className="d-block"
                                            style={{ width: '75%', maxHeight: '500px', borderRadius: '10px', cursor: 'pointer' }}
                                            alt={`Slide ${slideIndex * 4 + itemIndex + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample2" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample2" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

