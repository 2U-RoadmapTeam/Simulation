import React, { Component } from 'react';

import EmptyTubeStand from './img/empty-tube-stand.svg';

class Graphics extends Component {

  render () {
    return (
      <div id={'empty-tube-stand_'+this.props.id} className="empty-tube-stand">
        <img src={EmptyTubeStand} aria-label={'Empty Tube Stand'} alt={'Empty Tube Stand'} />
      </div>
    );
  }

}

export default Graphics;
