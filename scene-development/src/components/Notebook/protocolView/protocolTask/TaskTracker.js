import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findIndex, isEqual, cloneDeep } from "lodash"

import {
    focusFirstTask,
    setTaskCompleted,
    clearLastActions,
    incTempPoints,
    clearTempPoints,
    saveSnapshot,
  } from '../../../../actions';

class TaskTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        //Set first task to focused
        this.props.focusFirstTask()
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {

      if(!isEqual(prevProps.focusedTaskObj, this.props.focusedTaskObj)){

        // Only save state if we are progressing forwards
        if(prevProps.focusedTask < this.props.focusedTask || prevProps.focusedPage < this.props.focusedPage || (this.props.focusedTask === 0 && this.props.focusedPage === 0)){
          //For Undo function - save state as snapshot
          //This next line excludes the Undo reducer state
          //from state saved as a snapshot
          let {undo, ...tempState} = this.props.state;

          //console.log("tempState - saving as snap:", tempState);

          this.props.saveSnapshot({
              snapshot: cloneDeep(tempState)
          })
        }
      }

      return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }

    static getDerivedStateFromProps(props, state){

        function checkCondition(passed, rootObj, con){

          let temp

          if(con.includes(">=")){
               temp = con.split(">=")
          } else if (con.includes("<=")){
               temp = con.split("<=")
          } else if (con.includes(">")){
               temp = con.split(">")
          } else if (con.includes("<")){
               temp = con.split("<")
          } else {
               temp = con.split("=")
          }

          if (!isNaN(+temp[1])){
              temp[1] = +temp[1]
          } else if (temp[1]==="true"){
              temp[1] = true
          } else if (temp[1]==="false"){
              temp[1] = false
          }

          console.log(rootObj[temp[0]],temp[1], con);

          //check for operators
          if(con.includes(">=")){
              if (!(rootObj[temp[0]] >= temp[1])) {
                  passed = false
              }
          } else if (con.includes("<=")){
              if (!(rootObj[temp[0]] <= temp[1])) {
                  passed = false
              }
          } else if (con.includes(">")){
              if (!(rootObj[temp[0]] > temp[1])) {
                  passed = false
              }
          } else if (con.includes("<")){
              if (!(rootObj[temp[0]] < temp[1])) {
                  passed = false
              }
          } else if (con.includes("{") && con.includes("}")) {
            if (!isEqual(rootObj[temp[0]], JSON.parse(temp[1]))) {
              passed = false;
            }
          } else {
              console.log(rootObj[temp[0]],temp[1]);
              if (rootObj[temp[0]] !== temp[1]) {
                  passed = false
              }
          }
          return passed;
        }

        //Don't run if nothing in last actions
        if(Object.keys(props.lastActions).length === 0){
            return null
        }

        //console.log(props.focusedTaskObj.levels['l'+props.notebook.level].criteria);

        //run checker here, pass anything needed from props
        if(props.focusedTaskObj.levels['l'+props.notebook.level].criteria === undefined){
            //If state hasn't properly loaded yet
            return null
        }

        //Getting all criteria for current task
        const actions = props.focusedTaskObj.levels['l'+props.notebook.level].criteria.actions
        const crits = props.focusedTaskObj.levels['l'+props.notebook.level].criteria.critPaths
        const last = props.lastActions
        let rootObj = props
        let rootObjTemp = props

        //Points to track criteria completed in multi-crit tasks
        let points = props.points

        //First check any actions were fired
        let actionCheck = false
        actions.some(action => {
            //Check if any appear in lstActions
            if(last.hasOwnProperty(action)){
                actionCheck = true
               //breaks if finds some match
               return true
            }
            return false
        })
        //If crit actions are not in last actions, break
        if (!actionCheck) {
            props.clearLastActions()
            return null
        }

        //CHECKS HAPPEN HERE
        for (let i = 0; i < crits.length; i++) {
            const crit = crits[i].split("/");
            for (let j = 0; j < crit.length; j++) {
                let step = crit[j];

                console.log(step);

                try {
                    //Check if step is "conditions"
                    if (step === "conditions") {
                        step = crit[j+1]
                        //Found last condition step
                        let conditions = []
                        //Check if step has &
                        if (step.includes("&")) {
                            //Multiple crit check in this path
                            conditions = step.split("&")
                        } else if (step.includes("||")) {
                            //Multiple crit check in this path
                            conditions = step.split("||")
                        } else {
                            //Only 1 crit check
                            conditions.push(step)
                        }

                        //Now check all conditions in array
                        let passed = true

                        for(var c = 0; c < conditions.length; c++){
                          //alert(conditions[c]);
                          passed = checkCondition(passed, rootObj, conditions[c]);

                          if(passed == false && Object.keys(rootObjTemp).length > 0){
                            passed = checkCondition(true, rootObjTemp, conditions[c]);
                          }
                        }

                        if (passed) {
                            props.incTempPoints()
                            points++

                            //Check if all criteria for task are done
                            if(points>=crits.length){
                                //
                                // //For Undo function - save state as snapshot
                                // //This next line excludes the Undo reducer state
                                // //from state saved as a snapshot
                                //
                                // let {undo, ...tempState} = props.state
                                //
                                // console.log("tempState - saving as snap:", tempState);
                                //
                                // props.saveSnapshot({
                                //     snapshot: cloneDeep(tempState)
                                // })

                                props.setTaskCompleted({
                                    pageIndex: props.focusedPage,
                                    taskIndex: props.focusedTask
                                })
                                props.clearTempPoints()
                            }

                            //clearing last actions for new task
                            props.clearLastActions()
                        }
                        return null
                    }
                    //Check if step has =
                    //Do array search
                    else if (step.includes("=")) {

                        console.log(step);

                        if(step.includes("||")){

                          const temp = step.split("||");
                          const temp1 = temp[0].split("=");
                          const temp2 = temp[1].split("=");

                          let tempObj1 = {}
                          let tempObj2 = {}

                          if (!isNaN(+temp1[1])){
                              temp1[1] = +temp1[1]
                          } else if (temp1[1]==="true"){
                              temp1[1] = true
                          } else if (temp1[1]==="false"){
                              temp1[1] = false
                          }

                          if (!isNaN(+temp2[1])){
                              temp2[1] = +temp2[1]
                          } else if (temp2[1]==="true"){
                              temp2[1] = true
                          } else if (temp2[1]==="false"){
                              temp2[1] = false
                          }

                          tempObj1[temp1[0]] = temp1[1]
                          tempObj2[temp2[0]] = temp2[1]

                          //console.log(tempObj);
                          //console.log(rootObj, findIndex(rootObj, tempObj));

                          console.log(rootObj, rootObjTemp);

                          rootObj = rootObj[findIndex(rootObj, tempObj1)]
                          rootObjTemp = rootObjTemp[findIndex(rootObjTemp, tempObj2)]

                          console.log(rootObj, rootObjTemp);
                          continue;

                        } else {


                          const temp = step.split("=")
                          let tempObj = {}

                          if (!isNaN(+temp[1])){
                              temp[1] = +temp[1]
                          } else if (temp[1]==="true"){
                              temp[1] = true
                          } else if (temp[1]==="false"){
                              temp[1] = false
                          }

                          tempObj[temp[0]] = temp[1]

                          //console.log(tempObj);
                          //console.log(rootObj, findIndex(rootObj, tempObj));

                          rootObj = rootObj[findIndex(rootObj, tempObj)]
                          rootObjTemp = rootObjTemp[findIndex(rootObjTemp, tempObj)]

                          console.log(rootObj);
                          continue;

                        }

                    }
                    //If not options above -> std dir step
                    else {
                        rootObj = rootObj[step]
                        rootObjTemp = rootObjTemp[step]

                        console.log(rootObj, rootObjTemp)
                        continue
                    }
                } catch (e) {
                    //console.log("Task check failed...");
                    //console.log(e);
                    return null
                }
            }
        }

        return null
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
      //Internal Tracker Props
      lastActions: state.notebook.lastActions,
      focusedPage: state.notebook.focusedPage,
      focusedTask: state.notebook.focusedTask,
      focusedTaskObj: state.notebook.focusedTaskObj,
      points: state.notebook.tempPoints,
      critChecks: state.notebook.critChecks,

      //States to check props
      pipettes: state.pipette.pipettes,
      solutions: state.solution.solutions,
      blotPapers: state.blotPaper.blotPapers,
      tipBoxes: state.tipBox.tipBoxes,
      centrifuge: state.centrifuge,
      gelBoxes: state.gelBox.gelBoxes,
      powerSupply: state.powerSupply,
      powerSupplyLead: state.powerSupplyLead,
      gels: state.gel.gels,
      waterBath: state.waterBath,
      freezer: state.freezer,
      floatingTubeRack: state.floatingTubeRack,
      iceBucket: state.iceBucket,
      heatBlock: state.heatBlock,

      trash: state.trash,
      notebook: state.notebook,
      scene: state.scene,
      modal: state.modal,
      protocolTable: state.protocolTable,

      //For Undo function - snapshot of all state
      state: state,
    }
  }

  export default connect(mapStateToProps, {
    focusFirstTask,
    setTaskCompleted,
    clearLastActions,
    incTempPoints,
    clearTempPoints,
    saveSnapshot,
  })(TaskTracker)
