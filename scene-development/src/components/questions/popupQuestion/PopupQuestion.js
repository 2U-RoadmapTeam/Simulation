import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setPopupResponse,
  validatePopup
} from '../../../actions';

import './PopupQuestion.scss';

class Popup extends Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  handleRadioChange = (e) => {
    const isChecked = e.target.checked;
    this.props.setPopupResponse({id: this.props.id, index: e.target.value, checked: !this.props.choices[e.target.value].checked});
  }

  handleRadioChangeKey = (e) => {
    const isChecked = e.target.previousSibling.checked;
    this.props.setPopupResponse({id: this.props.id, index: e.target.previousSibling.value, checked: !this.props.choices[e.target.previousSibling.value].checked});
  }

  validatePopup = () => {
    this.props.validatePopup({id: this.props.id});
  }

    render() {
        const questionIndex = this.props.index

        return (
          <div className="popupQuestion">
            <p className="label" tabIndex={0}>{(this.props.index + 1) +". "+ this.props.label}</p>
            { (this.props.image) ? <div className="image-bg" tabIndex={0}> <img className="questionImage" src={require('../../notebook/notebookPopout/reflection/img/'+this.props.image)}/> </div> : null }

            {this.props.choices.map((option, index) => (
              <div className='option'>
                <div className="input">
                  <input
                    id={'popup'+questionIndex+index}
                    className={(option.correct == null)?"":(option.correct)?"correct":"incorrect"}
                    type="radio"
                    name={"answer"+this.props.index}
                    value={index}
                    onClick={this.handleRadioChange}
                    defaultChecked={option.checked}
                    tabIndex={-1}
                    disabled={((this.props.attempts > 0 || this.props.attempts == "unlimited") && (this.props.correct == false || this.props.correct == null || this.props.attempts == "unlimited"))?false:true}/>
                  <label onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.handleRadioChangeKey(e)} } tabIndex={0} htmlFor={'popup'+questionIndex+index} className="response"><span className="checkmark">{String.fromCharCode(97 + index).toUpperCase()}</span>{option.label}</label>
                </div>
                <div className={"feedback " + ((option.correct == null)?"":(option.correct)?"correct":"incorrect")} key={index}
                     style={{display: (option.correct === null)?'none':'initial'}}>
                  <div>
                    <p>{option.feedback}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="question-footer">
              <p tabIndex={0}>{"Attempts left: "+this.props.attempts}</p>
              <button
                onClick={this.validatePopup}
                disabled={((this.props.attempts > 0 || this.props.attempts == "unlimited") && (this.props.correct === false || this.props.correct === null || this.props.attempts == "unlimited") && this.props.anyResponse)?false:true}>Submit answer</button>
            </div> */}
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    choices: state.popup.popups[ownProps.id-1].choices,
    label: state.popup.popups[ownProps.id-1].label,
    attempts: state.popup.popups[ownProps.id-1].attempts,
    answer: state.popup.popups[ownProps.id-1].answer,
    response: state.popup.popups[ownProps.id-1].response,
    correct: state.popup.popups[ownProps.id-1].correct,
    anyResponse: state.popup.popups[ownProps.id-1].anyResponse,
    image: state.popup.popups[ownProps.id-1].image,
  }
}

export default connect(mapStateToProps, {
  setPopupResponse,
  validatePopup
})(Popup);
