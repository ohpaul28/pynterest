import React, {useContext, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './Boards.module.css'
import grayBackground from '../../../images/qi4yOMV.png'
import SelectedContext from '../../context/selectedContext';
import { SingleBoard } from '../../SingleBoard';
import { EditBoardForm } from '../../Forms/EditBoardForm';
import { convertToDayAge } from '../../User/ConversionHelper';
import { deletingBoard } from '../../../store/boards';
import deleteIcon from '../../Icons/delete.svg';
import editIcon from '../../Icons/edit.svg';




export const Boards = () => {
  const boards = Object.values(useSelector(state => state.boards))
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const {setSelected} = useContext(SelectedContext)
  const [toggle, setToggle] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('')

  const onDelete = (boardId) => {
    let result = window.confirm('Wait! Are you sure you want to delete this board?')
    if (result) {
      dispatch(deletingBoard(boardId))
    }
  }

  const toggleSelected = (id) => {
    setToggle(!toggle)
    setSelectedBoard(id)
  }

  return (
    <div className={styles.allBoards}>
    {boards?.map((board, i) => (
          <div key={i} className={styles.singleBoardContainer}>
            <div className={styles.multipleImageContainer} onClick={() => setSelected(<SingleBoard boardId={board.id}/>)}>

                <div className={styles.image1}>
                  <img src={board['pyns'] ? board['pyns'][0] ? board['pyns'][0].img_url : grayBackground : grayBackground} alt="" id={styles.board_card}/>
                </div>

                <div className={styles.image2}>
                  <img src={board['pyns'] ? board['pyns'][1] ? board['pyns'][1].img_url : grayBackground : grayBackground} alt="" id={styles.board_card}/>
                </div>

                <div className={styles.image3}>
                  <img src={board['pyns'] ? board['pyns'][2] ? board['pyns'][2].img_url : grayBackground : grayBackground} alt="" id={styles.board_card}/>
                </div>

                <div className={styles.image4}>
                  <img src={board['pyns'] ? board['pyns'][3] ? board['pyns'][3].img_url : grayBackground : grayBackground} alt="" id={styles.board_card}/>
                </div>

                <div className={styles.image5}>
                  <img src={board['pyns'] ? board['pyns'][4] ? board['pyns'][4].img_url : grayBackground : grayBackground} alt="" id={styles.board_card}/>
                </div>

            </div>
            <div className={styles.infoContainer}>
              <div className={styles.title}>
                {toggle && (selectedBoard === i) ? <EditBoardForm props={{board, toggle, setToggle}}/> : board.title}
              </div>
              <div className={styles.lengthAge}>
                <div>{board['pyns'] ? board['pyns'].length : 0} Pyns</div>
                <div className={styles.age}>{convertToDayAge(board['created_at'])}</div>
              </div>
                {board.user_id === sessionUser.id && (
                <div className={styles.deleteEdit}>
                  <div className={styles.deleteContainer} onClick={() => onDelete(board.id)}>
                    <img src={deleteIcon} alt="" />
                  </div>
                  <div id={i} className={styles.editContainer} onClick={() => toggleSelected(i)}>
                    <img src={editIcon} alt="" />
                  </div>
                </div>
                )}
            </div>
          </div>
        ))}
    </div>
  );
}
