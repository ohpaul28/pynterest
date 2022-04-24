import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SinglePyn.module.css'
import deleteIcon from '../Icons/delete.svg';
import editIcon from '../Icons/edit.svg';
import { deletingComment, deletingPyn } from '../../store/pyns';
import { pynningToBoard, removingPynFromBoards } from '../../store/boards';
import { EditPynForm } from '../Forms/EditPynForm';
import SelectedContext from '../context/selectedContext';
import { Pyns } from '../Homepage/tabs/Pyns';
import { User } from '../User';
import comment from '../Icons/comment.svg';
import { CommentForm } from '../Forms/CommentForm';



export const SinglePyn = ({ id }) => {
  const sessionUser = useSelector(state => state.session.user)
  const singlePyn = useSelector(state => state.pyns)[id]
  const filtered = Object.values(useSelector(state => state.boards)).filter(board => board.user_id === sessionUser.id)
  const comments = useSelector(state => state.pyns[id])?.comments
  const [boardId, setBoardId] = useState('')
  const [toggle, setToggle] = useState(false)
  const [formActive, setFormActive] = useState(false);
  const dispatch = useDispatch();

  const { setSelected } = useContext(SelectedContext)

  const addToBoard = (board_id) => {
    if (!boardId){
      window.alert('Please select a board to add this Pyn to!')
      return
    }

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

  const deleteComment = (commentId) => {
    let result = window.confirm('Wait! Are you sure you want to delete this comment?')
    if (result) {
      dispatch(deletingComment(commentId))
    }
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
                <div onClick={() => setToggle(!toggle)}>
                  <img className={styles.editbtn} src={editIcon} alt=""/>
                </div>
              </>
              }
            </div>
            <div className={styles.top_right}>
              <select
              className={styles.selectField}
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
          <div className={styles.editSection}>
              {toggle
              ? <>
                  <EditPynForm props={{singlePyn, toggle, setToggle}}/>
                </>
              : <>
                  <div className={styles.title}>
                    {singlePyn?.title}
                  </div>
                  <div className={styles.description}>
                    {singlePyn?.description}
                  </div>
                </>}
          </div>
          <div className={styles.comments}>
            <div className={styles.topOfCommentBox}>
              <div>
                Comments
              </div>
              <div className={styles.commentPost}>
                <img src={comment} alt="" onClick={() => setFormActive(!formActive)}/>
              </div>
            </div>
            <div className={styles.innerComments}>
              {comments ? Object.values(comments).map((comment) => (
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
                  {(sessionUser?.id === comment.user_id) &&
                  <img
                    className={styles.commentDeleteButton}
                    src={deleteIcon}
                    alt=""
                    onClick={() => deleteComment(comment.id)}
                  />}
                </div>
              )) : null}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.commentForm}>
        {formActive && <CommentForm props={{id, formActive, setFormActive}}/>}
      </div>
    </div>
  )
}
