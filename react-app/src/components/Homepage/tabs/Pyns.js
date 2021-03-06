import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SinglePyn } from '../../SinglePyn';
import SelectedContext from '../../context/selectedContext';
// import {readingPynComments} from '../../../store/comments';
import styles from './Pyns.module.css'
import { readingOnePyn } from '../../../store/pyns';





export const Pyns = () => {
  const dispatch = useDispatch();
  const pyns = Object.values(useSelector(state => state.pyns))
  const { setSelected } = useContext(SelectedContext)


  const onClick = async (id) => {
    dispatch(readingOnePyn(id))
    setSelected(<SinglePyn id={id}/>)
    let pynTab = document?.getElementById('pynTab')
    let boardTab = document?.getElementById('boardTab')

    pynTab.style.backgroundColor = 'white';
    pynTab.style.color = 'black';

    boardTab.style.backgroundColor = 'white';
    boardTab.style.color = 'black';
  }


  return (
    <>
    <div className={styles.allPyns}>
      {pyns?.reverse().map(pyn => (
        <div key={pyn.id} className={styles.onePyn} onClick={() => onClick(pyn.id)}>
          <img id={styles.pynImage} src={pyn.img_url} alt=""/>
        </div>
      ))}
    </div>
    </>
  );
}
