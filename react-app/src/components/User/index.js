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

  const openBox = () => setShowBox(!showBox)

  useEffect(() => {
    if (!showBox) return;

    const closeBox = () => setShowBox(false);
    document.addEventListener('click', closeBox)

    return () => document.removeEventListener('click', closeBox)
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
    <div>
      <div>
        <strong>User Id</strong> {user?.id}
      </div>
      <div>
        <strong>First Name</strong> {user?.first_name}
      </div>
      <div>
        <strong>Last Name</strong> {user?.last_name}
      </div>
      <div>
        <strong>Email</strong> {user?.email}
      </div>
      <div className={styles.createContainer}>
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
    </div>
  );
}
