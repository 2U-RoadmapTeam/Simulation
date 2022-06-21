import sendxAPI from '../xAPI'

const initialState = {
  open: false,
  temp: 25,
  time: 30,
  itemCount: 0,
  items: [],
  countdownActive: false,
  containsTubeRack: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_WATER_BATH":
      //Payload = {newItem}
      return {
        ...state,
        ...{
          count: (state.count += 1),
          items: [...state.items, ...action.payload.newItem]
        }
      };

    case "REMOVE_ITEM_FROM_WATER_BATH":
      //Payload = {removeItem}
      //pop from array
      //define removeItem
      return {
        ...state,
        ...{
          count: (state.count -= 1),
          items: [...state.items, ...action.payload.removeItem]
        }
      };

    case "WATER_BATH_OPEN":
      //Payload = {open}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
        description: (action.payload.open)?"opened":"closed",
        address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/opened":"https://w3id.org/xapi/dod-isd/verbs/closed"
        },
        // Where the action occured
        context: "Water bath",
        // Result of the action
        result: {
        success: true,
        response: action.payload.open
        }
      })

      return { ...state, ...{ open: action.payload.open } };

    case "SET_WATER_BATH_TIME":
      //Payload = {time}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "assigned",
          address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
        },
        // Where the action occured
        context: "Water bath time",
        // Result of the action
        result: {
          success: true,
          response: action.payload.time
        }
      })

      return { ...state, ...{ time: action.payload.time } };

    case "WATER_BATH_COUNT_DOWN":
      //Payload = {timeDiff}
      return {
        ...state,
        ...{ time: state.time - action.payload.timeDiff }
      };

    case "SET_WATER_BATH_TEMP":
      //Payload = {temp}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "assigned",
          address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
        },
        // Where the action occured
        context: "Water bath temperature",
        // Result of the action
        result: {
          success: true,
          response: action.payload.temp
        }
      })

      return { ...state, ...{ temp: action.payload.temp } };

    case "WATER_BATH_COUNTDOWN_ACTIVE":
      //Payload = {active}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "initiated",
          address: "https://w3id.org/xapi/dod-isd/verbs/initiated"
        },
        // Where the action occured
        context: "Water bath count down timer",
        // Result of the action
        result: {
          success: true,
          response: action.payload.active
        }
      })

      return { ...state, ...{ countdownActive: action.payload.active } };

    case "WATER_BATH_CONTAINS_TUBE_RACK":
      //Payload = {containsTubeRack}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: (action.payload.containsTubeRack)?"inserted":"removed",
          address: (action.payload.containsTubeRack)?"https://w3id.org/xapi/dod-isd/verbs/inserted":"https://w3id.org/xapi/dod-isd/verbs/removed"
        },
        // Where the action occured
        context: (action.payload.containsTubeRack)?"Floating tube rack into the water bath":"Floating tube rack from the water bath",
        // Result of the action
        result: {
          success: true,
          response: action.payload.containsTubeRack
        }
      })

      return { ...state, ...{ containsTubeRack: action.payload.containsTubeRack } };

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.waterBath;
      } else {
        return state;
      }

    default:
      return state;
  }
};
