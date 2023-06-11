import Notiflix from 'notiflix';

import { getPhotos } from './js/pixApi';
import { createMarkUp, gallery, buttonLoad } from './markUp';

const form = document.querySelector('.search-form');

let page = 1;
let searchQuery = '';
let totalHits = 0;

form.addEventListener('submit', onSubmit);
buttonLoad.addEventListener('click', onLoadMore);
async function onSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
   if (searchQuery.length === 0) {
    Notiflix.Notify.failure('Please enter a search query.');
    return;
   }
  try {
    const data = await getPhotos(searchQuery, page);
       if (data.hits.length !== 0) {
      createMarkUp(data);
      totalHits = data.totalHits - 40;
      return;
    }
  } catch (error) {
     Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  e.currentTarget.reset();
}
async function onLoadMore() {
  page += 1;
  totalHits -= 40;

  try {
    const data = await getPhotos(searchQuery, page);
createMarkUp(data);
     if (totalHits < 0) {
         Notiflix.Notify.failure(
             "We're sorry, but you've reached the end of search results."
             );
             buttonLoad.classList.add('is-hidden');
         }
  } catch (error) {
    console.error(error)
  }
  
}
