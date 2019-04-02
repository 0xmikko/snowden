import { updateState } from "../utils/updateState";
import * as actions from '../actions/actions'


const initialState = {
  forms: {},
};


export default (state=initialState, action) => {

  let updateForms = state.forms;
  console.log("STATE", state);

  switch (action.type) {

      case actions.FORMS_SHOW:


          updateForms[action.formId] = {
              show: true,
              data: action.data
          };

          return updateState(state, {
            ...state,
            forms: updateState(state.forms, updateForms)
          });

      case actions.FORMS_HIDE:

          const data = (state.forms['formId']) ? state.forms['formId'].data: undefined;

          updateForms[action.formId] = {
              show: false,
              data: data
          };

          return updateState(state, {
            ...state,
            forms: updateState(state.forms, updateForms)
          });


      default:
        return state

  }
}

export const getShowForms = (state) => (state.forms);
