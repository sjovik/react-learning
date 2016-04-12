import styles from './content.styl';

import React from 'react';

import Button from './button';

export default class Article extends React.Component {
  render() {
    const article = this.props.article;

    return (
      <div className={styles.contentBox}>
        <p>Författare: <span className={styles.articleText}><a href={"mailto:" + article.authorEmail}>{article.author}</a></span></p>
        <p>Datum: <span className={styles.articleText}>{article.date}</span></p>
        {article.imageURL ? this.renderImage() : null}
        <p className={styles.articleText}>{this.props.loading ? 'loading... ' : article.text}</p>
        {article.id || article.id === 0 ? this.renderDelete() : null}
      </div>
    );
  
  }

  renderImage() {
    return <img src={this.props.article.imageURL} />
  }

  renderDelete() {
    return <Button title="Delete" small={true} onClick={this.props.onDelete.bind(null, this.props.article.id)} />
  }

}
