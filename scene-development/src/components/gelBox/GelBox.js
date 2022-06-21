import React, { Component } from "react";
import { connect } from "react-redux";
import Graphics from 'components/gelBox/Graphics';

import './GelBox.scss'
import {
  gelBoxOpen
} from '../../actions';

class GelBox extends Component {


    render() {
        return (
          <ul>
            <li
                aria-label="Gel electrophoresis Box"
                id={'GelBox_'+this.props.id}
                className={'GelBox'+' '+this.props.type.replace(/\s/g,'')+' '+((this.props.open)?' open':'')}>
                <div className="electrodes">
                  <div className="electrode">
                    <div id={'GelBox_'+this.props.id+'_NegativeElectrode'} className="dropTarget">
                      <p aria-hidden="true" className="label" style={{display:"none"}}>Gel Electrophoresis Box Anode</p>
                    </div>
                  </div>
                  <div className="electrode">
                    <div id={'GelBox_'+this.props.id+'_PositiveElectrode'} className="dropTarget">
                      <p aria-hidden="true" className="label" style={{display:"none"}}>Gel Electrophoresis Box Cathode</p>
                    </div>
                  </div>
                </div>
                <p aria-hidden="true" className="label">{this.props.type}</p>
                <Graphics id={this.props.id}/>
            </li>
          </ul>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    //Using gelBoxs array because individual elements
    //don't populate in time to map to props
    console.log("Has gel in box",state.gelBox.gelBoxes[ownProps.id-1].containsGel);
    return {
        id: ownProps.id,
        aria: ownProps.aria,
        open: state.gelBox.gelBoxes[ownProps.id-1].open,
        type: state.gelBox.gelBoxes[ownProps.id-1].type,
        containsGel: state.gelBox.gelBoxes[ownProps.id-1].containsGel,
        description: null
    };
};

export default connect(mapStateToProps, {
  gelBoxOpen,
})(GelBox);
