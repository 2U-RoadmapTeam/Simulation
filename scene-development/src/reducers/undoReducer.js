import { cloneDeep } from "lodash";
import sendxAPI from '../xAPI'

const initialState = {
  snapshots: {},
  attempts: 3
};

let tempSnaps;

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_SNAPSHOT":
      //Payload = {snapshot}
      tempSnaps = {};

      let dragItems = document.getElementsByClassName('draggable');
      let transformData = [];

      for(var x = 0; x < dragItems.length; x++){
        transformData.push({
          id: dragItems[x].id,
          transform: dragItems[x].style.transform
        });
      }

      //console.log(transformData);

      for(var i = 1; i <= (Object.keys(state.snapshots).length + 1); i++ ){
        //Move snapshots down 1 step and save latest as back1
        if(i === 1){
          tempSnaps['back' + i] = {...action.payload.snapshot, ...{transform: transformData}};
        } else {
          tempSnaps['back' + i] = cloneDeep(state.snapshots['back' + (i - 1)]);
        }
      }

      //console.log("New snapshot saved - tempSnaps:");
      //console.log(tempSnaps);

      return {
        ...state,
        ...{ snapshots: tempSnaps }
      };

    case "UNDO":
      //Payload = {lastState}
      //But don't need the payload here, only in other reducers

      if (state.attempts > 0 && Object.keys(state.snapshots).length > 0) {
        let tempSnaps2 = {};

        for(var y = 0; y < action.payload.lastState.transform.length; y++){
          //console.log(action.payload.lastState.transform[i].id)
          if(action.payload.lastState.transform[y].id !== ""){
            let elem = document.getElementById(action.payload.lastState.transform[y].id);

            if(elem !== null){
              elem.style.transform = action.payload.lastState.transform[y].transform;
            }
          }
        }

        for(var z = 1; z < (Object.keys(state.snapshots).length); z++ ){
          //Move snapshots down 1 step and save latest as back1
          tempSnaps2['back' + z] = cloneDeep(state.snapshots['back' + (z + 1)]);
        }

        state.snapshots = tempSnaps2;
        state.attempts = state.attempts - 1;

        // xAPI statement
        sendxAPI({
          // Type of statement
          verb: {
            description: "reset",
            address: "https://w3id.org/xapi/dod-isd/verbs/reset"
          },
          // Where the action occured
          context: "Protocol task: " + state.snapshots.back1.notebook.focusedTaskObj.levels["l"+state.snapshots.back1.notebook.level].task,
          // Result of the action
          result: {
            success: true,
            response: state.attempts + " attempts left"
          }
        })

        return state;

      } else {
        return state;
      }

    case "SET_UNDO_ATTEMPTS":
      //Payload = {attempts}

      return {
        ...state,
        ...{ attempts: action.payload.attempts }
      };

    default:
      return state;
  }
};
