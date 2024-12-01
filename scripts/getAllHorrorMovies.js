const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${window.apiKey}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=2000`;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const imageDescriptionBaseUrl = 'https://image.tmdb.org/t/p/w1280';

const fetchMovies = async () => {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    let page = 1;
    let totalPages = 1;

    try {
        while (page <= totalPages) {
            const url = `${baseUrl}&page=${page}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not okay ' + res.statusText);

            const data = await res.json();
            totalPages = data.total_pages;

            for (const movie of data.results) {
                const movieItem = document.createElement('div');
                movieItem.classList.add('movie-item');

                const movieTitle = document.createElement('p');
                movieTitle.textContent = movie.title;

                const movieTitleDescription = document.createElement('p');
                movieTitleDescription.textContent = movie.title;
                movieTitleDescription.classList.add('movie-title-description');

                const movieDescriptionItem = document.createElement('div');
                const movieDescription = document.createElement('p');
                movieDescription.textContent = movie.overview;

                const movieRating = document.createElement('p');
                movieRating.textContent = `Rating: ${movie.vote_average}`;
                movieRating.classList.add('movie-rating');

                const movieVotes = document.createElement('p');
                movieVotes.textContent = `Number of votes: ${movie.vote_count}`;
                movieVotes.classList.add('movie-votes');

                const movieImage = document.createElement('img');
                movieImage.src = `${imageBaseUrl}${movie.poster_path}`;
                movieImage.alt = `${movie.title} poster`;
                movieImage.onerror = () => {
                    movieImage.alt = 'Image not available';
                };

                const movieImageDescription = document.createElement('img');
                movieImageDescription.src = movie.backdrop_path
                    ? `${imageDescriptionBaseUrl}${movie.backdrop_path}`
                    : `${imageDescriptionBaseUrl}${movie.poster_path}`;
                movieImageDescription.classList.add('movie-img-description');

                // Fetch and add cast information
                const castUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${window.apiKey}`;
                const castResponse = await fetch(castUrl);
                const castData = await castResponse.json();

                const castList = document.createElement('p');
                const castNames = castData.cast
                    .slice(0, 5) // Get top 5 cast members
                    .map(actor => actor.name)
                    .join(', ');
                castList.textContent = `Cast: ${castNames}`;
                castList.classList.add('movie-cast');

                // Append elements
                movieItem.appendChild(movieImage);
                movieItem.appendChild(movieTitle);
                movieList.appendChild(movieItem);

                movieDescriptionItem.appendChild(movieTitleDescription);
                movieDescriptionItem.appendChild(movieImageDescription);
                movieDescriptionItem.appendChild(movieDescription);
                movieDescriptionItem.appendChild(movieRating);
                movieDescriptionItem.appendChild(movieVotes);
                movieDescriptionItem.appendChild(castList);

                movieItem.appendChild(movieDescriptionItem);


                movieImage.addEventListener('click', () => {
                    movieDescriptionItem.style.display = 'block';
                    movieDescriptionItem.style.opacity = '1';
                });

                document.addEventListener('click', (event) => {
                    if (
                        !movieDescriptionItem.contains(event.target) &&
                        !movieImage.contains(event.target)
                    ) {
                        movieDescriptionItem.style.display = 'none';
                        movieDescriptionItem.style.opacity = '0';
                    }
                });

                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        movieDescriptionItem.style.display = 'none';
                        movieDescriptionItem.style.opacity = '0';
                        document.body.classList.remove('no-scroll');
                    }
                });
            }
            page++;
        }
    } catch (err) {
        console.error('Error fetching movies', err);
    }
};

// Call the function to fetch and display movies
fetchMovies();
