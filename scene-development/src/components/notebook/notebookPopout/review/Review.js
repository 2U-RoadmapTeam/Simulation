import React, { Component } from "react";

// import { default as Gel } from 'components/gel/Results510';
import SceneData from "../../../../data/scene.json";

import "./Results.scss";

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  buildComponent = (data) => {
    // const components = data.components.map((component, index) => (
    // <Gel key={index} id={component.props.id} />
    // ));
    // return (components)
  };

  componentDidMount() {
    this.setState({
      results: this.buildComponent(SceneData["Gel"]),
    });
  }

  render() {
    return (
      <div className="Results">
        <div>
          <p tabIndex="0" className="description">
            Et malesuada fames ac turpis egestas sed. In vitae turpis massa sed
            elementum tempus egestas sed. Nec feugiat in fermentum posuere.
            <br></br>
            Porttitor eget dolor morbi non arcu risus quis. Volutpat est velit
            egestas dui id ornare arcu odio ut. Convallis tellus id interdum
            velit laoreet id donec ultrices tincidunt.
          </p>
        </div>
        <div>{this.state.results}</div>
      </div>
    );
  }
}

export default Results;
