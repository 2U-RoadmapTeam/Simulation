import { findIndex } from "lodash"
import sendxAPI from '../xAPI'

const initialState = {
    pipettes: []
};

const templateState = {
    id: -1,
    type: null,
    volume: 0,
    minVol: 0,
    maxVol: 100,
    volChange: 1,
    solution: null,
    solutionAlias: null,
    tipAttached: false,
    tipUsed: false,
    controlsVisible: false,
    held: false,
    imgPath: "",
    plungerPosition: "At Rest",
    animatingOut: true,
    currentPlungerPos: 0,
    description: "",
};

export default (state = initialState, action) => {
    let currentPipette;

    if (action.payload === undefined) {
        return state;
    }

    if (action.type !== "CREATE_PIPETTE" && !action.type.includes("@redux")) {
        if(action.payload.hasOwnProperty("id")){
            currentPipette = state.pipettes[findIndex(state.pipettes, { id: action.payload.id })]
        }
    }

    switch (action.type) {

        case 'CREATE_PIPETTE':
            //Create new obj from template state
            let newObj = { ...templateState, ...action.payload.props }
            return { ...state, ...{
                    pipettes: state.pipettes.concat([newObj])
            } }

        case 'INC_VOL':
            //Increases volume for by volChange
            if ((currentPipette.volume + currentPipette.volChange) <= currentPipette.maxVol) {
                currentPipette.volume += currentPipette.volChange
                //Lodash merge current pipette into pipettes array
                state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
                return { ...state, ...{ pipettes: state.pipettes } }
            } else {
                return state
            }

        case 'DEC_VOL':

            console.log(currentPipette);

            //Decreases volume for by volChange
            if ((currentPipette.volume - currentPipette.volChange) >= currentPipette.minVol) {
                currentPipette.volume -= currentPipette.volChange
                //Lodash merge current pipette into pipettes array
                state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
                return { ...state, ...{ pipettes: state.pipettes } }
            } else {
                return state
            }

        case 'SET_PIPETTE_VOL':
            //Set the volume of the pipette
            if ((action.payload.volume >= currentPipette.minVol) && (action.payload.volume <= currentPipette.maxVol)) {

                // xAPI statement
                sendxAPI({
                  // Type of statement
                  verb: {
                    description: "assigned",
                    address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
                  },
                  // Where the action occured
                  context: currentPipette.type + " Pipette volume",
                  // Result of the action
                  result: {
                    success: true,
                    response: action.payload.volume
                  }
                })

                currentPipette.volume = action.payload.volume
                //Lodash merge current pipette into pipettes array
                state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
                return { ...state, ...{ pipettes: state.pipettes } }
            } else {
                return state
            }

        case 'SET_TIP_ATTACHED':

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "assigned",
                address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
              },
              // Where the action occured
              context: currentPipette.type + " Pipette tip attached",
              // Result of the action
              result: {
                success: true,
                response: action.payload.attached
              }
            })

            currentPipette.tipAttached = action.payload.attached
            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case 'SET_TIP_USED':
            currentPipette.tipUsed = action.payload.used
            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case 'SET_PIPETTE_SOLUTION':

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "assigned",
                address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
              },
              // Where the action occured
              context: currentPipette.type + " Pipette solution",
              // Result of the action
              result: {
                success: true,
                response: (action.payload.solutionAlias !== null) ? action.payload.solutionAlias : "Empty"
              }
            })

            currentPipette.solution = action.payload.solution
            currentPipette.solutionAlias = action.payload.solutionAlias
            currentPipette.fragments = action.payload.fragments
            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case 'SET_PIPETTE_IMG':
            currentPipette.imgPath = action.payload.imgPath
            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case 'SET_PIPETTE_ANIMATING_OUT':
            currentPipette.animatingOut = action.payload.animatingOut
            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case 'SET_PIPETTE_CONTROLS_VISIBLE':

            // Hide the controls for all the other pipettes
            state.pipettes.forEach((pipette) => {
              pipette.controlsVisible = false;
            })
            // Make the current pipettes controls visible
            currentPipette.controlsVisible = action.payload.controlsVisible

            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case 'HIDE_ALL_CONTROLS':

            // Hide the controls for all the other pipettes
            state.pipettes.forEach((pipette) => {
              pipette.controlsVisible = false;
            })

            return { ...state, ...{ pipettes: state.pipettes } }

        case 'SET_PIPETTE_PLUNGER_POSITION':

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "assigned",
                address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
              },
              // Where the action occured
              context: currentPipette.type + " Pipette plunger position",
              // Result of the action
              result: {
                success: true,
                response: action.payload.plungerPosition
              }
            })

            currentPipette.plungerPosition = action.payload.plungerPosition
            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case 'SET_PIPETTE_CURRENT_PLUNGER_POSITION':
            currentPipette.currentPlungerPos = action.payload.currentPlungerPos
            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case 'SET_HELD':

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "held",
                address: "https://w3id.org/xapi/dod-isd/verbs/held"
              },
              // Where the action occured
              context: currentPipette.type + " Pipette",
              // Result of the action
              result: {
                success: true,
                response: action.payload.held
              }
            })

            currentPipette.held = action.payload.held
            state.pipettes[findIndex(state.pipettes, { id: action.payload.id })] = currentPipette
            return { ...state, ...{ pipettes: state.pipettes } }

        case "UNDO":
            //Payload = {lastState}

            if (action.payload.lastState !== null) {
              return action.payload.lastState.pipette;
            } else {
              return state;
            }

        default:
            return state;
    }
};
