document.querySelectorAll('.movie-item').forEach(item => {
    const description = item.querySelector('div');
    
    item.addEventListener('mouseenter', () => {
        description.style.display = 'block';
    });

    item.addEventListener('mouseleave', () => {
        description.style.display = 'none';
    });
});
