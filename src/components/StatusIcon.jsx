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
      return <img  className='fas' src={require('../images/file.svg')} />;
    case 'published':
      return <img className='fas' src={require('../images/publish.png')}/>;



    default:
      return status
  }
};

StatusIcon.propTypes = propTypes;
StatusIcon.defaultProps = {
  status: ''
};
export default StatusIcon;
