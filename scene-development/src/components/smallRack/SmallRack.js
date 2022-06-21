import React, { Component } from "react"
import "./SmallRack.scss";

import EmptyTubeStand from './img/empty-tube-stand-6.svg';

class SmallRack extends Component {

    render() {
        return (
			<ul>
				<li
					tabIndex={0}
					id={"SmallRack"+this.props.id} style={{pointerEvents: "none"}}>
						<p aria-hidden="true" className="label" style={{display:"none"}}>Small rack</p>
					<img src={EmptyTubeStand} aria-label={'Small Tube Rack'} alt={'Small Tube Rack'} />
				</li>
			</ul>
        )
	}

}

export default SmallRack;
