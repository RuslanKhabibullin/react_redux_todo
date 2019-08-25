export default _store => next => action => {
  if (action.generateID) {
    next({
      ...action,
      payload: { ...action.payload, id: Math.random().toString(36).substring(2, 17) }
    })
  } else {
    next(action)
  } 
}
