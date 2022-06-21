import React, { Component } from "react";
import { connect } from "react-redux";
import Graphics from "components/gel/Graphics";
import Controls from "components/pipette/Controls";
import MoveMenu from "./MoveMenu"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import Toast from "../toast/Toast";
import Move from "./img/move.svg";

import {
  pushInteractions,
  setGelControlVisibility,
  setGelHeld,
  setGelOnShelf,
  setGelInScene,
  setGelInBox,
  setMoveMenu,
  showMoveMenu,
  hideAllControls
 } from '../../actions';

import "./Gel.scss";

// Styles
import colors from "styles/_colors.scss";

class Gel extends Component {
constructor(props) {
  super(props);

  this.state = {}

  const interactions = (heldObj, target) => {
    //Don't run if this gel not the held object
    if(heldObj.type !== "Gel" || heldObj.id !== this.props.id){
      return null;
    }
    if (target === undefined || target === null) {
      this.props.setGelOnShelf({
        id: this.props.id,
        onShelf: false
      });
      return null;
    }

    console.log(target);

    //All GelBox interactions
    if (target.type === "GelBox") {
      //Get the targeted TipBox
      const gelsID = target.id
      const targetGelBox = this.props.interactionProps.gelBoxes[gelsID - 1]

      if(targetGelBox.open) {

        if (!targetGelBox.containsGel) {

          this.props.setGelInScene({
            id: this.props.id,
            containsGel: false,
          });
          this.props.setGelInBox({
            id: gelsID,
            containsGel: true,
          });
          this.props.setGelOnShelf({
            id: this.props.id,
            onShelf: false
          });

          // Reset the tube position to a zero transform
          heldObj.htmlObj.style.transform = "translate3d(0px,0px,0px) rotateZ(0deg)"

        } else {
          this.makeToast("WARNING", "The gel box already has a gel inside.", "Gel box full!")
        }
      } else if(!targetGelBox.open){

        this.makeToast("WARNING", "You need to open the lid of the gel box first.", "Gel box closed!")
      } else {
        return null;
      }
    } else if(target.type === "Shelf") {

      this.props.setGelOnShelf({
        id: this.props.id,
        onShelf: true
      });

      this.props.setGelHeld({
        id: this.props.id,
        held: false
      });

    } else {

      this.props.setGelOnShelf({
        id: this.props.id,
        onShelf: false
      });

      this.props.setGelHeld({
        id: this.props.id,
        held: false
      });
    }
  }

  Object.defineProperty(interactions, 'name', {value: ('gel_interactions_'+this.props.id), configurable: true});
  this.props.pushInteractions([interactions]);
}

makeToast = (type, msg, title) => {
  let color = "";
  if (type === "HINT") {
    color = colors.yellow1;
  } else {
    color = colors.red1;
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

showControls = ()=> {
  this.props.hideAllControls();
  this.props.setGelControlVisibility({id: this.props.id, controlsVisible: true});
}

gelSelected = () => {

  if(!this.props.controlsVisible){
      this.showControls()
  }

  this.props.setGelHeld({
    id: this.props.id,
    held: true,
  })
}

gelUnselected = () => {
  this.props.setGelHeld({
    id: this.props.id,
    held: false,
  })
}

showMoveMenu = e => {
  this.props.setMoveMenu({
    type: this.props.type,
    connect: this.props.id
  });
  this.props.showMoveMenu({ display: !this.props.moveMenuDisplay });
};

render(){
  return (
      <ul style={{ display:(!this.props.inScene)?'none':null, zIndex: (this.props.controlsVisible)?99:null }}>
         <li
            onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.gelSelected() } }
            onMouseDown={this.gelSelected}
            onMouseUp={this.gelUnselected}
            draggable
            tabIndex={0}
            id={this.props.type+"_"+this.props.id}
            className = {"Gel draggable droptarget"+ this.props.id}
             style={{ transform: "translate3d(0px, 0px, 0px) rotateZ(0deg)" }}>
            <p className="label" aria-hidden="true">{this.props.type}</p>
            <Graphics id={this.props.id}/>
            <div className="move-menu" style={{ display: this.props.controlsVisible ? null : "none" }}>
              <button
                tabIndex={0}
                className="move-button"
                onClick={this.showMoveMenu}
                aria-label="Move menu. Select to view the available positions."
              >
                <img src={Move} alt="Move menu icon."/>
              </button>
              <MoveMenu type={this.props.type} connect={this.props.id} />
            </div>
          </li>
      </ul>
    );
  }
}

 const mapStateToProps = (state, ownProps) => {
   return {
       aria: ownProps.aria,
       id: ownProps.id,
       type: state.gel.gels[ownProps.id-1].type,
       controlsVisible: state.gel.gels[ownProps.id-1].controlsVisible,
       inScene: state.gel.gels[ownProps.id-1].inScene,
       interactions: state.scene.interactions,
       target: state.scene.lastDrop.lastTarget,
       interactionProps: {
         gelBoxes: state.gelBox.gelBoxes,
       },
       moveMenuDisplay: state.moveMenu.display,
   }
}

export default connect(mapStateToProps,{
  pushInteractions,
  setGelControlVisibility,
  setGelHeld,
  setGelOnShelf,
  setGelInScene,
  setGelInBox,
  setMoveMenu,
  showMoveMenu,
  hideAllControls
})(Gel);
