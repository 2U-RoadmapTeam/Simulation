import React, { Component } from "react";
import { connect } from "react-redux";

import { waterBathOpen, setModal, showModal, waterBathContainsTubeRack, tubeInWaterBath } from "../../actions";

import WaterBathOpen from "./img/waterbath-open.svg";
import WaterBathClosed from "./img/waterbath-closed.svg";
import WaterBathFullOpen from './img/waterbath-with-rack-open.svg'

import FloatingTubeRack from "../floatingTubeRack/Graphics";

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../toast/Toast'
import colors from 'styles/_colors.scss';

import { throttle } from "lodash";

const images = {
  WaterBathOpen: WaterBathOpen,
  WaterBathClosed: WaterBathClosed,
  WaterBathFullOpen: WaterBathFullOpen
};

class Graphics extends Component {

  constructor(props){
    super(props);
    this.state = {
      lastX:0,
      lastY:0
    }
  };

  toggleOpen = () => {
    this.props.waterBathOpen({
      open: !this.props.open
    });
  };

  showModal = () =>{
    this.props.setModal({
      display: false,
      type: "WATER_BATH_CONTROLS",
      size: 'lg',
      connect: -1
    })
    this.props.showModal({display: true})
  }

  makeToast = (type, msg, title) => {
      let color = ""
      if(type==="HINT"){
        color = colors.yellow1
      } else {
        color = colors.red1
      }

      toast(<Toast type={type} msg={msg} title={title} />, {
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
  };

  ejectRack = () =>{
    if(this.props.open){
      if(this.props.hasRack){
        this.props.tubeInWaterBath({
          inWaterBath: false
        });
        this.props.waterBathContainsTubeRack({
          containsTubeRack: false
        });
      } else {
        this.makeToast('WARNING', 'There is nothing to eject.', 'Empty!')
      }
    } else {
      this.makeToast('WARNING', 'Please open the waterbath door.', 'Waterbath Closed!')
    }
  }

  renderEjectBtn = () => {
    return (
      <div class="eject-button" tabIndex={0} onClick={this.ejectRack} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.ejectRack(e)} }> Eject </div>
    )
  }

  // function for triggering mouse events
  fireMouseEvent = (type, elem, centerX, centerY) => {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);

    evt.dataTransfer = new DataTransfer();
    elem.dispatchEvent(evt);
  };


  onDragStart = (e) => {
    e.stopPropagation();

    console.log(e.target)

    let dragImage = document.getElementById('dragImage')

    if(dragImage == null){

      dragImage = document.createElement('img')
      dragImage.id = "dragImage"
      dragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
      document.body.appendChild(dragImage);
    }

    var testVar = window.DataTransfer || window.Clipboard;  // Clipboard is for Chrome
    if("setDragImage" in testVar.prototype) {
        e.dataTransfer.setDragImage(dragImage, 0, 0)
    }
    if("setData" in testVar.prototype){
        e.dataTransfer.setData('text/plain', '');
    }

    //Set tube visibility to false
    this.props.tubeInWaterBath({
      inWaterBath: false
    });

    //Set containsTubeRack in WaterBath to false
    this.props.waterBathContainsTubeRack({
      containsTubeRack: false
    });

    // Fire a dragstart event, now on the floating rack, since it should be available again
    //let target = document.getElementById('FloatingTubeRack')
    //let pos = target.getBoundingClientRect()

    //target.parentNode.style.pointerEvents = 'none';
    //this.fireMouseEvent('dragstart', target, e.clientX, e.clientY);

  }

  // onDragOver = throttle((e) => {
  //
  //   e.preventDefault();
  //   e.stopPropagation();
  //
  //   // Fire a dragstart event, now on the floating rack, since it should be available again
  //   let target = document.getElementById('FloatingTubeRack');
  //   this.fireMouseEvent('dragover', target, e.clientX, e.clientY);
  //
  // }, 10)
  //
  // onDragEnd = (e) => {
  //   e.preventDefault();
  //
  //   console.log('Ended', e.target);
  //
  //   // Fire a dragstart event, now on the floating rack, since it should be available again
  //   let target = document.getElementById('FloatingTubeRack');
  //
  //   target.parentNode.style.pointerEvents = '';
  //   this.fireMouseEvent('dragdrop', target, 0, 0);
  // }

  render() {
    return (
      <div
      style={{zIndex: "-2", position: 'relative' }}
        aria-label="Water bath."
        className="graphics"
      >
        {this.renderEjectBtn()}
        <div id="waterBathOpenBtn" tabIndex={0} onClick={this.toggleOpen} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.toggleOpen(e)} }></div>
        <div id="waterBathModalBtn" tabIndex={0} onClick={this.showModal} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.showModal(e)} }></div>
        <img
          style={{ pointerEvents: "none" }}
          src={this.props.open ? images.WaterBathOpen : images.WaterBathClosed}
          aria-label={"Water bath"}
        />
        <div class="floatingRackInsert" style={{display: (this.props.hasRack && this.props.open)? 'initial': 'none', pointerEvents: 'none'}}>
          <FloatingTubeRack id={1}/>
        </div>
        <div
        className="floatingRackDrag"
        draggable
        onDragStart={this.onDragStart}
        //onDragOver={(e)=>{e.persist();this.onDragOver(e);}}
        //onDragEnd={this.onDragEnd}
        style={{display: (this.props.open && this.props.hasRack)?"initial":"none"}}></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.waterBath.open,
    temp: state.waterBath.temp,
    timeSet: state.waterBath.timeSet,
    timeLeft: state.waterBath.timeLeft,
    hasRack: state.waterBath.containsTubeRack,
  };
};

export default connect(
  mapStateToProps,
  { waterBathOpen, setModal, showModal, waterBathContainsTubeRack, tubeInWaterBath}
)(Graphics);
