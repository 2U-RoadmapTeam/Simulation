import React, { Component } from 'react'
import { connect } from 'react-redux'
import { calculatePosition, teleport } from '../../lib/hotspot'

import {
  setFlaskControlVisibility,
  setHeldObject,
  setFlaskHeld,
  setMoveMenu,
  showMoveMenu
} from '../../actions';

class MoveMenu extends Component {

constructor(props) {
  super(props)

  this.state = {
  }
}

  toggle = () => {
      this.props.showMoveMenu({display: !this.props.display});
  }
  hide = () => {
      this.props.showMoveMenu({display: false});
  }
  show = () => {
      this.props.showMoveMenu({display: true});
  }

  showTeleportBtns = () => {

    //Getting all flask targets
    let btnArr = Array.from(this.props.targetList)

    let outArr = []

    btnArr.forEach(btn => {

      let label = btn.getElementsByClassName("label")[0];

      (typeof label === 'object')?label = label.innerText: label = ''

      if(label === "Pipette rack"){
        label = "Shelf"
      }

      outArr.push(
        <button
        key={btn.id}
        onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.teleportTo(btn, e)} }
        onKeyUp={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.teleportTo(btn, e)} }
        onMouseDown={(e) => {this.teleportTo(btn, e)}}
        onMouseUp={(e) => {this.teleportTo(btn, e)}}>
          {label}
        </button>
      )
    });

    return outArr
  }

  teleportTo = (elem, e) => {
    if(e.keyCode !== 9){

      let targetData = calculatePosition(elem)
      targetData.elem = elem

      console.log(this.props.type, this.props.connect);

      const thisObj = document.getElementById("flask_"+this.props.connect);

      console.log(thisObj);

      // First update the held state to trigger the interactions
      if(e.type === "mousedown" || e.type === "keydown"){

        //Set held object in redux to this data:
        this.props.setHeldObject({
          type: "flask",
          id: this.props.connect,
          htmlObj: thisObj,
        })

        //Change pipette's state to held = true
        this.props.setFlaskHeld({
          id: this.props.connect,
          held: true,
        })

      } else if(e.type === "mouseup" || e.type === "keyup") {

        if(elem.id === "PipetteRack_1"){
          // Reset position
          thisObj.style.transform="translate3d(0,0,0) rotate(0)"
        } else {
          teleport(thisObj, targetData)
        }

        //Change flask's state to held = false
        this.props.setFlaskHeld({
          id: this.props.connect,
          held: false,
        })

        //Clear held object
        this.props.setHeldObject({
          type: null,
          id: -1,
          htmlObj: null,
        })

        //this.props.showMoveMenu({display: true});
      }
    }
  }


  render(){
    return(
      <div className="move-box">
        <div className="wrapper">
          <div
            style={{display: (this.props.display)?null:'none'}}
            className="collapse"
            aria-hidden={!this.props.display}
            tabIndex={(this.props.display)? null: -1}>
            <div className="move-dialog">
              <div className="move-dialog-head">
                <h5 tabIndex="0">Move Menu</h5>
                <div tabIndex="0" className="close" onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.hide() } } onClick={this.hide}><p>Close</p></div>
              </div>
              <div className="move-dialog-body">
                {this.showTeleportBtns()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    targetList: state.scene.targetList,
    display: state.moveMenu.display,
    type: ownProps.type,
    connect: ownProps.connect
  }
}

export default connect(mapStateToProps, {
  setFlaskControlVisibility,
  setHeldObject,
  setFlaskHeld,
  setMoveMenu,
  showMoveMenu
})(MoveMenu);
