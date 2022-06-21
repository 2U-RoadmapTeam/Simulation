import React, { Component } from "react";
import { connect } from "react-redux";

import Graphics from "components/waterBath/Graphics";

import "./WaterBath.scss";



class WaterBath extends Component {

  render() {
    return (
      <ul>
        <li
          aria-label="Water bath"
          id="WaterBath"
          className={"dropTarget" + ((this.props.waterBathOpen)?" open":"")}
        >
          <p aria-hidden="true" className="label">Water Bath</p>
          <Graphics />
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    rackInBath: state.floatingTubeRack.inWaterBath,
    waterBathOpen: state.waterBath.open,
    solutionInFreezer:state.solutionInFreezer
  };
};
{}
export default connect(
  mapStateToProps,
  {

  }
)(WaterBath);
