import React, { Component } from "react";
import { connect } from "react-redux";
import Graphics from "components/pipette/Graphics";
import FocusLock from "react-focus-lock";

import PopupQuestion from "components/questions/popupQuestion/PopupQuestion";

import { showModal, createPopup, validatePopup } from "actions";

import "./PopupQuestion.scss";
import Warning from "./img/warning.svg";

const images = {
  Warning: Warning
};

class PopupQuestionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      components: []
    };
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.props.latestData.components[0].props === undefined) {
  //     console.log(
  //       "DID UPDATED:",
  //       this.props.latestData,
  //       prevProps.latestData,
  //       this.props.latestData.components[0].props.label !==
  //         prevProps.latestData.components[0].props.label
  //     );
  //     if (
  //       this.props.latestData.components[0].props.label !==
  //       prevProps.latestData.components[0].props.label
  //     ) {
  //       this.forceUpdate();
  //     }
  //   }
  // };

  // doReduxPart = data => {
  //   console.log("DO REDUX PART FN RAN");
  //   data.components.forEach(comp => {
  //     this.setupComponentRedux(comp);
  //   });
  // };

  // doCompPart = data => {
  //   console.log("DO COMP PART FN RAN");

  //   let compArr = [];

  //   data.components.forEach((comp, index) => {
  //     let componentData = [];
  //     componentData.push(this.buildComponent(comp, index));
  //     compArr.push(componentData);
  //   });

  //   this.setState({
  //     components: compArr
  //   });
  // };

  buildPopup = () => {
    let compArr = [];

    this.props.latestData.components.forEach((comp, index) => {
      let componentData = [];
      componentData.push(this.buildComponent(comp, index));
      compArr.push(componentData);
    });

    return compArr;
  };

  setupComponentRedux = data => {

    this.props.createPopup({
      id: data.props.id,
      type: data.props.type,
      choices: data.props.choices,
      label: data.props.label,
      attempts: data.props.attempts,
      answer: data.props.answer,
      correct: data.props.correct,
      image: typeof data.props.image !== "undefined" ? data.props.image : null
    });
  };

  buildComponent = (data, index) => {
    return (
      <PopupQuestion
        key={data.props.id}
        type={data.props.type}
        id={this.props.syntheticId}
        index={index}
      />
    );
  };

  close = () => {
    this.props.validatePopup({ id: 1 });
    //this.props.showModal({ display: false });
  };

  render() {
    if (this.props.latestData.components[0].props === undefined) {
      return (
        <FocusLock>
          <div className="modal-section popupQuestionModal">
            <div className="modal-header">
              <img src={images["Warning"]} />
              <h2>Popup Question</h2>
            </div>
            <div className="modal-body">
              <div className="modal-inner">
                <div className="popup-modal-content" />
              </div>
            </div>
            <div className="modal-footer">
              <button
                aria-label="Submit answer."
                tabIndex={this.props.tab}
                className="modal-btn-primary"
                onClick={this.close}
              >
                Submit answer
              </button>
            </div>
          </div>
        </FocusLock>
      );
    } else {
      return (
        <FocusLock>
          <div className="modal-section popupQuestionModal">
            <div className="modal-header">
              <img src={images["Warning"]} />
              <h2>Popup Question</h2>
            </div>
            <div className="modal-body">
              <div className="modal-inner">
                <div className="popup-modal-content">
                  {/* {this.state.components} */}
                  {this.buildPopup()}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                aria-label="Submit answer."
                tabIndex={this.props.tab}
                className="modal-btn-primary"
                onClick={this.close}
              >
                Submit answer
              </button>
            </div>
          </div>
        </FocusLock>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let len = state.popup.popups.length;
  let temp = {
    components: [
      {
        component: "Popup",
        props: state.popup.popups[len - 1]
      }
    ]
  };
  return {
    id: ownProps.data.components[0].props.id,
    //data: ownProps.data,
    level: state.notebook.level,
    latestData: temp,
    syntheticId: len,
  };
};

export default connect(
  mapStateToProps,
  {
    showModal,
    createPopup,
    validatePopup
  }
)(PopupQuestionModal);
