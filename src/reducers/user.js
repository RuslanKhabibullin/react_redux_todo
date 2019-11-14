import { Record } from "immutable"
import { USER_SIGN_OUT, USER_SIGN_IN } from "../constants"

const userId = window.localStorage.getItem("userId")
const UserRecord = new Record({
  id: userId ? userId : undefined,
  email: userId ? "user@email.com" : "",
  loaded: false,
  loading: false
})
const AuthRecord = new Record({
  loading: false,
  loaded: userId ? true : false
})
const ReducerState = new Record({
  record: new UserRecord(),
  authentication: new AuthRecord(),
  error: ""
})
const defaultState = new ReducerState()

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_SIGN_IN:
      window.localStorage.setItem("userId", 1)
      return state
        .set("authentication", new AuthRecord({ loading: false, loaded: true }))
        .set("record", new UserRecord({ id: 1, email: payload.email, loaded: true, loading: false }))
    case USER_SIGN_OUT:
      window.localStorage.removeItem("userId")
      return state
        .set("authentication", new AuthRecord({ loaded: false, loadind: false }))
        .set("record", new UserRecord({ id: undefined, email: undefined, loaded: false, loading: false }))
    default:
      return state
  }
}
