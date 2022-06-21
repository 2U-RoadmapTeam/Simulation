import { findIndex } from "lodash"
import sendxAPI from '../xAPI'

const initialState = {
  solutions: []
};

const templateState = {
    id: -1,
    type: null,
    solutions: {},
    fragments: {},
    volume: 0,
    open: false,
    maxVol: 1000,
    minVol: 0,
    description: "",
    inScene: true,
    held: false,
    homogenized: false,
    particulate: 0,
    onIce: false,
    chilled: false,
    frozen:false,
    onRack:false,
    roomTemp:true,
    warm:false,
    controlsVisible: false,
    shape: null
}

export default (state = initialState, action) => {
  let currentSolution;

  if (action.payload === undefined) {
    return state;
  }

  if (action.type !== "CREATE_SOLUTION" && !action.type.includes("@redux")) {
    if (action.payload.hasOwnProperty("id")) {
      currentSolution =
        state.solutions[findIndex(state.solutions, { id: action.payload.id })];
    }
  }

    switch (action.type) {

        case 'CREATE_SOLUTION':
            //Create new obj from template state
            let newObj = { ...templateState, ...action.payload.props }

            return { ...state, ...{
                solutions: state.solutions.concat([newObj])
            } }

        case 'SET_SOLUTION':
            //Payload = [id, solution]
            currentSolution.type = action.payload.type
            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'SOLUTION_OPEN':

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
              description: (action.payload.open)?"opened":"closed",
              address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/opened":"https://w3id.org/xapi/dod-isd/verbs/closed"
              },
              // Where the action occured
              context: currentSolution.type + " Solution",
              // Result of the action
              result: {
              success: true,
              response: action.payload.open
              }
            })

            //Payload = [id, open]
            currentSolution.open = action.payload.open
            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'INC_SOLUTION':
              //Payload = {id, solutions[]}

              let totalVol = 0;

              for (let i = 0; i < action.payload.solutions.length; i++) {
                const solution = action.payload.solutions[i];
                let key = Object.keys(solution)[0];
                let val = solution[Object.keys(solution)[0]];

                //Check if solution exists in this tube already - if yes = add
                if (currentSolution.solutions.hasOwnProperty(key)) {
                  currentSolution.solutions[key] += val;

                  totalVol += val;
                } else {
                  currentSolution.solutions[key] = val;

                  totalVol += val;
                }
              }

              currentSolution.volume = currentSolution.volume + totalVol;
              currentSolution.fragments = {...currentSolution.fragments, ...action.payload.fragments}

              state.solutions[
                findIndex(state.solutions, { id: action.payload.id })
              ] = currentSolution;
              return { ...state, ...{ solutions: state.solutions } };


        case 'DEC_SOLUTION':
            //Decreases volume for by volChange

            console.log("SOL", action.payload, currentSolution, state.solutions);

            if ((currentSolution.volume - action.payload.amount) >= currentSolution.minVol) {
                for(var solution in currentSolution.solutions){
                  var numberOfSolutions = Object.keys(currentSolution.solutions).length
                  currentSolution.solutions[solution] -= (action.payload.amount / numberOfSolutions)
                }
                currentSolution.volume -= action.payload.amount
                //Lodash merge current pipette into solutions array
                state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
                return { ...state, ...{ solutions: state.solutions } }
            } else {
                return state
            }

        case 'SET_SOLUTION_IN_SCENE':
            //Payload = [id, inScene]
            currentSolution.inScene = action.payload.inScene
            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'SET_SOLUTION_ON_RACK':
            //Payload = [id, inScene]
            currentSolution.onRack = action.payload.onRack
            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'SET_SOLUTION_HELD':
            currentSolution.held = action.payload.held
            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'SET_SOLUTION_HOMOGENIZED':
            //payload = {id, homogenized}

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
              description: "homogenized",
              address: "https://w3id.org/xapi/dod-isd/verbs/homogenized"
              },
              // Where the action occured
              context: currentSolution.type + " Solution",
              // Result of the action
              result: {
              success: true,
              response: action.payload.homogenized
              }
            })

            currentSolution.homogenized = action.payload.homogenized
            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'SET_SOLUTION_ON_ICE':
            //Payload = [id, inScene]
            currentSolution.onIce= action.payload.onIce
            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'SET_SOLUTION_IN_FREEZER':
            //Payload = [id, inScene]
            currentSolution.inFrezeer= action.payload.inFreezer
            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'SET_SOLUTION_CONTROLS_VISIBLE':

            // Hide the controls for all the other pipettes
            state.solutions.forEach((solution) => {
              solution.controlsVisible = false;
            })
            // Make the current solutions controls visible
            currentSolution.controlsVisible = action.payload.controlsVisible

            state.solutions[findIndex(state.solutions, { id: action.payload.id })] = currentSolution
            return { ...state, ...{ solutions: state.solutions } }

        case 'HIDE_ALL_CONTROLS':

            // Hide the controls for all the other pipettes
            state.solutions.forEach((solution) => {
              solution.controlsVisible = false;
            })

            return { ...state, ...{ solutions: state.solutions } }

        case "UNDO":
            //Payload = {lastState}

            if (action.payload.lastState !== null) {
              return action.payload.lastState.solution;
            } else {
              return state;
            }

        default:
            return state;
    }
};
