import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Motion, spring } from 'react-motion';
import Controls from 'components/blottingPaper/Controls';

import imgCircle from './img/circle.svg';
import imgCircleOutline from './img/circle-outline.svg';
import Gel from './img/results.svg'

import { pushInteractions } from 'actions';

let expectedResult = [20, 15, 7.5, 2];

class Results extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="graphics">

        <p tabIndex={0}>These are your initial predictions.</p>
        <ul>
          {this.props.solutions.map((solution, index)=>(
            <li className="dropTarget"
                key={index} tabIndex={0} aria-label={'Blotting paper, position '+solution.id+', '+solution.prediction+' microliters'}>
              <div className="indicator">
                <img
                  className={"prediction"+solution.id}
                  style={{ pointerEvents: "none", width: ((solution.prediction / solution.maxVol) * 100)+"%" }}
                  src={imgCircle}
                  aria-label={this.props.type +' '+ solution.id}/>
              </div>
              <p className="zone-label volume"><span className="zone-label index">{solution.id}</span> | {solution.prediction}μl</p>
            </li>
          ))}
        </ul>
        <h5 tabIndex={0}>Actual Results</h5>
        <p tabIndex={0}>These are your results based on the volumes you pipetted.</p>
        <ul>
          {this.props.solutions.map((solution, index)=>(
            <li className='dropTarget'
                key={index} tabIndex={0} aria-label={'Blotting paper, position '+solution.id+', '+solution.volume+' microliters. '+(((Math.round(solution.volume * 10) / 10) === expectedResult[index])?"correct":"incorrect")}>
              <div className="indicator">
                <img
                  className={"result"+solution.id}
                  style={{ pointerEvents: "none", width: ((solution.volume / solution.maxVol) * 100)+'%' }}
                  src={imgCircle}
                  aria-label={this.props.type +' '+ solution.id}/>
              </div>
              <p className='zone-label volume'><span className="zone-label index">{solution.id}</span> | {Math.round( solution.volume * 10 ) / 10}μl</p>
              <p className={((Math.round(solution.volume * 10) / 10) === expectedResult[index])?"Correct":"Incorrect"}>
                {((Math.round(solution.volume * 10) / 10) === expectedResult[index])?"Correct!":"Incorrect!"}
              </p>
            </li>
          ))}
        </ul>
        <h5 tabIndex={0}>Ideal Results</h5>
        <p tabIndex={0}>These are the sizes you would expect to see if you pipetted the correct volumes.</p>
        <ul>
          {this.props.solutions.map((solution, index)=>(
            <li className='dropTarget'
                key={index} tabIndex={0} aria-label={'Blotting paper, position '+solution.id+', '+expectedResult[index]+' microliters'}>
              <div className="indicator">
                <img
                  className={"expectedresult"+solution.id}
                  style={{ pointerEvents: "none", width: ((expectedResult[index] / solution.maxVol) * 100)+'%' }}
                  src={imgCircle}
                  aria-label={this.props.type +' '+ solution.id}/>
              </div>
              <p className='zone-label volume'><span className="zone-label index">{solution.id}</span> | {expectedResult[index]}μl</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('state :: ', state);
  return {
      id: ownProps.id,
      type: state.gel.gels[ownProps.id-1].type,
      result: state.gel.gels[ownProps.id-1].result,
      lanes: state.gel.gels[ownProps.id-1].lanes
      solutions: state.blotPaper.blotPapers[ownProps.id-1].solutions
  };
};

export default connect(mapStateToProps, {
  pushInteractions
})(Results);
