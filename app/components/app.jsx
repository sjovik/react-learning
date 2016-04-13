import './../frame/index.styl';
import styles from './app.styl';

import React from 'react';
import ReactDOM from 'react-dom';

import ArticleActions from '../actions/ArticleActions';
import ArticleStore from '../stores/ArticleStore';

import Content from './content.jsx';
import Menu from './menu.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = ArticleStore.getState();

    this.storeChanged = this.storeChanged.bind(this);
  }

  openArticle(id) {
    ArticleActions.getArticle(id);
  }

  deleteArticle(id) {
    ArticleActions.delete(id);
  }

  componentDidMount() {
    ArticleStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    ArticleStore.unlisten(this.storeChanged)
  }

  storeChanged(state) {
    this.setState(state);
  } 

  render() {
    return (
      <div className={styles.bodyContainer}>
        <Menu 
          articles={this.state.articles} 
          selected={this.state.selectedArticle}
          onOpen={this.openArticle} />
        <Content 
          article={this.state.selectedArticle}
          onDelete={this.deleteArticle}
          loading={this.state.loading} />
      </div>
    );
  }
}
