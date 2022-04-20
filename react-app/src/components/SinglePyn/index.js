import React, { useContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './SinglePyn.module.css'
import deleteIcon from '../Icons/delete.svg';
import editIcon from '../Icons/edit.svg';
import { deletingPyn } from '../../store/pyns';
import { EditPynForm } from '../Forms/EditPynForm';
import SelectedContext from '../context/selectedContext';
import { Pyns } from '../HomepageLI/tabs/Pyns';



export const SinglePyn = ({ id }) => {
  const sessionUser = useSelector(state => state.session.user)
  const singlePyn = useSelector(state => state.pyns)[id]
  const dispatch = useDispatch();

  const { setSelected } = useContext(SelectedContext)

  const onDelete = (pynId) => {
    let result = window.confirm('Wait! Are you sure you want to delete this Pyn?')
    if (result) {
      dispatch(deletingPyn(pynId))
      setSelected(<Pyns/>)
    }
  }

  const onEdit = () => {

  }


  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButtonContainer}>
        <div className={styles.backButton} onClick={() => setSelected(<Pyns/>)}>
          <i className="fa fa-arrow-left"></i> Back to Pyns
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <img className={styles.pynImage} src={`${singlePyn?.img_url}`} alt=""/>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.interactions}>
              {singlePyn.user_id === sessionUser.id &&
              <>
                <div onClick={() => onDelete(singlePyn?.id)}>
                  <img className={styles.deletebtn} src={deleteIcon} alt=""/>
                </div>
                <div onClick={() => onEdit(singlePyn?.id)}>
                  <img className={styles.editbtn} src={editIcon} alt=""/>
                </div>
              </>
              }
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
              {singlePyn?.title}
            </h1>
            <div className={styles.description}>
              {singlePyn?.description}
            </div>
          </div>
          <div className={styles.comments}>
            Comments
            <div className={styles.innerComments}>
              {singlePyn?.comments?.map((comment) => (
                <div className={styles.singleComment}>
                  <div className={styles.iconAndName}>
                    <div className={styles.profileIcon}>
                      {comment.user?.email[0].toUpperCase()}
                    </div>
                    <div>
                      {comment.user.first_name}
                    </div>
                  </div>
                  <div className={styles.content}>
                    {comment.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {sessionUser.id === singlePyn?.user_id &&
        <div className={styles.editForm}>
          <EditPynForm pyn={singlePyn}/>
        </div>
        }
      </div>
    </div>
  )
}
