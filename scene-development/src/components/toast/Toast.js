import React, { Component } from 'react'
import ToastIcon from './img/toast-icon.svg'
// import FocusLock, { AutoFocusInside } from 'react-focus-lock'
import colors from '../../styles/_colors.scss'

import './Toast.scss'

const CloseButton = ({ closeToast }) => (
  <i tabIndex="0"
    style={{position: 'absolute', top: '4px', right: '4px', fontStyle: 'normal'}}
    className="material-icons"
    aria-label="close alert"
    onKeyPress={closeToast}
    onClick={closeToast}
  >✖</i>
);

class Toast extends Component {

    genIconContainer = () => {
        let color = colors.charcoal1

        switch (this.props.type) {
            case "WARNING":
                color = colors.red2
                break;

            case "HINT":
                color = colors.yellow1
                break;

            default:
                break;
        }

        return (
            <div className="toast-img-container"
                style={{backgroundColor:color}}>
                <img className="toast-icon" alt="Notification icon." src={ToastIcon} />
            </div>
        )
    }

    componentDidMount(){
      this.toast.focus();
    }

    render() {
        return (
            <div className="toast-container">
                {this.genIconContainer()}
                <div className="toast-text-container" data-autofocus ref={(toast)=>{this.toast=toast;}} onClick={this.props.closeToast} tabIndex="0">
                    <p className="toast-text-heading">{this.props.title}</p>
                    <p className="toast-text-message">{this.props.msg}</p>
                </div>
                <CloseButton closeToast={this.props.closeToast}/>
            </div>
        );
    }
}

export default Toast;
