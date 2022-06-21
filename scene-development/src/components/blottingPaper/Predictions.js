import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Motion, spring } from 'react-motion';
import Controls from 'components/blottingPaper/Controls';

import imgCircle from './img/circle.svg';
import imgCircleOutline from './img/circle-outline.svg';

let expectedResult = [20, 15, 7.5, 2];

class Predictions extends Component {

  render(){
    return(
      <div className="graphics">
        <h5 tabIndex={0}>Estimate the size of each blot if you set the micropipette to:</h5>
        <ul>
          <li className="dropTarget">
            <p className="zone-label volume" aria-label={"Blotting paper sample, demonstrating 10μl size."}  tabIndex="0">10μl</p>
            <div className="indicator">
              <img
                className="predictionSample"
                style={{ pointerEvents: "none", width: ((10 / this.props.solutions[0].maxVol) * 100)+"%" }}
                src={imgCircle}
                tabIndex={0}
                aria-label={this.props.type +' sample, 10 microliters'} />
            </div>
            <p className="zone-label index">Sample</p>
          </li>
          {this.props.solutions.map((solution, index)=>(
            <li className="dropTarget"
                key={index}>
              <p className="zone-label volume" aria-label={"Blotting paper position" + solution.id + ", predict " + expectedResult[index] + "μl size."} tabIndex="0">{expectedResult[index]}μl</p>
              <div className="indicator">
                <Controls id={this.props.id} index={index}/>
                <img
                  className={"prediction"+solution.id}
                  style={{ pointerEvents: "none", width: ((solution.prediction / solution.maxVol) * 100)+"%" }}
                  src={imgCircle}
                  tabIndex={0}
                  aria-label={this.props.type+' position '+solution.id+', '+solution.prediction+' microliters'} />
              </div>
              <p className="zone-label index">{solution.id}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        solutions: state.blotPaper.blotPapers[ownProps.id-1].solutions,
        type: state.blotPaper.blotPapers[ownProps.id-1].type
    };
};

export default connect(mapStateToProps)(Predictions);
