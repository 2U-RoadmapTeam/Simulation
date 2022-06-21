import React, { Component } from "react";
import { connect } from "react-redux";
import Graphics from 'components/solution/Graphics';

import './Tubes.scss';
import { solutionOpen } from '../../actions';


class Tubes extends Component {



  render () {
    return (

      <ul className="tube-closed-full">
        <li aria-label="Tubes"
          draggable
          id={'Tube'} tabIndex={0}
          className="dropTarget">
          <p className="label" aria-hidden="true"> { this.props.type } </p>
            <Graphics id={this.props.id} />
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      id: ownProps.id,
      // type: state.solution.solutions[ownProps.type - 1].type,
      // target:
    }
}

export default connect(mapStateToProps, {
  solutionOpen
})(Tubes)
