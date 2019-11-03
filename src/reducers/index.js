import notesReducer from "./notes"
import userReducer from "./user"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
  notes: notesReducer,
  user: userReducer
})
