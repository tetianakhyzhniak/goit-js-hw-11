import Notiflix from 'notiflix';

import { getPhotos } from './js/pixApi';
import { createMarkUp, gallery, buttonLoad } from './markUp';

const form = document.querySelector('.search-form');

let page = 1;
let searchQuery = '';
let totalHits = 0;

form.addEventListener('submit', onSubmit);
buttonLoad.addEventListener('click', onLoadMore);
function onSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchQuery = e.currentTarget.elements.searchQuery.value;
  getPhotos(searchQuery, page).then(data => {
    if (data.hits.length !== 0) {
      createMarkUp(data);
      totalHits = data.totalHits - 40;
      return;
    }
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  });
  e.currentTarget.reset();
}
function onLoadMore() {
  page += 1;
  totalHits -= 40;
  
  getPhotos(searchQuery, page).then(data => {
     createMarkUp(data);
     if (totalHits < 0) {
         Notiflix.Notify.failure(
             "We're sorry, but you've reached the end of search results."
             );
             buttonLoad.classList.add('is-hidden');
         }
    }
   );
}
