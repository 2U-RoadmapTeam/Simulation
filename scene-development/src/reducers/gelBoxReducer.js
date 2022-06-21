import { findIndex } from "lodash";
import sendxAPI from '../xAPI'

const initialState = {
  gelBoxes: []
};

const templateState = {
  containsGel: false,
  gelOrientation: 0,
  gelIncrementation: 90,
  timer: 0,
  active: false,
  open: false,
  anodeConnected: false,
  cathodeConnected: false,
  solutions: null,
  solutionAlias: null,
  gelSolutions: null,
  gelSolutionAlias: null,
  volume: 0,
  gelVolume: 0,
  comb: false
};

export default (state = initialState, action) => {
  let currentGelBox;

  if (action.payload === undefined) {
    return state;
  }

  if (action.type !== "CREATE_GEL_BOX" && !action.type.includes("@redux")) {
    if (action.payload.hasOwnProperty("id")) {
      currentGelBox =
        state.gelBoxes[findIndex(state.gelBoxes, { id: action.payload.id })];
    }
  }

  switch (action.type) {
    case "CREATE_GEL_BOX":
      //Create new obj from template state
      let newObj = { ...templateState, ...action.payload.props };

      return {
        ...state,
        ...{
          gelBoxes: state.gelBoxes.concat([newObj])
        }
      };

    case "SET_GEL_BOX":
      //Payload = {...}
      return { ...state, ...action.payload };

    case "SET_GEL_IN_BOX":
      //Payload = {containsGel}
      currentGelBox.containsGel = action.payload.containsGel;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: (action.payload.containsGel)?"inserted":"removed",
          address: (action.payload.containsGel)?"https://w3id.org/xapi/dod-isd/verbs/inserted":"https://w3id.org/xapi/dod-isd/verbs/removed"
        },
        // Where the action occured
        context: "Gel inside gel box",
        // Result of the action
        result: {
          success: true,
          response: currentGelBox.gelIncrementation
        }
      })

      state.gelBoxes[
        findIndex(state.gelBoxes, { id: action.payload.id })
      ] = currentGelBox;
      return { ...state, ...{ gelBoxes: state.gelBoxes } };

    case "SET_BUFFER_IN_BOX":
      //Payload = {containsBuffer}
      currentGelBox.containsBuffer = action.payload.containsBuffer;

      state.gelBoxes[
        findIndex(state.gelBoxes, { id: action.payload.id })
      ] = currentGelBox;
      return { ...state, ...{ gelBoxes: state.gelBoxes } };

    case "SET_SOLUTION_IN_GEL_BOX":
      //Payload = {solutions, solutionAlias, volume}
      currentGelBox.solutions = action.payload.solutions
      currentGelBox.solutionAlias = action.payload.solutionAlias
      currentGelBox.volume += action.payload.volume

      state.gelBoxes[findIndex(state.gelBoxes, { id: action.payload.id })] = currentGelBox
      return { ...state, ...{ gelBoxes: state.gelBoxes } }

    case "SET_SOLUTION_IN_GEL":
      //Payload = {solutions, solutionAlias, volume}
      currentGelBox.gelSolutions = action.payload.gelSolutions
      currentGelBox.gelSolutionAlias = action.payload.gelSolutionAlias
      currentGelBox.gelVolume += action.payload.volume

      state.gelBoxes[findIndex(state.gelBoxes, { id: action.payload.id })] = currentGelBox
      return { ...state, ...{ gelBoxes: state.gelBoxes } }

    case "SET_GEL_ORIENTATION":
      //Payload = {gelOrientation}
      currentGelBox.gelOrientation = action.payload.gelOrientation;

      state.gelBoxes[
        findIndex(state.gelBoxes, { id: action.payload.id })
      ] = currentGelBox;
      return { ...state, ...{ gelBoxes: state.gelBoxes } };

    case "DEC_GEL_ORIENTATION":
      //Decreases orientation by increment
      if ((currentGelBox.gelOrientation - currentGelBox.gelIncrementation) >= 0) {
          currentGelBox.gelOrientation -= currentGelBox.gelIncrementation

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: "rotated",
              address: "https://w3id.org/xapi/dod-isd/verbs/rotated"
            },
            // Where the action occured
            context: "Gel inside gel box",
            // Result of the action
            result: {
              success: true,
              response: -currentGelBox.gelIncrementation
            }
          })

          //Lodash merge current gelBox into gelBoxes array
          state.gelBoxes[findIndex(state.gelBoxes, { id: action.payload.id })] = currentGelBox
          return { ...state, ...{ gelBoxes: state.gelBoxes } }
      } else if((currentGelBox.gelOrientation - currentGelBox.gelIncrementation) < 0){
          currentGelBox.gelOrientation = (360 - currentGelBox.gelIncrementation)

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: "rotated",
              address: "https://w3id.org/xapi/dod-isd/verbs/rotated"
            },
            // Where the action occured
            context: "Gel inside gel box",
            // Result of the action
            result: {
              success: true,
              response: -currentGelBox.gelIncrementation
            }
          })

          //Lodash merge current gelBox into gelBoxes array
          state.gelBoxes[findIndex(state.gelBoxes, { id: action.payload.id })] = currentGelBox
          return { ...state, ...{ gelBoxes: state.gelBoxes } }
      } else {
          return state
      }

    case "INC_GEL_ORIENTATION":
      //Increases orientation by increment
      if ((currentGelBox.gelOrientation + currentGelBox.gelIncrementation) <= 360) {
          currentGelBox.gelOrientation += currentGelBox.gelIncrementation

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: "rotated",
              address: "https://w3id.org/xapi/dod-isd/verbs/rotated"
            },
            // Where the action occured
            context: "Gel inside gel box",
            // Result of the action
            result: {
              success: true,
              response: currentGelBox.gelIncrementation
            }
          })

          //Lodash merge current gelBox into gelBoxes array
          state.gelBoxes[findIndex(state.gelBoxes, { id: action.payload.id })] = currentGelBox
          return { ...state, ...{ gelBoxes: state.gelBoxes } }
      } else if((currentGelBox.gelOrientation + currentGelBox.gelIncrementation) > 360){
          currentGelBox.gelOrientation = (0 + currentGelBox.gelIncrementation)

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: "rotated",
              address: "https://w3id.org/xapi/dod-isd/verbs/rotated"
            },
            // Where the action occured
            context: "Gel inside gel box",
            // Result of the action
            result: {
              success: true,
              response: currentGelBox.gelIncrementation
            }
          })

          //Lodash merge current gelBox into gelBoxes array
          state.gelBoxes[findIndex(state.gelBoxes, { id: action.payload.id })] = currentGelBox
          return { ...state, ...{ gelBoxes: state.gelBoxes } }
      } else {
          return state
      }

    case "SET_GEL_BOX_TIMER":
      //Payload = {timer}
      currentGelBox.timer = action.payload.timer;

      state.gelBoxes[
        findIndex(state.gelBoxes, { id: action.payload.id })
      ] = currentGelBox;
      return { ...state, ...{ gelBoxes: state.gelBoxes } };

    case "SET_GEL_BOX_ACTIVE":
      //Payload = {active}
      currentGelBox.active = action.payload.active;

      state.gelBoxes[
        findIndex(state.gelBoxes, { id: action.payload.id })
      ] = currentGelBox;
      return { ...state, ...{ gelBoxes: state.gelBoxes } };

    case "SET_GEL_BOX_OPEN":
      //Payload = {open}
      currentGelBox.open = action.payload.open;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: (action.payload.open)?"opened":"closed",
          address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/opened":"https://w3id.org/xapi/dod-isd/verbs/closed"
        },
        // Where the action occured
        context: "Gel box",
        // Result of the action
        result: {
          success: true,
          response: action.payload.open
        }
      })

      state.gelBoxes[
        findIndex(state.gelBoxes, { id: action.payload.id })
      ] = currentGelBox;
      return { ...state, ...{ gelBoxes: state.gelBoxes } };

    case "SET_GEL_BOX_ANODE_CONNECTED":
      //Payload = {anodeConnected}
      currentGelBox.anodeConnected = action.payload.anodeConnected;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: (action.payload.anodeConnected)?"connected":"disconnected",
          address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/connected":"https://w3id.org/xapi/dod-isd/verbs/disconnected"
        },
        // Where the action occured
        context: "Gel box anode",
        // Result of the action
        result: {
          success: true,
          response: action.payload.anodeConnected
        }
      })

      state.gelBoxes[
        findIndex(state.gelBoxes, { id: action.payload.id })
      ] = currentGelBox;
      return { ...state, ...{ gelBoxes: state.gelBoxes } };

    case "SET_GEL_BOX_CATHODE_CONNECTED":
      //Payload = {cathodeConnected}
      currentGelBox.cathodeConnected = action.payload.cathodeConnected;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: (action.payload.cathodeConnected)?"connected":"disconnected",
          address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/connected":"https://w3id.org/xapi/dod-isd/verbs/disconnected"
        },
        // Where the action occured
        context: "Gel box cathode",
        // Result of the action
        result: {
          success: true,
          response: action.payload.cathodeConnected
        }
      })

      state.gelBoxes[
        findIndex(state.gelBoxes, { id: action.payload.id })
      ] = currentGelBox;
      return { ...state, ...{ gelBoxes: state.gelBoxes } };

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.gelBox;
      } else {
        return state;
      }

    default:
      return state;
  }
};
