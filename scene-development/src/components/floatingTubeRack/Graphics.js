import React, { Component } from "react";
import { connect } from "react-redux";

import floatingTubeRack from "./img/floating-solution-tube-rack-empty.svg";

import EmptyOpen from "./img/empty-open.svg";
import EmptyClosed from "./img/empty-close.svg";
import SolutionS1 from "./img/solution-tube-s-1.svg";
import SolutionS1Closed from "./img/solution-tube-s-1.svg";
import SolutionS2 from "./img/solution-tube-s-2.svg";
import SolutionS2Closed from "./img/solution-tube-s-2.svg";
import SolutionS3 from "./img/solution-tube-s-3.svg";
import SolutionS3Closed from "./img/solution-tube-s-3.svg";

import APlusEmpty from "./img/solution-tube-a-plus-opened.svg";
import APlusEmptyClosed from "./img/solution-tube-a-plus-closed.svg";
import APlusFull from "./img/solution-tube-aplusfull-open.svg";
import APlusFullClosed from "./img/solution-tube-aplusfull-closed.svg";

import AMinusEmptyClosed from "./img/solution-tube-a_--closed.svg";
import AMinusEmpty from "./img/solution-tube-a_--opened.svg";
import AMinusFullClosed from "./img/solution-tube-a-full-closed.svg";
import AMinusFull from "./img/solution-tube-a-full-open.svg";

import KMinusEmpty from "./img/solution-tube-k_-open.svg";
import KMinusEmptyClosed from "./img/solution-tube-k_-closed.svg";
import KMinusFull from "./img/solution-tube-k-full-open.svg";
import KMinusFullClosed from "./img/solution-tube-k-full-closed.svg";

import KPlusFull from "./img/solution-tube-kplusfull-open.svg";
import KPlusFullClosed from "./img/solution-tube-kplusfull-closed.svg";
import KPlusEmpty from "./img/solution-tube-k.svg";
import KPlusEmptyClosed from "./img/solution-tube-k-closed.svg";

import DH20 from "./img/dH20-open.svg";
import DH20Closed from "./img/dH20.svg";
import DH20Empty from "./img/dH20-empty-open.svg";
import DH20EmptyClosed from "./img/dH20-empty.svg";

import paRA from "./img/A-open.svg";
import paRAClosed from "./img/A.svg";
import paRAEmpty from "./img/A-empty-open.svg";
import paRAEmptyClosed from "./img/A-empty.svg";

import pKan from "./img/K-open.svg";
import pKanClosed from "./img/K.svg";
import pKanEmpty from "./img/K-empty-open.svg";
import pKanEmptyClosed from "./img/K-empty.svg";

import Restriction from "./img/2x5B-open.svg";
import RestrictionClosed from "./img/2x5B.svg";
import RestrictionEmpty from "./img/2x5B-empty-open.svg";
import RestrictionEmptyClosed from "./img/2x5B-empty.svg";

import BamHI from "./img/RE-open.svg";
import BamHIClosed from "./img/RE.svg";
import BamHIEmpty from "./img/RE-empty-open.svg";
import BamHIEmptyClosed from "./img/RE-empty.svg";

import { hideAllControls, addTubeToRack, removeTubesFromRack, removeTubeFromRack, setSolutionInScene, setModal, showModal } from "../../actions";

import "./FloatingTubeRack.scss";

import { throttle } from "lodash";

const images = {
  EmptyOpen: EmptyOpen,
  EmptyClosed: EmptyClosed,
  SolutionS1: SolutionS1,
  SolutionS1Closed: SolutionS1Closed,
  SolutionS2: SolutionS2,
  SolutionS2Closed: SolutionS2Closed,
  SolutionS3: SolutionS3,
  SolutionS3Closed: SolutionS3Closed,

  APlusEmpty: APlusEmpty,
  APlusEmptyClosed: APlusEmptyClosed,

  APlus: APlusFull,
  APlusClosed: APlusFullClosed,

  AMinusEmpty: AMinusEmpty,
  AMinusEmptyClosed: AMinusEmptyClosed,

  AMinus: AMinusFull,
  AMinusClosed: AMinusFullClosed,

  KMinusEmpty: KMinusEmpty,
  KMinusEmptyClosed: KMinusEmptyClosed,

  KMinus: KMinusFull,
  KMinusClosed: KMinusFullClosed,

  KPlusEmpty: KPlusEmpty,
  KPlusEmptyClosed: KPlusEmptyClosed,

  KPlus: KPlusFull,
  KPlusClosed: KPlusFullClosed,

  DH20: DH20,
  DH20Closed: DH20Closed,
  DH20Empty: DH20Empty,
  DH20EmptyClosed: DH20EmptyClosed,

  paRA: paRA,
  paRAClosed: paRAClosed,
  paRAEmpty: paRAEmpty,
  paRAEmptyClosed: paRAEmptyClosed,

  pKan: pKan,
  pKanClosed: pKanClosed,
  pKanEmpty: pKanEmpty,
  pKanEmptyClosed: pKanEmptyClosed,

  Restriction: Restriction,
  RestrictionClosed: RestrictionClosed,
  RestrictionEmpty: RestrictionEmpty,
  RestrictionEmptyClosed: RestrictionEmptyClosed,

  BamHI: BamHI,
  BamHIClosed: BamHIClosed,
  BamHIEmpty: BamHIEmpty,
  BamHIEmptyClosed: BamHIEmptyClosed
};

class Graphics extends Component {

  constructor(props){
    super(props);

    this.state = {
      dragged: null
    }
  }

  getImg = (type, id) => {
    id = (id-1)
    let reference = type;
    switch (reference) {
      case "2.5xB":
        reference = "Restriction";
        break;

      case "K":
        reference = "pKan";
        break;

      case "A":
        reference = "paRA";
        break;

      case "RE":
        reference = "BamHI";
        break;

      case "dH2O":
        reference = "DH20";
        break;

      case "A+":
        reference = "APlus";
        break;

      case "A-":
        reference = "AMinus";
        break;

      case "K+":
        reference = "KPlus";
        break;

      case "K-":
        reference = "KMinus";
        break;

      default:
        break;
    }

    if (this.props.interactionProps.solutions[id].volume === 0) {
      reference += "Empty";
    }
    if (!this.props.interactionProps.solutions[id].open) {
      reference += "Closed";
    }
    return images[reference];
  };

  imgName = (name) =>  {
    return name.replace("+","Plus").replace("-","Minus")
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

    console.log('Event target',e.target);

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

    let ref = (e.target.id.split('tubeInRack')[1] - 1);

    this.props.hideAllControls();

    //Set tube visibility to false
    this.props.setSolutionInScene({
      id: this.props.tubes[ref].id,
      inScene: true
    });

    // Fire a dragstart event, now on the floating rack, since it should be available again
    let target = document.getElementById('Solution_'+this.props.tubes[ref].id)

    this.setState({
      dragged: this.props.tubes[ref],
      origEventElem: e.target
    });

    //Set containsTubeRack in WaterBath to false
    this.props.removeTubeFromRack({
      index: ref
    });

    //let pos = target.getBoundingClientRect()
    //target.parentNode.style.pointerEvents = 'none';
    //this.fireMouseEvent('dragstart', target, e.clientX, e.clientY);

  }

  // onDragOver = throttle((e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //
  //   if(e.target === this.state.origEventElem){
  //     console.log('Drag over fired', e.target);
  //
  //     let ref = (e.target.id.split('tubeInRack')[1] - 1);
  //
  //     // Fire a dragstart event, now on the floating rack, since it should be available again
  //     let target = document.getElementById('Solution_'+this.state.dragged.id)
  //
  //     if(target){
  //       target.parentNode.style.pointerEvents = '';
  //       this.fireMouseEvent('dragover', target, e.clientX, e.clientY);
  //     }
  //   }
  //
  // }, 10)
  //
  // onDragEnd = (e) => {
  //   e.preventDefault();
  //
  //   // Fire a dragstart event, now on the floating rack, since it should be available again
  //   let target = document.getElementById('Solution_'+this.state.dragged.id)
  //
  //   console.log('Ended', target);
  //
  //   if(target){
  //     this.fireMouseEvent('dragdrop', target, 0, 0);
  //   }
  //
  //   this.setState({
  //     dragged: null,
  //     origEventElem: null
  //   })
  // }

  returnFalse = (e) => {

    //alert('dont do anything');

    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  persistedDrag = (e) => {

    e.persist()
    this.onDragOver(e)
  }

  ejectTubes = () => {
    //this.props.removeTubesFromRack({})

    this.props.hideAllControls();

    this.props.tubes.forEach((tube, index) => {

        if(tube !== null && tube.hasOwnProperty('id')){
          this.props.setSolutionInScene({
              id: tube.id,
              inScene: true
          });
        }

        this.props.removeTubeFromRack({
          index: index
        });
    });
  }

  buildImage = () => {
    return (
      <div aria-label="Floating Tube Rack" className="graphics">
        {(this.props.count>0) ? <button
          className="removeTubesBtn"
          onClick={this.ejectTubes}>Remove Tubes</button> : ""}
        <img
          style={{ pointerEvents: "none", position: "relative", zIndex: 1}}
          src={floatingTubeRack}
          aria-label={"Floating Solution Rack"}
        />
        <div className="tube-crop">
            {(this.props.tubes[0] !== null) ?
              <img
              style={{pointerEvents: (this.props.interactionProps.waterBathContainsTubeRack || this.props.interactionProps.freezerContainsTubeRack)?'none':'initial'}}
              id="tubeInRack1"
              onDragStart={(e) => {this.onDragStart(e)} }
              //onDragOver={(e)=> {this.persistedDrag(e)} }
              //onDragEnd={(e) => {this.onDragEnd(e)} }
              src={this.getImg(this.props.tubes[0].type, this.props.tubes[0].id)} />
              : ""}
            {(this.props.tubes[1] !== null) ?
              <img
              style={{pointerEvents: (this.props.interactionProps.waterBathContainsTubeRack || this.props.interactionProps.freezerContainsTubeRack)?'none':'initial'}}
              id="tubeInRack2"
              onDragStart={(e) => {this.onDragStart(e)} }
              //onDragOver={(e)=> {this.persistedDrag(e)} }
              //onDragEnd={(e) => {this.onDragEnd(e)} }
              src={this.getImg(this.props.tubes[1].type, this.props.tubes[1].id)} />
              : ""}
            {(this.props.tubes[2] !== null) ?
              <img
              style={{pointerEvents: (this.props.interactionProps.waterBathContainsTubeRack || this.props.interactionProps.freezerContainsTubeRack)?'none':'initial'}}
              id="tubeInRack3"
              onDragStart={(e) => {this.onDragStart(e)} }
              //onDragOver={(e)=> {this.persistedDrag(e)} }
              //onDragEnd={(e) => {this.onDragEnd(e)} }
              src={this.getImg(this.props.tubes[2].type, this.props.tubes[2].id)} />
              : ""}
            {(this.props.tubes[3] !== null) ?
              <img
              style={{pointerEvents: (this.props.interactionProps.waterBathContainsTubeRack || this.props.interactionProps.freezerContainsTubeRack)?'none':'initial'}}
              id="tubeInRack4"
              onDragStart={(e) => {this.onDragStart(e)} }
              //onDragOver={(e)=> {this.persistedDrag(e)} }
              //onDragEnd={(e) => {this.onDragEnd(e)} }
              src={this.getImg(this.props.tubes[3].type, this.props.tubes[3].id)} />
              : ""}
        </div>
      </div>
    );
  };

  render() {
    return this.buildImage();
  }
}

const mapStateToProps = state => {
  return {
    tubes: state.floatingTubeRack.tubes,
    count: state.floatingTubeRack.count,
    inWaterBath: state.floatingTubeRack.inWaterBath,
    inFreezer: state.floatingTubeRack.inFreezer,
    interactionProps: {
      freezerContainsTubeRack: state.freezer.containsTubeRack,
      waterBathContainsTubeRack: state.waterBath.containsTubeRack,
      solutions: state.solution.solutions
    }
  };
};

export default connect(
  mapStateToProps,
  { hideAllControls, addTubeToRack, removeTubesFromRack, removeTubeFromRack, setSolutionInScene, setModal, showModal }
)(Graphics);
