import React, { Component } from "react";
import { connect } from 'react-redux';
import Graphics from 'components/pipette/Graphics';
import FocusLock from 'react-focus-lock';

import {
    showModal,
    setVol,
    incVol,
    decVol,
} from 'actions';

import "./PipetteVolume.scss";

import P2ThumbWheel from './img/P2-thumb-wheel.svg';
import P20ThumbWheel from './img/P20-thumb-wheel.svg';
import P200ThumbWheel from './img/P200-thumb-wheel.svg';
import P1000ThumbWheel from './img/P1000-thumb-wheel.svg';

const images = {
  P2ThumbWheel: P2ThumbWheel,
  P20ThumbWheel: P20ThumbWheel,
  P200ThumbWheel: P200ThumbWheel,
  P1000ThumbWheel: P1000ThumbWheel
}

class PipetteVolume extends Component {
    constructor(props) {
        super(props);

        this.state = {
          volume: this.props.volume,
          left: 0,
          cursorOffset: 0,
          pressed: false,
          fired: false
        }
    }

    incState = (e, comp) => {
      if((e.type === "mousedown" || e.type === "keydown") && !this.state.fired){
        this.setState({
          pressed: true,
          fired: true
        }, ()=>{if(comp !== null){comp.call()}})
      }
      if (e.type === "mouseup" || e.type === "mouseout" || e.type === "keyup"){
        this.setState({
          pressed: false,
          fired: false
        }, ()=>{if(comp !== null){comp.call()}})
      }
    }

    decState = (e, comp) => {
      if((e.type === "mousedown" || e.type === "keydown") && !this.state.fired){
        this.setState({
          pressed: true,
          fired: true
        }, ()=>{if(comp !== null){comp.call()}})
      }
      if (e.type === "mouseup" || e.type === "mouseout" || e.type === "keyup"){
        this.setState({
          pressed: false,
          fired: false
        }, ()=>{if(comp !== null){comp.call()}})
      }
    }

    inc = () => {
      if (parseFloat((this.state.volume + this.props.volChange).toFixed(2)) <= this.props.maxVol && this.state.pressed) {

        var result = parseFloat((this.state.volume + this.props.volChange).toFixed(2))
        this.setState({volume: result});

        window.setTimeout(()=>this.inc(), 100);
      }
    }
    dec = () => {
      if (parseFloat((this.state.volume - this.props.volChange).toFixed(2)) >= this.props.minVol && this.state.pressed) {

        var result = parseFloat((this.state.volume - this.props.volChange).toFixed(2))
        this.setState({volume: result});

        window.setTimeout(()=>this.dec(), 100);
      }
    }

    setVolume = (type) => {
      this.props.setVol({
        id: this.props.id,
        volume: this.state.volume
      });
      this.props.showModal({
        display: false
      });
    }

    resetVolume = (type) => {
      this.props.setVol({
        id: this.props.id,
        volume: this.props.minVol
      });
      this.props.showModal({
        display: false
      });
      this.setState({
        volume: this.props.minVol
      });
    }

    onDragStart = (e) => {
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

      var controlWheel = e.target.parentNode.getBoundingClientRect();

      this.setState({
        cursorOffset: 32 + (e.clientX - controlWheel.left)
      });
    }

    // Rounds to the closest volume change property
    decimalRound = (n, volChange) => {
      return (Math.round(n / volChange) * volChange).toFixed(1)
    }

    onDragOver = (e) => {
      e.preventDefault()

      // Get slider / draggable el
      var slider = e.target.getBoundingClientRect();
      var controlWheel = e.target.parentNode.getBoundingClientRect();

      // Cursor offset inside the volume-wheel el
      var offset = this.state.cursorOffset - (e.clientX - controlWheel.left) - this.state.left;

      var vol = parseFloat( this.decimalRound( ((offset / slider.width) * this.props.maxVol),  this.props.volChange));

      //If vol exceeds minVol - set it to the minVol
      if (this.props.minVol > vol) {
        vol = this.props.minVol
      }

      // If vol exceeds maxVol - set it to the maxVol
      if (vol > this.props.maxVol) {
        vol = this.props.maxVol
      }

      // If the vol has changed update the state
      if (this.state.volume !== vol) {
          this.setState({volume: vol });
      }

    }

    onDragEnd = (e) => {
      e.preventDefault();

      this.setState({
        left: e.target.offsetLeft - 32
      });
    }

    componentDidUpdate(prevProps, prevState){
      if(prevProps.id !== this.props.id){
        this.setState({
          cursorOffset: 0,
          left: 0,
          volume: this.props.volume
        });
      }
    }

    render() {
        return (
            <div className="modal-section">
              <div className="modal-header">
                  <h2>{'Set '+this.props.type+' micropipette volume'}</h2>
              </div>
              <div className="modal-body">
                <div className="modal-inner">
                  <div className="volume-modal-content">
                    <div className="controls">
                      <button
                        tabIndex={this.props.tab}
                        aria-label={"Reduce volume button. Current volume "+this.state.volume+" microliters. Select to reduce the micropipette’s volume by half a microliter."}
                        className="volume-control"
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, this.dec)} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.decState(e, null)} }
                        onMouseDown={(e)=>{this.decState(e, this.dec)}}
                        onMouseUp={(e)=>{this.decState(e, null)}}
                        onMouseOut={(e)=>{this.decState(e, null)}}
                        ><p>-</p></button>
                      <div className="center-graphic">
                        <div className="volume-wheel">
                          <div className="draggable"
                            draggable
                            onDragStart={this.onDragStart}
                            onDragOver={this.onDragOver}
                            onDragEnd={this.onDragEnd}
                            style={{left: -(((this.state.volume - this.props.minVol) / (this.props.maxVol - this.props.minVol)) * 264)+"px"}}>
                            <img alt="Pipette thumbwheel." src={images[this.props.type+'ThumbWheel']} />
                          </div>
                        </div>
                        <div style={{marginTop: "20px"}}>
                          <Graphics id={this.props.id} tabHidden={true}/>
                        </div>
                      </div>
                      <button
                        tabIndex={this.props.tab}
                        aria-label={"Increase volume button. Current volume "+this.state.volume+" microliters. Select to increase the micropipette’s volume by half a microliter."}
                        className="volume-control"
                        onKeyDown={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, this.inc)} }
                        onKeyUp={ (e)=>{if(e.which === 13 || e.which === 32) this.incState(e, null)} }
                        onMouseDown={(e)=>{this.incState(e, this.inc)}}
                        onMouseUp={(e)=>{this.incState(e, null)}}
                        onMouseOut={(e)=>{this.incState(e, null)}}
                        ><p>+</p></button>
                    </div>
                    <div className="volume-indicator">
                      <p className="volume-amount">{this.state.volume}</p>
                      <Graphics id={this.props.id} tabHidden={true} stateVolume={this.state.volume} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                  <button aria-label={"Reset volume button. Select to reset the micropipette volume to the default state."} tabIndex={this.props.tab} className="modal-btn-secondary" onClick={this.resetVolume}>
                    Reset volume
                  </button>
                  <button aria-label="Save volume button. Select to save the changes you’ve made and display the instructions and simulation." tabIndex={this.props.tab} className="modal-btn-primary" onClick={this.setVolume}>
                    Save volume
                  </button>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    type: state.pipette.pipettes[ownProps.id-1].type,
    volume: state.pipette.pipettes[ownProps.id-1].volume,
    minVol: state.pipette.pipettes[ownProps.id-1].minVol,
    maxVol: state.pipette.pipettes[ownProps.id-1].maxVol,
    volChange: state.pipette.pipettes[ownProps.id-1].volChange
  }
}

export default connect(mapStateToProps, {
    showModal,
    setVol,
    incVol,
    decVol
})(PipetteVolume);
