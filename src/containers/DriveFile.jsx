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
      form: {}
    };

    this.updateFileInState = this.updateFileInState.bind(this);
    this.showAddPropertyModal = this.showAddPropertyModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  onSubmitForm(e){
    e.preventDefault();
    const updateFileInState = this.updateFileInState;
    const hideModal = this.handleClose;

    const { gapiClient, fileId } = this.props;

    const { form } = this.state;
    let request = gapiClient.request({
      'method': 'PATCH',
      'path': '/drive/v3/files/'+ fileId,
      'params': {'fields': 'name, id, mimeType, properties'},
      'body': {'properties': { ...form }},
    });

    request.execute(function(response) {
      updateFileInState(response);
      hideModal();
    });
  }

  handleChange(e){
    let { form } = this.state;
    form[e.target.name] = e.target.value;

    this.setState({form})
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

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSubmitForm}>
              <p>Use this form to enter meta tags</p>
              <FormGroup controlId="person">
                <ControlLabel>Person</ControlLabel>{' '}
                <input name="person" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <FormGroup controlId="office">
                <ControlLabel>Office/Node</ControlLabel>{' '}
                <input name="office" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <FormGroup controlId="project">
                <ControlLabel>Project</ControlLabel>{' '}
                <input name="project" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <FormGroup controlId="grant">
                <ControlLabel>Grant</ControlLabel>{' '}
                <input name="grant" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <FormGroup controlId="kpi">
                <ControlLabel>KPI</ControlLabel>{' '}
                <input name="kpi" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <FormGroup controlId="fileTreeKey">
                <ControlLabel>File Tree Key</ControlLabel>{' '}
                <input name="fileTreeKey" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
              <FormGroup controlId="costCenter">
                <ControlLabel>Cost Center</ControlLabel>{' '}
                <input name="costCenter" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
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
