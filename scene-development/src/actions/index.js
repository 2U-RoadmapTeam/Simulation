//---PIPETTE-------------------------------------------:
//Create pipette instance
export const createPipette = data => {
  //data = {id, type}
  return { type: "CREATE_PIPETTE", payload: data };
};

//Increases volume by some amount
export const incVol = data => {
  //data = {id}
  return { type: "INC_VOL", payload: data };
};

//Decreases volume by some amount
export const decVol = data => {
  //data = {id}
  return { type: "DEC_VOL", payload: data };
};

//Set volume by some amount
export const setVol = data => {
  //data = {id, volume}
  return { type: "SET_PIPETTE_VOL", payload: data };
};

//Change tip attached status
export const setTipAttached = data => {
  //data = {id, attached}
  return { type: "SET_TIP_ATTACHED", payload: data };
};

//Change tip used status
export const setTipUsed = data => {
  //data = {id, used}
  return { type: "SET_TIP_USED", payload: data };
};

//Set solution in current tip
export const setPipetteSolution = data => {
  //data = {id, solution}
  return { type: "SET_PIPETTE_SOLUTION", payload: data };
};

//Set whether the pipette controls are displayed or not
export const setPipetteControlVisibility = (data) => {
    //data = {id, animatingOut}
    return { type: "SET_PIPETTE_CONTROLS_VISIBLE", payload: data}
}

//Set if pipette controls are visible or not
export const setHeld = data => {
  //data = {id, held}
  return { type: "SET_HELD", payload: data };
};

//Set if pipette plunger is being depressed or not
export const setAnimatingOut = data => {
  //data = {id, animatingOut}
  return { type: "SET_PIPETTE_ANIMATING_OUT", payload: data };
};

//Set the current pipette plunger state
export const setPlungerPosition = data => {
  //data = {id, currentPlunger}
  return { type: "SET_PIPETTE_PLUNGER_POSITION", payload: data };
};

//Set the current pipette plunger position in px
export const setCurrentPlungerPos = data => {
  //data = {id, currentPlungerPos}
  return { type: "SET_PIPETTE_CURRENT_PLUNGER_POSITION", payload: data };
};

//---SOLUTION------------------------------------------:
//Creates new solution and adds to array of solutions
export const createSolution = data => {
  //data = {id, solution}
  return { type: "CREATE_SOLUTION", payload: data };
};

//set solution of solution obj with specific id
export const setSolution = data => {
  //data = {id, solution}
  return { type: "SET_SOLUTION", payload: data };
};

//Change lid open status of solution with specific id
export const solutionOpen = data => {
  //data = {id, open}
  return { type: "SOLUTION_OPEN", payload: data };
};

//set solution of solution obj with specific id
export const incSolution = data => {
  //data = {id, solution}
  return { type: "INC_SOLUTION", payload: data };
};

//Change lid open status of solution with specific id
export const decSolution = data => {
  //data = {id, open}
  return { type: "DEC_SOLUTION", payload: data };
};

//Hide solution when dragged over to microcentrifuge with specific id
export const setSolutionInScene = data => {
  //data = {id, inScene}
  return { type: "SET_SOLUTION_IN_SCENE", payload: data };
};

//Determine if solution is on rack
export const setSolutionOnRack = (data) => {
    //data = {id, inScene}
    return { type: "SET_SOLUTION_ON_RACK", payload: data}
}

//Determine if Solution is in Ice
export const setSolutionOnIce = (data)=>{
    return {type : "SET_SOLUTION_ON_ICE", payload:data}
}


export const setSolutionHeld = (data) => {
    //data = {id, inScene}
    return { type: "SET_SOLUTION_HELD", payload: data}
}

export const setSolutionHomogenized = (data) => {
    //data = {id, homogenized}
    return { type: "SET_SOLUTION_HOMOGENIZED", payload: data}
}

//Set whether the flask controls are displayed or not
export const setSolutionControlVisibility = (data) => {
    //data = {id, animatingOut}
    return { type: "SET_SOLUTION_CONTROLS_VISIBLE", payload: data}
}

export const setSolutionInFreezer = (data)=>{
    return {type : "SET_SOLUTION_IN_FREEZER", payload:data}
}

export const setSolutionInWaterBath = (data)=>{
    return {type : "SET_SOLUTION_IN_WATERBATH", payload:data}
}

//---flask------------------------------------------:
export const createFlask = data => {
  //data = {id, solution}
  return { type: "CREATE_FLASK", payload: data };
};

export const setFlask = data => {
  //data = {id, solution}
  return { type: "SET_FLASK", payload: data };
};

export const incFlask = data => {
  //data = {id, solution}
  return { type: "INC_FLASK", payload: data };
};

export const decFlask = data => {
  //data = {id, open}
  return { type: "DEC_FLASK", payload: data };
};

export const isPouring = data => {
  //data = {id, pour}
  return { type: "SET_FLASK_POUR", payload: data };
};

export const setFlaskHeld = data => {
  //data = {id, held}
  return { type: "SET_FLASK_HELD", payload: data };
};

//Set whether the flask controls are displayed or not
export const setFlaskControlVisibility = (data) => {
  //data = {id, animatingOut}
  return { type: "SET_FLASK_CONTROLS_VISIBLE", payload: data}
}


export const setDigestPrediction = (data) => {
    //data = {id, prediction}
    return { type: "SET_DIGEST_PREDICTION", payload: data}
}

//---GEL------------------------------------------:
export const createGel = data => {
  //data = {id, description, type}
  return { type: "CREATE_GEL", payload: data };
};

export const setGel = data => {
  //data = {type, concentration, description}
  return { type: "SET_GEL", payload: data };
};

export const setGelOnShelf = data => {
  //data = {id, onShelf}
  return { type: "SET_GEL_ON_SHELF", payload: data };
};

export const setGelLane = data => {
  //data = {id, laneNumber, laneData}
  return { type: "SET_GEL_LANE", payload: data };
};

export const makeGelImgConfig = data => {
  //data = {id}
  return { type: "MAKE_GEL_IMG_CONFIG", payload: data };
};

export const setGelInScene = data => {
  //data = {type, inScene}
  return { type: "SET_GEL_IN_SCENE", payload: data };
};

export const setGelHeld = data => {
  //data = {id, held}
  return { type: "SET_GEL_HELD", payload: data };
};

export const setGelPrediction = data => {
  //data = {id, held}
  return { type: "SET_GEL_PREDICTION", payload: data };
};

export const setGelResult = data => {
  //data = {id, held}
  return { type: "SET_GEL_RESULT", payload: data };
};

export const setGelActiveLane = data => {
  //data = {id, lane}
  return { type: "SET_GEL_ACTIVE_LANE", payload: data };
};

export const setPredictionBandHeight = data => {
  // data = {id, lane, label, height}
  return { type: "SET_PREDICTION_BAND_HEIGHT", payload: data };
};

export const setPredictionAllHeights = data => {
  // data = {id, heights}
  return { type: "SET_PREDICTION_ALL_HEIGHTS", payload: data };
};

export const setDropdownPrediction = data => {
  // data = {id, choice}
  return { type: "SET_DROPDOWN_PREDICTION", payload: data };
};

export const setPredictionLaneVisible = data => {
  // data = {id, lane, visible}
  return { type: "SET_PREDICTION_LANE_VISIBLE", payload: data };
};

//Set whether the pipette controls are displayed or not
export const setGelControlVisibility = (data) => {
  //data = {id, animatingOut}
  return { type: "SET_GEL_CONTROLS_VISIBLE", payload: data}
}

export const removeGelComb = (data) => {
    //data = {id, lane}
    return { type: "REMOVE_GEL_COMB", payload: data}
}


//---GEL BOX------------------------------------------:

//Create gel box instance
export const createGelBox = data => {
  //data = {id, type}
  return { type: "CREATE_GEL_BOX", payload: data };
};

export const setGelBox = data => {
  //data = {...}
  return { type: "SET_GEL_BOX", payload: data };
};

export const setGelInBox = data => {
  //data = {id, containsGel}
  return { type: "SET_GEL_IN_BOX", payload: data };
};

export const setSolutionInGelBox = data => {
  //data = {id, containsGel}
  return { type: "SET_SOLUTION_IN_GEL_BOX", payload: data };
};

export const setSolutionInGel= (data) => {
    //data = {id, containsGel}
    return { type: "SET_SOLUTION_IN_GEL", payload: data}
};

export const setGelOrientation = data => {
  //data =  {id, gelOrientation}
  return { type: "SET_GEL_ORIENTATION", payload: data };
};

export const incGelOrientation = data => {
  //data =  {id, gelOrientation}
  return { type: "INC_GEL_ORIENTATION", payload: data };
};

export const decGelOrientation = data => {
  //data =  {id, gelOrientation}
  return { type: "DEC_GEL_ORIENTATION", payload: data };
};

export const setGelBoxTimer = data => {
  //data = {id, timer}
  return { type: "SET_GEL_BOX_TIMER", payload: data };
};

export const setGelBoxActive = data => {
  //data = {id, active}
  return { type: "SET_GEL_BOX_ACTIVE", payload: data };
};

export const gelBoxOpen = data => {
  //data = {id, cover}
  return { type: "SET_GEL_BOX_OPEN", payload: data };
};

export const setGelBoxAnodeConnected = data => {
  //data = {id, anodeConnected}
  return { type: "SET_GEL_BOX_ANODE_CONNECTED", payload: data };
};

export const setGelBoxCathodeConnected = data => {
  //data = {id, cathodeConnected}
  return { type: "SET_GEL_BOX_CATHODE_CONNECTED", payload: data };
};

//---POWER SUPPLY------------------------------------------:
// export const setPowerSupplyCurrent = (data) => {
//     //data = {current}
//     return { type: "SET_POWER_SUPPLY_CURRENT", payload: data}
// }

// export const setPowerSupplyActive = (data) => {
//     //data = {active}
//     return { type: "SET_POWER_SUPPLY_ACTIVE", payload: data}
// }

// export const setPowerSupplyVoltage = (data) => {
//     //data = {voltage}
//     return { type: "SET_POWER_SUPPLY_VOLTAGE", payload: data}
// }

export const setPowerSupplyAnodeConnected = (data) => {
    //data = {anodeConnected}
    return { type: "SET_POWER_SUPPLY_ANODE_CONNECTED", payload: data}
}

export const setPowerSupplyCathodeConnected = (data) => {
    //data = {cathodeConnected}
    return { type: "SET_POWER_SUPPLY_CATHODE_CONNECTED", payload: data}
}

export const incPowerSupplyTime = (data) => {
    //data = {cathodeConnected}
    return { type: "INC_POWER_SUPPLY_TIME", payload: data}
}
export const decPowerSupplyTime = (data) => {
    //data = {cathodeConnected}
    return { type: "DEC_POWER_SUPPLY_TIME", payload: data}
}
export const countDownPowerSupplyTime = (data) => {
    //data = {cathodeConnected}
    return { type: "COUNT_DOWN_POWER_SUPPLY_TIME", payload: data}
}
export const resetPowerSupplyTime = (data) => {
    //data = {cathodeConnected}
    return { type: "RESET_POWER_SUPPLY_TIME", payload: data}
}
export const incPowerSupplyAmp = (data) => {
    //data = {cathodeConnected}
    return { type: "INC_POWER_SUPPLY_AMP", payload: data}
}
export const decPowerSupplyAmp = (data) => {
    //data = {cathodeConnected}
    return { type: "DEC_POWER_SUPPLY_AMP", payload: data}
}
export const incPowerSupplyWatt = (data) => {
    //data = {cathodeConnected}
    return { type: "INC_POWER_SUPPLY_WATT", payload: data}
}
export const decPowerSupplyWatt = (data) => {
    //data = {cathodeConnected}
    return { type: "DEC_POWER_SUPPLY_WATT", payload: data}
}
export const incPowerSupplyVoltage = (data) => {
    //data = {cathodeConnected}
    return { type: "INC_POWER_SUPPLY_VOLTAGE", payload: data}
}
export const decPowerSupplyVoltage = (data) => {
    //data = {cathodeConnected}
    return { type: "DEC_POWER_SUPPLY_VOLTAGE", payload: data}
}
export const togglePowerSupplyPower = (data) => {
    //data = {cathodeConnected}
    return { type: "SET_POWER_SUPPLY_POWER", payload: data}
}
export const togglePowerSupplyStart = (data) => {
    //data = {cathodeConnected}
    return { type: "SET_POWER_SUPPLY_ACTIVE", payload: data}
}

export const setCentrifugeRpm = (data) => {
    //data = {rpm}
    return { type: "SET_CENTRIFUGE_RPM", payload: data}
}

export const setCentrifugeTime = (data) => {
    //data = {time}
    return { type: "SET_CENTRIFUGE_TIME", payload: data}
}



//---POWER SUPPLY LEAD------------------------------------------:
export const setPowerSupplyLeadPostive = data => {
  //data = {current}
  return { type: "SET_POSITIVE_POWER_SUPPLY_LEAD_POSITION", payload: data };
};

export const setPowerSupplyLeadNegative = data => {
  //data = {current}
  return { type: "SET_NEGATIVE_POWER_SUPPLY_LEAD_POSITION", payload: data };
};

export const setPositiveLeadConnection = data => {
  //data = {current}
  return { type: "SET_POSITIVE_POWER_SUPPLY_LEAD_CONNECTION", payload: data };
};

export const setNegativeLeadConnection = data => {
  //data = {current}
  return { type: "SET_NEGATIVE_POWER_SUPPLY_LEAD_CONNECTION", payload: data };
};

export const setPowerSupplyLeadHeld = (data) => {
  //data = {id, inScene}
  return { type: "SET_POWER_SUPPLY_LEAD_HELD", payload: data}
}

//Set whether the flask controls are displayed or not
export const setPowerSupplyLeadControlVisibility = (data) => {
  //data = {id, animatingOut}
  return { type: "SET_POWER_SUPPLY_LEAD_CONTROLS_VISIBLE", payload: data}
}


//---CENTRIFUGE------------------------------------------:
export const setCentrifugeOpen = data => {
  //data = {open}
  return { type: "SET_CENTRIFUGE_OPEN", payload: data };
};

export const setCentrifugeSlots = data => {
  //data = {slots}
  return { type: "SET_CENTRIFUGE_SLOTS", payload: data };
};

export const setSolutionTubesInCentrifuge = data => {
  //data = {slotIndex, slot}
  return { type: "SET_SOLUTION_TUBES", payload: data };
};

//USE THIS for dropping in tubes
//Adds tube into next available slot
export const addTubeToCentrifuge = data => {
  //data = {id, solution}
  return { type: "ADD_TUBE_TO_CENTRIFUGE", payload: data };
};

export const moveTubeInCentrifuge = data => {
  //data = {currentId, targetId}
  return { type: "MOVE_TUBE_IN_CENTRIFUGE", payload: data };
};

export const countdownCentrifugeTime = data => {
  //data = {timeDiff}
  return { type: "COUNTDOWN_CENTRIFUGE_TIME", payload: data };
};

export const centrifugeCountdownActive = data => {
  //data = {active}
  return { type: "CENTRIFUGE_COUNTDOWN_ACTIVE", payload: data };
};

export const centrifugeBalanced = data => {
  //data = {balanced}
  return { type: "CENTRIFUGE_BALANCED", payload: data };
};

//---BLOTTING PAPER------------------------------------------:
//Create blot paper instance
export const createBlotPaper = data => {
  //data = {id}
  return { type: "CREATE_BLOT_PAPER", payload: data };
};

//Deposit to blotting paper
export const depositBlotPaper = data => {
  //data = {id, solution, volume}
  return { type: "DEPOSIT_BLOT_PAPER", payload: data };
};

//Increases volume prediction by some amount
export const incPrediction = data => {
  //data = {id}
  return { type: "INC_PREDICTION", payload: data };
};

//Decreases volume prediction by some amount
export const decPrediction = data => {
  //data = {id}
  return { type: "DEC_PREDICTION", payload: data };
};

//---TIP BOX------------------------------------------:
//Creates new Tip Box and assigns ID and type
export const createTipBox = data => {
  //data = {id, type}
  return { type: "CREATE_TIP_BOX", payload: data };
};

//Change tip attached status
export const tipBoxOpen = (data) => {
    //data = {id, open}
    return { type: "TIP_BOX_OPEN", payload: data}
}



//---REAGENTS------------------------------------------:
//Creates new Tip Box and assigns ID and type
export const createReagent= (data) => {
    //data = {id, type}
    return { type: "CREATE_REAGENT", payload: data}
}

//Change tip attached status
export const reagentOpen = (data) => {
    //data = {id, open}
    return { type: "REAGENT_OPEN", payload: data}
}

//---TUBES------------------------------------------:
//Creates new Tip Box and assigns ID and type
export const createTube= (data) => {
    //data = {id, type}
    return { type: "CREATE_TUBE", payload: data}
}

//Change tip attached status
export const tubeOpen = (data) => {
    //data = {id, open}
    return { type: "TUBE_OPEN", payload: data}
}

//---TRASH---------------------------------------------:
//Change tip attached status
export const trashFull = full => {
  return { type: "TRASH_FULL", payload: full };
};

//Moves item to trash and increases trash count
export const trashItem = item => {
  return { type: "TRASH_ITEM", payload: item };
};

export const createTrash = data => {
  // data = {type}
  return { type: "SET_TRASH_TYPE", payload: data };
};

export const setTrashOpen = data => {
  // data = {open}
  return { type: "SET_TRASH_OPEN", payload: data };
};



//---ICEBUCKET---------------------------------------------:
export const createIceBucket= (data) => {
    //data = {id, type}
    return { type: "CREATE_ICE_BUCKET", payload: data}
}

export const iceBucketItem = (item) => {
    return { type: "ICE_BUCKET_ITEM", payload: item}
}


//---FREEZER---------------------------------------------:
export const createFreezer= (data) => {
    // data = {id, type}
    return { type: "CREATE_FREEZER", payload: data}
}

export const setFreezerOpen = (data) => {
    // data = {open}
    return { type: "SET_FREEZER_OPEN", payload: data}
}

export const setFreezerTemp = (data) => {
    // data = {temp}
    return { type: "SET_FREEZER_TEMP", payload: data}
}

export const freezerContainsTubeRack = (data) => {
    //data = {containsTubeRack}
    return { type: "FREEZER_CONTAINS_TUBE_RACK", payload: data }
}

//---TubeRack---------------------------------------------:
export const createFloatingTubeRack= (data) => {
    //data = {id, type}
    return { type: "CREATE_FLOATING_TUBE_RACK", payload: data}
}

export const FloatingTubeRackItem = (item) => {
    return { type: "FLOATING_TUBE_RACK_ITEM", payload: item}
}


//---NOTEBOOK------------------------------------------:
//Sets section of Notebook as selected
export const notebookSection = data => {
  // data = {id, section}
  return { type: "NOTEBOOK_SECTION", payload: data };
};

//Toggle slider popout open/closed
export const notebookPopout = open => {
  return { type: "NOTEBOOK_POPOUT", payload: open };
};

//Increases protocol page by 1
export const incProtocolPage = () => {
  return { type: "INC_PROTOCOL_PAGE", payload: 1 };
};

//Decreases protocol page by 1
export const decProtocolPage = () => {
  return { type: "DEC_PROTOCOL_PAGE", payload: 1 };
};

//Goes to a specific protocol page
export const goProtocolPage = page => {
  return { type: "GO_PROTOCOL_PAGE", payload: page };
};

//Sets total protocol pages
export const setTotalProtocolPages = total => {
  return { type: "SET_TOTAL_PROTOCOL_PAGES", payload: total };
};

//Sets task page's top instructions line
export const setPageInstructions = instructions => {
  return { type: "SET_PAGE_INSTRUCTIONS", payload: instructions };
};

//Save note to a given task
export const saveTaskNote = (note, page, index) => {
  return {
    type: "SAVE_TASK_NOTE",
    payload: { note: note, page: page, index: index }
  };
};

//Set tasks data on init (Upgrade to API data later)
export const setTaskPages = taskPages => {
  return { type: "SET_TASK_PAGES", payload: taskPages };
};

//Set tasks data on init (Upgrade to API data later)
export const setLevel = data => {
  //data = {level}
  return { type: "SET_LEVEL", payload: data };
};

//Sets first task in notebook to focused
export const focusFirstTask = () => {
  return { type: "FOCUS_FIRST_TASK", payload: {} };
};

//Sets focused task to completed
export const setTaskCompleted = data => {
  //data = {pageIndex, taskIndex}
  return { type: "SET_TASK_COMPLETED", payload: data };
};

//Sets focused task to completed
export const clearLastActions = () => {
  //data = {pageIndex, taskIndex}
  return { type: "CLEAR_LAST_ACTIONS", payload: {} };
};

//Sets focused task to completed
export const clearTempPoints = () => {
  return { type: "CLEAR_TEMP_POINTS", payload: {} };
};

//DEPRECATED - USE criteriaPassed below
//Sets focused task to completed
export const incTempPoints = () => {
  return { type: "INC_TEMP_POINTS", payload: {} };
};

//NEW
//Sets focused task to completed
export const criteriaPassed = data => {
  //data = {criteria}
  return { type: "CRITERIA_PASSED", payload: data };
};

//Sets toast as fired
export const setToastFired = () => {
    return { type: "SET_TOAST_FIRED", payload: {} }
};

export const setPopupFired = () => {
    return { type: "SET_POPUP_FIRED", payload: {} }
};

//Set the notes view to be enabled / disabled
export const toggleNotesView = (state) => {
    return { type: "NOTES_VIEW", payload: state}
};

export const setRestrictionDigestResults = (data) => {
    // data = {}
    return { type: "SET_RESTRICTION_DIGEST_RESULTS", payload: data }
}

export const setFragmentMass = (data) => {
    // data = {id, mass}
    return { type: "SET_FRAGMENT_MASS", payload: data }
}

export const reverseFragmentMass = (data) => {
    // data = {id, index}
    return { type: "REVERSE_FRAGMENT_MASS", payload: data }
}


//Set the notes view to be enabled / disabled
export const setNoteEntryOpen = data => {
  // data = {open}
  return { type: "SET_NOTE_ENTRY_OPEN", payload: data };
};


export const setCellCulture = (data) => {
    // data = { id, type }
    return { type: "SET_CELL_CULTURE", payload: data }
}

export const removeCellCultureType = (data) => {
    // data = { id }
    return { type: "REMOVE_CELL_CULTURE_TYPE", payload: data }
}

export const setProteinPrediction = (data) => {
    // data = { id, type }
    return { type: "SET_PROTEIN_PREDICTION", payload: data }
}



//---SCENE---------------------------------------------:
//Set value to object held in scene
export const setHeldObject = object => {
  return { type: "SET_HELD_OBJECT", payload: object };
};

//Set target list for object for collision detection
export const setTargetList = targetList => {
  return { type: "SET_TARGET_LIST", payload: targetList };
};

//Adds interaction functions to single collection in Scene
export const pushInteractions = interactions => {
  return { type: "PUSH_INTERACTIONS", payload: interactions };
};

//Records target of last drop for interactions
export const setLastDrop = data => {
  //data = {lastHeld, lastTarget}
  return { type: "SET_LAST_DROP", payload: data };
};
//Changes scene scale
export const setSceneScale = data => {
  //data = {scale}
  return { type: "SET_SCENE_SCALE", payload: data };
};
//Toggle notebook expanded state
export const toggleNotebookExpanded = data => {
  return { type: "TOGGLE_NOTEBOOK_EXPANDED", payload: data };
};
//Adds 1 to warnings count. Stops warnings after 3
export const incPipetteTrashWarnings = data => {
  //data = {id}
  return { type: "INC_PIPETTE_TRASH_WARNINGS", payload: data };
};

//Hide all the controls
export const hideAllControls = (data) => {
  return { type: "HIDE_ALL_CONTROLS", payload: {controlsVisible: false} }
}






//---MULTIPLE CHOICE QUESTION-----------------------------:

//Create multiple choice question instance
export const createMCQ = data => {
  //data = {id, type}
  return { type: "CREATE_MCQ", payload: data };
};

//Answer a mutliple choice question
export const setMCQResponse = data => {
  //data = {id, solution}
  return { type: "ANSWER_MCQ", payload: data };
};

//Check the answer to a multiple choice question
export const validateMCQ = data => {
  //data = {id, solution}
  return { type: "VALIDATE_MCQ", payload: data };
};

//---SINGLE CHOICE QUESTION-----------------------------:

//Create single choice question instance
export const createSCQ = data => {
  //data = {id, type}
  return { type: "CREATE_SCQ", payload: data };
};

//Answer a single choice question
export const setSCQResponse = data => {
  //data = {id, solution}
  return { type: "ANSWER_SCQ", payload: data };
};

//Check the answer to a single choice question
export const validateSCQ = data => {
  //data = {id, solution}
  return { type: "VALIDATE_SCQ", payload: data };
};

//---PREDICTIONS CHOICE QUESTION-----------------------:

export const createPSCQ = data => {
  // data = {id, type}
  return { type: "CREATE_PSCQ", payload: data };
};

export const setPSCQResponse = data => {
  // data = {id, solution}
  return { type: "ANSWER_PSCQ", payload: data };
};

export const validatePSCQ = data => {
  //data = {id, solution}
  return { type: "VALIDATE_PSCQ", payload: data };
};

//---Modal-----------------------------:

//Update the modal data
export const setModal = data => {
  return { type: "SET_MODAL", payload: data };
};

//Display the modal
export const showModal = data => {
  return { type: "SHOW_MODAL", payload: data };
};

//---Move Menu-----------------------------:

//Update the move menu data
export const setMoveMenu = data => {
  return { type: "SET_MOVEMENU", payload: data };
};

//Display the move menu
export const showMoveMenu = data => {
  return { type: "SHOW_MOVEMENU", payload: data };
};

// ---Result Feedback-----------------------:
export const saveResultFeedback = data => {
  return { type: "SAVE_RESULT_FEEDBACK", payload: data };
};

// ---PROTOCOL TABLE POPUP-----------------------:
export const setPopupTableValue = data => {
  //data = {value, row, index}
  return { type: "SET_POPUP_TABLE_VALUE", payload: data };
};

export const setPopupTableValid = data => {
  //data = {valid}
  return { type: "SET_POPUP_TABLE_VALID", payload: data };
};
//---WATER BATH-----------------------------:

export const addItemToWaterBath = (data) => {
    //data = {newItem} newItem = {type, id}
    return { type: "ADD_ITEM_TO_WATER_BATH", payload: data }
}

export const removeItemFromWaterBath = (data) => {
    //data = {removeItem} removeItem = {type,id}
    return { type: "REMOVE_ITEM_FROM_WATER_BATH", payload: data }
}



export const waterBathOpen = (data) => {
    //data = {open}
    return { type: "WATER_BATH_OPEN", payload: data }
}

export const setWaterBathTime = (data) => {
    //data = {time}
    return { type: "SET_WATER_BATH_TIME", payload: data }
}

export const waterBathCountdown = (data) => {
    //data = {timeDiff}
    return { type: "WATER_BATH_COUNT_DOWN", payload: data }
}

export const setWaterBathTemp = (data) => {
    //data = {temp}
    return { type: "SET_WATER_BATH_TEMP", payload: data }
}

export const waterBathCountdownActive = (data) => {
    //data = {active}
    return { type: "WATER_BATH_COUNTDOWN_ACTIVE", payload: data }
}

export const waterBathContainsTubeRack = (data) => {
    //data = {containsTubeRack}
    return { type: "WATER_BATH_CONTAINS_TUBE_RACK", payload: data }
}




//---FLOATING TUBE RACK------------------------------------------:
export const tubeInWaterBath = (data) => {
    //data = {inWaterBath}
    return { type: "TUBE_IN_WATER_BATH", payload: data }
}
//---POPUP QUESTION-----------------------------:

//Create single choice question instance
export const createPopup = (data) => {
    //data = {id, type}
    return { type: "CREATE_POPUP", payload: data }
}

//Answer a single choice question
export const setPopupResponse = (data) => {
    //data = {id, solution}
    return { type: "ANSWER_POPUP", payload: data}
}

//Check the answer to a single choice question
export const validatePopup = (data) => {
    //data = {id, solution}
    return { type: "VALIDATE_POPUP", payload: data}
}





//---Modal-----------------------------:

export const tubeInFreezer = (data) => {
    //data = {inFreezer}
    return { type: "TUBE_IN_FREEZER", payload: data }
}

export const setTubesInRack = (data) => {
    //data = {tubes}
    return { type: "SET_TUBES_IN_RACK", payload: data }
}

export const tubeInIce = (data) => {
    //data = {inIce}
    return { type: "TUBE_IN_ICE", payload: data }
}

export const tubeInRack = (data) => {
    //data = {inRack}
    return { type: "TUBE_IN_RACK", payload: data }
}

export const setTubesInIce = (data) => {
    //data = {tubes}
    return { type: "SET_TUBES_IN_ICE", payload: data }
}

export const addTubeToRack = (data) => {
    //data = {type,id} <- of the tube added
    return { type: "ADD_TUBE_TO_RACK", payload: data }
}

export const removeTubeFromRack = (data) => {
    //data = {}
    return { type: "REMOVE_TUBE_FROM_RACK", payload: data }
}

export const removeTubesFromRack = (data) => {
    //data = {}
    return { type: "REMOVE_TUBES_FROM_RACK", payload: data }
}

export const setFloatingTubeRackHeld = (data) => {
    //data = {id, inScene}
    return { type: "SET_FLOATING_TUBE_RACK_HELD", payload: data}
}

//Set whether the flask controls are displayed or not
export const setFloatingTubeRackControlVisibility = (data) => {
    //data = {id, animatingOut}
    return { type: "SET_FLOATING_TUBE_RACK_CONTROLS_VISIBLE", payload: data}
}




//---VORTEX------------------------------------------:
export const createVortex = (data) => {
    //data = {id, type}
    return { type: "CREATE_VORTEX", payload: data }
}

export const setVortex = (data) => {
    //data = {tubes}
    return { type: "SET_VORTEX", payload: data }
}
export const removeTubesFromVortex = (data) => {
    //data = {}
    return { type: "REMOVE_TUBES_FROM_VORTEX", payload: data }
}

export const setSolutionInVortex = (data)=>{
    return {type : "SET_SOLUTION_IN_VORTEX", payload:data}
}

export const addTubeToVortex = (data) => {
    //data = {inIce}
    return { type: "ADD_TUBE_TO_VORTEX", payload: data }
}

export const vortexContainsTube= (data) => {
    //data = {containsTube}
    return { type: "VORTEX_CONTAINS_TUBE", payload: data }
}


export const setPopupTableSubmitted = data => {
  //data = {submitted}
  return { type: "SET_POPUP_TABLE_SUBMITTED", payload: data };
};




//---UNDO------------------------------------------:
export const saveSnapshot = (data) => {
  //data = {snapshot}
  return { type: "SAVE_SNAPSHOT", payload: data }
}

export const undo = (data) => {
  //data = {lastState}
  return { type: "UNDO", payload: data }
}

export const setUndoAttempts = (data) => {
  //data = {attempts}
  return { type: "SET_UNDO_ATTEMPTS", payload: data }
}








// ---Heat Block ----------------------------:
export const toggleHeatBlockStart = (data) => {
    //data = {cathodeConnected}
    return { type: "SET_HEAT_BLOCK_ACTIVE", payload: data}
}
export const incHeatBlockTime = (data) => {
    //data = {cathodeConnected}
    return { type: "INC_HEAT_BLOCK_TIME", payload: data}
}
export const decHeatBlockTime = (data) => {
    //data = {cathodeConnected}
    return { type: "DEC_HEAT_BLOCK_TIME", payload: data}
}
export const countDownHeatBlockTime = (data) => {
    //data = {cathodeConnected}
    return { type: "COUNT_DOWN_HEAT_BLOCK_TIME", payload: data}
}
export const resetHeatBlockTime = (data) => {
    //data = {cathodeConnected}
    return { type: "RESET_HEAT_BLOCK_TIME", payload: data}
}
export const incHeatBlockTemp = (data) => {
    //data = {cathodeConnected}
    return { type: "INC_HEAT_BLOCK_TEMP", payload: data}
}
export const decHeatBlockTemp = (data) => {
    //data = {cathodeConnected}
    return { type: "DEC_HEAT_BLOCK_TEMP", payload: data}
}
export const addTubeToHeatBlock = (data) => {
    //data = {cathodeConnected}
    return { type: "ADD_TUBE_TO_HEAT_BLOCK", payload: data}
}
export const removeTubeFromHeatBlock = (data) => {
    //data = {cathodeConnected}
    return { type: "REMOVE_TUBE_FROM_HEAT_BLOCK", payload: data}
}
