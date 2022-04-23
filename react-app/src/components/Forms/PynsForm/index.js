import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { creatingPyns } from '../../../store/pyns'
import { pynningToBoard } from '../../../store/boards';
import styles from './PynsForm.module.css'
import { hideModal } from '../../../store/modal'
import cross from '../../Icons/x.svg';
import grayImage from '../../../images/qi4yOMV.png'


export const PynForm = () => {
  const sessionUser = useSelector(state => state.session?.user)
  const boards = Object.values(useSelector(state => state.boards)).filter(board => board.user_id === sessionUser.id)
  const titles = boards.map(board => ({
    'title': board.title,
    'id': board.id
  }))
  const firstRender = useRef(true)
  const dispatch = useDispatch();
  // const { setSelected } = useContext(SelectedContext)

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')

  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState('')

  const [boardId, setBoardId] = useState(titles[0]?.id)
  const [boardError, setBoardError] = useState('')

  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const [disabled, setDisabled] = useState(true)

  const [file, setFile] = useState('')

  let $form =


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


    dispatch(creatingPyns(formData)).then((response) => {
      if (!Array.isArray(response)) {
        const pynBody = {
          'pynId': response.id,
          'boardId': boardId
        }
        dispatch(pynningToBoard(pynBody))
        dispatch(hideModal())
        // setSelected(<Pyns />)
      }
    })
  }

  const handleCancel = () => {
    // setSelected(<Pyns/>)
    dispatch(hideModal())
  }

  const updateImage = e => {
    const file = e.target.files[0];
    const preview = document.getElementById('preview')
    preview.src = URL.createObjectURL(file)
    setImage(file)
  }

  return (
    <>
    <div className={styles.pynsFormContainer}>
{/* left container */}
      <div className={styles.left}>
        <input type='file'
                accept='image/*'
                className={styles.upload}
                onChange={updateImage} />
        <div>{imageError}</div>
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
      </div>

    </div>
    </>
  );
}
