import ApiService from'./apiService';
import cardImgTpl from './templates/cardImgTpl.hbs';
// import galleryTpl from './templates/galleryTpl.hbs';
const debounce = require('lodash.debounce');

const apiService = new ApiService();

const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.button');
const gallery = document.querySelector('.gallery');

// const { y } = gallery.getBoundingClientRect();
// const screenHeight = document.documentElement.clientHeight;

searchForm.addEventListener('input', debounce(onSearch,1000));
loadMore.addEventListener('click', loadMoreClick);
loadMore.addEventListener('click', onScrollTo);

function onSearch(evt) {
    evt.preventDefault();
    clearContainer()
    apiService.query = evt.target.value;
    apiService.resetPage();
    apiService.fetchImages().then(galleryMarkup);
};

function loadMoreClick(evt) {
    apiService.fetchImages().then(galleryMarkup);
    
    scroll();
}

function galleryMarkup(hits) {
    gallery.insertAdjacentHTML('beforeend', cardImgTpl(hits));
    
}

function clearContainer() {
    gallery.innerHTML = '';
};

function onScrollTo() {
        let value = document.body.scrollHeight;
         setTimeout(() => {
          window.scrollTo({
            top: value,
            left: 0,
            behavior: 'smooth',
          });
        }, 1000);
}

// function scroll() {
    
//     window.scrollTo({
//       top: screenHeight - y,
//       behavior: 'smooth'
//     });
// }

