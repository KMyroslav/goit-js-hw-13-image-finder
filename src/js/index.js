import '../sass/main.scss';
import photoCardTpl from '../templates/photo-cards.hbs';
import fetchPhotos from './apiService';

const debounce = require('lodash.debounce');
const searchQuery = document.querySelector('#searchQuery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');
let page = 1;

searchQuery.addEventListener('input', debounce(onUserInput, 500));
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onUserInput(e) {
  loadMoreBtn.classList.remove('visually-hidden');
  e.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  renderCards(page);
}

async function renderCards(page) {
  const searchValue = searchQuery.value;
  const photos = await fetchPhotos(searchValue, page);
  gallery.insertAdjacentHTML('beforeend', photoCardTpl(photos.hits));
}

async function onLoadMoreBtn() {
  page += 1;
  await renderCards(page);
  await gallery.children[page * 12 - 12].scrollIntoView({
    behavior: 'smooth',
  });
}
