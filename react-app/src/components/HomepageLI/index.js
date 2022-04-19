import React, { useContext } from 'react';
import styles from './HomepageLI.module.css'
import SelectedContext from '../context/selectedContext';



export const HomepageLI = () => {

  const {selected} = useContext(SelectedContext)
  return (
    <div className={styles.selectedContainer}>
    {selected}
    </div>
  );
}
