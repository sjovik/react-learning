import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  render() {
    return <span>Hello world!</span>
  }
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));
