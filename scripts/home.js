const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${window.apiKey}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=1000`;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const imageDescriptionBaseUrl = 'https://image.tmdb.org/t/p/w1280';

const baseUrlPopular = `https://api.themoviedb.org/3/discover/movie?api_key=${window.apiKey}&with_genres=27&sort_by=popularity.desc&vote_count.gte=9000`;
const baseUrlUnderrated = `https://api.themoviedb.org/3/discover/movie?api_key=${window.apiKey}&with_genres=27&sort_by=popularity.asc&vote_count.gte=1000`;
const baseUrlRated = `https://api.themoviedb.org/3/discover/movie?api_key=${window.apiKey}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=1000`;
const baseUrlOverhyped = `https://api.themoviedb.org/3/discover/movie?api_key=${window.apiKey}&with_genres=27&sort_by=popularity.asc&vote_count.gte=1000`;

const fetchMovies = async () => {
    const movieList = document.getElementById('movie-list-home');
    movieList.innerHTML = '';

    let page = 1;
    let totalPages = 1; // temp value

    let mostPopularFilm = 0;
    let mostUnderratedFilm = 0;
    let mostRatedFilm = 0;
    let mostOverhypedFilm = 0;

    try {
        // Initialize page for looping
        let page = 1;
        let totalPagesPopular = 1;
        let totalPagesUnderrated = 1;
        let totalPagesRated = 1;
        let totalPagesOverhyped = 1;

        while (page <= totalPagesPopular || page <= totalPagesUnderrated || page <= totalPagesRated || page <= totalPagesOverhyped) {

            // Fetch popular movies
            const urlPopular = `${baseUrlPopular}&page=${page}`;
            const resPopular = await fetch(urlPopular);
            if (!resPopular.ok) throw new Error('Network response was not okay ' + resPopular.statusText);
            const dataPopular = await resPopular.json();

            totalPagesPopular = dataPopular.total_pages;

            dataPopular.results.forEach(movie => {

                if (mostPopularFilm == 0) {
                    const movieTop = document.createElement('p');
                    movieTop.classList.add('movie-top');
                    movieTop.textContent = 'Most popular horror movie';
                    addMovie(movie, movieTop);
                    mostPopularFilm = 1;
                }
                
            });

            // Fetch underrated movies
            const urlUnderrated = `${baseUrlUnderrated}&page=${page}`;
            const resUnderrated = await fetch(urlUnderrated);
            if (!resUnderrated.ok) throw new Error('Network response was not okay ' + resUnderrated.statusText);
            const dataUnderrated = await resUnderrated.json();

            totalPagesUnderrated = dataUnderrated.total_pages;

            dataUnderrated.results.forEach(movie => {
                if (movie.vote_average >= 7 && mostUnderratedFilm == 0) {
                    const movieTop = document.createElement('p');
                    movieTop.classList.add('movie-top');
                    movieTop.textContent = 'Most underrated horror movie';
                    addMovie(movie, movieTop);
                    mostUnderratedFilm = 1;
                }
            });

            // Fetch rated movies
            const urlRated = `${baseUrlRated}&page=${page}`;
            const resRated = await fetch(urlRated);
            if (!resRated.ok) throw new Error('Network response was not okay ' + resRated.statusText);
            const dataRated = await resRated.json();

            totalPagesRated = dataRated.total_pages;

            dataRated.results.forEach(movie => {

                if (mostRatedFilm == 0) {
                    const movieTop = document.createElement('p');
                    movieTop.classList.add('movie-top');
                    movieTop.textContent = 'Most rated horror movie';
                    addMovie(movie, movieTop);
                    mostRatedFilm = 1;
                }
                
            });

            // Fetch overhyped movies
            const urlOverhyped = `${baseUrlOverhyped}&page=${page}`;
            const resOverhyped = await fetch(urlOverhyped);
            if (!resOverhyped.ok) throw new Error('Network response was not okay ' + resOverhyped.statusText);
            const dataOverhyped = await resOverhyped.json();

            totalPagesOverhyped = dataOverhyped.total_pages;

            dataOverhyped.results.forEach(movie => {
                if (movie.vote_average <= 6 && mostOverhypedFilm == 0) {
                    const movieTop = document.createElement('p');
                    movieTop.classList.add('movie-top');
                    movieTop.textContent = 'Most overhyped horror movie';
                    addMovie(movie, movieTop);
                    mostOverhypedFilm = 1;
                }
            });

            // Increment page for the next iteration
            page++;
        }
    }
    catch (err) {
        console.error('Error fetching movies', err);
    }

}

function addMovie(movieParam, movieTopParam) {
    const movieList = document.getElementById('movie-list-home');

    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item-home');

    const movieTitle = document.createElement('p');
    movieTitle.classList.add('movie-title')
    movieTitle.textContent = movieParam.title;

    const movieTitleDescription = document.createElement('p');
    movieTitleDescription.textContent = movieParam.title;
    movieTitleDescription.classList.add('movie-title-description');

    const movieDescriptionItem = document.createElement('div');
    const movieDescription = document.createElement('p');
    movieDescription.textContent = movieParam.overview;

    const movieImage = document.createElement('img');
    movieImage.src = `${imageBaseUrl}${movieParam.poster_path}`;
    movieImage.alt = `${movieParam.title} poster`;
    movieImage.onerror = () => {
        movieImage.alt = 'Image not available';
    };

    const movieImageDescription = document.createElement('img');

    movieImageDescription.src = movieParam.backdrop_path
        ? `${imageDescriptionBaseUrl}${movieParam.backdrop_path}`
        : `${imageDescriptionBaseUrl}${movieParam.poster_path}`;
    movieImageDescription.classList.add('movie-img-description');

    movieItem.appendChild(movieTopParam);
    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieTitle);
    movieList.appendChild(movieItem);

    movieItem.appendChild(movieDescriptionItem);
    movieDescriptionItem.appendChild(movieTitleDescription);
    movieDescriptionItem.appendChild(movieImageDescription);
    movieDescriptionItem.appendChild(movieDescription);

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

  
// Call the function to fetch and display movies
fetchMovies();