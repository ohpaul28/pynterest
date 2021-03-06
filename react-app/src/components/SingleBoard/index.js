import React, { useContext }from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './SingleBoard.module.css'
import SelectedContext from '../context/selectedContext';
import { SinglePyn } from '../SinglePyn';
import { unpynningFromBoard } from '../../store/boards';
import { readingOnePyn } from '../../store/pyns';
import {Boards} from '../Homepage/tabs/Boards';



export const SingleBoard = ({ boardId }) => {
  const {setSelected} = useContext(SelectedContext);
  const board = useSelector(state => state.boards)[boardId]
  const displayedBoard = board.pyns
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  const goToPyn = async (selectedId) => {
    await dispatch(readingOnePyn(selectedId)).then(() =>
    setSelected(<SinglePyn id={selectedId}/>))
  }

  const unpynFromBoard = (pynId) => {
    const unpynBody = {
      'boardId': boardId,
      'pynId': pynId
    }
    dispatch(unpynningFromBoard(unpynBody))
  }

  const goToBoards = () => {
    setSelected(<Boards />)
    let pynTab = document?.getElementById('pynTab')
    let boardTab = document?.getElementById('boardTab')

    pynTab.style.backgroundColor = 'white';
    pynTab.style.color = 'black';

    boardTab.style.backgroundColor = 'black';
    boardTab.style.color = 'white';
  }


  return (
    <>
    <div className={styles.backButton} onClick={() => goToBoards()}>
        <i className="fa fa-arrow-left"></i> Back to Boards
    </div>
    <div className={styles.parent}>

      {!displayedBoard &&
        <div className={styles.nopyns}>
          No Pyns in this Board. <br />
          <br />
          {`:<`}
        </div>
      }

      {displayedBoard && displayedBoard[0] &&
      <div className={styles.div1}>
        {(board.user_id === sessionUser.id) &&
        <div className={styles.unpyn} onClick={() => unpynFromBoard(displayedBoard[0].id)} >Unpyn</div>}
        <img onClick={() => goToPyn(displayedBoard[0].id)} className={styles.image} src={displayedBoard[0].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[0].title}</div>
        <div className={styles.description}>{displayedBoard[0].description}</div>
      </div>}

      {displayedBoard && displayedBoard[1] &&
      <div className={styles.div2}>
        {(board.user_id === sessionUser.id) &&
        <div className={styles.unpyn} onClick={() => unpynFromBoard(displayedBoard[1].id)}>Unpyn</div>}
        <img onClick={() => goToPyn(displayedBoard[1].id)} className={styles.image} src={displayedBoard[1].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[1].title}</div>
        <div className={styles.description}>{displayedBoard[1].description}</div>
      </div>}

      {displayedBoard && displayedBoard[2] &&
      <div className={styles.div3}>
        {(board.user_id === sessionUser.id) &&
        <div className={styles.unpyn} onClick={() => unpynFromBoard(displayedBoard[2].id)}>Unpyn</div>}
        <img onClick={() => goToPyn(displayedBoard[2].id)} className={styles.image} src={displayedBoard[2].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[2].title}</div>
        <div className={styles.description}>{displayedBoard[2].description}</div>
      </div>}

      {displayedBoard && displayedBoard[3] &&
      <div className={styles.div4}>
        {(board.user_id === sessionUser.id) &&
        <div className={styles.unpyn} onClick={() => unpynFromBoard(displayedBoard[3].id)}>Unpyn</div>}
        <img onClick={() => goToPyn(displayedBoard[3].id)} className={styles.image} src={displayedBoard[3].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[3].title}</div>
        <div className={styles.description}>{displayedBoard[3].description}</div>
      </div>}

      {displayedBoard && displayedBoard[4] &&
      <div className={styles.div5}>
        {(board.user_id === sessionUser.id) &&
        <div className={styles.unpyn} onClick={() => unpynFromBoard(displayedBoard[4].id)}>Unpyn</div>}
        <img onClick={() => goToPyn(displayedBoard[4].id)} className={styles.image} src={displayedBoard[4].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[4].title}</div>
        <div className={styles.description}>{displayedBoard[4].description}</div>
      </div>}

      {displayedBoard && displayedBoard[5] &&
      <div className={styles.div6}>
        {(board.user_id === sessionUser.id) &&
        <div className={styles.unpyn} onClick={() => unpynFromBoard(displayedBoard[5].id)}>Unpyn</div>}
        <img onClick={() => goToPyn(displayedBoard[5].id)} className={styles.image} src={displayedBoard[5].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[5].title}</div>
        <div className={styles.description}>{displayedBoard[5].description}</div>
      </div>}

      {displayedBoard && displayedBoard[6] &&
      <div className={styles.div7}>
        {(board.user_id === sessionUser.id) &&
        <div className={styles.unpyn} onClick={() => unpynFromBoard(displayedBoard[6].id)}>Unpyn</div>}
        <img onClick={() => goToPyn(displayedBoard[6].id)} className={styles.image} src={displayedBoard[6].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[6].title}</div>
        <div className={styles.description}>{displayedBoard[6].description}</div>
      </div>}

    </div>
    </>
  );

}
