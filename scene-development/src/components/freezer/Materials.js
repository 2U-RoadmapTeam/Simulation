import React, { Component } from 'react';
import { connect } from 'react-redux';

// images
import freezer_closed from './img/freezer-closed_.svg'
import freezer_closed_with_solutions from './img/freezer-closed-with-solution-tubes.svg'
import freezer_open from './img/freezer-open_.svg'
import freezer_open_with_solutions from './img/freezer-open-with-solution-tubes.svg'

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../toast/Toast'
import colors from 'styles/_colors.scss';

// actions
import { 
    createFreezer,
    setFreezerOpen,
    setFreezerTemp,
    tubeInFreezer
} from '../../actions';

const images = {
    freezer: freezer_closed,
    freezer_with_solutions: freezer_closed_with_solutions,
    freezer_open: freezer_open,
    freezer_open_with_solutions: freezer_open_with_solutions
}

const imageStyle = {
    width: '30px',
    zIndex: 99,
}

class Graphics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            temp: this.props.temp
        };
    }

    makeToast = (type, msg, title) => {
        let color = ""
        if(type==="HINT"){
          color = colors.yellow1
        } else {
          color = colors.red1
        }
    
        toast(<Toast type={type} msg={msg} title={title} />, {
          className: css({
            border: "2px solid "+color,
            borderRadius: "6px",
            marginLeft: "-200px",
            minWidth: "400px"
          }),
          progressClassName: css({
            background: color
          }),
          position: "top-center",
          autoClose: 5000,
        });
    };

    toggleFreezer = () => {
        
        this.props.setFreezerOpen({
            id: this.props.id,
            open: !this.props.open,
        });

    };

    setTemperature = () => {
        this.props.setFreezerTemp({
            temp: this.props.temp
        });

        return this.props.temp;
    }

    renderComponentImageState() {
        // _open  ,  _with_solutions

        let image = "freezer";

        if (this.props.open) {
            image += "_open"
        }
        if (this.props.inFreezer) {
            image += "_with_solutions"
        }

        return images[image];

    }

    ejectSolutionTray = () => {
        if (!this.props.open) {
            this.makeToast('WARNING', 'Please open the freezer door.', 'Freezer Closed!')
        } else {
            this.props.tubeInFreezer({
                inFreezer: false
            });
        }
    };

    componentDidMount() {
        this.setTemperature();
        this.renderComponentImageState();
    }

    render () {
        return (
            <div>
                <div aria-label="Freezer" className="graphics" onClick={ this.toggleFreezer }>
                    <div>
                        <img 
                            // style={imageStyle} 
                            src={ images.freezer } 
                            aria-label={'Freezer'} 
                            alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        type: ownProps.type,
        open: state.freezer.open,
        temp: state.freezer.temp,
        inFreezer: state.floatingTubeRack.inFreezer
    }
};

export default connect(mapStateToProps, {
    createFreezer,
    setFreezerOpen,
    setFreezerTemp,
    tubeInFreezer
})(Graphics);