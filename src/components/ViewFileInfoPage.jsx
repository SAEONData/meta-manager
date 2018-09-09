import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from './Spinner.jsx';
import DriveFile from '../containers/DriveFile.jsx';

const propTypes = {
  fileId: PropTypes.string,
  fileName: PropTypes.string,
  GoogleAuth: PropTypes.object.isRequired,
  gapiClient: PropTypes.object,
};

const ViewFileInfoPage = ({fileId, GoogleAuth, gapiClient}) => {
  if(gapiClient){
    return(
      <div>
        <Link to='/'>
          Back &nbsp;
          <span className='icon icon--chevron-right'/>
        </Link>
        <p>Viewing File Properties</p>
        <DriveFile GoogleAuth={GoogleAuth} gapiClient={gapiClient} fileId={fileId}/>
      </div>
    )
  }
  return(<Spinner/>)

};

ViewFileInfoPage.propTypes = propTypes;
export default ViewFileInfoPage;
