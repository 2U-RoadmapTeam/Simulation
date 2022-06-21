import React, { Component } from 'react'
import { connect } from 'react-redux'

import MicrocentrifugeClosed from './images/centrifuge-front-closed_.svg';
import MicrocentrifugeEmpty from './images/centrifuge-front-empty.svg';

import MicrocentrifugeFront_1 from './images/centrifuge-front-1.svg';
import MicrocentrifugeFront_2 from './images/centrifuge-front-2.svg';
import MicrocentrifugeFront_3 from './images/centrifuge-front-3.svg';
import MicrocentrifugeFront_4 from './images/centrifuge-front-4.svg';
import MicrocentrifugeFront_5 from './images/centrifuge-front-5.svg';

import {
  setModal,
  showModal,
  setCentrifugeOpen,
  setSolution,
} from '../../actions';

const images = {
  "centrifuge-front Closed": MicrocentrifugeClosed,
  "centrifuge-front Empty": MicrocentrifugeEmpty,
  "centrifuge-front Front_1": MicrocentrifugeFront_1,
  "centrifuge-front Front_2": MicrocentrifugeFront_2,
  "centrifuge-front Front_3": MicrocentrifugeFront_3,
  "centrifuge-front Front_4": MicrocentrifugeFront_4,
  "centrifuge-front Front_5": MicrocentrifugeFront_5
}

class Graphics extends Component {

  componentWillMount() {
    for (var image in images) {
      const img = new Image();
      img.src = images[image];
    }
  }

  getImage = () => {
    var ref = 'centrifuge-front '
    if (!this.props.open) {
      ref += 'Closed'
    } else {
      ref += 'Empty'
    }

    return images[ref]

  };

  openCloseMicroCentrifuge = () => {
    this.props.setCentrifugeOpen({
        open: !this.props.open
    });
  };

  showMicroCentrifugeModal = () => {

    this.props.setModal({
      type: 'MICROCENTRIFUGE_BALANCER',
      size: 'lg',
      connect: this.props.id
    });

    this.props.showModal({ display: true});
  };

  showMicroCentrifugeControls = () => {
    this.props.setModal({
      type: 'MICROCENTRIFUGE_CONTROLS',
      size: 'lg',
      connect: this.props.id
    });

    this.props.showModal({ display: true});
  };

  render() {
    return (
      <div>
        <div className="micro-top" style={this.props.open ? { top: '13px', minHeight: '65px' } : { minHeight: '53px' }} onClick={this.openCloseMicroCentrifuge} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.openCloseMicroCentrifuge(e)} }></div>
        <div className="micro-controls" style={this.props.open ? { top: '143px', height: '43px' } : { top: '84px', height: '43px' }} onClick={this.showMicroCentrifugeControls} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.showMicroCentrifugeControls(e)} }></div>
        <div className="micro-bottom" style={this.props.open ? { minHeight: '53px', top: '117px' } : { minHeight: '90px' }} onClick={this.showMicroCentrifugeModal} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.showMicroCentrifugeModal(e)} }></div>
        {
          this.props.open ? <img style={ this.props.open ? { marginTop: '6px' } : { marginTop: '-53px' } } width="100" src={this.getImage()} aria-label="Microcentrifuge" alt="Microcentrifuge" aria-hidden={this.props.context==="Materials"?"true":"false"}/> : <img style={ this.props.solutionTubes >= 1 ? { marginTop: '6px' } : { marginTop: '-53px' } } width="100" src={this.getImage()} alt="Microcentrifuge" aria-label="Microcentrifuge" aria-hidden={this.props.context==="Materials"?"true":"false"}/>
        }

      </div>
    );
  }
}

const mapStateProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    type: state.centrifuge.type,
    open: state.centrifuge.open
  };
};

export default connect(mapStateProps, {
  setModal,
  showModal,
  setCentrifugeOpen,
  setSolution,
})(Graphics);
