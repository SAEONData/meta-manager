import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const propTypes = {
  gapiClient: PropTypes.object,
  file: PropTypes.object.isRequired,
  onFileActionClicked: PropTypes.func,
  onArchiveActionClicked: PropTypes.func,
  onPublishClicked: PropTypes.func,
};


class FileActionsDropdownButton extends Component {
  constructor(props){
    super(props);
  }

  render (){
    const { file, onFileActionClicked, onArchiveActionClicked, onPublishClicked } = this.props;

    return(
      <DropdownButton
        bsStyle='info'
        title='More'
        key={1}
        id='file-actions'
      >
        <MenuItem eventKey="1" onClick={() => { onArchiveActionClicked(file) }}>Archive</MenuItem>
        <MenuItem eventKey="2" onClick={() => { onFileActionClicked(file) }}>File</MenuItem>
        <MenuItem eventKey="3" onClick={() => { onPublishClicked() }}>Publish</MenuItem>
      </DropdownButton>
    )
  }
}

FileActionsDropdownButton.propTypes = propTypes;
export default FileActionsDropdownButton;
