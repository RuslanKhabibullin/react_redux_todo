import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import idGenerator from '../middlewares/idGenerator'
import { rootReducer } from '../reducers'

export const store = createStore(rootReducer, applyMiddleware(thunk, idGenerator, logger))
