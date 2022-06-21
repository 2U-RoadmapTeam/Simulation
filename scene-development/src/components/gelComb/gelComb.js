import React, { Component } from "react";
import { connect } from "react-redux";
import Graphics from "./Graphics";


import "react-toastify/dist/ReactToastify.css";


import { pushInteractions } from "../../actions";



class GelComb extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ul>
        <li
          draggable
          aria-label={this.props.type + "gelComb"}
          id={"gelComb_" + this.props.id}
          className={
            "gelComb draggable dropTarget" + (this.props.open ? " open" : "")
          }
          style={{ transform: "translate3d(0px, 0px, 0px) rotateZ(0deg)" }}>
          <Graphics id={this.props.id} />
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (ownProps) => {
  return {
    id: ownProps.id
  };
};

export default connect(
  mapStateToProps,
  {
    pushInteractions
  }
)(GelComb);
