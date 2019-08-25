import notesReducer from "./notes"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
  notes: notesReducer
})
