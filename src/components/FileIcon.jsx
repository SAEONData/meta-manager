import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  mimeType: PropTypes.string,
};

const FileIcon = ({mimeType}) => {
  switch(mimeType){
    case 'application/vnd.google-apps.document':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <i className='fas fa-file-alt blue-color'/>;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.google-apps.spreadsheet':
    case 'application/vnd.ms-excel':
      return <i className='fas fa-file-excel green-color'/>;
    case 'application/vnd.google-apps.folder':
        return <i className='fas fa-folder'/>;
    case 'image/jpeg':
      return <i className='fas fa-image'/>;
    case 'audio/mp3':
      return <i className='fas fa-file-audio'/>;
    case 'application/pdf':
      return <i className='fas fa-file-pdf red-color'/>;
    case 'application/zip':
      return <i className='fas fa-file-archive'/>;
    case 'application/vnd.google-apps.presentation':
      return <i className='fas fa-file-powerpoint yellow-color'/>;


    default:
      return mimeType
  }
};

FileIcon.propTypes = propTypes;
export default FileIcon;
