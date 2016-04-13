import uuid from 'node-uuid';
import alt from '../libs/alt';
import ArticleActions from '../actions/ArticleActions';
import storage from '../libs/storage';

const NO_ARTICLE = { text: 'Välj en artikel från menyn.' };

class ArticleStore {
  constructor() {
    this.bindActions(ArticleActions);

    this.articles = [];
    this.selectedArticle = NO_ARTICLE;
    this.loading = false;

    storage.getAll().then((data) => {
      this.setState({
        articles: data
      });
    });
  }

  create(article) {
    const articles = this.articles;

    article.id = uuid.v4();

    this.setState({
      articles: articles.concat(article)
    });
  }

  update(updatedArticle) {
    const articles = this.articles.map(article => {
      if (article.id === updatedArticle.id) {
        // Assign to empty object to avoid mutating data.
        return Object.assign({}, article, updatedArticle);
      }

      return article;
    });

    // Property shorthand, the same as this.setState({notes: notes});
    this.setState({notes});
  }

  delete(id) {
    storage.deleteArticle(id).then(() => {
      this.setState({
        articles: this.articles.filter(article => article.id !== id),
        selectedArticle: NO_ARTICLE
      });
    });
  }

  getArticle(id) {
    this.setState({ loading: true, selectedArticle: NO_ARTICLE });

    storage.getArticle(id).then((data) => {
      this.setState({
        selectedArticle: data,
        loading: false
      });
    });
  }
}

export default alt.createStore(ArticleStore, 'ArticleStore');
