import { findIndex } from "lodash"
import sendxAPI from '../xAPI'

const initialState = {
  flasks: []
};

const templateState = {
    id: -1,
    type: null,
    solutions: null,
    volume: 0,
    maxVol: 1000,
    minVol: 0,
    description: "",
    held: false,
    pour: false,
    controlsVisible: false
}

export default (state = initialState, action) => {
  let currentFlask;

  if (action.payload === undefined) {
    return state;
  }

  if (action.type !== "CREATE_FLASK" && !action.type.includes("@redux")) {
    if (action.payload.hasOwnProperty("id")) {
      currentFlask =
        state.flasks[findIndex(state.flasks, { id: action.payload.id })];
    }
  }

  switch (action.type) {
    case "CREATE_FLASK":
      //Create new obj from template state
      let newObj = { ...templateState, ...action.payload.props };

      return {
        ...state,
        ...{
          flasks: state.flasks.concat([newObj])
        }
      };

    case "SET_FLASK":
      //Payload = [id, solution]
      currentFlask.type = action.payload.type;
      state.flasks[
        findIndex(state.flasks, { id: action.payload.id })
      ] = currentFlask;
      return { ...state, ...{ flasks: state.flasks } };

    case "SET_FLASK_POUR":
      //Payload = [id, solution]
      currentFlask.pour = action.payload.pour;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "poured",
          address: "https://w3id.org/xapi/dod-isd/verbs/poured"
        },
        // Where the action occured
        context: currentFlask.type + " inside gel box",
        // Result of the action
        result: {
          success: true,
          response: action.payload.pour
        }
      });

      state.flasks[
        findIndex(state.flasks, { id: action.payload.id })
      ] = currentFlask;
      return { ...state, ...{ flasks: state.flasks } };

    case "INC_FLASK":
      //Increases volume for by volChange
      if (currentFlask.volume + action.payload.amount <= currentFlask.maxVol) {
        currentFlask.volume += action.payload.amount;
      } else {
        currentFlask.volume = currentFlask.maxVol;
      }
      //Lodash merge current pipette into solutions array
      state.flasks[
        findIndex(state.flasks, { id: action.payload.id })
      ] = currentFlask;
      return { ...state, ...{ flasks: state.flasks } };

    case "DEC_FLASK":
      //Decreases volume for by volChange
      if (currentFlask.volume + action.payload.amount >= currentFlask.minVol) {
        currentFlask.volume -= action.payload.amount;
      } else {
        currentFlask.volume = currentFlask.minVol;
      }
      //Lodash merge current pipette into solutions array
      state.flasks[
        findIndex(state.flasks, { id: action.payload.id })
      ] = currentFlask;
      return { ...state, ...{ flasks: state.flasks } };

    case "SET_FLASK_HELD":
      currentFlask.held = action.payload.held;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "held",
          address: "https://w3id.org/xapi/dod-isd/verbs/held"
        },
        // Where the action occured
        context: currentFlask.type,
        // Result of the action
        result: {
          success: true,
          response: action.payload.held
        }
      });

      state.flasks[
        findIndex(state.flasks, { id: action.payload.id })
      ] = currentFlask;
      return { ...state, ...{ flasks: state.flasks } };

      case 'SET_FLASK_CONTROLS_VISIBLE':

        // Hide the controls for all the other pipettes
        state.flasks.forEach((flask) => {
          flask.controlsVisible = false;
        })
        // Make the current flasks controls visible
        currentFlask.controlsVisible = action.payload.controlsVisible

        state.flasks[findIndex(state.flasks, { id: action.payload.id })] = currentFlask
        return { ...state, ...{ flasks: state.flasks } }

    case 'HIDE_ALL_CONTROLS':

        // Hide the controls for all the other pipettes
        state.flasks.forEach((flask) => {
          flask.controlsVisible = false;
        })

        return { ...state, ...{ flasks: state.flasks } }


    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.flask;
      } else {
        return state;
      }

    default:
      return state;
  }
};
