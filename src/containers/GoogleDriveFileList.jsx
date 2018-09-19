import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';

import FileIcon from '../components/FileIcon.jsx';
import FileActionsDropdownButton from './FileActionsDropdownButton.jsx';

const propTypes = {
  GoogleAuth: PropTypes.object.isRequired,
  gapiClient: PropTypes.object.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

class GoogleDriveFileList extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: [],
      showingInnerFolder: false,
    };

    this.updateFilesInState = this.updateFilesInState.bind(this);
    this.loadFilesInFolder = this.loadFilesInFolder.bind(this);
    this.updateStateWithResponse = this.updateStateWithResponse.bind(this);
  }

  componentDidMount(){
    const { gapiClient } = this.props;
    const updateFilesInState = this.updateFilesInState;

    let request = gapiClient.request({
      'method': 'GET',
      'path': '/drive/v3/files?fields=*',
    });

    request.execute(function(response) {
      updateFilesInState(response.files)
    });
  }

  updateFilesInState(files){
    this.setState({files: files})
  }

  updateStateWithResponse(nextState){
    this.setState({...nextState})
  }

  loadFilesInFolder(fileId){
    const { gapiClient } = this.props;
    const updateStateWithResponse = this.updateStateWithResponse;

    let request = gapiClient.request({
      'method': 'GET',
      'path': '/drive/v3/files?fields=*',
      'params': {'q': '"' + fileId + '" in parents'}
    });

    request.execute(function(response) {
      updateStateWithResponse({files: response.files, showingInnerFolder: true})
    });
  }

  render() {
    const { files, showingInnerFolder } = this.state;
    const { gapiClient, isSignedIn, logout } = this.props;

    let fileRows = files.map((file, index) => {
      if(file.mimeType === 'application/vnd.google-apps.folder'){
        return(
          <tr className='active-row' key={`doc-id-${index}`} onClick={() => {this.loadFilesInFolder(file.id)}}>
            <td>{file.name}</td>
            <td><FileIcon mimeType={file.mimeType} /></td>
            <td>{file.modifiedTime}</td>
            <td>
              <FileActionsDropdownButton file={file} gapiClient={gapiClient} />
            </td>
          </tr>
        )

      }
      return(
        <tr className='active-row'
            key={`doc-id-${index}`} onClick={() => {location.assign(`/file/${file.id}`)}}>
          <td>{file.name}</td>
          <td><FileIcon mimeType={file.mimeType} /></td>
          <td>{file.modifiedTime}</td>
          <td>
            <FileActionsDropdownButton file={file} gapiClient={gapiClient} />
          </td>
        </tr>
      )
    });

    return(
      <div>
        {isSignedIn &&
        <div className='top-corner'>
          <Button bsStyle='primary' onClick={logout}><i className='fas fa-power-off'/></Button>
        </div>
        }
        <p>File List</p>
        {showingInnerFolder && <a onClick={() => {location.reload()}}>Back</a>}
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Mime Type</th>
              <th>Last Modified Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {fileRows}
            </tbody>
        </Table>
      </div>
    )
  }
}

GoogleDriveFileList.propTypes = propTypes;
export default GoogleDriveFileList;
