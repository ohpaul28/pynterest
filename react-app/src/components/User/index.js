import React, {useEffect, useState, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { BoardForm } from '../Forms/BoardsForm';
import { PynForm } from '../Forms/PynsForm';
import { showModal, setCurrentModal } from '../../store/modal';
import SelectedContext from '../context/selectedContext';
import styles from './User.module.css';
import { convertToDayAge } from './ConversionHelper';
import { Edit, Delete } from '../Icons'
import {deletingBoard} from '../../store/boards'

export const User = ({ user }) => {
  const sessionUser = useSelector(state => state.session.user)
  const pyns = useSelector(state => state.pyns)
  // const pynIdArr = useSelector(state => state.boards[user.id])
  const dispatch = useDispatch();
  const [showBox, setShowBox] = useState(false);
  const {selected} = useContext(SelectedContext)


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

  const onEdit = () => {
    dispatch(setCurrentModal())
    dispatch(showModal())
  }

  const showPynForm = () => {
    dispatch(setCurrentModal(PynForm))
    dispatch(showModal())
  }

  const showBoardForm = () => {
    dispatch(setCurrentModal(BoardForm))
    dispatch(showModal())
  }

  const selectBoard = () => {
    dispatch(setCurrentModal())
    dispatch(showModal())
  }

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.userInfo}>
        <div className={styles.initial}>
          {user?.email[0].toUpperCase()}
        </div>
        <div>
          <strong>{user?.first_name}</strong>
          <strong>{user?.last_name}</strong>
        </div>
        <div>
          <strong>{user?.email}</strong>
        </div>
      </div>
      {sessionUser.id === user.id && (
        <div className={styles.createContainer}>
        <div onClick={openBox} className={styles.innerCreateContainer}>
          <div className={styles.createBox}>
            +
          </div>
            {showBox && (
              <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                <div className={styles.boxTitle} >Create</div>
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
      <div>

      </div>
      <div className={styles.boardsDisplay}>
        {user.boards.map(board => (
          <div className={styles.singleBoardContainer}>
            <div className={styles.multipleImageContainer}>

                <div className={styles.image1}>
                  <img src={pyns[board['pyns'][0]] ? pyns[board['pyns'][0]].img_url : "https://i.imgur.com/qi4yOMV.png"} alt="" id={styles.board_card}/>
                </div>

                <div className={styles.image2}>
                  <img src={pyns[board['pyns'][1]] ? pyns[board['pyns'][0]].img_url : "https://i.imgur.com/qi4yOMV.png"} alt="" id={styles.board_card}/>
                </div>

                <div className={styles.image3}>
                  <img src={pyns[board['pyns'][2]] ? pyns[board['pyns'][0]].img_url : "https://i.imgur.com/qi4yOMV.png"} alt="" id={styles.board_card}/>
                </div>

                <div className={styles.image4}>
                  <img src={pyns[board['pyns'][3]] ? pyns[board['pyns'][0]].img_url : "https://i.imgur.com/qi4yOMV.png"} alt="" id={styles.board_card}/>
                </div>

                <div className={styles.image5}>
                  <img src={pyns[board['pyns'][4]] ? pyns[board['pyns'][4]].img_url : "https://i.imgur.com/qi4yOMV.png"} alt="" id={styles.board_card}/>
                </div>

            </div>
            <div className={styles.infoContainer}>
              <div className={styles.title}>
                {board.title}
              </div>
              <div className={styles.lengthAge}>
                <div>{board['pyns'].length} Pyns</div>
                <div className={styles.age}>{convertToDayAge(board['created_at'])}</div>
              </div>

              <div className={styles.deleteEdit}>
                <div onClick={() => onDelete()}>
                  <Delete />
                </div>
                <div onClick={() => onEdit()}>
                  <Edit />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
