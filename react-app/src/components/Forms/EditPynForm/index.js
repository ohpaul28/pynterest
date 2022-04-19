import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import styles from './EditPynForm.module.css';
import { updatingPyn } from '../../../store/pyns';



export const EditPynForm = ({pyn}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(pyn.title)
  const [description, setDescription] = useState(pyn.description)


  const handleSubmit = async () => {
    const formData = {
      'id': pyn.id,
      'title': title,
      'description': description,
    }
    dispatch(updatingPyn(formData))
  }

  return (
    <>
      <form className={styles.editPynForm}>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
        <input
          type='textarea'
          value={description}
          onChange={(e) => setDescription(e.target.value)}/>
        <div onClick={handleSubmit}>Submit</div>
      </form>
    </>
  )
}
