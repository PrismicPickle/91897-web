document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();
    const currentPage = currentPath === '' || currentPath === 'index.html'
        ? 'home'
        : currentPath.replace(/\.html$/, '');

    document.querySelectorAll('.left-menu a[data-page]').forEach(link => {
        const page = link.getAttribute('data-page').toLowerCase();
        link.classList.toggle('active', page === currentPage);
    });
});
