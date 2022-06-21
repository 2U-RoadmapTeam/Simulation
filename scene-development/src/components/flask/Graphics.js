import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setFlask
} from "../../actions";

import flaskFull from "./img/flaskFull.svg";
import flaskEmpty from "./img/flaskEmpty.svg";

const images = {
  "flask": flaskFull,
  "flaskEmpty": flaskEmpty
}

class Graphics extends Component {

  getImg = () => {
    var reference = "flask"
    if(this.props.volume === 0){
      reference += "Empty"
    }
    return images[reference]
  }



  componentWillMount() {
    for(var image in images){
      if(!image.replace(this.props.type, '').includes(0)){
        const img = new Image();
        img.src = images[image];
      }
    }
  }

  render() {
    return (
      <div className="graphics">
        <img
         aria-label={this.props.type+"Flask"}
          className={(this.props.pour? 'pour': null)}
          style={{ pointerEvents: "none" }}
          src={this.getImg()}
          alt={this.props.type+" flask"}
          aria-hidden={this.props.context==="Materials"?"true":"false"} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    type: state.flask.flasks[ownProps.id - 1].type,
    volume: state.flask.flasks[ownProps.id - 1].volume,
    pour: state.flask.flasks[ownProps.id - 1].pour
  }
}
export default connect(mapStateToProps, {
  setFlask
})(Graphics)
