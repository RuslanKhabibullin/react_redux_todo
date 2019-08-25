import { Map, OrderedMap } from "immutable"

export function arrayToMap(array, DataRecord = Map) {
  return array.reduce((acc, item) => {
    return acc.set(item.id, new DataRecord(item))
  } , new OrderedMap())
}

export function mapToArray(mapObject) {
  return mapObject.valueSeq().toArray()
}

export function isUndefined(object) {
  return object === undefined
}

export function inputInvalidate(inputName, inputValue, config = {}) {
  const inputConfig = config[inputName]
  if (!inputConfig) return {}

  const errorMessages = inputConfig.filter(({ logic }) => !logic(inputValue)).map(element => element.message)
  return { [inputName]: errorMessages }
}
