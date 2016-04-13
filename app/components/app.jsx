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
        <div className={styles.menuContainer}>
          <AltContainer
            stores={[ArticleStore]}
            inject={{
              articles: () => ArticleStore.getState().articles,
              selected: () => ArticleStore.getState().selectedArticle
            }}>
            <Menu onOpen={this.openArticle} />
          </AltContainer>
        </div>
        <div className={styles.contentContainer}>
          <AltContainer
            stores={[ArticleStore]}
            inject={{
              selected: () => ArticleStore.getState().selectedArticle,
              loading: () => ArticleStore.getState().loading
            }}>
            <Content onDelete={this.deleteArticle} />
          </AltContainer>
        </div>
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
