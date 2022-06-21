import { findIndex } from "lodash"
import sendxAPI from '../xAPI'

const initialState = {
    tipBoxes: []
};

const templateState = {
    id: -1,
    type: null,
    open: false,
    description: "",
};

export default (state = initialState, action) => {
    let currentTipBox;

    if (action.payload === undefined) {
        return state;
    }

    if (action.type !== "CREATE_TIP_BOX" && !action.type.includes("@redux")) {
        if(action.payload.hasOwnProperty("id")){
        currentTipBox = state.tipBoxes[findIndex(state.tipBoxes, { id: action.payload.id })]
        }
    }

    switch (action.type) {

        case 'CREATE_TIP_BOX':
            //Create new obj from template state
            let newObj = { ...templateState, ...action.payload.props }

            return {
                ...state, ...{
                    tipBoxes: state.tipBoxes.concat([newObj])
                }
            }

        //TODO use IDs to open/close correct boxes

        case 'TIP_BOX_OPEN':

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: (action.payload.open)?"opened":"closed",
                address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/opened":"https://w3id.org/xapi/dod-isd/verbs/closed"
              },
              // Where the action occured
              context: currentTipBox.type + " TipBox",
              // Result of the action
              result: {
                success: true,
                response: action.payload.open
              }
            })

            currentTipBox.open = action.payload.open
            //TODO Replace merge with this line
            state.tipBoxes[findIndex(state.tipBoxes, { id: action.payload.id })] = currentTipBox
            return { ...state, ...{ tipBoxes: state.tipBoxes } }

        case "UNDO":
            //Payload = {lastState}

            if (action.payload.lastState !== null) {
              return action.payload.lastState.tipBox;
            } else {
              return state;
            }

        default:
            return state;
    }
};
