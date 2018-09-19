import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const propTypes = {
  gapiClient: PropTypes.object,
  file: PropTypes.object.isRequired,
};


class FileActionsDropdownButton extends Component {
  constructor(props){
    super(props);
  }

  render (){
    const { file } = this.props;

    return(
      <DropdownButton
        bsStyle='info'
        title='More'
        key={1}
        id='file-actions'
      >
        <MenuItem eventKey="1">Archive</MenuItem>
        <MenuItem eventKey="2">File</MenuItem>
        <MenuItem eventKey="3">Publish</MenuItem>
      </DropdownButton>
    )
  }
}

FileActionsDropdownButton.propTypes = propTypes;
export default FileActionsDropdownButton;
