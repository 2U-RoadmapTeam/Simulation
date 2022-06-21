import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setSCQResponse,
  validateSCQ
} from '../../../actions';

import './SingleChoiceQuestion.scss';

class SCQ extends Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  handleRadioChange = (e) => {
    this.props.setSCQResponse({id: this.props.id, index: e.target.value, checked: !this.props.choices[e.target.value].checked});
  }

  handleRadioChangeKey = (e) => {
    this.props.setSCQResponse({id: this.props.id, index: e.target.previousSibling.value, checked: !this.props.choices[e.target.previousSibling.value].checked});
  }

  validateSCQ = () => {
    this.props.validateSCQ({id: this.props.id});
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.correct !== prevProps.correct){
      this.answered.focus();
    }
  }

    render() {
        const questionIndex = this.props.index

        return (
          <div className="singleChoiceQuestion">
            <p className="label" aria-label={"Question "+(this.props.index+1)+", "+this.props.label.replace('________________', 'blank')} tabIndex={0}>{(this.props.index + 1) +". "+ this.props.label}</p>
            {(this.props.image)?<div className="image-bg" tabIndex={0}> <img className="questionImage" alt="Question" aria-label={this.props.ariaLabel} src={require('../../notebook/notebookPopout/reflection/img/'+this.props.image)}/> </div> : null }
            {this.props.choices.map((option, index) => (
              <div className="input" key={index}>
                <input
                  id={'scq'+questionIndex+index}
                  className={(option.correct === null)?"":(option.correct)?"correct":"incorrect"}
                  type="radio"
                  name={"answer"+this.props.index}
                  value={index}
                  onClick={this.handleRadioChange}
                  checked={option.checked}
                  tabIndex={-1}
                  disabled={((this.props.attempts > 0 || this.props.attempts === "unlimited") && (this.props.correct === false || this.props.correct === null || this.props.attempts === "unlimited"))?false:true}/>
                <label ref={(option.checked)?(answered) => {this.answered = answered}:null} onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.handleRadioChangeKey(e)} } tabIndex={0} htmlFor={'scq'+questionIndex+index} className="response" aria-label={((option.checked)?"selected, ":"") + ((option.correct !== null)?((option.correct === true)?"correct, ":"incorrect, "):"") + this.props.id + String.fromCharCode(97 + index)+", "+option.label}><span aria-hidden="true" className="checkmark">{String.fromCharCode(97 + index).toUpperCase()}</span>{option.label}</label>
                <div className="feedback" tabIndex={(option.correct !== null)?"0":null} style={{display: (option.hasOwnProperty('feedback') && option.feedback !== '')?'initial':'none'}}>
                  <p>{( (option.correct === null)? "": "Feedback: "+option.feedback )}</p>
                </div>
              </div>
            ))}
            <div className="question-footer">
              <p tabIndex={0}>{"Attempts left: "+this.props.attempts}</p>
              <button
                onClick={this.validateSCQ}
                disabled={((this.props.attempts > 0 || this.props.attempts === "unlimited") && (this.props.correct === false || this.props.correct === null || this.props.attempts === "unlimited") && this.props.anyResponse)?false:true}>Submit answer</button>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

  return {
    id: ownProps.id,
    choices: state.SCQ.SCQs[ownProps.id-1].choices,
    label: state.SCQ.SCQs[ownProps.id-1].label,
    attempts: state.SCQ.SCQs[ownProps.id-1].attempts,
    answer: state.SCQ.SCQs[ownProps.id-1].answer,
    response: state.SCQ.SCQs[ownProps.id-1].response,
    correct: state.SCQ.SCQs[ownProps.id-1].correct,
    anyResponse: state.SCQ.SCQs[ownProps.id-1].anyResponse,
    image: state.SCQ.SCQs[ownProps.id-1].image,
    ariaLabel: state.SCQ.SCQs[ownProps.id-1].ariaLabel,
  }
}

export default connect(mapStateToProps, {
  setSCQResponse,
  validateSCQ
})(SCQ);
