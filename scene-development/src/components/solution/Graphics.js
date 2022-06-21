import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createSolution,
  solutionOpen,
  setSolution,
  pushInteractions
} from "../../actions";

// Red Dye
import RedDyeOpen from "./img/RedDye-open.svg";
import RedDyeClosed from "./img/RedDye-close.svg";
import RedDyeEmptyOpen from "./img/RedDye-empty-open.svg";
import RedDyeEmptyClosed from "./img/RedDye-empty-close.svg";


import TubeEmptyOpen from "./img/solution-tube-empty-open.svg";
import TubeEmptyClosed from "./img/solution-tube-empty.svg";
import TubeOpen from "./img/solution-tube-open.svg";
import TubeClosed from "./img/solution-tube.svg";

import TubeOpenPink from "./img/solution-tube-open-pink.svg";
import TubeClosedPink from "./img/solution-tube-pink.svg";

import TubeOpenBlue from "./img/solution-tube-open-blue.svg";
import TubeClosedBlue from "./img/solution-tube-blue.svg";

import SolutionS1 from "./img/solution-tube-s-1.svg";
import SolutionS1Closed from "./img/solution-tube-s-1.svg";
import SolutionS2 from "./img/solution-tube-s-2.svg";
import SolutionS2Closed from "./img/solution-tube-s-2.svg";
import SolutionS3 from "./img/solution-tube-s-3.svg";
import SolutionS3Closed from "./img/solution-tube-s-3.svg";

import APlusEmpty from "./img/solution-tube-a-plus-opened.svg";
import APlusEmptyClosed from "./img/solution-tube-a-plus-closed.svg";
import APlusFull from "./img/solution-tube-aplusfull-open.svg";
import APlusFullClosed from "./img/solution-tube-aplusfull-closed.svg";

import AMinusEmptyClosed from "./img/solution-tube-a_--closed.svg";
import AMinusEmpty from "./img/solution-tube-a_--opened.svg";
import AMinusFullClosed from "./img/solution-tube-a-full-closed.svg";
import AMinusFull from "./img/solution-tube-a-full-open.svg";

import KMinusEmpty from "./img/solution-tube-k_-open.svg";
import KMinusEmptyClosed from "./img/solution-tube-k_-closed.svg";
import KMinusFull from "./img/solution-tube-k-full-open.svg";
import KMinusFullClosed from "./img/solution-tube-k-full-closed.svg";

import KPlusFull from "./img/solution-tube-kplusfull-open.svg";
import KPlusFullClosed from "./img/solution-tube-kplusfull-closed.svg";
import KPlusEmpty from "./img/solution-tube-k.svg";
import KPlusEmptyClosed from "./img/solution-tube-k-closed.svg";

import DH2O from "./img/dH20-open.svg";
import DH2OClosed from "./img/dH20.svg";
import DH2OEmpty from "./img/dH20-empty-open.svg";
import DH2OEmptyClosed from "./img/dH20-empty.svg";

import paRA from "./img/A-open.svg";
import paRAClosed from "./img/A.svg";
import paRAEmpty from "./img/A-empty-open.svg";
import paRAEmptyClosed from "./img/A-empty.svg";

import pKan from "./img/K-open.svg";
import pKanClosed from "./img/K.svg";
import pKanEmpty from "./img/K-empty-open.svg";
import pKanEmptyClosed from "./img/K-empty.svg";

import Restriction from "./img/2x5B-open.svg";
import RestrictionClosed from "./img/2x5B.svg";
import RestrictionEmpty from "./img/2x5B-empty-open.svg";
import RestrictionEmptyClosed from "./img/2x5B-empty.svg";

import BamHI from "./img/RE-open.svg";
import BamHIClosed from "./img/RE.svg";
import BamHIEmpty from "./img/RE-empty-open.svg";
import BamHIEmptyClosed from "./img/RE-empty.svg";

import Balance from "./img/solution-tube-base.svg";
import BalanceOpen from "./img/solution-tube-base-open.svg"
import BalanceEmptyOpen from "./img/solution-tube-base-empty-open.svg";
import BalanceEmpty from "./img/solution-tube-base-empty.svg";

// Blue Dye
import BlueDyeOpen from "./img/BlueDye-open.svg";
import BlueDyeClosed from "./img/BlueDye-close.svg";
import BlueDyeEmptyOpen from "./img/BlueDye-empty-open.svg";
import BlueDyeEmptyClosed from "./img/BlueDye-empty-close.svg";

import DummyEmptyOpen from "./img/solution-tube-empty-open.svg";
import DummyEmptyClosed from "./img/solution-tube-empty.svg";
import DummyOpen from "./img/solution-tube-open.svg";
import DummyClosed from "./img/solution-tube.svg";

import TrixSalineClosed from "./img/solution-tube-trix-saline.svg";
import TrixSalineOpen from "./img/SalineOpen.svg";

import gKminusOpen from "./img/solution-gkmin-full-open.svg";
import gKminusClosed from "./img/solution-gkmin-full.svg";
import gKminusEmptyOpen from "./img/solution-gkmin-empty-open.svg";
import gKminusEmptyClosed from "./img/solution-gkmin.svg";

import gKplusOpen from "./img/solution-gkplus-full-open.svg";
import gKplusClosed from "./img/solution-gkplus-full.svg";
import gKplusEmptyOpen from "./img/solution-gkplus-empty-open.svg";
import gKplusEmptyClosed from "./img/solution-gkplus.svg";

import gAminusOpen from "./img/solution-gamin-full-open.svg";
import gAminusClosed from "./img/solution-gamin-full-closed.svg";
import gAminusEmptyOpen from "./img/solution-gamin-empty-open.svg";
import gAminusEmptyClosed from "./img/solution-gamin-empty-closed.svg";

import gAplusOpen from "./img/solution-gaplus-full-open.svg";
import gAplusClosed from "./img/solution-gaplus-full-closed.svg";
import gAplusEmptyOpen from "./img/solution-gaplus-empty-open.svg";
import gAplusEmptyClosed from "./img/solution-gaplus-empty-closed.svg";

import gLIGOpen from "./img/solution-glig-full-open.svg";
import gLIGClosed from "./img/solution-glig-full-closed.svg";
import gLIGEmptyOpen from "./img/solution-glig-empty-open.svg";
import gLIGEmptyClosed from "./img/solution-glig-empty-closed.svg";

import AntibodyEmptyClosed from "./img/solution-tube-empty.svg";
import AntibodyClosed from "./img/solution-tube.svg";
import AntibodyEmptyOpen from "./img/solution-tube-empty-open.svg";
import AntibodyOpen from "./img/solution-tube-open.svg";

import LoadingEmptyClosed from "./img/solution-tube-empty.svg";
import LoadingClosed from "./img/solution-tube.svg";
import LoadingEmptyOpen from "./img/solution-tube-empty-open.svg";
import LoadingOpen from "./img/solution-tube-open.svg";

import GreenOpen from "./img/solution-tube-lig.svg";
import GreenClosed from "./img/solution-tube-lig-closed.svg";
import GreenEmptyOpen from "./img/solution-green-empty-open.svg";
import GreenEmptyClosed from "./img/solution-green-empty.svg";

import YellowOpen from "./img/solution-yellow-open.svg";
import YellowClosed from "./img/solution-yellow.svg";
import YellowEmptyOpen from "./img/solution-yellow-empty-open.svg";
import YellowEmptyClosed from "./img/solution-yellow-empty.svg";

import PurpleOpen from "./img/solution-purple-open.svg";
import PurpleClosed from "./img/solution-purple.svg";
import PurpleEmptyOpen from "./img/solution-purple-empty-open.svg";
import PurpleEmptyClosed from "./img/solution-purple-empty.svg";

import OrangeOpen from "./img/solution-orange-open.svg";
import OrangeClosed from "./img/solution-orange.svg";
import OrangeEmptyOpen from "./img/solution-orange-empty-open.svg";
import OrangeEmptyClosed from "./img/solution-orange-empty.svg";

import BlueOpen from "./img/solution-tube-ld.svg";
import BlueClosed from "./img/solution-tube-ld-closed.svg";
import BlueEmptyOpen from "./img/solution-blue-empty-open.svg";
import BlueEmptyClosed from "./img/solution-blue-empty.svg";

import BlackOpen from "./img/solution-tube-m.svg";
import BlackClosed from "./img/solution-tube-m-closed.svg";
import BlackEmptyOpen from "./img/solution-black-empty-open.svg";
import BlackEmptyClosed from "./img/solution-black-empty.svg";

import KminOpen from "./img/tube-k_-open.svg";
import KminClosed from "./img/solution-tube-k_-closed.svg";
import KminEmptyOpen from "./img/tube-k_-open.svg";
import KminEmptyClosed from "./img/solution-tube-k_-closed.svg";

import KplusOpen from "./img/solution-tube-k-open.svg";
import KplusClosed from "./img/solution-tube-k-closed.svg";
import KplusEmptyOpen from "./img/solution-tube-k-open.svg";
import KplusEmptyClosed from "./img/solution-tube-k-closed.svg";

import AminOpen from "./img/solution-tube-a_--opened.svg";
import AminClosed from "./img/solution-tube-a_--closed.svg";
import AminEmptyOpen from "./img/solution-tube-a_--opened.svg";
import AminEmptyClosed from "./img/solution-tube-a_--closed.svg";

import AplusOpen from "./img/solution-tube-a-plus-opened.svg";
import AplusClosed from "./img/solution-tube-a-plus-closed.svg";
import AplusEmptyOpen from "./img/solution-tube-a-plus-opened.svg";
import AplusEmptyClosed from "./img/solution-tube-a-plus-closed.svg";

import CellCultureClosed from "./img/cellCulture.svg";
import CellCultureOpen from "./img/cellCultureOpen.svg";

import ProteinLadderOpen from "./img/proteinLadderOpen.svg";
import ProteinLadderClosed from "./img/proteinLadderClosed.svg";
import ProteinLadderEmptyOpen from "./img/proteinLadderEmptyOpen.svg";
import ProteinLadderEmptyClosed from "./img/proteinLadderEmptyClosed.svg";

import SDSBufferOpen from "./img/SDSBufferOpen.svg";
import SDSBufferClosed from "./img/SDSBufferClosed.svg";

const images = {
  "Wild type tubeOpen": TubeOpen,
  "Wild type tubeClosed": TubeClosed,

  "Wild type tubeOpenPink": TubeOpenPink,
  "Wild type tubeClosedPink": TubeClosedPink,
  "Wild type tubeOpenBlue": TubeOpenBlue,
  "Wild type tubeClosedBlue": TubeClosedBlue,

  "Wild type tubeEmptyOpen": TubeEmptyOpen,
  "Wild type tubeEmptyClosed": TubeEmptyClosed,

  "Edit 7 tubeOpen": TubeOpen,
  "Edit 7 tubeClosed": TubeClosed,

  "Edit 7 tubeOpenPink": TubeOpenPink,
  "Edit 7 tubeClosedPink": TubeClosedPink,
  "Edit 7 tubeOpenBlue": TubeOpenBlue,
  "Edit 7 tubeClosedBlue": TubeClosedBlue,

  "Edit 7 tubeEmptyOpen": TubeEmptyOpen,
  "Edit 7 tubeEmptyClosed": TubeEmptyClosed,


  "Edit 4 tubeOpen": TubeOpen,
  "Edit 4 tubeClosed": TubeClosed,

  "Edit 4 tubeOpenPink": TubeOpenPink,
  "Edit 4 tubeClosedPink": TubeClosedPink,
  "Edit 4 tubeOpenBlue": TubeOpenBlue,
  "Edit 4 tubeClosedBlue": TubeClosedBlue,

  "Edit 4 tubeEmptyOpen": TubeEmptyOpen,
  "Edit 4 tubeEmptyClosed": TubeEmptyClosed,

  "Pancreas tubeOpen": TubeOpen,
  "Pancreas tubeClosed": TubeClosed,

  "Pancreas tubeOpenPink": TubeOpenPink,
  "Pancreas tubeClosedPink": TubeClosedPink,
  "Pancreas tubeOpenBlue": TubeOpenBlue,
  "Pancreas tubeClosedBlue": TubeClosedBlue,

  "Pancreas tubeEmptyOpen": TubeEmptyOpen,
  "Pancreas tubeEmptyClosed": TubeEmptyClosed,

  "Wild type vesselOpen": CellCultureOpen,
  "Wild type vesselClosed": CellCultureClosed,

  "Edit 7 vesselOpen": CellCultureOpen,
  "Edit 7 vesselClosed": CellCultureClosed,

  "Edit 4 vesselOpen": CellCultureOpen,
  "Edit 4 vesselClosed": CellCultureClosed,

  "Pancreas vesselOpen": CellCultureOpen,
  "Pancreas vesselClosed": CellCultureClosed,

  "4x SDS sample bufferOpen": SDSBufferOpen,
  "4x SDS sample bufferClosed": SDSBufferClosed,

  "Dummy tubeOpen": TubeOpen,
  "Dummy tubeClosed": TubeClosed,
  "Dummy tubeEmptyOpen": TubeEmptyOpen,
  "Dummy tubeEmptyClosed": TubeEmptyClosed,

  "Protein ladderClosed": ProteinLadderClosed,
  "Protein ladderOpen": ProteinLadderOpen,
  "Protein ladderEmptyClosed": ProteinLadderClosed,
  "Protein ladderEmptyOpen": ProteinLadderOpen,

  DummyOpen: DummyOpen,
  DummyClosed: DummyClosed,
  DummyEmptyOpen: DummyEmptyOpen,
  DummyEmptyClosed: DummyEmptyClosed,

  gKminusOpen: gKminusOpen,
  gKminusClosed: gKminusClosed,
  gKminusEmptyOpen: gKminusEmptyOpen,
  gKminusEmptyClosed: gKminusEmptyClosed,

  gKplusOpen: gKplusOpen,
  gKplusClosed: gKplusClosed,
  gKplusEmptyOpen: gKplusEmptyOpen,
  gKplusEmptyClosed: gKplusEmptyClosed,

  gAminusOpen: gAminusOpen,
  gAminusClosed: gAminusClosed,
  gAminusEmptyOpen: gAminusEmptyOpen,
  gAminusEmptyClosed: gAminusEmptyClosed,

  gAplusOpen: gAplusOpen,
  gAplusClosed: gAplusClosed,
  gAplusEmptyOpen: gAplusEmptyOpen,
  gAplusEmptyClosed: gAplusEmptyClosed,

  gLIGOpen: gLIGOpen,
  gLIGClosed: gLIGClosed,
  gLIGEmptyOpen: gLIGEmptyOpen,
  gLIGEmptyClosed: gLIGEmptyClosed,

  AntibodyEmptyClosed: AntibodyEmptyClosed,
  AntibodyClosed: AntibodyClosed,
  AntibodyEmptyOpen: AntibodyEmptyOpen,
  AntibodyOpen: AntibodyOpen,

  LoadingEmptyClosed: LoadingEmptyClosed,
  LoadingClosed: LoadingClosed,
  LoadingEmptyOpen: LoadingEmptyOpen,
  LoadingOpen: LoadingOpen,

  GreenEmptyClosed: GreenEmptyClosed,
  GreenClosed: GreenClosed,
  GreenEmptyOpen: GreenEmptyOpen,
  GreenOpen: GreenOpen,

  YellowEmptyClosed: YellowEmptyClosed,
  YellowClosed: YellowClosed,
  YellowEmptyOpen: YellowEmptyOpen,
  YellowOpen: YellowOpen,

  PurpleEmptyClosed: PurpleEmptyClosed,
  PurpleClosed: PurpleClosed,
  PurpleEmptyOpen: PurpleEmptyOpen,
  PurpleOpen: PurpleOpen,

  OrangeOpen: OrangeOpen,
  OrangeClosed: OrangeClosed,
  OrangeEmptyOpen: OrangeEmptyOpen,
  OrangeEmptyClosed: OrangeEmptyClosed,

  BlueOpen: BlueOpen,
  BlueClosed: BlueClosed,
  BlueEmptyOpen: BlueEmptyOpen,
  BlueEmptyClosed: BlueEmptyClosed,

  BlackOpen: BlackOpen,
  BlackClosed: BlackClosed,
  BlackEmptyOpen: BlackEmptyOpen,
  BlackEmptyClosed: BlackEmptyClosed,

  KminOpen: KminOpen,
  KminClosed: KminClosed,
  KminEmptyOpen: KminEmptyOpen,
  KminEmptyClosed: KminEmptyClosed,

  KplusOpen: KplusOpen,
  KplusClosed: KplusClosed,
  KplusEmptyOpen: KplusEmptyOpen,
  KplusEmptyClosed: KplusEmptyClosed,

  AminOpen: AminOpen,
  AminClosed: AminClosed,
  AminEmptyOpen: AminEmptyOpen,
  AminEmptyClosed: AminEmptyClosed,

  AplusOpen: AplusOpen,
  AplusClosed: AplusClosed,
  AplusEmptyOpen: AplusEmptyOpen,
  AplusEmptyClosed: AplusEmptyClosed,

  DH2OOpen : DH2O,
  DH2OClosed : DH2OClosed,
  DH2OEmptyOpen : DH2OEmpty,
  DH2OEmptyClosed : DH2OEmptyClosed,

  APlusEmptyOpen: APlusEmpty,
  APlusEmptyClosed: APlusEmptyClosed,
  APlusOpen: APlusFull,
  APlusClosed: APlusFullClosed,

  AMinusEmptyOpen: AMinusEmpty,
  AMinusEmptyClosed: AMinusEmptyClosed,
  AMinusOpen: AMinusFull,
  AMinusClosed: AMinusFullClosed,

  KMinusEmptyOpen: KMinusEmpty,
  KMinusEmptyClosed: KMinusEmptyClosed,
  KMinusOpen: KMinusFull,
  KMinusClosed: KMinusFullClosed,

  KPlusEmptyOpen: KPlusEmpty,
  KPlusEmptyClosed: KPlusEmptyClosed,
  KPlusOpen: KPlusFull,
  KPlusClosed: KPlusFullClosed,

  paRAOpen: paRA,
  paRAClosed: paRAClosed,
  paRAEmptyOpen: paRAEmpty,
  paRAEmptyClosed: paRAEmptyClosed,

  pKanOpen: pKan,
  pKanClosed: pKanClosed,
  pKanEmptyOpen: pKanEmpty,
  pKanEmptyClosed: pKanEmptyClosed,

  RestrictionOpen: Restriction,
  RestrictionClosed: RestrictionClosed,
  RestrictionEmptyOpen: RestrictionEmpty,
  RestrictionEmptyClosed: RestrictionEmptyClosed,

  BamHIOpen: BamHI,
  BamHIClosed: BamHIClosed,
  BamHIEmptyOpen: BamHIEmpty,
  BamHIEmptyClosed: BamHIEmptyClosed,

  BalanceClosed: Balance,
  BalanceOpen: BalanceOpen,
  BalanceEmptyOpen: BalanceEmptyOpen,
  BalanceEmptyClosed: BalanceEmpty,

  "Red DyeOpen": RedDyeOpen,
  "Red DyeClosed": RedDyeClosed,
  "Red DyeEmptyOpen": RedDyeEmptyOpen,
  "Red DyeEmptyClosed": RedDyeEmptyClosed,

  S1Open: BlueDyeOpen,
  S2Open: BlueDyeOpen,
  S3Open: BlueDyeOpen,
  S1Closed: BlueDyeClosed,
  S2Closed: BlueDyeClosed,
  S3Closed: BlueDyeClosed,
  S1EmptyOpen: BlueDyeEmptyOpen,
  S2EmptyOpen: BlueDyeEmptyOpen,
  S3EmptyOpen: BlueDyeEmptyOpen,
  S1EmptyClosed: BlueDyeEmptyClosed,
  S2EmptyClosed: BlueDyeEmptyClosed,
  S3EmptyClosed: BlueDyeEmptyClosed
};

class Graphics extends Component {
  toggleOpen = () => {
    this.props.solutionOpen({
      id: this.props.id,
      open: !this.props.open
    });
  };

  getImg = () => {
    var reference = this.props.type;

    switch (reference) {
      case "pKAN-R (K-)":
        reference = "Kmin";
        break;
      case "pKAN-R (K+)":
        reference = "Kplus";
        break;
      case "pARA (A-)":
        reference = "Amin";
        break;
      case "pARA (A+)":
        reference = "Aplus";
        break;
      case "Ligated plasmids":
        reference = "Green";
        break;
      case "Loading Dye":
        reference = "Blue";
        break;
      case "Distilled water (dH20)":
        reference = "DH2O";
        break;
      case "DNA ladder (M)":
        reference = "Black";
        break;
      case "gK-":
        reference = "gKminus";
        break;
      case "gK+":
        reference = "gKplus";
        break;
      case "gA-":
        reference = "gAminus";
        break;
      case "gA+":
        reference = "gAplus";
        break;
      case "gLIG":
        reference = "gLIG";
        break;
      case "Balancing Tube":
        reference = "Dummy";
        break;
      case "2.5xB":
        reference = "Restriction";
        break;
      case "5xB":
        reference = "BamHI";
        break;
      case "LIG":
        reference = "Restriction";
        break;
      case "K":
        reference = "pKan";
        break;
      case "A":
        reference = "paRA";
        break;
      case "RE":
        reference = "BamHI";
        break;
      case "dH2O":
        reference = "DH20";
        break;
      case "A+":
        reference = "APlus";
        break;
      case "A-":
        reference = "AMinus";
        break;
      case "K+":
        reference = "KPlus";
        break;
      case "K-":
        reference = "KMinus";
        break;
      case "Balance":
        reference = "Balance";
        break;

      default:
        break;
    }

    if (this.props.volume === 0) {
      reference += "Empty";
    }
    if (this.props.open) {
      reference += "Open";
    } else {
      reference += "Closed";
    }

    if(this.props.volume > 0 && (this.props.type == 'Wild type tube' || this.props.type == 'Pancreas tube' || this.props.type == 'Edit 4 tube' || this.props.type == 'Edit 7 tube')){

      if(this.props.solution.hasOwnProperty("4x SDS sample buffer")){
        //ref += "Blue"
      } else {

        if(this.props.solution.hasOwnProperty("Protein ladder")){
          reference += "Blue"
        } else {
          reference += "Pink"
        }
      }
    }

    return images[reference];
  }

  render() {
    return (
      <div
        className="graphics"
        onClick={this.toggleOpen}
        onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.toggleOpen(e)} }>
        <img
          style={{ pointerEvents: "none" }}
          src={this.getImg()} aria-label={this.props.type+' solution'} alt={this.props.type+' solution'} aria-hidden={this.props.context==="Materials"?"true":"false"}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    type: state.solution.solutions[ownProps.id - 1].type,
    open: state.solution.solutions[ownProps.id - 1].open,
    volume: state.solution.solutions[ownProps.id - 1].volume,
    shape: state.solution.solutions[ownProps.id - 1].shape,
    solution: state.solution.solutions[ownProps.id - 1].solutions
  };
};
export default connect(
  mapStateToProps,
  {
    createSolution,
    solutionOpen,
    setSolution,
    pushInteractions
  }
)(Graphics);
