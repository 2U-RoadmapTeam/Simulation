import React, { Component } from "react";

import GelComb from "./img/gel-comb.svg";

class Graphics extends Component {
  render() {
    return (
      <div id={this.props.id}>
        <img width="100" src={GelComb} aria-label={"Gel Comb"} />
      </div>
    );
  }
}

export default Graphics;
