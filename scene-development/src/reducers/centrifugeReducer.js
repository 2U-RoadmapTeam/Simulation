import sendxAPI from '../xAPI'
import { cloneDeep } from "lodash";

const initialState = {
  rpm: 13500,
  timeSet: 30,
  timeLeft: 30,
  countdownActive: false,
  open: false,
  balanced: false,
  type: "Microcentrifuge",
  slots: [
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    },
    {
      id: null,
      type: null
    }
  ],
  solutionTubes: 0
};

export default (state = initialState, action) => {
  if (action.payload === undefined) {
    return state;
  }

  switch (action.type) {
    case "SET_CENTRIFUGE_OPEN":
      //Payload = {open}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
        description: (action.payload.open)?"opened":"closed",
        address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/opened":"https://w3id.org/xapi/dod-isd/verbs/closed"
        },
        // Where the action occured
        context: "Microcentrifuge",
        // Result of the action
        result: {
        success: true,
        response: action.payload.open
        }
      })

      return { ...state, ...{ open: action.payload.open } };

    case "SET_SOLUTION_TUBES":
      //Used to eject tubes from centrifuge
      let slots = cloneDeep(state.slots);

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: (action.payload.slot.hasOwnProperty('type') && action.payload.slot.type !== null)?"inserted":"removed",
          address: (action.payload.slot.hasOwnProperty('type') && action.payload.slot.type !== null)?"https://w3id.org/xapi/dod-isd/verbs/inserted":"https://w3id.org/xapi/dod-isd/verbs/removed"
        },
        // Where the action occured
        context: (action.payload.slot.hasOwnProperty('type') && action.payload.slot.type !== null)?"Solution in the microcentrifuge":"Solution from the microcentrifuge",
        // Result of the action
        result: {
          success: true,
          response: (action.payload.slot.hasOwnProperty('type') && action.payload.slot.type !== null)?action.payload.slot.type:slots[action.payload.slotIndex].type
        }
      })

      slots[action.payload.slotIndex] = action.payload.slot;

      let count = slots.filter((slot)=> {return slot.id !== null}).length
      state.solutionTubes = count;

      return { ...state, ...{ slots: slots } };

    case "ADD_TUBE_TO_CENTRIFUGE":
      //Payload = {id, type}
      //Used to add tubes to centrifuge
      slots = cloneDeep(state.slots);
      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        if (slot.id === null) {
          slots[i].id = action.payload.id;
          slots[i].type = action.payload.type;
          state.solutionTubes++;
          break;
        } else {
          continue;
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
        context: "Solution into the microcentrifuge",
        // Result of the action
        result: {
          success: true,
          response: action.payload.type
        }
      })

      return { ...state, ...{ slots: slots } };

    case "MOVE_TUBE_IN_CENTRIFUGE":

      //Payload = {currentId, targetId}
      //Check if targetId full - do nothing
      slots = cloneDeep(state.slots);
      if (slots[action.payload.targetId-1].id !== null) {
        return state;
      }

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "moved",
          address: "https://w3id.org/xapi/dod-isd/verbs/moved"
        },
        // Where the action occured
        context: "Solution inside the microcentrifuge",
        // Result of the action
        result: {
          success: true,
          response: slots[action.payload.currentId-1].type + " to slot position " + action.payload.targetId
        }
      })

      slots[action.payload.targetId-1] = cloneDeep(
        slots[action.payload.currentId-1]
      );
      slots[action.payload.currentId-1] = {
        id: null,
        type: null
      };

      return { ...state, ...{ slots: slots } };

    case "SET_CENTRIFUGE_RPM":
      //Payload = {rpm}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "assigned",
          address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
        },
        // Where the action occured
        context: "Microcentrifuge RPM",
        // Result of the action
        result: {
          success: true,
          response: action.payload.rpm
        }
      })

      return { ...state, ...{ rpm: action.payload.rpm } }

    case "SET_CENTRIFUGE_TIME":
      //Payload = {time}
      let time = (action.payload.time>=0?action.payload.time:0)

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "assigned",
          address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
        },
        // Where the action occured
        context: "Microcentrifuge time",
        // Result of the action
        result: {
          success: true,
          response: time
        }
      })

      if(state.countdownActive){
        return { ...state, ...{ timeSet: time } }
      } else {
        return { ...state, ...{ timeSet: time, timeLeft: time, } }
      }

    case "COUNTDOWN_CENTRIFUGE_TIME":
      //Payload = {timeDiff}
      if(state.timeLeft - action.payload.timeDiff>=0){
        return { ...state, ...{ timeLeft: state.timeLeft - action.payload.timeDiff } }
      } else {
        return state
      }

    case "CENTRIFUGE_COUNTDOWN_ACTIVE":
      //Payload = {active}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "initiated",
          address: "https://w3id.org/xapi/dod-isd/verbs/initiated"
        },
        // Where the action occured
        context: "Centrifuge countdown timer",
        // Result of the action
        result: {
          success: true,
          response: action.payload.active
        }
      })

      return { ...state, ...{ countdownActive: action.payload.active } }

    case "CENTRIFUGE_BALANCED":
      //Payload = {balanced}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "balanced",
          address: "https://w3id.org/xapi/dod-isd/verbs/balanced"
        },
        // Where the action occured
        context: "Microcentrifuge solutions",
        // Result of the action
        result: {
          success: true,
          response: action.payload.balanced
        }
      })

      return { ...state, ...{ balanced: action.payload.balanced } }

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.centrifuge;
      } else {
        return state;
      }

    default:
      return state;
  }
};
