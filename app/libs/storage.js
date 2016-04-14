import $ from 'jquery';

const ARTICLES_URL = 'http://localhost:3030/articles';
const ARTICLE_URL = 'http://localhost:3030/articles/';

export default {
  getAll() {
    const promise = new Promise((resolve) => {
      $.getJSON(ARTICLES_URL, (data) => {
        resolve(data);
      });
    });

    return promise;
  },
  getArticle(id) {
    const promise = new Promise((resolve) => {
      $.getJSON(ARTICLE_URL + id, (data) => {
        resolve(data);
      });
    });

    return promise;
  },
  deleteArticle(id) {
    const promise = new Promise((resolve) => {
      // Works with DELETE but actually deletes from fake API, so using GET to be able to 
      // reload and get them back for now.
      $.ajax(ARTICLE_URL + id, {
        type: 'GET',
        success: resolve()
      });
    });

    return promise;
  }
};
