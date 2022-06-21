import { findIndex, cloneDeep } from "lodash";
import sendxAPI from "../xAPI";

const initialState = {
  SCQs: []
};

const templateState = {
  id: -1,
  type: null,
  label: "Question text",
  choices: [
    {
      label: "Option 1",
      checked: false
    }
  ],
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

  if (action.type !== "CREATE_SCQ" && !action.type.includes("@redux")) {
    if (action.payload.hasOwnProperty("id")) {
      currentQuestion =
        state.SCQs[findIndex(state.SCQs, { id: action.payload.id })];
    }
  }

  console.log(action.type);

  switch (action.type) {
    case "CREATE_SCQ":
      //Create new obj from template state
      let newObj = {
        ...templateState,
        ...{
          id: action.payload.id,
          type: action.payload.type,
          choices: action.payload.choices,
          label: action.payload.label,
          attempts: action.payload.attempts,
          answer: action.payload.answer,
          correct: action.payload.correct,
          image: action.payload.image,
          ariaLabel: action.payload.ariaLabel
        }
      };

      return {
        ...state,
        ...{
          SCQs: state.SCQs.concat([newObj])
        }
      };

    case "ANSWER_SCQ":
      let choices = cloneDeep(currentQuestion.choices);

      // With the single choice question we should
      // set everything but the current choice to false

      choices.map((option, index) => {
        if (index != action.payload.index) {
          option.checked = false;
        } else {
          option.checked = action.payload.checked;
          currentQuestion.anyResponse = action.payload.checked;
        }
      });
      currentQuestion.choices = choices;

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "assigned",
          address: "https://w3id.org/xapi/dod-isd/verbs/assigned"
        },
        // Where the action occured
        context: currentQuestion.label,
        // Result of the action
        result: {
          success: true,
          response: choices[action.payload.index].label
        }
      });

      state.SCQs[
        findIndex(state.SCQs, { id: action.payload.id })
      ] = currentQuestion;

      return { ...state, ...{ SCQs: state.SCQs } };

    case "VALIDATE_SCQ":
      let valChoices = cloneDeep(currentQuestion.choices);

      if (
        currentQuestion.attempts > 0 ||
        currentQuestion.attempts === "unlimited"
      ) {
        if (currentQuestion.answer !== null) {
          // Check if the response matches the index of the answer
          for (var i = 0; i < valChoices.length; i++) {
            if (valChoices[i].checked === true) {
              if (i + 1 === currentQuestion.answer) {
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
        if (currentQuestion.attempts !== "unlimited") {
          --currentQuestion.attempts;
        }
      }

      // xAPI statement
      sendxAPI({
        // Type of statement
        verb: {
          description: "answered",
          address: "https://w3id.org/xapi/dod-isd/verbs/answered"
        },
        // Where the action occured
        context: currentQuestion.label,
        // Result of the action
        result: {
          success: true,
          response: currentQuestion.correct ? "Correct" : "Incorrectly"
        }
      });

      currentQuestion.choices = valChoices;
      state.SCQs[
        findIndex(state.SCQs, { id: action.payload.id })
      ] = currentQuestion;

      return { ...state, ...{ SCQs: state.SCQs } };

      case "UNDO":
          //Payload = {lastState}

          if (action.payload.lastState !== null) {
            return action.payload.lastState.SCQ;
          } else {
            return state;
          }


    default:
      return state;
  }
};
