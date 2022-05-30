/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { findIndex } from "lodash"

import { saveResultFeedback } from "../../actions"

import "./Results37.scss";

//import Gel from "./img/results-gel-210.svg";
import Tubes from "./img/results-tubes-210.svg";
import Tube1 from "./img/210-result-1.svg";
import Tube2 from "./img/210-result-2.svg";
import Tube3 from "./img/210-result-3.svg";
import AllTubes from "./img/results-all-tubes-37.svg";

import bp754 from "./img/plasmid-results/754_bp.svg";
import bp807 from "./img/plasmid-results/807_bp.svg";
import bp1184 from "./img/plasmid-results/1184_bp.svg";
import bp1614 from "./img/plasmid-results/1614_bp.svg";
// import bp4705 from './img/plasmid-results/4705_bp.svg';
import bp5082 from "./img/plasmid-results/5082_bp.svg";
import bp8990 from "./img/plasmid-results/8990_bp.svg";
import bp9200 from "./img/plasmid-results/9200_bp.svg";
import bp9410 from "./img/plasmid-results/9410_bp.svg";
import para4872bp from "./img/plasmid-results/para_4872_bp.svg";
import paraR5302 from "./img/plasmid-results/para_r_5302_bp.svg";
import paraR377bp from "./img/plasmid-results/para_r_377_bp.svg";
import paraR4495bp from "./img/plasmid-results/para_r_4495_bp.svg";
import paraR4705bp from "./img/plasmid-results/4705_bp.svg";
import pkanR5512bp from "./img/plasmid-results/pkan_r_5512_bp.svg";
import blank from "./img/plasmid-results/blank-prediction.svg";

const images = {
  "754": bp754,
  "807": bp807,
  "1184": bp1184,
  "1614": bp1614,
  // '4705': bp4705,
  "5082": bp5082,
  "8990": bp8990,
  "9200": bp9200,
  "9410": bp9410,
  "4872": para4872bp,
  "5302": paraR5302,
  "377": paraR377bp,
  "4495": paraR4495bp,
  "4705": paraR4705bp,
  "5512": pkanR5512bp,
  "blank": blank
};

class RestrictionDigestResults extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  sumArr = arr => {
    return (
      parseInt(!isNaN(arr[0]) ? arr[0] : 0) +
      parseInt(!isNaN(arr[1]) ? arr[1] : 0)
    );
  };

  buildPredictionResults = () => {

    let imgs = ["", "", ""];
    imgs[0] = images[this.sumArr(this.props.predictedFragments.p_ARA_R) + ""];
    imgs[1] = images[this.sumArr(this.props.predictedFragments.plasm_2) + ""];
    imgs[2] = images[this.sumArr(this.props.predictedFragments.plasm_3) + ""];

    //TODO: Add blank result for placeholder - use 754 BP with different text


    return (
      <div>
        {this.sumArr(this.props.predictedFragments.p_ARA_R) === 0 ? (
          <img className="result-plasmid-img" src={images["blank"]} alt="No prediction." />
        ) : (
          <img className={"result-plasmid-img" + ((this.props.predictedFragments.p_ARA_R[1] > 0)?" plasmid":" single-fragment")} src={imgs[0]} alt="p ARA R" />
        )}
        {this.sumArr(this.props.predictedFragments.plasm_2) === 0 ? (
          <img className="result-plasmid-img" src={images["blank"]} alt="No prediction." />
        ) : (
          <img className={"result-plasmid-img" + ((this.props.predictedFragments.plasm_2[1] > 0)?" plasmid":" single-fragment")} src={imgs[1]} alt="Plasmid 2" />
        )}
        {this.sumArr(this.props.predictedFragments.plasm_3) === 0 ? (
          <img className="result-plasmid-img" src={images["blank"]} alt="No prediction." />
        ) : (
          <img className={"result-plasmid-img" + ((this.props.predictedFragments.plasm_3[1] > 0)?" plasmid":" single-fragment")} src={imgs[2]} alt="Plasmid 3" />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "510px",
            pointerEvents: "none",
            marginTop: "-85px",
            marginLeft: "30px"
          }}
        >
          {this.sumArr(this.props.predictedFragments.p_ARA_R) === 0 ? (
            <p id="results-plasmid-text-none-1" className="result-plasmid-text">No prediction</p>
          ) : (
            <p id="results-plasmid-text-1" className="result-plasmid-text">
              {this.sumArr(this.props.predictedFragments.p_ARA_R) + " bp"}
            </p>
          )}
          {this.sumArr(this.props.predictedFragments.plasm_2) === 0 ? (
            <p id="results-plasmid-text-none-2" className="result-plasmid-text">No prediction</p>
          ) : (
            <p id="results-plasmid-text-2" className="result-plasmid-text">
              {this.sumArr(this.props.predictedFragments.plasm_2) + " bp"}
            </p>
          )}
          {this.sumArr(this.props.predictedFragments.plasm_3) === 0 ? (
            <p id="results-plasmid-text-none-3" className="result-plasmid-text">No prediction</p>
          ) : (
            <p id="results-plasmid-text-3" className="result-plasmid-text">
              {this.sumArr(this.props.predictedFragments.plasm_3) + " bp"}
            </p>
          )}
        </div>
      </div>
    );
  };

  getResult = () => {
    let index = findIndex(this.props.solutions, { type: "LIG" });
    let LIG = this.props.solutions[index];

    console.log(LIG);

    let fragments = false;
    let plasmid = false;

    if(LIG.solutions.hasOwnProperty("K+") ||
       LIG.solutions.hasOwnProperty("A+")){
      fragments = true;
    }

    if(LIG.solutions.hasOwnProperty("5xB")){
      plasmid = true;
    }

    return (!fragments)?Tube1:(!plasmid)?Tube2:Tube3
  }

  getResultText = () => {
    let index = findIndex(this.props.solutions, { type: "LIG" });
    let LIG = this.props.solutions[index];

    console.log(LIG);

    let fragments = false;
    let plasmid = false;

    if(LIG.solutions.hasOwnProperty("K+") ||
       LIG.solutions.hasOwnProperty("A+")){
      fragments = true;
    }

    if(LIG.solutions.hasOwnProperty("5xB")){
      plasmid = true;
    }

    return (!fragments)?"Failed":(!plasmid)?"Failed":"Succeeded"
  }

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
            In this simulation, DNA ligase was used to join the DNA fragments
            resulting from the restriction digest of pKAN-R and pARA to create
            the recombinant pARA-R plasmid. Remember that multiple combinations
            of fragments can form when the fragments have complementary sticky
            ends.
          </p>
          <br/>
          <p className="description" tabIndex={0}>
            You cannot verify that you have the desired pARA-R plasmid at this
            stage. The next experimental step is to run a gel with your stored
            solutions (LIG, A+ and K+) to verify whether you have successfully
            ligated the correct fragments to create the desired pARA-R plasmid.
          </p>
          <br/>
          <p className="description" tabIndex={0}>
            Below you can view a closeup of your LIG tube to see
            whether your experiment has worked and you have produced circular
            plasmids from the fragments in the K+ and A+ tubes, or the
            experiment has failed and you only have fragments in your LIG tube
            and no circular plasmids.
          </p>
          <p
            className="description"
            tabIndex={0}
            style={{ paddingTop: "20px" }}
          >
            <span >
              It is important to note that you will not normally be able to see
              anything in your LIG tube due to the microscopic size of DNA
              fragments and plasmids. If your experiment was successful, you
              will have produced circular pARA-R plasmids from the fragments in
              the K+ and A+ tubes. If your experiment was not successful, you
              will only have the linear K+ and A+ fragments in your tube.
            </span>
          </p>
        </div>
        <div style={{display: "flex"}}>
          <h5 style={{width: "50%", paddingLeft: "16px"}} className="header" tabIndex={0}>
            Actual results
          </h5>
          <h5 style={{width: "50%", paddingLeft: "16px"}} className="header" tabIndex={0}>
            Ideal results
          </h5>
        </div>
        <div style={{position: 'relative'}}>
          <img
            className="result-bg"
            src={Tubes}
            alt="An image depicting an unsucessful result and a successful result"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              pointerEvents: "none",
              marginTop: "-24px"
            }}
          />
          <img
            className="result-tube"
            src={this.getResult()}
            alt={"Tube showing "}
            style={{
              position: "absolute",
              pointerEvents: "none",
              top: "27%",
              left: "calc(25% + 8px)",
              transform: "translate(-50%, 0)"
            }}
          />
          <div
            style={{
              width: "100%",
              height: "100%",
              top: "55px",
              position: "absolute",
              marginTop: "0px"
            }}
          >
            <div
              aria-label=""
              style={{
                position: "absolute",
                top: "20px",
                left: 0,
                width: "50%",
                height: "100%"
              }}
            >
              <p className="tubeResultsFailedText" style={{textAlign: 'center', color: 'white'}}>{this.getResultText()}</p>
            </div>
            <div
              aria-label=""
              style={{
                position: "absolute",
                top: "20px",
                right: 0,
                width: "50%",
                height: "100%"
              }}
            >
              {/* <p className="tubeResultsFailedText" style={{textAlign: 'center', color: 'white'}}>Succeeded</p> */}
            </div>
          </div>
        </div>
        <div>
          <h5 className="header" tabIndex={0}>
            Your predicted plasmids
          </h5>
        </div>
        <div
          className="predictedBox"
          tabIndex={0}
          aria-label={
            "Predicted results. Your predicted recombinant plasmids made of " +
            (this.props.predictedFragments.p_ARA_R[0] +
              this.props.predictedFragments.p_ARA_R[1]) +
            " bp, " +
            (this.props.predictedFragments.plasm_2[0] +
              this.props.predictedFragments.plasm_2[1]) +
            " bp, " +
            (this.props.predictedFragments.plasm_3[0] +
              this.props.predictedFragments.plasm_3[1]) +
            " bp"
          }
        >
          {this.buildPredictionResults()}
        </div>
        <br/>
        <div>
          <p className="description" tabIndex={0}>
            Below is an image illustrating the 10 possible recombinant
            plasmids that may form during the ligation process. Compare this
            with the recombinant plasmids you predicted would form.
          </p>
        </div>

        <div>
          <h5 className="header" tabIndex={0}>
            Possible plasmids
          </h5>
        </div>
        <div
          tabIndex={0}
          aria-label="Ten possible recombinant plasmid configurations based on the p ARA and P kan R plasmid fragments"
        >
          <img
            alt="An image depicting all of the potential result outcomes"
            className="result-bg"
            src={AllTubes}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              pointerEvents: "none"
            }}
          />
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
  console.log(state)
  return {
    id: ownProps.id,
    target: state.scene.lastDrop.lastTarget,
    predictedFragments: state.scene.predictions.fragment,
    solutions: state.solution.solutions,
    resultFeedback: state.scene.resultFeedback,
  };
};

export default connect(
  mapStateToProps,
  { saveResultFeedback }
)(RestrictionDigestResults);
