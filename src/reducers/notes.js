import { Record, OrderedMap } from "immutable"
import { arrayToMap } from "../helpers"
import {
  UPDATE_NOTE,
  CREATE_NOTE,
  FETCH_NOTES,
  START,
  SUCCESS,
  FAIL
} from "../constants"

const backendTodoToStoreTodo = (backendTodo) => {
  return {
    finished: backendTodo.is_finished,
    id: backendTodo.id,
    title: backendTodo.title,
    description: backendTodo.description
  }
}

const renameResponseEntities = (backendNotesResponse) => {
  return backendNotesResponse.map(element => backendTodoToStoreTodo(element))
}

const NoteRecord = new Record({
  id: undefined,
  title: "",
  description: "",
  finished: false
})

const ReducerState = new Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap(),
  error: {}
})
const defaultState = new ReducerState()

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_NOTES + START:
      return state
        .set("loading", true)
        .set("loaded", false)
        .set("error", {})
        .set("entities", new OrderedMap())
    case FETCH_NOTES + FAIL:
      return state
        .set("loading", false)
        .set("loaded", false)
        .set("entities", new OrderedMap())
        .set("error", payload)
    case FETCH_NOTES + SUCCESS:
      const notes = renameResponseEntities(payload)
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("error", {})
        .set("entities", arrayToMap(notes, NoteRecord))
    case UPDATE_NOTE + SUCCESS:
      return state
        .setIn(["entities", payload.id, "title"], payload.title)
        .setIn(["entities", payload.id, "description"], payload.description)
        .setIn(["entities", payload.id, "finished"], payload.is_finished)
    case UPDATE_NOTE + FAIL:
      return state
        .set("error", payload)
    case CREATE_NOTE + SUCCESS:
      const todo = backendTodoToStoreTodo(payload)
      return state
        .setIn(["entities", payload.id], new NoteRecord(todo))
    case CREATE_NOTE + FAIL:
      return state
        .set("error", payload)
    default:
      return state
  }
}
