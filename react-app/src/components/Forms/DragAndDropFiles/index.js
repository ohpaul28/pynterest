import React from 'react';
import PropTypes from 'prop-types';
import styles from './DragAndDropFiles.module.css'


export function DragAndDropFiles() {
  return (
    <div className={styles.FilesDragAndDrop__area}>
      Hey, drop me some files
    </div>
  );
}

DragAndDropFiles.propTypes = {
  onUpload: PropTypes.func.isRequired,
};
