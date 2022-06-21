import React, { Component } from "react";
import IconHexagon from "../../../icons/hexagon-solid";

import "./Summary.scss";
import colors from "../../../../styles/_colors.scss";

import Tip2 from "./img/tip1.svg";
import Tip3 from "./img/tip2.svg";
import Tip4 from "./img/tip3.svg";
import Tip5 from "./img/tip4.svg";

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
            <ul>
              <li>
                <img
                  tabIndex={0}
                  src={Tip2}
                  aria-label={"A waterbath with a closed lid."}
                />
                <div className="tip">
                  <p tabIndex={0}>
                    {" "}
                    When setting up the water bath, always make sure there is
                    enough distilled water in the water bath and make sure the
                    lid is closed to reduce evaporation.
                  </p>
                </div>
              </li>
              <li>
                <img
                  tabIndex={0}
                  src={Tip3}
                  aria-label={"A thermometer showing 80 degrees Fahrenheit."}
                />
                <div className="tip">
                  <p tabIndex={0}>
                    It is always a good idea to confirm the temperature of the
                    water with a thermometer, even if there is a digital
                    temperature reading on the water bath.
                  </p>
                </div>
              </li>
              <li>
                <img tabIndex={0} src={Tip4} aria-label={"An ice bucket."} />
                <div className="tip">
                  <p tabIndex={0}>
                    Make sure you always keep DNA ligase enzymes and ligation
                    buffer on ice or on a cold block to prevent protein
                    degradation.
                  </p>
                </div>
              </li>
              <li>
                <img
                  tabIndex={0}
                  src={Tip5}
                  aria-label={"Defrosted ligase and ligation buffer."}
                />
                <div className="tip">
                  <p tabIndex={0}>
                    Make sure your DNA ligase and ligation buffer are completely
                    defrosted before use.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
