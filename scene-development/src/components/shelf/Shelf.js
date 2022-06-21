import React, { Component } from "react"
import "./Shelf.scss";

import ShelfImg from "./img/Shelf.svg"

class Shelf extends Component {
    render() {
        return (
          <ul>
            <li
                style={{ transform: "scale(1.65, 1)" }}
                id={"Shelf_"+this.props.id}
                className="Shelf dropTarget">
                <p className="label"aria-hidden="true" style={{display:"none"}}>Shelf</p>
                <img style={{transform: 'scale(1.7, 1)'}} src={ShelfImg}  aria-label={'Laboratory shelf'} style={{pointerEvents: "none"}}/>
            </li>
          </ul>
        )
    }
}
export default Shelf;
