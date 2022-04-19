import React, {useState, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updatingBoard } from '../../../store/boards';
import styles from './EditBoardForm.module.css';
import SelectedContext from '../../context/selectedContext';
import { User } from '../../User'
import checkIcon from '../../Icons/check_mark.svg';


export const EditBoardForm = ({props}) => {
  const {board, toggle, setToggle} = props
  const dispatch = useDispatch();
  const {setSelected} = useContext(SelectedContext)
  const sessionUser = useSelector(state => state.session.user)
  const [title, setTitle] = useState(board.title);

  const handleSubmit = async () => {
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
          onChange={(e) => setTitle(e.target.value)}/>
        <div onClick={() => handleSubmit()}>
          <img className={styles.confirmEdit} src={checkIcon} alt=""/>
        </div>
      </form>
    </>
  )
}
