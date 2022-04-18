import React, {useEffect, useState, useContext} from 'react';
import {useDispatch} from 'react-redux';
import { BoardForm } from '../Forms/BoardsForm';
import { PynForm } from '../Forms/PynsForm';
import { showModal, setCurrentModal } from '../../store/modal';
import SelectedContext from '../context/selectedContext';
import styles from './User.module.css';

export const User = ({ user }) => {
  const dispatch = useDispatch();
  const [showBox, setShowBox] = useState(false);
  const {selected} = useContext(SelectedContext)
  // const fetchRequest = fetch(`/api/boards/${user.id}`)
  // const boards = await fetchRequest.json()
  // console.log(boards)

  const openBox = () => setShowBox(!showBox);

	useEffect(() => {
		if (!showBox) return;

		const closeBox = () => setShowBox(false);
		document.addEventListener("click", closeBox);

		return () => document.removeEventListener("click", closeBox);
	});

  const showPynForm = () => {
    dispatch(setCurrentModal(PynForm))
    dispatch(showModal())
  }

  const showBoardForm = () => {
    dispatch(setCurrentModal(BoardForm))
    dispatch(showModal())
  }

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.userInfo}>
        <div className={styles.initial}>
          {user?.email[0].toUpperCase()}
        </div>
        <div>
          <strong>{user?.first_name}</strong>
          <strong>{user?.last_name}</strong>
        </div>
        <div>
          <strong>{user?.email}</strong>
        </div>
      </div>
      <div className={styles.createContainer}>
        <div onClick={openBox} className={styles.innerCreateContainer}>
          <div className={styles.createBox}>
            +
          </div>
            {showBox && (
              <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                <div className={styles.boxTitle} >Create</div>
                <div className={styles.pynbtn} onClick={showPynForm}>
                  Pyn
                </div>
                <div className={styles.boardbtn} onClick={showBoardForm}>
                  Board
                </div>
              </div>
            )}
        </div>
      </div>
      <div className={styles.boardsDisplay}>

      </div>
    </div>
  );
}
