import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../toast/Toast'

import {
  gelBoxOpen,
  showModal,
  setModal
} from "../../actions";

import GelBox from "./img/GelBox.svg"
import GelBoxOpen from "./img/GelBoxOpen.svg"
import GelBoxBuffer from "./img/GelBoxBuffer.svg"
import GelBoxBufferOpen from "./img/GelBoxBufferOpen.svg"
import GelBoxFull from "./img/GelBoxFull.svg"
import GelBoxFullOpen from "./img/GelBoxFullOpen.svg"
import GelBoxFullBuffer from "./img/GelBoxFullBuffer.svg"
import GelBoxFullBufferOpen from "./img/GelBoxFullBufferOpen.svg"
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

import colors from '../../styles/_colors.scss';

const images = {
  "Gel Box": GelBox,
  "Gel BoxOpen": GelBoxOpen,
  "Gel BoxBuffer": GelBoxBuffer,
  "Gel BoxBufferOpen": GelBoxBufferOpen,
  "Gel BoxFull": GelBoxFull,
  "Gel BoxFullOpen": GelBoxFullOpen,
  "Gel BoxFullBuffer": GelBoxFullBuffer,
  "Gel BoxFullBufferOpen": GelBoxFullBufferOpen,
  "GelElectrophoresisBox": GelBox,
  "GelElectrophoresisBoxOpen": GelBoxOpen,
  "GelElectrophoresisBoxFull": GelBoxFull,
  "GelElectrophoresisBoxFullOpen": GelBoxFullOpen,
  "GelElectrophoresisBoxFullBuffer": GelBoxFullBuffer,
  "GelElectrophoresisBoxFullBufferOpen": GelBoxFullBufferOpen,
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


class Graphics extends Component {
  toggleOpen = () => {

    if(this.props.anodeConnected || this.props.cathodeConnected){

      this.makeToast("WARNING", "Please remove the power cords before attempting to open the gel box.", "Gel box leads connected!");

    } else {
      this.props.gelBoxOpen({
        id: this.props.id,
        open: !this.props.open
      })
    }
  }

  componentWillMount() {
    for(var image in images){
      if(!image.replace(this.props.type, '').includes(0)){
        const img = new Image();
        img.src = images[image];
      }
    }
  }

  getImg = () => {

    var reference = this.props.type.replace(/\s/g,'')
    
    if(this.props.containsGel){
      reference += "Full"
    }
    if(this.props.volume > 0){
      reference += "Buffer"
    }
    if(this.props.open){
      reference += "Open"
    }
    return images[reference]
  }

  showGelBoxOrientationModal = () => {

    this.props.setModal({
      type: 'GEL_POSITION',
      size: 'lg',
      connect: this.props.id
    });

    this.props.showModal({ display: true});

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


  render() {
    return (
      <div className="graphics dropTarget">
        <p className="label" style={{display: 'none'}}>{this.props.type}</p>
        <div
          onClick={this.showGelBoxOrientationModal}
          className="show-inside-gel-box"
          onKeyPress={ (e)=>{if(e.which === 13 || e.which === 32) this.showGelBoxOrientationModal(e)} }></div>
        <div
          onClick={this.toggleOpen}
          className="open-gel-box"
          onKeyPress={ (e)=>{if(e.which === 13 || e.which === 32) this.toggleOpen(e)} }></div>
        <img
          style={{ pointerEvents: "none" }}
          alt="Gel electrophoresis box"
          src={this.getImg()} aria-hidden={this.props.context==="Materials"?"true":"false"}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    id: ownProps.id,
    type: state.gelBox.gelBoxes[ownProps.id - 1].type,
    open: state.gelBox.gelBoxes[ownProps.id - 1].open,
    volume: state.gelBox.gelBoxes[ownProps.id - 1].volume,
    containsGel: state.gelBox.gelBoxes[ownProps.id - 1].containsGel,
    anodeConnected: state.gelBox.gelBoxes[ownProps.id - 1].anodeConnected,
    cathodeConnected: state.gelBox.gelBoxes[ownProps.id - 1].cathodeConnected,
  }
}
export default connect(mapStateToProps, {
  gelBoxOpen,
  showModal,
  setModal
})(Graphics)
