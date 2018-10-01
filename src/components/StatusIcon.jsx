import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  status: PropTypes.string,
};

const StatusIcon = ({status}) => {
  switch(status.toLowerCase()){
    case 'archived':
      return <i className='fas fa-archive'/>;
    case 'filed':
      return <i className='fas fa-file-export'/>;
    case 'published':
      return <i className='fas fa-check blue-color'/>;



    default:
      return status
  }
};

StatusIcon.propTypes = propTypes;
StatusIcon.defaultProps = {
  status: ''
}
export default StatusIcon;
