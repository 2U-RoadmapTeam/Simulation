import { findIndex } from "lodash";

const initialState = {
  tubes: []
};

const templateState = {
  id: -1,
  type: null,
  open: false,
  description: ""
};

export default (state = initialState, action) => {
  let currentTube;

  if (action.payload === undefined) {
    return state;
  }

  if (action.type !== "CREATE_TUBE" && !action.type.includes("@redux")) {
    if (action.payload.hasOwnProperty("id")) {
      currentTube =
        state.tubes[findIndex(state.tubes, { id: action.payload.id })];
    }
  }

  switch (action.type) {
    case "CREATE_TUBE":
      //Create new obj from template state
      let newObj = { ...templateState, ...action.payload.props };

      return {
        ...state,
        ...{
          tubes: state.tubes.concat([newObj])
        }
      };

    //TODO use IDs to open/close correct boxes

    case "TUBE_OPEN":
      currentReagent.open = action.payload.open;
      //TODO Replace merge with this line
      state.tubes[
        findIndex(state.tubes, { id: action.payload.id })
      ] = currentTube;
      return { ...state, ...{ tubes: state.tubes } };

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.tube;
      } else {
        return state;
      }

    default:
      return state;
  }
};
