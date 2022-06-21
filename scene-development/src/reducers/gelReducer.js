import { findIndex, cloneDeep } from "lodash"
import sendxAPI from '../xAPI'

const initialState = {
  gels: []
};

const templateState = {
  id: -1,
  type: "",

  description: "",
  held: false,
  onShelf: true,
  containsTransferBuffer: false,
  inScene: true,
  concentration: 0,
  lanes:{
        lane1: {
            volume: 0,
            solutions: [],
            empty: true,
            particulate: 0
        },
        lane2: {
            volume: 0,
            solutions: [],
            empty: true,
            particulate: 0
        },
        lane3: {
            volume: 0,
            solutions: [],
            empty: true,
            particulate: 0
        },
        lane4: {
            volume: 0,
            solutions: [],
            empty: true,
            particulate: 0
        },
        lane5: {
            volume: 0,
            solutions: [],
            empty: true,
            particulate: 0
        }
    },
  laneImgConfig: "GelBufferEmpty",
  prediction: {
      lane1: 0,
      lane2: 0,
      lane3: 0,
      lane4: 0,
      lane5: 0,
    },
  activeLane: 0,
  comb: false,
  predictions46: {
    dropDownChoice: "",
    dropDownChoiceId: "",
    lanesVisible: {
      lane1: true,
      lane2: true,
      lane3: true,
      lane4: true,
      lane5: true,
      lane6: true
    },
    lane1: [
      { label: "10000 bp", height: 15 },
      { label: "8000 bp", height: 56 },
      { label: "6000 bp", height: 92 },
      { label: "5000 bp", height: 124 },
      { label: "4000 bp", height: 156 },
      { label: "3000 bp", height: 204 },
      { label: "2000 bp", height: 272 },
      { label: "1500 bp", height: 306 },
      { label: "1000 bp", height: 384 },
      { label: "500 bp", height: 472 }
    ],
    lane2: [
      { label: "Multimer", height: 30 },
      { label: "Nicked", height: 60 },
      { label: "Supercoiled", height: 90 }
    ],
    lane3: [{ label: "4705 bp", height: 30 }, { label: "807 bp", height: 60 }],
    lane4: [
      { label: "Multimer", height: 30 },
      { label: "Nicked", height: 60 },
      { label: "Supercoiled", height: 90 }
    ],
    lane5: [{ label: "4495 bp", height: 30 }, { label: "377 bp", height: 60 }],
    lane6: [
      { label: "9410 bp", height: 30 },
      { label: "9200 bp", height: 60 },
      { label: "8990 bp", height: 90 },
      { label: "5512 bp", height: 120 },
      { label: "5302 bp", height: 150 },
      { label: "5082 bp", height: 180 },
      { label: "4872 bp", height: 210 },
      { label: "1614 bp", height: 240 },
      { label: "1184 bp", height: 270 },
      { label: "754 bp", height: 300 }
    ]
  },
  results: {
    lane1: {
      180: 0,
      140: 0,
      100: 0,
      75: 0,
      60: 0,
      45: 0,
      35: 0,
      25: 0,
      15: 0,
      10: 0,
      SDS: 0
    },
    lane2: {
      180: 0,
      140: 0,
      100: 0,
      75: 0,
      60: 0,
      45: 0,
      35: 0,
      25: 0,
      15: 0,
      10: 0,
      SDS: 0
    },
    lane3: {
      180: 0,
      140: 0,
      100: 0,
      75: 0,
      60: 0,
      45: 0,
      35: 0,
      25: 0,
      15: 0,
      10: 0,
      SDS: 0
    },
    lane4: {
      180: 0,
      140: 0,
      100: 0,
      75: 0,
      60: 0,
      45: 0,
      35: 0,
      25: 0,
      15: 0,
      10: 0,
      SDS: 0
    },
    lane5: {
      180: 0,
      140: 0,
      100: 0,
      75: 0,
      60: 0,
      45: 0,
      35: 0,
      25: 0,
      15: 0,
      10: 0,
      SDS: 0
    }
  },

  10: 0.0003398326607,
  15: 0.0004005170644,
  25: 0.0004612014681,
  35: 0.0005218858718,
  45: 0.0006068440369,
  60: 0.000788897248,
  75: 0.0009709504591,
  100: 0.001092319266,
  140: 0.001244030276,
  180: 0.001365399083,
  SDS: 0.00146,

  10000: 0.00004807692308,
  8000: 0.000179487,
  6000: 0.000294872,
  5000: 0.000397436,
  4000: 0.0005,
  3000: 0.000653846,
  2000: 0.000871795,
  1500: 0.000980769,
  1000: 0.001230769,
  500: 0.001512821,

  9410: 0.000035,
  9200: 0.000055,
  8990: 0.000075,
  5512: 0.000095,
  5302: 0.0000115,
  5082: 0.00008907692308,
  4705: 0.01508028,
  1614: 0.016080128,
  1184: 0.017000564,
  754: 0.018002564,
  4495: 0.0004583333333,
  377: 0.001602564103,
  Multimer: 0.000144231,
  Nicked: 0.000362179,
  Supercoiled: 0.000461538,
  4705: 0.000432692,
  807: 0.001342949,

  activeLane: 0
};

export default (state = initialState, action) => {
  let currentGel;

  if (action.payload === undefined) {
    return state;
  }

  if (action.type !== "CREATE_GEL" && !action.type.includes("@redux")) {
    if (action.payload.hasOwnProperty("id")) {
      currentGel = state.gels[findIndex(state.gels, { id: action.payload.id })];
    }
  }

  switch (action.type) {
    case "CREATE_GEL":
      //Create new obj from template state
      let newObj = { ...templateState, ...action.payload.props };

      return {
        ...state,
        ...{
          gels: state.gels.concat([newObj])
        }
      };

    case "MAKE_GEL_IMG_CONFIG":
      //Payload = {id}
      let l1 =
        state.gels[findIndex(state.gels, { id: action.payload.id })].lanes.lane1
          .empty;
      let l2 =
        state.gels[findIndex(state.gels, { id: action.payload.id })].lanes.lane2
          .empty;
      let l3 =
        state.gels[findIndex(state.gels, { id: action.payload.id })].lanes.lane3
          .empty;
      let l4 =
        state.gels[findIndex(state.gels, { id: action.payload.id })].lanes.lane4
          .empty;
      let l5 =
        state.gels[findIndex(state.gels, { id: action.payload.id })].lanes.lane5
          .empty;
      let gelConfigStr = "";

      if (l1 && l2 && l3 && l4 && l5) {
        gelConfigStr = "Empty";
      } else {
        gelConfigStr +=
          (!l1 ? "1" : "") +
          (!l2 ? "2" : "") +
          (!l3 ? "3" : "") +
          (!l4 ? "4" : "") +
          (!l5 ? "5" : "");
      }

      currentGel.laneImgConfig = "GelBuffer" + gelConfigStr;
      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "SET_GEL_IN_SCENE":
      //Payload = {inScene}
      currentGel.inScene = action.payload.containsGel;

      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "SET_GEL_ON_SHELF":
      //Payload = {onShelf}
      currentGel.onShelf = action.payload.onShelf;

      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "SET_GEL":
      //Payload = {id, type, concentration, description}
      return { ...state, ...action.payload };

    case "SET_GEL_LANE":
      //Payload = {id, laneNumber, laneData}
      currentGel.lanes["lane" + action.payload.laneNumber] =
        action.payload.laneData;

      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "SET_GEL_HELD":
      currentGel.held = action.payload.held;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "held",
          address: "https://w3id.org/xapi/dod-isd/verbs/held"
        },
        // Where the action occured
        context: currentGel.type,
        // Result of the action
        result: {
          success: true,
          response: action.payload.held
        }
      });

      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "SET_GEL_ACTIVE_LANE":
      currentGel.activeLane = parseInt(action.payload.activeLane);
      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "SET_GEL_PREDICTION":
      currentGel.prediction = action.payload.prediction;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "predicted",
          address: "https://w3id.org/xapi/dod-isd/verbs/predicted"
        },
        // Where the action occured
        context: currentGel.type + "lane banding",
        // Result of the action
        result: {
          success: true,
          response: true
        }
      });

      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "SET_GEL_RESULT":
      //data includes interval number
      // This runs for every second set on the power

      if (currentGel.hasOwnProperty("lanes")) {
        for (var lane in currentGel.lanes) {
          for (var fragment in currentGel.lanes[lane].fragments) {
            let frag = fragment.replace(/\s/g, "");

            console.log(frag, state.gels[0][frag]);

            if (typeof state.gels[0][frag] !== "undefined") {
              currentGel.results[lane][frag] +=
                state.gels[0][frag] *
                (action.payload.voltage * 0.84) *
                action.payload.interval;
            }
          }
        }
      }

      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "REMOVE_GEL_COMB":
      //Payload = {inScene}
      currentGel.comb = action.payload.comb

      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel
      return { ...state, ...{ gels: state.gels } }

    case "SET_PREDICTION_BAND_HEIGHT":
      //data = {id, lane, label, height}
      //height = {0 <= h <= 500}

      let tempI = findIndex(
        currentGel.predictions46["lane" + action.payload.lane],
        { label: action.payload.label }
      );

      let height = action.payload.height;

      if (height < 0) {
        height = 0;
      } else if (height > 500) {
        height = 500;
      }

      currentGel.predictions46["lane" + action.payload.lane][
        tempI
      ].height = height;

      let newState = cloneDeep(state);
      newState.gels[
        findIndex(state.gels, { id: action.payload.id })
      ] = cloneDeep(currentGel);

      return newState;

    case "SET_PREDICTION_LANE_VISIBLE":
      //data = {id, lane, visible}

      currentGel.predictions46.lanesVisible["lane" + action.payload.lane] =
        action.payload.visible;

      let s = cloneDeep(state);
      s.gels[findIndex(state.gels, { id: action.payload.id })] = cloneDeep(
        currentGel
      );

      return s;

    case "SET_DROPDOWN_PREDICTION":
      //data = {id, choice}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "chose",
          address: "https://w3id.org/xapi/dod-isd/verbs/chose"
        },
        // Where the action occured
        context: "Plasmid prediction",
        // Result of the action
        result: {
          success: true,
          response: action.payload.choice
        }
      });

      currentGel.predictions46.dropDownChoice = action.payload.choice;
      currentGel.predictions46.dropDownChoiceId = action.payload.choiceId;

      let newS = cloneDeep(state);
      newS.gels[findIndex(state.gels, { id: action.payload.id })] = cloneDeep(
        currentGel
      );

      return newS;

    case "SET_PREDICTION_ALL_HEIGHTS":
      //data = {id, choice}

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "changed",
          address: "https://w3id.org/xapi/dod-isd/verbs/changed"
        },
        // Where the action occured
        context: currentGel.type + " lane prediction",
        // Result of the action
        result: {
          success: true,
          response: true
        }
      });

      let newSt = cloneDeep(state);

      let hs = action.payload.heights;

      for (let i = 1; i < 7; i++) {
        for (let j = 0; j < hs["lane" + i].length; j++) {
          newSt.gels[0].predictions46["lane" + i][j].height = hs["lane" + i][j];
        }
      }

      return newSt;

    case "SET_GEL_CONTROLS_VISIBLE":
      // Hide the controls for all the other pipettes
      state.gels.forEach(gel => {
        gel.controlsVisible = false;
      });
      // Make the current gels controls visible
      currentGel.controlsVisible = action.payload.controlsVisible;

      state.gels[findIndex(state.gels, { id: action.payload.id })] = currentGel;
      return { ...state, ...{ gels: state.gels } };

    case "HIDE_ALL_CONTROLS":
      // Hide the controls for all the other pipettes
      state.gels.forEach(gel => {
        gel.controlsVisible = false;
      });

      return { ...state, ...{ gels: state.gels } };

    case "UNDO":
      //Payload = {lastState}
      if (action.payload.lastState !== null) {
        return action.payload.lastState.gel;
      } else {
        return state;
      }

    default:
      return state;
  }
};
