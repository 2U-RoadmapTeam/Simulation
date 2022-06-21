import React, { Component } from "react";
import { connect } from "react-redux";

import SceneData from "../../data/scene.json";

import Pipette from "../pipette/Pipette";
import TipBox from "../tipBox/TipBox";
import Solution from "../solution/Solution";
import BlottingPaper from "../blottingPaper/BlottingPaper";
import Trash from "../trash/Trash";
import Table from "../table/Table";
import Shelf from "../shelf/Shelf";
import PipetteRack from "../pipetteRack/PipetteRack";
import IceBucket from "../iceBucket/IceBucket";
import TubeRack from "../tubeRack/TubeRack";
import Tubes from "../tubes/Tubes";
import Freezer from "../freezer/Freezer";
import FloatingTubeRack from "../floatingTubeRack/FloatingTubeRack";
import WaterBath from "../waterBath/WaterBath";
import Microcentrifuge from "../microcentrifuge/Microcentrifuge";
import Vortex from "../vortex/Vortex";
import GelBox from '../gelBox/GelBox'
import TubeStand from '../tubeStand/TubeStand'
import PowerSupply from '../powerSupply/PowerSupply'
import PowerSupplyLead from '../powerSupplyLead/PowerSupplyLead'
import Flask from "../flask/Flask"
import Gel from "../gel/Gel"
import SmallRack from "../smallRack/SmallRack";
import Group from "../group/Group";
import HeatBlock from "../heatBlock/HeatBlock"
import GelComb from "../gelComb/gelComb"

import {
  createPipette,
  createSolution,
  createBlotPaper,
  createTipBox,
  createIceBucket,
  createFreezer,
  createFloatingTubeRack,
  createGel,
  createVortex,
  createGelBox,
  createFlask,
  createTrash,
  saveSnapshot
} from "../../actions";

import { cloneDeep } from "lodash";

class SceneBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      components: []
    };

    this.doReduxPart(SceneData);
  }

  componentDidMount() {
    this.doCompPart(SceneData);
  }

  componentDidUpdate(prevProps, prevState){

    if(prevState.components !== this.state.components){
      // Make snapshot of the scene properties
      let {undo, ...tempState} = this.props.state;

      console.log(tempState);

      this.props.saveSnapshot({
          snapshot: cloneDeep(tempState)
      })
    }
  }

  doReduxPart = data => {
    Object.keys(data).forEach(key => {
      data[key].components.forEach(comp => {
        this.setupComponentRedux(comp);
      });
    });
  };

  doCompPart = data => {
    let groupArr = [];
    let groupArr2 = [];
    let position = { left: 0, top: 0 };

    Object.keys(data).forEach((key, index) => {
      let compArr = [];
      let compArr2 = [];

      data[key].components.forEach((comp, index) => {
        if (
          data[key].components[index].hasOwnProperty("props") &&
          data[key].components[index].component == "Solution" &&
          data[key].components[index].props.shape == "tube"
        ) {
          compArr2.push(this.buildComponent(comp, index));
        } else {
          compArr.push(this.buildComponent(comp, index));
        }
      });

      if(compArr2.length > 0){
        groupArr2.push(
          <Group key={index} components={compArr2} position={{ left: 458, top: 540 }} />
        );
      }

      groupArr.push(
        <Group key={index} components={compArr} position={data[key].position} />
      );
    });

    //groupArr.splice(3, 0, groupArr2);

    this.setState({
      components: [...groupArr, ...groupArr2]
    });
  };

  // doCompPart = data => {
  //   let groupArr = [];
  //   let groupArr2 = [];
  //
  //   let position = { left: 0, top: 0 };
  //   let indexer = 0;
  //
  //   Object.keys(data).forEach((key, index) => {
  //     let compArr = [];
  //     let compArr2 = [];
  //     let compArr3 = [];
  //     let compArr4 = [];
  //
  //     console.log("compArr2 :: ", compArr2);
  //
  //     data[key].components.forEach((comp, index) => {
  //       console.log("data[key] ", data[key]);
  //
  //       if (
  //         data[key].components[index].hasOwnProperty("props") &&
  //         data[key].components[index].component == "Solution" &&
  //         data[key].components[index].props.shape == "shelf"
  //       ) {
  //         compArr2.push(this.buildComponent(comp, index));
  //       } else if (
  //         data[key].components[index].hasOwnProperty("props") &&
  //         data[key].components[index].component == "Solution" &&
  //         data[key].components[index].props.shape == "table"
  //       ) {
  //         compArr3.push(this.buildComponent(comp, index));
  //       } else if (
  //         (data[key].components[index].hasOwnProperty("props") &&
  //           data[key].components[index].component == "Flask") ||
  //         data[key].components[index].props.shape == "falcon"
  //       ) {
  //         compArr4.push(this.buildComponent(comp, index));
  //       } else {
  //         compArr.push(this.buildComponent(comp, index));
  //       }
  //     });
  //
  //     groupArr.push(
  //       <Group key={indexer} components={compArr} position={data[key].position} />
  //     );
  //     indexer++;
  //
  //     let IceBucketPos = { left: 908, top: 194 };
  //
  //     groupArr2.push(
  //       <Group key={index} components={compArr2} position={IceBucketPos} />
  //     );
  //
  //     let emptyTubes = { left: 160, top: 553 };
  //
  //     groupArr.push(
  //       <Group key={index} components={compArr2} position={emptyTubes} />
  //     );
  //
  //     let saltTubes = {left: 695, top: 555};
  //
  //     groupArr.push(
  //       <Group key={index} components={compArr3} position={saltTubes} />
  //     );
  //
  //     let shelfTubes = { left: 830, top: 227 };
  //
  //     groupArr.push(
  //       <Group key={index} components={compArr4} position={shelfTubes} />
  //     );
  //   });
  //
  //   groupArr.splice(3, 0, groupArr2);
  //
  //   this.setState({
  //     components: [...groupArr]
  //   });
  // };

  setupComponentRedux = data => {
    switch (data.component) {

      case "Gel Box":
          this.props.createGelBox({
              props: data.props
          })
          break;

      case "Blotting Paper":
          this.props.createBlotPaper({
              props: data.props
          })
          break;

      case "Flask":
          this.props.createFlask({
              props: data.props
          })
          break;

      case "Tube Stand":
          //No Redux setup needed for Tube Stand
          break;

      case "Tubes":
          // No setup needed for the empty tube stand
          break;

      case "Power Supply":
          //No Redux setup needed for Power Supply
          break;

      case "Power Supply Lead":
          //No Redux setup needed for Power Supply
          break;


      case "Pipette":
        this.props.createPipette({
          props: data.props
        });
        break;

      case "Tip Box":
        this.props.createTipBox({
          props: data.props
        });
        break;

      case "Solution":
        this.props.createSolution({
          props: data.props
        });
        break;

      case "Tip Box Shelf":
        // No redux setup for Tip Box Shelf
        break;
      case "Floating Tube Rack":
        // No redux setup currently
        break;

      case "Ice Bucket":
        break;

      case "Freezer":
        // No redux setup currently
        break;

      case "Trash":
        this.props.createTrash({
          type: data.props.type
        })
        break;

      case "Table":
        //No Redux setup needed for Table
        break;

      case "Shelf":
        //No Redux setup needed for Shelf
        break;

      case "Pipette Rack":
        //No Redux setup needed for Pipette Rack
        break;

      case "Tube Rack":
        //No Redux setup needed for Tube Rack
        break;

      // case "Small Rack":
      // No Redux setup needed for Pipette Rack
      // break;

      case "Water Bath":
        //No Redux setup needed for Trash
        break;

      case "Heat Block":
          //No Redux setup needed for Power Supply
          break;

     case "Gel Comb":
        //No Redux setup needed for Power Supply
        break;

      case "Microcentrifuge":
        //No Redux setup needed for Trash
        break;

      case "Gel":
        this.props.createGel({
          props: data.props
        });
        break;

      case "Vortex":
        this.props.createVortex({
          props: data.props
        });
        break;

      default:
        break;
    }
  };

buildComponent = (data, index) => {
  switch (data.component) {

      case "Flask":
        this.props.createFlask({
          props: data.props
        });
        break;

      case "Trash":
        //No Redux setup needed for Trash
        break;

      case "Tube Stand":
        //No Redux setup needed for Tube Stand
        break;

      case "Small Rack":
        break;

      case "Table":
        //No Redux setup needed for Table
        break;

      case "Shelf":
        //No Redux setup needed for Shelf
        break;

      case "Filter Paper Shelf":
        // No redux setup for Filter Paper Shelf
        break;

      case "Pipette Rack":
        //No Redux setup needed for Pipette Rack
        break;

      case "Tubes":
        // No setup needed for the empty tube stand
        break;

      case "Microcentrifuge":
        //No Redux setup needed for Power Supply
        break;

      case "Roller":
        // No setup needed for the Roller
        break;

      case "Power Supply":
        //No Redux setup needed for Power Supply
        break;

      case "Power Supply Lead":
        // No Redux setup needed for Power Supply
        break;

      default:
        break;
    }
  };

  buildComponent = (data, index) => {
    switch (data.component) {
      case "Flask":
        return (
          <Flask
            key={index}
            pos={data.position}
            type={data.props.type}
            id={data.props.id}
          />
        );

      case "Gel Box":
        return (
          <GelBox
            key={index}
            pos={data.position}
            type={data.props.type}
            id={data.props.id}
          />
        );

      case "Pipette":
        return (
          <Pipette
            key={index}
            pos={data.position}
            type={data.props.type}
            id={data.props.id}
          />
        );

      case "Tip Box":
          return <TipBox key={index} pos={data.position} type={data.props.type} id={data.props.id} />;

      case "Solution":
          return <Solution key={index} pos={data.position} solution={data.props.solution} id={data.props.id} />;

      case "Blotting Paper":
          return <BlottingPaper key={index} pos={data.position} id={data.props.id} />;

      case "Trash":
          return <Trash key={index} pos={data.position} id={data.props.id} />;

      case "Tube Stand":
          return <TubeStand key={index} pos={data.position} id={data.props.id} />;

      case "Table":
          return <Table key={index} pos={data.position} id={data.props.id} />;

      case "Shelf":
          return <Shelf key={index} pos={data.position} id={data.props.id} />;

      case "Tube":
        return <Tubes key={index} pos={data.position} id={data.props.id} />;

      case "Microcentrifuge":
        return (
          <Microcentrifuge key={index} pos={data.position} id={data.props.id} />
        );

      case "Pipette Rack":
          return <PipetteRack key={index} pos={data.position} id={data.props.id} />;

      case "Power Supply":
          return <PowerSupply key={index} pos={data.position} id={data.props.id} />;

      case "Power Supply Lead":
          return <PowerSupplyLead key={index} pos={data.position} id={data.props.id} />;

      case "Gel":
          return <Gel key={index} pos={data.position} id={data.props.id} />;

      case "Ice Bucket":
          return <IceBucket key={index} pos={data.position} id={data.props.id} />;

      case "Freezer":
          return <Freezer key={index} pos={data.position} id={data.props.id} />;

      case "Water Bath":
          return <WaterBath key={index} pos={data.position} />;

      case "Floating Tube Rack":
          return (
            <FloatingTubeRack
              key={index}
              pos={data.position}
              id={data.props.id}
            />
          );

      case "Vortex":
          return (
            <Vortex key={index} pos={data.position} id={data.props.id}
            />
          );

      case "Small Rack":
        return <SmallRack key={index} pos={data.position} id={data.props.id} />;

      case "Gel":
        return <Gel key={index} pos={data.position} id={data.props.id} />;

      case "Heat Block":
        return <HeatBlock key={index} pos={data.position} id={data.props.id} />;

        case "Gel Comb":
        return <GelComb key={index} pos={data.position} id={data.props.id} />;


      default:
        break;
    }
  };

  render() {
    return this.state.components;
  }
}

const mapStateToProps = state => {
  return {
    //For Undo function - snapshot of all state
    state: state,
  };
};

export default connect(mapStateToProps, {
  createGel,
  createGelBox,
  createPipette,
  createSolution,
  createBlotPaper,
  createTipBox,
  createFlask,
  createIceBucket,
  createFreezer,
  createFloatingTubeRack,
  createVortex,
  createTrash,
  saveSnapshot
}
)(SceneBuilder);
