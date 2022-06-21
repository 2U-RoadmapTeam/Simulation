import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeatBlock from './img/heatBlock.svg'
import HeatBlock1 from './img/heatBlock1.svg'
import HeatBlock2 from './img/heatBlock2.svg'
import HeatBlock3 from './img/heatBlock3.svg'
import HeatBlock4 from './img/heatBlock4.svg'
import HeatBlock5 from './img/heatBlock5.svg'
import HeatBlock6 from './img/heatBlock6.svg'

import {

} from '../../actions';

const images = {
    HeatBlock: HeatBlock,
    HeatBlock1: HeatBlock1,
    HeatBlock2: HeatBlock2,
    HeatBlock3: HeatBlock3,
    HeatBlock4: HeatBlock4,
    HeatBlock5: HeatBlock5,
    HeatBlock6: HeatBlock6,
}

class Graphics extends Component {

  countHeatBlockSolutions = () => {
    let count = 0;

    for(var i = 0; i < this.props.solutions.length; i++){
      if( this.props.solutions[i].id !== null){
        count++;
      }
    }
    return count;
  }

  render(){
    return(
      <div className="graphics">
        <img
          className={"HeatBlock"}
          style={{ pointerEvents: "none" }}
          src={(this.countHeatBlockSolutions() < 1)?images.HeatBlock:images['HeatBlock'+this.countHeatBlockSolutions()]}
          aria-label="Heat block."/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    solutions: state.heatBlock.solutions
  }
}

export default connect(mapStateToProps, {
})(Graphics);
