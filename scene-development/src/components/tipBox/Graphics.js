import React, { Component } from 'react'
import { connect } from 'react-redux'
import { tipBoxOpen } from '../../actions'

import P2Closed from "./img/P2-sm-close.svg";
import P2Open from "./img/P2-sm-open.svg";
import P20Closed from "./img/P20-sm-close.svg";
import P20Open from "./img/P20-sm-open.svg";
import P200Closed from "./img/P200-sm-close.svg";
import P200Open from "./img/P200-sm-open.svg";
import P1000Closed from "./img/P1000-sm-close.svg";
import P1000Open from "./img/P1000-sm-open.svg";

const images = {
  P2Closed: P2Closed,
  P2Open: P2Open,
  P20Closed: P20Closed,
  P20Open: P20Open,
  P200Closed: P200Closed,
  P200Open: P200Open,
  P1000Closed: P1000Closed,
  P1000Open: P1000Open
};

class Graphics extends Component {
  toggleOpen = () => {
    this.props.tipBoxOpen({
      id: this.props.id,
      open: !this.props.open
    });
  };

  componentWillMount() {
    for (var image in images) {
      if (!image.replace(this.props.type, "").includes(0)) {
        const img = new Image();
        img.src = images[image];
      }
    }
  }

  render() {
    return (
      <div
        onClick={this.toggleOpen}
        onKeyPress={e => {
          if (e.which === 13 || e.which === 32) this.toggleOpen(e);
        }}
        tabIndex={1}
        className="graphics"
      >
        <img
          onClick={this.toggleOpen}
          style={{ pointerEvents: "none" }}
          src={(this.props.open)?images[this.props.type+"Open"]:images[this.props.type+"Closed"]}
          aria-label={this.props.type+' tip box'}
          alt={this.props.type+' tip box'}
          aria-hidden={this.props.context==="Materials"?"true":"false"}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    type: state.tipBox.tipBoxes[ownProps.id - 1].type,
    open: state.tipBox.tipBoxes[ownProps.id - 1].open
  };
};
export default connect(
  mapStateToProps,
  { tipBoxOpen }
)(Graphics);
