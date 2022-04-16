import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styles from './HomepageLI.module.css';
import { showModal, setCurrentModal } from '../../store/modal';
import { BoardForm } from '../Forms/BoardsForm';
import { PynForm } from '../Forms/PynsForm';
import SelectedContext from '../context/selectedContext';



export const HomepageLI = () => {
  const dispatch = useDispatch();
  const [showBox, setShowBox] = useState(false);
  const { selected } = useContext(SelectedContext)

  const openBox = () => setShowBox(!showBox)

  useEffect(() => {
    if (!showBox) return;

    const closeBox = () => setShowBox(false);
    document.addEventListener('click', closeBox)

    return () => document.removeEventListener('click', closeBox);
  })

  const showPynForm = () => {
    dispatch(setCurrentModal(PynForm))
    dispatch(showModal())
  }

  const showBoardForm = () => {
    dispatch(setCurrentModal(BoardForm))
    dispatch(showModal())
  }


  return (
    <>
    <div className={styles.createContainer}>
      {selected}
      <div onClick={openBox} className={styles.createBox} activeClassName={styles.openedCreateBox}>
        <i className="fa fa-plus"></i>
      </div>
      {showBox && (
        <>
        <div>Create</div>
        <div onClick={showPynForm}>
          Pin
        </div>
        <div onClick={showBoardForm}>
          Board
        </div>
        </>
      )}
    </div>
    </>
  );
}
