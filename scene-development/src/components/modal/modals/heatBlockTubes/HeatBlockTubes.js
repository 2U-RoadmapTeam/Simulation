import React, { Component } from "react";
import { connect } from 'react-redux';
import FocusLock from 'react-focus-lock';
import { findIndex } from "lodash";
import { customScaledStart, end, customScaledDrag, getZeroTarget } from "../../../../lib/hotspot";

import {
  incHeatBlockTime,
  decHeatBlockTime,
  countDownHeatBlockTime,
  resetHeatBlockTime,
  incHeatBlockTemp,
  decHeatBlockTemp,
  toggleHeatBlockStart,
  setHeldObject,
  setSolutionHeld,
  setTargetList,
  addTubeToHeatBlock,
  removeTubeFromHeatBlock,
  setSolutionInScene,
  setSolutionOnRack
} from 'actions';

import "./HeatBlockTubes.scss";

import HeatBlock from './img/heatBlock.svg'
import DownButton from './img/downButton.svg'
import UpButton from './img/upButton.svg'
import DownButtonHover from './img/downButtonHover.svg'
import UpButtonHover from './img/upButtonHover.svg'
import StartButton from './img/startButton.svg'
import StartButtonHover from './img/startButtonHover.svg'

import TubeTopView from "./img/tube-top-view.svg";
import TubeSideView from "./img/tube-side-view.svg";
import TubeRackTop from "./img/tube-rack-top.svg";

const images = {
  heatBlock: HeatBlock,
  downButton: DownButton,
  upButton: UpButton,
  downButtonHover: DownButtonHover,
  upButtonHover: UpButtonHover,
  startButton: StartButton,
  startButtonHover: StartButtonHover,
  TubeRackTop: TubeRackTop,
}

class GelPosition extends Component {
    constructor(props) {
        super(props);

        this.state = {
          scale: 1,
          dragged: '',
          pressed: false,
          fired: false,
          buttons: {
            heatBlock: false,
            timeDownButton: false,
            timeUpButton: false,
            tempDownButton: false,
            tempUpButton: false,
            startButton: false,
          },
          targetList: []
        }
    }

    handleResize = () => {

      let refSize = this.image.getBoundingClientRect();

      let scale = Math.min(
        (refSize.width) / 134,
        (refSize.height) / 111
      );

      this.setState({
        scale: scale
      })

    }

    componentWillMount() {
      // var temp = document.getElementsByClassName("dropTarget");
      // this.props.setTargetList(temp);
    }

    componentDidMount() {
      this.setState({
        targetList: [
          document.getElementById("heatBlock"),
          document.getElementById("dropArea"),
        ]
      });

      // Resize the scene and attach the resize method to the window resize event
      window.addEventListener("resize", this.handleResize)
    }

    componentWillUnmount(){

      window.removeEventListener("resize", this.handleResize)

    }
    componentDidUpdate(prevProps, prevState) {

      // if(this.state.scale !== prevState.scale){
      //   this.handleResize()
      // }
      if(this.props.display !== prevProps.display){
        this.handleResize()
      }
      if(this.props.notebookExpanded !== prevProps.notebookExpanded){
        this.handleResize()
      }

    }

    incState = (e, comp) => {
      if(e.type == "mousedown" || e.type == "keydown" && !this.state.fired){
        this.setState({
          pressed: true,
          fired: true
        }, ()=>comp.call())
      }
      if (e.type == "mouseup" || e.type == "mouseout" || e.type == "keyup"){
        this.setState({
          pressed: false,
          fired: false
        }, ()=>comp.call())
      }
    }

    decState = (e, comp) => {
      if(e.type == "mousedown" || e.type == "keydown" && !this.state.fired){
        this.setState({
          pressed: true,
          fired: true
        }, ()=>comp.call())
      }
      if (e.type == "mouseup" || e.type == "mouseout" || e.type == "keyup"){
        this.setState({
          pressed: false,
          fired: false
        }, ()=>comp.call())
      }
    }

    incTime = () => {
      if(this.state.pressed){

        this.props.incHeatBlockTime({id: this.props.id})
        this.changeImage('timeUpButton')

        window.setTimeout(()=>this.incTime(), 100);
      }
    }
    incTimeRelease = () => {
      this.resetImage('timeUpButton')
    }
    decTime = () => {
      if(this.state.pressed){

        this.props.decHeatBlockTime({id: this.props.id})
        this.changeImage('timeDownButton')

        window.setTimeout(()=>this.decTime(), 100);
      }
    }
    decTimeRelease = () => {
      this.resetImage('timeDownButton')
    }
    incTemp = () => {
      if(this.state.pressed){

        this.props.incHeatBlockTemp({id: this.props.id})
        this.changeImage('tempUpButton')

        window.setTimeout(()=>this.incTemp(), 100);
      }
    }
    incTempRelease = () => {
      this.resetImage('tempUpButton')
    }
    decTemp = () => {

      if(this.state.pressed){

        this.props.decHeatBlockTemp({id: this.props.id})
        this.changeImage('tempDownButton')

        window.setTimeout(()=>this.decTemp(), 100);
      }
    }
    decTempRelease = () => {
      this.resetImage('tempDownButton')
    }

    startButtonDown = () => {
      this.props.toggleHeatBlockStart({active: true})
      this.changeImage('startButton')

      this.interval = setInterval(() => {

        this.props.countDownHeatBlockTime({id: this.props.id, interval: 15})

        // Run the solution heating logic here
        console.log(this.props.timer);

        if(this.props.timer === 0){
          clearInterval(this.interval);
        }
      }, 50);
    }
    startButtonRelease = () => {
      this.resetImage('startButton')
    }

    changeImage = (btn) => {
      this.setState({
        buttons: {
         [btn]: true
        }
      });
    }

    resetImage = (btn) => {
      this.setState({
        buttons: {
         [btn]: false
        }
      });
    }

    formatTime = () => {

      let t = this.props.timer

      let hours = Math.floor(t/3600)
      let mins = Math.floor(t/60)%60
      let secs = t%60

      if(hours<10){
        hours = "0"+hours
      }

      if(mins<10){
          mins = "0"+mins
      }
      if(secs<10){
          secs = "0"+secs
      }

      return hours + " : " + mins + " : " + secs
    }

    onDragStart = e => {

      let dragImage = document.getElementById('dragImage')

      if(dragImage == null){

        dragImage = document.createElement('img')
        dragImage.id = "dragImage"
        dragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        document.body.appendChild(dragImage);
      }

      e.dataTransfer.setDragImage(dragImage, 0, 0)
      e.dataTransfer.setData('text/html', null);

      var temp = document.getElementsByClassName("dropTarget");
      this.props.setTargetList(temp);

      console.log(e.target);

      if(e.target.id.includes("Solution")){

        let tempId = parseInt(e.target.id.split("_")[1]);

        console.log(tempId);

        this.props.setHeldObject({
          type: this.props.solutions[(tempId - 1)].type,
          id: this.props.solutions[(tempId - 1)].id,
          htmlObj: e.target
        });

        this.props.setSolutionHeld({
          id: this.props.solutions[(tempId - 1)].id,
          held: true
        });
      } else if (e.target.id.includes("HeatBlock")) {

        let tempId = parseInt(e.target.id.split("_")[1]);

        this.props.setHeldObject({
          type: this.props.heatBlockSolutions[tempId].type,
          id: this.props.heatBlockSolutions[tempId].id,
          htmlObj: e.target
        });

        this.props.setSolutionHeld({
          id: this.props.heatBlockSolutions[tempId].id,
          held: true
        });

      }
      console.log("Unscaled Start");

      this.setState({
        dragged: e.target
      });

      //alert(e.target.id)

      if(e.target.id.includes("HeatBlockSlot")){
        customScaledStart(e, e.target, this.state.scale);
      } else {
        customScaledStart(e, e.target, 1);
      }

    };

    onDragOver = e => {
      e.preventDefault();

      if(this.state.dragged.id.includes("HeatBlockSlot")){
        customScaledDrag(e, this.state.scale);
      } else {
        customScaledDrag(e, 1);
      }

    };

    onDrop = e => {

      e.preventDefault();

      this.setState({
        dragged: ''
      })
      console.log("DROPPED");
      console.log(this.props.heldObject);
      console.log(this.state.targetList);

      let target = getZeroTarget(this.props.heldObject.htmlObj, this.state.targetList);

      if(target !== ''){

        if (target.id.includes("heatBlock")){

          if(this.props.heldObject.htmlObj.id.includes("Solution")){

            this.props.setSolutionInScene({
              id: this.props.heldObject.id,
              inScene: false
            });

            this.props.setSolutionOnRack({
              id: this.props.heldObject.id,
              onRack: false
            })

            console.log(this.props.heldObject);

            this.props.addTubeToHeatBlock({
              id: this.props.heldObject.id,
              type: this.props.heldObject.type
            })

          }
          this.props.heldObject.htmlObj.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";

        } else if (target.id.includes("dropArea")) {

          this.props.setSolutionInScene({
            id: this.props.heldObject.id,
            inScene: true
          });

          this.props.setSolutionOnRack({
            id: this.props.heldObject.id,
            onRack: true
          })

          console.log(this.props.heldObject, this.props.heldObject.htmlObj.id.split("_")[1])

          let slotId = findIndex(this.props.heatBlockSolutions, {
            id:  this.props.heldObject.htmlObj.id.split("_")[1],
          });

          // Remove tube from heat block
          this.props.removeTubeFromHeatBlock({
            index: this.props.heldObject.htmlObj.id.split("_")[1]
          });

          this.props.heldObject.htmlObj.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";

        } else {
          this.props.heldObject.htmlObj.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";
        }

        console.log(target.id.includes("dropArea"))
      } else {
        this.props.heldObject.htmlObj.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";
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
            <div style={{width: '16.6665%', height: '100%', display: 'inline-block', position: 'relative'}}>
              <div tabIndex={0} id={"SolutionFuge_"+(i + 1)+"_"+this.props.solutions[i].type} draggable className="draggable"  style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px) rotateZ(0deg)', display: (this.props.solutions[i].onRack)?'initial':'none', cursor: 'pointer'}}>
                <img src={TubeTopView} style={{pointerEvents: 'none', width: '100%', height: '100%'}}/>
              </div>
            </div>
          ));
        }
      }
      return (
        <div className="TubeRackTop" style={{position: 'absolute', top: '49.5%', width: '88%', height: '22px', left: '10%', transform: 'translate(0, -50%)'}}>
          {html}
        </div>
      );
    }

    render() {
        return (
          <FocusLock>
            <div className="modal-section">
              <div className="modal-header">
                  <h2>{'Heat block'}</h2>
              </div>
              <div className="modal-body">
                <div>
                  <div
                    className="modal-inner-heat-block-tubes"
                    onDragStart={this.onDragStart}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                    onDragEnd={this.onDrop}>
                    <div className="side1 dropTarget" id="heatBlock">
                      <div style={{position: "absolute", left: "0", top: "0", width: "100%", height: "100%"}}>
                        <div style={{transform: "scale("+ this.state.scale +") translate(-50%, -50%)", width: "134px", height: "111px", transformOrigin: "0% 0%", position: "absolute", top: "50%", left: "50%"}}>
                          <div className="tubes-wrapper">
                            <div className="tubes">
                              {this.props.heatBlockSolutions.map((solution, index) => (
                                <div
                                  id={"dzone_" + (index+1)}
                                  style={{
                                    position: "relative",
                                    top: '20px',
                                    left: (index * 6.8) + '%',
                                    width: "12%",
                                    height: "100%",
                                    borderRadius: "18px",
                                    display: "inline-block"
                                  }}
                                >
                                  {solution.id !== null ? (
                                    <div
                                      tabIndex={0}
                                      className="solution-tube-container draggable"
                                      id={"HeatBlockSlot_" + index + "_" + solution.type}
                                      key={index}
                                      draggable
                                      style={{
                                        position: "absolute !important",
                                        display: !this.props.inScene ? "initial" : "none",
                                        transform:
                                          "translate3d(0px, 0px, 0px) rotateZ(0deg)",
                                        width: "100%",
                                        height: "100%"
                                      }}
                                    >
                                      <img
                                        src={TubeSideView}
                                        className="solution-tube-container__img"
                                        aria-label="Solution Tube"
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <img
                        ref={(image)=> {this.image = image}} onLoad={this.handleResize}
                        alt="Heat block"
                        style={{pointerEvents: "none", width: "100%", top: "50%", position: "absolute", zIndex: 0, maxHeight: "100%", transform: "translateY(-50%)"}}
                        src={images.heatBlock}/>
                      <div style={{pointerEvents: "none", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", zIndex: 1}}>
                        <div style={{pointerEvents: "none", transform: "scale("+ this.state.scale +") translate(-50%, -50%)", width: "134px", height: "111px", transformOrigin: "0% 0%", position: "absolute", top: "50%", left: "50%"}}>
                        <div className="heat-block-tubes" style={{pointerEvents: 'none'}}>
                            <div className="heat-block">
                              <div className="heat-block-values">
                                <div className="display-one">
                                  <h3>Temperature</h3>
                                  <p className="temp">{Math.round(this.props.temp * 10) / 10+" °C"}</p>
                                </div>
                                <div className="display-two">
                                  <h3>Time</h3>
                                  <p className="time">{this.formatTime()}</p>
                                  <p style={{fontSize: "4px", marginTop: "-4px"}}><span>HH</span> <span style={{marginLeft: "5px"}}>MM</span> <span style={{marginLeft: "5px"}}>SS</span></p>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="heat-block-controls" style={{pointerEvents: 'none'}}>
                          <div className="time-control" style={{pointerEvents: 'initial'}}>
                            <button
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.incTime)} }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.incTimeRelease)} }
                              onMouseDown={(e)=>{this.decState(e, this.incTime)}}
                              onMouseUp={(e)=>{this.decState(e, this.incTimeRelease)}}
                              onMouseOut={(e)=>{this.decState(e, this.incTimeRelease)}}>
                              <img
                                src={(this.state.buttons.timeUpButton)?images.upButtonHover:images.upButton}/>
                            </button>
                            <button
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decTime)} }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decTimeRelease)} }
                              onMouseDown={(e)=>{this.decState(e, this.decTime)}}
                              onMouseUp={(e)=>{this.decState(e, this.decTimeRelease)}}
                              onMouseOut={(e)=>{this.decState(e, this.decTimeRelease)}}>
                              <img
                                src={(this.state.buttons.timeDownButton)?images.downButtonHover:images.downButton}/>
                            </button>
                          </div>
                          <div className="temp-control" style={{pointerEvents: 'initial'}}>
                            <button
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.incTemp)} }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.incTempRelease)} }
                              onMouseDown={(e)=>{this.decState(e, this.incTemp)}}
                              onMouseUp={(e)=>{this.decState(e, this.incTempRelease)}}
                              onMouseOut={(e)=>{this.decState(e, this.incTempRelease)}}>
                              <img
                                src={(this.state.buttons.tempUpButton)?images.upButtonHover:images.upButton}/>
                            </button>
                            <button
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decTemp)} }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decTempRelease)} }
                              onMouseDown={(e)=>{this.decState(e, this.decTemp)}}
                              onMouseUp={(e)=>{this.decState(e, this.decTempRelease)}}
                              onMouseOut={(e)=>{this.decState(e, this.decTempRelease)}}>
                              <img
                                src={(this.state.buttons.tempDownButton)?images.downButtonHover:images.downButton}/>
                            </button>
                          </div>

                          <div className="start-control" style={{pointerEvents: 'initial'}}>
                            <button
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.startButtonDown() } }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.startButtonRelease() } }
                              onMouseDown={(e)=>{this.startButtonDown()}}
                              onMouseUp={(e)=>{this.startButtonRelease()}}
                              onMouseOut={(e)=>{this.startButtonRelease()}}>
                              <img
                                src={(this.state.buttons.startButton)?images.startButtonHover:images.startButton}/>
                            </button>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="side2">
                      <div id="dropArea" className="dropArea">

                        <img 
                          src={images["TubeRackTop"]}
                          className="tube-rack-top"
                          style={{  width: '90%',
                                    height: 'auto',
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translate(0, -50%)',
                                    pointerEvents: 'none',
                                    left: '10%'}} />

                        { this.renderSolutions() }

                      </div>

                      <div className="tube-stand-tooltip">
                        <div className="tooltip-arrow"></div>
                        <p>Tube rack with samples</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </FocusLock>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    timer: state.heatBlock.timer,
    active: state.heatBlock.active,
    temp: state.heatBlock.temp,
    heatBlockSolutions: state.heatBlock.solutions,
    solutions: state.solution.solutions,
    heldObject: state.scene.heldObject,
    display: state.modal.display,
    notebookExpanded: state.scene.notebookExpanded,
  }
}

export default connect(mapStateToProps,{
  incHeatBlockTime,
  decHeatBlockTime,
  countDownHeatBlockTime,
  resetHeatBlockTime,
  incHeatBlockTemp,
  decHeatBlockTemp,
  toggleHeatBlockStart,
  setHeldObject,
  setSolutionHeld,
  setTargetList,
  addTubeToHeatBlock,
  removeTubeFromHeatBlock,
  setSolutionInScene,
  setSolutionOnRack
})(GelPosition);
