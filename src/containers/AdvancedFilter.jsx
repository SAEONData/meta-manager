import React, { Component } from 'react'
import {ControlLabel, FormGroup} from 'react-bootstrap';

const propTypes = {};

class AdvancedFilter extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      owner: '',
      objectType: '',
      author: '',
    }
  }

  handleChange(e){

  }
  render(){
    return(
      <React.Fragment>
        <div className='row'>
            <div className='col-md-3'>
              <FormGroup controlId="name">
                <ControlLabel>File Name</ControlLabel>{' '}
                <input name="name" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
            </div>
            <div className='col-md-3'>
              <FormGroup controlId="author">
                <ControlLabel>Author</ControlLabel>{' '}
                <input name="author" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
            </div>
            <div className='col-md-3'>
              <FormGroup controlId="owner">
                <ControlLabel>Owner</ControlLabel>{' '}
                <input name="owner" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
            </div>
            <div className='col-md-3'>
              <FormGroup controlId="objectType">
                <ControlLabel>Object Type</ControlLabel>{' '}
                <input name="objectType" className='form-control' type="text" placeholder="" onChange={this.handleChange}/>
              </FormGroup>{' '}
            </div>
        </div>
      </React.Fragment>
    )
  }
}

AdvancedFilter.propTypes = propTypes;
export default AdvancedFilter;
