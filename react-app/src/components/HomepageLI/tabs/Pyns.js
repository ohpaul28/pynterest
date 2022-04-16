import React from 'react';
import {useSelector} from 'react-redux';
import { SinglePyn } from '../../SinglePyn';



export const Pyns = ({ setSelected }) => {
  const pyns = Object.values(useSelector(state => state.pyns))
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
        <div onClick={onClick(pyn.id)}>
          <img src={pyn.img_url} alt=""/>
        </div>
      ))}
    </div>
    </>
  );
}
