import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
//import { Motion, spring } from 'react-motion';
import React, { Component } from 'react';

import P2Plunger from "./img/P2-Plunger.svg";
import P2NoTip from "./img/P2.svg";
import P2Tip from "./img/P2-Tip.svg";
import P2TipSolution from "./img/P2-Tip-Solution.svg";
import P2TipSolutionPink from "./img/P2-Tip-Solution-Pink.svg";
import P2TipSolutionBlue from "./img/P2-Tip-Solution-Blue.svg";

import P20Plunger from "./img/P20-Plunger.svg";
import P20NoTip from "./img/P20.svg";
import P20Tip from "./img/P20-Tip.svg";
import P20TipSolution from "./img/P20-Tip-Solution.svg";
import P20TipSolutionPink from "./img/P20-Tip-Solution-Pink.svg";
import P20TipSolutionBlue from "./img/P20-Tip-Solution-Blue.svg";

import P200Plunger from "./img/P200-Plunger.svg";
import P200NoTip from "./img/P200.svg";
import P200Tip from "./img/P200-Tip.svg";
import P200TipSolution from "./img/P200-Tip-Solution.svg";
import P200TipSolutionPink from "./img/P200-Tip-Solution-Pink.svg";
import P200TipSolutionBlue from "./img/P200-Tip-Solution-Blue.svg";

import P1000Plunger from "./img/P1000-Plunger.svg";
import P1000NoTip from "./img/P1000.svg";
import P1000Tip from "./img/P1000-Tip.svg";
import P1000TipSolution from "./img/P1000-Tip-Solution.svg";
import P1000TipSolutionPink from "./img/P1000-Tip-Solution-Pink.svg";
import P1000TipSolutionBlue from "./img/P1000-Tip-Solution-Blue.svg";

import { showModal, setVol, incVol, decVol } from "../../actions";

const images = {
  P2Plunger: P2Plunger,
  P2NoTip: P2NoTip,
  P2Tip: P2Tip,
  P2TipSolution: P2TipSolution,
  P2TipSolutionPink: P2TipSolutionPink,
  P2TipSolutionBlue: P2TipSolutionBlue,
  P20Plunger: P20Plunger,
  P20NoTip: P20NoTip,
  P20Tip: P20Tip,
  P20TipSolution: P20TipSolution,
  P20TipSolutionPink: P20TipSolutionPink,
  P20TipSolutionBlue: P20TipSolutionBlue,
  P200Plunger: P200Plunger,
  P200NoTip: P200NoTip,
  P200Tip: P200Tip,
  P200TipSolution: P200TipSolution,
  P200TipSolutionPink: P200TipSolutionPink,
  P200TipSolutionBlue: P200TipSolutionBlue,
  P1000Plunger: P1000Plunger,
  P1000NoTip: P1000NoTip,
  P1000Tip: P1000Tip,
  P1000TipSolution: P1000TipSolution,
  P1000TipSolutionPink: P1000TipSolutionPink,
  P1000TipSolutionBlue: P1000TipSolutionBlue
};

// Plunger animation keyframes
const getPlungerPositionKeyFrame = ({
  animatingOut,
  currentPlungerPos,
  modalDisplayed,
  modalType
}) => {
  if(!modalDisplayed || (modalDisplayed && modalType === "GEL_PIPETTE")){
    if (!animatingOut) {
      // This is the stepped animation to demonstrate the stop positions
      return keyframes`
        0% {
          transform: translateY(${currentPlungerPos}%);
        }
        20% {
          transform: translateY(40%);
        }
        80% {
          transform: translateY(40%);
        }
        100% {
          transform: translateY(${!animatingOut ? 60 : 0}%);
        }
      `;
    } else {
      // This is a linear animation for the plunger release action
      return keyframes`
        0% {
          transform: translateY(${currentPlungerPos}%);
        }
        100% {
          transform: translateY(${!animatingOut ? 60 : 0}%);
        }
      `;
    }
  } else {
    return null
  }
};

const setTime = ({ animatingOut, currentPlungerPos }) => {
  if(!animatingOut){
    return '1200ms'
  } else {
    return "400ms";
  }
};

// Plunger animation styling
const Plunger = styled.img`
  animation-name: ${getPlungerPositionKeyFrame};
  animation-duration: ${setTime};
  animation-fill-mode: forwards;
  animation-timing-function: linear;
`;

class Graphics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: {
        top: 0,
        mid: 0,
        bottom: 0
      },
      type: this.props.type
    };
  }

  componentWillUpdate(prevProps, prevState) {
    if (this.props.stateVolume !== prevProps.stateVolume) {
      this.stringHandle();
    }
  }

  componentWillMount() {
    this.stringHandle();
  }

  stringHandle = () => {

      if(this.props.stateVolume !== undefined){
        let volume = (this.props.stateVolume).toFixed(2);

        if (volume <= 9.5) {
          volume = '0'+volume;
        } else if(volume <= 990 && this.props.type === 'P1000'){
          volume = '0'+volume;
        } else if(volume <= 99 && this.props.type === 'P200'){
          volume = '0'+volume;
        } else {
          volume = ''+volume;
        }

        let volumes = volume.split('');
        let top = 0;
        let mid = 0;
        let bottom = 0;

        if(this.props.type === 'P2'){
          top = volumes[1]
          mid = volumes[3]
          bottom = 0
        } else if (this.props.type === 'P1000'){
          top = volumes[0]
          mid = volumes[1]
          bottom = volumes[2]
        } else if(this.props.type === 'P200'){
          top = volumes[0]
          mid = volumes[1]
          bottom = volumes[2]
        } else {
          top = volumes[0]
          mid = volumes[1]
          bottom = volumes[3]
        }
        //
        // const top = volumes[0]
        // const mid = volumes[1]
        // const bottom = volumes[3]

        return [
          top,
          mid,
          bottom
        ]
      } else {
        return [
          0,
          0,
          0
        ]
      }

    };

  displayVolumeString() {
    let [top, mid, bottom] = this.stringHandle();

    return (
      <div aria-label={"Display window volume is, "+top+", "+mid+", "+bottom}tabIndex={(this.props.stateVolume !== undefined?"0":null)}>
        <div className="volume-state__top"> { top } </div>
        <div className="volume-state__mid"> { mid } </div>
        <div className="volume-state__bottom"> { bottom } </div>
      </div>
    );
  }

  decideStyle = () => {
    if(this.props.style!==undefined){
      return this.props.style
    } else {
      return {}
    }
  }

  getImage = () => {

    let ref = this.props.type;

    if(this.props.tipAttached){
      if(this.props.solution !== null){
        ref += "TipSolution"

        if(this.props.solution.hasOwnProperty("4x SDS sample buffer")){
          //ref += "Blue"
        } else {

          if(this.props.solution.hasOwnProperty("Protein ladder")){
            ref += "Blue"
          } else {
            ref += "Pink"
          }
        }

      } else {
        ref += "Tip"
      }
    } else {
      ref += "NoTip"
    }

    console.log(ref);

    return images[ref]
  }

  render(){
    return(
      <div  aria-label={"P "+this.props.maxVol+" micropipette. Select to display its available settings"} className={"graphics graphics-"+this.props.type}  >
        <Plunger
          className={
            this.props.type + "-plunger plunger " + this.props.plungerPosition
          }
          src={images[this.props.type + "Plunger"]}
          animatingOut={this.props.animatingOut}

          modalDisplayed={this.props.modalDisplayed}
          modalType={this.props.modalType}
          currentPlungerPos={this.props.currentPlungerPos}
          aria-label={this.props.type + " micropipette plunger"}
        />
        <div className="pipette__volume-string">
          {this.displayVolumeString()}
        </div>
        <img
          onKeyPress={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.pipetteSelected()  }}
          className={this.props.type+"-pipette pipette"}
          style={{ pointerEvents: "none" }}
          src={this.getImage()}
          aria-label={this.props.type + " micropipette"}
          // style={this.decideStyle()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    tipAttached: state.pipette.pipettes[ownProps.id - 1].tipAttached,
    plungerPosition: state.pipette.pipettes[ownProps.id - 1].plungerPosition,
    animatingOut: state.pipette.pipettes[ownProps.id - 1].animatingOut,
    currentPlungerPos:
      state.pipette.pipettes[ownProps.id - 1].currentPlungerPos,
    solution: state.pipette.pipettes[ownProps.id - 1].solution,
    type: state.pipette.pipettes[ownProps.id - 1].type,
    maxVol: state.pipette.pipettes[ownProps.id - 1].maxVol,
    modalDisplayed: state.modal.display,
    modalType: state.modal.type,
    volume: state.pipette.pipettes[ownProps.id-1].volume,
    style: ownProps.style,
  }
}

export default connect(
  mapStateToProps,
  {
    showModal,
    setVol,
    incVol,
    decVol
  }
)(Graphics);
