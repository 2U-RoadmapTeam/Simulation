import { combineReducers } from 'redux'

import modalReducer from './modalReducer';
import moveMenuReducer from './moveMenuReducer';
import pipetteReducer from './pipetteReducer';
import gelBoxReducer from './gelBoxReducer';
import tipBoxReducer from './tipBoxReducer';
import trashReducer from './trashReducer';
import solutionReducer  from './solutionReducer';
import notebookReducer  from './notebookReducer';
import sceneReducer from './sceneReducer';
import blotPaperReducer from './blotPaperReducer'
import multipleChoiceQuestionReducer from './multipleChoiceQuestionReducer';
import singleChoiceQuestionReducer from './singleChoiceQuestionReducer';
import flaskReducer from './flaskReducer';
import powerSupplyReducer from './powerSupplyReducer';
import powerSupplyLeadReducer from './powerSupplyLeadReducer';
import iceBucketReducer from './iceBucketReducer';
import freezerReducer from './freezerReducer';
import waterBathReducer from './waterBathReducer';
import floatingTubeRackReducer from './floatingTubeRackReducer';
import centrifugeReducer from './centrifugeReducer';
import gelReducer from './gelReducer';
import vortexReducer from './vortexReducer';
import predictionsQuestionReducer from './predictionsQuestionReducer';
import protocolTableReducer from './protocolTableReducer';
import undoReducer from './undoReducer';
import heatBlockReducer from './heatBlockReducer';
import popupQuestionReducer from './popupQuestionReducer';

export default combineReducers({
    modal: modalReducer,
    moveMenu: moveMenuReducer,
    pipette: pipetteReducer,
    solution: solutionReducer,
    blotPaper: blotPaperReducer,
    tipBox: tipBoxReducer,
    trash: trashReducer,
    notebook: notebookReducer,
    scene: sceneReducer,
    MCQ: multipleChoiceQuestionReducer,
    SCQ: singleChoiceQuestionReducer,
    PSCQ: predictionsQuestionReducer,
    popup: popupQuestionReducer,
    flask: flaskReducer,
    gelBox: gelBoxReducer,
    powerSupply: powerSupplyReducer,
    powerSupplyLead: powerSupplyLeadReducer,
    iceBucket: iceBucketReducer,
    freezer: freezerReducer,
    floatingTubeRack : floatingTubeRackReducer,
    waterBath: waterBathReducer,
    centrifuge: centrifugeReducer,
    gel: gelReducer,
    undo: undoReducer,
    vortex:vortexReducer,
    PSCQ: predictionsQuestionReducer,
    protocolTable: protocolTableReducer,
    heatBlock: heatBlockReducer
})
