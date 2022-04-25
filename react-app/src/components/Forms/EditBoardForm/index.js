import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updatingBoard } from '../../../store/boards';
import styles from './EditBoardForm.module.css';
import checkIcon from '../../Icons/check_mark.svg';


export const EditBoardForm = ({props}) => {
  const {board, toggle, setToggle} = props
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [title, setTitle] = useState(board.title);

  const handleSubmit = async () => {
    if (title.length < 1 || title.length > 50) {
      window.alert('Title cannot be left blank!')
      return
    }
    const formData = {
      'user_id': sessionUser.id,
      'id': board.id,
      'title': title
    }
    dispatch(updatingBoard(formData))
    setToggle(!toggle)
  }

  return (
    <>
      <form className={styles.form}>
        <input
          type='text'
          value={title}
          className={styles.editInput}
          onChange={(e) => setTitle(e.target.value)}/>
          <img onClick={() => handleSubmit()} className={styles.confirmEdit} src={checkIcon} alt=""/>
      </form>
    </>
  )
}
