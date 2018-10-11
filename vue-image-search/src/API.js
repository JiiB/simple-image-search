export default {
  search(searchTerm) {
    const url = `https://pixabay.com/api/?key=${
      process.env.VUE_APP_API_KEY
    }&q=${searchTerm}`;

    return fetch(url)
      .then(res => res.json())
      .then(res => res.hits);
  }
};
