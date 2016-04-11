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
          <li className={(selected && selected._id === article._id) ? styles.selected : styles.menuListItem} key={article._id}>
            <Button 
              title={selected ? selected.title : 'hello'}  
              onClick={onOpen.bind(null, article._id)} />
          </li>
        )}
      </ul>
    </div>
  );
}
