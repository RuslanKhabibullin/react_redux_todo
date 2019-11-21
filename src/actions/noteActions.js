import {
  UPDATE_NOTE,
  CREATE_NOTE,
  FETCH_NOTES,
  START,
  SUCCESS,
  FAIL,
  BASE_URL
} from "../constants"

export function fetchNotes({ token }) {
  return dispatch => {
    dispatch({ type: FETCH_NOTES + START })

    fetch(`${BASE_URL}/todos`, {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch({ type: FETCH_NOTES + SUCCESS, payload: json.data }))
        } else {
          response.json().then(json => dispatch({ type: FETCH_NOTES + FAIL, payload: json.errors }))
        }
      })
      .catch(error => dispatch({ type: FETCH_NOTES + FAIL, payload: error }))
  }
}

export function updateNote(token, noteData) {
  return dispatch => {
    dispatch({ type: UPDATE_NOTE + START })

    fetch(`${BASE_URL}/todos/${noteData.id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ todo: noteData })
    })
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch({ type: UPDATE_NOTE + SUCCESS, payload: json.data }))
        } else {
          response.json().then(json => dispatch({ type: UPDATE_NOTE + FAIL, payload: json.errors }))
        }
      })
      .catch(error => dispatch({ type: UPDATE_NOTE + FAIL, payload: error }))
  }
}

export function createNote(token, noteData) {
  return dispatch => {
    dispatch({ type: CREATE_NOTE + START })

    fetch(`${BASE_URL}/todos`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ todo: noteData })
    })
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch({ type: CREATE_NOTE + SUCCESS, payload: json.data }))
        } else {
          response.json().then(json => dispatch({ type: CREATE_NOTE + FAIL, payload: json.errors }))
        }
      })
      .catch(error => dispatch({ type: CREATE_NOTE + FAIL, payload: error }))
  }
}
