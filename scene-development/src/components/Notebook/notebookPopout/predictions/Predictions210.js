import React, { Component } from "react";

import { default as RestrictionDigest } from "components/solution/Predictions37";
// import SceneData from 'data/scene.json';

import "./Predictions.scss";

class Predictions extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   predictions: []
    // }
  }

  // buildComponent = (data) => {

  //   const components = data.components.map((component, index) => (
  //     <Gel key={index} id={component.props.id} />
  //   ));
  //   return (components)
  // }

  // componentDidMount(){
  //   this.setState({
  //       predictions: this.buildComponent(SceneData["Gel"])
  //   })
  // }

  render() {
    return (
      <div className="Predictions">
        <RestrictionDigest />
      </div>
    );
  }
}

export default Predictions;
