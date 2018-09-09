import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const propTypes = {
  GoogleAuth: PropTypes.object.isRequired,
  gapiClient: PropTypes.object.isRequired,
};

class GoogleDriveFileList extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: []
    };

    this.updateFilesInState = this.updateFilesInState.bind(this);
  }

  componentDidMount(){
    const { gapiClient } = this.props;
    const updateFilesInState = this.updateFilesInState;

    let request = gapiClient.request({
      'method': 'GET',
      'path': '/drive/v3/files',
    });

    request.execute(function(response) {
      updateFilesInState(response.files)
    });
  }

  updateFilesInState(files){
    this.setState({files: files})
  }

  render() {
    const { files } = this.state;
    let fileRows = files.map((file, index) => {
      return(
        <tr key={`doc-id-${index}`}>
          <td>{index + 1}</td>
          <td>{file.name}</td>
          <td>{file.mimeType}</td>
          <td>
            <Link to={`/file/${file.id}`}>
              View &nbsp;
              <span className='icon icon--chevron-right'/>
            </Link>
          </td>
        </tr>
      )
    });

    return(
      <div>
        <p>File List</p>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Document Name</th>
              <th>Mime Type</th>
              <th>View Properties</th>
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
