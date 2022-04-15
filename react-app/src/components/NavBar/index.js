import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import styles from './NavBar.module.css'

import { Pyns } from '../HomepageLI/tabs/Pyns';
import { Boards } from '../HomepageLI/tabs/Boards';
import UsersList from '../UsersList';

import { showModal, setCurrentModal } from '../../store/modal';
import { ProfileDropdown } from '../ProfileDropdown';


const NavBar = ({ setSelected }) => {
  const sessionUser = useSelector(state => state.session.user)
  const logo = "LOGO"

  const dispatch = useDispatch()

  const pynsTab = () => {
    setSelected(<Pyns />)
  }

  const boardsTab = () => {
    setSelected(<Boards />)
  }

  const usersTab = () => {
    setSelected(<UsersList setSelected={setSelected}/>)
  }


  const showLoginForm = () => {
    dispatch(setCurrentModal(LoginForm));
    dispatch(showModal());
  }

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal());
  }

  if (!sessionUser) {
    return (
      <nav>
        <div className={styles.nav_left}>
          {logo}
          Pynterest
        </div>
        <div className={styles.nav_right}>
          <div>Github</div>
          <div>Linkedin</div>
          <div>Original</div>
          <div className={styles.login} onClick={showLoginForm}>
            Log in
          </div>
          <div className={styles.signup} onClick={showSignUpForm}>
            Sign up
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className={styles.nav_left}>
          <div
          onClick={() => pynsTab()}
          className={styles.home}>
            {logo}
            Pynterest
          </div>
          <div>
            Explore:
            <div onClick={() => pynsTab()}>Pyns</div>
            <div onClick={() => boardsTab()}>Boards</div>
            <div onClick={() => usersTab()}>Users</div>
          </div>
        </div>
        <div className={styles.nav_right}>
          <ProfileDropdown setSelected={setSelected}/>
        </div>
      </nav>
    )
  }
}

export default NavBar;
