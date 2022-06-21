import { findIndex } from "lodash"

const initialState = {
  positiveLead: {
    x1: -35,
    y1: 128,
    x2: -12,
    y2: 150
  },
  negativeLead: {
    x1: 12,
    y1: 150,
    x2: 35,
    y2: 128
  },
  positiveLeads: {
    '1': false,
    '2': false
  },
  negativeLeads: {
    '1': false,
    '2': false
  },
  leads: [
    {
      held: false,
      controlsVisibile: false
    },
    {
      held: false,
      controlsVisibile: false
    },
    {
      held: false,
      controlsVisibile: false
    },
    {
      held: false,
      controlsVisibile: false
    }
  ]
}

export default (state = initialState, action) => {
  let currentLead;

  if (action.payload === undefined) {
    return state;
  }

  if (!action.type.includes("@redux")) {
      if(action.payload.hasOwnProperty("id")){
        currentLead = state.leads[action.payload.id]
      }
  }

  switch (action.type) {
    case "SET_POSITIVE_POWER_SUPPLY_LEAD_POSITION":
      //Payload = {positiveLead}
      return { ...state, ...{ positiveLead: action.payload.positiveLead } };

    case "SET_NEGATIVE_POWER_SUPPLY_LEAD_POSITION":
      //Payload = {negativeLead}
      return { ...state, ...{ negativeLead: action.payload.negativeLead } };

    case "SET_POSITIVE_POWER_SUPPLY_LEAD_CONNECTION":
      //Payload = {negativeLead}
      let positiveLeads = state.positiveLeads
      positiveLeads[action.payload.index] = action.payload.leadConnected

      return { ...state, ...{ positiveLeads: positiveLeads } };

    case "SET_NEGATIVE_POWER_SUPPLY_LEAD_CONNECTION":
      //Payload = {negativeLead}
      let negativeLeads = state.negativeLeads
      negativeLeads[action.payload.index] = action.payload.leadConnected

      return { ...state, ...{ negativeLeads: negativeLeads } };

    case 'SET_POWER_SUPPLY_LEAD_HELD':
        currentLead.held = action.payload.held
        state.leads[findIndex(state.leads, { id: action.payload.id })] = currentLead
        return { ...state, ...{ leads: state.leads } }

    case 'SET_POWER_SUPPLY_LEAD_CONTROLS_VISIBLE':

        // Hide the controls for all the other pipettes
        state.leads.forEach((lead) => {
          lead.controlsVisible = false;
        })

        // Make the current solutions controls visible
        currentLead.controlsVisible = action.payload.controlsVisible

        state.leads[findIndex(state.leads, { id: action.payload.id })] = currentLead
        return { ...state, ...{ leads: state.leads } }

    case 'HIDE_ALL_CONTROLS':

        // Hide the controls for all the other pipettes
        state.leads.forEach((lead) => {
          lead.controlsVisible = false;
        })

        return { ...state, ...{ leads: state.leads } }

    case "UNDO":
      //Payload = {lastState}

      if (action.payload.lastState !== null) {
        return action.payload.lastState.powerSupplyLead;
      } else {
        return state;
      }

    default:
      return state;
  }
}
