import React, { Component } from "react";
import { connect } from "react-redux";

import {showModal, removeTubesFromRack, setSolutionInScene} from "actions";

import "./RemoveTubesFromRack.scss";
import colors from "styles/_colors.scss";
import IconStart from "components/icons/start-solid";
import TubesImg from "./img/../img/floating-solution-tube-rack-filled.svg"
import warnIcon from "./img/graphic-warning.svg"

class RemoveTubesFromRack extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  eject = () => {
    this.props.removeTubesFromRack({})

    this.props.tubes.forEach(tube => {
        this.props.setSolutionInScene({
            id: tube.id,
            inScene: true
          });
    });

    this.props.showModal(false);
  };

  render() {
    return (
      <div className="modal-section remove-tubes">
        <div className="modal-header">
          <img className="warning" src={warnIcon} />
          <h2>Oops! You put the wrong solution tube in the floating rack! Remove all the tubes to start again.</h2>
        </div>

        <div className="modal-body">
          <div className="modal-inner">
            <img className="image" src={TubesImg} style={{ pointerEvents: "none" }} />
          </div>
        </div>

        <div className="modal-footer">
          <button
            aria-label="Start simulation button"
            tabIndex={this.props.tab}
            className="modal-btn-primary"
            onClick={this.eject}>

              <IconStart style={{ color: colors.charcoal1, height: "16px", top: "2px" }} />
              {" "} Remove tubes

          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    level: state.notebook.level,
    tubes: state.floatingTubeRack.tubes,
  };
};

export default connect(
  mapStateToProps,
  {
    showModal,
    removeTubesFromRack,
    setSolutionInScene,
  }
)(RemoveTubesFromRack);
