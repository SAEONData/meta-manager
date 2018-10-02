import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

const propTypes = {
  GoogleAuth: PropTypes.object.isRequired,
  gapiClient: PropTypes.object.isRequired,
  fileId: PropTypes.string.isRequired,
};

class DriveFile extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: {},
      showModal: false,
      form: {}
    };

    this.updateFileInState = this.updateFileInState.bind(this);
    this.showAddPropertyModal = this.showAddPropertyModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
  }

  componentDidMount(){
    const { gapiClient, fileId } = this.props;
    const updateFileInState = this.updateFileInState;

    let request = gapiClient.request({
      'method': 'GET',
      'path': '/drive/v3/files/'+ fileId ,
      'params': {'fields': 'name, id, mimeType, properties'}
    });

    request.execute(function(response) {
      updateFileInState(response)
    });
  }

  updateFileInState(file){
    this.setState({file})
  }

  showAddPropertyModal(){
    this.setState({showModal: true})
  }

  handleClose() {
    this.setState({showModal: false})
  }

  deleteProperty(property){
    const { gapiClient, fileId } = this.props;
    const updateFileInState = this.updateFileInState;

    let request = gapiClient.request({
      'method': 'PATCH',
      'path': '/drive/v3/files/'+ fileId,
      'params': {'fields': 'name, id, mimeType, properties'},
      'body': {'properties': { [property]: null }},
    });

    request.execute(function(response) {
      updateFileInState(response);
    });
  }

  render() {
    const { file } = this.state;
    const keys = Object.keys(file);

    const fileProps = keys.map((key, index) => {
      if(typeof(file[key]) === 'object'){
        let inner = file[key];
        let innerKeys = Object.keys(inner);

        let subRow = innerKeys.map((innerKey, innerIndex) => {
          return(
            <tr key={`inner-file-prop-${innerIndex}`}>
              <td>{innerKey}</td>
              <td>{inner[innerKey]}</td>
              <td><a onClick={() => {this.deleteProperty(innerKey)}}>Delete</a></td>
            </tr>
          )
        });

        return(
          <React.Fragment key={`frag-${index}`}>
            <tr key={`prop-${index}`}>
              <td colSpan={3}>{key}</td>
            </tr>
            {subRow}
          </React.Fragment>
        )
      }
      return(
        <tr key={`file-prop-${index}`}>
          <td>{key}</td>
          <td>{file[key]}</td>
          <td>&nbsp;</td>
        </tr>
      )
    });

    return(
      <div>
        <Table striped bordered condensed hover>
          <tbody>
          {fileProps}
          </tbody>
        </Table>
        <Button bsStyle="primary" onClick={this.showAddPropertyModal}>Add Property</Button>
      </div>
    )
  }

}

DriveFile.propTypes = propTypes;
export default DriveFile;
