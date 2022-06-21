import React, { Component } from "react"
import "./Vortex.scss";
import { connect } from "react-redux";

import vortexempty from "./img/vortexempty.svg"
import vortexWithTube from "./img/vortex-with-tube.svg"

import "./Vortex.scss"


const images = {
  vortexempty: vortexempty,
  vortexWithTube: vortexWithTube,

};


class Vortex extends Component {
    render() {
        return (
          <ul>
            <li>
            <div
                id={"Vortex"}
                className="dropTarget "
                tabIndex="0"
                >
                <p aria-hidden="true" className="label">Vortex</p>
                <img src={vortexempty} alt={'Vortex'}  />
            </div>
            </li>
          </ul>
        )
    }
}

// className={(this.props.vibrating?" graphic":" ")}


export default Vortex
