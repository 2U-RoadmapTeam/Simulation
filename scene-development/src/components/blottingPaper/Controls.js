import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  incPrediction,
  decPrediction
} from '../../actions';

class Controls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pressed: false
    };
  }

  incState = (e) => {
    if(e.type === "mousedown" || e.type === "keydown"){
      this.setState({
        pressed: true
      })
    }
    if (e.type === "mouseup" || e.type === "mouseout" || e.type === "keyup"){
      this.setState({
        pressed: false
      })
    }
    requestAnimationFrame(this.inc);
  }

  decState = (e) => {
    if(e.type === "mousedown" || e.type === "keydown"){
      this.setState({
        pressed: true
      })
    }
    if (e.type === "mouseup" || e.type === "mouseout" || e.type === "keyup"){
      this.setState({
        pressed: false
      })
    }
    requestAnimationFrame(this.dec);
  }

  inc = (e) => {
    if(this.state.pressed)                          {
      requestAnimationFrame(this.inc);
      this.props.incPrediction({id: this.props.id, index: this.props.index});
    }
  }

  dec = (e) => {
    if(this.state.pressed){
      this.props.decPrediction({id: this.props.id, index: this.props.index});
      requestAnimationFrame(this.dec);
    }
  }

  render(){
    return(
      <div className="controls">
       <div className="volume-control">
         <button style={{cursor: "pointer"}} aria-label="Decrease volume button. Decreases the red dye circle by 1 microliter" onMouseDown={this.decState} onMouseUp={this.decState} onMouseOut={this.decState} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.decState(e)}} onKeyUp={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.decState(e)}} > - </button>
         <button style={{cursor: "pointer"}} aria-label="Increase volume button. Increases the red dye circle by 1 microliter" onMouseDown={this.incState} onMouseUp={this.incState} onMouseOut={this.decState} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.incState(e)}} onKeyUp={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.incState(e)}} > + </button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {

  return {
    id: ownProps.id,
    type: state.blotPaper.blotPapers[ownProps.id-1].type,
    prediction: state.blotPaper.blotPapers[ownProps.id-1].prediction
  }
}

export default connect(mapStateToProps, {
  incPrediction,
  decPrediction,
})(Controls);
