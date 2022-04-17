import React, { useContext } from 'react';

import SelectedContext from '../context/selectedContext';



export const HomepageLI = () => {

  const {selected} = useContext(SelectedContext)
  return (
    <>
    {selected}
    </>
  );
}
