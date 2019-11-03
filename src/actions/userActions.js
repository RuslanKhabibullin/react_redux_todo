import { USER_SIGN_IN, USER_SIGN_OUT } from "../constants"

export function signIn({ email, password }) {
  return {
    type: USER_SIGN_IN,
    payload: { email, password }
  }
}

export function signOut() {
  return { type: USER_SIGN_OUT }
}
