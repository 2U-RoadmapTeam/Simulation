import React, { Component } from "react";
import { connect } from "react-redux";

import Gel from "./img/results-gel-210.svg";
import Tubes from "./img/results-tubes-210.svg";

class RestrictionDigestResults extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
              <div className="input">
                <label>a. pKAN-R: </label>
                <input
                  tabIndex={0}
                  className="field"
                  type="text"
                  placeholder="Type your answer here"
                  name="p_KAN_r"
                  ref="p_KAN_r"
                  disabled="disabled"
                  value={this.props.predictions[2]} />
              </div>

              <div className="input">

                <label> and </label>

                <input
                  tabIndex={0}
                  className="field"
                  type="text"
                  placeholder="Type your answer here"
                  name="pKANr_bp"
                  ref="pKANr_bp"
                  disabled="disabled"
                  value={this.props.predictions[3]} />

              </div>
            </div>

            <div className="row-b">
              <div className="input">
                <label>b. pARA: </label>
                <input
                  tabIndex={0}
                  className="field"
                  type="text"
                  placeholder="Type your answer here"
                  name="pARA"
                  ref="pARA"
                  disabled="disabled"
                  value={this.props.predictions[4]} />
              </div>

              <div className="input">

                <label> and </label>

                <input
                  tabIndex={0}
                  className="field"
                  type="text"
                  placeholder="Type your answer here"
                  name="pARA_bp"
                  ref="pARA_bp"
                  disabled="disabled"
                  value={this.props.predictions[5]} />

              </div>
            </div>
          </form>

          <div className="text-span">
            <span>
              {" "}
              Compare this to the ideal results for K+, K-, A+ and A-{" "}
            </span>
          </div>
        </div>

        <div className="Results">
          <h5 className="header" tabIndex={0}>
            {" "}
            Results{" "}
          </h5>

          <div className="gel">
            <div className="gel-results lanes">
              <img
                className="result-bg"
                src={Gel}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  pointerEvents: "none"
                }} />
            </div>
          </div>
        </div>

        <div>
          <p
            className="description"
            tabIndex={0}
            style={{ paddingTop: "20px" }}>
            Once your samples have run through gel electrophoresis, you can
            confirm whether you have produced the correct sized fragments using
            the DNA ladder, which will have bands of known sizes for you to
            compare the other bands on the gel with in order to estimate size.
            If your digest was not set up at optimal conditions (optimal
            temperature and correct restriction buffer) you may see a ‘partial’
            or ‘incomplete’ cut.  
          </p>
        </div>

        <div>
          <p
            className="description"
            tabIndex={0}
            style={{ paddingTop: "20px" }}>
            Make a note: Did your results match your predicted fragment sizes?
            How would you explain your results?  
          </p>
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
    lanes: state.gel.gels[ownProps.id - 1].restrictionDigest.lanes
  };
};

export default connect(
  mapStateToProps, {
    
  }
)(RestrictionDigestResults);
