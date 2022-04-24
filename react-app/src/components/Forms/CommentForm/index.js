import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './CommentForm.module.css';
import { creatingComment } from '../../../store/pyns';

export const CommentForm = ({props}) => {
  const sessionUser = useSelector(state => state.session.user)
  const {id, formActive, setFormActive} = props
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if(comment.length < 1 || comment.length > 255) {
      window.alert('Please provide a comment! Character limit is 255.')
      return
    }
    const formData = {
      user_id: sessionUser.id,
      pyn_id: id,
      content: comment
    }
    dispatch(creatingComment(formData))
    setFormActive(!formActive)
  }

  return (
    <div className={styles.formContainer}>
      <textarea
        className={styles.commentInput}
        value={comment}
        rows='3'
        onChange={e => setComment(e.target.value)}
        placeholder='Let us know your thoughts!'/>
      <div className={styles.postbtn} onClick={() => handleSubmit()}>
        Post
      </div>
    </div>
  )
}
