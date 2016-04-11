import './../frame/index.styl';
import styles from './app.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Content from './content.jsx';
import Menu from './menu.jsx';

const ARTICLES_URL = 'https://iths.bbweb.se/articles';
const ARTICLE_URL = 'https://iths.bbweb.se/articles/';
const API_KEY = '?key=337c5d1f-15b6-4da0-b06d-ba5dd6c5893f';
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
    this.setState({ loading: true });
    setTimeout(function() {

    $.getJSON(ARTICLE_URL + id + API_KEY, (data) => {
      this.setState({ selectedArticle: data, loading: false });
    });
      
    }.bind(this), 300);
  }

  emptyArticle() {
    this.setState({ selectedArticle: NO_ARTICLE });
  }

  deleteArticle(id) {
    this.setState({articles: this.state.articles.filter(article => article._id !== id)});

    $.ajax('https://iths.bbweb.se/articles/' + id + API_KEY, {
        type: 'DELETE',
        success: () => {
          this.emptyArticle();
        }
    });
  }

  componentDidMount() {
    $.getJSON('https://iths.bbweb.se/articles?key=337c5d1f-15b6-4da0-b06d-ba5dd6c5893f', (data) => {
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