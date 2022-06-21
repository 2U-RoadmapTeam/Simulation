import React, { Component } from "react";
import { connect } from "react-redux";
import Graphics from "./Graphics";
import MoveMenu from "./MoveMenu";
import { isEqual } from "lodash"

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../toast/Toast'
import colors from '../../styles/_colors.scss';

import {
  pushInteractions,
  waterBathContainsTubeRack,
  tubeInWaterBath,
  tubeInFreezer,
  freezerContainsTubeRack,
  setFloatingTubeRackHeld,
  setFloatingTubeRackControlVisibility,
  hideAllControls,
  showMoveMenu,
  setMoveMenu
} from "../../actions";

import Move from "./img/move.svg";

class FloatingTubeRack extends Component {
  constructor(props) {
    super(props);

    const interactions = (heldObj, target) => {
      //Don't run if this pipette not the held object

      //Check if last drop held was FloatingTubeRack
      if (heldObj.type !== "FloatingTubeRack") {
        return null;
      } else {
        console.log("Detected float interaction");
      }
      if (target === undefined || target === null) {
        return null;
      }
      //Check if last drop target was Water Bath
      if (target.type === "WaterBath") {
        console.log("Detected float dropped on bath");

        //check if bath open
        if (this.props.waterBathOpen) {
          //Set tube visibility to false
          this.props.tubeInWaterBath({
            inWaterBath: true
          });

          //Set containsTubeRack in WaterBath to true
          this.props.waterBathContainsTubeRack({
            containsTubeRack: true
          });


          //Change tube state here


        } else {
          //if bath closed
          this.makeToast("WARNING", "Please open the Water Bath first.", "Water Bath Closed!")
        }
      } else if (target.type === "Freezer") {
        console.log('Detected floating rack was dropped on freezer');

        if (this.props.freezerOpen) {
          this.props.tubeInFreezer({
            inFreezer: true
          });

          //Set containsTubeRack in WaterBath to true
          this.props.freezerContainsTubeRack({
            containsTubeRack: true
          });
        } else {
          // if freezer is closed
          this.makeToast('WARNING', 'Please open the freezer first.', 'Freezer Closed!');
        }
      } else {
        return null;
      }
    };

    this.props.pushInteractions([interactions]);
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

  getStyle = () => {
    if (this.props.inWaterBath || this.props.inFreezer) {
      return {
        transform: "translate3d(0px, 0px, 0px) rotateZ(0deg)",
        display: "none",
        zIndex: (this.props.controlsVisible)?99:null
      };
    } else {
      return {
        transform: "translate3d(0px, 0px, 0px) rotateZ(0deg)",
        display: "inline-block",
        zIndex: (this.props.controlsVisible)?99:null
      };
    }
  };

  showControls = ()=> {
    this.props.hideAllControls();
    this.props.setFloatingTubeRackControlVisibility({id: this.props.id, controlsVisible: true});
  }

  floatingTubeRackSelected = () => {
    if(!this.props.controlsVisible){
        this.showControls()
    }

    this.props.setFloatingTubeRackHeld({
      id: this.props.id,
      held: true,
    })
  }

  floatingTubeRackUnselected = () => {
    this.props.setFloatingTubeRackHeld({
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


  render() {
    return (
      <ul>
        <li
          aria-label="Floating tube rack"
          id="FloatingTubeRack"
          tabIndex={0}
          draggable
          className="draggable FloatingTubeRack dropTarget"
          onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.floatingTubeRackSelected() } }
          onMouseDown={this.floatingTubeRackSelected}
          onMouseUp={this.floatingTubeRackUnselected}
          style={this.getStyle()}
        >
          <p aria-hidden="true" className="label">Floating Tube Rack</p>
          <Graphics id={this.props.id} />
          <div className="move-menu" style={{ display: this.props.controlsVisible ? null : "none" }}>
            <button
              tabIndex={0}
              className="move-button"
              aria-label="Move menu. Select to view the available positions."
              onClick={this.showMoveMenu}
            >
              <img src={Move} />
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
    inWaterBath: state.floatingTubeRack.inWaterBath,
    waterBathOpen: state.waterBath.open,
    freezerOpen: state.freezer.open,
    inFreezer: state.floatingTubeRack.inFreezer,
    waterBathHasTubeRack: state.waterBath.containsTubeRack,
    freezerHasTubeRack: state.freezer.containsTubeRack,
    tubes: state.floatingTubeRack.tubes,
    controlsVisible: state.floatingTubeRack.controlsVisible
  };
};

export default connect(
  mapStateToProps,
  {
    pushInteractions,
    waterBathContainsTubeRack,
    tubeInWaterBath,
    tubeInFreezer,
    freezerContainsTubeRack,
    setFloatingTubeRackHeld,
    setFloatingTubeRackControlVisibility,
    hideAllControls,
    showMoveMenu,
    setMoveMenu
  }
)(FloatingTubeRack);
