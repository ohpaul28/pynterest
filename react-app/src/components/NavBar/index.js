import React, { useContext } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {LoginForm} from '../Forms/LoginForm'
import {SignUpForm} from '../Forms/SignUpForm'
import styles from './NavBar.module.css'
import SelectedContext from '../context/selectedContext';

import { Pyns } from '../Homepage/tabs/Pyns';
import { Boards } from '../Homepage/tabs/Boards';
// import UsersList from '../UsersList';

import { showModal, setCurrentModal } from '../../store/modal';
import { ProfileDropdown } from '../ProfileDropdown';


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const { setSelected } = useContext(SelectedContext)

  const dispatch = useDispatch()

  const pynsTab = () => {
    setSelected(<Pyns />)
    let pynTab = document?.getElementById('pynTab')
    let boardTab = document?.getElementById('boardTab')
    // let userTab = document?.getElementById('userTab')

    pynTab.style.backgroundColor = 'black';
    pynTab.style.color = 'white';

    boardTab.style.backgroundColor = 'white';
    boardTab.style.color = 'black';

    // userTab.style.backgroundColor = 'white';
    // userTab.style.color = 'black';

  }

  const boardsTab = () => {
    setSelected(<Boards />)
    let pynTab = document?.getElementById('pynTab')
    let boardTab = document?.getElementById('boardTab')
    // let userTab = document?.getElementById('userTab')

    pynTab.style.backgroundColor = 'white';
    pynTab.style.color = 'black';

    boardTab.style.backgroundColor = 'black';
    boardTab.style.color = 'white';

    // userTab.style.backgroundColor = 'white';
    // userTab.style.color = 'black';
  }

  // const usersTab = () => {
  //   setSelected(<UsersList />)
  //   let pynTab = document?.getElementById('pynTab')
  //   let boardTab = document?.getElementById('boardTab')
  //   let userTab = document?.getElementById('userTab')

  //   pynTab.style.backgroundColor = 'white';
  //   pynTab.style.color = 'black';

  //   boardTab.style.backgroundColor = 'white';
  //   boardTab.style.color = 'black';

  //   userTab.style.backgroundColor = 'black';
  //   userTab.style.color = 'white';
  // }


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
      <nav className={styles.nav_container}>
        <div className={styles.nav_left}>
          <img className={styles.logo} src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png" alt=""/>
          <div className={styles.name}>
            Pynterest
          </div>
        </div>
        <div className={styles.nav_right}>
          <div className={styles.profile_links}>
            <NavLink to='https://github.com/ohpaul28' className={styles.github}>Github</NavLink>
            <NavLink to='https://www.linkedin.com/in/paul-oh-82824117a/' className={styles.linkedin}>Linkedin</NavLink>
            <NavLink to='https://www.pinterest.com/' className={styles.original}>Original</NavLink>
          </div>
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
      <nav className={styles.nav_container}>
        <div className={styles.nav_left_in}>
          <div
          onClick={() => pynsTab()}
          className={styles.nav_left}>
            <img className={styles.logo_in} src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png" alt=""/>
          </div>
          <div className={styles.explore}>
              <div activeClassName={styles.pynActive} className={styles.pynTab} id="pynTab" onClick={() => pynsTab()}>Pyns</div>
              <div activeClassName={styles.boardActive} className={styles.boardTab} id="boardTab" onClick={() => boardsTab()}>Boards</div>
              {/* <div className={styles.userTab} id="userTab" onClick={() => usersTab()}>Users</div> */}
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
