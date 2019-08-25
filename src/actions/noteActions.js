import { UPDATE_NOTE, CREATE_NOTE } from "../constants"

export function updateNote(noteData) {
  return {
    type: UPDATE_NOTE,
    payload: { ...noteData }
  }
}

export function createNote(noteData) {
  return {
    type: CREATE_NOTE,
    payload: { ...noteData },
    generateID: true 
  }
}
