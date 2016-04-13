import uuid from 'node-uuid';
import alt from '../libs/alt';
import ArticleActions from '../actions/ArticleActions';

class ArticleStore {
  constructor() {
    this.bindActions(ArticleActions);

    this.articles = [];
  }

  create(article) {
    const articles = this.articles;

    article.id = uuid.v4();

    this.setState({
      articles: articles.concat(article);
    });
  } 

  update(updatedArticle) {
    const articles = this.articles.map(article => {
      if (article.id === updatedArticle.id) {
        // empty object to avoid mutating data.
        return Object.assign({}, article, updatedArticle);
      }

      return article;
    });

    // Property shorthand, the same as this.setState({notes: notes});
    this.setState({notes});
  }

  delete(id) {
    this.setState({
      articles: this.articles.filter(article => article.id !== id)
    });
  }
}

export default alt.createStore(ArticleStore, 'ArticleStore');