import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup, Modal} from 'react-bootstrap';

const propTypes = {
  GoogleAuth: PropTypes.object.isRequired,
  gapiClient: PropTypes.object.isRequired,
  file: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

class FileObjectModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      form: {}
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    let { form } = this.state;
    form[e.target.name] = e.target.value;

    this.setState({form})
  }


  onSubmitForm(e){
    e.preventDefault();
    const hideModal = this.props.onClose;

    const { gapiClient, file } = this.props;

    const { form } = this.state;
    let request = gapiClient.request({
      'method': 'PATCH',
      'path': '/drive/v3/files/'+ file.id,
      'params': {'fields': 'name, id, mimeType, properties'},
      'body': {'properties': { ...form }},
    });

    request.execute(function() {
      hideModal(null);
    });
  }

  render(){
    const { isOpen, onClose } = this.props;
    return(
      <Modal show={isOpen} onHide={() => { onClose(null) }}>
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
              <FormControl componentClass="select" placeholder="select" name="kpi" onChange={this.handleChange}>
                <option value="">Select</option>
                <option value="books">Contributing to a vibrant national innovation system.</option>
                <option value="podcasts">Enhance strategic international engagements.</option>
                <option value="#">Establish and maintain research infrastructure and platforms.</option>
                <option value="#">Growing a representative science and technology workforce in South Africa.</option>
                <option value="#addBlog">Operating world-class Research Platforms.</option>
                <option value="#addBlog">Promoting internationally competitive research as basis for a knowledge economy.</option>
                <option value="#addBlog">Providing cutting-edge research, technology and innovation platforms.</option>
              </FormControl>
            </FormGroup>{' '}
            <FormGroup controlId="fileTreeKey">
              <ControlLabel>File Tree Key</ControlLabel>{' '}
              <input name="fileTreeKey" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
            </FormGroup>{' '}
            <FormGroup controlId="costCenter">
              <ControlLabel>Cost Center</ControlLabel>{' '}
              <input name="costCenter" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
            </FormGroup>{' '}
            <FormGroup controlId="status">
              <ControlLabel>Status</ControlLabel>{' '}
              <input name="status" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
            </FormGroup>{' '}
            <Button type='submit' bsStyle="primary">Save</Button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }

}

FileObjectModal.propTypes = propTypes;
export default FileObjectModal;
