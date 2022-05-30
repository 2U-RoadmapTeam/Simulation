import React, { Component } from "react";
import { connect } from "react-redux";
import { throttle } from "lodash";
import { unscaledStart, unscaledDrag, end, getUnscaledTarget } from "../../lib/hotspot";
// import { isSafari } from 'react-device-detect';

// import PredictionsChoiceQuestion from 'components/questions/predictionsChoiceQuestion/PredictionsChoiceQuestion';
import PredictionsData from '../../data/notebook.json';


import {
    createPSCQ,
    setTargetList,
    setCellCulture,
    setProteinPrediction,
    setHeldObject,
    removeCellCultureType,
    setModal,
    showModal
 } from '../../actions';

// import "./Gel.scss";

// import Prediction from './img/prediction.svg'

// Styles
import './Predictions.scss';
// import colors from '../../../../styles/_colors.scss';

import dragIcon from './img/drag-icon.svg';
import wildType from './img/cell_culture-wild_type.svg';
import pancreasCells from  './img/cell_culture-pancreas_cells.svg';
import edit7 from './img/cell_culture-edit_7.svg';
import edit4 from './img/cell_culture-edit_4.svg';
import protein1 from './img/protein_gel-1.svg';
import protein2 from './img/protein_gel-2.svg';
import protein3 from './img/protein_gel-3.svg';
import protein4 from './img/protein_gel-4.svg';
import iconCorrect from './img/icon_correct.svg';
import iconIncorrect from './img/icon_incorrect.svg';
import close from "./img/close.svg"

const images = {
    'wildType': wildType,
    'pancreasCells': pancreasCells,
    'edit7': edit7,
    'edit4': edit4,
};

const gels = {
    protein1: {
        image: protein1,
        message: 'This gel needs to run longer. The proteins have not separated enough.'
    },
    protein2: {
        image: protein2,
        message: 'This gel has not run yet. The samples are still in the wells of the gel.'
    },
    protein3: {
        image: protein3,
        message: 'The gel has run all the way to the end, and the proteins are optimally separated for analysis.'
    },
    protein4: {
        image: protein4,
        message: 'This gel has been running for too long. Your samples have run off the gel surface and are now lost in the buffer.'
    }
};

class Prediction510 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // y1:this.props.predictions.lane1,
            // y2:this.props.predictions.lane2,
            // y3:this.props.predictions.lane3,
            // y1last:0,
            // y2last:0,
            // y3last:0,
            borders: {
                protein1: '',
                protein2: '',
                protein3: '',
                protein4: ''
            },
            display: {
                protein1: 'none',
                protein2: 'none',
                protein3: 'none',
                protein4: 'none'
            },
            predictionProtein: null,
            components: [],
            targetList: this.props.targetList,
            predictions: {
                cellCultures: []
            },
            hiddenQuestion: [],
            solutionMoveMenu: [false, false, false, false]
        };

    }

    componentDidMount() {
        this.doReduxPart(PredictionsData.Notebook.Content.Predictions)
        this.doCompPart(PredictionsData.Notebook.Content.Predictions)

        this.setState({
            targetList: [
                document.getElementById('dropzone-0'),
                document.getElementById('dropzone-1'),
                document.getElementById('dropzone-2'),
                document.getElementById('drop-target')
            ]
        });

        this.setState({
          hiddenQuestion: this.buildComponent(PredictionsData.Notebook.Content.Predictions.components[2], 2)
        });

        console.log('setTargetList :: ', this.state.targetList);
    }

    teleport = (id, targetId) => {


      let cellCultures = ['wildType', 'pancreasCells', 'edit4', 'edit7'];
      let type = cellCultures[id];

      this.props.setCellCulture({
          id: targetId,
          type: type
      });
    };


    moveTo = (id, targetId) => {
  		let solutionMoveMenu = this.state.solutionMoveMenu;

  		solutionMoveMenu.forEach(function(solution, innerIndex, arr){
  			solution = false;
  		})

  		this.setState({
  			solutionMoveMenu: solutionMoveMenu
  		});

  		this.teleport(id, targetId);
  	}

    showMoveMenu = (e, index) => {

      // Hide all the menus
      let solutionMoveMenu = this.state.solutionMoveMenu;

      solutionMoveMenu.forEach(function(solution, innerIndex, arr){
        if(index !== innerIndex){
          arr[innerIndex] = false;
        }
      })

      // Toggle this menu
      solutionMoveMenu[index] = !solutionMoveMenu[index];

      if(solutionMoveMenu[index] === true){
        let elems = document.getElementsByClassName("solution");
        for(var i = 0; i < elems.length; i++){
          elems[i].style.zIndex = null;
        }
        e.target.parentNode.style.zIndex = 99;
      } else {
        e.target.parentNode.style.zIndex = null;
      }

      this.setState({
        solutionMoveMenu: solutionMoveMenu
      });
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


        var targetDropZones = document.getElementsByClassName('drop-target__area--target');
        this.props.setTargetList(targetDropZones);

        console.log('includes cellculture- :: ', e.target.id.includes('cellculture-'));

        if (e.target.id.includes('cellculture-')) {
            console.log( 'working!');
            let tempId = parseInt(e.target.id.split("-")[1]);

            this.props.setHeldObject({
                type: 'Solution',
                id: tempId,
                htmlObj: e.target
            });

        }

        unscaledStart(e, e.target);

    };

    drag = throttle((event) => {
        unscaledDrag(event);
    }, 20);

    onDragOver = (e) => {
        console.log("Drag");
        e.preventDefault();
        e.persist();
        this.drag(e);
    };

    onDrop = (e) => {
        console.log('DROPPED!!');
        e.preventDefault();
        e.stopPropagation();



        console.log('heldObject :: ', this.props.heldObject);
        console.log('targetList :: ', this.state.targetList);

        let target = getUnscaledTarget(this.props.heldObject.htmlObj, this.state.targetList);

        if (target !== '') {

            console.log('includes drop-target :: ', target.id.includes("drop-target"));

            if (target.id.includes('dropzone-')) {

                let targetId = parseInt(target.id.split("-")[1]);

				        console.log(
                    'targetId :: ', targetId,
                    'heldObject :: ', this.props.heldObject
                );

                console.log(
                    'targetList :: ', this.state.targetList,
                    'heldObject.id :: ', this.props.heldObject.id
                );

                let cellCultures = ['wildType', 'pancreasCells', 'edit4', 'edit7'];
                let type = cellCultures[this.props.heldObject.id];

                this.props.setCellCulture({
                    id: targetId,
                    type: type
                });

                this.props.heldObject.htmlObj.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";

            } else {
				this.props.heldObject.htmlObj.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";
            }

            console.log('drop-target :: ', target.id.includes("drop-target"));

        } else {
			this.props.heldObject.htmlObj.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";
        }

        end(e);

    };

    doReduxPart = (data) => {
        console.log('doReduxPart data >>> :: ', data);
        data.components.forEach(comp => {
            this.setupComponentRedux(comp)
        })
    }

    doCompPart = (data) => {
        let compArr = [];

        data.components.forEach((comp, index) => {
          let componentData = [];

          if ((index + 1) === data.components.length) {
            componentData.push(

            // Not used in 5.10 sim
            //   <div>
            //
            //     <h2 style={{margin: '32px 0 8px'}}>Feedback question</h2>
            //     <div style={{width: '100%', height: '1px', background: colors.navy1, marginTop: '8px'}}></div>
            //   </div>
            )
          }
          if ((index + 1) !== data.components.length) {

            componentData.push(this.buildComponent(comp, index))
            compArr.push(componentData)

          }
        })

        this.setState({
            components: compArr
        })
    }

    setupComponentRedux = (data) => {

        switch (data.component) {

            case "PSCQ":
                this.props.createPSCQ({
                    id: data.props.id,
                    type: data.props.type,
                    choices: data.props.levels['l'+this.props.level].choices,
                    label: data.props.levels['l'+this.props.level].label,
                    text: data.props.levels['l'+this.props.level].text,
                    attempts: data.props.levels['l'+this.props.level].attempts,
                    answer: data.props.levels['l'+this.props.level].answer,
                    correct: data.props.levels['l'+this.props.level].correct,
                    image: data.props.levels['l'+this.props.level].image,
                    feedback: data.props.levels['l'+this.props.level].feedback
                })
                break;

            default:
                break;
        }
    };

    buildComponent = (data, index) => {
        switch (data.component) {

            case "PSCQ":
                // return (<PredictionsChoiceQuestion key={index} type={data.props.type} id={data.props.id} index={index} />)

            default:
                break;
        }
    };

    removeCellCulture = (lane, index) => {

        this.props.removeCellCultureType({
            id: lane,
            index: index
        });
    };

    showPredictionPopup = () => {

      this.props.setProteinPrediction({
        predictionProtein: this.state.predictionProtein
      });

      this.setState({predictionProtein: null});

      // this.props.setModal({
      //   type: 'POPUP_QUESTION',
      //   size: 'popup',
      //   data: {
      //     components: [
      //       {
      //         "component": "Popup",
      //         "props": {
      //           "type": "Popup",
      //           "id": 1,
      //           "label": "After selecting the edited macrophage cell lines that contain a disrupted CCR5 gene (edit 4 and edit 7), what will be your next experimental step to verify HIV-resistant macrophages?",
      //           "choices": [
      //             {
      //               "label": "To test how well HIV infection of macrophages is inhibited.",
      //               "checked": false,
      //               "correct": null,
      //               "feedback": "Incorrect. You are not ready to jump ahead to test whether your macrophage cell lines are HIV-resistant yet."
      //             },
      //             {
      //               "label": "To test for the presence of HIV RNA in your macrophage cell lines.",
      //               "checked": false,
      //               "correct": null,
      //               "feedback": "Incorrect. Macrophages are not yet infected with HIV."
      //             },
      //             {
      //               "label": "To design a second set of gRNAs to disrupt gp120.",
      //               "checked": false,
      //               "correct": null,
      //               "feedback": "Incorrect. Macrophages do not carry the gene encoding gp120 since it’s an HIV protein."
      //             },
      //             {
      //               "label": "To test the protein expression of CCR5.",
      //               "checked": false,
      //               "correct": null,
      //               "feedback": "Correct."
      //             }
      //           ],
      //           "attempts": "unlimited",
      //           "answer": 3,
      //           "correct": null
      //         }
      //       }
      //     ]
      //   }
      // });
      //
      // this.props.showModal({display: true});
    }

    parseTypeKey = (key) => {

      let refs = {
        "wildType": "Wild type cells.",
        "pancreasCells": "Pancreas cells.",
        "edit4": "Edit 4 cells.",
        "edit7": "Edit 7 cells."
      }

      return refs[key];

    }

    sectionDragAndDrop = () => {
        return (
            <div>
                <div className="innerQBlock" tabIndex={0} style={{paddingBottom: "16px"}}>

                    <div
                        className="dnd-bg">

                        <div className="dnd-bg-padding">

                            <h5 style={{ margin: '5px 0px' }} tabIndex={0}> Identify controls and samples </h5>

                            <p tabIndex={0}>
                                Below are four different cell cultures: your two CRISPR-edited cell lines as well as the wild type macrophage and the pancreas cells. Drag and drop each cell culture into the correct box below as either the positive control, the negative control, or your samples of interest. Use each culture once.
                            </p>

                            <div className="drag">

                                <div className="drag__indicator">
                                    <img src={dragIcon} alt="" />
                                    <label> drag </label>
                                </div>

                                <div className="drag__cell-culture">

                                    <div
                                        draggable
                                        id="cellculture-0"
                                        className="drag__cell-culture--type"
                                        style={{transform: "translate3d(0,0,0) rotate(0deg)"}}
                                        tabIndex={0}
                                        onClick={(e)=>{this.showMoveMenu(e, 0)}}
                                        onKeyDown={e => {
                      									if (e.keyCode === 13 || e.keyCode === 32)
                      											this.showMoveMenu(e, 0)
                      									}}
                                        aria-label="Wild type cell culture. Select to identify as either the positive control, the negative control, or your samples of interest."
                                        >
                                            <img draggable="false" src={ images.wildType } alt="Wild type cells" aria-hidde="true" />
                                            <div class="solution-move-menu" style={{display: (this.state.solutionMoveMenu[0])?null:"none"}} aria-hidde="true">
                          										<h7 tabIndex="0">Move to:</h7>
                          										<div>
                          											<button onClick={(e)=>{this.moveTo(0,1)}} aria-label="Identify as positive control.">Positive control</button>
                          											<button onClick={(e)=>{this.moveTo(0,2)}} aria-label="Identify as negative control.">Negative control</button>
                          											<button onClick={(e)=>{this.moveTo(0,0)}} aria-label="Identify as sample of interest.">Sample of interest</button>
                          										</div>
                          									</div>
                                    </div>

                                    <div
                                        draggable
                                        id="cellculture-1"
                                        className="drag__cell-culture--type"
                                        style={{transform: "translate3d(0,0,0) rotate(0deg)"}}
                                        tabIndex={0}
                                        onClick={(e)=>{this.showMoveMenu(e, 1)}}
                                        onKeyDown={e => {
                      									if (e.keyCode === 13 || e.keyCode === 32)
                      											this.showMoveMenu(e, 1)
                      									}}
                                        aria-label="Pancreas cell culture. Select to identify as either the positive control, the negative control, or your samples of interest."
                                        >
                                            <img draggable="false" src={ images.pancreasCells } alt="Pancreas cells" aria-hidden="true" />
                                            <div class="solution-move-menu" style={{display: (this.state.solutionMoveMenu[1])?null:"none"}} aria-hidde="true">
                          										<h7 tabIndex="0">Move to:</h7>
                          										<div>
                          											<button onClick={(e)=>{this.moveTo(1,1)}} aria-label="Identify as positive control.">Positive control</button>
                          											<button onClick={(e)=>{this.moveTo(1,2)}} aria-label="Identify as negative control.">Negative control</button>
                          											<button onClick={(e)=>{this.moveTo(1,0)}} aria-label="Identify as sample of interest.">Sample of interest</button>
                          										</div>
                          									</div>
                                    </div>

                                    <div
                                        draggable
                                        id="cellculture-2"
                                        className="drag__cell-culture--type"
                                        style={{transform: "translate3d(0,0,0) rotate(0deg)"}}
                                        tabIndex={0}
                                        onClick={(e)=>{this.showMoveMenu(e, 2)}}
                                        onKeyDown={e => {
                      									if (e.keyCode === 13 || e.keyCode === 32)
                      											this.showMoveMenu(e, 2)
                      									}}
                                        aria-label="Edit 4 cell culture. Select to identify as either the positive control, the negative control, or your samples of interest."
                                        >
                                            <img draggable="false" src={ images.edit4 } alt="Edit 4 cells" aria-hidden="true" />
                                            <div class="solution-move-menu" style={{display: (this.state.solutionMoveMenu[2])?null:"none"}} aria-hidde="true">
                          										<h7 tabIndex="0">Move to:</h7>
                          										<div>
                          											<button onClick={(e)=>{this.moveTo(2,1)}} aria-label="Identify as positive control.">Positive control</button>
                          											<button onClick={(e)=>{this.moveTo(2,2)}} aria-label="Identify as negative control.">Negative control</button>
                          											<button onClick={(e)=>{this.moveTo(2,0)}} aria-label="Identify as sample of interest.">Sample of interest</button>
                          										</div>
                          									</div>
                                    </div>

                                    <div
                                        draggable
                                        id="cellculture-3"
                                        className="drag__cell-culture--type"
                                        style={{transform: "translate3d(0,0,0) rotate(0deg)"}}
                                        tabIndex={0}
                                        onClick={(e)=>{this.showMoveMenu(e, 3)}}
                                        onKeyDown={e => {
                      									if (e.keyCode === 13 || e.keyCode === 32)
                      											this.showMoveMenu(e, 3)
                      									}}
                                        aria-label="Edit 7 cell culture. Select to identify as either the positive control, the negative control, or your samples of interest."
                                        >
                                            <img draggable="false" src={ images.edit7 } alt="Edit 7 cells" aria-hidden="true"/>
                                            <div class="solution-move-menu" style={{display: (this.state.solutionMoveMenu[3])?null:"none"}} aria-hidde="true">
                                              <h7 tabIndex="0">Move to:</h7>
                                              <div>
                                                <button onClick={(e)=>{this.moveTo(3,1)}} aria-label="Identify as positive control.">Positive control</button>
                                                <button onClick={(e)=>{this.moveTo(3,2)}} aria-label="Identify as negative control.">Negative control</button>
                                                <button onClick={(e)=>{this.moveTo(3,0)}} aria-label="Identify as sample of interest.">Sample of interest</button>
                                              </div>
                                            </div>
                                    </div>

                                </div>

                            </div>

                            <div className="cell-culture-table">

                                <div className="cell-culture-table__title-box">

                                    <label tabIndex="0"> Positive control </label>
                                    <label tabIndex="0"> Negative control </label>
                                    <label tabIndex="0"> Sample of interest </label>

                                </div>

                                <div className="drop-target" id="drop-target">

                                    <div className="drop-target__area">
                                        {
                                            this.props.predictions.cellCultures.positiveControl.length === 2 ? (
                                                <div id="dropzone-1">
                                                    <div className="cell-culture">
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.positiveControl[0])} src={images[this.props.predictions.cellCultures.positiveControl[0]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(1, 0)}} onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(1, 0)}} />
                                                      </div>
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.positiveControl[1])} src={images[this.props.predictions.cellCultures.positiveControl[1]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(1, 1)}}onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(1, 1)}} />
                                                      </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                (this.props.predictions.cellCultures.positiveControl.length === 1)?
                                                (
                                                  <div id="dropzone-1">
                                                    <div className="drop-target__area--target">
                                                        <span> Drag and drop here </span>
                                                    </div>
                                                    <div className="cell-culture">
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.positiveControl[0])} src={images[this.props.predictions.cellCultures.positiveControl[0]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(1, 0)}} onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(1, 0)}} />
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                                :(
                                                  <div className="drop-target__area--target" id="dropzone-1">
                                                    <span> Drag and drop here </span>
                                                  </div>
                                                )
                                            )
                                        }
                                    </div>

                                    <div className="drop-target__area">
                                        {
                                            this.props.predictions.cellCultures.negativeControl.length === 2 ? (
                                                <div id="dropzone-2">
                                                    <div className="cell-culture">
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.negativeControl[0])} src={images[this.props.predictions.cellCultures.negativeControl[0]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(2, 0)}} onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(2, 0)}} />
                                                      </div>
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.negativeControl[1])} src={images[this.props.predictions.cellCultures.negativeControl[1]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(2, 1)}} onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(2, 1)}} />
                                                      </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                (this.props.predictions.cellCultures.negativeControl.length === 1)?
                                                (
                                                  <div id="dropzone-2">
                                                    <div className="drop-target__area--target">
                                                        <span> Drag and drop here </span>
                                                    </div>
                                                    <div className="cell-culture">
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.negativeControl[0])} src={images[this.props.predictions.cellCultures.negativeControl[0]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(2, 0)}} onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(2, 0)}} />
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                                :(
                                                  <div className="drop-target__area--target" id="dropzone-2">
                                                    <span> Drag and drop here </span>
                                                  </div>
                                                )
                                            )
                                        }
                                    </div>

                                    <div className="drop-target__area">
                                        {

                                            this.props.predictions.cellCultures.sample.length === 2 ? (
                                                <div id="dropzone-0">
                                                    <div className="cell-culture">
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.sample[0])} src={images[this.props.predictions.cellCultures.sample[0]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(0, 0)}} onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(0, 0)}} />
                                                      </div>
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.sample[1])} src={images[this.props.predictions.cellCultures.sample[1]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(0, 1)}} onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(0, 1)}} />
                                                      </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                (this.props.predictions.cellCultures.sample.length === 1)?
                                                (
                                                  <div id="dropzone-0">
                                                    <div className="drop-target__area--target">
                                                        <span> Drag and drop here </span>
                                                    </div>
                                                    <div className="cell-culture">
                                                      <div>
                                                        <img draggable="false" tabIndex="0" alt={this.parseTypeKey(this.props.predictions.cellCultures.sample[0])} src={images[this.props.predictions.cellCultures.sample[0]]} />
                                                        <img className="close" src={close} tabIndex="0" alt="Remove sample" onClick={(e) => {this.removeCellCulture(0, 0)}} onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.removeCellCulture(0, 0)}} />
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                                :(
                                                  <div className="drop-target__area--target" id="dropzone-0">
                                                    <span> Drag and drop here </span>
                                                  </div>
                                                )
                                            )
                                        }
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="horizontal-rule"></div>

                        { this.sectionOutcome() }

                    </div>

                    <button tabIndex={0} disabled={(this.state.predictionProtein == null)?true:false} onClick={this.showPredictionPopup} type="submit"> Submit answer </button>

                </div>

            </div>
        );
    };

    selectOutCome = (e, imageId) => {

      //if(this.props.predictionProtein == null){
        imageId = e.target.id;

        this.setState({
            predictionProtein: imageId
        });
      //}
    };

    sectionOutcome = () => {
        return (
            <div>
                <div className="dnd-bg-padding">

                    <h5 style={{ margin: '5px 0px' }} tabIndex={0}> Predict expected outcome </h5>

                    <p tabIndex={0}>
                    Shown below are representations of four possible outcomes when running a protein gel. Identify which gel has run long enough and is ready for analysis by clicking on it. Visible on the gels are only the pre-stained protein ladder and the blue dye front used in SDS sample buffer. The proteins from the cellular extract are invisible at this stage.
                    </p>

                    <div className="outcome">

                        <div className="outcome__title">
                            <label> 1 </label>
                            <label> 2 </label>
                            <label> 3 </label>
                            <label> 4 </label>
                        </div>

                        <div className="outcome__visual-display">

                            <div className="outcome__visual-display--img">
                                <img
                                    id="protein1"
                                    style={{ border: ((this.state.predictionProtein === 'protein1' || this.props.predictionProtein === 'protein1')?'5px solid #faac48':'none') }}
                                    onClick={ (e) => this.selectOutCome(e, 0) }
                                    onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.selectOutCome(e, 0)}}
                                    src={ gels.protein1.image }
                                    alt="Top-down view of the gel cassette, Dye front is approximately halfway down the gel; protein ladder is moderately separated out."
                                    tabIndex={0} />

                                    <div
                                    className="arrow"
                                    style={{ display: ((this.props.predictionProtein === 'protein1')?'block':'none') }}
                                    ></div>
                            </div>

                            <div className="outcome__visual-display--img">
                                <img
                                    id="protein2"
                                    style={{ border: ((this.state.predictionProtein === 'protein2' || this.props.predictionProtein === 'protein2')?'5px solid #faac48':'none') }}
                                    onClick={ (e) => this.selectOutCome(e, 1) }
                                    onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.selectOutCome(e, 1)}}
                                    src={ gels.protein2.image }
                                    alt="Top-down view of the gel cassette, Dye front is approximately a quarter of the way down the gel, protein ladder is slightly separated out."
                                    tabIndex={0} />

                                    <div
                                    className="arrow"
                                    style={{ display: ((this.props.predictionProtein === 'protein2')?'block':'none') }}
                                    ></div>
                            </div>

                            <div className="outcome__visual-display--img">
                                <img
                                    id="protein3"
                                    style={{ border: ((this.state.predictionProtein === 'protein3' || this.props.predictionProtein === 'protein3')?'5px solid #faac48':'none') }}
                                    onClick={ (e) => this.selectOutCome(e, 2) }
                                    onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.selectOutCome(e, 2)}}
                                    src={ gels.protein3.image }
                                    alt="Top-down view of the gel cassette, Dye front is all the way to the bottom of the gel; protein ladder is separated out."
                                    tabIndex={0} />

                                    <div
                                    className="arrow"
                                    style={{ display: ((this.props.predictionProtein === 'protein3')?'block':'none') }}
                                    ></div>
                            </div>

                            <div className="outcome__visual-display--img">
                                <img
                                    id="protein4"
                                    style={{ border: ((this.state.predictionProtein === 'protein4' || this.props.predictionProtein === 'protein4')?'5px solid #faac48':'none') }}
                                    onClick={ (e) => this.selectOutCome(e, 3) }
                                    onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.selectOutCome(e, 3)}}
                                    src={ gels.protein4.image }
                                    alt="Top-down view of the gel cassette, Dye front is not visible; protein ladder is very separated out."
                                    tabIndex={0} />

                                    <div
                                    className="arrow"
                                    style={{ display: ((this.props.predictionProtein === 'protein4')?'block':'none') }}
                                    ></div>
                            </div>

                        </div>

                        {
                            <div>
                                <div className="outcome__message" tabIndex={0} style={{display: ((this.props.predictionProtein !== null)?'flex':'none')}}>
                                    <img src={ ((this.props.predictionProtein === 'protein3')?iconCorrect:iconIncorrect) } alt="" />
                                    <div className="" tabIndex={0}>{((this.props.predictionProtein)?gels[this.props.predictionProtein].message:null)}</div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    };

    buildUI = () => {
        return (
            <div>

                <div>
                    {this.state.components}
                </div>

                <div
                    className="outerQBlock"
                    onDragStart={this.onDragStart}
                    onDragOver={this.onDragOver}
                    onDrop={(e)=>{e.preventDefault(); e.stopPropagation()}}
                    onDragEnd={this.onDrop}
                    >

                    { this.sectionDragAndDrop() }

                </div>
                <div style={{display: (this.props.predictionProtein !== null)? "block": "none", marginTop: "32px"}}>
                  {this.state.hiddenQuestion}
                </div>
            </div>
        );
    };

    render() {
        return (
            <div>
                { this.buildUI() }
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        targetList: state.solution.targetList,
        predictions: state.scene.predictions,
        heldObject: state.scene.heldObject,
        predictionProtein: state.scene.predictionProtein,
        level: state.notebook.level
    }
}

export default connect(mapStateToProps, {
    createPSCQ,
    setTargetList,
    setCellCulture,
    setHeldObject,
    removeCellCultureType,
    setProteinPrediction,
    setModal,
    showModal
})(Prediction510);
