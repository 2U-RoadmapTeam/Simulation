import React, { Component } from 'react';
import { connect } from "react-redux";

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../toast/Toast'
import colors from '../../styles/_colors.scss';

import freezer_closed from './img/freezer-closed_.svg'

import './Freezer.scss'

class Freezer extends Component {

    render () {
        return (
            <ul style={{ padding: '0', margin: '0 25%', listStyle: 'none'}}>
                <li aria-label="Freezer"
                    id="Freezer" 
                    className="dropTarget">
                        <img width='65' src={freezer_closed} alt="" />
                </li>
            </ul>
        );
    }
}

export default Freezer;

