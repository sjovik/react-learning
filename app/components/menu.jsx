import styles from './menu.styl';

import React from 'react';

import Button from './button';

export default ({articles, selected, onOpen}) => {
  return (
    <div className={styles.menuBox}>
      <ul className={styles.menuList}>
        {articles.map(article => 
          <li className={(selected && selected.id === article.id) ?
            styles.menuListItem + ' ' + styles.selected :
            styles.menuListItem}
            key={article.id}>
            <Button 
              title={article.title}
              onClick={onOpen.bind(null, article.id)} />
          </li>
        )}
      </ul>
    </div>
  );
}
