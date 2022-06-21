import React, { Component } from "react";
import IconHexagon from "../../../icons/hexagon-solid";

import "./Resources.scss";
import colors from "../../../../styles/_colors.scss";

// import HeatBlock from './img/heat-block-takeaway.svg'
// import tip1 from "../img/152-1529911_download-the-agenda-in-pdf-format-export-pdf-icon.png";
import tip1 from "../summary/img/29099.png"
import tip2 from "../summary/img/istockphoto-1191661875-612x612.jpeg"
import tip3 from "../summary/img/3214746.png"

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
          <div className="tips">
            <h5 tabIndex={0}>Takeaway messages</h5>

            <div className="take-away">
              <div>
                <h2>PDFs</h2>
                <img
                  aria-hidden={true}
                  src={tip1}
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
                <h2>Videos</h2>

                <img
                  aria-hidden={true}
                  src={tip2}
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
                <h2>External Resources</h2>
                <img
                  aria-hidden={true}
                  src={tip3}
                  alt={"Remove the comb from the gel wells."}
                />
              </div>
              <div className="tip">
                <p tabIndex={0}>Remove the comb from the gel wells.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
