import React, { Component } from "react";
import { connect } from 'react-redux';
import FocusLock from 'react-focus-lock';

import {
  incHeatBlockTime,
  decHeatBlockTime,
  countDownHeatBlockTime,
  resetHeatBlockTime,
  incHeatBlockTemp,
  decHeatBlockTemp,
  toggleHeatBlockStart
} from 'actions';

import "./HeatBlockControls.scss";

import HeatBlock from './img/heatBlock.svg'
import DownButton from './img/downButton.svg'
import DownButtonHover from './img/downButtonHover.svg'
import UpButton from './img/upButton.svg'
import UpButtonHover from './img/upButtonHover.svg'
import StartButton from './img/startButton.svg'
import StartButtonHover from './img/startButtonHover.svg'

const images = {
  heatBlock: HeatBlock,
  downButton: DownButton,
  downButtonHover: DownButtonHover,
  upButton: UpButton,
  upButtonHover: UpButtonHover,
  startButton: StartButton,
  startButtonHover: StartButtonHover,
}

class GelPosition extends Component {
    constructor(props) {
        super(props);

        this.state = {
          buttons: {
            heatBlock: false,
            timeDownButton: false,
            timeUpButton: false,
            tempDownButton: false,
            tempUpButton: false,
            startButton: false,
          }
        }
    }

    incTime = () => {
      this.props.incHeatBlockTime({id: this.props.id})
      this.changeImage('timeUpButton')
    }
    incTimeRelease = () => {
      this.resetImage('timeUpButton')
    }
    decTime = () => {
      this.props.decHeatBlockTime({id: this.props.id})
      this.changeImage('timeDownButton')
    }
    decTimeRelease = () => {
      this.resetImage('timeDownButton')
    }
    incTemp = () => {
      this.props.incHeatBlockTemp({id: this.props.id})
      this.changeImage('tempUpButton')
    }
    incTempRelease = () => {
      this.resetImage('tempUpButton')
    }
    decTemp = () => {
      this.props.decHeatBlockTemp({id: this.props.id})
      this.changeImage('tempDownButton')
    }
    decTempRelease = () => {
      this.resetImage('tempDownButton')
    }

    startButtonDown = () => {
      this.props.toggleHeatBlockStart({active: true})
      this.changeImage('startButton')

      this.interval = setInterval(() => {

        this.props.countDownHeatBlockTime({id: this.props.id, interval: 1})

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
      let mins = Math.floor(this.props.timer/60)
      let secs = this.props.timer%60

      if(mins<10){
          mins = "0"+mins
      }
      if(secs<10){
          secs = "0"+secs
      }

      return mins + " : " + secs
    }

    render() {
        return (
          <FocusLock>
            <div className="modal-section">
              <div className="modal-header">
                  <h2>{'Adjust heat block controls'}</h2>
              </div>
              <div className="modal-body">
                <div className="modal-inner">
                  <div className="heat-block-content">
                      <div className="heat-block">
                        <img
                          src={images.heatBlock}/>
                      </div>
                      <div className="heat-block-values">
                        <div className="display-one">
                          <h3>Temperature</h3>
                          <p className="temp">{Math.round(this.props.temp * 10) / 10+" °C"}</p>
                        </div>
                        <div className="display-two">
                          <h3>Time</h3>
                          <p className="time">{this.formatTime()}</p>
                        </div>
                      </div>
                  </div>
                  <div className="heat-block-controls">
                    <div className="time-control">
                      <button
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incTime()} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incTimeRelease()} }
                        onMouseDown={this.incTime}
                        onMouseUp={this.incTimeRelease}
                        onMouseOut={this.incTimeRelease}>
                        <img
                          src={(this.state.buttons.timeUpButton)?images.upButtonHover:images.upButton}/>
                      </button>
                      <button
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decTime()} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decTimeRelease()} }
                        onMouseDown={this.decTime}
                        onMouseUp={this.decTimeRelease}
                        onMouseOut={this.decTimeRelease}>
                        <img
                          src={(this.state.buttons.timeDownButton)?images.downButtonHover:images.downButton}/>
                      </button>
                    </div>
                    <div className="temp-control">
                      <button
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incTemp()} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incTempRelease()} }
                        onMouseDown={this.incTemp}
                        onMouseUp={this.incTempRelease}
                        onMouseOut={this.incTempRelease} >
                        <img
                          src={(this.state.buttons.tempUpButton)?images.upButtonHover:images.upButton}/>
                      </button>
                      <button
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decTemp()} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decTempRelease()} }
                        onMouseDown={this.decTemp}
                        onMouseUp={this.decTempRelease}
                        onMouseOut={this.decTempRelease} >
                        <img
                          src={(this.state.buttons.tempDownButton)?images.downButtonHover:images.downButton}/>
                      </button>
                    </div>

                    <div className="start-control">
                      <button
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.startButtonDown()} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.startButtonRelease()} }
                        onMouseDown={this.startButtonDown}
                        onMouseUp={this.startButtonRelease}
                        onMouseOut={this.startButtonRelease}>
                        <img
                          src={(this.state.buttons.startButton)?images.startButtonHover:images.startButton}/>
                      </button>
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
  }
}

export default connect(mapStateToProps,{
  incHeatBlockTime,
  decHeatBlockTime,
  countDownHeatBlockTime,
  resetHeatBlockTime,
  incHeatBlockTemp,
  decHeatBlockTemp,
  toggleHeatBlockStart
})(GelPosition);
