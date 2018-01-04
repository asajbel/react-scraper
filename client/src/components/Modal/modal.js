import React from 'react';
import PropTypes from 'prop-types';
import './modal.css'

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="mdl-backdrop" >
        <div className="mdl" >
          <div className="mdl-header">
            <h3 className="mdl-title">{this.props.title}</h3>
            <button type="button" className="cls" onClose={this.props.onClose}>
              <span>x</span>
            </button>
          </div>
          <div className="mdl-body">
            {this.props.children}
          </div>
          <div className="mdl-footer">
            <button className="btn btn-secondary" onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;