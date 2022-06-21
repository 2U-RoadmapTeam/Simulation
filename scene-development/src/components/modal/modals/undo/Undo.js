import React, { Component } from "react";
import { connect } from "react-redux";

import { setLevel, showModal, undo } from "actions";

import "./Undo.scss";
import undoIcon from "./img/undo-modal-icon.svg";

class Undo extends Component {

  noClicked = () => {
    this.props.showModal(false);
  };

  yesClicked = () => {
    if (this.props.restarts > 0 && Object.keys(this.props.snapshots).length > 0) {

      if(this.props.snapshots.hasOwnProperty('back2')){
        this.props.undo({
          lastState: this.props.snapshots.back2
        });
      } else {
        this.props.undo({
          lastState: this.props.snapshots.back1
        });
      }
      console.log('UNDO >>>>', this.props.snapshots.back2);
    } else {
      console.log("WARNING: No more undo attempts left.");
    }

    this.props.showModal(false);
  };

  renderTaskIndex = () => {
    return this.props.page + "." + String.fromCharCode(97 + this.props.task.index)
  }

  render() {
    return (
      <div className="modal-section undo">
        <img alt="Undo Icon" src={undoIcon} className="undoModalIcon" />

        <h4 className="restartModalHeading" tabIndex={0}>
          Are you sure you want to undo this step?
        </h4>

        {/* <p className="taskText">{this.renderTaskIndex()} {this.props.task.levels["l"+this.props.level].task}</p> */}

        <p className="restartsLeftText" tabIndex={0}>{this.props.restarts} restarts left</p>

        <div className="modal-footer">

        <button
            aria-label="No"
            tabIndex={this.props.tab}
            className="modal-btn-secondary lvl-choice"
            onClick={this.noClicked}
          >
            No
          </button>


          <button
            aria-label="Yes"
            tabIndex={this.props.tab}
            className="modal-btn-primary lvl-choice"
            onClick={this.yesClicked}
          >
            Yes
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.notebook.focusedTaskObj);
  return {
    task: state.notebook.focusedTaskObj,
    restarts: state.undo.attempts,
    level: state.notebook.level,
    page: state.notebook.currentProtocolPage,
    lastState: state.undo.snapshots.back1,
    snapshots: state.undo.snapshots,
  };
};

export default connect(
  mapStateToProps,
  {
    setLevel,
    showModal,
    undo,
  }
)(Undo);
