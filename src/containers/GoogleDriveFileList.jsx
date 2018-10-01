import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';

import FileIcon from '../components/FileIcon.jsx';
import FileActionsDropdownButton from './FileActionsDropdownButton.jsx';
import { dateTimeFormat } from '../utils/dateFormatter';
import StatusIcon from "../components/StatusIcon";

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
      displayFilters: false,
    };

    this.updateFilesInState = this.updateFilesInState.bind(this);
    this.loadFilesInFolder = this.loadFilesInFolder.bind(this);
    this.updateStateWithResponse = this.updateStateWithResponse.bind(this);
    this.toggleDisplayFilter = this.toggleDisplayFilter.bind(this);
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

  renderRows(files){
    const { gapiClient } = this.props;

    return files.map((file, index) => {
      if(file.mimeType === 'application/vnd.google-apps.folder'){
        return(
          <tr className='active-row' key={`doc-id-${index}`}>
            <td onClick={() => {this.loadFilesInFolder(file.id)}}>{file.name}</td>
            <td><FileIcon mimeType={file.mimeType} /></td>
            <td>{dateTimeFormat(file.modifiedTime)}</td>
            <td>{file.properties ? <StatusIcon status= {file.properties.status} />: ''}</td>
            <td>
              <FileActionsDropdownButton file={file} gapiClient={gapiClient} />
            </td>
          </tr>
        )

      }
      return(
        <tr className='active-row'
            key={`doc-id-${index}`}>
          <td onClick={() => {location.assign(`/file/${file.id}`)}}>{file.name}</td>
          <td><FileIcon mimeType={file.mimeType} /></td>
          <td>{dateTimeFormat(file.modifiedTime)}</td>
          <td>{file.properties ? <StatusIcon status= {file.properties.status} />: ''}</td>
          <td>
            <FileActionsDropdownButton file={file} gapiClient={gapiClient} />
          </td>
        </tr>
      )
    });
  }

  toggleDisplayFilter(){
    this.setState((prevState) => ({ displayFilters: !prevState.displayFilters }))
  }

  render() {
    const { files, showingInnerFolder, displayFilters } = this.state;
    const { isSignedIn, logout } = this.props;

    return(
      <div>
        {isSignedIn &&
          <div className='top-corner'>
            <Button bsStyle='primary' onClick={logout}><i className='fas fa-power-off'/></Button>
          </div>
        }
        <p>File List</p>
        <a className='cursor-pointer' onClick={this.toggleDisplayFilter}>{`${displayFilters ? 'Hide' : 'Show'}`} Advanced Filters</a>
        <br/>
        {showingInnerFolder && <a onClick={() => {location.reload()}}>Back</a>}
        <br/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Object Type</th>
              <th>Last Modified Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {this.renderRows(files)}
            </tbody>
        </Table>
      </div>
    )
  }
}

GoogleDriveFileList.propTypes = propTypes;
export default GoogleDriveFileList;
