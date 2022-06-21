import React, { Component } from 'react';
import { connect } from 'react-redux';
import imgCircle from './img/circle.svg';

class Graphics extends Component {
  render(){
    return(
      <div className={'graphics BlottingPaper'}>
        <ul>
          {this.props.solutions.map((solution, index)=>(
            <li className='dropTarget'
                key={index}>
              <p className='zone-label index'>{solution.id}</p>
              <div className="indicator">
                <img
                  className={"result"+solution.id}
                  style={{ pointerEvents: "none", width: ((solution.volume / solution.maxVol) * 100)+'%' }}
                  src={imgCircle}
                  alt="Blot area."
                  aria-hidden={this.props.context==="Materials"?"true":"false"}
                />
              </div>
              <p className='zone-label volume'>{solution.volume}μl</p>
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

export default connect(mapStateToProps)(Graphics);
