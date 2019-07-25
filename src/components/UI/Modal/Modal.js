import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component{
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  componentDidUpdate(){
    console.log('[Modal] update');
  }
  render(){
    return(
      <Aux>
        <div className={classes.Modal} style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? 1 : 0
        }}>
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} remove={this.props.modalClosed} />
      </Aux>
    )
  }
}

export default Modal
