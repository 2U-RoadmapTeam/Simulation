import React, { Component } from "react";
import { connect } from 'react-redux';

import Toast from "../../../toast/Toast";
import { toast } from "react-toastify";
import { css } from "glamor";
import "react-toastify/dist/ReactToastify.css";
import colors from "styles/_colors.scss";

import {
  incGelOrientation,
  decGelOrientation,
  setGelOrientation
} from 'actions';

import "./GelPosition.scss";
import GelBoxTop from './img/GelBoxTop.svg'
import Gel from './img/gel-5-lanes.svg'
import RotateLeft from './img/RotateLeft.svg'
import RotateRight from './img/RotateRight.svg'

const images = {
  gel: Gel,
  gelBox:GelBoxTop,
  rotateLeft: RotateLeft,
  rotateRight: RotateRight
}

class GelPosition extends Component {

    inc = () => {

      if(this.props.solution == null){
        this.props.incGelOrientation({id: this.props.id})
      } else {
        this.makeToast(
          "WARNING",
          "You cannot rotate the gel once buffer has been added to the box.",
          "Buffer in gel box!"
        );
      }

    }
    dec = () => {

      if(this.props.solution == null){
        this.props.decGelOrientation({id: this.props.id})
      } else {
        this.makeToast(
          "WARNING",
          "You cannot rotate the gel once buffer has been added to the box.",
          "Buffer in gel box!"
        );
      }

    }

    makeToast = (type, msg, title) => {
      let color = "";
      if (type === "HINT") {
        color = colors.yellow1;
      } else {
        color = colors.red1;
      }

      toast(<Toast type={type} msg={msg} title={title} />, {
        className: css({
          border: "2px solid " + color,
          borderRadius: "6px",
          marginLeft: "-200px",
          minWidth: "400px"
        }),
        progressClassName: css({
          background: color
        }),
        position: "top-center",
        autoClose: 5000
      });
    };

    render() {
        return (
          <div style={{height: "100%"}}>
            <div className="modal-section">
              <div className="modal-header">
                  <h2>{'Position the gel in the electrophoresis box'}</h2>
              </div>
              <div className="modal-body">
                <div className="gel-modal-inner">
                  <div className="gel-position-content">
                      <div className="gel-box">
                        <img
                          alt="Gel electrophoresis box."
                          src={images.gelBox}/>
                      </div>
                      <div className="gel" style={{display: (this.props.containsGel)?null:'none'}}>
                        <img
                          src={images.gel}
                          alt="Agarose gel."
                          style={{transform: (this.props.orientation)?'rotate('+this.props.orientation+'deg)':null}}/>
                      </div>
                  </div>
                  <div className="gel-position-controls">
                    <p>Rotate gel</p>
                    <button tabIndex={0} onClick={this.inc}><img tabIndex={-1} alt="Rotate clockwise" aria-label="Rotate clockwise" src={images.rotateLeft} /><span>Rotate clockwise</span></button>
                    <button tabIndex={0} onClick={this.dec}><img tabIndex={-1} alt="Rotate anti-clockwise" aria-label="Rotate anti-clockwise" src={images.rotateRight} /><span>Rotate anti-clockwise</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    orientation: state.gelBox.gelBoxes[ownProps.id-1].gelOrientation,
    containsGel: state.gelBox.gelBoxes[ownProps.id-1].containsGel,
    solution: state.gelBox.gelBoxes[ownProps.id-1].solutionAlias,
  }
}

export default connect(mapStateToProps,{
    incGelOrientation,
    decGelOrientation,
    setGelOrientation
  })(GelPosition);
