import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graphics from 'components/powerSupply/Graphics';

import {
    setPowerSupplyAnodeConnected,
    setPowerSupplyCathodeConnected,
    setModal,
    showModal,
} from '../../actions';

// Styles
import './PowerSupply.scss';

class PowerSupply extends Component {

    showPowerSupplyModal = () => {
        this.props.setModal({
            type: 'POWERSUPPLY_CONTROLS',
            size: 'lg',
            connect: this.props.id
          });
        this.props.showModal({display: true});
    }


    render() {
        return (
            <ul>
                <li
                    id="PowerSupply"
                    tabIndex={0}
                    onClick={this.showPowerSupplyModal}
                    onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.showPowerSupplyModal(e)} }
                    >
                    <div className="connections">
                      <div className="electrodes">
                        <div className="group">
                          <div className="electrode">
                            <div id={'PowerSupply_1_NegativeElectrode'} className="dropTarget">
                              <p aria-hidden="true" className="label" style={{display:"none"}}>Power Supply Anode</p>
                            </div>
                          </div>
                        </div>
                        <div className="group">
                          <div className="electrode">
                            <div id={'PowerSupply_1_PositiveElectrode'} className="dropTarget">
                              <p aria-hidden="true" className="label" style={{display:"none"}}>Power Supply Cathode</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p aria-hidden="true" className="label">Power Supply</p>
                    <Graphics/>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        anodeConnected: state.powerSupply.anodeConnected,
        cathodeConnected: state.powerSupply.cathodeConnected,
        active: state.powerSupply.active,
        voltage: state.powerSupply.voltage,
        current: state.powerSupply.current,
    }
}

export default connect(mapStateToProps, {
    setPowerSupplyAnodeConnected,
    setPowerSupplyCathodeConnected,
    setModal,
    showModal,
})(PowerSupply);
