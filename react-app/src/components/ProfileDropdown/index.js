import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ProfileDropdown.module.css";
import LogoutButton from "../auth/LogoutButton"
import { User } from '../User'

export const ProfileDropdown = ({ setSelected }) => {
	const [showBox, setShowBox] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);

	const openBox = () => setShowBox(!showBox);

	useEffect(() => {
		if (!showBox) return;

		const closeBox = () => setShowBox(false);
		document.addEventListener("click", closeBox);

		return () => document.removeEventListener("click", closeBox);
	});

	const goToProfile = () => {
    setSelected(<User user={sessionUser}/>)
		setShowBox(false);
		return;
	};

	return (
		<div className={styles.profileOuterContainer}>
      <div className={styles.profile_page_redirect} onClick={goToProfile}>
        {sessionUser.last_name[0].toUpperCase()}
      </div>
			<div className={styles.profileIconContainer} onClick={openBox}>
        <i className="fa fa-angle-down"></i>
			</div>
        {showBox && (
          <div id="profile_dropdown" className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            <div>
              Currently in
            </div>
            <div>
              {sessionUser.last_name[0].toUpperCase()}
            </div>
            <div>
              {sessionUser.last_name}{sessionUser.first_name}
            </div>
            <LogoutButton />
          </div>
        )}
		</div>
	);
};
