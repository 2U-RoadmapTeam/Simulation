import { findIndex, cloneDeep } from "lodash"

const initialState = {
    popups: [],
    lastId: 0,
};

const templateState = {
  id: -1,
  type: null,
  label: "Question text",
  choices: [{
    label: "Option 1",
    checked: false
  }],
  correct: null,
  attempts: 2,
  answer: 0,
  anyResponse: false,
  image: null
};

export default (state = initialState, action) => {
    let currentQuestion;

    if (action.payload === undefined) {
        return state;
    }

    if (action.type !== "CREATE_POPUP" && !action.type.includes("@redux")) {
        if(action.payload.hasOwnProperty("id")){
            currentQuestion = state.popups[findIndex(state.popups, { id: state.lastId })]
        }
    }

    switch (action.type) {

        case 'CREATE_POPUP':
            //Create new obj from template state
            let newObj = { ...templateState, ...{
                id: state.lastId+1,
                type: action.payload.type,
                choices: action.payload.choices,
                label: action.payload.label,
                attempts: action.payload.attempts,
                answer: action.payload.answer,
                correct: action.payload.correct,
                image: action.payload.image
            } }

            return { ...state, ...{
                popups: state.popups.concat([newObj]),
                lastId: state.lastId+1
            } }

        case 'ANSWER_POPUP':

            let choices = cloneDeep(currentQuestion.choices);

            // With the single choice question we should
            // set everything but the current choice to false

            choices.map((option, index) => {
              if(index != action.payload.index){
                option.checked = false;
              } else {
                option.checked = action.payload.checked;
                currentQuestion.anyResponse = action.payload.checked;
              }
            })
            currentQuestion.choices = choices;

            state.popups[findIndex(state.popups, { id: state.lastId })] = currentQuestion;

            return { ...state, ...{ popups: state.popups } }

        case 'VALIDATE_POPUP':

            let valChoices = cloneDeep(currentQuestion.choices);

            if(currentQuestion.attempts > 0 || currentQuestion.attempts === 'unlimited'){
              if(currentQuestion.answer !== null){
                // Check if the response matches the index of the answer
                for (var i = 0; i < valChoices.length; i++) {

                  currentQuestion.correct = null;
                  valChoices[i].correct = null;

                  if(valChoices[i].checked === true){

                    if(i === currentQuestion.answer){
                      // The user response matches the answer, set the correct state to true
                      currentQuestion.correct = true;
                      valChoices[i].correct = true;
                      //break;
                    } else {
                      currentQuestion.correct = false;
                      valChoices[i].correct = false;
                    }
                  }
                }
              } else {
                // Check if the response matches the index of the answer
                for (var i = 0; i < valChoices.length; i++) {

                  if(valChoices[i].correct === true){

                    currentQuestion.correct = null;
                    valChoices[i].correct = null;
                  }

                  if(valChoices[i].checked === true){

                    currentQuestion.correct = true;
                    valChoices[i].correct = true;
                  }
                }
              }
              if(currentQuestion.attempts !== 'unlimited'){
                --currentQuestion.attempts;
              }
            }

            currentQuestion.choices = valChoices;
            state.popups[findIndex(state.popups, { id: state.lastId })] = currentQuestion;

            return { ...state, ...{ popups: state.popups } }

        default:
            return state;
    }
};
