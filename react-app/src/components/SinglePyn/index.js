import React from 'react';
import styles from './SinglePyn.module.css'
import { useState, useEffect } from 'react';



export const SinglePyn = ({ pyn }) => {
  const [users, setUsers] = useState([]);
  // const { setSelected } = useContext(SelectedContext)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButton}>
        <i className="fa fa-arrow-left"></i> Back to Pyns
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={`${pyn.img_url}`} alt=""/>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.interactions}>
              <div className={styles.options}>
                ...
              </div>
              <div className={styles.download}>
                <a href={pyn.img_url} download={`${pyn.title}.jpg`}>
                  <i className="fa fa-download"></i>
                </a>
              </div>
            </div>
            <div className={styles.top_right}>
              Add to Board <span><i className="fa fa-angle-down"></i></span>
              <div>
                Save
              </div>
            </div>
          </div>
          <div>
            <h1>
              {pyn.title}
            </h1>
            <div>
              {pyn.description}
            </div>
          </div>
          <div className={styles.comments}>
            Comments
            <div className={styles.innerComments}>
              {pyn.comments?.map((comment) => (
                <>
                <div>
                  {comment.user?.email[0].toUpperCase()}
                </div>
                <div>
                  {comment.user.first_name}
                </div>
                <div>
                  {comment.content}
                </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
