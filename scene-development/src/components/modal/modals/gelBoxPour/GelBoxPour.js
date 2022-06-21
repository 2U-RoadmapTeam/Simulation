import React, { Component } from "react";
import { connect } from "react-redux";
import FocusLock from "react-focus-lock";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../../../toast/Toast'

import "./GelBoxPour.scss"
import colors from 'styles/_colors.scss'

import GelComb from './img/gelComb.svg';
import Gel from './img/gel.svg';
import GelBuffer from './img/gelBuffer.svg';
import GelCombBuffer from './img/gelCombBuffer.svg';
import GelBoxBuffer from './img/ProteinGelBoxBuffer.svg';
import GelBox from './img/ProteinGelBox.svg';


import {
  pushInteractions,
  incFlask,
  decFlask,
  setSolutionInGelBox,
  setSolutionInGel,
  showModal,
  isPouring
} from "actions";

const images = {
  Gel: Gel,
  GelComb: GelComb,
  GelBuffer: GelBuffer,
  GelCombBuffer: GelCombBuffer,
  GelBox: GelBox,
  GelBoxBuffer: GelBoxBuffer
};

class GelBoxPour extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  createGelImg = () => {
    let gelState = "Gel"+(this.props.gelComb?"Comb":"")+(this.props.gelBuffer?"Buffer":"")
    console.log("Gel string:",gelState);

    return (<img src={images[gelState]} alt="Cassette inside gelbox"/>)
  }

  createBoxImg = () => {
    let gelState = "Gel"+(this.props.gelComb?"Comb":"")+(this.props.gelBuffer?"Buffer":"")
    let gelBoxState = "GelBox"+(this.props.gelBoxBuffer?"Buffer":"")

    return (
      <div>
        <img className="inBoxGel" src={images[gelState]} alt="Cassette inside gelbox"/>
        <img src={images[gelBoxState]} alt="Out gelbox tank"/>
      </div>
      )

    //Remember to restrict modal from opening if no gel in box - fire popup warning
  }

  pourTank = () => {

    this.props.showModal({
      display: false
    });

    setTimeout(function(){

      var solutions = {};

      // Create a new solution object and populate it
      // with all the solutions in the flask
      if(this.props.volume > 0){
        for(var solute in this.props.solutions){
          console.log(this.props.solutions[solute], this.props.volume, this.props.interactionProps.gelBoxes[0].volume)
          solutions[solute] = this.props.solutions[solute] / (this.props.volume / this.props.interactionProps.gelBoxes[0].volume);
        }
      }

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

      this.props.decFlask({
        id: this.props.id,
        amount: 5000
      })

      this.props.setSolutionInGelBox({
        id: 1,
        solutions: solutions,
        solutionAlias: this.props.type,
        volume: 5000
      })

    }.bind(this), 200);
  }

  pourCassette = () => {

    this.props.showModal({
      display: false
    });

    setTimeout(function(){

      var solutions = {};

      // Create a new solution object and populate it
      // with all the solutions in the flask
      if(this.props.volume > 0){
        for(var solute in this.props.solutions){
          console.log(this.props.solutions[solute], this.props.volume, this.props.interactionProps.gelBoxes[0].volume)
          solutions[solute] = this.props.solutions[solute] / (this.props.volume / this.props.interactionProps.gelBoxes[0].volume);
        }
      }

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

      this.props.decFlask({
        id: this.props.id,
        amount: 5000
      })

      this.props.setSolutionInGel({
        id: 1,
        gelSolutions: solutions,
        gelSolutionAlias: this.props.type,
        volume: 5000
      })

    }.bind(this), 200);
  }

  renderOptions = () => {

  }

render () {
    return (
        <FocusLock>
          <div className="modal-section">
            <div className="modal-header">
              <h2> Where do you pour the solution? </h2>
            </div>

            <div className="modal-body">
              <div className="gelbox-pour-modal-inner">
                <div style={{position: "absolute", left: "0", top: "0", width: "100%", height: "100%"}}>
                  <div className="wrapper">
                    <div className="side" onClick={this.pourCassette}>
                      <h4>Gel cassette</h4>
                      {/* <img onClick={this.pourCassette} src={images['GelComb']} alt="Cassette inside gelbox"/> */}
                      {this.createGelImg()}
                    </div>
                    <div className="side" onClick={this.pourTank} >
                      <h4>Outer gelbox tank</h4>
                      {/* <img onClick={this.pourTank} src={images['GelBoxFull']} alt="Out gelbox tank"/> */}
                      {this.createBoxImg()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </FocusLock>
    );
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    volume: state.flask.flasks[ownProps.id-1].volume,
    solutions: state.flask.flasks[ownProps.id-1].solutions,
    type: state.flask.flasks[ownProps.id-1].type,
    interactionProps: {
      gelBoxes: state.gelBox.gelBoxes,
    },
    //Gel State:
    gelComb: state.gel.gels[ownProps.id-1].comb,
    gelBuffer: state.gelBox.gelBoxes[0].gelVolume>0?true:false,
    //Gel Box State:
    gelBoxBuffer: state.gelBox.gelBoxes[0].volume>0?true:false,
  };
};

export default connect(
  mapStateToProps,
  {
    pushInteractions,
    incFlask,
    decFlask,
    setSolutionInGelBox,
    setSolutionInGel,
    showModal,
    isPouring
  }
)(GelBoxPour);
