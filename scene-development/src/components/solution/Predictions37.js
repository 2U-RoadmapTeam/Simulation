import React, { Component } from "react";
import { connect } from 'react-redux'
import { isSafari } from "react-device-detect";
import { throttle } from "lodash";
import { unscaledStart, unscaledDrag, end, getUnscaledTarget, updateScale } from "../../lib/hotspot";

import { findIndex } from "lodash";

import {
	setDigestPrediction,
	setHeldObject,
	setTargetList,
	setFragmentMass,
	reverseFragmentMass
} from '../../actions';

import "./Predictions.scss";

import PlasmidImg from "./img/prediction-plasmids.svg";
import dragIcon from "./img/drag-icon.svg";
import close from "./img/close.svg"

import bp754 from './img/plasmid-results/754_bp.svg';
import bp807 from './img/plasmid-results/807_bp.svg';
import bp1184 from './img/plasmid-results/1184_bp.svg';
import bp1614 from './img/plasmid-results/1614_bp.svg';
// import bp4705 from './img/plasmid-results/4705_bp.svg';
import bp5082 from './img/plasmid-results/5082_bp.svg';
import bp8990 from './img/plasmid-results/8990_bp.svg';
import bp9200 from './img/plasmid-results/9200_bp.svg';
import bp9410 from './img/plasmid-results/9410_bp.svg';
import para4872bp from './img/plasmid-results/para_4872_bp.svg';
import paraR5302 from './img/plasmid-results/para_r_5302_bp.svg';
import paraR377bp from './img/plasmid-results/para_r_377_bp.svg';
import paraR4495bp from './img/plasmid-results/para_r_4495_bp.svg';
import paraR4705bp from './img/plasmid-results/4705_bp.svg';
import pkanR5512bp from './img/plasmid-results/pkan_r_5512_bp.svg';
import fragments from './img/fragments.svg';

const images = {
	'754': bp754,
	'807': bp807,
	'1184': bp1184,
	'1614': bp1614,
	// '4705': bp4705,
	'5082': bp5082,
	'8990': bp8990,
	'9200': bp9200,
	'9410': bp9410,
	'4872': para4872bp,
	'5302': paraR5302,
	'377': paraR377bp,
	'4495': paraR4495bp,
	'4705': paraR4705bp,
	'5512': pkanR5512bp
}

class Predictions extends Component {
  	constructor(props) {
		super(props);

    	this.state = {
			  targetList: this.props.targetList,
			  predictions: {
				  fragment: []
			  },
				fragmentMoveMenu: [false, false, false, false]
		};

		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {

		this.setState({
			targetList: [
				document.getElementById("dropzone-0"),
				document.getElementById("dropzone-1"),
				document.getElementById("dropzone-2"),
				document.getElementById("drop-area")
			]
		});

		console.log('setTargetList :: ', this.state.targetList);

	}

	componentDidUpdate() {
		// console.log('reversePlasmidCalc :: ', this.reversePlasmidCalc());
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

		let fragmentMoveMenu = this.state.fragmentMoveMenu;

		fragmentMoveMenu.forEach(function(fragment, innerIndex, arr){
			arr[innerIndex] = false;
		})

		var targetDropZones = document.getElementsByClassName('form__row--drop-zone');
		this.props.setTargetList(targetDropZones);

		if (e.target.id.includes("fragment-")) {

			console.log( 'working!' );
			let tempId = parseInt(e.target.id.split("-")[1]);

			this.props.setHeldObject({
				type: 'Solution',
				id: tempId,
				htmlObj: e.target
			});

			e.target.parentNode.classList.add('dragged');

		}

		unscaledStart(e, e.target.parentNode);

	};

	drag = throttle((event, clientX, clientY) => {
		unscaledDrag(event);
	}, 20);

	onDragOver = (e) => {
		console.log("Drag");
		e.preventDefault();
		e.persist();
		this.drag(e, e.clientX, e.clientY);
	};

	onDrop = (e) => {
		e.preventDefault();

		console.log("DROPPED");
		console.log('heldObject :: ', this.props.heldObject);
    console.log('targetList :: ', this.state.targetList);

		let target = getUnscaledTarget(this.props.heldObject.htmlObj, this.state.targetList);

		if (target !== '') {

			console.log('target.id :: ', target.id);
			console.log('includes drop-area :: ', target.id.includes("drop-area"));

			if (target.id.includes('dropzone')) {

				console.log('target id :: ', target.id);

				let targetId = parseInt(target.id.split("-")[1]);
				console.log('targetId :: ', targetId);
				console.log(targetId, this.props.heldObject);
				console.log(this.props.targetList, this.props.heldObject.id);

				let fragments = [807, 4705, 377, 4495];
				let mass = fragments[this.props.heldObject.id];

				console.log('mass :: ', mass);

				this.props.setFragmentMass({
					id: targetId,
					mass: mass
				});

				this.props.heldObject.htmlObj.parentNode.classList.remove('dragged');
				this.props.heldObject.htmlObj.parentNode.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";

			} else {

				this.props.heldObject.htmlObj.parentNode.classList.remove('dragged');
				this.props.heldObject.htmlObj.parentNode.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";
			}

			console.log('drop-area :: ', target.id.includes("drop-area"));

		} else {
			if(typeof this.props.heldObject.htmlObj !== undefined && this.props.heldObject.htmlObj !== null){
				this.props.heldObject.htmlObj.parentNode.classList.remove('dragged');
				this.props.heldObject.htmlObj.parentNode.style.transform = "translate3d(0px, 0px, 0px) rotateZ(0deg)";
			}
		}

		end(e);

	};

	teleport = (id, targetId) => {

		let fragments = [807, 4705, 377, 4495];
		let mass = fragments[id];

		this.props.setFragmentMass({
			id: targetId,
			mass: mass
		});
	};


	moveTo = (id, targetId) => {
		let fragmentMoveMenu = this.state.fragmentMoveMenu;

		fragmentMoveMenu.forEach(function(fragment, innerIndex, arr){
			arr[innerIndex] = false;
		})

		this.setState({
			fragmentMoveMenu: fragmentMoveMenu
		});

		this.teleport(id, targetId);
	}

	showMoveMenu = (e, index) => {

		// Hide all the menus
		let fragmentMoveMenu = this.state.fragmentMoveMenu;

		fragmentMoveMenu.forEach(function(fragment, innerIndex, arr){
			if(index !== innerIndex){
				arr[innerIndex] = false;
			}
		})

		// Toggle this menu
		fragmentMoveMenu[index] = !fragmentMoveMenu[index];

		if(fragmentMoveMenu[index] == true){
			let elems = document.getElementsByClassName("fragment");
			for(var i = 0; i < elems.length; i++){
				elems[i].style.zIndex = null;
			}
			e.target.parentNode.style.zIndex = 99;
		} else {
			e.target.parentNode.style.zIndex = null;
		}

		this.setState({
			fragmentMoveMenu: fragmentMoveMenu
		});
	}

  	section1 = () => {
    	return (
      	<div className="innerQBlock">
      		<h5 style={{margin: "5px 0px"}} tabIndex={0}>Ligation products</h5>
					<div className="answerLine">
						<p tabIndex={0}>
						There are 10 possible products that can result from the ligation of
						the pKAN-R and pARA digest fragments. Please create the desired pARA-R
						recombinant plasmid, as well as two other potential recombinant plasmids
						that may form during the ligation process, by moving the fragments into the
						boxes below. The size of the resulting plasmids you create will be calculated
						and displayed below each plasmid.
						</p>
					</div>
      	</div>
    	);
  	};

  	section3 = () => {
    	return (
      		<div className="innerQBlock">
      			<div className="answerLine">
        			<div className="innerStyle">
            		<h4 className="section-title" style={{margin: "0px 0px 25px"}} tabIndex={0}> pKAN-R digestion fragments: </h4>
								<div
									className="fragment fragment--container-margin"
									style={{transform: "translate3d(0,0,0) rotate(0deg)"}} tabIndex={0}>

									<div tabIndex={0} onClick={(e)=>{this.showMoveMenu(e, 0)}} onKeyDown={e => {
										if (e.keyCode === 13 || e.keyCode === 32)
											this.showMoveMenu(e, 0)
									}} draggable id={'fragment-0'} className="fragment__drag-indicator">
										<img src={dragIcon} alt="" />
										<label style={{pointerEvents: "none"}}> drag </label>
									</div>
									<div className="fragment__readings">

										<div className="fragment__readings--labels Small-body-copy text-align-right">
											<div>AGCTT</div>
											<div>A</div>
											<div>HindIII</div>
										</div>

										<div className="fragment__readings--dna-strands">
											<div id="rfp"
												className=""
												style={{display: "flex",
														justifyContent: "center",
														alignItems: "center",
														width: "50%",
														backgroundColor: "#e52826" }}>

														<label
															style={{ position: "relative", top: "-15px" }}
															className="extra-small-body-copy">
																<i>rfp</i>
														</label>
											</div>

											<div className="">
												<label className="extra-small-body-copy">  </label>
											</div>

											<div id="pBAD"
												className=""
												style={{position: "relative",
														right: "-25px",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														width: "35%",
														backgroundColor: "#008d36" }}>
														<label
															style={{ position: "relative", top: "-15px" }}
															className="extra-small-body-copy">
																<i>pBAD</i>
														</label>
											</div>

										</div>

										<div className="fragment__readings--labels Small-body-copy text-align-left">
											<div>G</div>
											<div>CCTAG</div>
											<div>BamHI</div>
										</div>

									</div>
									<div className="fragment__value"> 807 bp </div>
									<div class="fragment-move-menu" style={{display: (this.state.fragmentMoveMenu[0])?null:"none"}}>
										<h7>Move to:</h7>
										<div>
											<button onClick={(e)=>{this.moveTo(0,0)}}>pARA-R</button>
											<button onClick={(e)=>{this.moveTo(0,1)}}>Possible 2nd plasmid</button>
											<button onClick={(e)=>{this.moveTo(0,2)}}>Possible 3rd plasmid</button>
										</div>
									</div>
								</div>
								{/* <!-- end of fragment --> */}
								<div
									className="fragment fragment--container-margin"
									style={{transform: "translate3d(0,0,0) rotate(0deg)"}} tabIndex={0}>
									<div tabIndex={0} onClick={(e)=>{this.showMoveMenu(e, 1)}} onKeyDown={e => {
										if (e.keyCode === 13 || e.keyCode === 32)
											this.showMoveMenu(e, 1)
									}} draggable id="fragment-1" className="fragment__drag-indicator">
										<img src={dragIcon} alt="" />
										<label style={{pointerEvents: "none"}}> drag </label>
									</div>
									<div
										className="fragment__readings"
										style={{ width: "68%", left: "-2px"}}>
										<div className="fragment__readings--labels Small-body-copy text-align-right">
											<div>GATCC</div>
											<div>G</div>
											<div>BamHI</div>
										</div>
										<div className="fragment__readings--dna-strands">
											<div id="kanR"
												style={{position: "relative",
														left: "40%",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														width: "45%",
														backgroundColor: "#faac48" }}
												className="">
												<label style={{ position: "relative", top: "-15px" }} className="extra-small-body-copy"> <i>kanR</i> </label>
											</div>
										</div>
										<div className="fragment__readings--labels Small-body-copy text-align-left">
											<div>A</div>
											<div>TTCGA</div>
											<div>HindIII</div>
										</div>
									</div>
									<div className="fragment__value"> 4705 bp </div>
									<div class="fragment-move-menu" style={{display: (this.state.fragmentMoveMenu[1])?null:"none"}}>
										<h7>Move to:</h7>
										<div>
											<button onClick={(e)=>{this.moveTo(1,0)}}>pARA-R</button>
											<button onClick={(e)=>{this.moveTo(1,1)}}>Possible 2nd plasmid</button>
											<button onClick={(e)=>{this.moveTo(1,2)}}>Possible 3rd plasmid</button>
										</div>
									</div>
								</div>
								{/* <!-- end of fragment --> */}
								<div>
									<h4 className="section-title" style={{margin: "0px 0px 25px"}} tabIndex={0}> pARA digestion fragments: </h4>
									<div
										className="fragment fragment--container-margin"
										style={{transform: "translate3d(0,0,0) rotate(0deg)"}} tabIndex={0}>
										<div tabIndex={0} onClick={(e)=>{this.showMoveMenu(e, 2)}} onKeyDown={e => {
											if (e.keyCode === 13 || e.keyCode === 32)
												this.showMoveMenu(e, 2)
										}} draggable id="fragment-2" className="fragment__drag-indicator">
											<img src={dragIcon} alt="" />
											<label style={{pointerEvents: "none"}}> drag </label>
										</div>
										<div className="fragment__readings" style={{ width: "35%", left: "-87px" }}>

											<div className="fragment__readings--labels Small-body-copy text-align-right">
												<div>AGCTT</div>
												<div>A</div>
												<div>HindIII</div>
											</div>

											<div className="fragment__readings--dna-strands" id="nogene"></div>

											<div className="fragment__readings--labels Small-body-copy text-align-left">
												<div>G</div>
												<div>CCTAG</div>
												<div>BamHI</div>
											</div>

										</div>
										<div className="fragment__value"> 377 bp </div>
										<div class="fragment-move-menu" style={{display: (this.state.fragmentMoveMenu[2])?null:"none"}}>
											<h7>Move to:</h7>
											<div>
												<button onClick={(e)=>{this.moveTo(2,0)}}>pARA-R</button>
												<button onClick={(e)=>{this.moveTo(2,1)}}>Possible 2nd plasmid</button>
												<button onClick={(e)=>{this.moveTo(2,2)}}>Possible 3rd plasmid</button>
											</div>
										</div>
									</div>
								{/* <!-- end of fragment --> */}
								<div
									className="fragment fragment--container-margin"
									style={{transform: "translate3d(0,0,0) rotate(0deg)"}} tabIndex={0}>
									<div tabIndex={0} onClick={(e)=>{this.showMoveMenu(e, 3)}} onKeyDown={e => {
										if (e.keyCode === 13 || e.keyCode === 32)
											this.showMoveMenu(e, 3)
									}} draggable id="fragment-3" className="fragment__drag-indicator">
										<img src={dragIcon} alt="" />
										<label style={{pointerEvents: "none"}}> drag </label>
									</div>
									<div
										className="fragment__readings"
										style={{ width: "68%", left: "-3px"}}>

										<div className="fragment__readings--labels Small-body-copy text-align-right">
											<div>GATCC</div>
											<div>G</div>
											<div>BamHI</div>
										</div>

										<div className="fragment__readings--dna-strands">
											<div id="araC"
												style={{position: "relative",
														left: "5%",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														width: "30%",
														backgroundColor: "#1399f2"}}>
															<label style={{ position: "relative", top: "-15px" }} className="extra-small-body-copy"> <i>araC</i> </label>
											</div>
											<div id="ori"
												style={{position: "relative",
														left: "15%",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														width: "15%",
														backgroundColor: "#333332" }}>
															<label style={{ position: "relative", top: "-15px" }} className="extra-small-body-copy"> <i>ori</i> </label>
											</div>
											<div id="ampR"
												style={{position: "relative",
														left: "25%",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														width: "20%",
														backgroundColor: "#115f92" }}>
															<label style={{ position: "relative", top: "-15px" }} className="extra-small-body-copy"> <i>ampR</i> </label>
											</div>
										</div>

										<div className="fragment__readings--labels Small-body-copy text-align-left">
											<div>A</div>
											<div>TTCGA</div>
											<div>HindIII</div>
										</div>

									</div>
									<div className="fragment__value"> 4495 bp </div>
									<div class="fragment-move-menu" style={{display: (this.state.fragmentMoveMenu[3])?null:"none"}}>
										<h7>Move to:</h7>
										<div>
											<button onClick={(e)=>{this.moveTo(3,0)}}>pARA-R</button>
											<button onClick={(e)=>{this.moveTo(3,1)}}>Possible 2nd plasmid</button>
											<button onClick={(e)=>{this.moveTo(3,2)}}>Possible 3rd plasmid</button>
										</div>
									</div>
								</div>
								{/* <!-- end of fragment --> */}
						</div>
        	</div>
      	</div>
    	</div>
    	);
	};

	getFragment = (count) => {

		console.log('getFragment >>> :: ', count);

		if(images.hasOwnProperty(count)) {
			return images[count];
		} else {
			return;
		}
	};

	getImage = (type) => {

		var count = parseInt(this.props.predictions.fragment[type][0], 10) + parseInt(this.props.predictions.fragment[type][1], 10)

		console.log(count, images, images[count]);

		if(images.hasOwnProperty(count)){
			return images[count];
		} else {
			return;
		}
	};

	reversePlasmidCalc = (lane, index) => {

		this.props.reverseFragmentMass({
			id: lane,
			index: index
		});

	};

	handleSubmit = (e) => {
		e.preventDefault();
	};

	handleChange = (event, text) => {

		const re = /^[0-9\b]+$/;
		text = event.target.value;

	  	if (text === '' || re.test(text)) {
			this.setState({
				predictions: {
					fragment: {
						[event.target.name]: event.target.value
					}
				}
			});
		}

	};

	section4 = () => {
    	return (
        	<div className="innerQBlock">
            	<div className="answerLine">
                	<form style={{ display: "contents"}} onSubmit={this.handleSubmit}>
                    	<div className="drag-n-drop">
                        	<div className="drag-n-drop__header">
                            	<div> </div>
                            	<div tabIndex={0} style={{fontSize:"13px"}}> pARA-R </div>
                            	<div tabIndex={0} style={{fontSize:"13px"}}> Possible 2nd plasmid </div>
                            	<div tabIndex={0} style={{fontSize:"13px"}}> Possible 3rd plasmid </div>
                        	</div>

                        	<div className="drag-n-drop__form">
                            	<div className="form">

                                	<div className="form__row" id="drop-area">
                                    	<div className="form__row--label" tabIndex={0}> Fragments </div>

                                    	<div className="column">
											{
												this.props.predictions.fragment.p_ARA_R[0] !== '0' || this.props.predictions.fragment.p_ARA_R[1] !== '0' ? (
													<div id="dropzone-0">
														{ this.props.predictions.fragment.p_ARA_R[0] !== '0' ?
															(<div className="frag">
																<img
																	draggable="false"
																	src={this.getFragment(this.props.predictions.fragment.p_ARA_R[0])}
																	alt="" />
																	<div className="frag__remove" tabIndex={0} onKeyDown={e => {
										                if (e.keyCode === 13 || e.keyCode === 32)
										                  this.reversePlasmidCalc(0, 0)
										              }} onClick={(e) => {this.reversePlasmidCalc(0, 0)}}>
																		<img src={close} aria-hidden="true" alt="" />
																	</div>
															</div>)
															: ''
														}
														{
															this.props.predictions.fragment.p_ARA_R[1] !== '0' ?
															(<div className="frag">
																<img
																	draggable="false"
																	src={this.getFragment(this.props.predictions.fragment.p_ARA_R[1])}
																	alt="" />
																	<div className="frag__remove" tabIndex={0} onKeyDown={e => {
										                if (e.keyCode === 13 || e.keyCode === 32)
										                  this.reversePlasmidCalc(0, 1)
										              }} onClick={(e) => {this.reversePlasmidCalc(0, 1)}}>
																		<img aria-hidden="true" src={close} alt="" />
																	</div>
															</div>)
															: ''
														}
														{
															this.props.predictions.fragment.p_ARA_R[0] !== '0' &&
															this.props.predictions.fragment.p_ARA_R[1] === '0' ?
															(<div className="form__row--drop-zone" id="dropzone-0" tabIndex={0}> Move here </div>)
															: ''
														}
														{
															this.props.predictions.fragment.p_ARA_R[0] === '0' &&
															this.props.predictions.fragment.p_ARA_R[1] !== '0' ?
															(<div className="form__row--drop-zone" id="dropzone-0" tabIndex={0}> Move here </div>)
															: ''
														}

													</div>
												) : (<div className="form__row--drop-zone" id="dropzone-0" tabIndex={0}> Move here </div>)
											}
                                    	</div>
                                    	<div className="column">
											{
												this.props.predictions.fragment.plasm_2[0] !== '0' || this.props.predictions.fragment.plasm_2[1] !== '0' ? (
													<div id="dropzone-1">
														{ this.props.predictions.fragment.plasm_2[0] !== '0' ?
															(<div className="frag">
																<img
																	tabIndex={0}
																	draggable="false"
																	src={this.getFragment(this.props.predictions.fragment.plasm_2[0])}
																	alt="" />
																	<div className="frag__remove" tabIndex={0} onKeyDown={e => {
										                if (e.keyCode === 13 || e.keyCode === 32)
										                  this.reversePlasmidCalc(1, 0)
										              }}
																	onClick={(e) => {this.reversePlasmidCalc(1, 0)}}>
																		<img src={close} aria-hidden="true" alt="" />
																	</div>
															</div>)
															: ''
														}
														{
															this.props.predictions.fragment.plasm_2[1] !== '0' ?
															(<div className="frag">
																<img
																	draggable="false"
																	src={this.getFragment(this.props.predictions.fragment.plasm_2[1])}
																	alt="" />
																	<div className="frag__remove" tabIndex={0} onKeyDown={e => {
										                if (e.keyCode === 13 || e.keyCode === 32)
										                  this.reversePlasmidCalc(1, 1)
										              }} onClick={(e) => {this.reversePlasmidCalc(1, 1)}}>
																		<img src={close} aria-hidden="true" alt="" />
																	</div>
															</div>)
															: ''
														}
														{
															this.props.predictions.fragment.plasm_2[0] !== '0' &&
															this.props.predictions.fragment.plasm_2[1] === '0' ?
															(<div className="form__row--drop-zone" id="dropzone-1" tabIndex={0}> Move here </div>)
															: ''
														}
														{
															this.props.predictions.fragment.plasm_2[0] === '0' &&
															this.props.predictions.fragment.plasm_2[1] !== '0' ?
															(<div className="form__row--drop-zone" id="dropzone-1" tabIndex={0}> Move here </div>)
															: ''
														}

													</div>
												) : (<div className="form__row--drop-zone" id="dropzone-1" tabIndex={0}> Move here </div>)
											}
                                    	</div>
                                    	<div className="column">
											{
												this.props.predictions.fragment.plasm_3[0] !== '0' || this.props.predictions.fragment.plasm_3[1] !== '0' ? (
													<div id="dropzone-2">
														{ this.props.predictions.fragment.plasm_3[0] !== '0' ?
															(<div className="frag">
																<img
																	draggable="false"
																	src={this.getFragment(this.props.predictions.fragment.plasm_3[0])}
																	alt="" />
																	<div className="frag__remove" tabIndex={0} onKeyDown={e => {
										                if (e.keyCode === 13 || e.keyCode === 32)
										                  this.reversePlasmidCalc(2, 0)
										              }} onClick={(e) => {this.reversePlasmidCalc(2, 0)}}>
																		<img src={close} aria-hidden="true" alt="" />
																	</div>
															</div>)
															: ''
														}
														{
															this.props.predictions.fragment.plasm_3[1] !== '0' ?
															(<div className="frag">
																<img
																	draggable="false"
																	src={this.getFragment(this.props.predictions.fragment.plasm_3[1])}
																	alt="" />
																	<div className="frag__remove" tabIndex={0} onKeyDown={e => {
										                if (e.keyCode === 13 || e.keyCode === 32)
										                  this.reversePlasmidCalc(2, 1)
										              }} onClick={(e) => {this.reversePlasmidCalc(2, 1)}}>
																		<img src={close} aria-hidden="true" alt="" />
																	</div>
															</div>)
															: ''
														}
														{
															this.props.predictions.fragment.plasm_3[0] !== '0' &&
															this.props.predictions.fragment.plasm_3[1] === '0' ?
															(<div className="form__row--drop-zone" id="dropzone-2" tabIndex={0}> Move here </div>)
															: ''
														}
														{
															this.props.predictions.fragment.plasm_3[0] === '0' &&
															this.props.predictions.fragment.plasm_3[1] !== '0' ?
															(<div className="form__row--drop-zone" id="dropzone-2" tabIndex={0}> Move here </div>)
															: ''
														}

													</div>
												) : (<div className="form__row--drop-zone" id="dropzone-2" tabIndex={0}> Move here </div>)
											}
                                    	</div>

                                	</div>

									<div className="form__row">
										<div className="form__row--label" tabIndex={0}> Resulting <br /> Plasmid </div>
										<div className="column">
											{
												this.props.predictions.fragment.p_ARA_R !== '0' ? (<img tabIndex={0} draggable="false" src={this.getImage('p_ARA_R')} alt="" />) : ''
											}
										</div>
										<div className="column">
											{
												this.props.predictions.fragment.plasm_2 !== '0' ? (<img tabIndex={0} draggable="false" src={this.getImage('plasm_2')} alt="" />) : ''
											}
										</div>
										<div className="column">
											{
												this.props.predictions.fragment.plasm_3 !== '0' ? (<img tabIndex={0} draggable="false" src={this.getImage('plasm_3')} alt="" />) : ''
											}
										</div>
									</div>

                                	<div className="form__row">
										<div className="form__row--label" tabIndex={0}> Size (bp) </div>
										<div className="column">
											<p className="prediction-mass" tabIndex={0}>
												{
													parseInt(this.props.predictions.fragment.p_ARA_R[0], 10) +
													parseInt(this.props.predictions.fragment.p_ARA_R[1], 10) + " bp"
												}
											</p>
										</div>
										<div className="column">
											<p className="prediction-mass" tabIndex={0}>
												{parseInt(this.props.predictions.fragment.plasm_2[0], 10) +
												 parseInt(this.props.predictions.fragment.plasm_2[1], 10) + " bp"}
											</p>
										</div>
										<div className="column">
											<p className="prediction-mass" tabIndex={0}>
												{parseInt(this.props.predictions.fragment.plasm_3[0], 10) +
												 parseInt(this.props.predictions.fragment.plasm_3[1], 10) + " bp"}
											</p>
										</div>
									</div>

                            	</div>
                        	</div>

												{/* <div className="predictions-footer">
													<button
														className="predictions-footer__btn"
														type="submit"
														disabled={(this.props.predictions.fragment.p_ARA_R !== null
																	&& this.props.predictions.fragment.plasm_2 !== null
																	&& this.props.predictions.plasm_3 !== null) ? true: false}>
																	Submit Prediction
													</button>
												</div> */}

                    	</div>
                	</form>
            	</div>
        	</div>
    	);
	};

  	buildSectionBlocks = () => {
    	return (

			<div
		  		className="outerQBlock"
		  		onDragStart={this.onDragStart}
		  		onDragOver={this.onDragOver}
		  		onDrop={this.onDrop}
					onMouseUp = {this.onDrop}>

					{ this.section1() }
					{/* { this.section2() } */}
					{ this.section3() }
					{ this.section4() }

      		</div>

    	);
  	};

  	render() {
    	return (
      		<div className="Predictions">
				<div>
					<p className="description" tabIndex={0}>
					In this simulation, you will be joining DNA fragments created
					from the restriction digest of the pARA and pKAN-R plasmids to make the recombinant pARA-R plasmid. Our ideal
					plasmid will ligate the <i>rfp</i> gene into the pARA plasmid backbone.
					</p>

					<img src={fragments} aria-label="The 4 fragments that users will encounter in this simulation." />

					<p className="description" tabIndex={0}>
						The ligation process will result in several different plasmids. Shown
						above are the fragments created by the restriction digest of pKAN-R
						and pARA plasmids.
					</p>

					<p className="description" tabIndex={0}>
						To help you visualize the reaction in the DNA ligase solution tube, consider the
						possible products that can form during the ligation process. Since we know the size of available fragments, you can
						predict the genes that will be contained in each product, as well the number of
						base pairs of these products.
					</p>

					<p className="description" tabIndex={0}>
						Using the fragments from pKAN-R and pARA, and your knowledge of sticky ends,
						how do you expect the fragments to join during the ligation step? To make your
						predictions, move the fragments into the boxes below to create
						possible ligation products.
					</p>
				</div>

        <div tabIndex={0}></div>

					{this.buildSectionBlocks()}

      	</div>
    	);
  	}
}

const mapStateToProps = (state, ownProps) => {
  	return {
		id: ownProps.id,
		predictions: state.scene.predictions,
		heldObject: state.scene.heldObject,
		inFragmentTable: state.solution.inFragmentTable,
		targetList: state.solution.targetList
  	}
}

export default connect(mapStateToProps, {
	setDigestPrediction,
	setHeldObject,
	setTargetList,
	setFragmentMass,
	reverseFragmentMass
})(Predictions);
