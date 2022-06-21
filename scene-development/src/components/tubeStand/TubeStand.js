import React, { Component } from 'react'
import Graphics from './Graphics';

import './Tubes.scss'

class TubeStand extends Component {
    render() {
        return (
            <ul style={{pointerEvents: 'none', zIndex: 2}}>
                <li
                  aria-label="Tube Stand"
                  id="TubeStand"
                  tabIndex={0}
                  className="">
                    <p aria-hidden="true" className="label" style={{display:"none"}}>Tube stand</p>
                    <Graphics id={this.props.id} />
                </li>
            </ul>
        );
    }
}

export default TubeStand;
