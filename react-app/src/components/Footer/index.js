import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {

  return (
    <div className={styles.container}>
      <div className={styles.devIcons}>
        <i className="devicon-python-plain-wordmark"></i>
        <i className="devicon-flask-original-wordmark"></i>
        <i class="devicon-postgresql-plain-wordmark"></i>
        <i className="devicon-react-original-wordmark"></i>
        <i className="devicon-redux-original"></i>
        <i className="devicon-html5-plain-wordmark"></i>
        <i className="devicon-css3-plain-wordmark"></i>
        <i className="devicon-heroku-plain"></i>
        <i class="devicon-docker-plain-wordmark"></i>
        <i className="devicon-amazonwebservices-plain-wordmark"></i>
      </div>
    </div>
  )
}
