import sendxAPI from '../xAPI'

const initialState = {
  type:null,
    tube:[],
    containsTube: false,
    count:0
  };

  export default (state = initialState, action) => {
    switch (action.type) {

      case "SET_SOLUTION_ON_VORTEX":
        //Payload = {inFreezer}
        return { ...state, ...{ inVortex: action.payload.inVortex } };

      case "CONTAINS_TUBE":
        //Payload = {containsTubeRack}
        return { ...state, ...{ containsTube: action.payload.containsTube } };

      case "REMOVE_TUBES_FROM_VORTEX":
        //Payload = {}
        return { ...state, ...{ tubes: [], count: 0 } };

      default:
        return state;
    }
  };
