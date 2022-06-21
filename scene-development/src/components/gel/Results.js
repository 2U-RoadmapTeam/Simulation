import React, { Component } from "react";
import { connect } from "react-redux";

import {
  pushInteractions,
  //setGelPrediction,
 } from '../../actions';

import "./Gel.scss";

import Prediction180 from './img/result.svg'
import Prediction270 from './img/result1.svg'
import Prediction0 from './img/result2.svg'
import Prediction90 from './img/result3.svg'

const images = {
  "0": Prediction0,
  "90": Prediction90,
  "180": Prediction180,
  "270": Prediction270,
  "360": Prediction0,
}

class Gel extends Component {
constructor(props) {
  super(props);

  this.state = {
  }

}

render(){
  return (
      <div className="Gel-results">
        <div tabIndex={0} aria-label={"Predicted results. Yellow dye current position, "+((this.props.predictions.lane1 < 150)?"1st.":(this.props.predictions.lane1 < 260)?"2nd.":"3rd.")+" Blue dye current position, "+((this.props.predictions.lane2 < 150)?"1st.":(this.props.predictions.lane2 < 260)?"2nd.":"3rd.")+" Purple dye current position, "+((this.props.predictions.lane3 < 150)?"1st.":(this.props.predictions.lane3 < 260)?"2nd.":"3rd.")} className="lanes predictions">
          <div id="lane-1" className="lane lane-1">
            <div className="particle" style={{
              transform:
                "translate3d(0px, " +
                (this.props.predictions.lane1 * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              position: "absolute"
            }}></div>
          </div>
          <div id="lane-2" className="lane lane-2">
            <div className="particle" style={{
              transform:
                "translate3d(0px, " +
                  (this.props.predictions.lane2 * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              position: "absolute"
            }}></div>
          </div>
          <div id="lane-3" className="lane lane-3">
            <div className="particle" style={{
              transform:
                "translate3d(0px, " +
                  (this.props.predictions.lane3 * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              position: "absolute"
            }}></div>
          </div>
        </div>
        <div tabIndex={0} aria-label="Actual results. The blue dye is closest to the well, the yellow dye is furthest, and the purple dye is in between the two." className="lanes results" style={{display: ((this.props.orientation === 180)?'initial':'none')}}>
          <div id="lane-1" className="lane lane-1">
            <div className="particle" style={{
              display: (this.props.lanes.lane1.solutions.hasOwnProperty("Yellow Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane1.YellowDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane1.solutions.hasOwnProperty("Yellow Dye"))?(this.props.lanes.lane1.solutions["Yellow Dye"] / 10):0),
              position: "absolute"
            }}></div>
            <div className="particle" style={{
              display: (this.props.lanes.lane1.solutions.hasOwnProperty("Blue Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane1.BlueDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane1.solutions.hasOwnProperty("Blue Dye"))?(this.props.lanes.lane1.solutions["Blue Dye"] / 10):0),
              position: "absolute"
            }}></div>
            <div className="particle" style={{
              display: (this.props.lanes.lane1.solutions.hasOwnProperty("Purple Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane1.PurpleDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane1.solutions.hasOwnProperty("Purple Dye"))?(this.props.lanes.lane1.solutions["Purple Dye"] / 10):0),
              position: "absolute"
            }}></div>
          </div>
          <div id="lane-2" className="lane lane-2" >
            <div className="particle" style={{
              display: (this.props.lanes.lane2.solutions.hasOwnProperty("Yellow Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane2.YellowDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane2.solutions.hasOwnProperty("Yellow Dye"))?(this.props.lanes.lane2.solutions["Yellow Dye"] / 10):0),
              position: "absolute"
            }}></div>
            <div className="particle" style={{
              display: (this.props.lanes.lane2.solutions.hasOwnProperty("Blue Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane2.BlueDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane2.solutions.hasOwnProperty("Blue Dye"))?(this.props.lanes.lane2.solutions["Blue Dye"] / 10):0),
              position: "absolute"
            }}></div>
            <div className="particle" style={{
              display: (this.props.lanes.lane2.solutions.hasOwnProperty("Purple Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane2.PurpleDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane2.solutions.hasOwnProperty("Purple Dye"))?(this.props.lanes.lane2.solutions["Purple Dye"] / 10):0),
              position: "absolute"
            }}></div>
          </div>
          <div id="lane-3" className="lane lane-3">
            <div className="particle" style={{
              display: (this.props.lanes.lane3.solutions.hasOwnProperty("Yellow Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane3.YellowDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane3.solutions.hasOwnProperty("Yellow Dye"))?(this.props.lanes.lane3.solutions["Yellow Dye"] / 10):0),
              position: "absolute"
            }}></div>
            <div className="particle" style={{
              display: (this.props.lanes.lane3.solutions.hasOwnProperty("Blue Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane3.BlueDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane3.solutions.hasOwnProperty("Blue Dye"))?(this.props.lanes.lane3.solutions["Blue Dye"] / 10):0),
              position: "absolute"
            }}></div>
            <div className="particle" style={{
              display: (this.props.lanes.lane3.solutions.hasOwnProperty("Purple Dye"))?null:'none',
              transform:
                "translate3d(0px, " +
                  (this.props.results.lane3.PurpleDye * 0.7) +
                "px, 0px) rotateZ(0deg)",
              zIndex: 10,
              opacity: ((this.props.lanes.lane3.solutions.hasOwnProperty("Purple Dye"))?(this.props.lanes.lane3.solutions["Purple Dye"] / 10):0),
              position: "absolute"
            }}></div>
          </div>
        </div>
        <img alt="agarose gel" className="result-bg" style={{pointerEvents: 'none'}} src={images[this.props.orientation]}/>
      </div>
    );
  }
}

 const mapStateToProps = (state, ownProps) => {
   return {
       id: ownProps.id,
       type: state.gel.gels[ownProps.id-1].type,
       target: state.scene.lastDrop.lastTarget,
       predictions: state.gel.gels[ownProps.id-1].prediction,
       results: state.gel.gels[ownProps.id-1].results,
       lanes: state.gel.gels[ownProps.id-1].lanes,
       orientation: state.gelBox.gelBoxes[0].gelOrientation
   }
}

export default connect(mapStateToProps,{
  pushInteractions,
  //setGelPrediction,
})(Gel);
