import { cloneDeep, findIndex } from "lodash"

const initialState = {
    combs: []
};

const templateState = {
    id: -1,
    type: "",
    description: ""
    
};


export default (state = initialState, action) => {
    let currentComb;

    if (action.payload === undefined) {
        return state;
    }

    if (action.type !== "CREATE_GEL" && !action.type.includes("@redux")) {
        if(action.payload.hasOwnProperty("id")){
            currentComb = state.combs[findIndex(state.combs, { id: action.payload.id })]
        }
    }

    switch (action.type) {

        case 'CREATE_COMB':
        //Create new obj from template state
        let newObj = { ...templateState, ...action.payload.props }

        return {
            ...state, ...{
                combs: state.combs.concat([newObj])
            }
        }

        case 'SET_GEL':
            //Payload = {id, type, concentration, description}
            return { ...state, ...action.payload }

        
        case "SET_GEL_IN_SCENE":
          //Payload = {inScene}
          currentComb.inScene = action.payload.containsGel

          state.combs[findIndex(state.combs, { id: action.payload.id })] = currentComb
          return { ...state, ...{ combs: state.combs } }

        case 'SET_GEL_HELD':
            currentComb.held = action.payload.held
            state.combs[findIndex(state.combs, { id: action.payload.id })] = currentComb
            return { ...state, ...{ combs: state.combs } }

        default:
            return state;
    }
};
