import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { creatingPyns } from '../../../store/pyns'
import { pynningToBoard } from '../../../store/boards';
import styles from './PynsForm.module.css'


export const PynForm = () => {
  const sessionUser = useSelector(state => state.session?.user)
  const firstRender = useRef(true)
  const dispatch = useDispatch();

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')

  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState('')

  const [boardId, setBoardId] = useState('')
  const [boardError, setBoardError] = useState('')

  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const [disabled, setDisabled] = useState(true)
  // const [errors, setErrors] = useState([])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (!image) {
      setImageError("You missed a spot! Don't forget to pick an image to upload!")
      setDisabled(true)
      return
    } else {
      setImageError('')
    }

    if (title.length < 1) {
      setTitleError("You missed a spot! Don't forget to give this a title!")
      setDisabled(true)
      return
    } else {
      setTitleError('')
    }

    if (description.length < 1) {
      setDescriptionError("You missed a spot! Don't forget to tell us about this Pyn!")
      setDisabled(true)
      return
    } else if (description.length > 254) {
      setDescriptionError('Character limit is 255!')
      setDisabled(true)
      return
    } else {
      setDescriptionError('')
    }


    if (!boardId) {
      setBoardError("You missed a spot! Don't forget to pick a board to Pyn this to!")
      setDisabled(true)
    }else {
      setBoardError('')
      setDisabled(false)
      return
    }
  }, [title, image, boardId, description])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (disabled) return;

    const formData = new FormData();
    formData.append('title', title)
    formData.append('image', image)
    formData.append('user_id', sessionUser.id)
    formData.append('description', description)


    let res = dispatch(creatingPyns(formData))
    if (res.ok) {
      const pynBody = {
        'pynId': res.id,
        'boardId': boardId
      }
      dispatch(pynningToBoard(pynBody))
    }
  }

  const updateImage = e => {
    const file = e.target.files[0];
    console.log(file)
    setImage(file)
    console.log(image)
  }

  return (
    <>
    <select
    value={boardId}
    onChange={e => setBoardId(e.target.value)}>
      {sessionUser?.boards.map(board => (
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

      <input
      type='textarea'
      placeholder='Tell us about it!'
      value={description}
      onChange={e => setDescription(e.target.value)}/>
      <div>{descriptionError}</div>

      <div onClick={handleSubmit}>Submit</div>

    </form>
    </>
  );
}
