import React, { useContext } from 'react';
import {useSelector} from 'react-redux';
import { SinglePyn } from '../../SinglePyn';
import SelectedContext from '../../context/selectedContext';
// import {readingPynComments} from '../../../store/comments';




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
    <div>
      {pyns.map(pyn => (
        <div onClick={() => onClick(pyn.id)}>
          <img src={pyn.img_url} alt=""/>
        </div>
      ))}
    </div>
    </>
  );
}
