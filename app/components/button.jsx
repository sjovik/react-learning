import styles from './button.styl';

import React from 'react';

export default ({title, onClick}) => {
  return (
    <button className={styles.menuButton} onClick={onClick}>
      {title}
    </button>
  );
}
