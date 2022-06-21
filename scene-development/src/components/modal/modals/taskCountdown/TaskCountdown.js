import React, { Component } from "react";
import { connect } from "react-redux";

import { setLevel, showModal } from "actions";

import "./TaskCountdown.scss";
import colors from "styles/_colors.scss";
import IconStart from "components/icons/start-solid";

class TaskCountdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeInSim: this.props.data.timeInSim,
      timeIRL: this.props.data.timeIRL,
      timeLeft: this.props.data.timeInSim,
      timeDelta: Math.floor(this.props.data.timeInSim/(this.props.data.timeIRL*4)),
      title: this.props.data.title,
      msg: this.props.data.msg,
      closeBtnDisabled: true
    };
  }

  componentDidMount() {
    let timer = setInterval(() => {
      this.setState({
          timeLeft: this.state.timeLeft-this.state.timeDelta
      });
      if(this.state.timeLeft <= 0){
          this.setState({
              timeLeft: 0,
              closeBtnDisabled: false
          })
          clearInterval(timer)
      }
    }, 250);
  }

  close = () => {
    this.props.showModal(false);
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

  render() {
    return (
      <div className="modal-section level-choice">
        <div className="modal-header">
          <h2 style={{textAlign: 'center', margin: 0, width: "100%", display: "block"}}>{this.state.title}</h2>
        </div>

        <p className="modalMsg" style={{textAlign: 'center'}}>{this.state.msg}</p>

        <p className="timerText">{this.formatTime(this.state.timeLeft)}</p>

        <p style={{marginLeft: '5px', marginTop: '-60px', opacity: 0.7, textAlign: 'left'}}><span style={{marginLeft: '35px'}}>HH</span><span style={{marginLeft: '95px'}}>MM</span><span style={{marginLeft: '95px'}}>SS</span></p>

        <div className="modal-footer countdown">
          <button
            aria-label="Continue button"
            tabIndex={this.props.tab}
            className="modal-btn-primary countdown"
            onClick={this.close}
            disabled={this.state.closeBtnDisabled}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    level: state.notebook.level
  };
};

export default connect(
  mapStateToProps,
  {
    setLevel,
    showModal
  }
)(TaskCountdown);
