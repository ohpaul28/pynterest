import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { creatingPyns } from '../../../store/pyns'
import styles from './PynsForm.module.css'
// import { useEffect } from 'react';


export const PynForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState([])
  // const [disabled, setDisabled] = useState(False)
  const sessionUser = useSelector(state => state.session.user)
  // useEffect(() => {


  // }, [title, image])



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
    if (!title && image) setErrors(['Please provide a title'])
    if (!image && title) setErrors(['Please select an image'])
    if (!image && !title) setErrors(['Please provide a title', 'Please select an image'])

    if (errors) {
      return
    } else {
      dispatch(creatingPyns(formData))
      history.push('/pyns')
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
