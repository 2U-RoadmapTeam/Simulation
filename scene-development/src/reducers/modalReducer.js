import sendxAPI from '../xAPI'

const initialState = {
  display: false,
  type: null,
  size: "sm",
  connect: -1,
  pipetteId: -1,
  gelId: -1,
  gelBoxId: -1,
  shown: null,
  data: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODAL":

      if(action.payload.type === 'PROTOCOL_READ'){
        if(state.shown === null) {
          action.payload.shown = false
        } else {
          action.payload.shown = true
        }
      } else {
        action.payload.shown = null
      }

      return { ...state, ...action.payload };

    case "SHOW_MODAL":
      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "focused",
          address: "https://w3id.org/xapi/dod-isd/verbs/focused"
        },
        // Where the action occured
        context: state.type + " modal display",
        // Result of the action
        result: {
          success: true,
          response: action.payload
        }
      });

      return { ...state, ...{ display: action.payload.display } };

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.modal;
      } else {
        return state;
      }

    default:
      return state;
  }
};
