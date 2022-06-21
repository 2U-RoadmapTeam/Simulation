import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, {keyframes} from 'styled-components';
//import { Motion, spring } from 'react-motion';

import P2Plunger from './img/P2-Plunger.svg'
import P2NoTip from './img/P2.svg'
import P2Tip from './img/P2-Tip.svg'
import P2TipSolution from './img/P2-Tip-Solution.svg'

import P20Plunger from './img/P20-Plunger.svg'
import P20NoTip from './img/P20.svg'
import P20Tip from './img/P20-Tip.svg'
import P20TipSolution from './img/P20-Tip-Solution.svg'

import P200Plunger from './img/P200-Plunger.svg'
import P200NoTip from './img/P200.svg'
import P200Tip from './img/P200-Tip.svg'
import P200TipSolution from './img/P200-Tip-Solution.svg'

import P1000Plunger from './img/P1000-Plunger.svg'
import P1000NoTip from './img/P1000.svg'
import P1000Tip from './img/P1000-Tip.svg'
import P1000TipSolution from './img/P1000-Tip-Solution.svg'

const images = {
  P2Plunger: P2Plunger,
  P2NoTip: P2NoTip,
  P2Tip: P2Tip,
  P2TipSolution: P2TipSolution,
  P20Plunger: P20Plunger,
  P20NoTip: P20NoTip,
  P20Tip: P20Tip,
  P20TipSolution: P20TipSolution,
  P200Plunger: P200Plunger,
  P200NoTip: P200NoTip,
  P200Tip: P200Tip,
  P200TipSolution: P200TipSolution,
  P1000Plunger: P1000Plunger,
  P1000NoTip: P1000NoTip,
  P1000Tip: P1000Tip,
  P1000TipSolution: P1000TipSolution,
}

// Plunger animation keyframes
const getPlungerPositionKeyFrame = ({ animatingOut, currentPlungerPos, modalDisplayed }) => {
  if(!modalDisplayed){
    if(!animatingOut){

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
          transform: translateY(${
            !animatingOut ? 60 : 0
          }%);
        }
      `;
    } else {

      // This is a linear animation for the plunger release action
      return keyframes`
        0% {
          transform: translateY(${currentPlungerPos}%);
        }
        100% {
          transform: translateY(${
            !animatingOut ? 60 : 0
          }%);
        }
      `;
    }
  } else {
    return keyframes``
  }

};

const setTime = ({ animatingOut, currentPlungerPos }) => {
  if(!animatingOut){
    return '1200ms'
  } else {
    return '400ms'
  }
}

// Plunger animation styling
const Plunger = styled.img`
  animation-name: ${getPlungerPositionKeyFrame};
  animation-duration: ${setTime};
  animation-fill-mode: forwards;
  animation-timing-function: linear;
`;

class Graphics extends Component {

  componentWillMount() {
    for(var image in images){
      if(!image.replace(this.props.type, '').includes(0)){
        const img = new Image();
        img.src = images[image];
      }
    }
  }

  render(){
    return(
      <div aria-hidden="true" aria-label={"P "+this.props.maxVol+" micropipette. Select to display its available settings"} className="graphics">
        <Plunger
          className={this.props.type+"-plunger plunger "+this.props.plungerPosition}
          src={images[this.props.type+"Plunger"]}
          animatingOut={this.props.animatingOut}
          modalDisplayed={this.props.modalDisplayed}
          currentPlungerPos={this.props.currentPlungerPos}
          aria-hidden="true"
          aria-label={this.props.type+' micropipette plunger'}/>
        <img
          className={this.props.type+"-pipette pipette"}
          style={{ pointerEvents: "none" }}
          src={(this.props.tipAttached)? (this.props.solution !== null)?images[this.props.type+"TipSolution"]:images[this.props.type+"Tip"]: images[this.props.type+"NoTip"]}
          aria-label={this.props.type+' micropipette'}
          alt={this.props.type+' micropipette'}
          aria-hidden="true"/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    tipAttached: state.pipette.pipettes[ownProps.id-1].tipAttached,
    plungerPosition: state.pipette.pipettes[ownProps.id-1].plungerPosition,
    animatingOut: state.pipette.pipettes[ownProps.id-1].animatingOut,
    currentPlungerPos: state.pipette.pipettes[ownProps.id-1].currentPlungerPos,
    solution: state.pipette.pipettes[ownProps.id-1].solution,
    type: state.pipette.pipettes[ownProps.id-1].type,
    maxVol: state.pipette.pipettes[ownProps.id-1].maxVol,
    modalDisplayed: state.modal.display
  }
}

export default connect(mapStateToProps, {
})(Graphics);
