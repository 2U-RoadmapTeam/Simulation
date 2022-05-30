import React, { Component } from 'react'

import './Context.scss'

import Gel from './img/gel.svg'

class Context extends Component {
    render() {
        return (
          <div className="Context">
              <div>
                  <p className="description" tabIndex={0}>Before beginning this simulation, please see this overview of the technique of gel electrophoresis:</p>
              </div>
              <div className="Section">
                <div>
                  <div className="contextTable">
                    <ul>
                      <li>Gel electrophoresis is used to separate biomolecules, such as DNA and RNA, in an agarose gel that is comprised of tiny pores according to their size and electrical charge</li>
                      <li>An electric current applied to the gel migrates the charged biomolecules towards the oppositely charged electrode.</li>
                      <li>Since DNA fragments have a similar negative charge, they all move towards the positive electrode.</li>
                      <li>Smaller DNA fragments will move through the pores in the gel faster than larger fragments.</li>
                      <li>DNA loading dye is often used to visualize how fast a gel is running and adds weight to your sample, allowing it to sink to the bottom of the well.</li>
                    </ul>
                  </div>
                  <img className="demoImage" aria-label="An example depiction of an electrophoresis result" src={Gel}/>
                </div>
              </div>
          </div>

        );
    }
}

export default Context
