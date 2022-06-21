import React, { Component } from "react";

import WaterBathClosed from "./img/waterbath-closed.svg";

import "./WaterBath.scss";

class WaterBath extends Component {

  render() {
    return (
      <ul style={{ padding: '0', margin: '-30px 15%', listStyle: 'none'}}>
        <li aria-label="Water bath"
            id="WaterBath"
            className="dropTarget">
                <img width='85' src={WaterBathClosed} alt="" />
        </li>
      </ul>
    );
  }
}

export default WaterBath;
