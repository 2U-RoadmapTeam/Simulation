import React, { Component } from "react"
import { connect } from "react-redux"
import throttle from 'lodash/throttle'

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'
import Toast from '../toast/Toast'

import { scale } from '../../lib/hotspot'

import {
  setPowerSupplyLeadPostive,
  setPowerSupplyLeadNegative,
  setPowerSupplyAnodeConnected,
  setPowerSupplyCathodeConnected,
  setGelBoxAnodeConnected,
  setGelBoxCathodeConnected,
  setPositiveLeadConnection,
  setNegativeLeadConnection,
  pushInteractions,
  setPowerSupplyLeadHeld,
  setPowerSupplyLeadControlVisibility,
  setMoveMenu,
  showMoveMenu,
  hideAllControls
} from '../../actions';

import "./PowerSupplyLead.scss";
import colors from 'styles/_colors.scss';

import MoveMenu from "./MoveMenu"

import PlugPositive from "./img/plugPositive.svg"
import PlugNegative from "./img/plugNegative.svg"
import PlugPositivePlugged from "./img/plugPositivePlugged.svg"
import PlugNegativePlugged from "./img/plugNegativePlugged.svg"
import LeadBundle from "./img/leadBundle.svg"
import LeadBundle1 from "./img/leadBundle1.svg"
import LeadBundle2 from "./img/leadBundle2.svg"
import LeadBundle3 from "./img/leadBundle3.svg"
import Move from "./img/move.svg";

class PowerSupplyLead extends Component {

  constructor(props) {
    super(props)

    this.state = {
      positiveLead: {
        x1: this.props.positiveLead.x1,
        y1: this.props.positiveLead.y1,
        x2: this.props.positiveLead.x2,
        y2: this.props.positiveLead.y2,
      },
      negativeLead: {
        x1: this.props.negativeLead.x1,
        y1: this.props.negativeLead.y1,
        x2: this.props.negativeLead.x2,
        y2: this.props.negativeLead.y2,
      },
      dragged: null,
    }

    const interactions = (heldObj, target) => {

      //Don't run if this gel not the held object
      if(heldObj.type !== "PowerSupplyLead" || heldObj.id !== this.props.id){
        return null;
      }

      // Disconnect the cable
      // --------------------
      if(target === null || target.type !== "GelBox" || target.type !== "PowerSupply"){
        let cableType = parseInt(heldObj.htmlObj.id.split('_')[2], 10)
        let powerSupply = this.props.interactionProps.powerSupply
        let gelBoxes = this.props.interactionProps.gelBoxes

        if (cableType === 1 || cableType === 2) {

          //console.log(this.props, ('positiveLead'+(cableType)), )

          let connected = this.props[('positiveLead'+(cableType))]

          if(typeof connected !== 'boolean' && connected.includes('powerSupply')){

            if(powerSupply.anodeConnected === true){

              this.props.setPositiveLeadConnection({
                index: cableType,
                leadConnected: false
              })

              this.props.setPowerSupplyAnodeConnected({
                anodeConnected: false
              })
            }
          }
          if(typeof connected !== 'boolean' && connected.includes('gelBox')){

            if(gelBoxes[0].anodeConnected){
              this.props.setPositiveLeadConnection({
                index: cableType,
                leadConnected: false
              })

              this.props.setGelBoxAnodeConnected({
                id: (1),
                anodeConnected: false
              })
            }
          }
        }
        if (cableType === 3 || cableType === 4) {

        let connected = this.props[('negativeLead'+(cableType - 2))]

          if(typeof connected !== 'boolean' && connected.includes('powerSupply')){

            if(powerSupply.cathodeConnected === true){

              this.props.setNegativeLeadConnection({
                index: (cableType - 2),
                leadConnected: false
              })

              this.props.setPowerSupplyCathodeConnected({
                cathodeConnected: false
              })
            }
          }
          if(typeof connected !== 'boolean' && connected.includes('gelBox')){

            if(gelBoxes[0].cathodeConnected){
              this.props.setNegativeLeadConnection({
                index: (cableType - 2),
                leadConnected: false
              })

              this.props.setGelBoxCathodeConnected({
                id: (1),
                cathodeConnected: false
              })
            }
          }
        }
      }

      if (target === undefined || target === null) {
        return null;
      }

      if (target.type === "PowerSupply") {

          //Get the targeted TipBox
          const targetPowerSupply = this.props.interactionProps.powerSupply

          let cableType = parseInt(heldObj.htmlObj.id.split('_')[2], 10)

          console.log(cableType, target)

          if (cableType === 1 || cableType === 2) {
            //Tip Box anode not connected - connect the anode
            if(target.subId === 'NegativeElectrode'){

              this.makeToast("WARNING", "You should only connect the positive lead to the anode.", "Incorrect Lead!")

            } else if (targetPowerSupply.anodeConnected) {
              //Alert - pipette already has a tip attached
              this.makeToast("WARNING", "The power supply has a cable connected to the anode.", "Power supply connected!")

            } else {
              //No power supply to anode - can attach
              console.log("connect anode");

              this.props.setPowerSupplyAnodeConnected({
                anodeConnected: true
              })

              this.props.setPositiveLeadConnection({
                index: cableType,
                leadConnected: 'powerSupply_Anode'
              })

            }
          } else if (cableType === 3 || cableType === 4) {
            //Tip Box anode not connected - connect the anode
            if(target.subId === 'PositiveElectrode'){

              this.makeToast("WARNING", "You should only connect the negative lead to the cathode.", "Incorrect Lead!")

            } else if (targetPowerSupply.cathodeConnected) {
              //Alert - pipette already has a tip attached
              this.makeToast("WARNING", "The power supply has a cable connected to the cathode.", "Power supply connected!")

            } else {
              //No power supply to cathode - can attach
              console.log("connect cathode");

              this.props.setPowerSupplyCathodeConnected({
                cathodeConnected: true,
              })

              this.props.setNegativeLeadConnection({
                index: (cableType - 2),
                leadConnected: 'powerSupply_Cathode'
              })


            }
          }

      } else if (target.type === "GelBox") {
        //All GelBox interactions
        //Get the targeted TipBox
        const gelsID = target.id
        const targetGelBox = this.props.interactionProps.gelBoxes[gelsID - 1]

        if(!targetGelBox.open){

          let cableType = parseInt(heldObj.htmlObj.id.split('_')[2], 10)

          if (cableType === 1 || cableType === 2) {
            //Tip Box anode not connected - connect the anode

            console.log(target.subId);

            if(target.subId === 'NegativeElectrode'){

              this.makeToast("WARNING", "You should only connect the positive lead to the anode.", "Incorrect Lead!")

            } else if (targetGelBox.anodeConnected) {
              //Alert - pipette already has a tip attached
              this.makeToast("WARNING", "The gel box has a cable connected to the anode.", "Gel box connected!")

            } else {
              //No power supply to anode - can attach
              console.log("connect anode");

              this.props.setGelBoxAnodeConnected({
                id: gelsID,
                anodeConnected: true,
              })

              this.props.setPositiveLeadConnection({
                index: cableType,
                leadConnected: ('gelBox_Anode_1')
              })
            }
          } else if (cableType === 3 || cableType === 4) {
            //Tip Box anode not connected - connect the anode
            if(target.subId === 'PositiveElectrode'){

              this.makeToast("WARNING", "You should only connect the negative lead to the cathode.", "Incorrect Lead!")

            } else if (targetGelBox.cathodeConnected) {
              //Alert - pipette already has a tip attached
              this.makeToast("WARNING", "The gel box has a cable connected to the cathode.", "Gel box connected!")

            } else {
              //No power supply to cathode - can attach
              console.log("connect cathode");

              this.props.setGelBoxCathodeConnected({
                id: gelsID,
                cathodeConnected: true,
              })

              this.props.setNegativeLeadConnection({
                index: (cableType - 2),
                leadConnected: ('gelBox_Cathode_1')
              })
            }
          }

        } else {
          this.makeToast("WARNING", "Please close the lid before connecting or disconnecting the power cords.", "Gel box open!")
        }
      } else {
        return null
      }
    }

    Object.defineProperty(interactions, 'name', {value: ('power_supply_leads_'+this.props.id), configurable: true});
    this.props.pushInteractions([interactions])

  }

  makeToast = (type, msg, title) => {
    let color = ""
    if(type==="HINT"){
      color = colors.yellow1
    } else {
      color = colors.red1
    }

    toast(<Toast type={type} msg={msg} title={title} />,{
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
  }

  onDragStart = (e) => {
    console.log("Power_lead_start", e.target, this.state.dragged);

    let powerSupply = this.props.interactionProps.powerSupply;

    console.log( (this.props.negativeLead1 === 'powerSupply_Cathode' || this.props.negativeLead2 === 'powerSupply_Cathode'), (this.props.positiveLead1 === 'powerSupply_Anode' || this.props.positiveLead2 === 'powerSupply_Anode')  )

    if( (this.props.negativeLead1 === 'powerSupply_Cathode' || this.props.negativeLead2 === 'powerSupply_Cathode') || (this.props.positiveLead1 === 'powerSupply_Anode' || this.props.positiveLead2 === 'powerSupply_Anode') ){
      if(powerSupply.power){

        e.stopPropagation();
        e.preventDefault();

        this.makeToast("WARNING", "Always ensure that the power supply is switched off before touching the power cords.", "Electrocution risk!")
      }
    }

    if(e.target.classList.contains('Positive')){
      this.setState({
        dragged: 'Positive'
      });

      // Array.from(document.getElementsByClassName('PowerLead')).forEach(function(elem, index){
      //   elem.style.pointerEvents = 'none'
      // });
    }
    if(e.target.classList.contains('Negative')){
      this.setState({
        dragged: 'Negative'
      });

      // Array.from(document.getElementsByClassName('PowerLead')).forEach(function(elem, index){
      //   elem.style.pointerEvents = 'none'
      // });
    }
  }

  drag = throttle((target) => {

    if(this.state.dragged === 'Positive'){
      if(target.classList.contains(1)){
        this.setState({
          positiveLead: {
            x1: ((target.getBoundingClientRect().left - target.parentNode.getBoundingClientRect().left) / scale) - 10,
            y1: (target.getBoundingClientRect().top - target.parentNode.getBoundingClientRect().top) / scale,
            x2: this.state.positiveLead.x2,
            y2: this.state.positiveLead.y2
          }
        });
      } else if(target.classList.contains(2)){
        this.setState({
          positiveLead: {
            x1: this.state.positiveLead.x1,
            y1: this.state.positiveLead.y1,
            x2: ((target.getBoundingClientRect().left - target.parentNode.getBoundingClientRect().left) / scale) - 2,
            y2: (target.getBoundingClientRect().top - target.parentNode.getBoundingClientRect().top) / scale,
          }
        });
      }
    }
    if(this.state.dragged === 'Negative'){
      if(target.classList.contains(1)){
        this.setState({
          negativeLead: {
            x1: ((target.getBoundingClientRect().left - target.parentNode.getBoundingClientRect().left) / scale) + 4,
            y1: (target.getBoundingClientRect().top - target.parentNode.getBoundingClientRect().top) / scale,
            x2: this.state.negativeLead.x2,
            y2: this.state.negativeLead.y2
          }
        });
      } else if(target.classList.contains(2)){
        this.setState({
          negativeLead: {
            x1: this.state.negativeLead.x1,
            y1: this.state.negativeLead.y1,
            x2: ((target.getBoundingClientRect().left - target.parentNode.getBoundingClientRect().left) / scale) + 15,
            y2: (target.getBoundingClientRect().top - target.parentNode.getBoundingClientRect().top) / scale,
          }
        }, function(){

          // let perp = Math.atan2( ((this.props.negativeLead1)?this.state.negativeLead.x1:6) - this.state.negativeLead.x2, this.state.negativeLead.y1 - ((this.props.negativeLead1)?this.state.negativeLead.y2:49) ) * 180 / Math.PI;
          // target.childNodes[0].style.transform = 'rotate('+(15 + perp)+'deg)'

        });
      }
    }

  }, 10)

  onDragOver = (e) => {
    console.log("Power_lead_drag", e.target, this.state.dragged);
    e.preventDefault()
    this.drag(e.target.parentNode)
  }

  onDragEnd = (e) => {
    console.log("Power_lead_end", e.target, this.state.dragged);
    e.preventDefault()
    this.drag(e.target)

    if(this.state.dragged === 'Positive'){
      this.props.setPowerSupplyLeadPostive({
        positiveLead: {
          x1: this.state.positiveLead.x1,
          y1: this.state.positiveLead.y1,
          x2: this.state.positiveLead.x2,
          y2: this.state.positiveLead.y2,
        }
      })
    }

    if(this.state.dragged === 'Negative'){
      this.props.setPowerSupplyLeadNegative({
        negativeLead: {
          x1: this.state.negativeLead.x1,
          y1: this.state.negativeLead.y1,
          x2: this.state.negativeLead.x2,
          y2: this.state.negativeLead.y2,
        }
      })
    }

    this.setState({
      dragged: null
    });

    // Array.from(document.getElementsByClassName('PowerLead')).forEach(function(elem, index){
    //   elem.style.pointerEvents = 'initial'
    // });
  }

  // generateCurve = (x1, x2, y1, y2) => {
  //
  //   // We want to generate two quadratic curve
  //   // for each end point of the cable.
  //
  //   // mid-point of line:
  //   let mpx = (x1 + x2) * 0.5;
  //   let mpy = (y1 + y2) * 0.5;
  //
  //   // 25% of line:
  //   let mpx1 = (x1 + x2) * 0.25;
  //   let mpy1 = (y1 + y2) * 0.25;
  //
  //   // 75% of line:
  //   let mpx2 = (x1 + x2) * 0.75;
  //   let mpy2 = (y1 + y2) * 0.75;
  //
  //   // angle of perpendicular to line:
  //   let theta = Math.atan2(y1 - y2, x1 - x2) - Math.PI / 2;
  //
  //   // distance of control point from mid-point of line:
  //   let offset = 40;
  //   let xOffset = offset;
  //   let yOffset = offset;
  //
  //   if(x1 < x2){
  //     xOffset = -Math.abs(xOffset);
  //   }
  //
  //   if(y1 < y2){
  //     yOffset = -Math.abs(yOffset);
  //   }
  //
  //   // location of control point:
  //   let c1x1 = mpx1 + (-offset) * Math.cos(theta);
  //   let c1y1 = mpy1 + (-offset) * Math.sin(theta);
  //
  //   let c1x2 = mpx2 + offset * Math.cos(theta);
  //   let c1y2 = mpy2 + offset * Math.sin(theta);
  //
  //   // construct the command to draw a quadratic curve
  //   return "M" + x1 + " " + y1 +
  //
  //          // Curve connecting the lead to the bundle
  //          //" Q " + mpx1 + " " + mpy1 + " " + mpx1 + " " + (mpy1 - yOffset) +
  //
  //          // Curve to seamlessly connect the two curves
  //          " Q " + (mpx2 + xOffset) + " " + (y2 + yOffset) + " " + mpx2 + " " + (y2 + yOffset) +
  //
  //          // Curve for the end-point of the lead
  //          " Q " + x2 + " " + (y2 + yOffset) + " " + x2 + " " + y2;
  // };


  showControls = (e)=> {
    this.props.hideAllControls();
    let id = e.target.parentNode.id.split('_');
    this.props.setPowerSupplyLeadControlVisibility({id: (id[1] === 1)?(id[2] - 1):(id[2] + 1), controlsVisible: true});
  }

  leadSelected = (e) => {

    let id = e.target.parentNode.id.split('_');

    if(!this.props.leads[(id[1] === 1)?(id[2] - 1):(id[2] + 1)].controlsVisible){
        this.showControls(e)
    }

    this.props.setPowerSupplyLeadHeld({
      id: (id[1] === 1)?(id[2] - 1):(id[2] + 1),
      held: true,
    })
  }

  leadUnselected = (e) => {

    let id = e.target.parentNode.id.split('_');

    this.props.setPowerSupplyLeadHeld({
      id: (id[1] === 1)?(id[2] - 1):(id[2] + 1),
      held: false,
    })
  }

  showMoveMenu = e => {

    let id = e.target.parentNode.id.split('_');

    this.props.setMoveMenu({
      type: this.props.type,
      connect: (id[1] === 1)?(id[2] - 1):(id[2] + 1)
    });
    this.props.showMoveMenu({ display: !this.props.moveMenuDisplay });
  };

  componentDidUpdate(prevProps, prevState){
    if(prevProps.positiveLead !== this.props.positiveLead || prevProps.negativeLead !== this.props.negativeLead){
      this.setState({
        positiveLead: this.props.positiveLead,
        negativeLead: this.props.negativeLead
      })
    }
  }

  showControls = (e)=> {
    this.props.hideAllControls();
    let id = e.target.parentNode.id.split('_');
    this.props.setPowerSupplyLeadControlVisibility({id: (id[1] == 1)?(id[2] - 1):(id[2] + 1), controlsVisible: true});
  }

  leadSelected = (e) => {

    let id = e.target.parentNode.id.split('_');

    if(!this.props.leads[(id[1] == 1)?(id[2] - 1):(id[2] + 1)].controlsVisible){
        this.showControls(e)
    }

    this.props.setPowerSupplyLeadHeld({
      id: (id[1] == 1)?(id[2] - 1):(id[2] + 1),
      held: true,
    })
  }

  leadUnselected = (e) => {

    let id = e.target.parentNode.id.split('_');

    this.props.setPowerSupplyLeadHeld({
      id: (id[1] == 1)?(id[2] - 1):(id[2] + 1),
      held: false,
    })
  }

  showMoveMenu = e => {

    let id = e.target.parentNode.id.split('_');

    this.props.setMoveMenu({
      type: this.props.type,
      connect: (id[1] == 1)?(id[2] - 1):(id[2] + 1)
    });
    this.props.showMoveMenu({ display: !this.props.moveMenuDisplay });
  };

  componentDidUpdate(prevProps, prevState){
    if(prevProps.positiveLead !== this.props.positiveLead || prevProps.negativeLead !== this.props.negativeLead){
      this.setState({
        positiveLead: this.props.positiveLead,
        negativeLead: this.props.negativeLead
      })
    }
  }

  render() {
    return (
      <ul>
        <li
            id={"PowerSupplyLead_"+this.props.id}
            className="PowerSupplyLeads">
            <img
              src={(this.props.positiveLead1 || this.props.positiveLead2)?(this.props.negativeLead1 || this.props.negativeLead2)?LeadBundle3:LeadBundle1:(this.props.negativeLead1 || this.props.negativeLead2)?LeadBundle2:LeadBundle}
              draggable="false"
              style={{pointerEvents: 'none'}}
              className="lead-bundle"
              alt="Power supply lead bundle"/>
            <div className="Leads">
              <svg>
                <line
                  style={{display: ((this.props.positiveLead1 && !this.props.positiveLead2)?'none':'initial')}}
                  x1={((this.props.positiveLead2)?this.state.positiveLead.x2:-6)}
                  y1={((this.props.positiveLead2)?this.state.positiveLead.y2:49)}
                  x2={this.state.positiveLead.x1}
                  y2={this.state.positiveLead.y1}
                  stroke-width="4px"
                  stroke="#AD210C"/>
              </svg>
              <svg>
                <line
                  style={{display: ((this.props.positiveLead2 && !this.props.positiveLead1)?'none':'initial')}}
                  x1={((this.props.positiveLead1)?this.state.positiveLead.x1:-6)}
                  y1={((this.props.positiveLead1)?this.state.positiveLead.y1:49)}
                  x2={this.state.positiveLead.x2}
                  y2={this.state.positiveLead.y2}
                  stroke-width="4px"
                  stroke="#AD210C"/>
              </svg>
              <svg>
                <line
                  style={{display: ((this.props.negativeLead1 && !this.props.negativeLead2)?'none':'initial')}}
                  x1={((this.props.negativeLead2)?this.state.negativeLead.x2:6)}
                  y1={((this.props.negativeLead2)?this.state.negativeLead.y2:49)}
                  x2={this.state.negativeLead.x1}
                  y2={this.state.negativeLead.y1}
                  stroke-width="4px"
                  stroke="black"/>
              </svg>
              <svg>
                <line
                  style={{display: ((this.props.negativeLead2 && !this.props.negativeLead1)?'none':'initial')}}
                  x1={((this.props.negativeLead1)?this.state.negativeLead.x1:6)}
                  y1={((this.props.negativeLead1)?this.state.negativeLead.y1:49)}
                  x2={this.state.negativeLead.x2}
                  y2={this.state.negativeLead.y2}
                  stroke-width="4px"
                  stroke="black"/>
              </svg>
            </div>
            <ul className="PowerLeads">
              <li style={{zIndex: (this.props.leads[0].controlsVisible)?99:null}}>
                <div
                  id={"PowerSupplyLead_"+this.props.id+"_1"}
                  draggable
                  aria-label={"PowerLead Positive 1"}
                  onDragStart={this.onDragStart}
                  onDragOver={this.onDragOver}
                  onDragEnd={this.onDragEnd}
                  className="PowerLead Positive 1 draggable"
                  style={{ transform: "translate3d(-22px, 130px, 0px) rotateZ(0deg)" }}>
                  <div
                    aria-label={"PowerLead Positive 1"}
                    tabIndex={0}
                    onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.leadSelected(e) } }
                    onMouseUp={this.leadUnselected}
                    onMouseDown={this.leadSelected}>
                  <img aria-label={"PowerLead Positive 1"} alt={"PowerLead Positive 1"} src={(this.props.positiveLead1)?PlugPositivePlugged:PlugPositive} />
                  </div>
                  <div className="move-menu" draggable="false" style={{ display: this.props.leads[0].controlsVisible ? null : "none" }}
                  onDragStart={(e)=>{e.preventDefault(); e.stopPropagation()}}
                  onDragOver={(e)=>{e.preventDefault(); e.stopPropagation()}}
                  onDragEnd={(e)=>{e.preventDefault(); e.stopPropagation()}}>
                    <button
                      tabIndex={0}
                      className="move-button"
                      onClick={this.showMoveMenu}
                      aria-label="Move menu. Select to view the available positions."
                    >
                      <img src={Move} alt="Move menu icon."/>
                    </button>
                    <MoveMenu type={this.props.type} connect={0} />
                  </div>
                </div>
              </li>
              <li style={{zIndex: (this.props.leads[1].controlsVisible)?99:null}}>
                <div
                  id={"PowerSupplyLead_"+this.props.id+"_2"}
                  draggable
                  aria-label={"PowerLead Positive 2"}
                  onDragStart={this.onDragStart}
                  onDragOver={this.onDragOver}
                  onDragEnd={this.onDragEnd}
                  className="PowerLead Positive 2 draggable"
                  style={{ transform: "translate3d(-7px, 150px, 0px) rotateZ(0deg)" }}>
                  <div
                    aria-label={"PowerLead Positive 2"}
                    tabIndex={0}
                    onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.leadSelected(e) } }
                    onMouseUp={this.leadUnselected}
                    onMouseDown={this.leadSelected}>
                  <img aria-label={"PowerLead Positive 2"} alt={"PowerLead Positive 2"} src={(this.props.positiveLead2)?PlugPositivePlugged:PlugPositive} />
                  </div>
                  <div className="move-menu" draggable="false" style={{ display: this.props.leads[1].controlsVisible ? null : "none" }}
                  onDragStart={(e)=>{e.preventDefault(); e.stopPropagation()}}
                  onDragOver={(e)=>{e.preventDefault(); e.stopPropagation()}}
                  onDragEnd={(e)=>{e.preventDefault(); e.stopPropagation()}}>
                    <button
                      tabIndex={0}
                      className="move-button"
                      onClick={this.showMoveMenu} aria-label="Move menu. Select to view the available positions."
                    >
                      <img src={Move} alt="Move menu icon."/>
                    </button>
                    <MoveMenu type={this.props.type} connect={1} />
                  </div>
                </div>
              </li>
              <li style={{zIndex: (this.props.leads[2].controlsVisible)?99:null}}>
                <div
                  id={"PowerSupplyLead_"+this.props.id+"_3"}
                  draggable
                  aria-label={"PowerLead Positive 3"}
                  onDragStart={this.onDragStart}
                  onDragOver={this.onDragOver}
                  onDragEnd={this.onDragEnd}
                  className="PowerLead Negative 1 draggable"
                  style={{ transform: "translate3d(7px, 150px, 0px) rotateZ(0deg)" }}>
                  <div
                    aria-label={"PowerLead Positive 3"}
                    tabIndex={0}
                    onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.leadSelected(e) } }
                    onMouseUp={this.leadUnselected}
                    onMouseDown={this.leadSelected}>
                  <img aria-label={"PowerLead Positive 3"} alt={"PowerLead Positive 3"} src={(this.props.negativeLead1)?PlugNegativePlugged:PlugNegative} />
                  </div>
                  <div className="move-menu" draggable="false" style={{ display: this.props.leads[2].controlsVisible ? null : "none" }}
                  onDragStart={(e)=>{e.preventDefault(); e.stopPropagation()}}
                  onDragOver={(e)=>{e.preventDefault(); e.stopPropagation()}}
                  onDragEnd={(e)=>{e.preventDefault(); e.stopPropagation()}}>
                    <button
                      tabIndex={0}
                      className="move-button"
                      onClick={this.showMoveMenu} aria-label="Move menu. Select to view the available positions."
                    >
                      <img src={Move} alt="Move menu icon." />
                    </button>
                    <MoveMenu type={this.props.type} connect={2} />
                  </div>
                </div>
              </li>
              <li style={{zIndex: (this.props.leads[3].controlsVisible)?99:null}}>
                <div
                  id={"PowerSupplyLead_"+this.props.id+"_4"}
                  draggable
                  aria-label={"PowerLead Positive 4"}
                  onDragStart={this.onDragStart}
                  onDragOver={this.onDragOver}
                  onDragEnd={this.onDragEnd}
                  className="PowerLead Negative 2 draggable"
                  style={{ transform: "translate3d(22px, 130px, 0px) rotateZ(0deg)" }}>
                  <div
                    aria-label={"PowerLead Positive 4"}
                    tabIndex={0}
                    onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.leadSelected(e) } }
                    onMouseUp={this.leadUnselected}
                    onMouseDown={this.leadSelected}>
                  <img aria-label={"PowerLead Positive 4"} alt={"PowerLead Positive 4"} src={(this.props.negativeLead2)?PlugNegativePlugged:PlugNegative} />
                  </div>
                  <div className="move-menu" draggable="false" style={{ display: this.props.leads[3].controlsVisible ? null : "none" }}
                  onDragStart={(e)=>{e.preventDefault(); e.stopPropagation()}}
                  onDragOver={(e)=>{e.preventDefault(); e.stopPropagation()}}
                  onDragEnd={(e)=>{e.preventDefault(); e.stopPropagation()}}>
                    <button
                      tabIndex={0}
                      className="move-button"
                      onClick={this.showMoveMenu} aria-label="Move menu. Select to view the available positions."
                    >
                      <img src={Move} alt="Move menu icon." />
                    </button>
                    <MoveMenu type={this.props.type} connect={3} />
                  </div>
                </div>
              </li>
            </ul>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        id: ownProps.id,
        type: state.powerSupplyLead.type,
        moveMenuDisplay: state.moveMenu.display,
        positiveLead: state.powerSupplyLead.positiveLead,
        negativeLead: state.powerSupplyLead.negativeLead,
        positiveLead1: state.powerSupplyLead.positiveLeads['1'],
        negativeLead1: state.powerSupplyLead.negativeLeads['1'],
        positiveLead2: state.powerSupplyLead.positiveLeads['2'],
        negativeLead2: state.powerSupplyLead.negativeLeads['2'],
        leads: state.powerSupplyLead.leads,
        description: null,
        interactionProps: {
          gelBoxes: state.gelBox.gelBoxes,
          powerSupply: state.powerSupply
        }
    };
};

export default connect(mapStateToProps, {
  setPowerSupplyLeadPostive,
  setPowerSupplyLeadNegative,
  setPowerSupplyAnodeConnected,
  setPowerSupplyCathodeConnected,
  setGelBoxAnodeConnected,
  setGelBoxCathodeConnected,
  setPositiveLeadConnection,
  setNegativeLeadConnection,
  pushInteractions,
  setPowerSupplyLeadHeld,
  setPowerSupplyLeadControlVisibility,
  setMoveMenu,
  showMoveMenu,
  hideAllControls
})(PowerSupplyLead);
