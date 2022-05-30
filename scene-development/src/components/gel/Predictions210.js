import React, { Component } from "react";
import { connect } from 'react-redux'

import {
  setDigestPrediction,
} from '../../actions';

import "./Predictions.scss";

import PlasmidImg from "./img/restriction_digest.svg";

class Predictions210 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: this.props.prediction
    }
  }

  numsOnly = (text) =>{
    return text.replace(/\D/g,'');
  }

  textChanged = (index,e) => {
    let temp = this.state.prediction
    temp[index-1] = (e.target.value)

    if(index<7){
      temp[index-1] = this.numsOnly(e.target.value)
    } else {
      temp[index-1] = (e.target.value)
    }

    if(e.target.value !== temp[index - 1]){

      e.target.setCustomValidity('Please input an integer');
      e.target.reportValidity();
    } else {
      e.target.setCustomValidity('');
    }

    this.setState({
      prediction: temp
    });
  };

  submitPrediction = () => {
    this.props.setDigestPrediction({
      id: 1,
      prediction: this.state.prediction
    });
  }

  buildQ1 = () => {
    return (
      <div className="innerQBlock">
        <p>
          1. Based on these plasmid maps, how many fragments do you expect to
          create if using both BamHI and HindIII? Type your answer for each plasmid into the text entry fields:
        </p>
        <div className="answerLine">
        <div className="input">
          <label className="answerLineText plasmidName">a. pKAN-R:</label>
          <input
            type="text"
            placeholder="Type your answer here"
            className="text-field"
            onChange={(e)=>this.textChanged(1,e)}
            value={this.props.prediction[0]} />
            {/* id
            onChange={this.textChanged}
            onSubmit={this.submited} /> */}
        </div>
        <div className="input">
          <label className="answerLineText plasmidName">b. pARA:</label>
          <input
            type="text"
            placeholder="Type your answer here"
            className="text-field"
            onChange={(e)=>this.textChanged(2,e)}
            value={this.props.prediction[1]} />
        </div>
        </div>
      </div>
    );
  };

  buildQ2 = () => {
    return (
      <div className="innerQBlock">
        <p>
          2. Based on these plasmid maps, what are the expected fragment sizes
          that are produced? Type your answers into the text entry fields.
        </p>
        <div className="answerLine">
          <div class="input">
            <label className="answerLineText plasmidName">a. pKAN-R:</label>
            <input
              type="text"
              placeholder="Type your answer here"
              className="text-field"
              onChange={(e)=>this.textChanged(3,e)}
              value={this.props.prediction[2]} />
          </div>
          <div class="input">
            <label className="answerLineText">and</label>
            <input
              type="text"
              placeholder="Type your answer here"
              className="text-field"
              onChange={(e)=>this.textChanged(4,e)}
              value={this.props.prediction[3]} />
          </div>
        </div>
        <div className="answerLine">
          <div class="input">
            <label className="answerLineText plasmidName">b. pARA:</label>
            <input
              type="text"
              placeholder="Type your answer here"
              className="text-field"
              onChange={(e)=>this.textChanged(5,e)}
              value={this.props.prediction[4]} />
          </div>
          <div className="input">
            <label className="answerLineText">and</label>
            <input
              type="text"
              placeholder="Type your answer here"
              className="text-field"
              onChange={(e)=>this.textChanged(6,e)} value={this.props.prediction[5]}/>
          </div>
        </div>
      </div>
    );
  };

  buildQ3 = () => {
    return (
      <div className="innerQBlock">
        <p>
          3. What components will be found in each fragment? Reconstruct the
          four fragments you should be left with by typing the correct component
          names in each fragment.
        </p>

        <div className="choicesLine">

          <div className="choiceList">
            <div className="choiceListItem kanR"> kanR </div>
            <div className="choiceListItem rfp"> rfp </div>
            <div className="choiceListItem pbad"> pBAD </div>
            <div className="choiceListItem ampr"> ampR </div>
            <div className="choiceListItem arac"> araC </div>
            <div className="choiceListItem ori"> ori </div>
            <div className="choiceListItem nogene"> no gene </div>
          </div>

          <div className="answerCol">

            <div className="answerCol-left">
              <label className="answerLineText plasmidName">a. pKAN-R:</label>

              <input
                type="text"
                placeholder="Type your answer here"
                className="text-field-col"
                onDrop=""
                onChange={e => this.textChanged(7, e)}
                value={this.props.prediction[6]}
              />
              <input
                type="text"
                placeholder="Type your answer here"
                className="text-field-col"
                onDrop=""
                onChange={e => this.textChanged(8, e)}
                value={this.props.prediction[7]}
              />
            </div>

            <div className="answerCol-right">
              <label className="answerLineText plasmidName">b. pARA:</label>

              <input
                type="text"
                placeholder="Type your answer here"
                className="text-field-col"
                onDrop=""
                onChange={e => this.textChanged(9, e)}
                value={this.props.prediction[8]}
              />
              <input
                type="text"
                placeholder="Type your answer here"
                className="text-field-col"
                onDrop=""
                onChange={e => this.textChanged(10, e)}
                value={this.props.prediction[9]}
              />
            </div>

          </div>

        </div>

      </div>
    );
  };

  buildQuestionBlock = () => {
    return (
      <div className="outerQBlock">
        {this.buildQ1()}
        {
          (this.props.prediction[0] !== "" && this.props.prediction[1] !== "")? [this.buildQ2(), this.buildQ3()] : null
        }
      </div>
    );
  };

  render() {
    return (
      <div className="Predictions">
        <div>
          <p className="description" tabIndex={0}>
            During this simulation, you will be performing a restriction digest using BamHI and HindIII on two
            plasmids: pARA and pKAN-R. Take a look at their current structure and size.
          </p>
        </div>
        <div>
          <img
            className="plasmidImg"
            tabIndex={0}
            style={{ pointerEvents: "none", width: "100%" }}
            src={PlasmidImg}
            aria-label={"pARA and pKAN-R plasmids."}
          />
        </div>
        {this.buildQuestionBlock()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    prediction: state.gel.gels[0].restrictionDigest.prediction,
  }
}

export default connect(mapStateToProps, {
  setDigestPrediction,
})(Predictions210);
