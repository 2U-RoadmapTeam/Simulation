import React, { Component } from 'react';
import { connect } from 'react-redux';


import { removeTubesFromVortex, setSolutionHomogenized} from "../../actions";

import vortexempty from "./img/vortexempty.svg"
import DH20 from "./img/solution-tube-distilled-water-d-h-20.svg";
import vortexWithTube from "./img/vortex-with-tube.svg"

const images ={
DH20:DH20,
vortexempty: vortexempty,
vortexWithTube: vortexWithTube,
};


class Graphics extends Component {


  render() {
    return (
      <div aria-label="Vortex" >
        {/* {this.buildImage()} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      tube: state.vortex.tube,
      type: state.vortex.type
    }
}

export default connect(mapStateToProps, {addTubeToVortex, removeTubesFromVortex})(Graphics)


