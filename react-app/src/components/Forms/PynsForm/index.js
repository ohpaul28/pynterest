import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { creatingPyns } from '../../../store/pyns'
import styles from './PynsForm.module.css'


export const PynForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState([])
  const sessionUser = useSelector(state => state.session.user)




  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title)
    formData.append('image', image)
    formData.append('user_id', sessionUser.id)
    formData.append('board_id', 1)
    // console.log(image)
    // console.log(formData.entries())
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);}
    if (!title && image) return setErrors(['Please provide a title'])
    if (!image && title) return setErrors(['Please select an image'])
    if (!image && !title) return setErrors(['Please provide a title', 'Please select an image'])


    dispatch(creatingPyns(formData))
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
    <form id="myForm">
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
