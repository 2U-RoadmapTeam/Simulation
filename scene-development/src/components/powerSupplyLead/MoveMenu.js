import React, { Component } from 'react'
import { connect } from 'react-redux'

import { calculatePosition, teleport } from '../../lib/hotspot'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { css } from 'glamor';
import Toast from '../toast/Toast';

//import styled, {keyframes} from 'styled-components';

import {
  setHeldObject,
  setMoveMenu,
  showMoveMenu,
  setPowerSupplyLeadHeld,
  setPowerSupplyLeadControlVisibility,
  setPowerSupplyLeadPostive,
  setPowerSupplyLeadNegative,
} from '../../actions';

// Styles
import colors from '../../styles/_colors.scss';

class MoveMenu extends Component {

constructor(props) {
  super(props)

  this.state = {
  }
}

  toggle = () => {
      this.props.showMoveMenu({display: !this.props.display});
  }
  hide = () => {
      this.props.showMoveMenu({display: false});
  }
  show = () => {
      this.props.showMoveMenu({display: true});
  }

  showTeleportBtns = () => {

    //Getting all flask targets
    let btnArr = Array.from(this.props.targetList)

    let outArr = []

    btnArr.forEach(btn => {

      let label = btn.getElementsByClassName("label")[0];

      (typeof label === 'object')?label = label.innerText: label = ''

      if(label === "Pipette rack"){
        label = "Power supply lead hook"
      }

      outArr.push(
        <button
        key={btn.id}
        onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.teleportTo(btn, e)} }
        onKeyUp={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.teleportTo(btn, e)} }
        onMouseDown={(e) => {this.teleportTo(btn, e)}}
        onMouseUp={(e) => {this.teleportTo(btn, e)}}>
          {label}
        </button>
      )
    });

    return outArr
  }

  // function for triggering mouse events
  fireMouseEvent = (type, elem, centerX, centerY) => {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);

    evt.dataTransfer = new DataTransfer();
    elem.dispatchEvent(evt);
  };


  teleportTo = (elem, e) => {

    let powerSupply = this.props.interactionProps.powerSupply;

    if(
      ((this.props.negativeLead1 === 'powerSupply_Cathode' ||
       this.props.negativeLead2 === 'powerSupply_Cathode') ||
      (this.props.positiveLead1 === 'powerSupply_Anode' ||
       this.props.positiveLead2 === 'powerSupply_Anode')) &&
       powerSupply.power === true && (e.type === "mouseup" || e.type === "keyup")){
        e.stopPropagation();
        e.preventDefault();

        this.makeToast("WARNING", "Always ensure that the power supply is switched off before touching the power cords.", "Electrocution risk!")
    } else {
      if(e.keyCode !== 9){

        let scale = (window.innerHeight / 768) * this.props.scale;
        let targetData = calculatePosition(elem);

        if(elem.id.includes("GelBox") && elem.id.includes("PositiveElectrode")){
          Object.defineProperty(targetData, 'left', {value: targetData.left + (targetData.width / 2), configurable: true});
        }

        if(elem.id.includes("GelBox") && (elem.id.includes("NegativeElectrode") || elem.id.includes("PositiveElectrode"))){
          targetData.width = targetData.width / 2;

          Object.defineProperty(targetData, 'bottom', {value: targetData.bottom + (20 * scale), configurable: true});
        }

        if(elem.id.includes("PowerSupply") && (elem.id.includes("NegativeElectrode") || elem.id.includes("PositiveElectrode"))){
          if(elem.id.includes("NegativeElectrode")){
            targetData.width = targetData.width + (20 * scale);
          } else if(elem.id.includes("PositiveElectrode")) {
            targetData.width = targetData.width - (20 * scale);
          }
          Object.defineProperty(targetData, 'bottom', {value: targetData.bottom + (10 * scale), configurable: true});
        }

        targetData.elem = elem

        let id = "1_"+(this.props.connect+1)
        const thisObj = document.getElementById("PowerSupplyLead_"+id);

        console.log(thisObj, this.props.connect, id);

        // First update the held state to trigger the interactions
        if(e.type === "mousedown" || e.type === "keydown"){

          //Set held object in redux to this data:
          this.props.setHeldObject({
            type: "PowerSupplyLead",
            id: 1,
            htmlObj: thisObj,
          })

          //Change pipette's state to held = true
          this.props.setPowerSupplyLeadHeld({
            id: this.props.connect,
            held: true,
          })

        } else if(e.type === "mouseup" || e.type === "keyup") {

          if(elem.id === "PipetteRack_1"){
            // Reset position

            if(thisObj.classList.contains('Positive')){
              if(thisObj.classList.contains(1)){

                thisObj.style.transform="translate3d(-22px, 130px,0) rotate(0)"

                this.props.setPowerSupplyLeadPostive({
                  positiveLead: {
                    x1: ((thisObj.getBoundingClientRect().left - thisObj.parentNode.getBoundingClientRect().left) / scale) - 10,
                    y1: (thisObj.getBoundingClientRect().top - thisObj.parentNode.getBoundingClientRect().top) / scale,
                    x2: this.props.positiveLead.x2,
                    y2: this.props.positiveLead.y2
                  }
                });
              } else if(thisObj.classList.contains(2)){

                thisObj.style.transform="translate3d(-7px, 150px,0) rotate(0)"

                this.props.setPowerSupplyLeadPostive({
                  positiveLead: {
                    x1: this.props.positiveLead.x1,
                    y1: this.props.positiveLead.y1,
                    x2: ((thisObj.getBoundingClientRect().left - thisObj.parentNode.getBoundingClientRect().left) / scale) - 2,
                    y2: (thisObj.getBoundingClientRect().top - thisObj.parentNode.getBoundingClientRect().top) / scale,
                  }
                });
              }
            }

            if(thisObj.classList.contains('Negative')){
              if(thisObj.classList.contains(1)){

                thisObj.style.transform="translate3d(7px, 150px,0) rotate(0)"

                this.props.setPowerSupplyLeadNegative({
                  negativeLead: {
                    x1: ((thisObj.getBoundingClientRect().left - thisObj.parentNode.getBoundingClientRect().left) / scale) + 4,
                    y1: (thisObj.getBoundingClientRect().top - thisObj.parentNode.getBoundingClientRect().top) / scale,
                    x2: this.props.negativeLead.x2,
                    y2: this.props.negativeLead.y2
                  }
                });
              } else if(thisObj.classList.contains(2)){

                thisObj.style.transform="translate3d(22px, 130px,0) rotate(0)"

                this.props.setPowerSupplyLeadNegative({
                  negativeLead: {
                    x1: this.props.negativeLead.x1,
                    y1: this.props.negativeLead.y1,
                    x2: ((thisObj.getBoundingClientRect().left - thisObj.parentNode.getBoundingClientRect().left) / scale) + 15,
                    y2: (thisObj.getBoundingClientRect().top - thisObj.parentNode.getBoundingClientRect().top) / scale,
                  }
                });
              }
            }
          } else {
            teleport(thisObj, targetData)

            if(thisObj.classList.contains('Positive')){
              if(thisObj.classList.contains(1)){
                this.props.setPowerSupplyLeadPostive({
                  positiveLead: {
                    x1: ((thisObj.getBoundingClientRect().left - thisObj.parentNode.getBoundingClientRect().left) / scale) - 10,
                    y1: (thisObj.getBoundingClientRect().top - thisObj.parentNode.getBoundingClientRect().top) / scale,
                    x2: this.props.positiveLead.x2,
                    y2: this.props.positiveLead.y2
                  }
                });
              } else if(thisObj.classList.contains(2)){
                this.props.setPowerSupplyLeadPostive({
                  positiveLead: {
                    x1: this.props.positiveLead.x1,
                    y1: this.props.positiveLead.y1,
                    x2: ((thisObj.getBoundingClientRect().left - thisObj.parentNode.getBoundingClientRect().left) / scale) - 2,
                    y2: (thisObj.getBoundingClientRect().top - thisObj.parentNode.getBoundingClientRect().top) / scale,
                  }
                });
              }
            }

            if(thisObj.classList.contains('Negative')){
              if(thisObj.classList.contains(1)){
                this.props.setPowerSupplyLeadNegative({
                  negativeLead: {
                    x1: ((thisObj.getBoundingClientRect().left - thisObj.parentNode.getBoundingClientRect().left) / scale) + 4,
                    y1: (thisObj.getBoundingClientRect().top - thisObj.parentNode.getBoundingClientRect().top) / scale,
                    x2: this.props.negativeLead.x2,
                    y2: this.props.negativeLead.y2
                  }
                });
              } else if(thisObj.classList.contains(2)){

                this.props.setPowerSupplyLeadNegative({
                  negativeLead: {
                    x1: this.props.negativeLead.x1,
                    y1: this.props.negativeLead.y1,
                    x2: ((thisObj.getBoundingClientRect().left - thisObj.parentNode.getBoundingClientRect().left) / scale) + 15,
                    y2: (thisObj.getBoundingClientRect().top - thisObj.parentNode.getBoundingClientRect().top) / scale,
                  }
                });
              }
            }
          }

          //Change pipette's state to held = false
          this.props.setPowerSupplyLeadHeld({
            id: this.props.connect,
            held: false,
          })

          //Clear held object
          this.props.setHeldObject({
            type: null,
            id: -1,
            htmlObj: null,
          })

          //this.props.showMoveMenu({display: true});
        }
      }
    }
  }

  makeToast = (type, msg, title) => {
    let color = ""
    if(type==="HINT"){
      color = colors.yellow1
    } else {
      color = colors.red1
    }

    toast(<Toast type={type} msg={msg} title={title} />,{
      className: css({
        border: "2px solid "+color,
        borderRadius: "6px",
        marginLeft: "-200px",
        minWidth: "400px"
      }),
      progressClassName: css({
        background: color
      }),
      position: "top-center",
      autoClose: 5000,
    });
  }

  render(){
    return(
      <div className="move-box">
        <div className="wrapper">
          <div
            style={{display: (this.props.display)?null:'none'}}
            className="collapse"
            aria-hidden={!this.props.display}
            tabIndex={(this.props.display)? null: -1}>
            <div className="move-dialog">
              <div className="move-dialog-head">
                <h5 tabIndex="0">Move Menu</h5>
                <div tabIndex="0" className="close" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.hide() } } onClick={this.hide}><p>Close</p></div>
              </div>
              <div className="move-dialog-body">
                {this.showTeleportBtns()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    scale: state.scene.scale,
    targetList: state.scene.targetList,
    display: state.moveMenu.display,
    type: ownProps.type,
    connect: ownProps.connect,
    positiveLead: state.powerSupplyLead.positiveLead,
    negativeLead: state.powerSupplyLead.negativeLead,
    positiveLead1: state.powerSupplyLead.positiveLeads['1'],
    negativeLead1: state.powerSupplyLead.negativeLeads['1'],
    positiveLead2: state.powerSupplyLead.positiveLeads['2'],
    negativeLead2: state.powerSupplyLead.negativeLeads['2'],
    interactionProps: {
      gelBoxes: state.gelBox.gelBoxes,
      powerSupply: state.powerSupply
    }
  }
}

export default connect(mapStateToProps, {
  setHeldObject,
  setMoveMenu,
  showMoveMenu,
  setPowerSupplyLeadHeld,
  setPowerSupplyLeadControlVisibility,
  setPowerSupplyLeadPostive,
  setPowerSupplyLeadNegative,
})(MoveMenu);
