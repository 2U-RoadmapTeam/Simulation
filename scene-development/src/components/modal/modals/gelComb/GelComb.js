import React, { Component } from "react";
import { connect } from 'react-redux';
import Graphics from 'components/pipette/Graphics';
import FocusLock from 'react-focus-lock';

import {
    showModal,
    removeGelComb
} from 'actions';

import "./GelComb.scss";
import Warning from './img/warning.svg';
import Gel from './img/gel.svg';
import GelComb from './img/gelComb.svg';

const images = {
  Warning: Warning,
  Gel: Gel,
  GelComb: GelComb
}

class PipetteVolume extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    close = () => {

      //this.props.validatePopup({id: 1});

      this.props.removeGelComb({
        comb: false,
        id: 1
      })
      this.props.showModal({ display: false });
    };

    render() {
        return (
          <FocusLock>
            <div className="modal-section removeCombModal">
              <div className="modal-header">
                  <img src={images['Warning']}/>
                  <h4>Typically, pre-cast gels come with a comb that has to be removed before electrophoresis.</h4>
              </div>
              <div className="modal-body">
                <div className="modal-inner">
                  <div className="popup-modal-content">
                    <img src={images['GelComb']}/>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                  <button aria-label="Remove comb" tabIndex={this.props.tab} className="modal-btn-primary" onClick={this.close}>
                    Remove comb
                  </button>
              </div>
            </div>
            </FocusLock>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: ownProps.data,
    level: state.notebook.level
  }
}

export default connect(mapStateToProps, {
    showModal,
    removeGelComb
})(PipetteVolume);
