import './app.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello.jsx';
import Comment from './comments.jsx';

import data from './../data/data.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Hello />
        <Comment data={data} />
      </div>
    );
  }
}
