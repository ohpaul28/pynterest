import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatingBoard } from '../../../store/boards'
import styles from './BoardsForm.module.css'


export const BoardForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(true);

  if (title) setDisabled(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title)
    formData.append('user_id', sessionUser.id)

    dispatch(creatingBoard(formData))
  }


  return (
    <>
      <h2>Create board</h2>
      <form className={styles.form}>
        <input
        type='text'
        value={title}
        placeholder='Like "Places to go" or "Recipes to Make"'
        onChange={() => setTitle(title)}/>
        <div disabled={disabled} onClick={handleSubmit}>Create</div>
      </form>
    </>
  )
}
