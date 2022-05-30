
import React, { Component } from 'react'
import { Collapse } from 'react-collapse'

import SceneData from "../../../../data/scene.json";

// import { default as Pipette } from 'components/pipette/Materials'
// import { default as TipBox } from 'components/tipBox/Graphics'
// import { default as Solution} from 'components/solution/Graphics'
// import { default as BlottingPaper } from 'components/blottingPaper/Materials'
// import { default as Trash } from 'components/trash/Graphics'
// import { default as Gel } from 'components/gel/Graphics'
// import { default as GelBox } from 'components/gelBox/Graphics-Materials'
// import { default as Flask } from 'components/flask/Graphics'
// import { default as PowerSupply } from 'components/powerSupply/Graphics-Materials'
// import { default as PowerSupplyLead } from 'components/powerSupplyLead/PowerSupplyLead-Materials'
// import { default as Microcentrifuge } from 'components/microcentrifuge/Graphics-Materials'
// import { default as PipetteRack } from "components/pipetteRack/PipetteRackMaterials";
// import { default as FloatingTubeRack } from "components/floatingTubeRack/Graphics";
// import { default as WaterBath } from "components/waterBath/waterBathMaterials";
// import { default as IceBucket } from "components/iceBucket/Graphics";
// import { default as Freezer } from "components/freezer/freezerMaterials";
// import { default as HeatBlock } from 'components/heatBlock/Graphics'

import "./Materials.scss";

class Material extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      selected: this.props.type,
    };

  }

  toggleDisplay = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  componentDidUpdate(prevProps, prevState){
    if(this.state.expanded !== prevState.expanded && this.state.expanded == true){
      this.description.focus();
    } else if (this.state.expanded !== prevState.expanded && this.state.expanded == false){
      this.card.focus();
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.expanded !== prevState.expanded && this.state.expanded === true){
      this.description.focus();
    } else if (this.state.expanded !== prevState.expanded && this.state.expanded === false){
      this.card.focus();
    }
  }


  render(){
    return (
      <div aria-label={this.props.label} className="Material">
        <div
          tabIndex={0}
          className="material-card"
          ref={(card) => { this.card = card; }}
          onKeyPress={e => {
            this.toggleDisplay(e);
          }}
          onClick={this.toggleDisplay}
        >
          <div className="material-card-top" style={{pointerEvents: 'none'}} aria-hidden="true">{this.props.children}</div>
          <div className="material-card-bottom">
            <p aria-label={(this.props.ariaLabel !== null)? this.props.ariaLabel : null }>
              {this.props.label}
            </p>
          </div>
          <Collapse
            isOpened={this.state.expanded}
            fixedHeight={150}
            aria-hidden={!this.state.expanded}
            tabIndex={this.state.expanded ? null : -1}
            theme={{ collapse: "collapse", content: "collapse-content" }}
          >
            <div className="material-card-collapse">
              <p ref={(description) => { this.description = description; }} tabIndex={(this.state.expanded)? 0: -1}>{this.props.description}</p>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

class Materials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materials: []
    };
  }

    buildComponent = (data, index) => {
      //Context = Materials - this allows setting aria-hidden=true only when component is in Materials section
        switch (data.component) {
          case "Pipette":
              return (
                <Material key={index} id={data.props.id} label={data.props.type+' '+data.component} type={data.component} description={data.props.description}>
                  {/* <Pipette id={data.props.id} context="Materials"/> */}
                </Material>
              )

          case "Tip Box":
              return (
                <Material key={index} id={data.props.id} label={data.props.type+' '+data.component} type={data.component} description={data.props.description}>
                  {/* <TipBox id={data.props.id} context="Materials"/> */}
                </Material>
              )

          case "Solution":
            if (["K-", "K+", "A-", "A+", "gK-", "gK+", "gA-", "gA+", "gLIG"].includes(data.props.type)) {
              //Generate empty solution tubes
              return (
                <Material
                  key={index}
                  id={data.props.id}
                  label={data.props.type + " Tube"}
                  ariaLabel={data.props.ariaLabel + " Tube"}
                  type={data.component}
                  description={data.props.description}
                >
                  {/* <Solution
                    pos={data.position}
                    solution={data.props.solution}
                    id={data.props.id}
                  /> */}
                </Material>
              );
            } else {
              //Generate normal solutions
              let labl = data.props.label
              if(!["Restriction", "Balancing", "Distilled Water", "Culture", "Tube"].some(substring=>data.props.label.includes(substring))){
                labl += (' ' + data.component)
              }
              return (
                <Material
                  key={index}
                  id={data.props.id}
                  label={labl}
                  ariaLabel={data.props.ariaLabel}
                  type={data.component}
                  description={data.props.description}
                >
                  {/* <Solution
                    pos={data.position}
                    solution={data.props.solution}
                    id={data.props.id}
                  /> */}
                </Material>
              );
            }

          case "Blotting Paper":
              return (
                <Material key={index} label={data.props.type} type={data.component} description={data.props.description}>
                  {/* <BlottingPaper id={data.props.id} context="Materials" /> */}
                </Material>
              )

          case "Gel":
              return (
                <Material key={index} label={data.props.type} type={data.component} description={data.props.description}>
                  {/* <Gel id={data.props.id} context="Materials" materialsView={true} /> */}
                </Material>
              )

          case "Gel Box":
              return (
                <Material key={index} label={'Protein Gel Electrophoresis Box'} type={data.component} description={data.props.description}>
                  {/* <GelBox id={data.props.id} context="Materials" /> */}
                </Material>
              )

          case "Flask":
                let label = data.props.type

                if(label === "1x Sodium Borate Buffer"){
                  label = label.split("Sodium ").join("Sodium \n");
                }

                return (
                  <Material key={index} label={label} type={data.component} description={data.props.description}>
                    {/* <Flask id={data.props.id} /> */}
                  </Material>
                )

          case "Power Supply":
              return (
                <Material key={index} label={data.props.type} type={data.component} description={data.props.description}>
                  {/* <PowerSupply id={data.props.id} context="Materials" /> */}
                </Material>
              )

          case "Power Supply Lead":
              return (
                <Material key={index} label={data.props.type} type={data.component} description={data.props.description}>
                  {/* <PowerSupplyLead id={data.props.id} context="Materials" /> */}
                </Material>
              )

          case "Microcentrifuge":
              return (
                <Material key={index} label={data.props.type} type={data.component} description={data.props.description}>
                  {/* <Microcentrifuge id={data.props.id} context="Materials" /> */}
                </Material>
              )

          case "Floating Tube Rack":
            return (
              <Material
                key={index}
                id={data.props.id}
                label={data.component}
                type=""
                description={data.props.description}
              >
                {/* <FloatingTubeRack id={data.props.id} /> */}
              </Material>
            );

          case "Ice Bucket":
            return (
              <Material
                key={index}
                id={data.props.id}
                label={data.component}
                type=""
                description={data.props.description}
              >
                {/* <IceBucket id={data.props.id} /> */}
              </Material>
            );

          case "Freezer":
            return (
              <Material
                key={index}
                id={data.props.id}
                label={data.component}
                type=""
                description={data.props.description}
              >
                {/* <Freezer id={data.props.id} /> */}
              </Material>
            );

          case "Blotting Paper":
            return (
              <Material
                key={index}
                label={data.props.type}
                type={data.component}
                description={data.props.description}
              >
                {/* <BlottingPaper pos={data.position} id={data.props.id} /> */}
              </Material>
            );

          case "Trash":
            return (
              <Material
                key={index}
                label={(data.props.type === "Biohazard")? "Biohazardous Waste": "Trash"}
                type={data.component}
                description={data.props.description}
              >
                {/* <Trash
                  aria-label="Clear trash can. Used to dispose of any non-hazardous waste resulting from the experiemnt"
                  pos={data.position}
                /> */}
              </Material>
            );

          case "Heat Block":
              return (
                <Material key={index} label={data.props.type} type={data.component} description={data.props.description}>
                  {/* <HeatBlock id={data.props.id} /> */}
                </Material>
              )

          default:
            break;
        }
  };

  componentDidMount() {
    this.doCompPart(SceneData);
  }

  doCompPart = (data) => {
    let groupArr = []

    let grouping = {
      "Reagents": {
        "description": "Chemicals that can be used in this experiment",
        "components": ["Solution", "Flask"]
      },
      "Micropipetting Equipment": {
        "description": "Used to measure small volumes",
        "components": ["Pipettes", "Tip Boxes"]
      },
      "Empty Tubes": {
        "description": "Used to hold solutions",
        "components": ["Solution"]
      },
      "Electrophoresis Equipment": {
        "description": "Used to sort molecules by size and charge",
        "components": ["Gel", "Gel Boxes", "Power Supply", "Power Supply Lead"]
      },
      "Other Equipment": {
        "description": "",
        "components": ["Blotting Paper", "Microcentrifuge", "Trash", "Floating Tube Rack", "Freezer", "Water Bath", "Ice Bucket", "Heat Block"]
      }
    }

    Object.keys(grouping).forEach((key, index) => {
        let compArr = []

        grouping[key].components.forEach((component) => {

          //console.log(JSON.stringify([component, data[component]]));
          if(data.hasOwnProperty(component)){
            data[component].components.forEach((comp, index) => {
              if(key !== "Reagents" && key !== "Empty Tubes" || key == "Reagents" && comp.props.volume > 0 || key == "Empty Tubes" && comp.props.volume <= 0){
                compArr.push(this.buildComponent(comp, index));
              }
            })
          }
        });

        if(typeof compArr[0] !== 'undefined'){
          groupArr.push(
            <div aria-label={key} key={index} className="Category">
              <h3 tabIndex={0} aria-label={key} className="CategoryHeading">{key}</h3>
              <h6 tabIndex={0} style={{margin: '-8px 0 16px 0', display: (grouping[key].description !== '')?'block':'none'}}>{grouping[key].description}</h6>
              <div aria-label={key} className="Group">
                {compArr}
              </div>
            </div>
          )
        }
    })

    this.setState({
        materials: groupArr
    })
  }

  render() {
    console.log(this.state.materials);
    return <div className="Materials">{this.state.materials}</div>;
  }
}


export default Materials;
