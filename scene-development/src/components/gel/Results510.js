import React, { Component } from "react";
import { connect } from "react-redux";

import {
  pushInteractions,
  //setGelPrediction,
 } from '../../actions';

import "./Gel.scss";

import GelStain from './img/result-correct-gel-stain.svg'
import CorrectResult from './img/correct-result.svg'
import PredictedResult from './img/correct-result.svg'

import Protein1 from './img/protein_gel-1.svg'
import Protein2 from './img/protein_gel-2.svg'
import Protein3 from './img/protein_gel-3.svg'
import Protein4 from './img/protein_gel-4.svg'
import Blank from './img/blank-gel.svg'

// Styles
import colors from "../../styles/_colors.scss";

const images = {
  protein1: Protein1,
  protein2: Protein2,
  protein3: Protein3,
  protein4: Protein4,
  Blank: Blank
}

class Gel extends Component {
constructor(props) {
  super(props);

  this.state = {
  }

}

getType = (control) => {
  switch(control){
    case 'wildType':
      return 'Wild type macrophage cells';
      break;
    case 'edit7':
      return 'Edit 7 cells';
      break;
    case 'edit4':
      return 'Edit 4 cells';
      break;
    case 'pancreasCells':
      return 'Pancreas cells';
      break;

    default:
      return null;
  }
}

renderControls = (type) => {

  if(type == 'Sample'){

    let data = this.props.predictions.cellCultures.sample;

    if(data.length == 2){
      return this.getType(data[0]) +', ' + this.getType(data[1]);
    } else if(data.length == 1) {
      return this.getType(data[0]);
    } else {
      return ''
    }


  } else if (type == 'Positive Control'){

    let data = this.props.predictions.cellCultures.positiveControl;
    if(data.length == 2){
      return this.getType(data[0]) +', ' + this.getType(data[1]);
    } else if(data.length == 1) {
      return this.getType(data[0]);
    } else {
      return ''
    }

  } else if(type == 'Negative Control'){

    let data = this.props.predictions.cellCultures.negativeControl;
    if(data.length == 2){
      return this.getType(data[0]) +', ' + this.getType(data[1]);
    } else if(data.length == 1) {
      return this.getType(data[0]);
    } else {
      return ''
    }

  } else {

    return null;
  }
}

generateResultGel = () => {
  let renderLanes = [[], [], [], [], []];
  let renderGel = [];

  //Gets all band data for focused lane
  let bandData = this.props.resultBands;

  //Creates all bands and inserts into correct arrays in renderLanes
  for (let j = 1; j < 7; j++) {
    let counter = 0;
    for (var band in bandData["lane" + j]) {
      if (bandData["lane" + j][band] !== 0) {
          renderLanes[j - 1].push(
            <div
              className={"result-band " + band}
              style={{
                position: "absolute",
                top: bandData["lane" + j][band] * 0.20 + "px"
              }}
              key={counter * j * (j + 1)}
            ></div>
          );
      }
      counter++;
    }
  }

  //Takes all bands in renderLanes and fits them in divs in renderGel
  for (let i = 0; i < 5; i++) {
    renderGel.push(
      <div className={"lane-"+(i+1)}>
        {renderLanes[i]}
      </div>
    );
  }

  //Returns all bands, in their divs
  return <div className="band-results">{renderGel}</div>;
}

render(){
  return (
      <div className="Gel510-results">

        <div className="result-prediction">
          <div className="prediction-side">
            <h4 tabIndex="0">Predicted results</h4>
            <img src={(this.props.predictionProtein !== null)?images[this.props.predictionProtein]:images.Blank} tabIndex="0" alt="Top-down view of the gel cassette, showing the bands in their predicted positions. "/>
          </div>
          <div className="result-side">
            <h4 tabIndex="0">Actual results</h4>
            {this.generateResultGel()}
            <img src={images.Blank} tabIndex="0" alt="Top-down view of the gel cassette, showing the bands in their actual positions."/>
          </div>
          <div className="ideal-side">
            <h4 tabIndex="0" style={{marginTop: "16px"}}>Ideal results</h4>
            <img src={PredictedResult} tabIndex="0" alt="Top-down view of the gel cassette, showing the bands in their correct positions."/>
          </div>
        </div>
        <p className="description" tabIndex={0}>You should be able to see the protein ladder separated out in the first lane, as well as the blue dye front, which derives from the bromophenol blue in the SDS sample buffer. For optimal separation of the proteins in your samples, the dye front should have arrived at the bottom of the gel when electrophoresis is stopped. The proteins themselves are invisible at this stage (except for the pre-stained marker proteins) and need further manipulation to be visualized.</p>
        <br/>
        <p className="description" tabIndex={0}>One way to visualize specific proteins is Western blotting. Another is Coomassie staining that dyes all protein blue in a protein gel.</p>
        <h4 tabIndex="0">Controls</h4>
        <p className="description" tabIndex={0} style={{marginBottom: "20px"}}>Compare your predicted controls with the correct controls.</p>
        <div className="table-wrapper">
          <table className="results-table">
            <tr>
              <th></th>
              <th tabIndex="0" aria-label="Positive control column. Wild type macrophage cells.">Positive control</th>
              <th tabIndex="0" aria-label="Negative control column. Pancreas cells.">Negative control</th>
              <th tabIndex="0" aria-label="Samples column. Containing Edit 4 cells and edit 7 cells.">Samples</th>
            </tr>
            <tr>
              <td tabIndex="0" style={{background: "white"}} ><b>Predicted controls and samples</b></td>
              <td tabIndex="0">{this.renderControls('Positive Control')}</td>
              <td tabIndex="0">{this.renderControls('Negative Control')}</td>
              <td tabIndex="0">{this.renderControls('Sample')}</td>
            </tr>
            <tr>
              <td tabIndex="0" style={{background: "white"}} ><b>Correct controls and samples</b></td>
              <td tabIndex="0">Wild type macrophage cells</td>
              <td tabIndex="0">Pancreas cells</td>
              <td tabIndex="0">Edit 4 cells, Edit 7 cells</td>
            </tr>
          </table>
        </div>
        <br/>
        <p tabIndex={0} className="description">The positive control is the wild type macrophage cell line, in which the CCR5 gene has not been disrupted by CRISPR-Cas9 editing and the CCR5 co-receptor is still expressed. Later on, after Western blotting, you should be able to detect CCR5 in this lane, ensuring that SDS-PAGE and Western blotting have been done correctly.</p>
        <br/>
        <p tabIndex={0} className="description">The negative control is the pancreas cell line since it doesn’t express any CCR5 protein. If you should detect CCR5 in this lane during later analyses, such as Western blotting, you will know there was either a contamination of your samples or that the antibody you used cross-reacted with other protein, and your results are not reliable.</p>
        <h4 tabIndex="0">Coomassie staining</h4>
        <p className="description" tabIndex={0}>After running a protein gel, you cannot yet see any protein (except for the prestained proteins of the molecular weight marker or ladder), and further steps are required. One way to visualize proteins in a gel is to use Coomassie staining. Coomassie blue is a dye that interacts with the amino acids of proteins and stains them blue. If a protein gel is soaked in Coomassie, protein bands become visible as blue bands on a clear background. In contrast to antibodies, which bind to one protein specifically, Coomassie is nonspecific and stains all proteins. Staining a gel that was loaded with a whole cell extract (as in our case), you would likely only see a smear of proteins because a cell contains thousands of different proteins of all sizes. Coomassie staining is therefore unlikely to reveal whether you have successfully deleted CCR5 from your edited macrophage cell lines. Below is indicated where CCR5 would be located in a gel, illustrating how difficult it can be to read a protein smear. To confirm that a specific protein, like CCR5, is present or absent, you will need to conduct a Western blot that uses specific antibodies that bind only to your protein of interest.</p>
        <h4 tabIndex="0">Coomassie stained gel</h4>
        <img tabIndex="0" src={GelStain} alt="Top-down view of agarose gel, showing the CCR5 gel in the wild type macrophage lane."/>
      </div>
    );
  }
}

 const mapStateToProps = (state, ownProps) => {
   return {
       id: ownProps.id,
       type: state.gel.gels[ownProps.id-1].type,
       target: state.scene.lastDrop.lastTarget,
       predictions: state.scene.predictions,
       predictionProtein: state.scene.predictionProtein,
       resultBands: state.gel.gels[ownProps.id-1].results,
       lanes: state.gel.gels[ownProps.id-1].lanes
   }
}

export default connect(mapStateToProps,{
  pushInteractions,
  //setGelPrediction,
})(Gel);
