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
        <div
          className="micro-top"
          tabIndex={this.props.context==="Materials"?null:0}
          aria-label="Microcentrifuge lid. Select to open or close the lid."
          style={this.props.open ? { top: '13px', height: '65px' } : { height: '53px' }}
          onClick={this.openCloseMicroCentrifuge}
          onKeyDown={ (e)=>{ if(e.keyCode===13||e.keyCode===32)this.openCloseMicroCentrifuge() } }>
        </div>
        <div
          className="micro-controls"
          tabIndex={this.props.context==="Materials"?null:0}
          aria-label="Microcentrifuge controls. Select to view the available settings."
          style={this.props.open ? { top: '143px', height: '43px' } : { top: '84px', height: '43px' }}
          onClick={this.showMicroCentrifugeControls}
          onKeyDown={ (e)=>{ if(e.keyCode===13||e.keyCode===32)this.showMicroCentrifugeControls() } }>
        </div>
        <div
          className="micro-bottom"
          tabIndex={this.props.context==="Materials"?null:0}
          aria-label="Microcentrifuge. Select to view it's contents."
          style={this.props.open ? { top: '84px', height: '56px' } : { height: '0px' }}
          onClick={this.showMicroCentrifugeModal}
          onKeyDown={ (e)=>{ if(e.keyCode===13||e.keyCode===32)this.showMicroCentrifugeModal() } }>
        </div>

        {
          this.props.open ? <img style={ this.props.open ? { marginTop: '6px' } : { marginTop: '-53px' } } width="100" src={this.getImage()} aria-label="Microcentrifuge" alt="Microcentrifuge"/> : <img style={ this.props.solutionTubes >= 1 ? { marginTop: '6px' } : { marginTop: '-53px' } } width="100" src={this.getImage()} aria-label="Microcentrifuge" alt="Microcentrifuge" />
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
