import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormGroup, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';

const propTypes = {
  GoogleAuth: PropTypes.object.isRequired,
  gapiClient: PropTypes.object.isRequired,
  file: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

class ArchiveObjectModal extends Component {

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

    const tooltip = (
      <Tooltip id="tooltip">
        Enter URL from <strong>previous archived</strong> version.
      </Tooltip>
    );

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
            <FormGroup controlId="title">
              <ControlLabel>Title</ControlLabel>{' '}
              <input name="title" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
            </FormGroup>{' '}
            <FormGroup controlId="previousVersion">
              <ControlLabel>Previous Version</ControlLabel>{' '}
              <OverlayTrigger placement="bottom" overlay={tooltip}>
                <input name="previousVersion" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </OverlayTrigger>
            </FormGroup>{' '}
            <Button type='submit' bsStyle="primary">Save</Button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }

}

ArchiveObjectModal.propTypes = propTypes;
export default ArchiveObjectModal;
