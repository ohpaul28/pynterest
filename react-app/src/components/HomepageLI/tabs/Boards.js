import React from 'react';
import {useSelector} from 'react-redux';
import styles from './Boards.module.css'



export const Boards = () => {
  const boards = Object.values(useSelector(state => state.boards))


  return (
    <>
    <div>
      {boards.map(board => (
        <div className={styles.container}>
          {board.title}
        </div>
      ))}
    </div>
    </>
  );
}
