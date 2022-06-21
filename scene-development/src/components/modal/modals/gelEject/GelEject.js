import React, { Component } from "react";
import { connect } from 'react-redux';
import Graphics from 'components/pipette/Graphics';
import FocusLock from 'react-focus-lock';

import {
    showModal,
    setGelInScene,
    setGelInBox
} from 'actions';

import ProteinGelBox from "./img/ProteinGelBox.svg"
import ProteinGelBoxOpen from "./img/ProteinGelBoxOpen.svg"
import ProteinGelBoxCombFull from "./img/ProteinGelBoxCombFull.svg"
import ProteinGelBoxCombFullOpen from "./img/ProteinGelBoxCombFullOpen.svg"
import ProteinGelBoxCombFullBuffer from "./img/ProteinGelBoxCombFullBuffer.svg"
import ProteinGelBoxCombFullBufferOpen from "./img/ProteinGelBoxCombFullBufferOpen.svg"
import ProteinGelBoxFull from "./img/ProteinGelBoxFull.svg"
import ProteinGelBoxFullOpen from "./img/ProteinGelBoxFullOpen.svg"
import ProteinGelBoxFullBuffer from "./img/ProteinGelBoxFullBuffer.svg"
import ProteinGelBoxFullBufferOpen from "./img/ProteinGelBoxFullBufferOpen.svg"
import ProteinGelBoxBuffer from "./img/ProteinGelBoxBuffer.svg"
import ProteinGelBoxBufferOpen from "./img/ProteinGelBoxBufferOpen.svg"

const images = {
  "ProteinGelElectrophoresisBox": ProteinGelBox,
  "ProteinGelElectrophoresisBoxOpen": ProteinGelBoxOpen,
  "ProteinGelElectrophoresisBoxFull": ProteinGelBoxFull,
  "ProteinGelElectrophoresisBoxFullOpen": ProteinGelBoxFullOpen,
  "ProteinGelElectrophoresisBoxFullBuffer": ProteinGelBoxFullBuffer,
  "ProteinGelElectrophoresisBoxFullBufferOpen": ProteinGelBoxFullBufferOpen,
  "ProteinGelElectrophoresisBoxCombFull": ProteinGelBoxCombFull,
  "ProteinGelElectrophoresisBoxCombFullOpen": ProteinGelBoxCombFullOpen,
  "ProteinGelElectrophoresisBoxCombFullBuffer": ProteinGelBoxCombFullBuffer,
  "ProteinGelElectrophoresisBoxCombFullBufferOpen": ProteinGelBoxCombFullBufferOpen,
  "ProteinGelElectrophoresisBoxBuffer": ProteinGelBoxBuffer,
  "ProteinGelElectrophoresisBoxBufferOpen": ProteinGelBoxBufferOpen
}

class GelEject extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    close = () => {

      //this.props.validatePopup({id: 1});

      this.props.setGelInScene({
        id: 1,
        containsGel: true,
      });
      this.props.setGelInBox({
        id: 1,
        containsGel: false,
      });

      this.props.showModal({ display: false });
    };

    getImg = () => {
      var reference = this.props.type.replace(/\s/g,'')

      if(this.props.gelComb && this.props.containsGel){
        reference += "Comb"
      }
      if(this.props.containsGel){
        reference += "Full"
      }
      if(this.props.volume > 0){
        reference += "Buffer"
      }
      if(this.props.open){
        reference += "Open"
      }

      console.log("REF: "+reference);

      return images[reference]
    }

    render() {
        return (
          <FocusLock>
            <div className="modal-section removeCombModal">
              <div className="modal-header">
                  <h2>Eject the gel casette from the gel box?</h2>
              </div>
              <div className="modal-body">
                <div className="modal-inner">
                  <div className="popup-modal-content">
                    <img src={this.getImg()}/>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                  <button aria-label="Remove comb" tabIndex={this.props.tab} className="modal-btn-primary" onClick={this.close}>
                    Eject the gel casette
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
    level: state.notebook.level,
    type: state.gelBox.gelBoxes[0].type,
    open: state.gelBox.gelBoxes[0].open,
    volume: state.gelBox.gelBoxes[0].volume,
    containsGel: state.gelBox.gelBoxes[0].containsGel,
    anodeConnected: state.gelBox.gelBoxes[0].anodeConnected,
    cathodeConnected: state.gelBox.gelBoxes[0].cathodeConnected,
    gelComb: state.gel.gels[0].comb,
    interactionProps: {
      gelBoxes: state.gelBox.gelBoxes,
      gels: state.gel.gels
    }
  }
}

export default connect(mapStateToProps, {
    showModal,
    setGelInScene,
    setGelInBox
})(GelEject);
