import React, { Component } from "react";
import IconHexagon from "../../../icons/hexagon-solid";

import "./Summary.scss";
import colors from "../../../../styles/_colors.scss";

import Tip1 from "./img/tip1.svg";
import Tip2 from "./img/tip2.svg";
import Tip3 from "./img/tip3.svg";
import Tip4 from "./img/tip4.svg";
import Tip5 from "./img/tip5.svg";
// import HeatBlock from './img/heat-block-takeaway.svg'

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Summary">
        <div>
          <p className="description" tabIndex={0}>
            At consectetur lorem donec massa sapien faucibus et molestie.
            Adipiscing at in tellus integer feugiat scelerisque varius.
            Curabitur vitae nunc sed velit dignissim sodales ut eu sem.
            Ultricies leo integer malesuada nunc vel. Nisl tincidunt eget nullam
            non nisi est sit. Vitae elementum curabitur vitae nunc sed velit.
            Ultricies integer quis auctor elit sed vulputate mi sit amet. Nunc
            aliquet bibendum enim facilisis gravida. Pulvinar elementum integer
            enim neque volutpat ac.
          </p>
          <div className="learning-objectives">
            <h5 tabIndex={0}>Simulation recap</h5>
            <ul>
              <li>
                <div className="index">
                  <IconHexagon
                    style={{
                      color: this.props.current
                        ? "white"
                        : this.props.complete
                        ? colors.navy3
                        : colors.navy1,
                      height: "18px",
                    }}
                  />
                </div>
                <span tabIndex={0}>
                  In this simulation you treated your cell culture samples with
                  SDS sample buffer and heated them to ensure cell lysis and the
                  denaturation of all cellular proteins. SDS coats the denatured
                  proteins in negative charge.
                </span>
              </li>
              <li>
                <div className="index">
                  <IconHexagon
                    style={{
                      color: this.props.current
                        ? "white"
                        : this.props.complete
                        ? colors.navy3
                        : colors.navy1,
                      height: "18px",
                    }}
                  />
                </div>
                <span tabIndex={0}>
                  After loading your samples and controls on a protein gel, you
                  separate proteins according to molecular weight by applying an
                  electrical current. Since the proteins are invisible, look for
                  the blue dye front and protein ladder reaching the bottom of
                  the gel as indicators of when to stop the electrophoresis.
                </span>
              </li>
              <li>
                <div className="index">
                  <IconHexagon
                    style={{
                      color: this.props.current
                        ? "white"
                        : this.props.complete
                        ? colors.navy3
                        : colors.navy1,
                      height: "18px",
                    }}
                  />
                </div>
                <span tabIndex={0}>
                  In order to visualize your protein bands, SDS-PAGE will
                  typically be followed by a Coomassie staining or a Western
                  blot step. Western blotting ensures the specific detection of
                  your protein of interest, whereas Coomassie stains all
                  proteins.
                </span>
              </li>
              {/* <li>
                        <div className="index">
                          <IconHexagon
                            style={{ color: ((this.props.current) ? "white" : ((this.props.complete) ? colors.navy3 : colors.navy1)), height: '18px' }}
                          />
                        </div>
                        <span tabIndex={0}>To estimate the size of the proteins in your samples, you compare them to a protein ladder that covers the desired size range, so you need to know the expected size of your protein before you run your protein gel.</span>
                      </li> */}
            </ul>
          </div>
          <div className="tips">
            <h5 tabIndex={0}>Takeaway messages</h5>

            <div className="take-away">
              <div>
                <img
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

            <div className="take-away">
              <div>
                <img
                  aria-hidden={true}
                  src={Tip2}
                  alt={
                    "This ensures that an electrical current will flow to separate the negatively charged proteins by mass."
                  }
                />
              </div>
              <div className="tip">
                <p tabIndex={0}>
                  Always ensure you add enough running buffer in both chambers
                  of the electrophoresis box to reach the wells as well as the
                  bottom of the gel. This ensures that an electrical current
                  will flow to separate the negatively charged proteins by mass.
                </p>
              </div>
            </div>

            <div className="take-away">
              <div>
                <img
                  aria-hidden={true}
                  src={Tip3}
                  alt={"Remove the comb from the gel wells."}
                />
              </div>
              <div className="tip">
                <p tabIndex={0}>Remove the comb from the gel wells.</p>
              </div>
            </div>

            <div className="take-away">
              <div>
                <img
                  aria-hidden={true}
                  src={Tip4}
                  alt={
                    "You can check whether electrophoresis has begun by looking for bubbles at the bottom of the electrophoresis box."
                  }
                />
              </div>
              <div className="tip">
                <p tabIndex={0}>
                  You can check whether electrophoresis has begun by looking for
                  bubbles at the bottom of the electrophoresis box.
                </p>
              </div>
            </div>

            <div className="take-away">
              <div>
                <img
                  aria-hidden={true}
                  src={Tip5}
                  alt={
                    "If you run the blue front off the gel you might lose your protein of interest."
                  }
                />
              </div>
              <div className="tip">
                <p tabIndex={0}>
                  If you run the blue front off the gel you might lose your
                  protein of interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
