import React from 'react';
import PropTypes from 'prop-types';
import GoogleDriveFileList from '../containers/GoogleDriveFileList.jsx';
import Spinner from './Spinner.jsx';

const propTypes = {
  GoogleAuth: PropTypes.object.isRequired,
  gapiClient: PropTypes.object,
};

const HomePage = ({GoogleAuth, gapiClient}) => {
  if(gapiClient){
    return(<GoogleDriveFileList GoogleAuth={GoogleAuth} gapiClient={gapiClient}/>)
  }

  return(
    <Spinner />
  )
};

HomePage.propTypes = propTypes;
export default HomePage;
