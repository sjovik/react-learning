import React from 'react';
import ReactDOM from 'react-dom';
import styles from './comments.styl';
import data from './../data/data.js';

class CommentBox extends React.Component {
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
}

class CommentList extends React.Component {
  render() {
    const commentNodes = this.props.data.map((comment) => (
      <Comment author={comment.author} key={comment.id}>
        {comment.text}
      </Comment>
    ));

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <div className="commentForm">
        commentForm
      </div>
    ); 
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox data={data} />, 
  document.getElementById('comments')
);
