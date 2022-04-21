import React, { useContext } from 'react';
import styles from './Homepage.module.css'
import SelectedContext from '../context/selectedContext';



export const Homepage = () => {

  const {selected} = useContext(SelectedContext)
  return (
    <div className={styles.selectedContainer}>
      {selected}
    </div>
  );
}
