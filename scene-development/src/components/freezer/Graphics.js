import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatingTubeRack from "../floatingTubeRack/Graphics";

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

import { throttle } from "lodash";

// actions
import {
    createFreezer,
    setFreezerOpen,
    setFreezerTemp,
    tubeInFreezer,
    freezerContainsTubeRack
} from '../../actions';

const images = {
    freezer: freezer_closed,
    freezer_with_solutions: freezer_closed_with_solutions,
    freezer_open: freezer_open,
    freezer_open_with_solutions: freezer_open_with_solutions
}

const imageStyle = {
    width: '150px',
    cursor: 'pointer',
    zIndex: 1 + ' !important',
    pointerEvents: 'none'
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
    }

    renderComponentImageState() {
        // _open  ,  _with_solutions

        let image = "freezer";

        if (this.props.open) {
            image += "_open"
        }
        // if (this.props.inFreezer) {
        //     image += "_with_solutions"
        // }

        return images[image];

    }

    ejectSolutionTray = () => {

        if (!this.props.open) {
            this.makeToast('WARNING', 'Please open the freezer door.', 'Freezer Closed!')
        } else {
          if(this.props.hasRack){
            this.props.tubeInFreezer({
                inFreezer: false
            });
            this.props.freezerContainsTubeRack({
              containsTubeRack: false
            });
          } else {
            this.makeToast('WARNING', 'There is nothing to eject.', 'Empty!')
          }
        }
    };

    // function for triggering mouse events
    fireMouseEvent = (type, elem, centerX, centerY) => {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);

      evt.dataTransfer = new DataTransfer();
      elem.dispatchEvent(evt);
    };

    onDragStart = (e) => {
      e.stopPropagation();

      let dragImage = document.getElementById('dragImage')

      if(dragImage == null){

        dragImage = document.createElement('img')
        dragImage.id = "dragImage"
        dragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        document.body.appendChild(dragImage);
      }

      var testVar = window.DataTransfer || window.Clipboard;  // Clipboard is for Chrome
      if("setDragImage" in testVar.prototype) {
          e.dataTransfer.setDragImage(dragImage, 0, 0)
      }
      if("setData" in testVar.prototype){
          e.dataTransfer.setData('text/plain', '');
      }

      //Set tube visibility to false
      this.props.tubeInFreezer({
        inFreezer: false
      });

      //Set containsTubeRack in WaterBath to false
      this.props.freezerContainsTubeRack({
        containsTubeRack: false
      });

      // Fire a dragstart event, now on the floating rack, since it should be available again
      // let target = document.getElementById('FloatingTubeRack')
      // let pos = target.getBoundingClientRect()
      //
      // target.parentNode.style.pointerEvents = 'none';
      //
      // this.fireMouseEvent('dragstart', target, e.clientX, e.clientY);

    }

    // onDragOver = throttle((e) => {
    //
    //   e.preventDefault();
    //   e.stopPropagation();
    //
    //   // Fire a dragstart event, now on the floating rack, since it should be available again
    //   let target = document.getElementById('FloatingTubeRack');
    //   this.fireMouseEvent('dragover', target, e.clientX, e.clientY);
    //
    // }, 10)
    //
    // onDragEnd = (e) => {
    //   e.preventDefault();
    //
    //   console.log('Ended', e.target);
    //
    //   // Fire a dragstart event, now on the floating rack, since it should be available again
    //   let target = document.getElementById('FloatingTubeRack');
    //
    //   target.parentNode.style.pointerEvents = '';
    //   this.fireMouseEvent('dragdrop', target, e.clientX, e.clientY);
    // }

    componentDidMount() {
        //this.setTemperature();
        this.renderComponentImageState();
    }

    render () {
        return (
            <div>
                <div style={{ zIndex: '10' }}
                    tabIndex={0}
                    onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.ejectSolutionTray(e)} }
                    className="eject-button"
                    onClick= { this.ejectSolutionTray }>
                        Eject
                </div>
                <div aria-label="Freezer" className="graphics" onClick={ this.toggleFreezer } tabIndex={0}
                aria-label="Freezer"
                onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.toggleFreezer(e)} }>

                    <div className="freezer-temp">
                        <label> Temp </label>
                        <div className="text"> { this.props.temp } &#8451; </div>
                    </div>
                    <div
                    className="floatingRackDrag"
                    draggable
                    onDragStart={this.onDragStart}
                    //onDragOver={(e)=>{e.persist();this.onDragOver(e);}}
                    //onDragEnd={this.onDragEnd}
                    style={{display: (this.props.open && this.props.hasRack)?"initial":"none"}}></div>
                    <div className="floatingRackInsert" style={{display: (this.props.hasRack)? 'initial': 'none'}}>
                      <FloatingTubeRack id={1} />
                    </div>
                    <div>
                        <img
                            style={imageStyle}
                            src={ this.renderComponentImageState() }
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
        hasRack: state.freezer.containsTubeRack
    }
};

export default connect(mapStateToProps, {
    createFreezer,
    setFreezerOpen,
    setFreezerTemp,
    tubeInFreezer,
    freezerContainsTubeRack
})(Graphics);
