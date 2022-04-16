import React from 'react';
import styles from './SinglePyn.module.css'



export const SinglePyn = ({ pyn }) => {



  return (
    <div className={styles.pageContainer}>
      <div>
        <i className="fa fa-arrow-left"></i> Back to Pyns
      </div>
      <div className={styles.container}>
        <div className={styles.image}>
          Image goes here
        </div>
        <div className={styles.top_right}>
          <div>
            {pyn.title}
          </div>
          <div>
            Add to Board <span><i className="fa fa-angle-down"></i></span>
          </div>
        </div>
        <div className={styles.interactions}>
          <a href={pyn.img_url} download={`${pyn.title}.jpg`}>
            <i className="fa fa-download"></i>
          </a>
          <i className="fa fa-link"></i>
        </div>

      </div>
    </div>
  )
}
