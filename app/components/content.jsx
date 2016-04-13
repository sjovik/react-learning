import styles from './content.styl';

import React from 'react';

import Button from './button';

export default class Article extends React.Component {
  render() {
    const article = this.props.selected;

    return (
      <div className={styles.contentBox}>
        <p>Författare: <span className={styles.articleText}><a href={"mailto:" + article.authorMail}>{article.author}</a></span></p>
        <p>Datum: <span className={styles.articleText}>{article.date}</span></p>
        {article.imageURL ? this.renderImage() : null}
        <p className={styles.articleText}>{this.props.loading ? 'loading... ' : article.text}</p>
        {article.id || article.id === 0 ? this.renderDelete() : null}
      </div>
    );
  }

  renderImage() {
    return <img src={this.props.selected.imageURL} />
  }

  renderDelete() {
    return (
      <div className={styles.closeButton}>
        <Button title="x" small={true} onClick={this.props.onDelete.bind(null, this.props.selected.id)} />
      </div>
    );
  }
}
