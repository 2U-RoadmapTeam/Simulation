import { findIndex, cloneDeep } from "lodash"
import sendxAPI from '../'

const initialState = {
    blotPapers: []
};

const templateState = {
    id: -1,
    description: "",
    solutions: [
      {
        id: 'A',
        used: false,
        solution: null,
        prediction: 0,
        volume: 0,
        maxVol: 1000,
        minVol: 0,
        volChange: 0.5,
        description:null
      }
    ]
}

export default (state = initialState, action) => {
    let currentBlot;

    if (action.payload === undefined) {
        return state;
    }

    if (action.type !== "CREATE_BLOT_PAPER" && !action.type.includes("@redux")) {
      if(action.payload.hasOwnProperty("id")){
        currentBlot = cloneDeep(state.blotPapers[findIndex(state.blotPapers, { id: action.payload.id })])
      }
    }

    switch (action.type) {

        case 'CREATE_BLOT_PAPER':
            //Create new obj from template state
            let newObj = { ...templateState, ...action.payload.props }

            return { ...state, ...{
                blotPapers: state.blotPapers.concat([newObj])
            } }

        case 'INC_PREDICTION':
            var incIndex = action.payload.index

            //Increases volume for by volChange
            if ((currentBlot.solutions[incIndex].prediction + currentBlot.solutions[incIndex].volChange) <= currentBlot.solutions[incIndex].maxVol) {

                // xAPI statement
                sendxAPI({
                  // Type of statement
                  verb: {
                    description: "increased",
                    address: "https://w3id.org/xapi/dod-isd/verbs/increased"
                  },
                  // Where the action occured
                  context: "Blotting paper position" + currentBlot.solutions[incIndex].id + "prediction",
                  // Result of the action
                  result: {
                    success: true,
                    response: currentBlot.solutions[incIndex].volume
                  }
                })

                currentBlot.solutions[incIndex].prediction += currentBlot.solutions[incIndex].volChange
                //Lodash merge current pipette into blotPapers array
                state.blotPapers[findIndex(state.blotPapers, { id: action.payload.id })] = currentBlot
                return { ...state, ...{ blotPapers: state.blotPapers } }
            } else {
                return state
            }

        case 'DEC_PREDICTION':
            let decIndex = action.payload.index

            //Decreases volume for by volChange
            if ((currentBlot.solutions[decIndex].prediction - currentBlot.solutions[decIndex].volChange) >= currentBlot.solutions[decIndex].minVol) {

                // xAPI statement
                sendxAPI({
                  // Type of statement
                  verb: {
                    description: "decreased",
                    address: "https://w3id.org/xapi/dod-isd/verbs/decreased"
                  },
                  // Where the action occured
                  context: "Blotting paper " + currentBlot.solutions[decIndex].id + " prediction",
                  // Result of the action
                  result: {
                    success: true,
                    response: currentBlot.solutions[decIndex].volume
                  }
                })

                currentBlot.solutions[decIndex].prediction -= currentBlot.solutions[decIndex].volChange
                //Lodash merge current pipette into blotPapers array
                state.blotPapers[findIndex(state.blotPapers, { id: action.payload.id })] = currentBlot
                return { ...state, ...{ blotPapers: state.blotPapers } }
            } else {
                return state
            }

        case 'DEPOSIT_BLOT_PAPER':
            var index = action.payload.index.toLowerCase().charCodeAt(0) - 97

            //Payload = {id, solution, volume, index}
            currentBlot.solutions[index].solution = action.payload.solution
            currentBlot.solutions[index].solutionAlias = action.payload.solutionAlias
            currentBlot.solutions[index].volume += action.payload.volume
            currentBlot.solutions[index].used = true

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "deposited",
                address: "https://w3id.org/xapi/dod-isd/verbs/deposited"
              },
              // Where the action occured
              context: action.payload.volume+ "μl, at blotting paper position " + currentBlot.solutions[index].id + ".",
              // Result of the action
              result: {
                success: true,
                response: currentBlot.solutions[index].volume
              }
            })

            state.blotPapers[findIndex(state.blotPapers, { id: action.payload.id })] = currentBlot

            return { ...state, ...{ blotPapers: state.blotPapers } }

          case "UNDO":
            //Payload = {lastState}

            if (action.payload.lastState !== null) {
              return action.payload.lastState.blotPaper;
            } else {
              return state;
            }

        default:
            return state;
    }
};
