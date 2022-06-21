import sendxAPI from '../xAPI'

const initialState = {
  anodeConnected: false,
  cathodeConnected: false,
  power: false,
  active: false,
  voltage: 0,
  current: 0.7,
  watts: 0,
  timer: 0,
  increment: 10,
  voltageIncrement: 10,
  currentIncrement: 0.1,
  timeIncrement: 30,
  minTime: 0,
  maxTime: 6000,
  minVoltage: 0,
  maxVoltage: 300,
  minWatt: 0,
  maxWatt: 300,
  minCurrent: 0,
  maxCurrent: 10,

};

export default (state = initialState, action) => {
  if (action.payload === undefined) {
    return state;
  }

  switch (action.type) {
    case "SET_POWER_SUPPLY_ANODE_CONNECTED":
      //Payload = {anodeConnected}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: (action.payload.anodeConnected)?"connected":"disconnected",
          address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/connected":"https://w3id.org/xapi/dod-isd/verbs/disconnected"
        },
        // Where the action occured
        context: "Power supply anode",
        // Result of the action
        result: {
          success: true,
          response: action.payload.anodeConnected
        }
      })

      return { ...state, ...{ anodeConnected: action.payload.anodeConnected } };

    case "SET_POWER_SUPPLY_CATHODE_CONNECTED":
      //Payload = {cathodeConnected}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: (action.payload.cathodeConnected)?"connected":"disconnected",
          address: (action.payload.open)?"https://w3id.org/xapi/dod-isd/verbs/connected":"https://w3id.org/xapi/dod-isd/verbs/disconnected"
        },
        // Where the action occured
        context: "Gel box cathode",
        // Result of the action
        result: {
          success: true,
          response: action.payload.cathodeConnected
        }
      })
      return { ...state, ...{ cathodeConnected: action.payload.cathodeConnected } };

    case "SET_POWER_SUPPLY_ACTIVE":
      //Payload = {active}

      // xAPI statement
      sendxAPI({
       // Type of statement
       verb: {
         description: "initiated",
         address: "https://w3id.org/xapi/dod-isd/verbs/initiated"
       },
       // Where the action occured
       context: "Power supply timer count down",
       // Result of the action
       result: {
         success: true,
         response: action.payload.active
       }
      })

      return { ...state, ...{ active: action.payload.active } };

    case "INC_POWER_SUPPLY_TIME":
      //Payload = {active}
      let inctime = state.timer

      if ((inctime + state.timeIncrement) <= state.maxTime) {

          // xAPI statement
          sendxAPI({
           // Type of statement
           verb: {
             description: "increased",
             address: "https://w3id.org/xapi/dod-isd/verbs/increased"
           },
           // Where the action occured
           context: "Power supply timer",
           // Result of the action
           result: {
             success: true,
             response: (inctime + state.timeIncrement)
           }
          })

          inctime += state.timeIncrement
          return { ...state, ...{ timer: inctime } }
      } else {
          return state
      }

    case "DEC_POWER_SUPPLY_TIME":
      //Payload = {active}
      let dectime = state.timer

      if ((dectime - state.timeIncrement) >= state.minTime) {

          // xAPI statement
          sendxAPI({
           // Type of statement
           verb: {
             description: "decreased",
             address: "https://w3id.org/xapi/dod-isd/verbs/decreased"
           },
           // Where the action occured
           context: "Power supply timer",
           // Result of the action
           result: {
             success: true,
             response: (dectime - state.timeIncrement)
           }
          })

          dectime -= state.timeIncrement
          return { ...state, ...{ timer: dectime } }
      } else {
          return state
      }

    case "COUNT_DOWN_POWER_SUPPLY_TIME":
      //Payload = {active}
      let countDownTime = state.timer

      if ((countDownTime - state.increment) >= state.minTime) {
          countDownTime -= state.increment
          return { ...state, ...{ timer: countDownTime } }
      } else {
          return state
      }

    case "INC_POWER_SUPPLY_AMP":
      //Increases current for by currentIncrement
      let inccurrent = state.current

      if ((inccurrent + state.currentIncrement) <= state.maxCurrent) {

          // xAPI statement
          sendxAPI({
           // Type of statement
           verb: {
             description: "increased",
             address: "https://w3id.org/xapi/dod-isd/verbs/increased"
           },
           // Where the action occured
           context: "Power supply amps",
           // Result of the action
           result: {
             success: true,
             response: (inccurrent + state.currentIncrement)
           }
          })

          inccurrent += state.currentIncrement
          return { ...state, ...{ current: inccurrent, watts: (inccurrent * state.voltage) } }
      } else {
          return state
      }

    case "DEC_POWER_SUPPLY_AMP":
      //Increases current for by currentIncrement
      let deccurrent = state.current

      if ((deccurrent - state.currentIncrement) >= state.minCurrent) {

          // xAPI statement
          sendxAPI({
           // Type of statement
           verb: {
             description: "decreased",
             address: "https://w3id.org/xapi/dod-isd/verbs/decreased"
           },
           // Where the action occured
           context: "Power supply amps",
           // Result of the action
           result: {
             success: true,
             response: (deccurrent - state.currentIncrement)
           }
          })

          deccurrent -= state.currentIncrement
          return { ...state, ...{ current: deccurrent, watts: (deccurrent * state.voltage) } }
      } else {
          return state
      }

    case "INC_POWER_SUPPLY_WATT":
      //Increases current for by increment
      let incwatts = state.watts

      if ((incwatts + state.increment) <= state.maxWatt) {

          // xAPI statement
          sendxAPI({
           // Type of statement
           verb: {
             description: "decreased",
             address: "https://w3id.org/xapi/dod-isd/verbs/increased"
           },
           // Where the action occured
           context: "Power supply watts",
           // Result of the action
           result: {
             success: true,
             response: (incwatts - state.increment)
           }
          })

          incwatts += state.increment
          return { ...state, ...{ watts: incwatts, voltage: (incwatts / state.current)} }
      } else {
          return state
      }

    case "DEC_POWER_SUPPLY_WATT":
      //Increases current for by increment
      let decwatts = state.watts

      if ((decwatts - state.increment) >= state.minWatt) {

          // xAPI statement
          sendxAPI({
           // Type of statement
           verb: {
             description: "decreased",
             address: "https://w3id.org/xapi/dod-isd/verbs/decreased"
           },
           // Where the action occured
           context: "Power supply watts",
           // Result of the action
           result: {
             success: true,
             response: (decwatts - state.increment)
           }
          })

          decwatts -= state.increment
          return { ...state, ...{ watts: decwatts, voltage: (decwatts / state.current) } }
      } else {
          return state
      }

      case "INC_POWER_SUPPLY_VOLTAGE":
      //Increases current for by voltageIncrement
      let incvoltage = state.voltage

      if ((incvoltage + state.voltageIncrement) <= state.maxVoltage) {

          // xAPI statement
          sendxAPI({
           // Type of statement
           verb: {
             description: "increased",
             address: "https://w3id.org/xapi/dod-isd/verbs/increased"
           },
           // Where the action occured
           context: "Power supply voltage",
           // Result of the action
           result: {
             success: true,
             response: (incvoltage + state.voltageIncrement)
           }
          })

          incvoltage += state.voltageIncrement
          return { ...state, ...{ voltage: incvoltage, watts: (incvoltage * state.current) } }
      } else {
          return state
      }

    case "DEC_POWER_SUPPLY_VOLTAGE":
      //Increases current for by voltageIncrement
      let decvoltage = state.voltage

      if ((decvoltage - state.voltageIncrement) >= state.minVoltage) {

          // xAPI statement
          sendxAPI({
           // Type of statement
           verb: {
             description: "decreased",
             address: "https://w3id.org/xapi/dod-isd/verbs/decreased"
           },
           // Where the action occured
           context: "Power supply voltage",
           // Result of the action
           result: {
             success: true,
             response: (decvoltage - state.voltageIncrement)
           }
          })

          decvoltage -= state.voltageIncrement
          return { ...state, ...{ voltage: decvoltage, watts: (decvoltage * state.current) } }
      } else {
          return state
      }

    case "SET_POWER_SUPPLY_POWER":
      //Payload = {active}

      // xAPI statement
      sendxAPI({
       // Type of statement
       verb: {
         description: (action.payload.power)?"switched on":"switched off",
         address: (action.payload.power)?"https://w3id.org/xapi/dod-isd/verbs/on":"https://w3id.org/xapi/dod-isd/verbs/off"
       },
       // Where the action occured
       context: "Power supply power",
       // Result of the action
       result: {
         success: true,
         response: action.payload.power
       }
      })

      return { ...state, ...{ power: action.payload.power } };

    case "RESET_POWER_SUPPLY_TIME":
      //Payload = {voltage}
      return { ...state, ...{ timer: 0 } };

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.powerSupply;
      } else {
        return state;
      }

    default:
      return state;
  }
};
