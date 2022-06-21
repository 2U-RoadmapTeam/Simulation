import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { css } from 'glamor'

import Notebook from '../notebook/Notebook'
import SceneBuilder from './SceneBuilder'
import Modal from '../modal/Modal'
import Toast from '../toast/Toast'
import TaskTracker from '../notebook/protocolView/protocolTask/TaskTracker'
import { start, drag, end, getTarget, updateScale } from '../../lib/hotspot'
import { mapDataToTasks } from '../../lib/TaskDataImporter'
import sendxAPI from '../../xAPI'
import { throttle } from "lodash"

import {
  setHeldObject,
  setTargetList,
  setLastDrop,
  pushInteractions,
  setHeld,
  setGelHeld,
  setSolutionHeld,
  setTaskPages,
  createSolution,
  setSolution,
  createBlotPaper,
  setSceneScale,
  setModal,
  showModal,
  setToastFired,
  createIceBucket,
  createFreezer,
  createFloatingTubeRack,
  setPopupFired,
  createGel,
  undo
} from '../../actions';

import Plus from './img/plus.svg'
import Minus from './img/minus.svg'
import UndoAttempt from "./img/undo-icon-active.svg";
import UndoAttemptUsed from "./img/undo-icon-disabled.svg";

import "./Scene.scss";
import colors from "styles/_colors.scss";

class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sceneStyle: {},
      dragdropStyle: {},
      value: 0
    }
    const interactions = (heldObj, target) => {
      //Sets target of last drop for Pipette extraction/deposit

      this.props.setLastDrop({
        lastHeld: heldObj,
        lastTarget: target
      });
    };

    Object.defineProperty(interactions, 'name', {value: ('scene_interactions'), configurable: true});
    this.props.pushInteractions([interactions])

    //Getting Notebook data, converting to Tasks, storing in Redux store
    const taskPages = mapDataToTasks(this.props.level);
    this.props.setTaskPages(taskPages);
  }

  getObjectFromId = id => {
    if (id === undefined || id === null) {
      return null;
    }
    const idArr = id.split("_");
    let obj = {
      type: "",
      id: -1,
      subId: -1,
      subRef: -1,
      solution: "",
      tipType: ""
    };

    switch (idArr[0]) {
      case "P20":
      case "P100":
      case "P200":
      case "P1000":
        obj.type = "Pipette";
        obj.id = idArr[1];
        break;
      case "Solution":
        obj.type = "Solution";
        obj.id = idArr[1];
        obj.solution = this.props.solutions[obj.id - 1].type;
        break;
      case "BlottingPaper":
        obj.type = "BlottingPaper";
        obj.id = idArr[1];
        obj.subId = idArr[2];
        break;
      case "Trash":
        obj.type = "Biohazard";
        break;
      case "PipetteRack":
        obj.type = "PipetteRack";
        break;
      case "TubeStand":
        obj.type = "TubeStand";
        break;
      case "Gel":
        obj.type = "Gel";
        obj.id = idArr[1];
        break;
      case "GelBox":
        obj.type = "GelBox";
        obj.id = idArr[1];
        obj.subId = idArr[2];
        break;
      case "PowerSupply":
        obj.type = "PowerSupply";
        obj.id = idArr[1];
        obj.subId = idArr[2];
        obj.subRef = parseInt(idArr[3], 10);
        break;
      case "Flask":
        obj.type = "Flask";
        obj.id = idArr[1];
        break;
      case "IceBucket":
        obj.type = "IceBucket";
        break;
      case "FloatingTubeRack":
        obj.type = "FloatingTubeRack";
        break;
      case "WaterBath":
        obj.type = "WaterBath";
        break;
      case "Freezer":
        obj.type = "Freezer";
        break;
      case "Microcentrifuge":
        obj.type = "Microcentrifuge";
        break;
      case "Vortex":
        obj.type = "Vortex";
        break;
      case "TubeStand":
        obj.type = "TubeStand"
        break;
      case "Gel":
        obj.type = "Gel"
        obj.id = idArr[1]
        break;
      case "GelBox":
        obj.type = "GelBox"
        obj.id = idArr[1]
        obj.subId = idArr[2]
        break;
      case "PowerSupply":
        obj.type = "PowerSupply"
        obj.id = idArr[1]
        obj.subId = idArr[2]
        obj.subRef = parseInt(idArr[3], 10)
        break;
      case "Flask":
        obj.type = "Flask"
        obj.id = idArr[1]
        break;
      case "Microcentrifuge":
        obj.type = "Microcentrifuge"
        break;
      case "HeatBlock":
        obj.type = "HeatBlock"
        break;
      case "Gel Comb":
        obj.type = "Gel Comb"
        break;
      default:
        break;
    }

    if (idArr[1] === "TipBox") {
      obj.type = "TipBox";
      obj.id = idArr[2];
      obj.tipType = idArr[0];
    }
    obj.id = parseInt(obj.id);

    return obj;
  };

  handleResize = () => {

    let scale = (window.innerHeight / 768) ;
    let difference = -(768 - window.innerHeight);
    let dragDropWidth = 0;

    if(difference > 0){ difference = 0 }

    updateScale(scale * this.props.scale)

    let sceneStyle = {};

    if(this.props.notebookExpanded){

      sceneStyle = {
        transform: 'scale(' + scale + ')',
        marginBottom: difference + 'px',
        width: ((window.innerWidth - 384) / scale) + 'px',
        height: ((window.innerHeight - 384) / scale) + 'px',
        transformOrigin: 'top left'
      }

      dragDropWidth = ((window.innerWidth - 384) / scale);

      // If the scaled width is less than the 1200px threshold
      if(dragDropWidth < (1200 / scale)){
        dragDropWidth = (1200 / scale);
      }

    } else {

      sceneStyle = {
        transform: 'scale(' + scale + ')',
        marginBottom: difference + 'px',
        width: ((window.innerWidth) / scale) + 'px',
        height: ((window.innerHeight) / scale) + 'px',
        transformOrigin: 'top left'
      }

      dragDropWidth = ((window.innerWidth) / scale);

    }

    const dragdropStyle = {
      width: dragDropWidth + "px",
      transform: "scale(" + this.props.scale + ")",
      transformOrigin: "top left"
    };

    this.setState(prevState => {
      return {
        sceneStyle,
        dragdropStyle
      };
    });
  };

  // We need to attach a window event listener once the component is loaded in the DOM
  componentDidMount() {

    // xAPI content loaded
    sendxAPI({
      verb: "http://adlnet.gov/expapi/verbs/attempted",
      context: "Lab Master"
    })

    // Resize the scene and attach the resize method to the window resize event
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    this.props.setModal({
      display: false,
      type: "LEVEL_CHOICE",
      size: "sm",
      connect: -1
    })
    // Display the level choice modal
    this.props.showModal({display: true})

    // Get all of the available drag and drop target zones
    var temp = document.getElementsByClassName("dropTarget")
    // Push to redux
    this.props.setTargetList(temp)
  }

  onDragStart = (e) => {

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

    //Delete when working
    var temp = document.getElementsByClassName("dropTarget");
    console.log(temp);
    this.props.setTargetList(temp);

    //Checks if pipette and not a tipbox
    if ((e.target.id.includes("P2") || e.target.id.includes("P20") || e.target.id.includes("P200") || e.target.id.includes("P1000")) && !e.target.id.includes("TipBox")) {
      //Get ID of pipette from HTML ID
      let tempId = parseInt(e.target.id.split("_")[1]);

      //Set held object in redux to this data:
      this.props.setHeldObject({
        type: "Pipette",
        id: tempId,
        htmlObj: e.target
      });
      //Change pipette's state to held = true
      this.props.setHeld({
        id: tempId,
        held: true
      });
    }else if (e.target.id === "FloatingTubeRack") {
      //Checks if FloatingTubeRack
      this.props.setHeldObject({
        type: "FloatingTubeRack",
        htmlObj: e.target
      });
    } else if (e.target.id.includes("Solution")) {
      //Checks if solution
      this.props.setHeldObject({
        type: "Solution",
        id: parseInt(e.target.id.split("_")[1]),
        htmlObj: e.target
      });
    } else if (e.target.id.includes("P") && e.target.id.includes("TipBox")) {
      //Checks if is a tipbox
      //Get ID of pipette from HTML ID
      let tempId = parseInt(e.target.id.split("_")[1]);

      //Set held object in redux to this data:
      this.props.setHeldObject({
        type: "TipBox",
        id: tempId,
        htmlObj: e.target,
      })
    } else if (e.target.id.includes("Gel")) {
      //Checks if is a tipbox
      //Get ID of pipette from HTML ID
      let tempId = parseInt(e.target.id.split("_")[1])

      //Set held object in redux to this data:
      this.props.setHeldObject({
        type: "Gel",
        id: tempId,
        htmlObj: e.target,
      })

      this.props.setGelHeld({
        id: tempId,
        held: true,
      })
    } else if (e.target.id.includes("Solution")) {
      //Checks if is a tipbox
      //Get ID of pipette from HTML ID
      let tempId = parseInt(e.target.id.split("_")[1])

      //Set held object in redux to this data:
      this.props.setHeldObject({
        type: "Solution",
        id: tempId,
        htmlObj: e.target,
      })

      this.props.setSolutionHeld({
        id: tempId,
        held: true,
      })
    } else {

      //Get ID of target elem
      let tempId = parseInt(e.target.id.split("_")[1])

      //Set held object in redux to this data:
      this.props.setHeldObject({
        type: e.target.id.split("_")[0],
        id: tempId,
        htmlObj: e.target,
      })
    }

    start(e, e.target)
  }

  onDragOver = throttle((e) => {
     e.preventDefault();
     drag(e);
   }, 10);


  //Check heldObj to {obj: pipette, id: ID}
  //Set held to false in target pipette
  //Set heldObj to null
  onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (this.props.heldObject.type === "Pipette") {
      //Change pipette's state to held = false
      this.props.setHeld({
        id: this.props.heldObject.id,
        held: false
      });
    }

    if (this.props.heldObject.type === "Gel") {
      //Change gel's state to held = false
      this.props.setGelHeld({
        id: this.props.heldObject.id,
        held: false,
      });
    }


    if (this.props.heldObject.type === "Solution") {
      //Change gel's state to held = false
      this.props.setSolutionHeld({
        id: this.props.heldObject.id,
        held: false,
      });
    }

    //Clear held object
    this.props.setHeldObject({
      type: null,
      id: -1,
      htmlObj: null,
    })
    end(e)
  }

  //Runs all interaction functions that have been added to the global array
  runInteractions = heldObj => {
    const target = getTarget(heldObj.htmlObj, this.props.targetList).id;

    console.log(getTarget(heldObj.htmlObj, this.props.targetList));

    this.props.interactions.forEach(interaction => {
      interaction(heldObj, this.getObjectFromId(target));
    });

    //interaction function structure
    //always takes 'target' arg -> what the component will be interacting with
    //function must internally get access to all states it needs
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    //Sanitize input
    let val = +this.state.value;
    if (val <= 0 || val > 1) {
      return null;
    }

    //Save scale state:
    this.props.setSceneScale({
      scale: val
    });
  };

  scaleDown = e => {
    let val = this.props.scale - 0.1;

    if (val >= 1) {
      //Save scale state:
      this.props.setSceneScale({
        scale: val
      });
    }
  };

  scaleUp = e => {
    let val = this.props.scale + 0.1;

    if (val <= 2.1) {
      //Save scale state:
      this.props.setSceneScale({
        scale: val
      });
    }
  };

  makeToast = (type, msg, title) => {
    let color = "";
    if (type === "HINT") {
      color = colors.yellow1;
    } else {
      color = colors.red1;
    }

    toast(<Toast type={type} msg={msg} title={title} />, {
      className: css({
        border: "2px solid " + color,
        borderRadius: "6px",
        marginLeft: "-200px",
        minWidth: "400px"
      }),
      progressClassName: css({
        background: color
      }),
      position: "top-center",
      autoClose: 5000
    });
  };

  checkTaskForHint = () => {
    let hints = [];
    //check if hint in level
    if (
      this.props.focusedTask.levels["l" + this.props.level].hasOwnProperty(
        "hints"
      )
    ) {
      hints = this.props.focusedTask.levels["l" + this.props.level].hints;
    } else {
      return null;
    }
    //Create hint toast for each hint
    hints.forEach(hint => {
      if (!hint.fired) {
        this.makeToast(hint.type, hint.msg, hint.title);
        this.props.setToastFired();
      }
    });
  }

  checkTaskForPopup = () => {
    let popups = []
    //check if hint in level
    if(this.props.focusedTask.levels['l'+this.props.level].hasOwnProperty("popups")){
      popups = this.props.focusedTask.levels['l'+this.props.level].popups
    } else {
      return null
    }
    //Create popup toast for each hint
    popups.forEach(popup => {
      if(!popup.fired){


        //this.makeToast(popup.type, popup.msg, popup.title)

        this.props.setModal(popup)
        this.props.showModal({display: true})
        this.props.setPopupFired()


      }
    });
  }


  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);

    if (
      this.props.heldObject.htmlObj == null &&
      prevProps.heldObject.type != null
    ) {
      this.runInteractions(prevProps.heldObject);
    }
    if(this.props.scale !== prevProps.scale){
      this.handleResize()
    }

    if(this.props.notebookExpanded !== prevProps.notebookExpanded){
      this.handleResize()
    }

    //Generate new tasks if user changes level
    if (this.props.level !== prevProps.level) {
      //Getting Notebook data, converting to Tasks, storing in Redux store
      const taskPages = mapDataToTasks(this.props.level);
      this.props.setTaskPages(taskPages);
    }

    //Only show hints when in Protocol
    if (this.props.notebookSection === "Protocol") {
      //Show next hint on switch to protocol
      if (this.props.notebookSection !== prevProps.notebookSection){
        this.checkTaskForHint()
        this.checkTaskForPopup()
      }
      //If on same page
      else if (this.props.taskIndex !== prevProps.taskIndex && this.props.taskIndex > prevProps.taskIndex){
        this.checkTaskForHint()
        this.checkTaskForPopup()
      }
      //If on next page
      else if (this.props.taskPage !== prevProps.taskPage && this.props.taskPage === this.props.focusedPage+1){
        this.checkTaskForHint()
        this.checkTaskForPopup()
      }
    }
  }

  undoClicked = () => {
   this.props.setModal({
     display: true,
     type: "UNDO",
     size: "xs",
     connect: -1
   });
  }

  restartSim = () =>{
   window.location.reload();
  }

  renderUndoBtn = () => {
   let attempts = []

   for (let i = 0; i < ((this.props.undoAttempts > 3)?3:this.props.undoAttempts); i++) {
     //Add attemps left image
     attempts.push(<img alt="Available undo icon" src={UndoAttempt} class="undoAttemptImg"/>)
   }
   for (let i = 0; i < ((this.props.undoAttempts > 3)?0:(3-this.props.undoAttempts)); i++) {
     //Add attempts used image
     attempts.push(<img alt="Disabled undo icon" src={UndoAttemptUsed} class="undoAttemptImg"/>)
   }

   return (
     <div id="undo" className="undoDiv" >
       <button className="undoBtn" tabIndex="0" onClick={this.undoClicked}>
         Restart step
       </button>
       {attempts}
     </div>
   );
  };

  render() {
    return (
      <div>
        <div
          className={"content"+((this.props.notebookExpanded)?" sidebar-active":"")}>
          <div
            id='scene'
            //onClick={(e)=>{toast.dismiss();}}
            style={this.state.sceneStyle}>
            <div
              id="dragdrop"
              style={this.state.dragdropStyle}
              onDragStart={this.onDragStart}
              onDragOver={(e)=>{e.persist();this.onDragOver(e);}}
              onDragEnd={this.onDrop}>
              <SceneBuilder />
              <TaskTracker />
            </div>
          </div>
          {this.renderUndoBtn()}
          {/* Add back when graphics for Restart Button are ready */}
          {/* <button onClick={this.restartSim}>RESTART TEST</button> */}
          <div id="zoom">
            <button onClick={this.scaleDown} tabIndex="0" disabled={(this.props.scale > 1)?null:"true"}>
              <p>Zoom out</p>
              <img alt="Zoom out" src={Minus} aria-label={'Zoom out'}/>
            </button>
            <p>{parseInt(this.props.scale*100)+"%"}</p>
            <button onClick={this.scaleUp} tabIndex="0" disabled={(this.props.scale < 2)?null:"true"}>
              <p>Zoom in</p>
              <img alt="Zoom in" src={Plus} aria-label={'Zoom in'}/>
            </button>
          </div>
          <ToastContainer closeButton={false} role={"dialog"}/>
          <Modal />
        </div>
        <Notebook />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notebookExpanded: state.scene.notebookExpanded,
    heldObject: state.scene.heldObject,
    targetList: state.scene.targetList,
    interactions: state.scene.interactions,
    solutions: state.solution.solutions,
    blotPapers: state.blotPaper.blotPapers,
    level: state.notebook.level,
    scale: state.scene.scale,
    focusedTask: state.notebook.focusedTaskObj,
    focusedPage: state.notebook.focusedPage,
    taskIndex: state.notebook.focusedTask,
    taskPage: state.notebook.currentProtocolPage,
    notebookSection: state.notebook.sectionSelected,
    iceBucket: state.iceBucket.iceBucket,
    freezer: state.freezer,
      undoAttempts: state.undo.attempts,
      lastState: state.undo.snapshots.back1,
    }
}

export default connect(mapStateToProps, {
  setHeldObject,
  setTargetList,
  setLastDrop,
  pushInteractions,
  setHeld,
  setGelHeld,
  setSolutionHeld,
  setTaskPages,
  createSolution,
  setSolution,
  createBlotPaper,
  setSceneScale,
  setModal,
  showModal,
  setToastFired,
  setPopupFired,
  createGel,
  undo,
  createIceBucket,
  createFreezer,
  createFloatingTubeRack
})(Scene)
