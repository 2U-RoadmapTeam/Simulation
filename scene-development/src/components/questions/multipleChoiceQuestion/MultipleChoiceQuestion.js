import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setMCQResponse,
  validateMCQ
} from '../../../actions';

import './MultipleChoiceQuestion.scss';

class MCQ extends Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  handleCheckboxChange = (e) => {
    this.props.setMCQResponse({id: this.props.id, index: e.target.value, checked: !this.props.choices[e.target.value].checked});
  }

  validateMCQ = () => {
    this.props.validateMCQ({id: this.props.id});
  }

    render() {
        return (
          <div className="multipleChoiceQuestion">
            <p className="label">{(this.props.index + 1) +". "+ this.props.label}</p>
            {(this.props.image)?<img className="questionImage" src={require('../../notebook/notebookPopout/reflection/img/'+this.props.image)} alt="Question"/>:null}
            {this.props.choices.map((option, index) => (
              <div className="input" key={index}>
                <input
                  className={(option.correct === null)?"":(option.correct)?"correct":"incorrect"}
                  type="checkbox"
                  name={"answer"+this.props.index}
                  value={index}
                  onClick={this.handleCheckboxChange}
                  checked={option.checked}
                  disabled={(this.props.attempts > 0 && (this.props.correct === false || this.props.correct === null))?false:true}/>
                <p className="response"><span className="checkmark">{String.fromCharCode(97 + index).toUpperCase()}</span>{option.label}</p>
              </div>
            ))}
            <div className="question-footer">
              <p>{"Attempts left: "+this.props.attempts}</p>
              <button
                onClick={this.validateMCQ}
                disabled={(this.props.attempts > 0 && (this.props.correct === false || this.props.correct === null) && this.props.anyResponse)?false:true}>Submit answer</button>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    choices: state.MCQ.MCQs[ownProps.id-1].choices,
    label: state.MCQ.MCQs[ownProps.id-1].label,
    attempts: state.MCQ.MCQs[ownProps.id-1].attempts,
    answer: state.MCQ.MCQs[ownProps.id-1].answer,
    response: state.MCQ.MCQs[ownProps.id-1].response,
    correct: state.MCQ.MCQs[ownProps.id-1].correct,
    anyResponse: state.MCQ.MCQs[ownProps.id-1].anyResponse,
    image: state.MCQ.MCQs[ownProps.id-1].image,
  }
}

export default connect(mapStateToProps, {
  setMCQResponse,
  validateMCQ
})(MCQ);
