import React, { Component } from "react";
import { connect } from 'react-redux';


import {
    setLevel,
    showModal,
} from 'actions';

import "./LevelChoice.scss";
import colors from 'styles/_colors.scss';
import IconStart from 'components/icons/start-solid';

class LevelChoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
          level: this.props.level
        }
    }

    setLevel = (lvl) => {
      this.props.setLevel({level: lvl})
    }

    save = () => {
      this.setLevel(this.state.level)
      this.props.showModal(false)
    }

    render() {

        return (
            <div className="modal-section level-choice">
              <div className="modal-header">
                  <h2 tabIndex={0}>Before you start the lab simulation, choose a level</h2>
              </div>
                <button className={(this.state.level === 1?"active":"inactive")+" levelSelectBtn"} onClick={() => {this.setState({level: 1})}}>Level 1</button>
                <button className={(this.state.level === 2?"active":"inactive")+" levelSelectBtn"} onClick={() => {this.setState({level: 2})}}>Level 2</button>
                <button className={(this.state.level === 3?"active":"inactive")+" levelSelectBtn"} onClick={() => {this.setState({level: 3})}}>Level 3</button>
              <div className="modal-footer lvl-choice">
                  <button
                    aria-label="Start simulation button"
                    tabIndex={this.props.tab} className="modal-btn-primary lvl-choice" onClick={this.save}>
                    <IconStart
                          style={{ color: colors.charcoal1, height: "16px", top: "2px"}}/>
                    {" "}Start simulation
                  </button>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    level: state.notebook.level,
  }
}

export default connect(mapStateToProps, {
    setLevel,
    showModal,
})(LevelChoice);
