import React, { useContext }from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './SingleBoard.module.css'
import SelectedContext from '../context/selectedContext';
import { Pyns } from '../Homepage/tabs/Pyns';



export const SingleBoard = ({ boardId }) => {
  const {setSelected} = useContext(SelectedContext);
  const boards = useSelector(state => state.boards)
  const pyns = useSelector(state => state.pyns)
  const displayedBoard = boards[boardId].pyns

  // displayedBoard['pyns'].forEach(pynId => {
  //   displayedBoard.push(pyns[pynId])
  // })

  const goToPyn = (selectedId) => {
    setSelected(<Pyns id={selectedId}/>)
  }

  // console.log(displayedBoard);


  return (
    <div className={styles.parent}>

      {displayedBoard.length === 0 &&
        <div>
          {'No Pyns in this Board. :<'}
        </div>
      }

      {displayedBoard[0] &&
      <div className={styles.div1}>
        <img className={styles.image} src={displayedBoard[0].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[0].title}</div>
        <div className={styles.description}>{displayedBoard[0].description}</div>
      </div>}

      {displayedBoard[1] &&
      <div className={styles.div2}>
        <img className={styles.image} src={displayedBoard[1].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[1].title}</div>
        <div className={styles.description}>{displayedBoard[1].description}</div>
      </div>}

      {displayedBoard[2] &&
      <div className={styles.div3}>
        <img className={styles.image} src={displayedBoard[2].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[2].title}</div>
        <div className={styles.description}>{displayedBoard[2].description}</div>
      </div>}

      {displayedBoard[3] &&
      <div className={styles.div4}>
        <img className={styles.image} src={displayedBoard[3].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[3].title}</div>
        <div className={styles.description}>{displayedBoard[3].description}</div>
      </div>}

      {displayedBoard[4] &&
      <div className={styles.div5}>
        <img className={styles.image} src={displayedBoard[4].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[4].title}</div>
        <div className={styles.description}>{displayedBoard[4].description}</div>
      </div>}

      {displayedBoard[5] &&
      <div className={styles.div6}>
        <img className={styles.image} src={displayedBoard[5].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[5].title}</div>
        <div className={styles.description}>{displayedBoard[5].description}</div>
      </div>}

      {displayedBoard[6] &&
      <div className={styles.div7}>
        <img className={styles.image} src={displayedBoard[6].img_url} alt=""/>
        <div className={styles.title}>{displayedBoard[6].title}</div>
        <div className={styles.description}>{displayedBoard[6].description}</div>
      </div>}

    </div>
  );

}
