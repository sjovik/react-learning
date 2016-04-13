import './../frame/index.styl';
import styles from './app.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import AltContainer from 'alt-container';

import ArticleActions from '../actions/ArticleActions';
import ArticleStore from '../stores/ArticleStore';

import Content from './content.jsx';
import Menu from './menu.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.bodyContainer}>
        <AltContainer
          stores={[ArticleStore]}
          inject={{
            articles: () => ArticleStore.getState().articles,
            selected: () => ArticleStore.getState().selectedArticle,
            loading: () => ArticleStore.getState().loading
          }}>
          <Menu onOpen={this.openArticle} />
          <Content onDelete={this.deleteArticle} />
        </AltContainer>
      </div>
    );
  }

  openArticle(id) {
    ArticleActions.getArticle(id);
  }

  deleteArticle(id) {
    ArticleActions.delete(id);
  }
}
