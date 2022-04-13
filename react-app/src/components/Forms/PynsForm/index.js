import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { creatingPyns } from '../../../store/pyns'
import styles from './PynsForm.module.css'


export const PynForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState([])
  const sessionUser = useSelector(state => state.session.user)



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image)
    formData.append('user_id', sessionUser.id)
    formData.append('board_id', 1)

    const newPyn = dispatch(creatingPyns(formData))

    if (newPyn.errors) {
      setErrors([...newPyn.errors])
      return
    } else {
      history.push('/')
    }

  }

  const updateImage = e => {
    const file = e.target.files[0];
    setImage(file)
  }


  return (
    <>
    <div className={styles.errors}>
      {errors && errors.map(error => (
        <div>{error}</div>
      ))}
    </div>
    <form >
      <input type='file'
              accept='image/*'
              onChange={updateImage} />
      <input type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}/>
      <div onClick={handleSubmit}>Submit</div>
    </form>
    </>
  );
}