import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Iframe from 'react-iframe';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

class PublishObjectModal extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { isOpen, onClose } = this.props;
    return(
      <Modal show={isOpen} onHide={() => { onClose() }} bsSize='large'>
        <Modal.Header closeButton />
        <Iframe
          url={process.env.PUBLISH_URL}
          width='900px'
          height='700px'
          id='publishDialog'
          allowFullScreen
        />
      </Modal>
    )
  }

}

PublishObjectModal.propTypes = propTypes;
export default PublishObjectModal;
