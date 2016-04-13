import uuid from 'node-uuid';
import alt from '../libs/alt';
import ArticleActions from '../actions/ArticleActions';

class ArticleStore {
  constructor() {
    this.bindActions(ArticleActions);

    this.articles = [];
  }

  create(article) {

  } 

  update(updatedArticle) {

  }

  delete(id) {

  }
}

export default alt.createStore(ArticleStore, 'ArticleStore');