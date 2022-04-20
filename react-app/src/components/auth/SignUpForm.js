import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { setCurrentModal, hideModal } from "../../store/modal";
import { login } from "../../store/session";
import LoginForm from "./LoginForm";
import styles from './Auth.module.css'

const SignUpForm = () => {
  const firstRender = useRef(true)

	const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("")

	const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("")

	const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")

	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("")

  const [disabled, setDisabled] = useState(true)
	const dispatch = useDispatch();

	const loginDemo = async (e) => {
		e.preventDefault();
		await dispatch(login("demo@aa.io", "password"));
		dispatch(hideModal());
	};

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (firstName.length < 1) {
      setFirstNameError("You missed a spot! Don't forget to tell us who you are!")
      setDisabled(true)
      return
    } else {
      setDisabled(false)
      setFirstNameError('')
    }

    if (lastName.length < 1) {
      setLastNameError("You missed a spot! Don't forget to tell us your last name!")
      setDisabled(true)
      return
    } else {
      setDisabled(false)
      setLastNameError('')
    }

    if (email.length < 1) {
      setEmailError("You missed a spot! Don't forget to add your email!")
      setDisabled(true)
      return
    } else {
      setDisabled(false)
      setEmailError('')
    }

    if (password !== confirmPassword) {
      setPasswordError("You missed a spot! Make sure your passwords match!")
      setDisabled(true)
    } else {
      setPasswordError('')
      setDisabled(false)
      return
    }
  }, [firstName, lastName, email, password, confirmPassword])


	const handleSubmit = () => {
    if (disabled) return;
      dispatch(signUp(firstName, lastName, email, password, confirmPassword));
      dispatch(hideModal());
	};

	const showLoginForm = () => {
		dispatch(setCurrentModal(LoginForm));
	};

	return (
		<div className={styles.parent}>
			<h4>Welcome to Pynterest!</h4>
			<form className={styles.signup_form}>
				<div className={styles.fields}>
					<div>
						<label>First Name</label>
						<input
							type="text"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						></input> <br />
            <div>{firstNameError}</div>
					</div>
					<div>
						<label>Last Name</label>
						<input
							type="text"
							name="lastName"
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
						></input> <br />
            <div>{lastNameError}</div>
					</div>
					<div>
						<label>Email</label>
						<input
							type="text"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						></input> <br />
            <div>{emailError}</div>
					</div>
					<div>
						<label>Password</label>
						<input
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="none"
							value={password}
						></input>
					</div>
					<div>
						<label>Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="none"
							value={confirmPassword}
						></input> <br />
            <div>{passwordError}</div>
					</div>
				</div>
				<div
					className={styles.div_button}
					onClick={handleSubmit}
				>
					Sign Up
				</div>
				<div
					className={styles.div_button}
					onClick={loginDemo}
				>
					Demo User
				</div>
				<div
					className={styles.switch}
					onClick={showLoginForm}
				>
					Already signed up? Log in!
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
