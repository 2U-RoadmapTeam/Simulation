import sendxAPI from '../xAPI'

const initialState = {
  inWaterBath: false,
  inFreezer: false,
  count: 0,
  tubes: [null,null,null,null],
  held: false,
  controlsVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TUBE_IN_WATER_BATH":
      //Payload = {inWaterBath}
      return { ...state, ...{ inWaterBath: action.payload.inWaterBath } };

    case "TUBE_IN_FREEZER":
      //Payload = {inFreezer}
      return { ...state, ...{ inFreezer: action.payload.inFreezer } };

    case "ADD_TUBE_TO_RACK":
      //Payload = {type,id}
      if (state.count > 4) {
        //Can only hold 4 tubes
        return state;
      }

      //if 3 or less, add to rack
      let tempArr = state.tubes;

      //Payload includes solution's type and id
      for(var i = 0; i < tempArr.length; i++){
        if(tempArr[i] === null){
          tempArr[i] = {
            type: action.payload.type,
            id: action.payload.id
          }
          break;
        }
      }

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "inserted",
          address: "https://w3id.org/xapi/dod-isd/verbs/inserted"
        },
        // Where the action occured
        context: "Tube into the floating tube rack",
        // Result of the action
        result: {
          success: true,
          response: action.payload.type
        }
      })

      state.count++;

      return { ...state, ...{ tubes: tempArr} };

    case "REMOVE_TUBE_FROM_RACK":
      //Payload = {}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "removed",
          address: "https://w3id.org/xapi/dod-isd/verbs/removed"
        },
        // Where the action occured
        context: "Tubes from the floating tube rack",
        // Result of the action
        result: {
          success: true,
          response: 0
        }
      })

      if(state.tubes[action.payload.index] !== null){
        state.tubes[action.payload.index] = null;
        --state.count;
      }

      return state;

    case "REMOVE_TUBES_FROM_RACK":
      //Payload = {}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "removed",
          address: "https://w3id.org/xapi/dod-isd/verbs/removed"
        },
        // Where the action occured
        context: "Tubes from the floating tube rack",
        // Result of the action
        result: {
          success: true,
          response: 0
        }
      })

      return { ...state, ...{ tubes: [], count: 0 } };

    case 'SET_FLOATING_TUBE_RACK_HELD':

        return { ...state, ...{ held: action.payload.held } }

    case 'SET_FLOATING_TUBE_RACK_CONTROLS_VISIBLE':

       return { ...state, ...{ controlsVisible: action.payload.controlsVisible} }

     case 'HIDE_ALL_CONTROLS':

       return { ...state, ...{ controlsVisible: false } }

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.floatingTubeRack;
      } else {
        return state;
      }

    default:
      return state;
  }
};
