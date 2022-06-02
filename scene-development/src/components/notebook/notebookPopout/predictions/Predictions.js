import React, { Component } from "react";
import { connect } from "react-redux";
// import { throttle } from "lodash";
// import {
//   unscaledStart,
//   unscaledDrag,
//   end,
//   getPointerTarget,
//   getTransform
// } from "lib/hotspot";

// import {default as Gel} from 'components/gel/Predictions-510';
import SceneData from "../../../../data/scene.json";
// import PredictionsChoiceQuestion from "components/questions/predictionsChoiceQuestion/PredictionsChoiceQuestion";
// import PredictionsData from "data/notebook.json";

import {
  createPSCQ,
  pushInteractions,
  setGelPrediction,
  setPredictionBandHeight,
  setDropdownPrediction,
  setPredictionLaneVisible,
  setPredictionAllHeights,
} from "../../../../actions";

import "./Predictions.scss";

// import gelPrediction from "./img/gel-prediction-46.svg";
// import plasmids from "./img/plasmids.svg";
// import combinationBands from "./img/combinations.svg";
// import lane1 from "./img/lane-1.svg";
// import lane2 from "./img/lane-2.svg";
// import lane3 from "./img/lane-3.svg";
// import lane4 from "./img/lane-4.svg";
// import lane5 from "./img/lane-5.svg";
// import lane6 from "./img/lane-5.svg";

// solution tubes
import gkmin from "./img/solution-gkmin.svg";
import gamin from "./img/solution-gamin.svg";
import gkplus from "./img/solution-gkplus.svg";
import gaplus from "./img/solution-gaplus.svg";
import glig from "./img/solution-glig.svg";
import gkminSelected from "./img/solution-gkmin-dragged.svg";
import gaminSelected from "./img/solution-gamin-dragged.svg";
import gkplusSelected from "./img/solution-gkplus-dragged.svg";
import gaplusSelected from "./img/solution-gaplus-dragged.svg";
import gligSelected from "./img/solution-glig-dragged.svg";
import emptyTube from "./img/solution-empty.svg";

const images = {
  gkmin: gkmin,
  gamin: gamin,
  gkplus: gkplus,
  gaplus: gaplus,
  glig: glig,
  "gkmin Selected": gkminSelected,
  "gamin Selected": gaminSelected,
  "gkplus Selected": gkplusSelected,
  "gaplus Selected": gaplusSelected,
  "glig Selected": gligSelected,
  emptyTube: emptyTube,
};

class Predictions extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   dragged: null,
    //   components: [],
    //   y1: this.extractHeights(1),
    //   y2: this.extractHeights(2),
    //   y3: this.extractHeights(3),
    //   y4: this.extractHeights(4),
    //   y5: this.extractHeights(5),
    //   y1last: 0,
    //   y2last: 0,
    //   y3last: 0,
    //   y4last: 0,
    //   y5last: 0,
    //   recombinants: [
    //     {
    //       id: 0,
    //       title: "754 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 1,
    //       title: "1184 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 2,
    //       title: "1614 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 3,
    //       title: "pARA 4872 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 4,
    //       title: "5082 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 5,
    //       title: "pARA-R 5302 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 6,
    //       title: "pKAN-R 5512 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 7,
    //       title: "8990 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 8,
    //       title: "9200 bp",
    //       selected: false,
    //       key: "recombinant"
    //     },
    //     {
    //       id: 9,
    //       title: "9410 bp",
    //       selected: false,
    //       key: "recombinant"
    //     }
    //   ],
    //   open: false,
    //   headerTitle: this.props.title,
    //   renderLanes: {
    //     lane1: true,
    //     lane2: true,
    //     lane3: true,
    //     lane4: true,
    //     lane5: true
    //   },
    //   gelHoleStyles: {
    //     lane1: "gelHole0",
    //     lane2: "gelHole0",
    //     lane3: "gelHole0",
    //     lane4: "gelHole0",
    //     lane5: "gelHole0"
    //   }
    // };

    this.state = {
      predictions: [],
    };
  }

  // extractHeights = lane => {
  //   let res = [];
  //   for (let i = 0; i < this.props.bandData["lane" + (lane + 1)].length; i++) {
  //     res.push(this.props.bandData["lane" + (lane + 1)][i].height);
  //   }
  //   return res;
  // };
  //
  // onDragStart = e => {
  //   let dragImage = document.getElementById("dragImage");
  //
  //   if (dragImage == null) {
  //     dragImage = document.createElement("img");
  //     dragImage.id = "dragImage";
  //     dragImage.src =
  //       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  //     document.body.appendChild(dragImage);
  //   }
  //
  //   var testVar = window.DataTransfer || window.Clipboard;  // Clipboard is for Chrome
  //   if("setDragImage" in testVar.prototype) {
  //       e.dataTransfer.setDragImage(dragImage, 0, 0)
  //   }
  //   if("setData" in testVar.prototype){
  //       e.dataTransfer.setData('text/plain', 'dummy');
  //   }
  //
  //
  //
  //   let target = getPointerTarget(e, e.target.childNodes);
  //
  //   if (typeof target !== "undefined") {
  //     if (target.id !== undefined) {
  //       let lane = target.id.split("_")[1];
  //
  //       console.log(target);
  //       document.getElementById(target.id).focus();
  //
  //       this.setState({
  //         ["y" + lane + "last"]: e.clientY,
  //         dragged: typeof target !== "undefined" ? target : null
  //       });
  //     }
  //   }
  //
  //
  //   return false;
  // };
  //
  // drag = throttle((target, clientX, clientY) => {
  //   if (target && target.id.includes("band")) {
  //     let transform = getTransform(target);
  //     let lane = target.id.split("_")[1];
  //     let band = target.id.split("_")[2];
  //
  //     if (lane && band) {
  //       let iYPos = parseFloat(transform.translateY);
  //       let newY = clientY + iYPos - this.state["y" + lane + "last"];
  //
  //       if (newY >= 0 && newY <= 508) {
  //         let updateY = this.state["y" + lane];
  //
  //         updateY[band] = newY;
  //
  //         this.setState({
  //           ["y" + lane]: updateY,
  //           ["y" + lane + "last"]: clientY
  //         });
  //       }
  //     }
  //   }
  // }, 20);
  //
  // onDragOver = e => {
  //   e.preventDefault();
  //   this.drag(this.state.dragged, e.clientX, e.clientY);
  // };
  //
  // onDragEnd = e => {
  //   e.preventDefault();
  //
  //   let heights = {
  //     lane1: [],
  //     lane2: this.state.y1,
  //     lane3: this.state.y2,
  //     lane4: this.state.y3,
  //     lane5: this.state.y4,
  //     lane6: this.state.y5
  //   };
  //
  //   this.props.setPredictionAllHeights({
  //     id: 1,
  //     heights: heights
  //   });
  // };
  //
  // toggleDropdown = () => {
  //   this.setState({
  //     open: !this.state.open
  //   });
  // };
  //
  // selectChoice = item => {
  //   this.setState({
  //     dropDownChoice: item.title,
  //     open: false
  //   });
  //
  //   this.props.setDropdownPrediction({
  //     id: 1,
  //     choice: item.title,
  //     choiceId: item.id
  //   });
  //
  //   //TODO: Add redux action call
  // };
  //
  // getDropDownText = () => {
  //   if (this.props.dropDownChoice === "") {
  //     return "Select the plasmid which you think is correct from the list";
  //   } else {
  //     return (this.props.dropDownChoiceId + 1);
  //   }
  // };
  //
  // generateDNABand = (e, getId) => {
  //   getId = e.target.id;
  //
  //   return this.getImage("gA+");
  // };
  //
  // getTubeImg = type => {
  //   if (type === undefined) {
  //     return <img alt={"no image found"} />;
  //   } else {
  //     let modType = type
  //       .replace("-", "min")
  //       .replace("+", "plus")
  //       .toLowerCase();
  //
  //     // let blankImg =
  //     //   (modType === "gkmin" && this.props.lanesVisible.lane1) ||
  //     //   (modType === "gamin" && this.props.lanesVisible.lane2) ||
  //     //   (modType === "gkplus" && this.props.lanesVisible.lane3) ||
  //     //   (modType === "gaplus" && this.props.lanesVisible.lane4) ||
  //     //   (modType === "glig" && this.props.lanesVisible.lane5);
  //
  //     // if (blankImg) {
  //     //   modType = "emptyTube";
  //     // }
  //
  //     return <img src={images[modType]} aria-hidden="true" alt={type} />;
  //   }
  // };
  //
  // setBandsVisibile = lane => {
  //   let oldLanes = this.state.renderLanes;
  //   //toggles true/false
  //   oldLanes["lane" + lane] = !oldLanes["lane" + lane];
  //   this.setState({
  //     renderLanes: oldLanes
  //   });
  // };
  //
  //
  //
  // renderBands = lane => {
  //   let data = this.props.bandData;
  //
  //
  //   if (this.props.lanesVisible["lane" + lane]) {
  //
  //     const lanes = ["gK−","gK+","gA−","gA+","gLIG"]
  //
  //     let bands = [];
  //     for (let i = 0; i < data["lane" + (lane + 1)].length; i++) {
  //       const bandData = data["lane" + (lane + 1)][i];
  //
  //       bands.push(
  //         <div
  //           tabIndex={0}
  //           onKeyDown={e => {
  //             if (e.keyCode === 38) this.onMoveUp(e, lane + 1, i);
  //             else if (e.keyCode === 40) this.onMoveDown(e, lane + 1, i);
  //           }}
  //           id={"band_" + lane + "_" + i}
  //           key={(i + 1) * lane}
  //           className="gelBand"
  //           style={{
  //             transform: "translate(0, " + this.state["y" + lane][i] + "px)"
  //           }}
  //           aria-label={lanes[lane]+" lane " + bandData.label + " band"}
  //         >
  //
  //           {bandData.label}
  //
  //         </div>
  //
  //       );
  //     }
  //     return bands;
  //   } else {
  //     return "";
  //   }
  // };
  //
  // //Keyboard controls for bands
  // onMoveUp = (e, lane, band) => {
  //   e.preventDefault();
  //
  //   let heights = {
  //     lane1: [],
  //     lane2: this.state.y1,
  //     lane3: this.state.y2,
  //     lane4: this.state.y3,
  //     lane5: this.state.y4,
  //     lane6: this.state.y5
  //   };
  //
  //   if (heights["lane" + lane][band] - 10 >= 0) {
  //     heights["lane" + lane][band] -= 10;
  //   }
  //
  //   this.props.setPredictionAllHeights({
  //     id: 1,
  //     heights: heights
  //   });
  // };
  //
  // onMoveDown = (e, lane, band) => {
  //   e.preventDefault();
  //
  //   let heights = {
  //     lane1: [],
  //     lane2: this.state.y1,
  //     lane3: this.state.y2,
  //     lane4: this.state.y3,
  //     lane5: this.state.y4,
  //     lane6: this.state.y5
  //   };
  //
  //   if (heights["lane" + lane][band] + 10 <= 500) {
  //     heights["lane" + lane][band] += 10;
  //   }
  //
  //   this.props.setPredictionAllHeights({
  //     id: 1,
  //     heights: heights
  //   });
  // };
  //
  // gelHoleClass = lane => {
  //   return "gelHole2";
  // };

  // cycleClasses = lane => {
  //   //TODO: only clickable once
  //   //TODO: grey out the button images when clicked

  //   if (!this.state.renderLanes["lane" + lane]) {
  //     let tempStyles = this.state.gelHoleStyles;
  //     tempStyles["lane" + lane] = "gelHole";
  //     this.setState({
  //       gelHoleStyles: tempStyles
  //     });

  //     setTimeout(() => {
  //       tempStyles["lane" + lane] = "gelHole2";
  //       this.setState({
  //         gelHoleStyles: tempStyles
  //       });
  //     }, 250);

  //     if (!this.state.renderLanes["lane" + lane]) {
  //       this.props.setPredictionLaneVisible({
  //         id: 1,
  //         lane: lane,
  //         visible: true
  //       });
  //       this.setBandsVisibile(lane);
  //     }
  //   }
  // };

  // render() {
  //   return (
  //     <div className="Predictions">
  //       <div>
  //         <p className="description" tabIndex={0}>
  //           In this simulation, you will be using gel electrophoresis to
  //           separate DNA fragments and plasmids to determine if the desired
  //           plasmid (pARA-R) with a gene of interest <i>(rfp)</i> have been
  //           created during a previous DNA ligation experiment.
  //         </p>
  //
  //         <h4 className="description" tabIndex={0}>
  //           As shown below, within your tubes there are:
  //         </h4>
  //
  //         <p className="description" tabIndex={0}>
  //           <div className="row">
  //             1&#41;
  //             <div className="text" aria-label="The original circular plasmids (tubes K minus and A minus),">
  //               The original circular plasmids (tubes K− and A−),
  //             </div>
  //           </div>
  //           <div className="row">
  //             2&#41;
  //             <div className="text" aria-label="Digested pKAN-R and pARA plasmids (tubes K plus and A plus)">
  //               Digested pKAN-R and pARA plasmids (tubes K+ and A+)
  //             </div>
  //           </div>
  //           <div className="row">
  //             3&#41;
  //             <div className="text">
  //               Recombinant plasmids created from these fragments (tube LIG).
  //               Since these fragments can be joined in different ways, there are
  //               10 possible recombinant plasmids that may be found in the gLIG
  //               tube. To determine which plasmid is which, you will run the
  //               samples on an agarose gel and use a DNA ladder to determine
  //               their length. <br />
  //               <br />
  //               Please enter in section 4 below which plasmid you are looking
  //               for among all possible recombinant plasmids. To predict the
  //               bands you expect to see for each reagent, please select each of
  //               the tubes to generate and drag bands on the gel to the position
  //               you expect them to migrate, based on their size and
  //               configuration. For the gLIG lane, we assume the possible
  //               plasmids are all behaving like DNA fragments when they migrate
  //               though the gel.
  //             </div>
  //           </div>
  //         </p>
  //       </div>
  //
  //       <div className="">
  //         <div className="predictions-question-container" tabIndex={0}>
  //           <h5 style={{ margin: "0px", padding: "5px 0px 15px" }} tabIndex={0}>
  //             Here are the DNA pieces found within each tube.
  //           </h5>
  //
  //           <div className="section-1">
  //             {" "}
  //             <img width="100%" src={plasmids} tabIndex={0} alt="" />{" "}
  //             <div className="imgOverlayDiv1" tabIndex={0} aria-label="gK minus tube contains nondigested pKAN-R plasmids which have 5512 base pairs. The pKAN-R plasmid contains the red fluorescent protein gene, the pBAD promoter region, and the kanamycin resistance gene."></div>
  //             <div className="imgOverlayDiv2" tabIndex={0} aria-label="gA minus tube contains nondigested pARA plasmids which have 4872 base pairs. The pARA plasmid contains an ori site (the origin of replication), the araC activator protein, and the ampicillin resistance gene."></div>
  //             <div className="imgOverlayDiv3" tabIndex={0} aria-label="gK plus tube contains digested pKAN-R digest fragments. The first fragment contains the red fluorescent protein gene and pBAD promoter region. The second fragment contains the kanamycin resistance gene."></div>
  //             <div className="imgOverlayDiv4" tabIndex={0} aria-label="gA plus tube contains digested pARA digest fragments. The first fragment contains no relevant genes for this experiment. The second fragment contains an ori site (the origin of replication), the araC activator protein, and the ampicillin resistance gene."></div>
  //           </div>
  //
  //           <div className="section-2">
  //             {" "}
  //             <img
  //               width="100%"
  //               src={combinationBands}
  //               tabIndex={0}
  //               alt="Shown is a tube labeled gLIG and ten plasmids that may be present inside it. Each plasmid is indicated by a circle, with genes represented within the plasmid circle by the colors red, green, black, light blue, dark blue, and yellow. Each of the ten plasmids have a different combination of genes present."
  //             />{" "}
  //           </div>
  //
  //           <div tabIndex={0} className="component-select">
  //             <h5 style={{ margin: "0px", padding: "5px 0px 15px" }}>
  //               4. What plasmid in the gLIG tube is the one we are looking for?
  //             </h5>
  //
  //             <div className="dropdown">
  //               <div
  //                 className="dropdown__header"
  //                 tabIndex={0}
  //                 onKeyDown={e => {
  //                   if (e.keyCode === 13 || e.keyCode === 32)
  //                     this.toggleDropdown(e);
  //                 }}
  //                 onClick={this.toggleDropdown}
  //               >
  //                 <div style={{ color: "#4d7c9a" }}>
  //                   {this.getDropDownText()}
  //                 </div>
  //                 <div className="down-arrow" />
  //               </div>
  //               {this.state.open ? (
  //                 <ul className="dropdown__items">
  //                   {this.state.recombinants.map(item => (
  //                     <li
  //                       className="dropdown__items--choice"
  //                       tabIndex={0}
  //                       key={item.title}
  //                       onKeyDown={e => {
  //                         if (e.keyCode === 13 || e.keyCode === 32)
  //                           this.selectChoice(item);
  //                         if (e.keyCode === 13 || e.keyCode === 32)
  //                           this.selectChoice(item);
  //                       }}
  //                       onClick={e => {this.selectChoice(item)}}
  //                     >
  //                       {" "}
  //                       {item.id+1}{" "}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               ) : (
  //                 ""
  //               )}
  //             </div>
  //           </div>
  //
  //           <div className="gel-container" tabIndex={0}>
  //             <div className="description">
  //               <h5 className="header" tabIndex={0} style={{ margin: "0", padding: "0px" }}>
  //                 5. Bands in gel
  //               </h5>
  //               <p className="sub-header" tabIndex={0}>
  //                 {" "}
  //                 Drag the DNA bands on the gel below to the position you expect them to migrate through the gel.{" "}
  //               </p>
  //
  //               <div className="" />
  //             </div>
  //
  //             <div className="lane-legend">
  //               <div
  //                 className="lane-legend__type"
  //                 id="gkmin"
  //                 tabIndex={0}
  //                 // onClick={() => this.cycleClasses(1)}
  //                 // onKeyDown={e => {
  //                 //   if (e.keyCode === 13 || e.keyCode === 32)
  //                 //     this.cycleClasses(1);
  //                 // }}
  //               >
  //                 {this.getTubeImg("gK-")}
  //                 <span aria-label="gK minus" className={"lane-legend__type--label"}>gK−</span>
  //               </div>
  //
  //               <div
  //                 className="lane-legend__type"
  //                 id="gkplus"
  //                 tabIndex={0}
  //                 // onClick={() => this.cycleClasses(2)}
  //                 // tabIndex={0}
  //                 // onKeyDown={e => {
  //                 //   if (e.keyCode === 13 || e.keyCode === 32)
  //                 //     this.cycleClasses(2);
  //                 // }}
  //               >
  //                 {this.getTubeImg("gK+")}
  //
  //                 <span aria-label="gK plus" className={"lane-legend__type--label"}>gK+</span>
  //               </div>
  //
  //               <div
  //                 className="lane-legend__type"
  //                 id="gamin"
  //                 tabIndex={0}
  //                 // onClick={() => this.cycleClasses(3)}
  //                 // tabIndex={0}
  //                 // onKeyDown={e => {
  //                 //   if (e.keyCode === 13 || e.keyCode === 32)
  //                 //     this.cycleClasses(3);
  //                 // }}
  //               >
  //                 {this.getTubeImg("gA-")}
  //                 <span aria-label="gA minus" className={"lane-legend__type--label"}>gA−</span>
  //               </div>
  //
  //               <div
  //                 className="lane-legend__type"
  //                 id="gaplus"
  //                 tabIndex={0}
  //                 // onClick={() => this.cycleClasses(4)}
  //                 // tabIndex={0}
  //                 // onKeyDown={e => {
  //                 //   if (e.keyCode === 13 || e.keyCode === 32)
  //                 //     this.cycleClasses(4);
  //                 // }}
  //               >
  //                 {this.getTubeImg("gA+")}
  //                 <span aria-label="gA plus" className={"lane-legend__type--label"}>gA+</span>
  //               </div>
  //
  //               <div
  //                 className="lane-legend__type"
  //                 id="glig"
  //                 tabIndex={0}
  //                 // onClick={() => this.cycleClasses(5)}
  //                 // tabIndex={0}
  //                 // onKeyDown={e => {
  //                 //   if (e.keyCode === 13 || e.keyCode === 32)
  //                 //     this.cycleClasses(5);
  //                 // }}
  //               >
  //                 {this.getTubeImg("gLIG")}
  //                 <span aria-label="gLIG" className={"lane-legend__type--label"}>gLIG</span>
  //               </div>
  //             </div>
  //
  //
  //
  //             <div className="Gel-prediction">
  //               <div className="gel-lane">
  //                 <div className="gel-lane__slot" id="gel-lane0">
  //                   <img src={lane1} alt="" />
  //                 </div>
  //                 <div
  //                   className="gel-lane__slot"
  //                   id="gel-lane1"
  //                   onDragStart={this.onDragStart}
  //                   onDragOver={this.onDragOver}
  //                   onDragEnd={this.onDragEnd}
  //                 >
  //                   <div className={this.gelHoleClass(1)}>gK-</div>
  //                   <div className={"gelHoleLane1"}>M</div>
  //                   <div
  //                     className={
  //                       "gelRail" +
  //                       (this.state.gelHoleStyles.lane1 === "gelHole"
  //                         ? " highlighted"
  //                         : "")
  //                     }
  //                     draggable
  //                   >
  //                     {this.renderBands(1)}
  //                   </div>
  //                   <img
  //                     src={lane1}
  //                     aria-label="Lane 1 of the agarose gel with DNA ladder. Showing various bands."
  //                     alt=""
  //                   />
  //                 </div>
  //                 <div
  //                   className="gel-lane__slot"
  //                   id="gel-lane2"
  //                   onDragStart={this.onDragStart}
  //                   onDragOver={this.onDragOver}
  //                   onDragEnd={this.onDragEnd}
  //                 >
  //                   <div className={this.gelHoleClass(2)}>gA-</div>
  //                   <div
  //                     className={
  //                       "gelRail" +
  //                       (this.state.gelHoleStyles.lane2 === "gelHole"
  //                         ? " highlighted"
  //                         : "")
  //                     }
  //                     draggable
  //                   >
  //                     {this.renderBands(2)}
  //                   </div>
  //                   <img
  //                     src={lane2}
  //                     aria-label="Lane 2 of the agarose gel with gK- solution. Showing three bands."
  //                     alt=""
  //                   />
  //                 </div>
  //                 <div
  //                   className="gel-lane__slot"
  //                   id="gel-lane3"
  //                   onDragStart={this.onDragStart}
  //                   onDragOver={this.onDragOver}
  //                   onDragEnd={this.onDragEnd}
  //                 >
  //                   <div className={this.gelHoleClass(3)}>gK+</div>
  //                   <div
  //                     className={
  //                       "gelRail" +
  //                       (this.state.gelHoleStyles.lane3 === "gelHole"
  //                         ? " highlighted"
  //                         : "")
  //                     }
  //                     draggable
  //                   >
  //                     {this.renderBands(3)}
  //                   </div>
  //                   <img
  //                     src={lane3}
  //                     aria-label="Lane 3 of the agarose gel with gK+ solution. Showing two bands. "
  //                     alt=""
  //                   />
  //                 </div>
  //                 <div
  //                   className="gel-lane__slot"
  //                   id="gel-lane4"
  //                   onDragStart={this.onDragStart}
  //                   onDragOver={this.onDragOver}
  //                   onDragEnd={this.onDragEnd}
  //                 >
  //                   <div className={this.gelHoleClass(4)}>gA+</div>
  //                   <div
  //                     className={
  //                       "gelRail" +
  //                       (this.state.gelHoleStyles.lane4 === "gelHole"
  //                         ? " highlighted"
  //                         : "")
  //                     }
  //                     draggable
  //                   >
  //                     {this.renderBands(4)}
  //                   </div>
  //                   <img
  //                     src={lane4}
  //                     aria-label="Lane 4 of the agarose gel with gA- solution. Showing three bands."
  //                     alt=""
  //                   />
  //                 </div>
  //                 <div
  //                   className="gel-lane__slot"
  //                   id="gel-lane5"
  //                   onDragStart={this.onDragStart}
  //                   onDragOver={this.onDragOver}
  //                   onDragEnd={this.onDragEnd}
  //                 >
  //                   <div className={this.gelHoleClass(5)}>gLIG</div>
  //                   <div
  //                     className={
  //                       "gelRail" +
  //                       (this.state.gelHoleStyles.lane5 === "gelHole"
  //                         ? " highlighted"
  //                         : "")
  //                     }
  //                     draggable
  //                   >
  //                     {this.renderBands(5)}
  //                   </div>
  //                   <img
  //                     src={lane5}
  //                     aria-label="Lane 5 of the agarose gel with gA+ solution. Showing two bands."
  //                     alt=""
  //                   />
  //                 </div>
  //               </div>
  //
  //               <img
  //                 tabIndex={1}
  //                 onKeyDown={e => {
  //                   if (e.keyCode === 38) this.moveUp();
  //                   else if (e.keyCode === 40) this.moveDown();
  //                 }}
  //                 tabIndex={0}
  //                 className="prediction-bg"
  //                 style={{ pointerEvents: "none" }}
  //                 src={gelPrediction}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  buildComponent = (data) => {
    // const components = data.components.map((component, index) => (
    // <Gel key={index} id={component.props.id} />
    // ));
    // return (components)
  };

  componentDidMount() {
    this.setState({
      predictions: this.buildComponent(SceneData["Gel"]),
    });
  }

  render() {
    return (
      <div className="Predictions">
        <div>
          <p className="description" tabIndex={0}>
            Ac turpis egestas sed tempus urna et. Erat pellentesque adipiscing
            commodo elit at. Id diam vel quam elementum pulvinar etiam non. In
            aliquam sem fringilla ut morbi tincidunt augue. Eget velit aliquet
            sagittis id. Senectus et netus et malesuada fames. Cursus eget nunc
            scelerisque viverra mauris. Sit amet facilisis magna etiam tempor
            orci. Malesuada bibendum arcu vitae elementum curabitur. Feugiat
            vivamus at augue eget arcu. Consequat semper viverra nam libero.
            Proin nibh nisl condimentum id venenatis a condimentum vitae.
            Elementum pulvinar etiam non quam lacus. Id interdum velit laoreet
            id donec ultrices tincidunt arcu non. Eget magna fermentum iaculis
            eu non. Quis lectus nulla at volutpat diam ut venenatis tellus.
            Adipiscing vitae proin sagittis nisl rhoncus. Ullamcorper eget nulla
            facilisi etiam dignissim diam quis enim. Venenatis a condimentum
            vitae sapien pellentesque habitant morbi tristique senectus.
          </p>
          <p className="description" tabIndex={0}>
            Purus in mollis nunc sed id semper risus in hendrerit. Erat
            imperdiet sed euismod nisi porta lorem mollis. Sit amet aliquam id
            diam maecenas. Sed enim ut sem viverra aliquet. Non enim praesent
            elementum facilisis. Id porta nibh venenatis cras sed felis eget
            velit. Lectus sit amet est placerat. Volutpat commodo sed egestas
            egestas. Fringilla ut morbi tincidunt augue interdum velit.
            Suspendisse in est ante in nibh. Nulla aliquet porttitor lacus
            luctus accumsan tortor posuere ac. Quis eleifend quam adipiscing
            vitae proin sagittis. Ornare aenean euismod elementum nisi quis
            eleifend quam adipiscing.
          </p>
        </div>
        <div>{this.state.predictions}</div>
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     level: state.notebook.level,
//     type: state.gel.gels[0].type,
//     predictions: state.gel.gels[0].prediction,
//     PSCQ: state.PSCQ,
//     bandData: state.gel.gels[0].predictions46,
//     dropDownChoice: state.gel.gels[0].predictions46.dropDownChoice,
//     dropDownChoiceId: state.gel.gels[0].predictions46.dropDownChoiceId,
//     lanesVisible: state.gel.gels[0].predictions46.lanesVisible
//   };
// };

// export default connect(
//   mapStateToProps,
//   {
//     createPSCQ,
//     pushInteractions,
//     setGelPrediction,
//     setPredictionBandHeight,
//     setDropdownPrediction,
//     setPredictionLaneVisible,
//     setPredictionAllHeights
//   }
// )(Predictions);

export default Predictions;
