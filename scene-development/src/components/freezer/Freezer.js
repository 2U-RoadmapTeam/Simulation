import React, { Component } from 'react';
import { connect } from "react-redux";

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../toast/Toast'
import colors from '../../styles/_colors.scss';

import {
  setFreezerOpen
} from "actions";

import Graphics from './Graphics';

import './Freezer.scss'

class Freezer extends Component {

    toggleFreezer = () => {

        this.props.setFreezerOpen({
            id: this.props.id,
            open: !this.props.open,
        });

    };

    render () {
        return (
            <ul>
                <li
                  id="Freezer"
                  // aria-label="Freezer"
                  className="dropTarget">
                    <p aria-hidden="true" className="label">Freezer</p>
                    <Graphics id={this.props.id} />
                </li>
            </ul>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        open: state.freezer.open
    }
};

export default connect( mapStateToProps, {
  setFreezerOpen
})(Freezer);
