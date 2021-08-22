export default fetchPhotos;

async function fetchPhotos(searchQuery, page) {
  const response = await fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=23035178-c9501c24659a46c37914a5a12`,
  );
  return await response.json();
}
