import React, { Component } from 'react';

import { default as Gel } from '../../../gel/Results510';
import SceneData from '../../../../data/scene.json';

import './Results.scss';

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
          results: []
        }
    }

    buildComponent = (data) => {

      const components = data.components.map((component, index) => (
        <Gel key={index} id={component.props.id} />
      ));
      return (components)
    }

    componentDidMount(){
      this.setState({
          results: this.buildComponent(SceneData["Gel"])
      })
    }

    render() {
        return (
          <div className="Results">
              <div>
                  <p tabIndex="0" className="description">After electrophoresis, inspect your gel and compare it to the predicted results, actual results and the ideal results.</p>
              </div>
              <div>
                {this.state.results}
              </div>
          </div>
        );
    }
}

export default Results
