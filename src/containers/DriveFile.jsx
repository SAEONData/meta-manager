import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, FormGroup, ControlLabel } from 'react-bootstrap';

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
      propertyKey: '',
      propertyValue: '',
    };

    this.updateFileInState = this.updateFileInState.bind(this);
    this.showAddPropertyModal = this.showAddPropertyModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  onSubmitForm(e){
    e.preventDefault();
    const { propertyValue, propertyKey } = this.state;
    const { gapiClient, fileId } = this.props;

    let request = gapiClient.request({
      'method': 'PATCH',
      'path': '/drive/v3/files/'+ fileId,
      'params': {properties: { 'test': 'value' }, 'fields': 'name, id, mimeType, properties'},
    });

    request.execute(function(response) {
      console.log(response)
    });
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
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
            </tr>
          )
        });

        return(
          <React.Fragment key={`frag-${index}`}>
            <tr key={`prop-${index}`}>
              <td colSpan={2}>{key}</td>
            </tr>
            {subRow}
          </React.Fragment>
        )
      }
      return(
        <tr key={`file-prop-${index}`}><td>{key}</td><td>{file[key]}</td></tr>
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

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSubmitForm}>
              <FormGroup controlId="key">
                <ControlLabel>Key</ControlLabel>{' '}
                <input name="propertyKey" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <FormGroup controlId="value">
                <ControlLabel>Value</ControlLabel>{' '}
                <input name="propertyValue" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <Button type='submit' bsStyle="primary">Save</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }

}

DriveFile.propTypes = propTypes;
export default DriveFile;
