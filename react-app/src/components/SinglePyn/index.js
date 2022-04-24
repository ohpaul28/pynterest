import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SinglePyn.module.css'
import deleteIcon from '../Icons/delete.svg';
import editIcon from '../Icons/edit.svg';
import { deletingPyn } from '../../store/pyns';
import { pynningToBoard, removingPynFromBoards } from '../../store/boards';
import { EditPynForm } from '../Forms/EditPynForm';
import SelectedContext from '../context/selectedContext';
import { Pyns } from '../Homepage/tabs/Pyns';
import { User } from '../User';



export const SinglePyn = ({ id }) => {
  const sessionUser = useSelector(state => state.session.user)
  const singlePyn = useSelector(state => state.pyns)[id]
  const filtered = Object.values(useSelector(state => state.boards)).filter(board => board.user_id === sessionUser.id)
  const [boardId, setBoardId] = useState('')
  const dispatch = useDispatch();

  const { setSelected } = useContext(SelectedContext)

  const addToBoard = (board_id) => {
    const pynBody = {
      'pynId': id,
      'boardId': board_id
    }
    dispatch(pynningToBoard(pynBody))
    setBoardId(null)
    setSelected(<User userId={sessionUser.id}/>)
  }

  const onDelete = async (pynId) => {
    let result = window.confirm('Wait! Are you sure you want to delete this Pyn?')
    if (result) {
      const unpynBody = {
        'pynId': pynId
      }
      await dispatch(removingPynFromBoards(unpynBody)).then(() =>
        dispatch(deletingPyn(pynId)))


      setSelected(<User />)
    }
  }

  const onEdit = () => {

  }

  const goToPyns = () => {
    let pynTab = document?.getElementById('pynTab')
    let boardTab = document?.getElementById('boardTab')
    // let userTab = document?.getElementById('userTab')

    pynTab.style.backgroundColor = 'black';
    pynTab.style.color = 'white';

    boardTab.style.backgroundColor = 'white';
    boardTab.style.color = 'black';
    setSelected(<Pyns/>)
  }


  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButtonContainer}>
        <div className={styles.backButton} onClick={() => goToPyns()}>
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
              {singlePyn?.user_id === sessionUser.id &&
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
              <select
              value={boardId}
              onChange={e => setBoardId(e.target.value)}>
                <option value={null}>
                  Add to Board
                </option>
                {filtered.map(board => (
                  <option key={board.id} value={board.id}>
                    {board.title}
                  </option>
                ))}
              </select>
              <div className={styles.save} onClick={() => addToBoard(boardId)}>
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
                <div key={comment.id} className={styles.singleComment}>
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
