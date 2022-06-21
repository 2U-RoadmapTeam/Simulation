import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setPSCQResponse,
  validatePSCQ
} from '../../../actions';

import './PredictionsChoiceQuestion.scss';

class PSCQ extends Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  handleRadioChange = (e) => {
    const isChecked = e.target.checked;
    this.props.setPSCQResponse({id: this.props.id, index: e.target.value, checked: !this.props.choices[e.target.value].checked});
  }

  handleRadioChangeKey = (e) => {
    const isChecked = e.target.previousSibling.checked;
    this.props.setPSCQResponse({id: this.props.id, index: e.target.previousSibling.value, checked: !this.props.choices[e.target.previousSibling.value].checked});
  }

  validatePSCQ = () => {
    this.props.validatePSCQ({id: this.props.id});
  }

    render() {
        const questionIndex = this.props.index

        return (
          <div className="predictionsChoiceQuestion">
            <div className="predictionsChoiceQuestion-inner-wrap">
              <h4 className="label" tabIndex={0}>{(this.props.index + 1) +". "+ this.props.label}</h4>
              <p tabIndex={0} dangerouslySetInnerHTML={{__html: (this.props.text) ? this.props.text : ''}}></p>
              {this.props.choices.map((option, index) => (
                <div className='option'>
                  <div className="input" key={index}>
                    <input
                      id={'scq'+questionIndex+index}
                      className={(option.correct == null)?"":(option.correct)?"correct":"incorrect"}
                      type="radio"
                      name={"answer"+this.props.index}
                      value={index}
                      onClick={this.handleRadioChange}
                      checked={option.checked}
                      tabIndex={-1}
                      disabled={((this.props.attempts > 0 || this.props.attempts == "unlimited") && (this.props.correct == false || this.props.correct == null || this.props.attempts == "unlimited"))?false:true}/>
                    <label onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.handleRadioChangeKey(e)} } tabIndex={0} htmlFor={'scq'+questionIndex+index} className="response" aria-label={((option.checked)?"selected, ":"") + ((option.correct !== null)?((option.correct === true)?"correct, ":"incorrect, "):"") + this.props.id + String.fromCharCode(97 + index)+", "+option.label}><span className="checkmark" aria-hidden={true}>{String.fromCharCode(97 + index).toUpperCase()}</span>{option.label}</label>
                    {(this.props.choices[index].image) ? (<img className="predictionImage" alt="Option image" src={require('../../notebook/notebookPopout/predictions/img/'+this.props.choices[index].image)} />) : null }
                  </div>
                  <div className={"feedback " + ((option.correct == null)?"":(option.correct)?"correct":"incorrect")} key={index}
                       style={{display: (option.correct === null)?'none':'initial'}}>
                    <div>
                      <p tabIndex={0}>{option.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="question-footer">
              <p tabIndex={0}>{"Attempts left: "+this.props.attempts}</p>
              <button
                onClick={this.validatePSCQ}
                disabled={((this.props.attempts > 0 || this.props.attempts == "unlimited") && (this.props.correct === false || this.props.correct === null || this.props.attempts == "unlimited") && this.props.anyResponse)?false:true}>Submit answer</button>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

  return {
    id: ownProps.id,
    choices: state.PSCQ.PSCQs[ownProps.id-1].choices,
    label: state.PSCQ.PSCQs[ownProps.id-1].label,
    text: state.PSCQ.PSCQs[ownProps.id-1].text,
    attempts: state.PSCQ.PSCQs[ownProps.id-1].attempts,
    answer: state.PSCQ.PSCQs[ownProps.id-1].answer,
    response: state.PSCQ.PSCQs[ownProps.id-1].response,
    feedback: state.PSCQ.PSCQs[ownProps.id-1].feedback,
    correct: state.PSCQ.PSCQs[ownProps.id-1].correct,
    anyResponse: state.PSCQ.PSCQs[ownProps.id-1].anyResponse,
    image: state.PSCQ.PSCQs[ownProps.id-1].image,
  }
}

export default connect(mapStateToProps, {
  setPSCQResponse,
  validatePSCQ
})(PSCQ);
