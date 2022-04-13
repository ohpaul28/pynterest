import React, { useState } from "react";
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
	const dispatch = useDispatch();

	const loginDemo = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("demo@aa.io", "password"));
		if (data) return setErrors(data);
		dispatch(hideModal());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
    // console.log('\n\n\n\n\n\nPASSWORD',password,'PASSWORD\n\n\n\n\n\n\n')
    // console.log('\n\n\n\n\n\nCONFIRMPASSWORD',confirmPassword,'CONFIRMPASSWORD\n\n\n\n\n\n\n')
    if (password === confirmPassword) {
      const data = dispatch(signUp(firstName, lastName, email, password, confirmPassword));
      if (data) {
        return setErrors(data);
      }
      dispatch(hideModal());
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
