import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatingBoard } from '../../../store/boards'
import styles from './BoardsForm.module.css'
import { hideModal } from '../../../store/modal';


export const BoardForm = () => {
  const firstRender = useRef(true)
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (title.length < 1) {
      setTitleError("You missed a spot! Don't forget to give this board a title!")
      setDisabled(true)
      return
    }

    if (title.length > 49) {
      setTitleError("Character limit of 50!")
      setDisabled(true)
      return
    }

    setTitleError('')
    setDisabled(false)
    return
  },[title])

  const handleSubmit = async () => {
    const formData = {
      'user_id': sessionUser.id,
      'title': title
    }
    if (disabled) {
      setTitleError("You missed a spot! Don't forget to give this board a title!")
      setDisabled(true)
    }
    else {
      dispatch(creatingBoard(formData))
      dispatch(hideModal())
    }
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
        <div>{titleError}</div>
        <div onClick={() => handleSubmit()}>Create</div>
      </form>
    </div>
  )
}
