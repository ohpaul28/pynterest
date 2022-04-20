import React, { useContext } from 'react';
import {useSelector} from 'react-redux';
import { SinglePyn } from '../../SinglePyn';
import SelectedContext from '../../context/selectedContext';
// import {readingPynComments} from '../../../store/comments';
import styles from './Pyns.module.css'





export const Pyns = () => {
  const pyns = Object.values(useSelector(state => state.pyns))
  const { setSelected } = useContext(SelectedContext)
  // const dispatch = useDispatch();


  const onClick = async (pynId) => {
    const res = await fetch(`/api/pyns/${pynId}`)

    if (res.ok) {
      const pyn = await res.json()
      setSelected(<SinglePyn pyn={pyn}/>)
    }
  }


  return (
    <>
    <div className={styles.allPyns}>
      {pyns.map(pyn => (
        <div className={styles.onePyn} onClick={() => onClick(pyn.id)}>
          <img id={styles.pynImage} src={pyn.img_url} alt=""/>
        </div>
      ))}
    </div>
    </>
  );
}
