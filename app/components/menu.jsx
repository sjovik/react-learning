import styles from './menu.styl';

import React from 'react';

import Button from './button';

export default ({articles, selected, onOpen, onEmpty}) => {
  return (
    <div className={styles.menuBox}>
      <ul className={styles.menuList}>
        <li className={styles.menuListItem}>
          <Button 
            title='No article'
            onClick={onEmpty} />
        </li>
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
