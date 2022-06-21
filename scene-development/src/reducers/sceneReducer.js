import sendxAPI from '../xAPI'
import { unionWith } from "lodash"
import {v4 as uuidv4} from 'uuid'

const initialState = {
    uuid: uuidv4(),
    heldObject: {
        type: null,
        id: -1,
        htmlObj: null,
    },
    targetList: [],
    lastDrop: {
        lastHeld: null,
        lastTarget: null
    },
    interactions: [],
    scale: 1,
    notebookExpanded: true,
    predictions: {
      fragment: {
        p_ARA_R: ["0", "0"],
        plasm_2: ["0", "0"],
        plasm_3: ["0", "0"]
      },
      cellCultures: {
          sample: [],
          positiveControl: [],
          negativeControl: []
      },
    },
    resultFeedback: null,
    pipetteTrashWarnings: 0,
    predictionProtein: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_HELD_OBJECT":
      return { ...state, ...{ heldObject: action.payload } };


    case "PUSH_INTERACTIONS":
      //console.log(state.interactions, action.payload[0].name)

      return {
        ...state,
        ...{
          interactions: [
            ...unionWith(state.interactions, action.payload, function(a, b) {
              if (a.name === b.name) {
                return true;
              } else {
                return false;
              }
            })
          ]
        }
      };

    //return { ...state, ...{ interactions: [ ...state.interactions, ...action.payload ] } }

    case 'SET_TARGET_LIST':
        return { ...state, ...{ targetList: action.payload } }

    case 'PUSH_INTERACTIONS':
        return { ...state, ...{ interactions: [ ...unionWith(state.interactions, action.payload, function(a, b){
         if(a.name === b.name){
           return true
         } else {
           return false;
         }
       } ) ] } }

    case 'SAVE_RESULT_FEEDBACK':
        return { ...state, ...{ resultFeedback: action.payload.resultFeedback}}

    case 'SET_LAST_DROP':

      if(action.payload.lastHeld !== null &&
         action.payload.lastHeld.type !== null &&
         action.payload.lastTarget !== null &&
         action.payload.lastTarget.type !== null){

        // xAPI statement
        sendxAPI({
          // Type of statement
          verb: {
            description: "focused",
            address: "http://id.tincanapi.com/verb/focused"
          },
          // Where the action occured
          context: action.payload.lastHeld.type,
          // Result of the action
          result: {
            success: true,
            response: action.payload.lastTarget.type
          }
        })
      }

      return { ...state, ...{ lastDrop: action.payload } }


    case 'SET_SCENE_SCALE':

        // xAPI statement
        sendxAPI({
          // Type of statement
          verb: {
            description: "assigned",
            address: "http://id.tincanapi.com/verb/assigned"
          },
          // Where the action occured
          context: 'Scene scale',
          // Result of the action
          result: {
            success: true,
            response: action.payload.scale
          }
        })

        return { ...state, ...{ scale: action.payload.scale } }

    case 'TOGGLE_NOTEBOOK_EXPANDED':

        // xAPI statement
        sendxAPI({
          // Type of statement
          verb: {
            description: ((!state.notebookExpanded) === true)?"expanded":"collapsed",
            address: ((!state.notebookExpanded) === true)?"http://id.tincanapi.com/verb/expanded":"http://id.tincanapi.com/verb/collapsed"
          },
          // Where the action occured
          context: 'Lab notebook',
          // Result of the action
          result: {
            success: true,
            response: !state.notebookExpanded
          }
        })

        return { ...state, ...{ notebookExpanded: !state.notebookExpanded } }


    case "SET_FRAGMENT_MASS":
        let lanes = ["p_ARA_R", "plasm_2", "plasm_3"];
        let lane = lanes[action.payload.id];

        let fragments = state.predictions.fragment;

        if (lane) {
          if (fragments[lane][0] === "0") {
            fragments[lane][0] = action.payload.mass;
          } else if (fragments[lane][1] === "0") {
            fragments[lane][1] = action.payload.mass;
          }
        }

        return { ...state, ...{ predictions: { fragment: fragments } } };

    case "REVERSE_FRAGMENT_MASS":
        let fragment_lanes = ["p_ARA_R", "plasm_2", "plasm_3"];
        let fragment_lane = fragment_lanes[action.payload.id];

        let frgmts = state.predictions.fragment;

        if (fragment_lane) {
          frgmts[fragment_lane][action.payload.index] = "0";
        }

        return { ...state, ...{ predictions: { fragment: frgmts } } };

    case 'PUSH_INTERACTIONS':
        console.log(state.interactions, action.payload[0].name)

        return { ...state, ...{ interactions: [ ...unionWith(state.interactions, action.payload, function(a, b){
          if(a.name === b.name){
            return true
          } else {
            return false;
          }
        } ) ] } }

    case "INC_PIPETTE_TRASH_WARNINGS":
      return {
        ...state,
        ...{ pipetteTrashWarnings: state.pipetteTrashWarnings + 1 }
      };

    case 'SET_PROTEIN_PREDICTION':
        return { ...state, ...{ predictionProtein: action.payload.predictionProtein } }

    case 'SET_CELL_CULTURE':

        let llanes = ['sample', 'positiveControl', 'negativeControl'];
        let llane = llanes[action.payload.id];

        let cellCultures = state.predictions.cellCultures;

        if (llane) {
            console.log('lane >>> :: ', lane);
            if (cellCultures[llane].length < 2) {
                cellCultures[llane].push(action.payload.type);
            }
        }

        console.log('scene reducer >>> cellCultures >>> :: ', cellCultures);

        return { ...state, ...{ predictions: { cellCultures: cellCultures } } }

    case 'REMOVE_CELL_CULTURE_TYPE':

        let cell_lanes = ['sample', 'positiveControl', 'negativeControl'];
        let cell_lane = cell_lanes[action.payload.id];

        let cCultures = state.predictions.cellCultures;

        if (cell_lane && cell_lane.length >= (action.payload.index + 1)) {

            if(action.payload.index == 1){
              cCultures[cell_lane].pop();
            } else if (action.payload.index == 0){
              cCultures[cell_lane].reverse();
              cCultures[cell_lane].pop();
              cCultures[cell_lane].reverse();
            }
        }

        console.log('scene reducer >>> cCultures >>> :: ', cCultures);

        return { ...state, ...{ predictions: { cellCultures: cCultures } } }

      default:
          return state;
    }
};
