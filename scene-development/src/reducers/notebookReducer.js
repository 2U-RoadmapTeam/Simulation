import { cloneDeep } from "lodash"
import sendxAPI from '../xAPI'

const initialState = {
    sectionSelected: 'Context',
    noteEntryOpen: false,
    notesView: false,
    sliderOpen: true,
    protocolView: false,
    currentProtocolPage: 1,
    totalProtocolPages: 99,
    currentPageInstructions: "",
    taskPages: [],
    level: 1,
    focusedPage: -1,
    focusedTask: -1,
    focusedTaskObj: {},
    lastActions: {},
    tempPoints: 0,
};

export default (state = initialState, action) => {
    const actionObj = {
        type: action.type,
        payload: action.payload
    }
    if (action.payload === undefined) {
        return state;
    }

    switch (action.type) {
        case "NOTEBOOK_SECTION":
            return { ...state, ...{
                sectionSelected: action.payload.section,
                lastActions: addAction(actionObj)
            } };

        case "NOTEBOOK_POPOUT":

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
              description: ((action.payload) === true)?"expanded":"collapsed",
              address: ((action.payload) === true)?"http://id.tincanapi.com/verb/expanded":"http://id.tincanapi.com/verb/collapsed"
              },
              // Where the action occured
              context: 'Notebook popout section',
              // Result of the action
              result: {
              success: true,
              response: (action.payload === true)
              }
            })

            return { ...state, ...{
                sliderOpen: action.payload,
                lastActions: addAction(actionObj)
            } };

        case "PROTOCOL_VIEW":
            return { ...state, ...{
                protocolView: action.payload,
                lastActions: addAction(actionObj)
            } };

        case "NOTES_VIEW":

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
              description: ((action.payload) === true)?"expanded":"collapsed",
              address: ((action.payload) === true)?"http://id.tincanapi.com/verb/expanded":"http://id.tincanapi.com/verb/collapsed"
              },
              // Where the action occured
              context: 'Notebook notes section',
              // Result of the action
              result: {
              success: true,
              response: (action.payload === true)
              }
            })

            return { ...state, ...{
                notesView: action.payload,
                lastActions: addAction(actionObj)
            } };

        case "INC_PROTOCOL_PAGE":
            if ((state.currentProtocolPage + action.payload) <= state.totalProtocolPages) {

                // xAPI statement
                sendxAPI({
                  // Type of statement
                  verb: {
                    description: "incremented",
                    address: "https://w3id.org/xapi/dod-isd/verbs/incremented"
                  },
                  // Where the action occured
                  context: "Protocol page",
                  // Result of the action
                  result: {
                    success: true,
                    response: (state.currentProtocolPage + action.payload)
                  }
                })

                return { ...state, ...{
                    currentProtocolPage: state.currentProtocolPage += action.payload,
                    lastActions: addAction(actionObj)
                } }
            } else {
                return { ...state, ...{
                    sectionSelected: 'Results',
                    lastActions: addAction(actionObj)
                } };
            }

        case "DEC_PROTOCOL_PAGE":
            if ((state.currentProtocolPage - action.payload) >= 1) {

                // xAPI statement
                sendxAPI({
                  // Type of statement
                  verb: {
                    description: "decremented",
                    address: "https://w3id.org/xapi/dod-isd/verbs/decremented"
                  },
                  // Where the action occured
                  context: "Protocol page",
                  // Result of the action
                  result: {
                    success: true,
                    response: (state.currentProtocolPage - action.payload)
                  }
                })

                return { ...state, ...{
                    currentProtocolPage: state.currentProtocolPage -= action.payload,
                    lastActions: addAction(actionObj)
                 } }
            } else {
                return { ...state, ...{ lastActions: addAction(actionObj) } };
            }

        case "GO_PROTOCOL_PAGE":
            if (action.payload >= 1 && action.payload <= state.totalProtocolPages) {
                return { ...state, ...{
                    currentProtocolPage: action.payload,
                    lastActions: addAction(actionObj)
                 } }
            } else {
                return { ...state, ...{ lastActions: addAction(actionObj) } };
            }

        case "SET_TOTAL_PROTOCOL_PAGES":
            return { ...state, ...{
                totalProtocolPages: action.payload,
                lastActions: addAction(actionObj)
             } };

        case "SET_PAGE_INSTRUCTIONS":
            //Set current page instructions
            return { ...state, ...{
                currentPageInstructions: action.payload,
                lastActions: addAction(actionObj)
             } };

        case "SET_TASK_PAGES":
            //Set all task pages data on init
            return { ...state, ...{
                taskPages: action.payload,
                lastActions: addAction(actionObj)
             } };

        case "SET_NOTE_ENTRY_OPEN":
           //Set all task pages data on init
           return { ...state, ...{
               noteEntryOpen: action.payload.open
            } };

        case "SET_LEVEL":

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "assigned",
                address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
              },
              // Where the action occured
              context: "Level",
              // Result of the action
              result: {
                success: true,
                response: action.payload.level
              }
            })

            //Set level to x
            return { ...state, ...{
                level: action.payload.level,
                lastActions: addAction(actionObj)
             } };

        case "FOCUS_FIRST_TASK":
            //Sets first task on first page to focused
            return startFirstTask();

        case "SET_TASK_COMPLETED":

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "completed",
                address: "https://w3id.org/xapi/dod-isd/verbs/completed"
              },
              // Where the action occured
              context: "Protocol task: "+state.focusedTaskObj.levels["l"+state.level].task,
              // Result of the action
              result: {
                success: true,
                response: true
              }
            })

            //Sets focused task as completed
            return taskCompleted();

        case "CLEAR_LAST_ACTIONS":
            return { ...state, ...{ lastActions: {} } };

        case "CLEAR_TEMP_POINTS":
            return { ...state, ...{
                tempPoints: 0,
                lastActions: addAction(actionObj)
            } };

        case "INC_TEMP_POINTS":
            return { ...state, ...{
                tempPoints: state.tempPoints+1,
                lastActions: addAction(actionObj)
            } };

        case "SET_TOAST_FIRED":
            let tempTask = cloneDeep(state.focusedTaskObj)
            if(!tempTask.levels["l"+state.level].hasOwnProperty("hints")){

                return {
                    ...state, ...{
                        lastActions: addAction(actionObj)
                    }
                };
            }
            tempTask.levels["l"+state.level].hints.forEach(hint => {
                hint.fired = true
            });

            // xAPI statement
             sendxAPI({
               // Type of statement
               verb: {
                 description: "viewed",
                 address: "http://id.tincanapi.com/verb/viewed"
               },
               // Where the action occured
               context: "Protocol task hint: "+tempTask.levels["l"+state.level].hints[0].msg,
               // Result of the action
               result: {
                 success: true,
                 response: true
               }
             })

            return {
                ...state, ...{
                    focusedTaskObj: tempTask,
                    lastActions: addAction(actionObj)
                }
            };

        case "SET_POPUP_FIRED":
            let tempTask2 = cloneDeep(state.focusedTaskObj)
            if(!tempTask2.levels["l"+state.level].hasOwnProperty("popups")){
                return {
                    ...state, ...{
                        lastActions: addAction(actionObj)
                    }
                };
            }
            tempTask2.levels["l"+state.level].popups.forEach(popup => {
                popup.fired = true
            });
            return {
                ...state, ...{
                    focusedTaskObj: tempTask2,
                    lastActions: addAction(actionObj)
                }
            };

        case "SAVE_TASK_NOTE":

        // TODO: We pass the context of the task page, and index back in
        // & and rebuild those items into the data set
        // Makes sense to extend the task pages -> task page -> task to
        // seperate reducers
            let tempTasks = cloneDeep(state.taskPages)
            tempTasks[action.payload.page].tasks[action.payload.index].notes.push(action.payload.note)

            // xAPI statement
            sendxAPI({
              // Type of statement
              verb: {
                description: "saved",
                address: "https://w3id.org/xapi/dod-isd/verbs/saved"
              },
              // Where the action occured
              context: "Observation",
              // Result of the action
              result: {
                success: true,
                response: action.payload.note
              }
            })

            //Sync task back into taskTasks array
            return { ...state, ...{
                taskPages: tempTasks,
                lastActions: addAction(actionObj)
             } };


        case "SET_TASK_COMPLETED":
            let tempPages = cloneDeep(state.taskPages)
            const tI = action.payload.taskIndex
            const pI = action.payload.pageIndex
            //find task at pageIndex, taskIndex
            //change task to complete=true
            tempPages[pI].tasks[tI].complete = true
            tempPages[pI].tasks[tI].current = false
            if(tempPages[pI].tasks.length > tI+1){
                tempPages[pI].tasks[tI+1].current = true
            }
            //Sync task back into taskPages array
            return { ...state, ...{
                taskPages: tempPages,
                lastActions: addAction(actionObj)
             } };

        case "UNDO":
             //Payload = {lastState}
             if (action.payload.lastState !== null) {
               let tempNotebook = cloneDeep(action.payload.lastState.notebook);
               tempNotebook.lastActions = {};
               return tempNotebook;
             } else {
               return state;
             }

        default:
            return { ...state, ...{ lastActions: addAction(actionObj) } };
    }

    function addAction(action) {
        let tempActions = cloneDeep(state.lastActions)
        //Only add actions if not already in collection
        if (!tempActions.hasOwnProperty(action.type)) {
            //Set to 1 if first time adding this action
            tempActions[action.type] = 1
        }
        return tempActions
    }

    function taskCompleted() {
        //If on last task of page
        if (state.taskPages[state.focusedPage].tasks.length === state.focusedTask + 1) {
            //Check isn't on last page
            if (state.taskPages.length > state.focusedPage + 1) {
                //End of page, set next page to focus
                const tempObj = cloneDeep(state.taskPages[state.focusedPage + 1].tasks[0])
                let tempPages = cloneDeep(state.taskPages)
                tempPages[state.focusedPage].tasks[state.focusedTask].complete = true
                tempPages[state.focusedPage].tasks[state.focusedTask].current = false
                tempPages[state.focusedPage+1].tasks[0].current = true
                tempPages[state.focusedPage].complete = true
                return {
                    ...state, ...{
                        focusedPage: state.focusedPage + 1,
                        focusedTask: 0,
                        focusedTaskObj: tempObj,
                        lastActions: addAction(actionObj),
                        taskPages: tempPages
                    }
                }
            } else {
                //If on last page --> just set current task to complete and not current
                let tempPages = cloneDeep(state.taskPages)
                tempPages[state.focusedPage].tasks[state.focusedTask].complete = true
                tempPages[state.focusedPage].tasks[state.focusedTask].current = false
                tempPages[state.focusedPage].complete = true
                return {
                    ...state, ...{
                        lastActions: addAction(actionObj),
                        taskPages: tempPages
                    }
                }
            }
        } else {
            //If task is not last task on page
            const tempObj = cloneDeep(state.taskPages[state.focusedPage].tasks[state.focusedTask + 1])
            let tempPages = cloneDeep(state.taskPages)
            tempPages[state.focusedPage].tasks[state.focusedTask].complete = true
            tempPages[state.focusedPage].tasks[state.focusedTask].current = false
            tempPages[state.focusedPage].tasks[state.focusedTask+1].current = true
            return {
                ...state, ...{
                    focusedTask: state.focusedTask + 1,
                    focusedTaskObj: tempObj,
                    lastActions: addAction(actionObj),
                    taskPages: tempPages
                }
            }
        }
        return { ...state, ...{ lastActions: addAction(actionObj) } };
    }

    //TODO Update this to find next uncompleted task from tasks array
    function startFirstTask() {
        //Sets first task as focused once data loaded
        if (state.taskPages.length > 0) {
            const tempObj = cloneDeep(state.taskPages[0].tasks[0])
            return {
                ...state, ...{
                    focusedPage: 0,
                    focusedTask: 0,
                    focusedTaskObj: tempObj,
                    lastActions: addAction(actionObj),
                }
            }
        }
        return { ...state, ...{ lastActions: addAction(actionObj) } };
    }
};
