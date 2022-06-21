import sendxAPI from '../xAPI'

const initialState = {
    inIce: false,
    inRack: false,
    count: 0,
    tubes: {
      APlus: true,
      AMinus: true,
      KPlus: true,
      KMinus: true,
    }
  };

  export default (state = initialState, action) => {
    switch (action.type) {
    //   case "TUBE_IN_ICE":
    //     //Payload = {inWaterBath}
    //     return { ...state, ...{ tubeInIce: action.payload.tubeInIce } };

      case "TUBE_IN_RACK":
        //Payload = {inFreezer}
        return { ...state, ...{ tubeInRack: action.payload.tubeInRack } };

      case "SET_TUBES_IN_ICE":
        //Payload = {tubes}
        return { ...state, ...{ setTubesInIce: {...state.tubes, ...action.payload.setTubesInIce} } };

      // case "ADD_TUBE_TO_RACK":
      //   //Payload = {type,id}
      //   if (state.tubes.length > 6) {
      //     //Can only hold 4 tubes
      //     return state;
      //   }
      //   //if 3 or less, add to rack
      //   let tempArr = state.tubes;
      //   //Payload includes solution's type and id
      //   tempArr.push({
      //     type: action.payload.type,
      //     id: action.payload.id
      //   });
      //   return { ...state, ...{ tubes: tempArr, count: tempArr.length } };
      //
      // case "REMOVE_TUBES_FROM_RACK":
      //   //Payload = {}
      //   return { ...state, ...{ tubes: [], count: 0 } };

      case "UNDO":
        //Payload = {lastState}

        if (action.payload.lastState !== null) {
          return action.payload.lastState.iceBucket;
        } else {
          return state;
        }

      default:
        return state;
    }
  };
