import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graphics from 'components/heatBlock/Graphics';

import {
    setModal,
    showModal,
} from '../../actions';

// Styles
import './HeatBlock.scss';

class HeatBlock extends Component {

    // showHeatBlockModal = () => {
    //     this.props.setModal({
    //         type: 'HEATBLOCK_CONTROLS',
    //         size: 'lg',
    //         connect: this.props.id
    //       });
    //     this.props.showModal({display: true});
    // }

    showHeatBlockTubes = () => {
        this.props.setModal({
            type: 'HEATBLOCK_TUBES',
            size: 'lg',
            connect: this.props.id
          });
        this.props.showModal({display: true});
    }

    render() {
        return (
            <ul>
                <li
                    id="HeatBlock"
                    className="dropTarget"
                    tabIndex={0} aria-label={"Heat block. Select to display its available settings"}
                    onClick={this.showHeatBlockTubes}
                    onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.showHeatBlockTubes(e)} }>
                    <p className="label">Heat Block</p>
                    <Graphics/>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        active: state.heatBlock.active,
        temp: state.heatBlock.temp,
        timer: state.heatBlock.timer,
    }
}

export default connect(mapStateToProps, {
    setModal,
    showModal,
})(HeatBlock);
