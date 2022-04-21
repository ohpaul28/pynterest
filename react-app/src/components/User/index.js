import React, {useEffect, useState, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { BoardForm } from '../Forms/BoardsForm';
import { PynForm } from '../Forms/PynsForm';
import { showModal, setCurrentModal } from '../../store/modal';
import SelectedContext from '../context/selectedContext';
import styles from './User.module.css';
import { convertToDayAge } from './ConversionHelper';
import {deletingBoard} from '../../store/boards';
import grayBackground from '../../images/qi4yOMV.png';
import deleteIcon from '../Icons/delete.svg';
import editIcon from '../Icons/edit.svg';
import { SingleBoard } from '../SingleBoard';
import { EditBoardForm } from '../Forms/EditBoardForm';

export const User = () => {
  const sessionUser = useSelector(state => state.session.user)
  const boards = useSelector(state => state.boards)
  const filteredBoards = Object.values(boards).filter(board => board.user_id === sessionUser.id)

  const dispatch = useDispatch();
  const [showBox, setShowBox] = useState(false);
  const {setSelected} = useContext(SelectedContext)
  const [toggle, setToggle] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('')


  const openBox = () => setShowBox(!showBox);

	useEffect(() => {
		if (!showBox) return;

		const closeBox = () => setShowBox(false);
		document.addEventListener("click", closeBox);

		return () => document.removeEventListener("click", closeBox);
	});

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

  const showPynForm = () => {
    dispatch(setCurrentModal(PynForm))
    dispatch(showModal())
  }

  const showBoardForm = () => {
    dispatch(setCurrentModal(BoardForm))
    dispatch(showModal())
  }

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.userInfo}>
        <div className={styles.initial}>
          {sessionUser?.email[0].toUpperCase()}
        </div>
        <div>
          <strong>{sessionUser?.first_name}</strong>
          <strong>{sessionUser?.last_name}</strong>
        </div>
        <div>
          <strong>{sessionUser?.email}</strong>
        </div>
      </div>
      {sessionUser && (
        <div className={styles.createContainer}>
        <div onClick={openBox} className={styles.innerCreateContainer}>
          <div className={styles.createBox}>
            +
          </div>
            {showBox && (
              <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                <div className={styles.boxTitle}>Create</div>
                <div className={styles.pynbtn} onClick={showPynForm}>
                  Pyn
                </div>
                <div className={styles.boardbtn} onClick={showBoardForm}>
                  Board
                </div>
              </div>
            )}
        </div>
      </div>
      )}
      <div className={styles.myTabs}>
        <div>
          My Boards
        </div>
        <div>
          My Pyns
        </div>
      </div>
      <div className={styles.boardsDisplay}>
        {filteredBoards?.map((board, i) => (
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
    </div>
  );
}
