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
        <p className={styles.articleText} dangerouslySetInnerHTML={{__html: this.props.loading ? 'loading... ' : article.text}}></p>
        {article._id ? this.renderDelete() : null}
      </div>
    );
  
  }

  renderDelete() {
    return <Button title="Delete" onClick={this.props.onDelete.bind(null, this.props.article._id)} />
  }

}
