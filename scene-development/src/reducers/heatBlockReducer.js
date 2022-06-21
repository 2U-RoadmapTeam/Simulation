import { cloneDeep } from "lodash";
import sendxAPI from '../xAPI'

const initialState = {
  active: false,
  temp: 25,
  timer: 0,
  timeIncrement: 15,
  tempIncrement: 1,
  increment: 1,
  minTime: 0,
  maxTime: 6000,
  minTemp: 25,
  maxTemp: 220,
  numberOfSolutions: 0,
  solutions: [{
    id: null,
    type: null
  },{
    id: null,
    type: null
  },{
    id: null,
    type: null
  },{
    id: null,
    type: null
  },{
    id: null,
    type: null
  },{
    id: null,
    type: null
  }]
};

export default (state = initialState, action) => {
  if (action.payload === undefined) {
    return state;
  }

  switch (action.type) {

    case "SET_HEAT_BLOCK_ACTIVE":
      //Payload = {active}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "initiated",
          address: "https://w3id.org/xapi/dod-isd/verbs/initiated"
        },
        // Where the action occured
        context: "Heatblock countdown timer",
        // Result of the action
        result: {
          success: true,
          response: action.payload.active
        }
      })

      return { ...state, ...{ active: action.payload.active } };

    case "INC_HEAT_BLOCK_TIME":
      //Payload = {active}
      let inctime = state.timer

      if ((inctime + state.timeIncrement) <= state.maxTime) {
          inctime += state.timeIncrement

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: "assigned",
              address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
            },
            // Where the action occured
            context: "Heatblock time",
            // Result of the action
            result: {
              success: true,
              response: inctime
            }
          })

          return { ...state, ...{ timer: inctime } }
      } else {
          return state
      }

    case "DEC_HEAT_BLOCK_TIME":
      //Payload = {active}
      let dectime = state.timer

      if ((dectime - state.timeIncrement) >= state.minTime) {
          dectime -= state.timeIncrement

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: "assigned",
              address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
            },
            // Where the action occured
            context: "Heatblock time",
            // Result of the action
            result: {
              success: true,
              response: dectime
            }
          })

          return { ...state, ...{ timer: dectime } }
      } else {
          return state
      }

    case "COUNT_DOWN_HEAT_BLOCK_TIME":
      //Payload = {active}
      let countDownTime = state.timer

      if ((countDownTime - action.payload.interval) >= state.minTime) {
          countDownTime -= action.payload.interval
          return { ...state, ...{ timer: countDownTime } }
      } else {
          return state
      }

    case "INC_HEAT_BLOCK_TEMP":
      //Increases current for by currentIncrement
      let inctemp = state.temp

      if ((inctemp + state.tempIncrement) <= state.maxTemp) {
          inctemp += state.tempIncrement

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: "assigned",
              address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
            },
            // Where the action occured
            context: "Heatblock temp",
            // Result of the action
            result: {
              success: true,
              response: inctemp
            }
          })

          return { ...state, ...{ temp: inctemp } }
      } else {
          return state
      }

    case "DEC_HEAT_BLOCK_TEMP":
      //Increases current for by currentIncrement
      let dectemp = state.temp

      if ((dectemp - state.tempIncrement) >= state.minTemp) {
          dectemp -= state.tempIncrement

          // xAPI statement
          sendxAPI({
            // Type of statement
            verb: {
              description: "assigned",
              address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
            },
            // Where the action occured
            context: "Heatblock temp",
            // Result of the action
            result: {
              success: true,
              response: dectemp
            }
          })

          return { ...state, ...{ temp: dectemp } }
      } else {
          return state
      }

    case "RESET_HEAT_BLOCK_TIME":
      //Payload = {voltage}
      return { ...state, ...{ timer: 0 } };

    case "ADD_TUBE_TO_HEAT_BLOCK":
      //Payload = {id, type}
      let addSolutions = cloneDeep(state.solutions);
      let availableSlot = -1;

      for(var i = 0; i < state.solutions.length; i++){
        if(state.solutions[i].type == null){
          availableSlot = i;
          break;
        }
      }

      if(availableSlot !== -1){
        addSolutions[availableSlot].type = action.payload.type;
        addSolutions[availableSlot].id = action.payload.id;
        state.numberOfSolutions++
      }

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "inserted",
          address: "https://w3id.org/xapi/dod-isd/verbs/inserted"
        },
        // Where the action occured
        context: "Solution into the heatblock",
        // Result of the action
        result: {
          success: true,
          response: action.payload.type
        }
      })

      return { ...state, ...{ solutions: addSolutions } };

    case "REMOVE_TUBE_FROM_HEAT_BLOCK":
      //Payload = {id, type}
      let removeSolutions = cloneDeep(state.solutions);

      if(action.payload.index !== null && removeSolutions.hasOwnProperty(action.payload.index) && removeSolutions[action.payload.index].type !== null){

        // xAPI statement
        sendxAPI({
          // Type of statement
          verb: {
            description: "removed",
            address: "https://w3id.org/xapi/dod-isd/verbs/removed"
          },
          // Where the action occured
          context: "Solution from the heatblock",
          // Result of the action
          result: {
            success: true,
            response: removeSolutions[action.payload.index].type
          }
        })

        removeSolutions[action.payload.index].type = null;
        removeSolutions[action.payload.index].id = null;
        state.numberOfSolutions--
      }

      return { ...state, ...{ solutions: removeSolutions } };

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.heatBlock;
      } else {
        return state;
      }

    default:
      return state;
  }
};
