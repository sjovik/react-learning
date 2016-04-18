import utils from './utils';

const ARTICLES_URL = 'http://localhost:3030/articles';
const ARTICLE_URL = 'http://localhost:3030/articles/';

export default {
  getAll() {
    const promise = new Promise((resolve, reject) => {
      utils.getJSON(ARTICLES_URL, (err, data) => {
        (err) ? reject(err) : resolve(data);
      });
    });

    return promise;
  },
  getArticle(id) {
    const promise = new Promise((resolve, reject) => {
      utils.getJSON(ARTICLE_URL + id, (err, data) => {
        (err) ? reject(err) : resolve(data);
      });
    });

    return promise;
  },
  deleteArticle(id) {
    const promise = new Promise((resolve, reject) => {
      // Works with DELETE but actually deletes from fake API, so using GET to be able to 
      // reload and get them back for now.
      utils.ajax(ARTICLE_URL + id, {
        type: 'GET',
        success: resolve,
        error: reject
      });
    });

    return promise;
  }
};
