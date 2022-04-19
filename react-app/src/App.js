import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Modal from './components/Modal'
import {HomepageLI} from './components/HomepageLI';
import { Pyns } from './components/HomepageLI/tabs/Pyns';


import { authenticate } from './store/session';
import { readingAllPyns } from './store/pyns'
import { readingBoards } from './store/boards';
import { SelectedProvider } from './components/context/selectedContext';
import { gettingUsers } from './store/users';


function App() {
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(<Pyns />)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(readingAllPyns());
      await dispatch(readingBoards())
      await dispatch(gettingUsers())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <SelectedProvider value={{'selected': selected, 'setSelected': setSelected}}>
        <NavBar />
        <Modal />
        <Switch>
          <ProtectedRoute path='/' exact={true}>
            <HomepageLI selected={selected}/>
          </ProtectedRoute>
          <Route path='/' exact={true}>
            <h1>Splash</h1>
          </Route>
        </Switch>
      </SelectedProvider>
    </BrowserRouter>
  );
}

export default App;
