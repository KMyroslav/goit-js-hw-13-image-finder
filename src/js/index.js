import '../sass/main.scss';
import photoCardTpl from '../templates/photo-cards.hbs';
import fetchPhotos from './apiService';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';

const debounce = require('lodash.debounce');
const searchQuery = document.querySelector('#searchQuery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');
const grid = document.querySelector('.grid');
let page = 1;

searchQuery.addEventListener('input', debounce(onUserInput, 500));
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onUserInput(e) {
  loadMoreBtn.classList.remove('visually-hidden');
  e.preventDefault();
  page = 1;
  gallery.innerHTML = '<div class="grid-sizer"></div><div class="gutter-sizer"></div>';
  renderCards(page);
}

async function renderCards(page) {
  const searchValue = searchQuery.value;
  const photos = await fetchPhotos(searchValue, page);

  gallery.insertAdjacentHTML('beforeend', photoCardTpl(photos.hits));

  const msnry = await new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true,
  });

  await imagesLoaded(grid).on('progress', function () {
    msnry.layout();
  });
}

async function onLoadMoreBtn() {
  page += 1;
  await renderCards(page);
  await gallery.children[page * 12 - 10].scrollIntoView({
    behavior: 'smooth',
  });
}
