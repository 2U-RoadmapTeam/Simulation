import React, { Component } from "react";
import { connect } from "react-redux";
import FocusLock from "react-focus-lock";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../../../toast/Toast'

import "./microCentrifugeControls.scss"
import colors from 'styles/_colors.scss'

import { setCentrifugeRpm, setCentrifugeTime, countdownCentrifugeTime, centrifugeCountdownActive, setSolutionHomogenized } from "actions";

import controlsView from "./img/centrifuge-front-controls-blank.svg"
import controlPulseInactive from './img/pulse-inactive.svg'
import controlPulseActive from './img/pulse-active.svg'
import controlStartInactive from './img/start-inactive.svg'
import controlStartActive from './img/start-active.svg'
import controlIncrease from './img/btn-up.svg'
import controlDecrease from './img/btn-down.svg'
import controlIncreaseActive from './img/btn-up-pressed.svg'
import controlDecreaseActive from './img/btn-down-pressed.svg'

const images = {
  controlIncreaseActive: controlIncreaseActive,
  controlDecreaseActive: controlDecreaseActive,
  controlIncrease: controlIncrease,
  controlDecrease: controlDecrease,
  controlPulseInactive: controlPulseInactive,
  controlPulseActive: controlPulseActive,
  controlStartInactive: controlStartInactive,
  controlStartActive: controlStartActive
};

const rpmDelta = 500;
const timeDelta = 5;

class MicroCentrifugeControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1,
      pressed: false,
      fired: false,
      hover: false,
      classTop: '',
      classBottom: '',
      classPulse: '',
      classStart: '',
      button: {
        rpmUpBtn: false,
        rpmDownBtn: false,
        timeUpBtn: false,
        timeDownBtn: false,
        pulseUpBtn: false,
        pulseDownBtn: false,
        controlInactive: false,
        controlIncrease: false,
        controlDecrease: false,
        controlPulseInactive: false,
        controlPulseActive: false,
        controlStartInactive: false,
        controlStartActive: false
      }
    };
  }

  makeToast = (type, msg, title) => {
    let color = ""
    if(type==="HINT"){
      color = colors.yellow1
    } else {
      color = colors.red1
    }

    toast(<Toast type={type} msg={msg} title={title} />,{
      className: css({
        border: "2px solid "+color,
        borderRadius: "6px",
        marginLeft: "-200px",
        minWidth: "400px"
      }),
      progressClassName: css({
        background: color
      }),
      position: "top-center",
      autoClose: 5000,
    });
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

  incRPM = () => {
    if(this.state.pressed){

      if((this.props.rpm + rpmDelta) > 0 ){
        this.props.setCentrifugeRpm({
          rpm: this.props.rpm + rpmDelta
        });
      }

      this.setImage('rpmUpBtn');

      window.setTimeout(()=>this.incRPM(), 100);
    }
  };

  incRPMRelease = () => {
    this.resetImage('rpmUpBtn')
  }

  decRPM = () => {
    if(this.state.pressed){

      if((this.props.rpm - rpmDelta) >= 0 ){
        this.props.setCentrifugeRpm({
          rpm: this.props.rpm - rpmDelta
        });
      }

      this.setImage('rpmDownBtn');

      window.setTimeout(()=>this.decRPM(), 100);
    }
  };

  decRPMRelease = () => {
    this.resetImage('rpmDownBtn');
  }

  incTime = () => {
    if(this.state.pressed){

      this.props.setCentrifugeTime({
        time: this.props.timeSet + timeDelta
      });

      this.setImage('timeUpBtn');

      window.setTimeout(()=>this.incTime(), 100);
    }
  };

  incTimeRelease = () => {
    this.resetImage('timeUpBtn');
  }

  decTime = () => {
    if(this.state.pressed){

      if((this.props.timeSet - timeDelta) >= 0 ){
        this.props.setCentrifugeTime({
          time: this.props.timeSet - timeDelta
        });
      }

      this.setImage('timeDownBtn');

      window.setTimeout(()=>this.decTime(), 100);
    }
  };

  decTimeRelease = () => {
    this.resetImage('timeDownBtn');
  }

  startCountdown = () => {

    this.setImage('controlStartActive');

    if(this.props.open){

      this.makeToast("WARNING", "You must close the lid of the microcentrifuge first.", "Microcentrifuge is open!")

    } else if(!this.props.balanced) {

      this.makeToast("WARNING", "You must balance the microcentrifuge first.", "Microcentrifuge is unbalanced!")

    } else {

      if(!this.props.countdownActive){
        if(this.props.timeLeft === 0){
          this.props.setCentrifugeTime({
            time: this.props.timeSet
          });
        }

        this.props.centrifugeCountdownActive({
          active: true
        })

        this.interval = setInterval(() => {

          this.props.countdownCentrifugeTime({
            timeDiff: 1
          })

          console.log("time left: ", this.props.timeLeft);
          if(this.props.timeLeft <= 0){
            this.props.centrifugeCountdownActive({
              active: false
            })

            console.log(this.props)

            if(60 > this.props.timeSet && this.props.timeSet > 25){
              for (let i = 0; i < this.props.slots.length; i++) {
                const slot = this.props.slots[i];
                if(slot.id !== null){
                  this.props.setSolutionHomogenized({
                    id: this.props.slots[i].id,
                    homogenized: true
                  })
                }
              }
            }

            clearInterval(this.interval);
          }
        }, 100);
      }
    }

  }

  startCountdownRelease = () => {
    this.resetImage('controlStartActive')
  }

  pulse = () => {
    //Set all tubes in centrifuge to homogenized = true

    if(this.props.open){

      this.makeToast("WARNING", "You must close the lid of the microcentrifuge first.", "Microcentrifuge is open!")

    } else {

      this.props.setCentrifugeTime({
        time: 30
      });

      this.startCountdown()
      this.setImage('controlPulseActive')
    }

  }

  pulseRelease = () => {
    this.resetImage('controlPulseInactive')
  };

  formatRPM = () => {
      const thousands = Math.floor(this.props.rpm/1000)
      let hundreds = this.props.rpm%1000

      if(hundreds===0){
          hundreds = "000"
      } else if (hundreds > 0 && hundreds < 10){
        hundreds = "00" + hundreds
      } else if (hundreds > 9 && hundreds < 100){
        hundreds = "0" + hundreds
      }

      return (thousands>0?thousands:"") + (thousands>0?", ":"") + hundreds
  };

  formatTime = (t) => {

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

  formatTimeSet = () => {
    return this.formatTime(this.props.timeSet)
  }

  formatTimeLeft = () => {
    return this.formatTime(this.props.timeLeft)
  }

  setImage = (btn) => {
    this.setState({
      button: {
       [btn]: true
      }
    });
  }

  resetImage = (btn) => {
    this.setState({
      button: {
       [btn]: false
      }
    });
  }

  handleResize = () => {

    let refSize = this.image.getBoundingClientRect();

    let scale = Math.min(
      (refSize.width) / 160,
      (refSize.height) / 312
    );

    this.setState({
      scale: scale
    })

  }
  // We need to attach a window event listener once the component is loaded in the DOM
  componentDidMount() {

    // Resize the scene and attach the resize method to the window resize event
    window.addEventListener("resize", this.handleResize)

  }
  componentWillUnmount(){

    window.removeEventListener("resize", this.handleResize)

  }
  componentDidUpdate(prevProps, prevState) {

    if(this.state.scale !== prevState.scale){
      this.handleResize()
    }
    if(this.props.display !== prevProps.display){
      this.handleResize()
    }
    if(this.props.notebookExpanded !== prevProps.notebookExpanded){
      this.handleResize()
    }

  }

render () {
    return (
          <div className="modal-section">
            <div className="modal-header">
              <h2> Adjust microcentrifuge controls </h2>
            </div>

            <div className="modal-body">
              <div className="centrifuge-modal-inner">
                <div style={{position: "absolute", left: "0", top: "0", width: "100%", height: "100%"}}>
                  <div className="controls" style={{transform: "scale("+ this.state.scale +") translate(-50%, 0)", width: "160px", height: "312px", transformOrigin: "0% 100%", position: "absolute", bottom: "0", left: "50%"}}>

                    <div className="controls__rpm">

                      <div className="controls__rpm--value"><p>{ this.formatRPM() }</p></div>
                      <div className="controls__rpm--btns">
                        <div class="btn">
                          <div className="rpm-btn-inc">
                            <button
                              aria-label={
                                "RPM increase button. Current RMP " +(this.props.rpm)+ ". Select to increase by 500 RPM."
                              }
                              className="rpm-btn-inc__inc"
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incRPM)} }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incRPMRelease)} }
                              onMouseDown={(e)=>{this.incState(e, this.incRPM)}}
                              onMouseUp={(e)=>{this.incState(e, this.incRPMRelease)}}
                              onMouseOut={(e)=>{this.incState(e, this.incRPMRelease)}}>
                              <img src={(this.state.button.rpmUpBtn)?images.controlIncreaseActive:images.controlIncrease} />
                            </button>
                          </div>
                          <div className="rpm-btn-dec">
                            <button
                              aria-label={
                                "RPM decrease button. Current RMP " +(this.props.rpm)+ ". Select to decrease by 500 RPM."
                              }
                              className="rpm-btn-dec__dec"
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decRPM)} }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decRPMRelease)} }
                              onMouseDown={(e)=>{this.decState(e, this.decRPM)}}
                              onMouseUp={(e)=>{this.decState(e, this.decRPMRelease)}}
                              onMouseOut={(e)=>{this.decState(e, this.decRPMRelease)}}>
                              <img src={(this.state.button.rpmDownBtn)?images.controlDecreaseActive:images.controlDecrease} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="controls__settime">

                      <div className="controls__settime--display">

                        <div className="set-time">
                          <div className="set-time__label">Set Time</div>
                          <div className="set-time__value"> { this.formatTime(this.props.timeSet) } </div>
                          <p style={{marginTop: "-3px", opacity: 0.5, textAlign: "left", fontSize: "4px"}}><span style={{marginLeft: '6%'}}>HH</span><span style={{marginLeft: '13.5%'}}>MM</span><span style={{marginLeft: '14.5%'}}>SS</span></p>
                        </div>

                        <div className="controls__settime--btns">
                          <div class="btn">
                            <button
                              aria-label={
                                "Increase time button. Select to increase the time by 30 seconds."
                              }
                              className="btn__time-inc"
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incTime)} }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incTimeRelease)} }
                              onMouseDown={(e)=>{this.incState(e, this.incTime)}}
                              onMouseUp={(e)=>{this.incState(e, this.incTimeRelease)}}
                              onMouseOut={(e)=>{this.incState(e, this.incTimeRelease)}}>
                              <img src={(this.state.button.timeUpBtn)?images.controlIncreaseActive:images.controlIncrease} />
                            </button>
                            <button
                              aria-label={
                                "Decrease time button. Select to decrease the time by 30 seconds."
                              }
                              className="btn__time-dec"
                              onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decTime)} }
                              onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decTimeRelease)} }
                              onMouseDown={(e)=>{this.decState(e, this.decTime)}}
                              onMouseUp={(e)=>{this.decState(e, this.decTimeRelease)}}
                              onMouseOut={(e)=>{this.decState(e, this.decTimeRelease)}}>
                              <img src={(this.state.button.timeDownBtn)?images.controlDecreaseActive:images.controlDecrease} />
                            </button>
                          </div>
                        </div>

                      </div>

                      <div className="controls__settime--remaining">
                        <div className="remaining-time">
                          <div className="controls__settime--remaining-label">Time left</div>
                          <div className="controls__settime--remaining-clock"> { this.formatTimeLeft() } </div>
                          <p style={{marginTop: "-3px", opacity: 0.5, textAlign: "left", fontSize: "4px"}}><span style={{marginLeft: '6%'}}>HH</span><span style={{marginLeft: '13.5%'}}>MM</span><span style={{marginLeft: '15%'}}>SS</span></p>
                        </div>
                      </div>

                    </div>

                  <div className="btn btn--margin">
                    <button
                    aria-label={
                      "Pulse button. Select to spin the tubes for 30 seconds."
                    } className="btn__pulse" onMouseDown={this.pulse} onMouseUp={this.pulseRelease} onMouseOut={this.pulseRelease}>
                      <img src={(this.state.button.pulseUpBtn)?images.controlPulseActive:images.controlPulseInactive} />
                    </button>
                    <button
                    aria-label={
                      "Start button. Select to spin the tubes for the time that is set."
                    } className="btn__start" onMouseDown={this.startCountdown} onMouseUp={this.startCountdownRelease} onMouseOut={this.startCountdownRelease}>
                      <img src={(this.state.button.pulseDownBtn)?images.controlStartActive:images.controlStartInactive} />
                    </button>
                  </div>

                </div>
                <img width="100" ref={(image)=> {this.image = image}} onLoad={this.handleResize} className="microcentrifuge-controls-display" src={controlsView} alt="" aria-label="" tabIndex={this.props.tab} />
              </div>
            </div>
          </div>
        </div>
    );
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    rpm: state.centrifuge.rpm,
    timeSet: state.centrifuge.timeSet,
    timeLeft: state.centrifuge.timeLeft,
    balanced: state.centrifuge.balanced,
    countdownActive: state.centrifuge.countdownActive,
    open: state.centrifuge.open,
    slots: state.centrifuge.slots,
    display: state.modal.display,
    notebookExpanded: state.scene.notebookExpanded,
  };
};

export default connect(
  mapStateToProps,
  {
    setCentrifugeRpm,
    setCentrifugeTime,
    countdownCentrifugeTime,
    centrifugeCountdownActive,
    setSolutionHomogenized,
  }
)(MicroCentrifugeControls);
