import React, { Component } from "react";
import { connect } from "react-redux";

import Gel from "./img/results-gel-210.svg";

import IdealResult from "./img/expected-result.svg";

import Kplus from "./img/kplus.svg";
import KplusPlasmid from "./img/kplusplasmid.svg";
import KplusEmpty from "./img/kplusempty.svg";

import Kminus from "./img/k-.svg";
import KminusPlasmid from "./img/k-plasmid.svg";
import KminusEmpty from "./img/k-empty.svg";

import Aplus from "./img/aplus.svg";
import AplusPlasmid from "./img/aplusplasmid.svg";
import AplusEmpty from "./img/aplusempty.svg";

import Aminus from "./img/a-.svg";
import AminusPlasmid from "./img/a-plasmid.svg";
import AminusEmpty from "./img/a-empty.svg";

import {
  saveResultFeedback
} from '../../actions';

const images = {
  "A+": Aplus,
  "A+plasmid": AplusPlasmid,
  "A+empty": AplusEmpty,
  "A-": Aminus,
  "A-plasmid": AminusPlasmid,
  "A-empty": AminusEmpty,
  "K+": Kplus,
  "K+plasmid": KplusPlasmid,
  "K+empty": KplusEmpty,
  "K-": Kminus,
  "K-plasmid": KminusPlasmid,
  "K-empty": KminusEmpty,
}

class RestrictionDigestResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: ''
    };
  }

  renderTubes = () => {

    let html = [];
    let ref = '';

    for(var i=0; i<this.props.solutions.length; i++){

      if(this.props.solutions[i].type === "A+" || this.props.solutions[i].type === "A-" || this.props.solutions[i].type === "K+" || this.props.solutions[i].type === "K-" ){

        if(this.props.solutions[i].volume > 0){
          ref = this.props.solutions[i].type + ((this.props.solutions[i].solutions.hasOwnProperty("RE"))?"":"plasmid");
        } else {
          ref = this.props.solutions[i].type + "empty";
        }

        if(images.hasOwnProperty(ref)){
          html.push(
            (<div>
              <img src={images[ref]} style={{pointerEvents: "none"}}/>
            </div>)
          )
        }
      }
    }

    return html;
  }

  // handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // this.setState({
  //   //   feedback: ''
  //   // });
  //
  //   this.props.saveResultFeedback(this.state.feedback);
  // }


  handleFormChange = (e) => {
    this.setState({
        feedback: e.target.value
    },function(){
      this.props.saveResultFeedback({resultFeedback: this.state.feedback});
    })
  }

  render() {
    return (
      <div className="graphics">
        <div>
          <p className="description" tabIndex={0}>
            Once you have performed your restriction digest, you would not be
            able to confirm your results simply by looking at your tubes. In
            this simulated environment, we’ve provided a hypothetical view of
            your results.
          </p>
        </div>

        <div>
          <h5 className="header" tabIndex={0}>
            Predicted Results
          </h5>
          <br/>
          <p className="description" tabIndex={0}>
            In order to confirm the restriction digest, you would need to
            perform gel electrophoresis using a small portion of your samples.
            Having a good understanding of predicted fragment sizes will allow
            you to correctly interpret if your enzymes cut the plasmids
            correctly and efficiently based on band sizes. This is what you
            predicted to find in your digested K+ and A+ results: 
          </p>
        </div>

        <div>
          <img
            className="result-bg"
            src={Tubes}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              pointerEvents: "none"
            }} />
        </div>

        <div className="results-form">
          <form>
            <div className="row-a">
              <div className="input" tabIndex={0} >
                <label>a. pKAN-R: </label>
                <span className="result">{((this.props.predictions[2])? this.props.predictions[2] : 0 ) + " bp"}</span>
              </div>
              <div className="input" tabIndex={0} >
                <label> and </label>
                <span className="result">{((this.props.predictions[3])? this.props.predictions[3] : 0 ) + " bp"}</span>
              </div>
            </div>

            <div className="row-b">
              <div className="input" tabIndex={0} >
                <label>b. pARA: </label>
                <span className="result">{((this.props.predictions[4])? this.props.predictions[4] : 0 ) + " bp"}</span>
              </div>

              <div className="input" tabIndex={0} >
                <label> and </label>
                <span className="result">{((this.props.predictions[5])? this.props.predictions[5] : 0 ) + " bp"}</span>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h5 className="header" tabIndex={0}>
            Actual Results
          </h5>
          <div className="ResultTubes">
            {this.renderTubes()}
          </div>
          <br/>
          <div className="text-span">
            <span>Compare this to the ideal results for A+, A-, K+ and K-.</span>
          </div>
        </div>

        <div className="Results">
          <h5 className="header" tabIndex={0}>
            Ideal results
          </h5>
        </div>
        <br/>
        <img tabIndex={0} src={IdealResult} alt="A+. Depicting tube with plasmids. A-. Depicting tube with fragments. K+. Depicting tube with plasmids. K-. Depicting tube with fragments."/>
        <div>
          <p
            className="description"
            tabIndex={0}
            style={{ paddingTop: "20px" }}>
            Once you have run your samples through gel electrophoresis, you can
            confirm whether you have produced the correct sized fragments using
            the DNA ladder, which will have bands of known sizes for you to
            compare the other bands on the gel with in order to estimate size.
            If your digest was not set up at optimal conditions (optimal
            temperature and correct restriction buffer) you may see a ‘partial’
            or ‘incomplete’ cut.
          </p>
        </div>
        <br />
        <div className="gel">
          <div className="gel-results lanes">
            <img
              tabIndex={0}
              className="result-bg"
              src={Gel}
              alt={"Agarose gel following electrophoresis. The fragments in the DNA ladder, which have bands of known sizes, can be compared the other bands in the gel to estimate their size."}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                pointerEvents: "none"
              }} />
          </div>
        </div>
        <br />
        <div>
          <p tabIndex={0}>Now that we have completed a restriction digest, which tubes can we combine to
          create new recombinant plasmids?</p>
        </div>
        <div>
          <h5 tabIndex={0}>Result feedback</h5>
          <p className="description" tabIndex={0}>What part of the procedure do you think had the greatest impact on the results you obtained?</p>
          {
            (
              <form class="result-feedback" onSubmit={(e) => { e.preventDefault() }}>
                <textarea placeholder="Type your answer here." maxlength="300" aria-label="Text-entry field. Input text to answer the question." onChange={this.handleFormChange}>{((this.props.resultFeedback !== '')?this.props.resultFeedback:"")}</textarea>
              </form>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("state :: ", state);
  return {
    id: ownProps.id,
    type: state.gel.gels[ownProps.id - 1].type,
    target: state.scene.lastDrop.lastTarget,
    predictions: state.gel.gels[ownProps.id - 1].restrictionDigest.prediction,
    results: state.gel.gels[ownProps.id - 1].restrictionDigest.results,
    lanes: state.gel.gels[ownProps.id - 1].restrictionDigest.lanes,
    solutions: state.solution.solutions,
    resultFeedback: state.scene.resultFeedback,
  };
};

export default connect(mapStateToProps, {
    saveResultFeedback,
})(RestrictionDigestResults);
