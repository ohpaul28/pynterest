import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { readingBoards } from '../../store/boards';




export const HomepageLI = ({ selected }) => {
  const dispatch = useDispatch();
  dispatch(readingBoards())

  return (
    <>
    <div>
      {selected}
    </div>
    </>
  );
}
