import { Record } from "immutable"
import { arrayToMap } from "../helpers"
import { UPDATE_NOTE, CREATE_NOTE } from "../constants"

function getLocalTodos() {
  return JSON.parse(localStorage.getItem("todos")) || []
}

function appendToLocalTodos(note) {
  const todos = getLocalTodos()
  todos.push(note)
  localStorage.setItem("todos", JSON.stringify(todos))
}

function updateLocalTodo(note) {
  const todos = getLocalTodos()
  const updatedIndex = todos.findIndex(obj => obj.id === note.id)
  todos[updatedIndex] = { ...todos.updatedIndex, ...note }
  localStorage.setItem("todos", JSON.stringify(todos))
}

const NoteRecord = new Record({
  id: undefined,
  title: "",
  description: undefined,
  finished: false
})

const ReducerState = new Record({
  loading: false,
  loaded: false,
  entities: arrayToMap(getLocalTodos(), NoteRecord)
})
const defaultState = new ReducerState()

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_NOTE:
      updateLocalTodo(payload)

      return state
        .setIn(["entities", payload.id, "title"], payload.title)
        .setIn(["entities", payload.id, "description"], payload.description)
        .setIn(["entities", payload.id, "finished"], payload.finished)
    case CREATE_NOTE:
      const noteObject = { ...payload, finished: false }
      appendToLocalTodos(noteObject)
      
      return state
        .setIn(["entities", payload.id], new NoteRecord(noteObject))
    default:
      return state
  }
}
