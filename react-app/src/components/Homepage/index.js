import React, { useContext } from 'react';
import styles from './Homepage.module.css'
import SelectedContext from '../context/selectedContext';
import { useSelector } from 'react-redux';
import { Footer } from '../Footer';



export const Homepage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const images = Object.values(useSelector(state=> state.pyns)).reverse()


  const {selected} = useContext(SelectedContext)
  return (
    <>
      {sessionUser ?
        <div className={styles.selectedContainer}>
          {selected}
        </div> :
        /*-----------------------------------------*/
        <>
        <div className={styles.home}>
          <div className={styles.gridParent}>
            <h2 className={styles.homeh2}>Get your next idea</h2>
            <>
            {images.map((image, i) => (
              i < 21 ?
              <div className={styles.image}>
                <img src={image.img_url} alt="" />
              </div> : null
              ))}
            </>
          </div>
        <Footer/>
        </div>
        </>
      }

    </>
  );
}
