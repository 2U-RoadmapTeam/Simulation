import React, { Component } from "react"
import "./Table.scss";

import TableImg from "./img/Table.svg"

class Table extends Component {
    render() {
        return (
          <ul>
            <li style={{zIndex: "-1" }}
                id={"Table_"+this.props.id}
                className="Table">
                <p aria-hidden="true" className="label" style={{display:"none"}}>Table</p>
                <img src={TableImg} aria-label={'Laboratory shelf'} alt={'Laboratory shelf'} />
            </li>
          </ul>
        )
    }
}
export default Table;
