import React, { Component } from "react";
import { connect } from 'react-redux';

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../../../toast/Toast'
import colors from 'styles/_colors.scss'

import {
  incPowerSupplyTime,
  decPowerSupplyTime,
  countDownPowerSupplyTime,
  resetPowerSupplyTime,
  incPowerSupplyAmp,
  decPowerSupplyAmp,
  incPowerSupplyWatt,
  decPowerSupplyWatt,
  incPowerSupplyVoltage,
  decPowerSupplyVoltage,
  togglePowerSupplyPower,
  togglePowerSupplyStart,
  setGelResult
} from 'actions';

import "./PowerSupplyControls.scss";

import PowerSupply from './img/powerSupply.svg'
import PowerSupply1 from './img/powerSupply1.svg'
import PowerSupply2 from './img/powerSupply2.svg'
import PowerSupply3 from './img/powerSupply3.svg'
import DownButton from './img/downButton.svg'
import UpButton from './img/upButton.svg'
import StartButton from './img/startButton.svg'
import StopButton from './img/stopButton.svg'
import PowerButton from './img/powerButton.svg'
import DownButtonHover from './img/downButtonHover.svg'
import UpButtonHover from './img/upButtonHover.svg'
import StartButtonHover from './img/startButtonHover.svg'
import StopButtonHover from './img/stopButtonHover.svg'
import PowerButtonHover from './img/powerButtonHover.svg'


const images = {
  powerSupply: PowerSupply,
  powerSupply1: PowerSupply1,
  powerSupply2: PowerSupply2,
  powerSupply3: PowerSupply3,
  downButton: DownButton,
  upButton: UpButton,
  startButton: StartButton,
  stopButton: StopButton,
  powerButton: PowerButton,
  downButtonHover: DownButtonHover,
  upButtonHover: UpButtonHover,
  startButtonHover: StartButtonHover,
  stopButtonHover: StopButtonHover,
  powerButtonHover: PowerButtonHover
}

class PowerSupplyControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
          scale: 1,
          pressed: false,
          fired: false,
          buttons: {
            powerSupply: false,
            timeDownButton: false,
            timeUpButton: false,
            ampDownButton: false,
            ampUpButton: false,
            wattDownButton: false,
            wattUpButton: false,
            voltageDownButton: false,
            voltageUpButton: false,
            startButton: false,
            stopButton: false,
            powerButton: false
          }
        }
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
      if((e.type === "mousedown" || e.type === "keydown") && !this.state.fired){
        this.setState({
          pressed: true,
          fired: true
        }, ()=>comp.call())
      }
      if (e.type === "mouseup" || e.type === "mouseout" || e.type === "keyup"){
        this.setState({
          pressed: false,
          fired: false
        }, ()=>comp.call())
      }
    }

    decState = (e, comp) => {
      if((e.type === "mousedown" || e.type === "keydown") && !this.state.fired){
        this.setState({
          pressed: true,
          fired: true
        }, ()=>comp.call())
      }
      if (e.type === "mouseup" || e.type === "mouseout" || e.type === "keyup"){
        this.setState({
          pressed: false,
          fired: false
        }, ()=>comp.call())
      }
    }

    incTime = () => {

      if(this.state.pressed){

        if(this.props.power){
          this.props.incPowerSupplyTime({id: this.props.id})
        }
        this.changeImage('timeUpButton')

        window.setTimeout(()=>this.incTime(), 100);
      }
    }
    incTimeRelease = () => {
      this.resetImage('timeUpButton')
    }

    decTime = () => {

      if(this.state.pressed){

        if(this.props.power){
          this.props.decPowerSupplyTime({id: this.props.id})
        }
        this.changeImage('timeDownButton')

        window.setTimeout(()=>this.decTime(), 100);
      }
    }
    decTimeRelease = () => {
      this.resetImage('timeDownButton')
    }


    incAmp = () => {

      if(this.state.pressed){

        if(this.props.power){
          this.props.incPowerSupplyAmp({id: this.props.id})
        }
        this.changeImage('ampUpButton')

        window.setTimeout(()=>this.incAmp(), 100);
      }
    }
    incAmpRelease = () => {
      this.resetImage('ampUpButton')
    }

    decAmp = () => {
      if(this.state.pressed){

        if(this.props.power){
          this.props.decPowerSupplyAmp({id: this.props.id})
        }
        this.changeImage('ampDownButton')

        window.setTimeout(()=>this.decAmp(), 100);
      }
    }
    decAmpRelease = () => {
      this.resetImage('ampDownButton')
    }

    incWatt = () => {

      if(this.state.pressed){

        if(this.props.power){
          this.props.incPowerSupplyWatt({id: this.props.id})
        }
        this.changeImage('wattUpButton')

        window.setTimeout(()=>this.incWatt(), 100);
      }
    }
    incWattRelease = () => {
      this.resetImage('wattUpButton')
    }

    decWatt = () => {
      if(this.state.pressed){

        if(this.props.power){
          this.props.decPowerSupplyWatt({id: this.props.id})
        }
        this.changeImage('wattDownButton')

        window.setTimeout(()=>this.decWatt(), 100);
      }
    }
    decWattRelease = () => {
      this.resetImage('wattDownButton')
    }

    incVoltage = () => {

      if(this.state.pressed){

        if(this.props.power){
          this.props.incPowerSupplyVoltage({id: this.props.id})
        }
        this.changeImage('voltageUpButton')

        window.setTimeout(()=>this.incVoltage(), 100);
      }
    }
    incVoltageRelease = () => {
      this.resetImage('voltageUpButton')
    }

    decVoltage = () => {
      if(this.state.pressed){

        if(this.props.power){
          this.props.decPowerSupplyVoltage({id: this.props.id})
        }
        this.changeImage('voltageDownButton')

        window.setTimeout(()=>this.decVoltage(), 100);
      }
    }
    decVoltageRelease = () => {
      this.resetImage('voltageDownButton')
    }

    powerButtonDown = () => {
      this.props.togglePowerSupplyPower({power: !this.props.power})
      this.changeImage('powerButton')
    }
    powerButtonRelease = () => {
      //this.props.incPowerSupplyVoltage({id: this.props.id})
      this.resetImage('powerButton')
    }
    startButtonDown = () => {

      this.changeImage('startButton')

      if(this.props.positiveLead1 &&
         this.props.negativeLead1 &&
         this.props.positiveLead2 &&
         this.props.negativeLead2){

        this.props.togglePowerSupplyStart({active: true})

        let numIterations = (this.props.timer >= 20)?200:this.props.timer*10
        //2400 total seconds / 200 loops total = 12 "seconds" per loop
        let countdownInterval = this.props.timer/numIterations

        this.interval = setInterval(() => {
          if(this.props.power){
            this.props.countDownPowerSupplyTime({id: this.props.id, interval: countdownInterval})

            if(this.props.anodeConnected && this.props.cathodeConnected && this.props.gelbox.anodeConnected && this.props.gelbox.cathodeConnected && this.props.gelbox.solutionAlias !== null){
              this.props.setGelResult({id: 1, interval: countdownInterval, voltage: this.props.voltage, watts: this.props.watts, current: this.props.current})
            }
          }
          if(this.props.timer === 0 || !this.props.power){
            clearInterval(this.interval);
          }
        }, (10));
      } else {
        this.makeToast(
          "WARNING",
          "Please ensure that all of the power supply leads are connected before running the power supply.",
          "Power supply leads disconnected!"
        );
      }

    }

    startButtonRelease = () => {
      this.resetImage('startButton')
    }
    stopButtonDown = () => {

      if(this.props.active){
        this.props.togglePowerSupplyStart({active: false})
        clearInterval(this.interval);
      } else {

        this.props.resetPowerSupplyTime()
      }

      this.changeImage('stopButton')
    }
    stopButtonRelease = () => {
      this.resetImage('stopButton')
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

      let hours = Math.floor(this.props.timer/3600)
      let mins = Math.floor(this.props.timer/60)%60
      let secs = this.props.timer%60

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

    handleResize = () => {

      let refSize = this.image.getBoundingClientRect();

      let scale = Math.min(
        (refSize.width) / 403,
        (refSize.height) / 359
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

    render() {
        return (
          <div style={{height: '100%'}}>
            <div className="modal-section">
              <div className="modal-header">
                  <h2 tabIndex="0">{'Adjust power supply controls'}</h2>
              </div>
              <div className="modal-body">
                <div className="modal-inner">
                  <div className="power-supply-content">
                      <div className="power-supply">
                        <img
                          ref={(image)=> {this.image = image}}
                          onLoad={this.handleResize}
                          alt="Power supply"
                          src={(this.props.anodeConnected)?(this.props.cathodeConnected)?images.powerSupply3: images.powerSupply1:(this.props.cathodeConnected)?images.powerSupply2:images.powerSupply}/>
                      </div>
                      <div className="power-supply-values" style={{display: (this.props.power)?null:'none'}}>
                        <div style={{transform: "scale("+ this.state.scale +") translate(-50%, -50%)", width: "422px", height: "359px", transformOrigin: "0% 0%", position: "absolute", top: "50%", left: "50%"}}>
                          <div className="main-display">
                            <p className="voltage">{Math.round(this.props.voltage * 10) / 10+" V"}</p>
                          </div>
                          <div className="sub-display">
                            <p className="current">{"Current: "+Math.round(this.props.current * 100) / 100 + " A"}</p>
                            <p className="watts">{"Power: "+Math.round(this.props.watts * 100) / 100 + " W"}</p>
                            <p className="time">{"Time: "+this.formatTime()}</p>
                            <p className="time-abrv"><span style={{marginLeft: '6%'}}>HH</span><span style={{marginLeft: '9.5%'}}>MM</span><span style={{marginLeft: '6.5%'}}>SS</span></p>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="power-supply-controls">
                    <div style={{transform: "scale("+ this.state.scale +") translate(-50%, -50%)", width: "422px", height: "359px", transformOrigin: "0% 0%", position: "absolute", top: "50%", left: "50%"}}>
                      <div className="time-control">
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decTime)} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decTimeRelease)} }
                          onMouseDown={(e)=>{this.decState(e, this.decTime)}}
                          onMouseUp={(e)=>{this.decState(e, this.decTimeRelease)}}
                          onMouseOut={(e)=>{this.decState(e, this.decTimeRelease)}}
                          aria-label={
                            "Decrease time button. Current time set to " + this.formatTime().split(":")[0] + "hours, " + this.formatTime().split(":")[1] + "minutes, and" +  this.formatTime().split(":")[2] + " seconds. Select to decrease the time by 30 seconds."
                          }>
                          <img
                            alt="Time decrease"
                            src={(this.state.buttons.timeDownButton)?images.downButtonHover:images.downButton}/>
                        </button>
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incTime)} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incTimeRelease)} }
                          onMouseDown={(e)=>{this.incState(e, this.incTime)}}
                          onMouseUp={(e)=>{this.incState(e, this.incTimeRelease)}}
                          onMouseOut={(e)=>{this.incState(e, this.incTimeRelease)}}
                          aria-label={
                            "Increase time button. Current time set to " + this.formatTime().split(":")[0] + "hours, " + this.formatTime().split(":")[1] + "minutes, and" +  this.formatTime().split(":")[2] + " seconds. Select to increase the time by 30 seconds."
                          }>
                          <img
                            alt="Time increase"
                            src={(this.state.buttons.timeUpButton)?images.upButtonHover:images.upButton}/>
                        </button>
                      </div>
                      <div className="amp-control">
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decAmp)} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decAmpRelease)} }
                          onMouseDown={(e)=>{this.decState(e, this.decAmp)}}
                          onMouseUp={(e)=>{this.decState(e, this.decAmpRelease)}}
                          onMouseOut={(e)=>{this.decState(e, this.decAmpRelease)}}
                          aria-label={"Current decrease button. Current set to " + this.props.current + " amps. Select to decrease the current by 0.1 amp."}>
                          <img
                            alt="Current decrease"
                            src={(this.state.buttons.ampDownButton)?images.downButtonHover:images.downButton}/>
                        </button>
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incAmp)} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incAmpRelease)} }
                          onMouseDown={(e)=>{this.incState(e, this.incAmp)}}
                          onMouseUp={(e)=>{this.incState(e, this.incAmpRelease)}}
                          onMouseOut={(e)=>{this.incState(e, this.incAmpRelease)}}
                          aria-label={"Current increase button. Current set to " + this.props.current + " amps. Select to increase the current by 0.1 amp."}>
                          <img
                            alt="Current increase"
                            src={(this.state.buttons.ampUpButton)?images.upButtonHover:images.upButton}/>
                        </button>
                      </div>
                      <div className="watt-control">
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decWatt)} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decWattRelease)} }
                          onMouseDown={(e)=>{this.decState(e, this.decWatt)}}
                          onMouseUp={(e)=>{this.decState(e, this.decWattRelease)}}
                          onMouseOut={(e)=>{this.decState(e, this.decWattRelease)}}
                          aria-label={"Watt decrease button. Power set to " + this.props.watts  + " watts. Select to decrease the power by 10 watts."}>
                          <img
                            alt="Watt decrease"
                            src={(this.state.buttons.wattDownButton)?images.downButtonHover:images.downButton}/>
                        </button>
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incWatt)} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incWattRelease)} }
                          onMouseDown={(e)=>{this.incState(e, this.incWatt)}}
                          onMouseUp={(e)=>{this.incState(e, this.incWattRelease)}}
                          onMouseOut={(e)=>{this.incState(e, this.incWattRelease)}}
                          aria-label={"Watt increase button. Power set to " + this.props.watts + " watts. Select to increase the power by 10 watts."}>
                          <img
                            alt="Watt increase"
                            src={(this.state.buttons.wattUpButton)?images.upButtonHover:images.upButton}/>
                        </button>
                      </div>
                      <div className="voltage-control">
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decVoltage)} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.decVoltageRelease)} }
                          onMouseDown={(e)=>{this.decState(e, this.decVoltage)}}
                          onMouseUp={(e)=>{this.decState(e, this.decVoltageRelease)}}
                          onMouseOut={(e)=>{this.decState(e, this.decVoltageRelease)}}
                          aria-label="Voltage decrease"
                          aria-label={"Voltage decrease button. Voltage set to " + this.props.voltage  + " volts. Select to decrease the voltage by 10 volts."}>
                          <img
                            alt="Voltage decrease"
                            src={(this.state.buttons.voltageDownButton)?images.downButtonHover:images.downButton}/>
                        </button>
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incVoltage)} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incVoltageRelease)} }
                          onMouseDown={(e)=>{this.incState(e, this.incVoltage)}}
                          onMouseUp={(e)=>{this.incState(e, this.incVoltageRelease)}}
                          onMouseOut={(e)=>{this.incState(e, this.incVoltageRelease)}}
                          aria-label="Voltage increase"
                          aria-label={"Voltage increase button. Voltage set to " + this.props.voltage + " volts. Select to increase the voltage by 10 volts."}>
                          <img
                            alt="Voltage increase"
                            src={(this.state.buttons.voltageUpButton)?images.upButtonHover:images.upButton}/>
                        </button>
                      </div>
                      <div className="power-control">
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.powerButtonDown()} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.powerButtonRelease()} }
                          onMouseDown={this.powerButtonDown}
                          onMouseUp={this.powerButtonRelease}
                          onMouseOut={this.powerButtonRelease}
                          aria-label={"Power button. Power supply is currently " + ((!this.props.power)?"off":"on") + ". Select to turn the power supply on and off."}>
                          <img
                            alt="Power"
                            src={(this.state.buttons.powerButton)?images.powerButtonHover:images.powerButton}/>
                        </button>
                      </div>
                      <div className="start-control">
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.startButtonDown()} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.startButtonRelease()} }
                          onMouseDown={this.startButtonDown}
                          onMouseUp={this.startButtonRelease}
                          onMouseOut={this.startButtonRelease}
                          aria-label={"Start button. Timer is currently " + ((this.props.active)?"active":"inactive") + ". Select to start power supply."}>
                          <img
                            alt="Start"
                            src={(this.state.buttons.startButton)?images.startButtonHover:images.startButton}/>
                        </button>
                        <button
                          onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.stopButtonDown()} }
                          onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.stopButtonRelease()} }
                          onMouseDown={this.stopButtonDown}
                          onMouseUp={this.stopButtonRelease}
                          onMouseOut={this.stopButtonRelease}
                          aria-label={"Stop button. Timer is currently " + ((this.props.active)?"active":"inactive") + ". Select to stop power supply."}>
                          <img
                            alt="Stop"
                            src={(this.state.buttons.stopButton)?images.stopButtonHover:images.stopButton}/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    voltage: state.powerSupply.voltage,
    watts: state.powerSupply.watts,
    current: state.powerSupply.current,
    timer: state.powerSupply.timer,
    power: state.powerSupply.power,
    active: state.powerSupply.active,
    anodeConnected: state.powerSupply.anodeConnected,
    cathodeConnected: state.powerSupply.cathodeConnected,
    positiveLead1: state.powerSupplyLead.positiveLeads['1'],
    negativeLead1: state.powerSupplyLead.negativeLeads['1'],
    positiveLead2: state.powerSupplyLead.positiveLeads['2'],
    negativeLead2: state.powerSupplyLead.negativeLeads['2'],
    results: state.gel.gels[0].results,
    gelbox: state.gelBox.gelBoxes[0],
    display: state.modal.display,
    notebookExpanded: state.scene.notebookExpanded,
  }
}

export default connect(mapStateToProps,{
    incPowerSupplyTime,
    decPowerSupplyTime,
    countDownPowerSupplyTime,
    resetPowerSupplyTime,
    incPowerSupplyAmp,
    decPowerSupplyAmp,
    incPowerSupplyWatt,
    decPowerSupplyWatt,
    incPowerSupplyVoltage,
    decPowerSupplyVoltage,
    togglePowerSupplyPower,
    togglePowerSupplyStart,
    setGelResult
  })(PowerSupplyControls);
