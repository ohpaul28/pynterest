import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/session";
import { setCurrentModal, hideModal } from "../../../store/modal";
import { login } from "../../../store/session";
import { LoginForm } from "../LoginForm";
import styles from './SignUpForm.module.css'
import logo from '../../Icons/pinterest.svg'
import cross from '../../Icons/x.svg';

export const SignUpForm = () => {

	const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("")

	const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("")

	const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")

	const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

	const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const dispatch = useDispatch();

	const loginDemo = async (e) => {
		e.preventDefault();
		await dispatch(login("demo@aa.io", "password"));
		dispatch(hideModal());
	};

  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false
  //     return
  //   }

  //   // if (firstName.length < 1) {
  //   //   setFirstNameError("Don't forget to tell us who you are!")
  //   //   // setDisabled(true)
  //   //   return
  //   // } else {
  //   //   setFirstNameError('')
  //   // }

  //   // if (lastName.length < 1) {
  //   //   setLastNameError("Don't forget to tell us your last name!")
  //   //   // setDisabled(true)
  //   //   return
  //   // } else {
  //   //   setLastNameError('')
  //   // }

  //   // if (email.length < 1 || !emailValidate(email)) {
  //   //   setEmailError("Don't forget to add a valid email!")
  //   //   // setDisabled(true)
  //   //   return
  //   // } else {
  //   //   setEmailError('')
  //   // }

  //   // if (password.length < 1) {
  //   //   setPasswordError('Make sure you set a password!')
  //   //   // setDisabled(true)
  //   // } else {
  //   //   setPasswordError('')
  //   // }

  //   // if (password !== confirmPassword) {
  //   //   setConfirmPasswordError("Make sure your passwords match!")
  //   //   // setDisabled(true)
  //   // } else {
  //   //   setConfirmPasswordError('')
  //   //   // setDisabled(false)
  //   //   return
  //   // }
  // }, [firstName, lastName, email, password, confirmPassword])


	const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(signUp(firstName, lastName, email, password, confirmPassword));

    if (data) {
      const errorObj = {}
      for (let i = 0; i < data.length; i++) {
        const ele = data[i];
        const singleError = ele.split(" : ")
        errorObj[singleError[0]] = singleError[1]
      }

      if (errorObj.first_name) {
        setFirstNameError(errorObj.first_name)
      } else {
        setFirstNameError('')
      }

      if (errorObj.last_name) {
        setLastNameError(errorObj.last_name)
      } else {
        setLastNameError('')
      }

      if (errorObj.email) {
        setEmailError(errorObj.email)
      } else {
        setEmailError('')
      }

      if (errorObj.password) {
        setPasswordError(errorObj.password)
      } else {
        setPasswordError('')
      }

      if (errorObj.confirm_password) {
        setConfirmPasswordError(errorObj.confirm_password)
      } else {
        setConfirmPasswordError('')
      }
      return
    }
    dispatch(hideModal());
	};

	const showLoginForm = () => {
		dispatch(setCurrentModal(LoginForm));
	};



	return (
		<div className={styles.parent}>
      <div className={styles.top}>
        <img src={logo} alt="" className={styles.logo}/>
        <img src={cross} alt="" className={styles.cross} onClick={() => dispatch(hideModal())}/>
      </div>
			<div className={styles.welcome}>Welcome to Pynterest</div>
      <div className={styles.find}>Find new ideas to try</div>
			<form className={styles.signup_form}>
				<div className={styles.fields}>
					<div>
						<input
							type="text"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
              placeholder="First Name"
              className={styles.firstName}
						></input> <br />
					</div>
          <div className={styles.error}>{firstNameError}</div>
					<div>
						<input
							type="text"
							name="lastName"
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
              placeholder="Last Name"
              className={styles.lastName}
						></input> <br />
					</div>
          <div className={styles.error}>{lastNameError}</div>
					<div>
						<input
							type="text"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
              placeholder="Email"
              className={styles.email}
						></input> <br />
					</div>
          <div className={styles.error}>{emailError}</div>
					<div>
						<input
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="none"
              placeholder="Password"
              className={styles.password}
							value={password}
						></input>
					</div>
          <div className={styles.error}>{passwordError}</div>
					<div>
						<input
							type="password"
							name="confirmPassword"
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="none"
							value={confirmPassword}
              placeholder="Confirm Password"
              className={styles.cpassword}
						></input> <br />
					</div>
          <div className={styles.error}>{confirmPasswordError}</div>
				</div>
				<div
					className={styles.signupbtn}
					onClick={handleSubmit}
				>
					Sign Up
				</div>
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
				<div className={styles.switch} onClick={showLoginForm}>
					Already a member? Log in
				</div>
			</form>
		</div>
	);
};
