import React, { Component } from 'react';
import { connect } from 'react-redux';

import PowerNoWires from './img/powerSupply.svg'

import {

} from 'actions';

const images = {
    PowerNoWires: PowerNoWires,
}


class Graphics extends Component {


  render(){
    return(
      <div aria-label={"Power Supply. Select to display its available settings"} className="graphics">
        <img
          className={"PowerSupply"}
          style={{ pointerEvents: "none" }}
          src={images.PowerNoWires}
          aria-label="Power Supply."
          alt="Power Supply."/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, {

})(Graphics);
