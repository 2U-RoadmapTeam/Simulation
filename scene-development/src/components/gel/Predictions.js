import React, { Component } from "react";
import { connect } from "react-redux";
import { throttle } from "lodash";
import { getTransform } from "../../lib/hotspot";

import {
  pushInteractions,
  setGelPrediction,
 } from '../../actions';

import "./Gel.scss";

import Prediction from './img/prediction.svg'
import Up from './img/up.svg'
import UpDisabled from './img/up-disabled.svg'
import Down from './img/down.svg'
import DownDisabled from './img/down-disabled.svg'

const images = {
  up: Up,
  upDisabled: UpDisabled,
  down: Down,
  downDisabled: DownDisabled
}

class Gel extends Component {
constructor(props) {
  super(props);

  this.state = {
    y1:this.props.predictions.lane1,
    y2:this.props.predictions.lane2,
    y3:this.props.predictions.lane3,
    y1last:0,
    y2last:0,
    y3last:0,
  }

}

onDragStart = e => {

  //e.preventDefault();

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

  let lane = e.target.id.split("-")[1]

  this.setState({
    ['y'+lane+'last']: e.clientY,
  })

  return false;

};
drag = throttle((target, clientX, clientY) => {

  if (target) {

    let transform = getTransform(target.childNodes[0])
    let lane = target.id.split("-")[1]

    if(lane){
      let iYPos = parseFloat(transform.translateY)
      let newY = clientY + iYPos - this.state['y'+lane+'last']

      if(newY >= 0 && newY <= 357){
        this.setState({
          ['y'+lane]: newY,
          ['y'+lane+'last']: clientY,
          //offsetY: (this.state.offsetY + (clientY - this.state.lastY))
        });
      }
    }
  }
}, 20);

onDragOver = e => {

  e.preventDefault();

  if(e.target.classList.contains('lane')){
    this.drag(e.target, e.clientX, e.clientY);
  }

  return false;
};

onDragEnd = e => {
  e.preventDefault();
  e.stopPropagation();
  this.props.setGelPrediction({
    id: 1,
    prediction: {
      lane1: this.state.y1,
      lane2: this.state.y2,
      lane3: this.state.y3
    }
  })

  return false;
};

moveUp = (lane) => {
  let newY = (this.state["y"+lane] - 10);

  if(newY >= 0 && newY <= 357){
    this.setState({
      ['y'+lane]: newY,
      ['y'+lane+'last']: this.state["y"+lane],
    }, function(){
      this.props.setGelPrediction({
        id: 1,
        prediction: {
          lane1: this.state.y1,
          lane2: this.state.y2,
          lane3: this.state.y3
        }
      })
    });
  }
}

moveDown = (lane) => {
  let newY = (this.state["y"+lane] + 10);

  if(newY >= 0 && newY <= 357){
    this.setState({
      ['y'+lane]: newY,
      ['y'+lane+'last']: this.state["y"+lane],
    }, function(){
      this.props.setGelPrediction({
        id: 1,
        prediction: {
          lane1: this.state.y1,
          lane2: this.state.y2,
          lane3: this.state.y3
        }
      })
    });
  }
}

getUpArrow = (lane) => {

  let ref = 'up';

  if(this.state['y'+lane] === 0){
    ref += 'Disabled';
  }

  return images[ref];
}
getDownArrow = (lane) => {

  let ref = 'down';

  if(this.state['y'+lane] >= 340){
    ref += 'Disabled';
  }

  return images[ref];
}

render(){
  return (
      <div className="Gel-prediction">
        <div className="lanes">
          <div id="lane-1" className="lane lane-1" draggable onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={(e)=>{e.preventDefault(); e.stopPropagation()}} onDragEnd={this.onDragEnd}>
            <div className="particle" style={{
              transform:
                "translate3d(0px, " +
                this.state.y1 +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              position: "absolute"
            }}>
              <img tabIndex="0" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.moveUp(1)} } onClick={(e)=> {this.moveUp(1)}} className="up-arrow" aria-label={"Yellow dye. Move up. Current position, "+((this.state.y1 < 150)?"1st.":(this.state.y1 < 260)?"2nd.":"3rd.")} alt={"Yellow dye. Move up. Current position, "+((this.state.y1 < 150)?"1st.":(this.state.y1 < 260)?"2nd.":"3rd.")} src={this.getUpArrow(1)}/>
              <img tabIndex="0" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.moveDown(1)} } onClick={(e)=> {this.moveDown(1)}} className="down-arrow" aria-label={"Yellow dye. Move down. Current position, "+((this.state.y1 < 150)?"1st.":(this.state.y1 < 260)?"2nd.":"3rd.")} alt={"Yellow dye. Move down. Current position, "+((this.state.y1 < 150)?"1st.":(this.state.y1 < 260)?"2nd.":"3rd.")} src={this.getDownArrow(1)}/>
            </div>
          </div>
          <div id="lane-2" className="lane lane-2" draggable onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={(e)=>{e.preventDefault(); e.stopPropagation()}} onDragEnd={this.onDragEnd}>
            <div className="particle" style={{
              transform:
                "translate3d(0px, " +
                this.state.y2 +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              position: "absolute"
            }}>
              <img tabIndex="0" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.moveUp(2)} } onClick={(e)=> {this.moveUp(2)}} className="up-arrow" aria-label={"Blue dye. Move up. Current position, "+((this.state.y2 < 150)?"1st.":(this.state.y2 < 260)?"2nd.":"3rd.")} alt={"Blue dye. Move up. Current position, "+((this.state.y2 < 150)?"1st.":(this.state.y2 < 260)?"2nd.":"3rd.")} src={this.getUpArrow(2)} />
              <img tabIndex="0" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.moveDown(2)} } onClick={(e)=> {this.moveDown(2)}} className="down-arrow" aria-label={"Blue dye. Move down. Current position, "+((this.state.y2 < 150)?"1st.":(this.state.y2 < 260)?"2nd.":"3rd.")} alt={"Blue dye. Move down. Current position, "+((this.state.y2 < 150)?"1st.":(this.state.y2 < 260)?"2nd.":"3rd.")} src={this.getDownArrow(2)} />
            </div>
          </div>
          <div id="lane-3" className="lane lane-3" draggable onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={(e)=>{e.preventDefault(); e.stopPropagation()}} onDragEnd={this.onDragEnd}>
            <div className="particle" style={{
              transform:
                "translate3d(0px, " +
                this.state.y3 +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              position: "absolute"
            }}>
              <img tabIndex="0" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.moveUp(3)} } onClick={(e)=> {this.moveUp(3)}} className="up-arrow" aria-label={"Purple dye. Move up. Current position, "+((this.state.y3 < 150)?"1st.":(this.state.y3 < 260)?"2nd.":"3rd.")} alt={"Purple dye. Move up. Current position, "+((this.state.y3 < 150)?"1st.":(this.state.y3 < 260)?"2nd.":"3rd.")} src={this.getUpArrow(3)} />
              <img tabIndex="0" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.moveDown(3)} } onClick={(e)=> {this.moveDown(3)}} className="down-arrow" aria-label={"Purple dye. Move down. Current position, "+((this.state.y3 < 150)?"1st.":(this.state.y3 < 260)?"2nd.":"3rd.")} alt={"Purple dye. Move down. Current position, "+((this.state.y3 < 150)?"1st.":(this.state.y3 < 260)?"2nd.":"3rd.")} src={this.getDownArrow(3)} />
            </div>
          </div>
        </div>
        <img alt="agarose gel" className="prediction-bg" style={{pointerEvents: 'none'}} src={Prediction}/>
      </div>
    );
  }
}

 const mapStateToProps = (state, ownProps) => {
   return {
       id: ownProps.id,
       type: state.gel.gels[ownProps.id-1].type,
       predictions: state.gel.gels[ownProps.id-1].prediction,
   }
}

export default connect(mapStateToProps,{
  pushInteractions,
  setGelPrediction,
})(Gel);
