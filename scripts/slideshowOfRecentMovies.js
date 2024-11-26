let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

showSlides(slideIndex);

/*
function addMovieSlideshow(movieParam) {
    const movieSlideshow = document.getElementById('slideshow-container');

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
    movieImage.src = `${imageBaseUrl}${movieParam.backdrop_path}`;
    movieImage.alt = `${movieParam.title} poster`;
    movieImage.onerror = () => {
        movieImage.alt = 'Image not available';
    };

    const movieImageDescription = document.createElement('img');

    movieImageDescription.src = movieParam.poster_path
        ? `${imageDescriptionBaseUrl}${movieParam.poster_path}`
        : `${imageDescriptionBaseUrl}${movieParam.backdrop_path}`;
    movieImageDescription.classList.add('movie-img-description');

    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieTitle);
    movieSlideshow.appendChild(movieItem);

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
*/

fetchSlideshowMovies();