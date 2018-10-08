import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Modal } from 'react-bootstrap';

import { dateTimeFormat } from '../utils/dateFormatter';
import FileIcon from '../components/FileIcon.jsx';
import FileActionsDropdownButton from './FileActionsDropdownButton.jsx';
import StatusIcon from '../components/StatusIcon.jsx';
import FileObjectModal from './FileObjectModal.jsx';
import ArchiveObjectModal from './ArchiveObjectModal.jsx';

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
      activeFileObject: null,
      isFormOpen: false,
      isArchiveFormOpen: false,
      isHelpModalShown: false,
    };

    this.updateFilesInState = this.updateFilesInState.bind(this);
    this.loadFilesInFolder = this.loadFilesInFolder.bind(this);
    this.updateStateWithResponse = this.updateStateWithResponse.bind(this);
    this.toggleDisplayFilter = this.toggleDisplayFilter.bind(this);
    this.toggleIsFormOpen = this.toggleIsFormOpen.bind(this);
    this.toggleIsArchiveFormOpen = this.toggleIsArchiveFormOpen.bind(this);
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
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

  toggleIsFormOpen(file){
    this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen, activeFileObject: file}))
  }

  toggleIsArchiveFormOpen(file){
    this.setState(prevState => ({ isArchiveFormOpen: !prevState.isArchiveFormOpen, activeFileObject: file}))
  }

  toggleHelpModal(){
    this.setState(prevState => ({ isHelpModalShown: !prevState.isHelpModalShown }))
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
              <FileActionsDropdownButton
                file={file}
                gapiClient={gapiClient}
                onFileActionClicked={this.toggleIsFormOpen}
                onArchiveActionClicked={this.toggleIsArchiveFormOpen}
              />
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
            <FileActionsDropdownButton
              file={file}
              gapiClient={gapiClient}
              onFileActionClicked={this.toggleIsFormOpen}
              onArchiveActionClicked={this.toggleIsArchiveFormOpen}
            />
          </td>
        </tr>
      )
    });
  }

  toggleDisplayFilter(){
    this.setState((prevState) => ({ displayFilters: !prevState.displayFilters }))
  }

  render() {
    const {
      files,
      showingInnerFolder,
      displayFilters,
      activeFileObject,
      isFormOpen,
      isArchiveFormOpen,
      isHelpModalShown } = this.state;
    const { isSignedIn, logout, GoogleAuth, gapiClient } = this.props;

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
              <th>Actions &nbsp;
                <a className='cursor-pointer' onClick={this.toggleHelpModal}>
                  <i className='fas fa-question-circle small'/>
                </a>
              </th>
            </tr>
            </thead>
            <tbody>
              {this.renderRows(files)}
            </tbody>
        </Table>
        <FileObjectModal
          GoogleAuth={GoogleAuth}
          gapiClient={gapiClient}
          file={activeFileObject}
          isOpen={isFormOpen}
          onClose={this.toggleIsFormOpen}/>
        <ArchiveObjectModal
          GoogleAuth={GoogleAuth}
          gapiClient={gapiClient}
          file={activeFileObject}
          isOpen={isArchiveFormOpen}
          onClose={this.toggleIsArchiveFormOpen}/>
        <Modal show={isHelpModalShown} onHide={this.toggleHelpModal}>
          <Modal.Header closeButton>
            <Modal.Title>Actions Help</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Archive</h2>
            <p>This will add your object to the SAEON digital object archive where it will be preserved.</p>

            <h2>File</h2>
            <p>This will also add your object to the SAEON digital object archive but will also offer you the
              opportunity to fill in information that will allow it to be recognised by SAEON’s
              filing system and to indicate which KPI it relates to and which quarter it should be reported in.</p>

            <h2>Publish</h2>
            <p>this publishes digital objects in the SAEON repository and makes them publicly available and assigns a
              Digital Object Identifier (DOI) assigned to them.
            </p>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

GoogleDriveFileList.propTypes = propTypes;
export default GoogleDriveFileList;
