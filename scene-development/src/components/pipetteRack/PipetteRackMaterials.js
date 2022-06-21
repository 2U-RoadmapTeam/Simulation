import React, { Component } from "react"
import "./PipetteRack.scss";

import PipetteRackImg from "./img/PipetteRack.svg"

class PipetteRackMaterials extends Component {
    render() {
        return (
          <ul style={{ padding: '0', marginTop: "-10px", height: "60%", listStyle: 'none'}}>
            <li aria-label={'Laboratory micropipette rack'}
                className="PipetteRack dropTarget">
                    <img width='85' src={PipetteRackImg} alt="Pipette rack image" />
            </li>
          </ul>
        )
    }
}
export default PipetteRackMaterials;
