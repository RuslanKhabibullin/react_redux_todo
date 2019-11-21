import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_SIGN_UP,
  USER_FETCH_PROFILE,
  START,
  SUCCESS,
  FAIL,
  BASE_URL
} from "../constants"

export function signIn({ email, password }) {
  return dispatch => {
    dispatch({ type: USER_SIGN_IN + START })

    fetch(`${BASE_URL}/auth/sign_in`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: { email, password } })
    })
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch({ type: USER_SIGN_IN + SUCCESS, payload: json.data }))
        } else {
          switch (response.status) {
            case 401:
              return dispatch({ type: USER_SIGN_IN + FAIL, payload: { base: "User not found" }})
            case 422:
            default:
              return response.json().then(json => dispatch({ type: USER_SIGN_IN + FAIL, payload: json.errors }))
          }
        }
      })
      .catch(error => dispatch({ type: USER_SIGN_IN + FAIL, payload: error }))
  }
}

export function signUp({ email, password }) {
  return dispatch => {
    dispatch({ type: USER_SIGN_UP + START })

    fetch(`${BASE_URL}/auth/sign_up`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: { email, password } })
    })
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch({ type: USER_SIGN_UP + SUCCESS, payload: json.data }))
        } else {
          response.json().then(json => dispatch({ type: USER_SIGN_UP + FAIL, payload: json.errors }))
        }
      })
      .catch(error => dispatch({ type: USER_SIGN_UP + FAIL, payload: error }))
  }
}

export function signOut() {
  return { type: USER_SIGN_OUT }
}

export function fetchProfile({ id, token }) {
  return dispatch => {
    dispatch({ type: USER_FETCH_PROFILE + START })

    fetch(`${BASE_URL}/users/${id}`, {
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
          response.json().then(json => dispatch({ type: USER_FETCH_PROFILE + SUCCESS, payload: json.data }))
        } else {
          response.json().then(json => dispatch({ type: USER_FETCH_PROFILE + FAIL, payload: json.errors }))
        }
      })
      .catch(error => dispatch({ type: USER_FETCH_PROFILE + FAIL, payload: error }))
  }
}
