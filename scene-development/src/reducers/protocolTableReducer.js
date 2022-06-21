import { cloneDeep } from "lodash";
import sendxAPI from "../xAPI";

const initialState = {
  answers: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]],
  valid: false,
  submitted: false
};

export default (state = initialState, action) => {
  if (action.payload === undefined) {
    return state;
  }

  switch (action.type) {
    case "SET_POPUP_TABLE_VALUE":
      //data = {value, row, index}
      //if row not 1 or 2, row = 3
      let ans = cloneDeep(state.answers);
      if (
        action.payload.row < 4 &&
        action.payload.row > 0 &&
        action.payload.index < 6 &&
        action.payload.index > 0
      ) {
        ans[action.payload.row - 1][action.payload.index - 1] =
          action.payload.value;
      }

      let isFull =
        ans[0].every(e => e !== "" && e !== null) &&
        ans[1].every(e => e !== "" && e !== null) &&
        ans[2].every(e => e !== "" && e !== null);

      return {
        ...state,
        ...{ answers: ans, valid: isFull }
      };

    case "SET_POPUP_TABLE_VALID":
      //data = {valid}
      return {
        ...state,
        ...{ valid: action.payload.valid }
      };

    case "SET_POPUP_TABLE_SUBMITTED":
      //data = {submitted}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "submitted",
          address: "https://w3id.org/xapi/dod-isd/verbs/submitted"
        },
        // Where the action occured
        context: "protocol micropipetting table",
        // Result of the action
        result: {
          success: true,
          response: action.payload.submitted
        }
      });


      return {
        ...state,
        ...{ submitted: action.payload.submitted }
      };

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.protocolTable;
      } else {
        return state;
      }

    default:
      return state;
  }
};
