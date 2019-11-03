const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const titleValidations = [
{
  message: "Should have more than 3 symbols",
  logic: (value) => value && value.length > 3
}]
export const emailValidations = [
  {
    message: "Should have valid email address",
    logic: (value) => value && EMAIL_REGEXP.test(value)
  }
]
export const passwordValidations = [
  {
    message: "Should have more than 7 symbols",
    logic: (value) => value && value.length > 7
  }
]
