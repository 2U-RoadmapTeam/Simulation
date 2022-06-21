import React, { Component } from "react";
import { connect } from "react-redux";
import FocusLock from "react-focus-lock";
import FloatingTubeRack from "../../../floatingTubeRack/Graphics";

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../../../toast/Toast'

import colors from 'styles/_colors.scss'

import {
  showModal,
  setWaterBathTemp,
  setWaterBathTime,
  waterBathCountdown,
  waterBathCountdownActive,
  tubeInWaterBath,
  waterBathContainsTubeRack
} from "actions";

import "./WaterBathControls.scss";

import btnDownActive from "./img/btn-down-active.svg";
import btnUpActive from "./img/btn-up-active.svg";
import btnDownPressed from "./img/btn-down-pressed.svg";
import btnUpPressed from "./img/btn-up-pressed.svg";
import btnStartActive from "./img/start-button-active.svg";
import btnStartInactive from "./img/start-button-inactive.svg";
import waterBathClosed from "./img/waterbath-closed.svg";
import waterBathOpen from "./img/waterbath-open.svg";

const images = {
  btnDownActive: btnDownActive,
  btnUpActive: btnUpActive,
  btnDownPressed: btnDownPressed,
  btnUpPressed: btnUpPressed,
  btnStartInactive: btnStartInactive,
  btnStartActive: btnStartActive,
  waterBathClosed: waterBathClosed,
  waterBathOpen: waterBathOpen
};

class WaterBathControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1,
      pressed: false,
      fired: false,
      button: {
        tempUpPressed: false,
        tempDownPressed: false,
        timeUpPressed: false,
        timeDownPressed: false,
        btnStartPressed: false,
        btnDownActive: false,
        btnUpActive: false,
        btnDownPressed: false,
        btnUpPressed: false,
        btnStartInactive: false,
        btnStartActive: false
      },
      temp: this.props.temp,
      time: this.props.time
    };
  }

//   componentDidUpdate(){
//       this.setState({
//           temp: this.props.temp,
//           time: this.props.time
//       })
//   }

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

  incTemp = () => {
    if(this.state.pressed){
      if (!this.props.active) {
        this.setState({
          temp: this.state.temp + 1
        }, () => {
          this.props.setWaterBathTemp({
            temp: this.state.temp
          });
        });
      }
      this.setImage("tempUpPressed");

      window.setTimeout(()=>this.incTemp(), 100);
    }
  };

  incTempRelease = () => {
    this.resetImage("tempUpPressed");
  };

  decTemp = () => {
    if(this.state.pressed){
      if (!this.props.active) {
        this.setState({
          temp: this.state.temp - 1
        }, () => {
          this.props.setWaterBathTemp({
            temp: this.state.temp
          });
        });
      }
      this.setImage("tempDownPressed");

      window.setTimeout(()=>this.decTemp(), 100);
    }
  };

  decTempRelease = () => {
    this.resetImage("tempDownPressed");
  };

  incTime = () => {
    if(this.state.pressed){
      if (!this.props.active) {
        this.setState({
          time: this.state.time + 30
        }, () => {
          this.props.setWaterBathTime({
            time: this.state.time
          });
        });
      }
      this.setImage("timeUpPressed");

      window.setTimeout(()=>this.incTime(), 100);
    }
  };

  incTimeRelease = () => {
    this.setImage("timeUpActive");
  };

  decTime = () => {
    if(this.state.pressed){
      if (!this.props.active) {
        if (this.state.time >= 1) {
          this.setState({
            time: this.state.time - 30
          });
        }
      }
      this.setImage("timeDownPressed");

      window.setTimeout(()=>this.decTime(), 100);
    }
  };

  decTimeRelease = () => {
    this.setImage("timeDownActive");
  };

  setImage = btn => {
    this.setState({
      button: {
        [btn]: true
      }
    });
  };

  resetImage = btn => {
    this.setState({
      button: {
        [btn]: false
      }
    });
  };

  startClicked = () => {
    if (!this.props.active && this.state.time > 0) {
      this.props.waterBathCountdownActive({
        active: true
      });

      this.interval = setInterval(() => {
        this.setState({
          time: this.state.time - 1
        });

        if (this.state.time === 0) {
          this.props.waterBathCountdownActive({
            active: false
          });
          clearInterval(this.interval);
        }
      }, 10);
    }

    this.setImage("btnStartActive");
  };

  startClickedRelease = () => {
    this.resetImage("btnStartInactive");
  };

  closeModal = () => {
    this.props.setWaterBathTemp({
      temp: this.state.temp
    });

    this.props.setWaterBathTime({
      time: this.state.time
    });

    this.props.showModal({ display: false });
  };

  formatTemp = () => {
    return this.state.temp;
  };

  formatTime = () => {

    let hours = Math.floor(this.state.time/3600)
    let mins = Math.floor(this.state.time/60)%60
    let secs = this.state.time%60

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

  ejectRack = () =>{
    if(this.props.open){
      if(this.props.hasRack){
        this.props.tubeInWaterBath({
          inWaterBath: false
        });
        this.props.waterBathContainsTubeRack({
          containsTubeRack: false
        });
      } else {
        this.makeToast('WARNING', 'There is nothing to eject.', 'Empty!')
      }
    } else {
      this.makeToast('WARNING', 'Please open the waterbath door.', 'Waterbath Closed!')
    }
  }

  renderEjectBtn = () => {
    //if(this.props.open && this.props.hasRack){
      return (
        <div tabIndex={0} class="eject-button" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.ejectRack(e)} } onClick={this.ejectRack}> Eject </div>
      )
    //}
  }

  handleResize = () => {

    let refSize = this.image.getBoundingClientRect();

    let scale = Math.min(
      (refSize.width) / 162,
      (refSize.height) / 198
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

  render() {
    return (
        <div className="modal-section">
          <div className="modal-header">
            <h2>Controls for Water Bath</h2>
          </div>

          <div className="modal-body">
            <div className="modal-inner">
              <div className="water-bath-controls" style={{position: "absolute", left: "0", top: "0", width: "100%", height: "100%", zIndex: 1}}>
                <div className="water-bath-controls__container" style={{transform: "scale("+ this.state.scale +") translate(-50%, 0)", width: "163px", height: "198px", transformOrigin: "0% 100%", position: "absolute", bottom: "0", left: "50%"}}>
                  {this.renderEjectBtn()}
                  <div className="water-bath-controls__container--temp-controls">
                    <div className="water-bath-temp">
                      <h3 tabIndex={0}> Set temp </h3>
                      <h1 tabIndex={0}> {this.formatTemp()} °C</h1>
                    </div>
                    <div className="water-bath-btns">
                      <button
                        tabIndex={0}
                        aria-label={
                          "Heat button. Current temp "+ this.props.temp +" degrees celcius. Select to increase the temperature by 1 degrees."
                        }
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incTemp)} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incTempRelease)} }
                        onMouseDown={(e)=>{this.incState(e, this.incTemp)}}
                        onMouseUp={(e)=>{this.incState(e, this.incTempRelease)}}
                        onMouseOut={(e)=>{this.incState(e, this.incTempRelease)}}
                      >
                        <img
                          alt="Up button"
                          src={
                            this.state.button.tempUpPressed
                              ? images.btnUpPressed
                              : images.btnUpActive
                          }
                        />
                      </button>

                      <button
                        tabIndex={0}
                        aria-label={
                          "Cool button. Current temp "+ this.props.temp +" degrees celcius. Select to reduce the temperature by 1 degrees."
                        }
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.decTemp)} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.decTempRelease)} }
                        onMouseDown={(e)=>{this.incState(e, this.decTemp)}}
                        onMouseUp={(e)=>{this.incState(e, this.decTempRelease)}}
                        onMouseOut={(e)=>{this.incState(e, this.decTempRelease)}}
                      >
                        <img
                          alt="Down button"
                          src={
                            this.state.button.tempDownPressed
                              ? images.btnDownPressed
                              : images.btnDownActive
                          }
                        />
                      </button>
                    </div>
                  </div>

                  <div className="water-bath-controls__container--time-controls">
                    <div className="water-bath-time">
                      <h3 tabIndex={0}> Set time </h3>
                      <h1 tabIndex={0}> {this.formatTime()} </h1>
                      <p style={{marginTop: '-3px', opacity: 0.7, textAlign: 'left', fontSize: "4px"}}><span style={{marginLeft: '2px'}}>HH</span><span style={{marginLeft: '5px'}}>MM</span><span style={{marginLeft: '6px'}}>SS</span></p>
                    </div>

                    <div className="water-bath-btns">
                      <button
                        tabIndex={0}
                        aria-label={
                          "Increase time button. Select to increase the timer by 30 seconds."
                        }
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incTime)} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.incTimeRelease)} }
                        onMouseDown={(e)=>{this.incState(e, this.incTime)}}
                        onMouseUp={(e)=>{this.incState(e, this.incTimeRelease)}}
                        onMouseOut={(e)=>{this.incState(e, this.incTimeRelease)}}
                      >
                        <img
                          alt="Up button"
                          src={
                            this.state.button.timeUpPressed
                              ? images.btnUpPressed
                              : images.btnUpActive
                          }
                        />
                      </button>

                      <button
                        tabIndex={0}
                        aria-label={
                          "Reduce time button. Select to reduce the timer by 30 seconds."
                        }
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.decTime)} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.decTimeRelease)} }
                        onMouseDown={(e)=>{this.incState(e, this.decTime)}}
                        onMouseUp={(e)=>{this.incState(e, this.decTimeRelease)}}
                        onMouseOut={(e)=>{this.incState(e, this.decTimeRelease)}}
                      >
                        <img
                          alt="Down button"
                          src={
                            this.state.button.timeDownPressed
                              ? images.btnDownPressed
                              : images.btnDownActive
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <div className="water-bath-start">
                    <button
                      onMouseDown={this.startClicked}
                      onKeyDown={(e)=>{if(e.which === 13 || e.which === 32){this.startClicked(e)}}}
                      onKeyUp={(e)=>{if(e.which === 13 || e.which === 32){this.startClickedRelease(e)}}}
                      onMouseUp={this.startClickedRelease}
                      onMouseOut={this.startClickedRelease}
                      tabIndex={0}
                      aria-label="Water bath start"
                    >
                      <img
                        aria-hidden={true}
                        src={
                          this.state.button.btnStartPressed
                            ? images.btnStartActive
                            : images.btnStartInactive
                        }
                      />
                    </button>
                  </div>
                  <div class="floatingRackInsert" style={{display: (this.props.hasRack && this.props.open)? 'initial': 'none'}}>
                    <FloatingTubeRack id={1} />
                  </div>
                </div>
              </div>
              <div className="water-bath">
                <img ref={(image)=> {this.image = image}} onLoad={this.handleResize} src={(this.props.open)?images.waterBathOpen:images.waterBathClosed} alt="Water bath"/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.waterBath.open,
    temp: state.waterBath.temp,
    time: state.waterBath.time,
    hasRack: state.waterBath.containsTubeRack,
    active: state.waterBath.countdownActive,
    display: state.modal.display,
    notebookExpanded: state.scene.notebookExpanded,
  };
};

export default connect(
  mapStateToProps,
  {
    showModal,
    setWaterBathTemp,
    setWaterBathTime,
    waterBathCountdown,
    waterBathCountdownActive,
    tubeInWaterBath,
    waterBathContainsTubeRack
  }
)(WaterBathControls);
