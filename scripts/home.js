const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${window.apiKey}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=1000`;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const imageDescriptionBaseUrl = 'https://image.tmdb.org/t/p/w1280';

const fetchMovies = async () => {
    const movieList = document.getElementById('movie-list-home');
    movieList.innerHTML = '';

    let page = 1;
    let totalPages = 1; // temp value
  
    try {
        while (page <= totalPages) {
            const url = `${baseUrl}&page=${page}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not okay ' + res.statusText);

            const data = await res.json();

            totalPages = data.total_pages;
            console.log(totalPages);

            data.results.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('movie-item-home');

                const movieTitle = document.createElement('p');
                movieTitle.textContent = movie.title;

                const movieTitleDescription = document.createElement('p');
                movieTitleDescription.textContent = movie.title;
                movieTitleDescription.classList.add('movie-title-description');

                const movieDescriptionItem = document.createElement('div');
                const movieDescription = document.createElement('p');
                movieDescription.textContent = movie.overview;
                // movieDescription.style.display = "none";

                const movieImage = document.createElement('img');
                movieImage.src = `${imageBaseUrl}${movie.poster_path}`;
                movieImage.alt = `${movie.title} poster`;
                movieImage.onerror = () => {
                    movieImage.alt = 'Image not available';
                };

                const movieImageDescription = document.createElement('img');

                if (movie.backdrop_path == null) {
                    movieImageDescription.src = `${imageDescriptionBaseUrl}${movie.poster_path}`;
                } else {
                    movieImageDescription.src = `${imageDescriptionBaseUrl}${movie.backdrop_path}`;
                }

                movieImageDescription.classList.add('movie-img-description');

                movieItem.appendChild(movieImage);
                movieItem.appendChild(movieTitle);
                movieList.appendChild(movieItem);

                movieItem.appendChild(movieDescriptionItem);
                movieDescriptionItem.appendChild(movieTitleDescription);
                movieDescriptionItem.appendChild(movieImageDescription);
                movieDescriptionItem.appendChild(movieDescription);
            });

            page++;
        }
    }
    catch (err) {
        console.error('Error fetching movies', err);
    }
}
  
// Call the function to fetch and display movies
fetchMovies();