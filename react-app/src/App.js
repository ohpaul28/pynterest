import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import NavBar from './components/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import Modal from './components/Modal'
import {Homepage} from './components/Homepage';
import { Pyns } from './components/Homepage/tabs/Pyns';


import { authenticate } from './store/session';
import { readingAllPyns } from './store/pyns'
import { readingBoards } from './store/boards';
import { SelectedProvider } from './components/context/selectedContext';
import { gettingUsers } from './store/users';
import loadingGif from './images/loadingGif.gif'


function App() {
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(<Pyns />)
  const dispatch = useDispatch();

  const LoadingScreen = () => {

    return (
      <div className='loading'>
        <img src={loadingGif} alt="" className='loadingGif'/>
      </div>
    )
  }

  useEffect(() => {
    (async() => {
      setLoaded(false)
      dispatch(authenticate()).then(() => {
        dispatch(readingAllPyns()).then(() => {
          dispatch(readingBoards()).then(() => {
            dispatch(gettingUsers()).then(() => {
              setTimeout(() => {
                setLoaded(true);
              }, 1500)
            })
          })
        })
      })
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <SelectedProvider value={{'selected': selected, 'setSelected': setSelected}}>
        <NavBar />
        <Modal />
        {!loaded && <LoadingScreen />}
        {loaded && <Homepage selected={selected}/>}
      </SelectedProvider>
    </BrowserRouter>
  );
}

export default App;
