import React, { Component } from "react";
import { connect } from "react-redux";
import { unscaledStart, end, unscaledDrag, getTarget } from "../../../../lib/hotspot";
import { findIndex } from "lodash";
import Toast from "../../../toast/Toast";
import { toast } from "react-toastify";
import { css } from "glamor";
import "react-toastify/dist/ReactToastify.css";
import colors from "styles/_colors.scss";

import {
  setHeldObject,
  setSolutionHeld,
  setTargetList,
  setSolution,
  setSolutionInScene,
  setSolutionTubesInCentrifuge,
  setSolutionOnRack,
  moveTubeInCentrifuge,
  addTubeToCentrifuge,
  centrifugeBalanced
} from "actions";

import MicrocentrifugeEmpty from "./images/centrifuge-top-empty.svg";
import TubeTopView from "./images/tube-top-view.svg";
import TubeRackTop from "./images/tube-rack-top-view.svg";


import "./MicroCentrifugeBalancer.scss";

const images = {
  "Microcentrifuge Empty": MicrocentrifugeEmpty,
  "Microcentrifuge Balanced": TubeTopView,
  TubeRackTop: TubeRackTop
};

const d_zones = [
  { position: { top: 1 + "px", left: 61 + "px" } },
  { position: { top: 9 + "px", left: 92 + "px" } },
  { position: { top: 29 + "px", left: 113 + "px" } },
  { position: { top: 60 + "px", left: 123 + "px" } },
  { position: { top: 89 + "px", left: 113 + "px" } },
  { position: { top: 111 + "px", left: 92 + "px" } },
  { position: { top: 120 + "px", left: 61 + "px" } },
  { position: { top: 111 + "px", left: 33 + "px" } },
  { position: { top: 89 + "px", left: 9 + "px" } },
  { position: { top: 60 + "px", left: 1 + "px" } },
  { position: { top: 30 + "px", left: 11 + "px" } },
  { position: { top: 9 + "px", left: 33 + "px" } }
];

const validCounts = [2, 3, 4, 6, 8, 9, 10, 12];

class MicroCentrifugeBalancer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      open: false,
      volume: 0,
      dragdropStyle: {},
      targetList: [],
      components: []
    };
  }

  componentWillMount() {
    var dropTargets = document.getElementsByClassName("dropTarget");
    this.props.setTargetList(dropTargets);
  }

  makeToast = (type, msg, title) => {
    let color = "";
    if (type === "HINT") {
      color = colors.yellow1;
    } else {
      color = colors.red1;
    }

    toast(<Toast type={type} msg={msg} title={title} />, {
      className: css({
        border: "2px solid " + color,
        borderRadius: "6px",
        marginLeft: "-200px",
        minWidth: "400px"
      }),
      progressClassName: css({
        background: color
      }),
      position: "top-center",
      autoClose: 5000
    });
  };

  checkSymmetry = () => {
    //Checks 2 and 3 symmetry of the centrifuge circle
    //Should be balanced if symmetrical
    //Implicitly balanced: 12
    //2-Symmetry: 2, 4, 6, 8, 10
    //3-Symmetry: 3, 6, 9

    let tubeCnt = 0;
    this.props.slots.forEach(slot => {
      if (slot.id !== null) {
        tubeCnt++;
      }
    });

    //Create 1/0 array reflecting centrifuge
    let centriArr = this.props.slots.map(val => {
      return val.id === null ? 0 : 1;
    });

    if (tubeCnt === 12) {
      //Implicitly balanced
      this.props.centrifugeBalanced({
        balanced: true
      });
      return true;
    } else if ([2, 4, 6, 8, 10].includes(tubeCnt)) {
      //2-Symmetry: 2, 4, 6, 8, 10
      const half1 = centriArr.slice(0, 6);
      const half2 = centriArr.slice(6);

      if (JSON.stringify(half1) == JSON.stringify(half2)) {
        this.props.centrifugeBalanced({
          balanced: true
        });
        this.makeToast(
          "HINT",
          "Centrifuge looks balanced and ready.",
          "Centrifuge is balanced!"
        );
        return true
      } else {
        this.props.centrifugeBalanced({
          balanced: false
        });
      }
    }

    if ([3, 6, 9].includes(tubeCnt)) {
      //3-Symmetry: 3, 6, 9
      const third1 = centriArr.slice(0, 4);
      const third2 = centriArr.slice(4, 8);
      const third3 = centriArr.slice(8);

      if (JSON.stringify(third1) == JSON.stringify(third2)
      && JSON.stringify(third1) == JSON.stringify(third3)
      && JSON.stringify(third2) == JSON.stringify(third3)) {
        this.props.centrifugeBalanced({
          balanced: true
        });
        this.makeToast(
          "HINT",
          "Centrifuge looks balanced and ready.",
          "Centrifuge is balanced!"
        );
        return true
      } else {
        this.props.centrifugeBalanced({
          balanced: false
        });
      }

      //if balanced
      //return true
    } else if (!validCounts.includes(tubeCnt)) {
      console.log("NOT VALID TUBECNT");
      this.makeToast(
        "WARNING",
        "Please add tubes to be able to balance the centrifuge.",
        "Wrong amount of tubes!"
      );
      this.props.centrifugeBalanced({
        balanced: false
      });
    }

    if ([2, 3, 4, 6, 8, 9, 10].includes(tubeCnt)) {
      //Not balanced because would have stopped above if balanced
      //Valid count, not balanced - show warning
      this.makeToast(
        "WARNING",
        "Distribute tubes evenly to balance the centrifuge.",
        "Centrifuge is not balanced!"
      );
      this.props.centrifugeBalanced({
        balanced: false
      });
    }
  };

  getImage = () => {
    var ref = "Microcentrifuge ";
    if (this.state.open === false) {
      ref += "Empty";
    } else {
      ref += "Balanced";
    }

    return images[ref];
  };

  saveOrder = e => {
    //this.checkSpacing();
    this.checkSymmetry();
  };

  onDragStart = e => {
    let dragImage = document.getElementById("dragImage");

    if (dragImage == null) {
      dragImage = document.createElement("img");
      dragImage.id = "dragImage";
      dragImage.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
      document.body.appendChild(dragImage);
    }

    var testVar = window.DataTransfer || window.Clipboard; // Clipboard is for Chrome
    if ("setDragImage" in testVar.prototype) {
      e.dataTransfer.setDragImage(dragImage, 0, 0);
    }
    if("setData" in testVar.prototype){
        e.dataTransfer.setData('text/plain', '');
    }

    var temp = document.getElementsByClassName("dropTarget");
    this.props.setTargetList(temp);

    if (e.target.id.includes("Solution")) {
      let tempId = parseInt(e.target.id.split("_")[1]);

      this.props.setHeldObject({
        type: "Solution",
        id: tempId,
        htmlObj: e.target
      });

      this.props.setSolutionHeld({
        id: tempId,
        held: true
      });
    } else if (e.target.id.includes("Centrifuge")) {
      let tempId = parseInt(e.target.id.split("_")[1]);

      this.props.setHeldObject({
        type: "Solution",
        id: this.props.slots[tempId].id,
        htmlObj: e.target
      });

      this.props.setSolutionHeld({
        id: this.props.slots[tempId].id,
        held: true
      });
    }
    console.log("Unscaled Start");
    unscaledStart(e, e.target);
  };

  onDragOver = e => {
    e.preventDefault();
    unscaledDrag(e);
  };

  onDrop = e => {
    e.preventDefault();

    let target = getTarget(
      this.props.heldObject.htmlObj,
      this.state.targetList
    );

    if (target !== "") {
      if (target.id.includes("dzone")) {
        //Get id of target
        let targetId = parseInt(target.id.split("_")[1]);
        //Move tube to target slot in Redux

        if (this.props.heldObject.htmlObj.id.includes("Solution")) {

          if(this.props.slots[targetId - 1].type === null){
            this.props.setSolutionInScene({
              id: this.props.heldObject.id,
              inScene: false
            });

            this.props.setSolutionOnRack({
              id: this.props.heldObject.id,
              onRack: false
            });

            // this.props.addTubeToCentrifuge({
            //   id: this.props.id,
            //   type: this.props.heldObject.htmlObj.id.split('_')[2]
            // })

            this.props.setSolutionTubesInCentrifuge({
              id: this.props.id,
              slotIndex: targetId - 1,
              slot: {
                id: parseInt(this.props.heldObject.htmlObj.id.split("_")[1]),
                type: this.props.heldObject.htmlObj.id.split("_")[2]
              }
            });

            this.props.heldObject.htmlObj.style.transform =
              "translate3d(0px, 0px, 0px) rotateZ(0deg)";
          } else {
            this.makeToast(
              "WARNING",
              "There is already a solution in this centrifuge slot.",
              "Centrifuge slot filled!"
            );

            this.props.heldObject.htmlObj.style.transform =
              "translate3d(0px, 0px, 0px) rotateZ(0deg)";
          }

        } else {
          this.props.moveTubeInCentrifuge({
            currentId:
              findIndex(this.props.slots, {
                type: this.props.heldObject.htmlObj.id.split("_")[2]
              }) + 1,
            targetId: targetId
          });
        }
      } else if (target.id.includes("dropArea")) {

        this.props.setSolutionInScene({
          id: this.props.heldObject.id,
          inScene: true
        });

        this.props.setSolutionOnRack({
          id: this.props.heldObject.id,
          onRack: true
        });

        console.log(
          this.props.heldObject,
          this.props.heldObject.htmlObj.id.split("_")[1]
        );

        this.props.setSolutionTubesInCentrifuge({
          id: this.props.id,
          slotIndex: this.props.heldObject.htmlObj.id.split("_")[1],
          slot: {
            id: null,
            type: null
          }
        });

        this.props.heldObject.htmlObj.style.transform =
          "translate3d(0px, 0px, 0px) rotateZ(0deg)";
      } else {
        this.props.heldObject.htmlObj.style.transform =
          "translate3d(0px, 0px, 0px) rotateZ(0deg)";
      }

      console.log(target.id.includes("dropArea"));
    } else {
      this.props.heldObject.htmlObj.style.transform =
        "translate3d(0px, 0px, 0px) rotateZ(0deg)";
    }

    end(e);

    this.props.setSolutionHeld({
      id: this.props.heldObject.id,
      held: false
    });
  };

  renderSolutions = () => {
    let html = [];

    for(var i = 0; i < this.props.solutions.length; i++){
      if(this.props.solutions[i].shape === "tube"){
        html.push((
          <div style={{width: '16.665%', height: '70%', display: 'inline-block', marginLeft: '0', marginRight: '0', position: 'relative'}}>
            <div tabIndex={0} id={"SolutionFuge_"+(i + 1)+"_"+this.props.solutions[i].type} draggable className="draggable"  style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px) rotateZ(0deg)', display: (this.props.solutions[i].onRack)?'initial':'none'}}>
              <img alt={this.props.solutions[i].type + " soution tube."} src={TubeTopView} style={{pointerEvents: 'none', width: '100%', height: '100%'}}/>
            </div>
          </div>
        ));
      }
    }

    console.log("html: ", html);

    return (
      <div
        className="TubeRackTop"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%"
        }}
      >
        {html}
      </div>
    );
  };

  componentDidMount() {
    this.setState({
      targetList: [
        document.getElementById("dzone_1"),
        document.getElementById("dzone_2"),
        document.getElementById("dzone_3"),
        document.getElementById("dzone_4"),
        document.getElementById("dzone_5"),
        document.getElementById("dzone_6"),
        document.getElementById("dzone_7"),
        document.getElementById("dzone_8"),
        document.getElementById("dzone_9"),
        document.getElementById("dzone_10"),
        document.getElementById("dzone_11"),
        document.getElementById("dzone_12"),
        document.getElementById("dropArea")
      ]
    });
  }

  componentWillUpdate() {}

  render() {
    return (
      <div style={{height: "100%"}}>
        <div className="modal-section">
          <div className="modal-header">
            <h2 tabIndex={0}> balance the microcentrifuge </h2>
          </div>

          <div className="modal-body">
            <div
              id="centrifuge-modal"
              className="modal-inner"
              onDragStart={this.onDragStart}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              onDragEnd={this.onDrop}
            >
              <div className="microcentrifuge-modal-content">
                <div
                  className="microcentrifuge-modal-content__centrifuge-top-view"
                  style={{ position: "relative" }}
                >
                  <div id="dropArea" className="dropArea">
                    <p>Drop the tubes into the rack to remove them from the centrifuge</p>
                    <div style={{position: "relative"}}>
                      <img alt="Tube rack top." src={images["TubeRackTop"]} className="tube-rack-top" style={{width: '100%', height: 'auto'}}/>
                      {this.renderSolutions()}
                    </div>
                  </div>
                  <div className="microcentrifuge-modal-content__centrifuge-top-view--content-overlay">
                    {this.props.slots.map((solution, index) => (
                      <div
                        id={"dzone_" + (index + 1)}
                        style={{
                          position: "absolute",
                          zIndex: "999",
                          top: d_zones[index].position.top,
                          left: d_zones[index].position.left,
                          width: "26px",
                          height: "26px",
                          borderRadius: "18px"
                        }}
                      >
                        {solution.id !== null ? (
                          <div
                            tabIndex={0}
                            className="solution-tube-container draggable"
                            id={"CentrifugeSlot_" + index + "_" + solution.type}
                            key={index}
                            draggable
                            style={{
                              position: "absolute !important",
                              zIndex: "1000",
                              display: !this.props.inScene ? "initial" : "none",
                              transform:
                                "translate3d(0px, 0px, 0px) rotateZ(0deg)"
                            }}
                          >
                            <img
                              width="25"
                              alt={solution.type + " solution."}
                              src={TubeTopView}
                              className="solution-tube-container__img"
                              aria-label="Solution Tube"
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <img
                    width="250"
                    className="centrifuge-img"
                    src={this.getImage()}
                    aria-label="Microcentrifuge"
                    alt="Microcentrifuge"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              aria-label="Save the order of the Microcentrifuge balancer"
              tabIndex={this.props.tab}
              className="modal-btn-primary"
              onClick={this.saveOrder}
            >
              Check balancing
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    type: state.centrifuge.type,
    heldObject: state.scene.heldObject,
    slots: state.centrifuge.slots,
    solutions: state.solution.solutions
  };
};

export default connect(
  mapStateToProps,
  {
    setHeldObject,
    setSolutionHeld,
    setTargetList,
    setSolution,
    setSolutionInScene,
    setSolutionOnRack,
    setSolutionTubesInCentrifuge,
    moveTubeInCentrifuge,
    addTubeToCentrifuge,
    centrifugeBalanced
  }
)(MicroCentrifugeBalancer);
