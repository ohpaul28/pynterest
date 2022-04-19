import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './SinglePyn.module.css'
import deleteIcon from '../Icons/delete.svg';
import editIcon from '../Icons/edit.svg';
import { deletingPyn, updatingPyn } from '../../store/pyns';
import { EditPynForm } from '../Forms/EditPynForm';



export const SinglePyn = ({ pyn }) => {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  // const { setSelected } = useContext(SelectedContext)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const onDelete = (pynId) => {
    let result = window.confirm('Wait! Are you sure you want to delete this Pyn?')
    if (result) {
      dispatch(deletingPyn(pynId))
    }
  }

  const onEdit = () => {

  }


  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButton}>
        <i className="fa fa-arrow-left"></i> Back to Pyns
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={`${pyn.img_url}`} alt=""/>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.interactions}>
              {/* {pyn.user_id === sessionUser.id && */}
              <>
                <div onClick={() => onDelete(pyn.id)}>
                  <img className={styles.deletebtn} src={deleteIcon} alt=""/>
                </div>
                <div onClick={() => onEdit(pyn.id)}>
                  <img className={styles.editbtn} src={editIcon} alt=""/>
                </div>
              </>
               {/* } */}
            </div>
            <div className={styles.top_right}>
              Add to Board <span><i className="fa fa-angle-down"></i></span>
              <div>
                Save
              </div>
            </div>
          </div>
          <div>
            <h1>
              {pyn.title}
            </h1>
            <div>
              {pyn.description}
            </div>
          </div>
          <div className={styles.comments}>
            Comments
            <div className={styles.innerComments}>
              {pyn.comments?.map((comment) => (
                <>
                <div>
                  {comment.user?.email[0].toUpperCase()}
                </div>
                <div>
                  {comment.user.first_name}
                </div>
                <div>
                  {comment.content}
                </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.editForm}>
          <h2>Edit This Pyn</h2>
            <EditPynForm pyn={pyn}/>
        </div>
      </div>
    </div>
  )
}
