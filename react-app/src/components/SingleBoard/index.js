import React, { useContext }from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './SingleBoard.module.css'
import SelectedContext from '../context/selectedContext';
import { Pyns } from '../Homepage/tabs/Pyns';



export const SingleBoard = ({ boardId }) => {
  const {setSelected} = useContext(SelectedContext);
  const boards = useSelector(state => state.boards)
  const pyns = useSelector(state => state.pyns)
  const displayedBoard = boards[boardId]
  const selectedPyns = []

  displayedBoard['pyns'].forEach(pynId => {
    selectedPyns.push(pyns[pynId])
  })




  return (
    <div className={styles.parent}>
      <div className={styles.div1}></div>
      <div className={styles.div2}></div>
      <div className={styles.div3}></div>
      <div className={styles.div4}></div>
      <div className={styles.div5}></div>
      <div className={styles.div6}></div>
      <div className={styles.div7}></div>
    </div>
  );

}
