import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, {keyframes} from 'styled-components';
//import { Motion, spring } from 'react-motion';

import iceBucket from './img/ice-Bucket.svg'
import TubeAM from "./img/solution-tube-a_--closed.svg";

import { setTubesInIce } from "../../actions";

class Graphics extends Component {
  buildImage = () => {
    return (
      <div aria-label="Ice bucket" className="graphics" style={{ pointerEvents: "none" }}>

      {this.props.AMinus ? <img id="tubeICE" src={TubeAM} /> : ""}

        <img
          style={{ pointerEvents: "none" }}
          src={iceBucket}
          aria-label={"IceBucket"}
        />
      </div>
    );
  };

  test = () => {
    this.props.setTubesInIce({
      tubes: {

        AMinus: false

      }
    });
  };

  render() {
    return (
      <div aria-label="IceBucket" className="graphics">
        {this.buildImage()}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

    AMinus: state.iceBucket.AMinus

  };
};

export default connect(
  mapStateToProps,
  { setTubesInIce }
)(Graphics);
