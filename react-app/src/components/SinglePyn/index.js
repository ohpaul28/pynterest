import React from 'react';
import styles from './SinglePyn.module.css'



export const SinglePyn = () => {


  return (
    <div className={styles.pageContainer}>
      <div>
        <i className="fa fa-arrow-left"></i> Back to Pyns
      </div>
      <div className={styles.container}>
        <div className={styles.image}>
          Image goes here
        </div>
        <div className={styles.interactions}>
          <a href={pyn.img_url} download={`${pyn.title}.jpg`}>
            <i className="fa fa-download"></i>
          </a>
          <i className="fa fa-share"></i>
          
        </div>
      </div>
    </div>
  )
}
