
import React, { Component } from 'react'
import Graphics from '../iceBucket/Graphics';
import './IceBucket.scss'

class IceBucket extends Component {
    render() {
        return (
            <ul>
                <li style={{zIndex: "4", pointerEvents: "none" }}
                    aria-label="Ice Bucket"
                    id="IceBucket" tabIndex={0}
                    className="dropTarget">
                    <p aria-hidden="true" className="label">Ice Bucket</p>
                    <Graphics id={this.props.id}/>
                </li>
            </ul>
        );
    }
}

export default IceBucket;
