import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import { hideModal } from '../../../store/modal'
import styles from './LoginForm.module.css'
import logo from '../../Icons/pinterest.svg'
import cross from '../../Icons/x.svg';
import { SignUpForm } from '../SignUpForm';
import { setCurrentModal } from '../../../store/modal';

export const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    dispatch(hideModal())
    // return <Redirect to='/' />;
  }

  const showSignUpForm = () => {
		dispatch(setCurrentModal(SignUpForm));
	};

  const loginDemo = async (e) => {
		e.preventDefault();
		await dispatch(login("demo@aa.io", "password"));
		dispatch(hideModal());
	};

  return (
    <div className={styles.parent}>
      <div className={styles.top}>
        <img src={logo} alt="" className={styles.logo}/>
        <img src={cross} alt="" className={styles.cross} onClick={() => dispatch(hideModal())}/>
      </div>
			<div className={styles.welcome}>Welcome to Pynterest</div>
      <form>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <div>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            className={styles.email}
          />
        </div>
        <div>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            className={styles.password}/>
        </div>
          <div className={styles.login} onClick={onLogin}>
            Log in
          </div>
      </form>
      <div className={styles.demobtn} onClick={loginDemo}>
        Demo User
      </div>
      <div className={styles.privacyPolicy}>
          <div>
          By continuing, you agree to Pynterest's
          </div>
          <div>
            <a className={styles.ToS} href="https://policy.pinterest.com/en/terms-of-service" rel="noreferrer" target="_blank">
              Terms of Service
            </a> and acknowledge you've read our
          </div>
          <div>
          <a className={styles.PP} href="https://policy.pinterest.com/en/privacy-policy" rel="noreferrer" target="_blank">
            Privacy Policy
          </a>
          </div>
        </div>
        <div className={styles.line}></div>
				<div className={styles.switch} onClick={showSignUpForm}>
					Not on Pynterest yet? Sign up
				</div>
    </div>
  );
};
