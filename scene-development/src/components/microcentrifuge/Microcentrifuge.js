import React, { Component } from 'react'
import { connect } from 'react-redux'

// component
import Graphics from './Graphics'
import {
  setModal,
  showModal,
  setCentrifugeOpen,
  setSolution
} from '../../actions';

// styles
import './Microcentrifuge.scss';

class Microcentrifuge extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <ul>
        <li
          id="Microcentrifuge"
          className={'element-stack dropTarget ' +((this.props.open) ? 'microcentrifuge-empty' : '') }
          tabIndex={0}
          aria-label="Microcentrifuge">
          <p className="label" aria-hidden="true">Microcentrifuge</p>
          <Graphics />
        </li>
      </ul>
    );
  }
}

const mapStateProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    open: state.centrifuge.open,
  };
};

export default connect(mapStateProps, {
  setModal,
  showModal,
  setCentrifugeOpen,
  setSolution
})(Microcentrifuge);
