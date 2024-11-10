const apiKey = '74caefcd2cdb0278305d13b79d556f87';
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=100`;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const fetchMovies = async () => {
    const movieList = document.getElementById('movie-list');
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
                movieItem.classList.add('movie-item');

                const movieTitle = document.createElement('p');
                movieTitle.textContent = movie.title;

                const movieImage = document.createElement('img');
                movieImage.src = `${imageBaseUrl}${movie.poster_path}`;
                movieImage.alt = `${movie.title} poster`;
                movieImage.onerror = () => {
                    movieImage.alt = 'Image not available';
                };

                movieItem.appendChild(movieImage);
                movieItem.appendChild(movieTitle);
                movieList.appendChild(movieItem);
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