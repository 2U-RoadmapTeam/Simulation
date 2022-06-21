import { findIndex, cloneDeep } from "lodash"

const initialState = {
  PSCQs: []
};

const templateState = {
  id: -1,
  type: null,
  label: "Question text",
  text: "Question description",
  choices: [{
    label: "Option 1",
    checked: false
  }],
  correct: null,
  attempts: 2,
  answer: 0,
  anyResponse: false,
  image: null,
  feedback: null
};

export default (state = initialState, action) => {
    let currentQuestion;

    if (action.payload === undefined) {
        return state;
    }

    if (action.type !== "CREATE_PSCQ" && !action.type.includes("@redux")) {
        if(action.payload.hasOwnProperty("id")){
            currentQuestion = state.PSCQs[findIndex(state.PSCQs, { id: action.payload.id })]
        }
    }

    console.log(action.type)

    switch (action.type) {

        case 'CREATE_PSCQ':
            //Create new obj from template state
            let newObj = { ...templateState, ...{
                id: action.payload.id,
                type: action.payload.type,
                choices: action.payload.choices,
                label: action.payload.label,
                text: action.payload.text,
                attempts: action.payload.attempts,
                answer: action.payload.answer,
                correct: action.payload.correct,
                image: action.payload.image,
                feedback: action.payload.feedback
            } }

            return { ...state, ...{
                PSCQs: state.PSCQs.concat([newObj])
            } }

        case 'ANSWER_PSCQ':

            let choices = cloneDeep(currentQuestion.choices);

            // With the single choice question we should
            // set everything but the current choice to false

            choices.map((option, index) => {
              if(index != action.payload.index) {
                option.checked = false;
              } else {
                option.checked = action.payload.checked;
                currentQuestion.anyResponse = action.payload.checked;
              }
            })
            currentQuestion.choices = choices;

            state.PSCQs[findIndex(state.PSCQs, { id: action.payload.id })] = currentQuestion;

            return { ...state, ...{ PSCQs: state.PSCQs } }

        case 'VALIDATE_PSCQ':

            let valChoices = cloneDeep(currentQuestion.choices);

            if (currentQuestion.attempts > 0 || currentQuestion.attempts === 'unlimited'){
              if (currentQuestion.answer !== null) {
                // Check if the response matches the index of the answer
                for (var i = 0; i < valChoices.length; i++) {
                  if (valChoices[i].checked === true) {

                    if (i === currentQuestion.answer) {
                      // The user response matches the answer, set the correct state to true
                      currentQuestion.correct = true;
                      valChoices[i].correct = true;
                      break;
                    } else {
                      // The user response doesnt match answer, set the correct state to false
                      currentQuestion.correct = false;
                      valChoices[i].correct = false;
                      break;
                    }
                  }
                }
              } else {
                // Check if the response matches the index of the answer
                for (var i = 0; i < valChoices.length; i++) {

                  if (valChoices[i].correct === true) {

                    currentQuestion.correct = null;
                    valChoices[i].correct = null;
                  }

                  if (valChoices[i].checked === true) {

                    currentQuestion.correct = true;
                    valChoices[i].correct = true;
                  }
                }
              }
              if (currentQuestion.attempts !== 'unlimited') {
                --currentQuestion.attempts;
              }
            }

            currentQuestion.choices = valChoices;
            state.PSCQs[findIndex(state.PSCQs, { id: action.payload.id })] = currentQuestion;

            return { ...state, ...{ PSCQs: state.PSCQs } }

        default:
            return state;
    }
};
