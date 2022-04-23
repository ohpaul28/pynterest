import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ProfileDropdown.module.css";
import LogoutButton from "../auth/LogoutButton"
import { User } from '../User'
import checkmark from '../Icons/check_mark.svg';

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
    setSelected(<User />)
		setShowBox(false);
		return;
	};

	return (
		<div className={styles.profileOuterContainer} onClick={() => goToProfile()}>
      <div className={styles.profileOuter}>
        <div className={styles.profile_page_redirect}>
          {sessionUser.last_name[0].toUpperCase()}
        </div>
      </div>
			<div className={styles.profileIconContainer} onClick={openBox}>
        <div className={styles.openUserMenu}>
          <i className="fa fa-angle-down"></i>
        </div>
			</div>
        {showBox && (
          <div id="profile_dropdown" className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            <div className={styles.currentlyIn}>
              Currently in
            </div>
            <div className={styles.smallUserCard} onClick={() => goToProfile()}>
              <div className={styles.userInitial}>
                {sessionUser.last_name[0].toUpperCase()}
              </div>
              <div className={styles.smallUserCardRight}>
                <span className={styles.userName}>{sessionUser.first_name}{" "}{sessionUser.last_name}</span> <br />
                <span className={styles.personal}>Personal</span> <img className={styles.checkmark} src={checkmark} alt="" /><br/>
                <span className={styles.email}>{sessionUser.email}</span>
              </div>
            </div>
            <div className={styles.logout}>
              <LogoutButton />
            </div>
          </div>
        )}
		</div>
	);
};
