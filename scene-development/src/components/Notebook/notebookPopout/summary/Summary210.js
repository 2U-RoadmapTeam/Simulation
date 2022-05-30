import React, { Component } from 'react'
import IconHexagon from 'components/icons/hexagon-solid'

import './Summary.scss'
import colors from 'styles/_colors.scss'


import Tip2 from './img/tip1.svg'
import Tip3 from './img/tip2.svg'
import Tip4 from './img/tip3.svg'
import Tip5 from './img/tip4.svg'


class Summary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (

          <div className="Summary">
              <div>
                  <p className="description" tabIndex={0}>It is important to summarize your methodology and observations after you have completed an experiment. Please view a recap of this simulation and tips regarding ligating DNA fragments below.</p>
                  <div className="learning-objectives">
                    <h5 tabIndex={0}>In this simulation, you learned how to ligate DNA fragments from a restriction digest using DNA ligase. You should be able to predict possible recombinant plasmids that can occur during the ligation process. The simulation explored how to: </h5>
                    <ul>
                      <li>
                        <div className="index">
                          <IconHexagon
                            style={{ color: ((this.props.current) ? "white" : ((this.props.complete) ? colors.navy3 : colors.navy1)), height: '18px' }}
                          />
                        </div>
                        <span tabIndex={0}>Model different recombinant plasmids.</span>
                      </li>
                      <li>
                        <div className="index">
                          <IconHexagon
                            style={{ color: ((this.props.current) ? "white" : ((this.props.complete) ? colors.navy3 : colors.navy1)), height: '18px' }}
                          />
                        </div>
                        <span tabIndex={0}>Inactivate restriction enzymes.</span>
                      </li>
                      <li>
                        <div className="index">
                          <IconHexagon
                            style={{ color: ((this.props.current) ? "white" : ((this.props.complete) ? colors.navy3 : colors.navy1)), height: '18px' }}
                          />
                        </div>
                        <span tabIndex={0}>Prepare and incubate a ligation solution.</span>
                      </li>


                    </ul>
                  </div>
                  <div className="tips">
                    <h5 tabIndex={0}>Takeaway messages</h5>
                    <ul>
                      <li>
                        <img tabIndex={0} src={Tip2} aria-label={'A waterbath with a closed lid.'} />
                        <div className="tip">
                          <p tabIndex={0}> When setting up the water bath, always make sure there is enough distilled water in the water bath and make sure the lid is closed to reduce evaporation.</p>
                        </div>
                      </li>
                      <li>
                        <img tabIndex={0} src={Tip3} aria-label={'A thermometer showing 80 degrees Fahrenheit.'} />
                        <div className="tip">
                          <p tabIndex={0}>It is always a good idea to confirm the temperature of the water with a thermometer, even if there is a digital temperature reading on the water bath.</p>
                        </div>
                      </li>
                      <li>
                        <img tabIndex={0} src={Tip4} aria-label={'An ice bucket.'} />
                        <div className="tip">
                          <p tabIndex={0}>Make sure you always keep DNA ligase enzymes and ligation buffer on ice or on a cold block to prevent protein degradation.</p>
                        </div>
                      </li>
                      <li>
                        <img tabIndex={0} src={Tip5} aria-label={'Defrosted ligase and ligation buffer.'} />
                        <div className="tip">
                          <p tabIndex={0}>Make sure your DNA ligase and ligation buffer are completely defrosted before use.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
              </div>
          </div>
        );
    }
}

export default Summary
