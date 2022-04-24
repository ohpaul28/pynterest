import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { creatingPyns } from '../../../store/pyns'
import { pynningToBoard } from '../../../store/boards';
import styles from './PynsForm.module.css'
import { hideModal } from '../../../store/modal'
import cross from '../../Icons/x.svg';
import grayImage from '../../../images/qi4yOMV.png'

// import {DragAndDropFiles} from '../DragAndDropFiles'


export const PynForm = () => {
  const sessionUser = useSelector(state => state.session?.user)
  const boards = Object.values(useSelector(state => state.boards)).filter(board => board.user_id === sessionUser.id)
  const titles = boards.map(board => ({
    'title': board.title,
    'id': board.id
  }))
  const firstRender = useRef(true)
  const drop = useRef(null)

  const dispatch = useDispatch();

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')

  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState('')

  const [boardId, setBoardId] = useState(titles[0] ? titles[0].id : '')
  const [boardError, setBoardError] = useState('')

  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const [disabled, setDisabled] = useState(true)



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

  useEffect(() => {
    let dropClean = drop.current
    dropClean.addEventListener('dragover', handleDragOver);
    dropClean.addEventListener('drop', handleDrop);
    return () => {
      dropClean.removeEventListener('dragover', handleDragOver);
      dropClean.removeEventListener('drop', handleDrop);
    }
  }, [])

  const updateImage = e => {
    const file = e.target.files[0];
    const preview = document.getElementById('preview')
    preview.src = URL.createObjectURL(file)
    setImage(file)
  }

  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    const {files} = e.dataTransfer;

    if (files && files.length) {
      const preview = document.getElementById('preview')
      preview.src = URL.createObjectURL(files[0])
      setImage(files[0])
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (disabled) return;

    const formData = new FormData();
    formData.append('title', title)
    formData.append('image', image)
    formData.append('user_id', sessionUser.id)
    formData.append('description', description)


    dispatch(creatingPyns(formData)).then((response) => {
      if (!Array.isArray(response)) {
        const pynBody = {
          'pynId': response.id,
          'boardId': boardId
        }
        dispatch(pynningToBoard(pynBody))
        dispatch(hideModal())
      }
    })
  }

  const handleCancel = () => {
    dispatch(hideModal())
  }


  return (
    <>
    <div className={styles.pynsFormContainer}>
{/* left container */}

      <div className={styles.left_outer}>
        <div className={styles.left} ref={drop} >
          <div className={styles.prompt}>
            Drag an image here to upload
          </div>
          {/* <label>
            <input type='file'
            accept='image/*'
            className={styles.upload}
            onChange={handleDrop} />
            <a>Open</a>
          </label> */}
        </div>
      </div>


{/* Right container */}
      <div className={styles.right}>

        <div className={styles.exitContainer} onClick={handleCancel}>
          <img className={styles.exit} src={cross} alt="" />
        </div>

        <div className={styles.top_right}>
          <select
          className={styles.dropselect}
          value={boardId}
          onChange={e => setBoardId(e.target.value)}>
            {titles.map(board => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
          <div className={styles.save} onClick={handleSubmit}>Save</div>
        </div>
      <div>{boardError}</div>

        <input type='text'
                placeholder='Add your title'
                name='title'
                className={styles.titleInput}
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
        <div>{titleError}</div>

        <textarea
        className={styles.descriptionArea}
        rows="8"
        wrap="soft"
        placeholder='Tell everyone what your Pyn is about'
        value={description}
        onChange={e => setDescription(e.target.value)}/>
        <div>{descriptionError}</div>

      </div>

{/* Bottom container */}
      <div className={styles.bottom_right}>
        <img className={styles.imagePreview} id="preview" src={grayImage} alt="" />
        <div>{imageError}</div>
      </div>

    </div>
    </>
  );
}
