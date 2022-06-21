import sendxAPI from '../xAPI'

const initialState = {
    type: 'Freezer',
    open: false,
    temp: -20,
    containsTubeRack: false
};

export default (state = initialState, action) => {
    if (action.payload === undefined) {
      return state;
    }

    switch (action.type) {
        case "CREATE_FREEZER":
            return { ...state, ...{ type: action.payload.type } };

        case "SET_FREEZER_OPEN":
            //Payload = {open}

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
              description: (action.payload.open)?"opened":"closed",
              address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/opened":"https://w3id.org/xapi/dod-isd/verbs/closed"
              },
              // Where the action occured
              context: "Freezer",
              // Result of the action
              result: {
              success: true,
              response: action.payload.open
              }
            })

            return { ...state, ...{ open: action.payload.open } };

        case "SET_FREEZER_TEMP":
            //Payload = {temp}

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "assigned",
                address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
              },
              // Where the action occured
              context: "Freezer temperature",
              // Result of the action
              result: {
                success: true,
                response: action.payload.temp
              }
            })

            return { ...state, ...{ temp: action.payload.temp } };

        case "FREEZER_CONTAINS_TUBE_RACK":
          //Payload = {containsTubeRack}

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: (action.payload.containsTubeRack)?"inserted":"removed",
              address: (action.payload.containsTubeRack)?"https://w3id.org/xapi/dod-isd/verbs/inserted":"https://w3id.org/xapi/dod-isd/verbs/removed"
            },
            // Where the action occured
            context: (action.payload.containsTubeRack)?"Floating tube rack into the freezer":"Floating tube rack from the freezer",
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
              return action.payload.lastState.freezer;
            } else {
              return state;
            }

        default:
            return state;
    }
  };
