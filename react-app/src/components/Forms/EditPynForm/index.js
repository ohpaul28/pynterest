import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import styles from './EditPynForm.module.css';
import { updatingPyn } from '../../../store/pyns';
import checkmark from '../../Icons/check_mark.svg';



export const EditPynForm = ({props}) => {
  const dispatch = useDispatch();
  const {singlePyn, toggle, setToggle} = props
  const [title, setTitle] = useState(singlePyn?.title)
  const [description, setDescription] = useState(singlePyn?.description)


  const handleSubmit = async () => {
    if (title.length < 1) {
      window.alert('Title cannot be left blank!')
      return
    }
    if (description.length < 1) {
      window.alert('Description cannot be left blank!')
      return
    }
    const formData = {
      'id': singlePyn?.id,
      'title': title,
      'description': description,
    }
    dispatch(updatingPyn(formData))
    setToggle(!toggle)
  }

  return (
    <>
      <form className={styles.editPynForm}>
        <div className={styles.inputs}>
          <input
            className={styles.titleInput}
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>
          <input
            className={styles.descriptionInput}
            type='textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <img className={styles.checkmark} onClick={handleSubmit} src={checkmark} alt="" />
      </form>
    </>
  )
}
