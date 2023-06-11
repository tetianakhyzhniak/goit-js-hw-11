
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const gallery = document.querySelector('.gallery');
export const buttonLoad = document.querySelector(".load-more");

let galleryModal = new SimpleLightbox('.gallery a');

export function createMarkUp({ hits }) {
  const markUp = hits
    .map(({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    })=> `<a href='${largeImageURL}' class="card-link ">
            <div class="photo-card">
    <img class= "photo" src="${webformatURL}" alt="${tags}" loading="lazy" width="200" height="150"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item"
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
    </div>
  </a>`)
    .join('');
  
  gallery.insertAdjacentHTML("beforeend", markUp);
  galleryModal.refresh();

  buttonLoad.classList.remove("is-hidden");
    
}

