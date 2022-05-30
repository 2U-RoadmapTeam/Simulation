import React, { Component } from 'react'
import { connect } from 'react-redux';
import Graphics from 'components/tipBox/Graphics';

import './TipBox.scss'

import { tipBoxOpen } from '../../actions';

class TipBox extends Component {

  toggleBoxClosed = () => {
    this.props.tipBoxOpen(
      {
        id: this.props.id,
        open: !this.props.open
      }
    );
  }

  render() {
    return (
      <ul>
        <li
          draggable
          onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.toggleBoxClosed(e)} }
          tabIndex={0}
          id={this.props.type+"_TipBox_"+this.props.id}
          className={'TipBox draggable dropTarget'+((this.props.open)?' open':'')}
          style={{ transform: "translate3d(0px, 0px, 0px) rotateZ(0deg)" }}>
          <p className="label" aria-hidden="true">{this.props.type+" Tips"}</p>
          <Graphics id={this.props.id} />
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    type: ownProps.type,
    open: state.tipBox.tipBoxes[ownProps.id-1].open // set to closed
  }
}

export default connect(mapStateToProps, {
  tipBoxOpen
})(TipBox);
