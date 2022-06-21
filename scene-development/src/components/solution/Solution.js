/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import Graphics from "components/solution/Graphics";
import MoveMenu from "./MoveMenu";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import Toast from "../toast/Toast";

import "./Solution.scss";
import {
  pushInteractions,
  solutionOpen,
  setSolutionInScene,
  setSolutionOnRack,
  setSolution,
  setSolutionTubesInCentrifuge,
  addTubeToCentrifuge,
  setSolutionHeld,
  setSolutionControlVisibility,
  setMoveMenu,
  showMoveMenu,
  hideAllControls,
  setSolutionInFreezer,
  setSolutionOnIce,
  setSolutionInWaterBath,
  setModal,
  showModal,
  setSolutionHomogenized,
  addTubeToRack,
  addTubeToHeatBlock

} from '../../actions';

import Move from "./img/move.svg";
import CellCultureRack from "./img/cellCultureRack.svg";

import colors from 'styles/_colors.scss';

class Solution extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    const interactions = (heldObj, target) => {
      //Don't run if this solution not the held object
      if (heldObj.type !== "Solution" || heldObj.id !== this.props.id) {
        return null;
      }

      console.log(target);

      if (target === undefined || target === null) {
        return null;
      }

      if (target.type === "TubeStand") {
        this.props.setSolutionOnRack({
          id: this.props.id,
          onRack: true
        });

        // Reset the tube position to a zero transform
        heldObj.htmlObj.style.transform =
          "translate3d(0px,0px,0px) rotateZ(0deg)";
          
      } else {
        this.props.setSolutionOnRack({
          id: this.props.id,
          onRack: false
        });
      }

      if (target.type === "HeatBlock") {

        if(!this.props.open){
          if (this.props.shape === "tube") {
            const targetHeatBlock = this.props.interactionProps.heatBlock;

            this.props.setSolutionInScene({
              id: this.props.id,
              inScene: false
            });

            this.props.addTubeToHeatBlock({
              id: this.props.id,
              type: this.props.type
            });

            // Reset the tube position to a zero transform
            heldObj.htmlObj.style.transform =
              "translate3d(0px,0px,0px) rotateZ(0deg)";
          } else {
            //Alert - only tubes allowed
            this.makeToast(
              "WARNING",
              "You can only fit tubes into the heat block.",
              "Item does not fit!"
            );
          }
        } else {
          this.makeToast(
            "WARNING",
            "You shouldn't insert an open tube into the heat block.",
            "Tube is open!"
          );
        }
      }

      //All Microcentrifuge interactions
      if (target.type === "Microcentrifuge") {

          //Get the targeted TipBox
          const targetMicrocentrifuge = this.props.interactionProps.centrifuge;
          if (targetMicrocentrifuge.open) {


            if (this.props.open) {
              this.makeToast("WARNING", "Please close the solution tube", "Solution tube open");
            } else {

              if(this.props.shape === "tube"){
                this.props.setSolutionInScene({
                  id: this.props.id,
                  inScene: false
                });

                this.props.addTubeToCentrifuge({
                  id: this.props.id,
                  type: this.props.type
                });

                heldObj.htmlObj.style.transform = "translate3d(0px,0px,0px) rotateZ(0deg)"
              } else {
                this.makeToast(
                  "WARNING",
                  "This solution does not fit inside the Microcentrifuge slots.",
                  "Incorrect solution!"
                );
              }
            }

            // Reset the tube position to a zero transform
            console.log(heldObj)
            // heldObj.htmlObj.style.transform = "translate3d(0px,0px,0px) rotateZ(0deg)"

          } else {
            //Alert - open centrifuge
            this.makeToast(
              "WARNING",
              "You must open the microcentrifuge first.",
              "Microcentrifuge is closed!"
            );
          }
      } else if (target.type === "FloatingTubeRack") {

        //Only add if less than 4 tubes in rack
        if (this.props.interactionProps.floatingTubeRack.count <= 4) {
          if (
            ["K-", "K+", "A-", "A+"].includes(this.props.type)
          ) {
            //Make invisible in scene
            this.props.setSolutionInScene({
              id: this.props.id,
              inScene: false
            });

            //Add this solution to Floating Rack array
            this.props.addTubeToRack({
              type: this.props.type,
              id: this.props.id
            });

            let floatingRackPos = document.getElementById("FloatingTubeRack").getBoundingClientRect();
            let elemPos = heldObj.htmlObj.parentNode.parentNode.getBoundingClientRect();

            let deltaLeft = (floatingRackPos.left - elemPos.left);
            let deltaTop = (floatingRackPos.top - elemPos.top);

            let index = this.props.interactionProps.floatingTubeRack.tubes.find(function(val){
              return (val == null)
            });

            let positions = [30, 55, 85, 110];
            //alert(JSON.stringify([floatingRackPos, elemPos, deltaLeft, deltaTop]));

            heldObj.htmlObj.style.transform = "translate3d("+(deltaLeft + positions[index])+"px, "+(deltaTop + 33)+"px, 0px) rotateZ(0deg)";

          } else {
            //Show error modal here - eject tubes from rack
            // this.props.setModal({
            //   display: false,
            //   type: "REMOVE_TUBES_FROM_RACK",
            //   size: "sm",
            //   connect: -1
            // });
            // this.props.showModal({ display: true });

            this.makeToast(
              "WARNING",
              "These solutions should not be placed in the floating tube rack.",
              "Incorrect solution!"
            );

            // Reset the position
            heldObj.htmlObj.style.transform = "translate3d(0px,0px,0px) rotateZ(0deg)";
            heldObj.htmlObj.style.zIndex = null;

          }
        } else {
          this.makeToast(
            "WARNING",
            "You cannot fit more tubes on the tube rack.",
            "Tube Rack is Full!"
          );
        }
      } else if (target.type === "IceBucket") {

        if(["2.5xB","K","A","RE","dH2O","K+","A+"].includes(this.props.type)){

          // Set the iced prop in the reducer

          // Reset the position
          heldObj.htmlObj.style.transform = "translate3d(0px,0px,0px) rotateZ(0deg)";
          heldObj.htmlObj.style.zIndex = null;

        } else {
          this.makeToast(
            "WARNING",
            "This solution should not be placed in the ice bucket.",
            "Incorrect solution!"
          );

          // Reset the position
          heldObj.htmlObj.style.transform = "translate3d(0px,0px,0px) rotateZ(0deg)";
          heldObj.htmlObj.style.zIndex = null;
        }

      } else if (target.type === "Vortex" ) {
        // Add the active class
        document.getElementById('Vortex').classList.add('active');

        // Remove once animation time elapsed
        window.setTimeout(function(){
          document.getElementById('Vortex').classList.remove('active');
        }, 250)

        this.props.setSolutionHomogenized({
          id: this.props.id,
          homogenized: true
        })

      } else {
        return null;
      }
    };

    Object.defineProperty(interactions, 'name', {value: ('solution_interactions_'+this.props.id), configurable: true});
    this.props.pushInteractions([interactions])
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

  toggleClosed = () =>{
      this.props.solutionOpen(
          {
              id:this.props.id,
              open: !this.props.open
          }
      );
  }

  showControls = ()=> {
    this.props.hideAllControls();
    this.props.setSolutionControlVisibility({id: this.props.id, controlsVisible: true});
  }

  solutionSelected = () => {
    if(!this.props.controlsVisible){
        this.showControls()
    }

    this.props.setSolutionHeld({
      id: this.props.id,
      held: true,
    })
  }

  solutionUnselected = () => {
    this.props.setSolutionHeld({
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
        <ul style={{ visibility:(!this.props.inScene)?'hidden':null, zIndex: (this.props.controlsVisible)?99:null }}>
          <li
              onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.solutionSelected() } }
              onMouseDown={this.solutionSelected}
              onMouseUp={this.solutionUnselected}
              aria-label= {this.props.type+"Solution"}
              draggable
              id={'Solution_'+this.props.id} tabIndex={0}
              className={'Solution draggable '+this.props.shape+' dropTarget'+((this.props.open)?' open':'')}
              style={{ transform: "translate3d(0px, 0px, 0px) rotateZ(0deg)" }}>
              <div
                tabIndex="0"
                onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.toggleClosed(e)} }>
                <p className="label" aria-hidden="true">{this.props.label}</p>
                <Graphics id={this.props.id} />
                <div className="move-menu" style={{ display: this.props.controlsVisible ? null : "none", bottom: "calc(100% + "+((this.props.shape == "vessel")?this.props.label.length * 6:this.props.label.length * 8)+"px)" }}>
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
              </div>
          </li>
          <li style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0 }}>
            {this.props.shape === "vessel" ? (
              <img className="vesselRackImg" alt="Cell culture stand" style={{ pointerEvents: "none", position: "absolute", top: 0 }} src={CellCultureRack} />
            ) : (
              ""
            )}
          </li>
        </ul>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        shape: state.solution.solutions[ownProps.id-1].shape,
        open: state.solution.solutions[ownProps.id-1].open,
        type: state.solution.solutions[ownProps.id-1].type,
        label: state.solution.solutions[ownProps.id-1].label,
        inScene: state.solution.solutions[ownProps.id-1].inScene,
        controlsVisible: state.solution.solutions[ownProps.id-1].controlsVisible,
        description: null,
        interactionProps: {
          centrifuge: state.centrifuge,
          floatingTubeRack: state.floatingTubeRack,
        },
        shape: state.solution.solutions[ownProps.id - 1].shape,
        moveMenuDisplay: state.moveMenu.display
    };
};

export default connect(mapStateToProps, {
  pushInteractions,
  solutionOpen,
  setSolutionInScene,
  setSolutionOnRack,
  setSolution,
  setSolutionTubesInCentrifuge,
  addTubeToCentrifuge,
  setSolutionHeld,
  setSolutionControlVisibility,
  setMoveMenu,
  showMoveMenu,
  hideAllControls,
  setSolutionInFreezer,
  setSolutionOnIce,
  setSolutionInWaterBath,
  setModal,
  showModal,
  setSolutionHomogenized,
  addTubeToRack,
  addTubeToHeatBlock
})(Solution);
