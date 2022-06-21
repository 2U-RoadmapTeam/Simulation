import React, { Component } from "react";
// import IconHexagon from "../../../icons/hexagon-solid";

import "./Introduction.scss";
import colors from "../../../../styles/_colors.scss";

import Tip1 from "./img/negotiation-each-feels-same-towards-other-poor-sucker-33605740.jpeg";

// import HeatBlock from './img/heat-block-takeaway.svg'

class Introduction extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Summary">
        <div>
          <p className="description" tabIndex={0}>
            In this negotiation, you are required to negotiate an employment
            contract. There are eight issues under consideration: bonus, job
            assignment, vacation time, starting date, moving expenses, insurance
            coverage, salary, and location. For each issue, there are several
            different options, and each option is worth a certain number of
            points for the recruiter and a certain number of points for the
            candidate. The aim is for each negotiator to maximise the number of
            “points” in the deal. The possible score range for the agreement and
            each negotiator is −8,400 to +13,200.
          </p>
          <div className="tips">
            <h5 tabIndex={0}>Takeaway messages</h5>

            <div className="take-away1">
              <div>
                <img
                className="img1"
                  aria-hidden={true}
                  src={Tip1}
                  alt={
                    "Avoid heating your samples with the lids of the tubes open since the sample buffer would boil away, leaving your samples unusable."
                  }
                />
              </div>
              <div className="tip">
                <p tabIndex={0}>
                  Avoid heating your samples with the lids of the tubes open
                  since the sample buffer would boil away, leaving your samples
                  unusable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Introduction;
