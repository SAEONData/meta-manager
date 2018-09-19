import React from 'react';
import PropTypes from 'prop-types';
import GoogleDriveFileList from '../containers/GoogleDriveFileList.jsx';
import Spinner from './Spinner.jsx';
import LoginPage from './LoginPage.jsx';

const propTypes = {
  GoogleAuth: PropTypes.object.isRequired,
  gapiClient: PropTypes.object,
  isSignedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired,

};

const HomePage = ({GoogleAuth, gapiClient, isSignedIn, logout}) => {
  if(gapiClient && isSignedIn){
    return(
      <GoogleDriveFileList
        GoogleAuth={GoogleAuth}
        gapiClient={gapiClient}
        isSignedIn={isSignedIn}
        logout={logout}/>
    )
  }

  if(!isSignedIn){
    return(
      <LoginPage
        GoogleAuth={GoogleAuth}/>
    )
  }

  return(
    <Spinner />
  )
};

HomePage.propTypes = propTypes;
export default HomePage;
