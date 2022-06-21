import React, { Component } from 'react';

import Tube from './img/blue-dye-closed-full.svg';

class Graphics extends Component {

  render () {
    return (
      <div id={'tube_'+this.props.id} className="tube dropTarget">
        <img src={Tube} aria-label={'Tube'} />
      </div>
    );
  }

}

export default Graphics;
