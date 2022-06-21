import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
//import { Motion, spring } from 'react-motion';
//import Solution from "../solution/Solution";

import {
  createSolution,
  solutionOpen,
  setSolution,
  pushInteractions
} from "../../actions";

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

import DH20 from "./img/dH20-open.svg";
import DH20Closed from "./img/dH20.svg";
import DH20Empty from "./img/dH20-empty-open.svg";
import DH20EmptyClosed from "./img/dH20-empty.svg";

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

const images = {
  APlusEmpty: APlusEmpty,
  APlusEmptyClosed: APlusEmptyClosed,
  APlus: APlusFull,
  APlusClosed: APlusFullClosed,

  AMinusEmpty: AMinusEmpty,
  AMinusEmptyClosed: AMinusEmptyClosed,
  AMinus: AMinusFull,
  AMinusClosed: AMinusFullClosed,

  KMinusEmpty: KMinusEmpty,
  KMinusEmptyClosed: KMinusEmptyClosed,
  KMinus: KMinusFull,
  KMinusClosed: KMinusFullClosed,

  KPlusEmpty: KPlusEmpty,
  KPlusEmptyClosed: KPlusEmptyClosed,
  KPlus: KPlusFull,
  KPlusClosed: KPlusFullClosed,

  DH20: DH20,
  DH20Closed: DH20Closed,
  DH20Empty: DH20Empty,
  DH20EmptyClosed: DH20EmptyClosed,

  paRA: paRA,
  paRAClosed: paRAClosed,
  paRAEmpty: paRAEmpty,
  paRAEmptyClosed: paRAEmptyClosed,

  pKan: pKan,
  pKanClosed: pKanClosed,
  pKanEmpty: pKanEmpty,
  pKanEmptyClosed: pKanEmptyClosed,

  Restriction: Restriction,
  RestrictionClosed: RestrictionClosed,
  RestrictionEmpty: RestrictionEmpty,
  RestrictionEmptyClosed: RestrictionEmptyClosed,

  BamHI: BamHI,
  BamHIClosed: BamHIClosed,
  BamHIEmpty: BamHIEmpty,
  BamHIEmptyClosed: BamHIEmptyClosed,

  BalanceClosed: Balance,
  Balance: BalanceOpen,
  BalanceEmpty: BalanceEmptyOpen,
  BalanceEmptyClosed: BalanceEmpty
};

class Graphics extends Component {
  toggleOpen = () => {
    this.props.solutionOpen({
      id: this.props.id,
      open: !this.props.open
    });
  };

  getImg = () => {
    let reference = this.props.type;
    switch (reference) {
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
    if (!this.props.open) {
      reference += "Closed";
    }

    return images[reference];
  };

  render() {
    return (
      <div
        className="graphics"
        onClick={this.toggleOpen}
        onKeyDown={ (e)=>{if(e.keyCode === 13 || e.keyCode === 32) this.toggleOpen() } }
        >
        <img
          style={{ pointerEvents: "none" }}
          src={this.getImg()}
          aria-label={this.props.type + " solution"}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    type: state.solution.solutions[ownProps.id - 1].type,
    open: state.solution.solutions[ownProps.id - 1].open,
    volume: state.solution.solutions[ownProps.id - 1].volume
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
