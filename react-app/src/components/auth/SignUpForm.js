import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { setCurrentModal, hideModal } from "../../store/modal";
import { login } from "../../store/session";
import LoginForm from "./LoginForm";
import styles from './Auth.module.css'

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true)
	const dispatch = useDispatch();

	const loginDemo = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("demo@aa.io", "password"));
		if (data) return setErrors(data);
		dispatch(hideModal());
	};

  useEffect(() => {
    if (!firstName) {
      errors.push('First name is required')
    }
    if (!lastName) {
      errors.push('Last name is required')
    }
    if (!email) {
      errors.push('Email is required')
    }
    if (password !== confirmPassword) {
      errors.push('Password must match')
    }
    else {
      setErrors([])
      setDisabled(false)
    }
  }, [firstName, lastName, email, password, confirmPassword])


	const handleSubmit = () => {
    // if (password === confirmPassword ? )
    if (password === confirmPassword) {
      const data = dispatch(signUp(firstName, lastName, email, password, confirmPassword));
      dispatch(hideModal());
      if (data) {
        return setErrors(data);
      }
    }
	};

	const showLoginForm = () => {
		dispatch(setCurrentModal(LoginForm));
	};

	return (
		<div className={styles.parent}>
			<h4>Welcome to Pynterest!</h4>
			{errors.length > 0 && (
				<div className={styles.error_container}>
					{errors.map((error, i) => (
						<div key={i}>{error.replace("_", " ")}</div>
					))}
				</div>
			)}
			<form className={styles.signup_form}>
				<div className={styles.fields}>
					<div>
						<label>First Name</label>
						<input
							type="text"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						></input>
					</div>
					<div>
						<label>Last Name</label>
						<input
							type="text"
							name="lastName"
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
						></input>
					</div>
					<div>
						<label>Email</label>
						<input
							type="text"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						></input>
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
						></input>
					</div>
				</div>
				<div
					className={styles.div_button}
					onClick={handleSubmit}
          disabled={disabled}
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
