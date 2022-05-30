import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graphics from './Graphics';
import Controls from './Controls';

import {
  setPipetteControlVisibility,
  setHeld,
  showMoveMenu,
  hideAllControls

 } from '../../actions';


// Styles
import './Pipette.scss';

class Pipette extends Component {

componentDidUpdate(prevProps, prevState){
  if(this.props.controlsVisible !== prevProps.controlsVisible){
    this.props.showMoveMenu({display: false});
  }
}

showControls = ()=> {
  this.props.hideAllControls();
  this.props.setPipetteControlVisibility({id: this.props.id, controlsVisible: true});
}

pipetteSelected = () => {

  if(!this.props.controlsVisible){
      this.showControls()
  }

  this.props.setHeld({
    id: this.props.id,
    held: true,
  })
}

pipetteUnselected = () => {

  this.props.setHeld({
    id: this.props.id,
    held: false,
  })
}


  render() {
    return (
      <ul style={{zIndex: (this.props.controlsVisible)?99:null}}>
        <li
          onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.pipetteSelected() } }
          onMouseDown={this.pipetteSelected}
          onMouseUp={this.pipetteUnelected}
          draggable
          tabIndex={0}
          id={this.props.type+"_"+this.props.id}
          className={"draggable "+this.props.type+(this.props.controlsVisible?" active":"")}
          style={{ transform: "translate3d(0px, 0px, 0px) rotateZ(0deg)"}}>
          <p
            className="label"
            aria-hidden="true"
            //style={{display:(this.props.target !== null && this.props.heldObject.id === (this.props.id + 2) && (this.props.target.type === "Solution" || this.props.target.type === "BlottingPaper"))? "none":"initial"}}
            >{this.props.type}</p>
          <Graphics id={this.props.id} />
          <Controls id={this.props.id} />
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    aria: ownProps.aria,
    id: ownProps.id,
    type: state.pipette.pipettes[ownProps.id-1].type,
    controlsVisible: state.pipette.pipettes[ownProps.id-1].controlsVisible,
    target: state.scene.lastDrop.lastTarget,
    heldObject: state.scene.heldObject,
  }
}

export default connect(mapStateToProps, {
  setPipetteControlVisibility,
  setHeld,
  showMoveMenu,
  hideAllControls
})(Pipette);
