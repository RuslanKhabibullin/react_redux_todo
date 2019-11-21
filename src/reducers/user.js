import { Record } from "immutable"
import {
  USER_SIGN_OUT,
  USER_SIGN_IN,
  USER_SIGN_UP,
  START,
  SUCCESS,
  FAIL,
  USER_FETCH_PROFILE
} from "../constants"

const userId = window.localStorage.getItem("userId")
const token = window.localStorage.getItem("token")

const UserRecord = new Record({
  id: userId ? userId : undefined,
  email: "",
  loaded: false,
  loading: false
})
const AuthRecord = new Record({
  token: token ? token : undefined,
  loading: false,
  loaded: token && userId ? true : false
})
const ReducerState = new Record({
  record: new UserRecord(),
  authentication: new AuthRecord(),
  error: {}
})
const defaultState = new ReducerState()

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_SIGN_UP + START:
    case USER_SIGN_IN + START:
      return state
        .set("record", new UserRecord({ id: undefined, email: undefined, loaded: false, loading: false }))
        .set("authentication", new AuthRecord({ token: undefined, loaded: false, loading: true }))
        .set("error", {})
    case USER_SIGN_UP + SUCCESS:
    case USER_SIGN_IN + SUCCESS:
      const { token, user } = payload
      window.localStorage.setItem("userId", user.id)
      window.localStorage.setItem("token", token)
      return state
        .set("authentication", new AuthRecord({ token: token, loading: false, loaded: true }))
        .set("record", new UserRecord({ id: user.id, email: user.email, loaded: true, loading: false }))
        .set("error", {})
    case USER_SIGN_UP + FAIL:
    case USER_SIGN_IN + FAIL:
      return state
        .set("record", new UserRecord({ id: undefined, email: undefined, loaded: false, loading: false }))
        .set("authentication", new AuthRecord({ token: undefined, loaded: false, loading: false }))
        .set("error", payload)
    case USER_FETCH_PROFILE + START:
      return state
        .set("record", new UserRecord({ id: userId, email: undefined, loaded: false, loading: true }))
    case USER_FETCH_PROFILE + SUCCESS:
      const { id, email } = payload 
      return state
        .set("record", new UserRecord({ id: id, email: email, loaded: true, loading: false }))
    case USER_FETCH_PROFILE + FAIL:
      return state
        .set("record", new UserRecord({ id: userId, email: undefined, loaded: false, loading: false }))
        .set("error", payload)
    case USER_SIGN_OUT:
      window.localStorage.removeItem("userId")
      window.localStorage.removeItem("token")
      return state
        .set("authentication", new AuthRecord({ token: undefined, loaded: false, loadind: false }))
        .set("record", new UserRecord({ id: undefined, email: undefined, loaded: false, loading: false }))
        .set("error", {})
    default:
      return state
  }
}
