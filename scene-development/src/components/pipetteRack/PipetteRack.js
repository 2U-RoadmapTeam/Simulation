import React, { Component } from "react"
import "./PipetteRack.scss";

import PipetteRackImg from "./img/PipetteRack.svg"

class PipetteRack extends Component {
    render() {
        return (
          <ul>
            <li
                id={"PipetteRack_"+this.props.id} tabIndex={0}
                className="PipetteRack dropTarget">
                <p aria-hidden="true" className="label" style={{display:"none"}}>Pipette rack</p>
                <img src={PipetteRackImg} aria-label={'Laboratory micropipette rack'} alt={'Laboratory micropipette rack'} />
            </li>
          </ul>
        )
    }
}
export default PipetteRack;
