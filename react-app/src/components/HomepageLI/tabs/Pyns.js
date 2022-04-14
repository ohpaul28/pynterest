import React from 'react';
import {useSelector} from 'react-redux';



export const Pyns = () => {
  const pyns = Object.values(useSelector(state => state.pyns))
  // console.log(pyns[0].comments)
  

  return (
    <>
    <div>
      {pyns.map(pyn => (
        <div>
          <img src={pyn.img_url} alt=""/>
        </div>
      ))}
    </div>
    </>
  );
}
