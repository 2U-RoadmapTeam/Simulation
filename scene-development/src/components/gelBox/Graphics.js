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
import ProteinGelBoxCombBufferFull from "./img/ProteinGelBoxCombBufferFull.svg"
import ProteinGelBoxCombBufferFullOpen from "./img/ProteinGelBoxCombBufferFullOpen.svg"
import ProteinGelBoxCombFullBuffer from "./img/ProteinGelBoxCombFullBuffer.svg"
import ProteinGelBoxCombFullBufferOpen from "./img/ProteinGelBoxCombFullBufferOpen.svg"
import ProteinGelBoxFull from "./img/ProteinGelBoxFull.svg"
import ProteinGelBoxFullOpen from "./img/ProteinGelBoxFullOpen.svg"
import ProteinGelBoxFullBuffer from "./img/ProteinGelBoxFullBuffer.svg"
import ProteinGelBoxFullBufferOpen from "./img/ProteinGelBoxFullBufferOpen.svg"
import ProteinGelBoxBuffer from "./img/ProteinGelBoxBuffer.svg"
import ProteinGelBoxBufferOpen from "./img/ProteinGelBoxBufferOpen.svg"
import ProteinGelBoxBufferFull from "./img/ProteinGelBoxBufferFull.svg"
import ProteinGelBoxBufferFullOpen from "./img/ProteinGelBoxBufferFullOpen.svg"

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
  "ProteinGelElectrophoresisBoxBufferFull": ProteinGelBoxBufferFull,
  "ProteinGelElectrophoresisBoxBufferFullOpen": ProteinGelBoxBufferFullOpen,
  "ProteinGelElectrophoresisBoxFullBuffer": ProteinGelBoxFullBuffer,
  "ProteinGelElectrophoresisBoxFullBufferOpen": ProteinGelBoxFullBufferOpen,
  "ProteinGelElectrophoresisBoxCombBufferFull": ProteinGelBoxCombBufferFull,
  "ProteinGelElectrophoresisBoxCombBufferFullOpen": ProteinGelBoxCombBufferFullOpen,
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

    if(this.props.gelComb && this.props.containsGel){
      reference += "Comb"
    }

    if(this.props.gelBuffer > 0 && this.props.volume <= 0){
      reference += "Buffer"
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

  // showGelBoxOrientationModal = () => {

  //   this.props.setModal({
  //     type: 'GEL_POSITION',
  //     size: 'lg',
  //     connect: this.props.id
  //   });

  //   this.props.showModal({ display: true});

  // }


  showCombRemovalModal = () => {
      this.props.setModal({
        type: 'REMOVE_COMB',
        size: 'lg',
        connect: this.props.id
      });

      this.props.showModal({ display: true});
  };

  showEjectGelModal = () => {
      this.props.setModal({
        type: 'GEL_EJECT',
        size: 'lg',
        connect: this.props.id
      });

      this.props.showModal({ display: true});
  };

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
      <div id={"GelBox_"+this.props.id+"_graphics"} className="graphics dropTarget">
        <p className="label" style={{display: 'none'}}>{this.props.type}</p>
        <div
          tabIndex={(this.props.context==="Materials")?null:(this.props.containsGel)?(this.props.gelComb)?0:0:null}
          onClick={(this.props.containsGel)?(this.props.gelComb)?this.showCombRemovalModal:this.showEjectGelModal:()=> {
            return false;
          }}
          className="show-inside-gel-box"
          aria-label={(this.props.containsGel)?(this.props.gelComb)?"Remove comb from gel.":"Eject gel from box.":null}
          onKeyPress={ (e)=>{
            if(e.which === 13 || e.which === 32){
              if(this.props.containsGel){
                if(this.props.gelComb){
                  this.showCombRemovalModal(e)
                } else {
                  this.showEjectGelModal(e)
                }
              } else {
                return false;
              }
            }
          }}></div>
        <div
          tabIndex={this.props.context==="Materials"?null:0}
          onClick={this.toggleOpen}
          className="open-gel-box"
          aria-label="Open the protein gel electrophoresis box."
          onKeyPress={ (e)=>{if(e.which === 13 || e.which === 32) this.toggleOpen(e)} }></div>
        <img
          alt="Protein gel electrophoresis box"
          style={{ pointerEvents: "none" }}
          src={this.getImg()} aria-label={this.props.type}/>
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
    gelBuffer: state.gelBox.gelBoxes[0].gelVolume,
    containsGel: state.gelBox.gelBoxes[ownProps.id - 1].containsGel,
    anodeConnected: state.gelBox.gelBoxes[ownProps.id - 1].anodeConnected,
    cathodeConnected: state.gelBox.gelBoxes[ownProps.id - 1].cathodeConnected,
    gelComb: state.gel.gels[ownProps.id - 1].comb,
  }
}
export default connect(mapStateToProps, {
  gelBoxOpen,
  showModal,
  setModal
})(Graphics)
