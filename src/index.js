import './css/styles.css';
import ImagesApiService from './images-service';

import Notiflix from 'notiflix';

const refs = {
    searchForm: document.querySelector('#search-form'),
    imagesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};
const imagesApiService = new ImagesApiService();


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.classList.add('is-hiden');

function onSearch(event) {
    event.preventDefault();

    clearImagesContainer();
    imagesApiService.query = event.currentTarget.elements.searchQuery.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(data => {
        if (data.length === 0) {
            clearImagesContainer();
            onEmptyArray();            
            return;
         };
        renderImagesList(data);
        refs.loadMoreBtn.classList.remove('is-hiden');
    });    
    
 };

function onLoadMore(event) {
    event.preventDefault();

imagesApiService.fetchImages().then(renderImagesList);
     
};

function renderImagesList(images) {
    const markup = images
        .map(({ webformatURL,tags,likes,views,comments,downloads}) => {
            return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      ${likes}<b>Likes</b>
    </p>
    <p class="info-item">
      ${views}<b>Views</b>
    </p>
    <p class="info-item">
      ${comments}<b>Comments</b>
    </p>
    <p class="info-item">
      ${downloads}<b>Downloads</b>
    </p>
  </div>
</div>`;
    })
    .join("");
    
        refs.imagesContainer.insertAdjacentHTML("beforeend", markup);
};

function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hiden');
};
 
function onEmptyArray() {
   Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
 }