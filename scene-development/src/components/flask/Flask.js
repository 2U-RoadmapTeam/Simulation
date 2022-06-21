import React, { Component } from "react"
import { connect } from "react-redux"
import Graphics from 'components/flask/Graphics'

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../toast/Toast'
import MoveMenu from "./MoveMenu"

import {
  pushInteractions,
  incFlask,
  decFlask,
  setSolutionInGelBox,
  isPouring,
  setFlaskHeld,
  setMoveMenu,
  showMoveMenu,
  setFlaskControlVisibility,
  hideAllControls,
  showModal,
  setModal
 } from '../../actions'

import Move from "./img/move.svg";

import './Flask.scss'
import colors from 'styles/_colors.scss'

class Flask extends Component {
constructor(props) {
  super(props)

  this.state = {}

  const interactions = (heldObj, target) => {
    //Don't run if this flask not the held object
    if(heldObj.type !== "flask" || heldObj.id !== this.props.id){
      return null;
    }
    if (target === undefined || target === null) {
      return null;
    }

    //All GelBox interactions
    if (target.type === "GelBox") {
      //Get the targeted GelBox
      const gelsID = target.id
      const targetGelBox = this.props.interactionProps.gelBoxes[gelsID - 1]

      if(targetGelBox.open) {

        if(targetGelBox.type == "Protein Gel Electrophoresis Box"){

          if(this.props.interactionProps.boxContainsGel){
            this.props.setModal({
              type: "GEL_BOX_POUR",
              size: "lg",
              connect: this.props.id
            });
            this.props.showModal({ display: true });
          } else {
            this.makeToast("WARNING", "You must place a gel in the gel box before adding a buffer.", "No Gel in Gel Box!")
          }

        this.props.decFlask({
          id: this.props.id,
          amount: 25000
        })


        } else if(targetGelBox.type == "Gel Electrophoresis Box"){

          var solutions = {};

          // Create a new solution object and populate it
          // with all the solutions in the flask
          if(this.props.volume > 0){
            for(var solute in this.props.solutions){
              console.log(this.props.solutions[solute], this.props.volume, targetGelBox.volume)
              solutions[solute] = this.props.solutions[solute] / (this.props.volume / targetGelBox.volume);
            }
          }

          console.log(solutions);

          this.props.decFlask({
            id: this.props.id,
            amount: 25000
          })

          this.props.setSolutionInGelBox({
            id: gelsID,
            solutions: solutions,
            solutionAlias: this.props.type,
            volume: 25000
          })

          if(this.props.volume !== 0){

            this.props.isPouring({
              id: this.props.id,
              pour: true
            })

            setTimeout(function(){
              this.props.isPouring({
                id: this.props.id,
                pour: false
              })
            }.bind(this), 800);
          }
        }

      } else {
        //Alert - open tip box
        this.makeToast("WARNING", "You must open the gel box first.", "Gel Box is closed!")
      }
    } else {
      return null
    }
  }

  Object.defineProperty(interactions, 'name', {value: ('flask_interactions_'+this.props.id), configurable: true});
  this.props.pushInteractions([interactions])
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

showControls = ()=> {
  this.props.hideAllControls();
  // Show the flask - hide the others
  this.props.setFlaskControlVisibility({id: this.props.id, controlsVisible: true});
}

flaskSelected = () => {
  if(!this.props.controlsVisible){
      this.showControls()
  }

  this.props.setFlaskHeld({
    id: this.props.id,
    held: true,
  })
}

flaskUnselected = () => {
  this.props.setFlaskHeld({
    id: this.props.id,
    held: false,
  })
}

showMoveMenu = e => {

  this.props.setMoveMenu({
    type: this.props.type,
    connect: this.props.id
  });
  this.props.showMoveMenu({ display: !this.props.moveMenuDisplay });
};

  render() {
      return (
        <ul style={{zIndex: (this.props.controlsVisible)?99:null}}>
          <li draggable
              aria-label={this.props.type+"Flask"}
              id={'flask_'+this.props.id}
              onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.flaskSelected() } }
              onMouseDown={this.flaskSelected}
              onMouseUp={this.flaskUnselected}
              tabIndex={0}
              className={'flask draggable dropTarget'+((this.props.open)?' open':'')}
              style={{ transform: "translate3d(0px, 0px, 0px) rotateZ(0deg)" }}>
              <p className="label" aria-hidden="true">{this.props.type}</p>
              <Graphics id={this.props.id} />
              <div className="move-menu" style={{ display: this.props.controlsVisible ? null : "none" }}>
                <button
                  tabIndex={0}
                  className="move-button"
                  onClick={this.showMoveMenu}
                  aria-label="Move menu. Select to view the available positions."
                >
                  <img src={Move} alt="Move menu icon." />
                </button>
                <MoveMenu type={this.props.type} connect={this.props.id} />
              </div>
          </li>
        </ul>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        volume: state.flask.flasks[ownProps.id-1].volume,
        solutions: state.flask.flasks[ownProps.id-1].solutions,
        type: state.flask.flasks[ownProps.id-1].type,
        moveMenuDisplay: state.moveMenu.display,
        controlsVisible: state.flask.flasks[ownProps.id-1].controlsVisible,
        interactionProps: {
          gelBoxes: state.gelBox.gelBoxes,
          boxContainsGel: state.gelBox.gelBoxes[0].containsGel,
        },

    };
};

export default connect(mapStateToProps, {
  pushInteractions,
  incFlask,
  decFlask,
  setSolutionInGelBox,
  isPouring,
  setFlaskHeld,
  setMoveMenu,
  showMoveMenu,
  setFlaskControlVisibility,
  hideAllControls,
  showModal,
  setModal
})(Flask);
