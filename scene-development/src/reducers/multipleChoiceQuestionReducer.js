import { findIndex, cloneDeep } from "lodash"

const initialState = {
    MCQs: []
};

const templateState = {
  id: -1,
  type: null,
  label: "Question text",
  choices: [{
    label: "Option 1",
    checked: false
  }],
  correct: false,
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

    if (action.type !== "CREATE_MCQ" && !action.type.includes("@redux")) {
        if(action.payload.hasOwnProperty("id")){
            currentQuestion = state.MCQs[findIndex(state.MCQs, { id: action.payload.id })]
        }
    }

    switch (action.type) {

        case 'CREATE_MCQ':
            //Create new obj from template state
            let newObj = { ...templateState, ...{
                id: action.payload.id,
                type: action.payload.type,
                choices: action.payload.choices,
                label: action.payload.label,
                attempts: action.payload.attempts,
                answer: action.payload.answer,
                correct: action.payload.correct,
                image: action.payload.image
            } }

            return { ...state, ...{
                MCQs: state.MCQs.concat([newObj])
            } }

        case 'ANSWER_MCQ':

            let choices = cloneDeep(currentQuestion.choices);
            choices[action.payload.index].checked = action.payload.checked;

            currentQuestion.anyResponse = action.payload.checked;
            currentQuestion.choices = choices;

            state.MCQs[findIndex(state.MCQs, { id: action.payload.id })] = currentQuestion;

            return { ...state, ...{ MCQs: state.MCQs } }

        case 'VALIDATE_MCQ':
            if(currentQuestion.attempts > 0){
              console.log(currentQuestion.answer);
              if(currentQuestion.answer !== null){
                // Check if the response matches the index of the answer
                for (var i = 0; i < currentQuestion.choices.length; i++) {
                  if(currentQuestion.choices[i].checked === true){

                    if(currentQuestion.answer.includes(i)){
                      // The user response matches the answer, set the correct state to true
                      //currentQuestion.correct = true;
                      currentQuestion.choices[i].correct = true;
                      //break;
                    } else {
                      // The user response doesnt mathc answer, set the correct state to false
                      currentQuestion.correct = false;
                      currentQuestion.choices[i].correct = false;
                      //break;
                    }
                  }
                }
              }
              --currentQuestion.attempts;
            }

            state.MCQs[findIndex(state.MCQs, { id: action.payload.id })] = currentQuestion;

            return { ...state, ...{ MCQs: state.MCQs } }

        case "UNDO":
            //Payload = {lastState}

            if (action.payload.lastState !== null) {
              return action.payload.lastState.MCQ;
            } else {
              return state;
            }

        default:
            return state;
    }
};
