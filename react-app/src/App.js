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


function App() {
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(<Pyns />)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(readingAllPyns());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setSelected={setSelected}/>
      <Modal />
      <Switch>
        <ProtectedRoute path='/' exact={true}>
          <HomepageLI selected={selected}/>
        </ProtectedRoute>
        <Route path='/' exact={true}>
          <h1>Splash</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
