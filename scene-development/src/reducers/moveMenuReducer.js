import sendxAPI from '../xAPI'

const initialState = {
  display: false,
  type: null,
  connect: -1
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'SET_MOVEMENU':
            return {...state, ...action.payload}

        case 'SHOW_MOVEMENU':

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "focused",
                address: "https://w3id.org/xapi/dod-isd/verbs/focused"
              },
              // Where the action occured
              context: state.type + " move-menu display",
              // Result of the action
              result: {
                success: true,
                response: action.payload
              }
            })

            return {...state, ...{ display: action.payload.display}}

        case 'HIDE_ALL_CONTROLS':

            // Hide the controls for all the other pipettes
            state.display = false;

            return { ...state, ...{ display: state.display } }

        case "UNDO":
            //Payload = {lastState}

            if (action.payload.lastState !== null) {
              return action.payload.lastState.moveMenu;
            } else {
              return state;
            }

        default:
            return state
    }
};
