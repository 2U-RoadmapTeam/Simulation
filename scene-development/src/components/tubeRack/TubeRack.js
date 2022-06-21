import React, { Component } from "react"
import "./TubeRack.scss";

import TubeRackImg from "./img/tube-rack-on-shelf.svg"

const images = {
  TubeRackImg:TubeRackImg,
}

class TubeRack extends Component {
    render() {
        return (
          <ul>
            <li
                id={"TubeRack_"+this.props.id}
                className="PipetteRack"
                style={{ pointerEvents: 'none'}}>
                <img style={{ pointerEvents: 'none'}} src={TubeRackImg} aria-label={'Reagent Tube Rack'} />
            </li>
          </ul>
        )
    }
}



export default TubeRack
