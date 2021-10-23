import { SET_FILTER } from "../actionType";
import { FILTERSTYPE } from "../../constants";

const initialState = FILTERSTYPE.ALL;

function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
}

export default filterReducer;
