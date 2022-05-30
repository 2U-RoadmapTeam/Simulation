import React, { Component } from "react";
import { connect } from "react-redux";
//import styled, { keyframes } from 'styled components';

import gelFlat from "./img/agarose-gel-side-view.svg";
import gelFlipped from "./img/agarose-gel-5-front-view.svg";
import GelComb from './img/gelComb.svg'
import Gel from './img/gel.svg'

import {
  setModal,
  showModal

} from '../../actions';

const images = {
  gelFlipped: gelFlipped,
  gelFlat: gelFlat,
  GelComb:GelComb,
  Gel:Gel
};

class Graphics extends Component {
  componentWillMount() {
    for (var image in images) {
      if (!image.replace(this.props.type, "").includes(0)) {
        const img = new Image();
        img.src = images[image];
      }
    }
  }

  getImage = () => {
    let reference = "gel";

    if (this.props.held) {
      reference += "Flipped";
    } else if (!this.props.onShelf){
      reference += "Flipped";
    } else if(this.props.materialsView){
      reference += "Flipped";
    } else {
      reference += "Flat";
    }

    return images[reference];
  };

  render (){
    return(
      <img
      width="100"
      aria-label="Polyacrylamide Gel"
      alt="Protein Gel"
      aria-hidden={this.props.context==="Materials"?"true":"false"}
      className={this.props.type+"-gel gel"}
      //src={this.getImage()}
      src={(this.props.comb)?images['GelComb']:images['Gel']}
      //onKeyPress={ (e)=>{if(e.which === 13 || e.which === 32) this.showCombRemovalModal(e)}}
      />
    )

    }

  }

  const mapStateToProps = (state , ownProps) => {
    return {
        id:ownProps.id,
        type: state.gel.gels[ownProps.id-1].type,
        orientation: ownProps.orientation,
        comb: state.gel.gels[ownProps.id-1].comb,
        onShelf: state.gel.gels[ownProps.id - 1].onShelf,
        held: state.gel.gels[ownProps.id - 1].held,
        materialsView: ownProps.materialsView,
    }
}


export default connect(
  mapStateToProps,
  {
    setModal,
    showModal
  }
)(Graphics);
