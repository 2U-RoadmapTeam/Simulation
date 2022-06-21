import React, { Component } from "react";
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';


import {
    showModal,
    saveSnapshot
} from 'actions';

import "./ProtocolRead.scss";
import colors from 'styles/_colors.scss';
import IconStart from 'components/icons/start-solid';

import NotebookData from '../../../../data/notebook.json'

class ProtocolRead extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    save = () => {
      this.props.showModal(false)
    }

    componentDidMount(){
      if(!this.props.snapshots.hasOwnProperty('back3')){
        let tempState = this.props.state;

        this.props.saveSnapshot({
            snapshot: cloneDeep(tempState)
        })
      }
    }

    render() {

        return (
            <div className="modal-section level-choice">
              <div className="modal-header">
                  <h2 tabIndex={0}>Read through the protocol</h2>
              </div>
              <ol style={{padding: '0 0 0 16px'}}>
                {NotebookData.Notebook.Content.Protocol.Sequence.map(step =>{
                    return(
                      <li style={{marginBottom: '16px'}} aria-label={(step.hasOwnProperty('ariaLabel') && step.ariaLabel !== '')?step.ariaLabel:null} tabIndex={0}>{step.label}</li>
                    )
                 })}
              </ol>
              <div className="modal-footer lvl-choice">
                  <button
                    aria-label="Start simulation button"
                    tabIndex={this.props.tab} className="modal-btn-primary lvl-choice" onClick={this.save}>
                    <IconStart style={{ color: colors.charcoal1, height: "16px", top: "2px"}}/>
                      Start simulation
                  </button>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    snapshots: state.undo.snapshots
  }
}

export default connect(mapStateToProps, {
    showModal,
    saveSnapshot
})(ProtocolRead);
