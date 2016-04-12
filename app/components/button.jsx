import styles from './button.styl';

import React from 'react';

export default ({title, onClick, small}) => {
  return (
    <button className={(small ? styles.small : null) + ' ' + styles.button} onClick={onClick}>
      {title}
    </button>
  );
}
