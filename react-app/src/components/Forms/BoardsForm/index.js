import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatingBoard } from '../../../store/boards'
import styles from './BoardsForm.module.css'


export const BoardForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    const formData = {
      'user_id': sessionUser.id,
      'title': title
    }
    dispatch(creatingBoard(formData))
  }


  return (
    <div>
      <h2>Create board</h2>
      <form className={styles.form}>
        <input
        type='text'
        value={title}
        placeholder='Like "Places to go" or "Recipes to Make"'
        onChange={(e) => setTitle(e.target.value)}/>
        <div onClick={() => handleSubmit()}>Create</div>
      </form>
    </div>
  )
}
