import React, { Component } from "react";
import { connect } from "react-redux";
import FocusLock from "react-focus-lock";

import { setModal, showModal,createPopup, undo } from "actions"

import ProtocolRead from "components/modal/modals/protocolRead/ProtocolRead"
import PipetteVolume from "components/modal/modals/pipetteVolume/PipetteVolume";
import LevelChoice from "components/modal/modals/levelChoice/LevelChoice";
import WaterBathControls from "components/modal/modals/waterBathControls/WaterBathControls";
import MicroCentrifugeBalancer from "components/modal/modals/microCentrifugeBalancer/MicroCentrifugeBalancer";
import MicroCentrifugeControls from "components/modal/modals/microCentrifugeControls/MicroCentrifugeControls";
import RemoveTubesFromRack from "components/modal/modals/removeTubesFromRack/RemoveTubesFromRack";
import PowerSupplyControls from "components/modal/modals/powerSupplyControls/PowerSupplyControls"
import GelPosition from "components/modal/modals/gelPosition/GelPosition";
import GelPipette from "components/modal/modals/gelPipette/GelPipette";
import TaskCountdown from "components/modal/modals/taskCountdown/TaskCountdown";
import ProtocolTableModal from "components/modal/modals/protocolTableModal/protocolTableModal"
import Undo from "components/modal/modals/undo/Undo";
import CombRemoval from "components/modal/modals/gelComb/GelComb"
import GelEject from "components/modal/modals/gelEject/GelEject"
import HeatBlockControls from "components/modal/modals/heatBlockControls/HeatBlockControls"
import HeatBlockTubes from "components/modal/modals/heatBlockTubes/HeatBlockTubes"
import PopupQuestion from "components/modal/modals/popupQuestion/PopupQuestion"
import GelBoxPour from "components/modal/modals/gelBoxPour/GelBoxPour"

import close from "./img/close.svg";

import "./Modal.scss";
class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getContent = type => {
    switch (type) {
      case "PROTOCOL_READ":
        return <ProtocolRead />;

      case "PIPETTE_VOLUME":
        return <PipetteVolume id={this.props.connect} />;

      case "LEVEL_CHOICE":
        return <LevelChoice />;

      case "POPUP_QUESTION":
        this.popupQuestionReduxSetup()
        return <PopupQuestion data={this.props.data}/>;

      case "GEL_BOX_POUR":
        return <GelBoxPour id={this.props.connect}/>;

      case "MICROCENTRIFUGE_BALANCER":
        return <MicroCentrifugeBalancer id={this.props.connect} />;

      case "MICROCENTRIFUGE_CONTROLS":
        return <MicroCentrifugeControls id={this.props.connect} />;

      case "POWERSUPPLY_CONTROLS":
        return <PowerSupplyControls id={this.props.connect} />;

      case "GEL_POSITION":
        return <GelPosition id={this.props.connect}/>;

      case "REMOVE_COMB":
        return <CombRemoval id={this.props.connect}/>;

      case "GEL_EJECT":
        return <GelEject id={this.props.connect}/>;

      case "GEL_PIPETTE":
        return (
          <GelPipette
            pipetteId={this.props.pipetteId}
            gelId={this.props.gelId}
            gelBoxId={this.props.gelBoxId}
          />
        );

      case "PROTOCOL_TABLE_MODAL":
        return <ProtocolTableModal id={this.props.connect} />

      case "TASK_COUNTDOWN":
        return <TaskCountdown data={this.props.data} />;

      case "WATER_BATH_CONTROLS":
        return <WaterBathControls />;

      case "REMOVE_TUBES_FROM_RACK":
        return <RemoveTubesFromRack />;

      case "UNDO":
        return <Undo />
      case "HEATBLOCK_CONTROLS":
        return <HeatBlockControls id={this.props.connect} />;

      case "HEATBLOCK_TUBES":
        return <HeatBlockTubes id={this.props.connect} />;

      default:
        return "No modal type matched";
    }
  };

  popupQuestionReduxSetup = () =>{
    let tempData = this.props.data.components[0].props
    this.props.createPopup({
      id: tempData.id,
      type: tempData.type,
      choices: tempData.choices,
      label: tempData.label,
      attempts: tempData.attempts,
      answer: tempData.answer,
      correct: tempData.correct,
      image: (typeof tempData.image !== 'undefined')?tempData.image:null
    })
  }

  close = () => {
    this.props.showModal({ display: false });
  };

  applyFocusLock = (innerJSX) => {
    if(this.props.noteEntryOpen || ["Predictions","Results","Reflection"].includes(this.props.sectionSelected) ){
      //No focus lock if: notesEntry is open OR predictions, results, or reflection is open
      return innerJSX
    } else {
      return (
        <FocusLock disabled={!this.props.display}>
          {innerJSX}
        </FocusLock>
      )
    }
  }

  render() {
    //passes inner into above func, wraps in focus lock if needed
    let inner = (
        <div
          className={"Modal " + this.props.size}
          style={{ display: this.props.display ? "block" : "none" }}
        >
          <div
            style={{
              display: this.props.display ? "block" : "none",
              height: "100%"
            }}
          >
            <div className="wrapper">
              <div
                aria-label="Close Button"
                tabIndex={0}
                className={
                  this.props.type === "UNDO" &&
                  this.props.size === "sm"
                    ? "close-sm"
                    : "close"
                }
                onKeyDown={e => {
                  if (e.keyCode === 13 || e.keyCode === 32) this.close(e);
                }}
                onClick={this.close}
              >
                <p>
                  Close{" "}
                  <img
                    style={{
                      display: "inline-block",
                      top: "3px",
                      position: "relative"
                    }}
                    src={close}
                    aria-label="Close button"
                    alt="Close button"
                  />
                </p>
              </div>
              {this.getContent(this.props.type)}
            </div>
          </div>
        </div>
    );

    return (this.applyFocusLock(inner))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    display: state.modal.display,
    type: state.modal.type,
    size: state.modal.size,
    connect: state.modal.connect,
    pipetteId: state.modal.pipetteId,
    gelId: state.modal.gelId,
    gelBoxId: state.modal.gelBoxId,
    noteEntryOpen: state.notebook.noteEntryOpen,
    sectionSelected: state.notebook.sectionSelected,
    data: state.modal.data
  };
};

export default connect(
  mapStateToProps,
  {
    setModal,
    showModal,
    undo,
    createPopup,
  }
)(Modal);
