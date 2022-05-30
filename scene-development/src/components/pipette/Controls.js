import React, { Component } from "react";
import { connect } from "react-redux";
import Graphics from "./Graphics";
import { findIndex } from "lodash";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { css } from "glamor";
import Toast from "../toast/Toast";
//import styled, {keyframes} from 'styled-components';

import MoveMenu from "./MoveMenu"

import Move from "./img/move.svg";
import Eject from "./img/eject.svg";

import {
  pushInteractions,
  incVol,
  decVol,
  setPipetteSolution,
  setTipAttached,
  setTipUsed,
  setAnimatingOut,
  setPlungerPosition,
  setCurrentPlungerPos,
  setPipetteControlVisibility,
  depositBlotPaper,
  trashFull,
  incSolution,
  decSolution,
  setModal,
  showModal,
  setMoveMenu,
  showMoveMenu,
  setHeldObject,
  setHeld,
  setGelLane,
  makeGelImgConfig,
  setVol,
  incPipetteTrashWarnings,
} from "../../actions";

// Icons
// import IconPointer from "components/icons/pointer-solid";

// Styles
import colors from "../../styles/_colors.scss";

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teleportVisible: false
    };

    const interactions = (heldObj, target) => {

      //Don't run if this pipette not the held object
      if (heldObj.type !== "Pipette" || heldObj.id !== this.props.id) {
        return null;
      }
      if (target === undefined || target === null) {
        return null;
      }

      //All GelBox interactions
      if (target.type === "GelBox") {
        //Get the targeted TipBox
        const gelsID = target.id;
        const targetGelBox = this.props.interactionProps.gelBoxes[gelsID - 1];

        if (!this.props.tipAttached) {
          //Alert - pipette already has a tip attached
          this.makeToast(
            "WARNING",
            "The pipette needs a tip attached first.",
            "You need to add a tip to the micropipette."
          );
        } else if (targetGelBox.open) {
          //Tip Box open - attach tip
          if (targetGelBox.containsGel) {
            //There is a gel in the box, and the pipette has a tip attached
            this.showGelModal();
          } else {
            //Alert - pipette already has a tip attached
            this.makeToast(
              "WARNING",
              "The gel box has no gel inside.",
              "There needs to be a gel before you can add a solution."
            );
          }
        } else if (!targetGelBox.open) {
          this.makeToast(
            "WARNING",
            "You need to open the lid of the gel box first.",
            "Gel box closed!"
          );
        } else {
          return null;
        }
      }


      //All TipBox interactions
      if (target.type === "TipBox") {
        //Get the targeted TipBox
        const tipsID = target.id;
        const tipsType = target.tipType;
        const targetTipBox = this.props.interactionProps.tipBoxes[tipsID - 1];
        let shareTips = ["P20", "P100", "P200"];
        if (
          (shareTips.includes(this.props.type) &&
            shareTips.includes(tipsType)) ||
          tipsType === this.props.type
        ) {
          if (targetTipBox.open) {
            //Tip Box open - attach tip
            if (!this.props.tipAttached) {
              //No tip attached - can attach new tip
              this.props.setTipUsed({
                id: this.props.id,
                used: false
              });
              this.props.setPipetteSolution({
                id: this.props.id,
                solution: null,
                solutionAlias: null
              });
              this.props.setTipAttached({
                id: this.props.id,
                attached: true
              });
            } else {
              //Alert - pipette already has a tip attached
              this.makeToast(
                "WARNING",
                "This pipette already has a tip attached.",
                "Tip already attached!"
              );
            }
          } else {
            //Alert - open tip box
            this.makeToast(
              "WARNING",
              "You must open the tip box first.",
              "Tip Box is closed!"
            );
          }
        } else {
          //Alert - wrong type of tipbox for this pipette
          this.makeToast(
            "WARNING",
            "These tips do not fit the " + this.props.type + " pipette.",
            "Wrong Tip Box!"
          );
        }
      } else {
        return null;
      }
    };

    Object.defineProperty(interactions, 'name', {value: ('pipette_controls_interactions_'+this.props.id), configurable: true});
    this.props.pushInteractions([interactions]);
  }

  showGelModal = () => {
    this.props.setModal({
      type: "GEL_PIPETTE",
      size: "lg",
      pipetteId: this.props.id,
      gelId: 1,
      gelBoxId: 1
    });
    this.props.showModal({ display: true });
  };

  makeToast = (type, msg, title) => {
    let color = "";
    if (type === "HINT") {
      color = colors.yellow1;
    } else {
      color = colors.red1;
    }

    toast(<Toast type={type} msg={msg} title={title} />, {
      // className: css({
      //   border: "2px solid " + color,
      //   borderRadius: "6px",
      //   marginLeft: "-200px",
      //   minWidth: "400px"
      // }),
      // progressClassName: css({
      //   background: color
      // }),
      // position: "top-center",
      // autoClose: 5000
    });
  };

  //Extracts liquid into pipette
  extract = (factor) => {

    if(typeof factor === 'undefined'){
      factor = 1;
    }

    const lastDrop = this.props.interactionProps.lastDrop;

    if (lastDrop.lastHeld === null || lastDrop.lastTarget === null) {
      this.makeToast(
        "WARNING",
        "Please place the pipette over a valid extraction target.",
        "No extraction target found!"
      );
      return null;
    }

    if (
      lastDrop.lastHeld.id !== this.props.id ||
      lastDrop.lastHeld.type !== "Pipette"
    ) {
      this.makeToast(
        "WARNING",
        "Please place the pipette over a valid extraction target.",
        "No extraction target found!"
      );
      return null;
    }

    //Ending function if no target
    if (lastDrop.lastTarget === undefined || lastDrop.lastTarget === null) {
      this.makeToast(
        "WARNING",
        "Please place the pipette over a valid extraction target.",
        "No extraction target found!"
      );
      return null;
    }
    //If target of last drop was a solution
    if (lastDrop.lastTarget.type === "Solution") {
      const solutionID = lastDrop.lastTarget.id;
      const solutionObj = this.props.interactionProps.solutions[solutionID - 1];
      let volume = 0;
      let solution = {};

      if (this.props.tipAttached) {
        //Only continue if tip attached - else warn
        if (solutionObj.open) {
          //Open - extract solution to pipette
          if (!this.props.tipUsed) {
            //Only extract if tip not used
            if (solutionObj.volume >= (this.props.volume * factor)) {
              // Only use the pipette volume if its greater
              // than the available solution volume
              volume = (this.props.volume * factor);
            } else {
              this.makeToast(
                "WARNING",
                "You have extracted air with your solution.",
                "Air extracted!"
              );
              // Otherwise use the solution volume
              volume = solutionObj.volume;
            }

            // Create a new solution object and populate it
            // with all the solutions in the tube
            if (solutionObj.volume > 0) {
              solution = {};

              for (var solute in solutionObj.solutions) {
                solution[solute] =
                  solutionObj.solutions[solute] / (solutionObj.volume / volume);
              }
            } else {
              solution = null;
            }

            this.props.setPipetteSolution({
              id: this.props.id,
              solution: solution,
              fragments: solutionObj.fragments,
              solutionAlias: solutionObj.type
            });
            this.props.setTipUsed({
              id: this.props.id,
              used: true
            });
            this.props.decSolution({
              id: parseInt(solutionID, 10),
              type: solutionObj.type,
              amount: volume
            });
          } else {
            //if(this.props.warningsFired < 2){
              console.log("Warnings so far", this.props.warningsFired);
              this.makeToast(
                "WARNING",
                "Please put this tip in trash and attach a new tip.",
                "Tip already used!"
              );
              // this.props.incPipetteTrashWarnings({
              //   id:1
              // })
            //}
          }
        } else {
          this.makeToast(
            "WARNING",
            "Please open the solution before attempting to extract.",
            "Solution is closed!"
          );
        }
      } else {
        this.makeToast(
          "WARNING",
          "Please attach a tip before attempting to extract the solution",
          "No tip attached!"
        );
      }
    }
  };

  //Deposits liquid from pipette
  deposit = () => {
    const lastDrop = this.props.interactionProps.lastDrop;

    if (lastDrop.lastHeld === null || lastDrop.lastTarget === null) {
      this.makeToast(
        "WARNING",
        "Please place the pipette over a valid deposit target.",
        "No deposit target found!"
      );
      return null;
    }

    if (
      lastDrop.lastHeld.id !== this.props.id ||
      lastDrop.lastHeld.type !== "Pipette"
    ) {
      this.makeToast(
        "WARNING",
        "Please place the pipette over a valid deposit target.",
        "No deposit target found!"
      );
      return null;
    }

    //Ending function if no valid target
    if (lastDrop.lastTarget === undefined || lastDrop.lastTarget === null) {
      this.makeToast(
        "WARNING",
        "Please place the pipette over a valid deposit target.",
        "No deposit target found!"
      );
      return null;
    }

    //Only try deposit if tip attached
    if (this.props.tipAttached) {
      //If target is valid deposit target
      if (lastDrop.lastTarget.type === "BlottingPaper") {
        const blotId = lastDrop.lastTarget.id;
        const depObj = this.props.interactionProps.blotPapers[blotId - 1];
        const depId = lastDrop.lastTarget.subId;

        //if deposit target hasn't already been used
        if (!depObj.used) {
          //If pipette isn't empty
          if (this.props.solution !== null) {
            // Create a new solution object and populate it
            // with all the solutions in the pipette
            var solution = {};
            var totalVolume = 0;
            for (var solute in this.props.solution) {
              solution[solute] = this.props.solution[solute];
              totalVolume += this.props.solution[solute];
            }

            //Run deposit with following data
            this.props.depositBlotPaper({
              id: blotId,
              solution: solution,
              solutionAlias: this.props.solutionAlias,
              volume: totalVolume,
              index: depId
            });
            this.props.setPipetteSolution({
              id: this.props.id,
              solution: null,
              solutionAlias: null
            });
          } else {
            this.makeToast(
              "WARNING",
              "Please extract a solution before depositing.",
              "Tip is empty!"
            );
          }
        } else {
          this.makeToast(
            "WARNING",
            "Please try depositing in a different receptacle.",
            "Deposit already used!"
          );
        }
      } else if (lastDrop.lastTarget.type === "Gel") {

        const gelId = lastDrop.lastTarget.id;
        // const depObj = this.props.interactionProps.gels[gelId - 1];
        const lane = lastDrop.lastTarget.lane;
        const well = lastDrop.lastTarget.well;

        let solution = {};
        let totalVolume = 0;
        for (var sol in this.props.solution) {
          solution[sol] = this.props.solution[sol];
          totalVolume += this.props.solution[sol];
        }

        if (totalVolume > 0) {
          if (typeof lane !== undefined && lane > 0) {
            if (typeof well !== undefined && well > 0) {
              //HERE: All actions to reducers to set final outcomes
              this.props.setGelLane({
                id: gelId,
                laneNumber: lane,
                laneData: {
                  volume: totalVolume,
                  solutions: solution,
                  solutionAlias: this.props.solutionAlias,
                  fragments: this.props.fragments,
                  particulate: this.props.interactionProps.solutions[
                    findIndex(this.props.interactionProps.solutions, {
                      type: this.props.solutionAlias
                    })
                  ].particulate,
                  empty: false
                }
              });
              //Set pipette to empty
              // this.props.setVol({
              //   id: this.props.id,
              //   volume: 0
              // });
              this.props.setPipetteSolution({
                id: this.props.id,
                solution: null,
                fragments: null,
                solutionAlias: null
              });
              //Update image for gel if new lanes full
              this.props.makeGelImgConfig({
                id: gelId
              });
            } else {
              this.makeToast(
                "WARNING",
                "Please place the pipette tip in the well before depositing.",
                "Not inside a well!"
              );
            }
          } else {
            this.makeToast(
              "WARNING",
              "Please place the pipette in a lane before depositing.",
              "No lane selected!"
            );
          }
        } else {
          this.makeToast(
            "WARNING",
            "Please place solution in the pipette tip before depositing.",
            "No solution in tip!"
          );
        }
      } else if (lastDrop.lastTarget.type === "Solution") {

        if(this.props.interactionProps.solutions[(parseInt(lastDrop.lastTarget.id, 10) - 1)].open){
          //Only deposit into the following solutions:
          // if (
          //   [
          //     "Wild type tube",
          //     "Pancreas tube",
          //     "Edit 7 tube",
          //     "Edit 4 tube",
          //     "Dummy",
          //     "K-",
          //     "K+",
          //     "A-",
          //     "A+",
          //     "Balance"
          //   ].includes(lastDrop.lastTarget.solution)
          // ) {
            //Need id of target solution, type of deposit, amount of deposit
            // console.log([].push(this.props.solution));
            this.props.incSolution({
              id: parseInt(lastDrop.lastTarget.id, 10),
              solutions: [this.props.solution],
              fragments: this.props.fragments,
            });

            //Also delete solution in pipette
            this.props.setPipetteSolution({
              id: this.props.id,
              solution: null,
              solutionAlias: null,
              fragments: null
            });
          //
          // } else {
          //   this.makeToast(
          //     "WARNING",
          //     "You cannot deposit your solution into this tube, because of contamination risk.",
          //     "Solution contaminated!"
          //   );
          // }
        } else {
          this.makeToast(
            "WARNING",
            "Please open the solution before attempting to deposit.",
            "Solution is closed!"
          );
        }
      }

    } else {
      this.makeToast(
        "WARNING",
        "Please attach a tip before attempting to deposit.",
        "No tip attached!"
      );
    }
  }

  updatePlunger = elem => {

    function getTransform(elem) {
      var matrix = getComputedStyle(elem, null).transform;

      var regex = /-?\d*\.{0,1}\d+/g;
      var values = matrix.match(regex);

      var translateX = '';
      var translateY = '';

      if (values != null) {
        translateX = values[4];
        translateY = values[5];
      }

      return {
        'translateX': translateX,
        'translateY': translateY
      };
    }
    // We need to convert the px back to a percentage
    var matrix = getTransform(elem);
    var translateY = (matrix.translateY / elem.offsetHeight) * 100;
    var position = "";

    // Depending on the position percentage update the state
    if (translateY < 30) {
      position = "At Rest";
    } else if (30 <= translateY && translateY < 41) {
      position = "1st Stop";
    } else if (41 <= translateY) {
      position = "2nd Stop";
    }

    // If the new state does not equal the old state
    if (position !== this.props.plungerPosition && position !== "") {

      // Save the state
      this.props.setPlungerPosition({
        id: this.props.id,
        plungerPosition: position
      });

      if(this.props.interactionProps.lastDrop.lastTarget.type === 'Gel'){

        // Trigger the extract / deposit if the plunger
        // is being pushed down
        if (!this.props.animatingOut) {
          if (position === "1st Stop") {
            this.deposit();
          } else if(position === "2nd Stop"){
            this.makeToast(
              "WARNING",
              "Pressing the plunger down to the second stop may displace your sample from the well.",
              "Pushed to second stop!"
            );
          }
        }

      } else {

        // Trigger the extract / deposit if the plunger
        // is being pushed down
        if (!this.props.animatingOut) {
          if (position === "2nd Stop") {
            this.deposit();
          }
        } else {
          // if (position === "1st Stop" && translateY > 39) {
          //   this.extract(2);
          // }
          if (position === "At Rest" && translateY >= 28 && translateY < 41) {
            this.extract();
          }
        }

      }
    }
  }

    shiftPlunger = e => {
      if (e.repeat) {
        return;
      } else {
        // This merely triggers the animation of the plunger
        // We need to determine the plungers current plunger
        // position before we animate it (as we don't)
        // always run the full animation sequence from 0

        // console.log(
        //   this.props.type,
        //   document.getElementsByClassName(this.props.type + "-plunger")[0]
        // );
        var elem = document.getElementsByClassName(
          this.props.type + "-plunger"
        )[0];
        function getTransform(elem) {
          var matrix = getComputedStyle(elem, null).transform;

          var regex = /-?\d*\.{0,1}\d+/g;
          var values = matrix.match(regex);

          var translateX = '';
          var translateY = '';

          if (values != null) {
            translateX = values[4];
            translateY = values[5];
          }

          return {
            'translateX': translateX,
            'translateY': translateY
          };
        }

        // We need to convert the px back to a percentage
        var matrix = getTransform(elem);

        // We need to convert the px back to a percentage
        var translateY = (matrix.translateY / elem.offsetHeight) * 100;

        console.log(translateY, e.type);

        // Update the state values to trigger the animation
        this.props.setAnimatingOut({
          id: this.props.id,
          animatingOut:
            e.type === "mouseup" ||
            e.type === "keyup" ||
            e.type === "mouseout" ||
            e.type === "dragstart" ||
            e.type === "blur"
        });
        this.props.setCurrentPlungerPos({
          id: this.props.id,
          currentPlungerPos: translateY
        });

        // Update the plunger
        var interval = setInterval(this.updatePlunger, 1000 / 64, elem);
        setTimeout(clearInterval, 1200, interval);
      }
    };


  showVolumeModal = e => {
    this.props.setModal({
      type: "PIPETTE_VOLUME",
      size: "lg",
      connect: this.props.id
    });
    this.props.showModal({ display: true });
  };

  showMoveMenu = e => {
    this.props.setMoveMenu({
      type: this.props.type,
      connect: this.props.id
    });
    this.props.showMoveMenu({ display: !this.props.moveMenuDisplay });
  };

  ejectTip = () => {

    if (
      this.props.interactionProps.lastDrop.lastTarget === null ||
      this.props.interactionProps.lastDrop.lastTarget === undefined ||
      this.props.interactionProps.lastDrop.lastHeld === null ||
      this.props.interactionProps.lastDrop.lastHeld === undefined
    ) {
      return null;
    }

    if((this.props.interactionProps.lastDrop.lastTarget.type === "Biohazard" && !this.props.interactionProps.trashOpen)){
      this.makeToast(
        "WARNING",
        "You must open the biohazard waste container before you can eject a tip.",
        "Open Biohazard Waste Container!"
      );
      return null;
    }

    //Only if this pipette over Trash
    if (
      this.props.interactionProps.lastDrop.lastHeld.id === this.props.id &&
      (this.props.interactionProps.lastDrop.lastTarget.type === "Trash" ||
      (this.props.interactionProps.lastDrop.lastTarget.type === "Biohazard" && this.props.interactionProps.trashOpen))
    ) {

      //Set trash to full
      if (this.props.tipAttached) {
        this.props.trashFull(true);
      }
      //Clear tip data from pipette
      this.props.setTipAttached({
        id: this.props.id,
        attached: false
      });
      this.props.setTipUsed({
        id: this.props.id,
        used: false
      });
      this.props.setPipetteSolution({
        id: this.props.id,
        solution: null,
        solutionAlias: null
      });
    }
  };

  componentDidMount(){
    this.props.setAnimatingOut({
      id: this.props.id,
      animatingOut: true
    });
  }

  render() {
    return (
      <div
        className="controls"
        style={{ display: this.props.controlsVisible ? null : "none" }}
      >
        <div className="volume-control">
          <div className="volume-indicator">
            <span
              className="volume-value"
              tabIndex={0}
              onKeyDown={e => {
                if (e.keyCode === 13 || e.keyCode === 32)
                  this.showVolumeModal(e);
              }}
              aria-label={"Volume settings. "+this.props.volume+" microliters. Select to change the volume."}
              onClick={this.showVolumeModal}
            >
              {this.props.volume}μl
            </span>
            {/* <IconPointer style={{ color: colors.navy2, height: "44px" }} /> */}
          </div>
        </div>
        <div
          className="plunger-control"
          style={{
            display:
              this.props.target !== null &&
              (this.props.target.type === "Solution" ||
                this.props.target.type === "BlottingPaper")
                ? null
                : "none"
          }}
          aria-label="Plunger setting. Current plunger position release. Hold down the mouse button to manipulate the plunger position."
        >
          <div
            tabIndex={0}
            className="plunger-indicator"
            onKeyDown={e => {
              if (e.keyCode === 13 || e.keyCode === 32) this.shiftPlunger(e);
            }}
            onKeyUp={e => {
              if (e.keyCode === 13 || e.keyCode === 32) this.shiftPlunger(e);
            }}
            onBlur={this.shiftPlunger}
            onMouseDown={this.shiftPlunger}
            onMouseOut={this.shiftPlunger}
            onDragStart={this.shiftPlunger}
            onMouseUp={this.shiftPlunger}
          >
            <span aria-label={"Plunger position,"+this.props.plungerPosition} className="plunger-value">{this.props.plungerPosition}</span>
            <div className="plunger-graphics" aria-hidden="true">
              <Graphics id={this.props.id} tabIndex="-1"/>
            </div>
          </div>
        </div>
        <div className="move-menu" style={{bottom: this.props.target !== null &&
        (this.props.target.type === "Solution" ||
          this.props.target.type === "BlottingPaper")?"calc(100% + 148px)":null}}>
          <button
            tabIndex={0}
            className="move-button"
            aria-label="Move menu. Select to view the available positions."
            onClick={this.showMoveMenu}
          >
            <img src={Move} alt="Move menu icon."/>
          </button>
          <MoveMenu type={this.props.type} connect={this.props.id} />
        </div>

        <div
          className="eject-btn-container"
          style={{
            display:
              this.props.target !== null &&
              (this.props.target.type === "Trash" || this.props.target.type === "Biohazard") &&
              this.props.tipAttached
                ? null
                : "none"
          }}
        >
          <button className="eject-btn" aria-label="Eject tip. Select to remove the tip from your micropipette." onClick={this.ejectTip}>
            <img src={Eject} aria-hidden="true" aria-label="Eject button" alt="Eject button" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    id: ownProps.id,
    target: state.scene.lastDrop.lastTarget,
    type: state.pipette.pipettes[ownProps.id - 1].type,
    volume: state.pipette.pipettes[ownProps.id - 1].volume,
    solution: state.pipette.pipettes[ownProps.id - 1].solution,
    fragments: state.pipette.pipettes[ownProps.id - 1].fragments,
    solutionAlias: state.pipette.pipettes[ownProps.id - 1].solutionAlias,
    controlsVisible: state.pipette.pipettes[ownProps.id - 1].controlsVisible,
    tipAttached: state.pipette.pipettes[ownProps.id - 1].tipAttached,
    tipUsed: state.pipette.pipettes[ownProps.id - 1].tipUsed,
    plungerPosition: state.pipette.pipettes[ownProps.id - 1].plungerPosition,
    animatingOut: state.pipette.pipettes[ownProps.id - 1].animatingOut,
    currentPlungerPos:
      state.pipette.pipettes[ownProps.id - 1].currentPlungerPos,
    targetList: state.scene.targetList,
    heldObject: state.scene.heldObject,
    interactions: state.scene.interactions,
    moveMenuDisplay: state.moveMenu.display,
    warningsFired: state.scene.pipetteTrashWarnings,

    interactionProps: {
      tipBoxes: state.tipBox.tipBoxes,
      gelBoxes: state.gelBox.gelBoxes,
      solutions: state.solution.solutions,
      blotPapers: state.blotPaper.blotPapers,
      trashOpen: state.trash.open,
      lastDrop: state.scene.lastDrop
    }
  };
};

export default connect(
  mapStateToProps,
  {
    pushInteractions,
    incVol,
    decVol,
    setPipetteSolution,
    setTipAttached,
    setTipUsed,
    setAnimatingOut,
    setPlungerPosition,
    setCurrentPlungerPos,
    depositBlotPaper,
    trashFull,
    incSolution,
    decSolution,
    setPipetteControlVisibility,
    setModal,
    showModal,
    setMoveMenu,
    showMoveMenu,
    setHeldObject,
    setHeld,
    setGelLane,
    makeGelImgConfig,
    setVol,
    incPipetteTrashWarnings,
  }
)(Controls);
