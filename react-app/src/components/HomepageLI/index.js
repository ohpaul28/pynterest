import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { readingBoards } from '../../store/boards';
import styles from './HomepageLI.module.css';
import { showModal, setCurrentModal } from '../../store/modal';
import { BoardForm } from '../Forms/BoardsForm';
import { PynForm } from '../Forms/PynsForm';



export const HomepageLI = ({ selected }) => {
  const dispatch = useDispatch();
  const [showBox, setShowBox] = useState(false);
  dispatch(readingBoards())

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
