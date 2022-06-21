import React, { Component } from "react";
import { connect } from "react-redux";
import { throttle } from "lodash";

import PipGraphics from "components/pipette/Graphics";
import PipControls from "components/pipette/Controls";

import {
  showModal,
  setGelLane,
  setVol,
  setTargetList,
  makeGelImgConfig,
  setLastDrop,
  setGelActiveLane
} from "actions";
import { getUnscaledTarget, getTransform } from "../../../../lib/hotspot";

import "./GelPipette.scss";

//import Gel from "./img/gel6.svg";
//import Solution from "./img/solution-left.svg";
import SolutionRight from "./img/solution-right.svg";
import Gel from "./img/gel.svg";
import Solution from "./img/solution.svg";

import GelBufferEmpty from "./img/gel-buffer-empty.svg";
import GelBuffer1 from "./img/gel-buffer-1.svg";
import GelBuffer2 from "./img/gel-buffer-2.svg";
import GelBuffer3 from "./img/gel-buffer-3.svg";
import GelBuffer12 from "./img/gel-buffer-12.svg";
import GelBuffer13 from "./img/gel-buffer-13.svg";
import GelBuffer23 from "./img/gel-buffer-23.svg";
import GelBuffer123 from "./img/gel-buffer-123.svg";
import GelContainer from "./img/gel-container.svg";
import GelBufferLiquid1 from "./img/gel-buffer-liquid-1.svg";
import GelBufferLiquid2 from "./img/gel-buffer-liquid-2.svg";
import GlassCover from "./img/glass-cover.svg";
import LaneArrow from "./img/laneArrow.svg";
import HeightArrow from "./img/heightArrow.svg";



const images = {
  Gel: Gel,
  Solution: Solution,
  GelContainer: GelContainer,
  GelBufferLiquid1: GelBufferLiquid1,
  GelBufferLiquid2: GelBufferLiquid2,
  GlassCover: GlassCover,
  GelBufferEmpty: GelBufferEmpty,
  GelBuffer1: GelBuffer1,
  GelBuffer2: GelBuffer2,
  GelBuffer3: GelBuffer3,
  GelBuffer12: GelBuffer12,
  GelBuffer13: GelBuffer13,
  GelBuffer23: GelBuffer23,
  GelBuffer123: GelBuffer123,
  LaneArrow: LaneArrow,
  HeightArrow: HeightArrow
};

class GelPipette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 60,
      volume: 5,
      view: 1,
      lane: 0,
      well: 0,
      lastX: 0,
      lastY: 60,
      offsetY: 60,
      dispatched: false
    };
  }

  onDragStart = e => {

    let dragImage = document.getElementById('dragImage')

    if(dragImage === null){

      dragImage = document.createElement('img')
      dragImage.id = "dragImage"
      dragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
      document.body.appendChild(dragImage);
    }

    var testVar = window.DataTransfer || window.Clipboard;  // Clipboard is for Chrome
    if("setDragImage" in testVar.prototype) {
        e.dataTransfer.setDragImage(dragImage, 0, 0)
    }
    if("setData" in testVar.prototype){
        e.dataTransfer.setData('text/plain', '');
    }

    if(this.state.view === 1 && this.state.well){

    }

    this.setState({
      lastX: e.clientX,
      lastY: e.clientY,
    })
  };

  // xLims = e => {
  //   let x0, x1;
  //   x0 = e.clientX - e.target.getBoundingClientRect().left;

  //   if (x0 > e.target.getBoundingClientRect().right - 20) {
  //     x1 = e.target.getBoundingClientRect().right - 20;
  //   } else if (x0 < e.target.getBoundingClientRect().left + 20) {
  //     x1 = e.target.getBoundingClientRect().left - 20;
  //   } else {
  //     x1 = x0;
  //   }
  //   return x1;
  // };

  // yLims = e => {
  //   let y0, y1;
  // };

  drag = throttle((target, clientX, clientY) => {

    if (target) {

      let transform = getTransform(document.getElementById("gel-pipette"))

      let iYPos = parseFloat(transform.translateY)
      let iXPos = parseFloat(transform.translateX)

      if (this.state.view === 1) {

        let newX = clientX + iXPos - this.state.lastX
        let newY = -(newX * 0.7) + (this.state.offsetY)

        this.setState({
          x: newX,
          y: newY,
          lastX: clientX,
          lastY: clientY
        });

      } else {

        let newY = clientY + iYPos - this.state.lastY

        this.setState({
          y: newY,
          lastY: clientY,
          offsetY: (this.state.offsetY + (clientY - this.state.lastY))
        });

      }
    }
  }, 20);

  onDragOver = e => {
    e.preventDefault();
    this.drag(e.target, e.clientX, e.clientY);
  };

  onDragEnd = e => {
    e.preventDefault();
    this.getPipettePos()
  };

  //Call when pipette dropped into final position
  setTargetData = (laneFocused, wellFocused) => {
    this.props.setLastDrop({
      lastHeld: {
        type: "Pipette",
        id: this.props.pipetteId
      },
      lastTarget: {
        type: "Gel",
        id: this.props.gelId,
        lane: laneFocused,
        well: wellFocused,
      }
    });
  };

  saveProgress = () => {
    console.log("saved progress");
    this.props.showModal({
      display: false
    });
    this.setState({
      view: 1
    });
  };

  btn1Style = () => {
    if (this.state.view === 1) {
      return {
        backgroundColor: "#003e6b",
        color: "#e5ecf0",
        borderRadius: "12px 0px 0px 12px"
      };
    } else {
      return {
        backgroundColor: "#e5ecf0",
        color: "#003e6b",
        borderRadius: "12px 0px 0px 12px"
      };
    }
  };

  btn2Style = () => {
    if (this.state.view === 2) {
      return {
        backgroundColor: "#003e6b",
        color: "#e5ecf0",
        borderRadius: "0px 12px 12px 0px"
      };
    } else {
      return {
        backgroundColor: "#e5ecf0",
        color: "#003e6b",
        borderRadius: "0px 12px 12px 0px"
      };
    }
  };

  getPipettePos = () => {
    //looking for P2-pipette
    const pipObj = document.getElementById("gel-pipette");
    //Detect pipette collision with gel divs
    const targList = document.getElementsByClassName("gelTarget");
    console.log("Target List:");
    console.log(targList);
    console.log("Pipette used:");
    console.log(pipObj);

    const res = getUnscaledTarget(pipObj, targList);
    console.log("Collision Result:")
    console.log(res);
    if (res !== "") {
      if(this.state.view === 1){
        const laneVal = parseInt(res.id.slice(-1));

        this.setState({
          lane: laneVal
        });
        this.setTargetData(laneVal, this.state.well);
        console.log("Found lane!");
      } else {
        console.log(res.id);
        let wellVal = parseInt(res.id.slice(-1));
        wellVal = ((-wellVal)+7)
        this.setState({
          well: (-wellVal)+7
        });
        this.setTargetData(this.state.lane, wellVal);
        console.log("Found well!");
      }

    } else {
      console.log("No target found");
      this.setTargetData(0, 0);
      if(this.state.view === 1){
        this.setState({
          lane: 0
        });
      } else {
        this.setState({
          well: 0
        });
      }
    }
  };

  toggleView = n => {
    if (n === 1) {
      //render view 1
      this.setState({
        view: 1
      });
    } else {
      //Try get pipette-gel collision
      this.getPipettePos();

      //render view 2
      this.setState({
        view: 2
      });
    }
  };

  renderFocusedStage = () => {
    if (this.state.view === 1) {
      return this.renderStage1();
    } else {
      return this.renderStage2();
    }
  };

  renderFooterBtns = () => {
    if (this.state.view === 1) {
      return (
        <div>
          <button
            aria-label=""
            tabIndex={this.props.tab}
            className="modal-btn-primary"
            onClick={() => this.toggleView(2)}>
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            aria-label=""
            tabIndex={this.props.tab}
            className="modal-btn-secondary"
            onClick={() => this.toggleView(1)}>
            Back
          </button>
          <button
            aria-label=""
            tabIndex={this.props.tab}
            className="modal-btn-primary"
            onClick={this.saveProgress}>
            Done
          </button>
        </div>
      );
    }
  };

  getPipettePosStyle = () => {
    if (this.state.view === 1) {
      return {
        transform:
          "translate3d(" +
          this.state.x +
          "px, " +
          this.state.y +
          "px, 0px) rotateZ(0deg)",
        pointerEvents: "none",
        zIndex: 10
      };
    } else {
      if (this.state.lane === 1) {
        return {
          height: "500px",
          zIndex: 10
        };
      } else if (this.state.lane === 2) {
        return {
          height: "500px",
          zIndex: 10
        };
      } else if (this.state.lane === 3) {
        return {
          height: "500px",
          zIndex: 10
        };
      }
    }
  };

  setLaneActive = (laneVal) => {

    let frameWidth = document.getElementsByClassName('img-container')[0].getElementsByTagName('div')[0].offsetWidth
    let frameLeft = (document.getElementsByClassName('gel-modal-content')[0].getBoundingClientRect().left - document.getElementsByClassName('img-container')[0].getElementsByTagName('div')[0].getBoundingClientRect().left)

    //let offsets = [0.27, 0.35, 0.43, 0.50, 0.59, 0.67]
    let offsets = [0.21, 0.33, 0.45, 0.57, 0.69]

    console.log(frameWidth, frameLeft);

    this.setState({
      x: ((frameWidth) * offsets[laneVal - 1]),
      //y: 60
      y: 60
    });

    this.setTargetData(laneVal, this.state.well);

    this.props.setGelActiveLane({
      id: this.props.gelId,
      activeLane: laneVal
    });
  }

  pipetteDown = (type) => {

    let frameHeight = document.getElementsByClassName('img-container')[0].getElementsByTagName('div')[0].offsetHeight

    //if(this.state.y < (0.20 * frameHeight)){
    if(this.state.y < (0.25 * frameHeight)){

      this.setState({
        y: (this.state.y + 10)
      }, function(){
        this.animatePipetteDown(type)
      });

    } else {

      if(this.props.plungerPosition === 'At Rest'){

        this.props.setGelActiveLane({
          id: this.props.gelId,
          activeLane: this.props.activeLane
        });

        this.setTargetData(this.props.activeLane, this.props.activeLane);

        var plunger = document.getElementsByClassName('gel-pipette')[0].getElementsByClassName('plunger-indicator')[0];

        if(this.state.dispatched === false){

          this.setState({
            dispatched: true
          }, function(){
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent("mousedown", true, true);
            plunger.dispatchEvent(clickEvent);
          })
        }
      }
    }
  }
  pipetteUp = (type) => {

    //if(this.state.y > 60){
    if(this.state.y > 100){
      this.setState({
        y: (this.state.y - 10)
      }, function(){
        this.animatePipetteUp(type)
      });
    } else {

      if(this.props.plungerPosition !== 'At Rest'){

        var plunger = document.getElementsByClassName('gel-pipette')[0].getElementsByClassName('plunger-indicator')[0];

        if(this.state.dispatched === true){

          this.setState({
            dispatched: false
          }, function(){
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent("mouseup", true, true);
            plunger.dispatchEvent(clickEvent);
          })
        }
      }
    }
  }

  animatePipetteDown = (type) => {

    console.log("animate pipette in gel");
    window.clearTimeout(this.PipetteUp);
    this.PipetteDown = window.setTimeout(this.pipetteDown, 10, type);

  }

  animatePipetteUp = (type) => {

    console.log("animate pipette in gel");
    window.clearTimeout(this.PipetteDown);
    this.PipetteUp = window.setTimeout(this.pipetteUp, 10, type);

  }

  buildGelImgStack = () => {
    console.log('img render');
    // 1. container - 1 only
    // 2. buffer - 1 or 0
    // 3. gel config - options solved
    // 4. pipette - options passed through pipId
    // 5. glass cover - static

    let targDivs;
    if (this.state.view === 1) {
      targDivs = (
        <div style={{zIndex: 99}}>
          <div className={"gelTarget side1" + ((this.props.activeLane == 1)?" active":"")} id="gelTarget1" onClick={(e)=>{this.setLaneActive('1')}} />
          <div className={"gelTarget side1" + ((this.props.activeLane == 2)?" active":"")} id="gelTarget2" onClick={(e)=>{this.setLaneActive('2')}} />
          <div className={"gelTarget side1" + ((this.props.activeLane == 3)?" active":"")} id="gelTarget3" onClick={(e)=>{this.setLaneActive('3')}} />
          <div className={"gelTarget side1" + ((this.props.activeLane == 4)?" active":"")} id="gelTarget4" onClick={(e)=>{this.setLaneActive('4')}} />
          <div className={"gelTarget side1" + ((this.props.activeLane == 5)?" active":"")} id="gelTarget5" onClick={(e)=>{this.setLaneActive('5')}} />
        </div>
      );
    } else {
      targDivs = (
        <div style={{pointerEvents: 'none'}}>

          <div className="gelTarget side2" id="gelTarget7" />
          <div className="gelTarget side2" id="gelTarget8" />
          <div className="gelTarget side2" id="gelTarget9" />
          <div className="gelTarget side2" id="gelTarget10" />
        </div>
      );
    }

    return (
      <div className="img-container">
        <img src={images.Gel} className="gel"/>
        <div className="solution-overlay">
        {
          Object.keys(this.props.lanes).map((key, index) => {
            if(this.props.lanes[key].volume > 0){
              return (<div className={"solution"+(index + 1)}><img src={images.Solution} /></div>)
            } else {
              return (<div className={"solution"+(index + 1)}></div>);
            }
          })
        }
        </div>
        {targDivs}
      </div>
    );
  };

  render() {
    return (
        <div className="modal-section gel-pipette">
          <div className="modal-header">
            <h2>{"Dispense Solution"}</h2>
          </div>
          <div className="modal-view-toggle">
            <button
              className="modal-view-btn"
              style={this.btn1Style()}
              onClick={() => this.toggleView(1)}>
              1. Select a well
            </button>
            <button
              className="modal-view-btn"
              style={this.btn2Style()}
              onClick={() => this.toggleView(2)}>
              2. Expel liquid
            </button>
          </div>
          <div className="modal-body">{this.renderFocusedStage()}</div>
          <div className="modal-footer">{this.renderFooterBtns()}</div>
        </div>
    );
  }

  renderStage1 = () => {
    //Stage 1 - Select a well

    return (
      <div className="modal-inner">
        <div
          className="gel-modal-content side1">
          {/* <div
            className={this.props.type}
            id="gel-pipette"
            style={{
              transform:
                "translate3d(" +
                this.state.x +
                "px, " +
                this.state.y +
                "px, 0px) rotateZ(0deg)",
              pointerEvents: "none",
              zIndex: 10,
              position: "absolute"
            }}>
            <PipGraphics
              id={this.props.pipetteId}
              stateVolume={this.state.volume}
              style={{
                height: "500px",
                zIndex: 10
              }}
            />
          </div> */}

          <div
            className="gel-modal-controls"
            style={{
              pointerEvents: "none",
              zIndex: 20,
              position: "absolute",
              left: 0,
              top: 0
            }}>
            <PipControls id={this.props.pipetteId} />
          </div>

          {this.buildGelImgStack(this.state.lane)}
        </div>
      </div>
    );
  };

  renderStage2 = () => {
    // Stage 2 - Expel liquid
    // Pipette must be positioned over correct slot

    return (
      <div className="modal-inner">
        <div
          className="gel-modal-content side2"
          >
           <div className="gel-pipette-wrapper">
             <div
              className={this.props.type}
              id="gel-pipette"
              style={{
                transform:
                  "translate3d(" +
                  this.state.x +
                  "px, " +
                  this.state.y +
                  "px, 0px) rotateZ(0deg)",
                pointerEvents: "none",
                zIndex: 10,
                position: "absolute"
              }}>
              <div style={{transform: "rotate(20deg)"}}>
                <PipGraphics
                  id={this.props.pipetteId}
                  stateVolume={this.state.volume}
                  style={{
                    height: "500px",
                    zIndex: 10
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className={this.props.type + " pipette-controls"}
            onMouseDown={(e)=>{this.animatePipetteDown(e.type)}}
            onMouseUp={(e)=>{this.animatePipetteUp(e.type)}}
            onMouseOut={(e)=>{this.animatePipetteUp(e.type)}}
            style={{
              zIndex: 20,
              position: "absolute",
              left: "40px",
              top: "40px",
              width: "100px",
              height: "100px",
              cursor: "pointer"
            }}>
            <PipControls style={{pointerEvents: 'none'}} id={this.props.pipetteId}/>
          </div>
          {this.buildGelImgStack()}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    pipetteId: ownProps.pipetteId,
    gelId: ownProps.gelId,
    type: state.pipette.pipettes[ownProps.pipetteId - 1].type,
    volume: state.pipette.pipettes[ownProps.pipetteId - 1].volume,
    minVol: state.pipette.pipettes[ownProps.pipetteId - 1].minVol,
    maxVol: state.pipette.pipettes[ownProps.pipetteId - 1].maxVol,
    volChange: state.pipette.pipettes[ownProps.pipetteId - 1].volChange,
    lanes: state.gel.gels[ownProps.gelId - 1].lanes,
    activeLane: state.gel.gels[ownProps.gelId - 1].activeLane,
    containsBuffer: state.gelBox.gelBoxes[ownProps.gelBoxId - 1].containsBuffer,
    imgConfig: state.gel.gels[ownProps.gelId - 1].laneImgConfig,
    plungerPosition:
      state.pipette.pipettes[ownProps.pipetteId - 1].plungerPosition,
  };
};

export default connect(
  mapStateToProps,
  {
    showModal,
    setGelLane,
    setVol,
    setTargetList,
    makeGelImgConfig,
    setLastDrop,
    setGelActiveLane
  }
)(GelPipette);
