import './../frame/index.styl';
import styles from './app.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Content from './content.jsx';
import Menu from './menu.jsx';

const ARTICLES_URL = 'http://localhost:3030/articles';
const ARTICLE_URL = 'http://localhost:3030/articles/';
const NO_ARTICLE = { text: 'Välj en artikel från menyn.' };

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      selectedArticle: NO_ARTICLE,
      loading: false 
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.openArticle = this.openArticle.bind(this);
    this.emptyArticle = this.emptyArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  openArticle(id) {
    this.setState({ loading: true, selectedArticle: NO_ARTICLE });

    $.getJSON(ARTICLE_URL + id, (data) => {
      this.setState({ selectedArticle: data, loading: false });
    });
  }

  emptyArticle() {
    this.setState({ selectedArticle: NO_ARTICLE });
  }

  deleteArticle(id) {
    this.setState({articles: this.state.articles.filter(article => article.id !== id)});

    $.ajax(ARTICLES_URL + id, {
        type: 'DELETE',
        success: () => {
          this.emptyArticle();
        }
    });
  }

  componentDidMount() {
    $.getJSON(ARTICLES_URL, (data) => {
      this.setState({ articles: data });
    });
  }

  render() {
    return (
      <div className={styles.bodyContainer}>
        <Menu 
          articles={this.state.articles} 
          selected={this.state.selectedArticle}
          onOpen={this.openArticle} 
          onEmpty={this.emptyArticle} />
        <Content 
          article={this.state.selectedArticle} 
          onDelete={this.deleteArticle}
          loading={this.state.loading} />
      </div>
    );
  }
}
