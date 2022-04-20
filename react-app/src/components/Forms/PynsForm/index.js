import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { creatingPyns } from '../../../store/pyns'
import { pynningToBoard } from '../../../store/boards';
import styles from './PynsForm.module.css'


export const PynForm = () => {
  const sessionUser = useSelector(state => state.session.user)
  const firstRender = useRef(true)
  const dispatch = useDispatch();

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')

  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState('')

  const [boardId, setBoardId] = useState('')
  const [boardError, setBoardError] = useState('')

  const [disabled, setDisabled] = useState(true)
  // const [errors, setErrors] = useState([])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if(title.length < 1) {
      setTitleError("You missed a spot! Don't forget to give this a title!")
      setDisabled(true)
      return
    } else {
      setTitleError('')
      setDisabled(false)
    }

    if (!image) {
      setImageError("You missed a spot! Don't forget to pick an image to upload!")
      setDisabled(true)
      return
    } else {
      setImageError('')
      setDisabled(false)
    }

    if (!boardId) {
      setBoardError("You missed a spot! Don't forget to pick a board to Pyn this to!")
      setDisabled(true)
    }else {
      setBoardError('')
      setDisabled(false)
      return
    }
  }, [title, image, boardId])


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (disabled) return;
    const formData = new FormData();
    formData.append('title', title)
    formData.append('image', image)
    formData.append('user_id', sessionUser.id)
    // console.log(image)
    // console.log(formData.entries())
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);}
    // if (!title && image) return setErrors(['Please provide a title'])
    // if (!image && title) return setErrors(['Please select an image'])
    // if (!image && !title) return setErrors(['Please provide a title', 'Please select an image'])


    dispatch(creatingPyns(formData))
    dispatch(pynningToBoard(boardId))
  }

  const updateImage = e => {
    const file = e.target.files[0];
    setImage(file)
  }


  return (
    <>
    {/* <div className={styles.errors}>
      {errors && errors.map(error => (
        <div>{error}</div>
      ))}
    </div> */}
    <select
    value={boardId}
    onChange={e => setBoardId(e.target.value)}>
      {sessionUser.boards.forEach(board => (
        <option value={board.id}>
          {board.title}
        </option>
      ))}
    </select>
    <div>{boardError}</div>
    <form id="myForm">
      <input type='file'
              accept='image/*'
              onChange={updateImage} />
      <div>{imageError}</div>
      <input type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}/>
      <div>{titleError}</div>
      <div onClick={handleSubmit}>Submit</div>
    </form>
    </>
  );
}
