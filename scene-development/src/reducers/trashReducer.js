import sendxAPI from "../xAPI";

const initialState = {
  full: false,
  count: 0,
  items: [],
  type: "Trash",
  description: "",
  open: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TRASH_ITEM":
      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "trashed",
          address: "https://w3id.org/xapi/dod-isd/verbs/trashed"
        },
        // Where the action occured
        context: action.payload.type + " Pipette Tip",
        // Result of the action
        result: {
          success: true,
          response: action.payload
        }
      });

      return {
        ...state,
        ...{
          count: (state.count += 1),
          items: [...state.items, action.payload]
        }
      };

    case "TRASH_FULL":
      return { ...state, ...{ full: action.payload } };

    case "SET_TRASH_TYPE":
      return { ...state, ...{ type: action.payload.type } };

    case "SET_TRASH_OPEN":
      return { ...state, ...{ open: action.payload.open } };

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.trash;
      } else {
        return state;
      }

    default:
      return state;
  }
};
