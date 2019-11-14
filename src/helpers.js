import { Map, OrderedMap } from "immutable"

export function arrayToMap(array, DataRecord = Map) {
  return array.reduce((acc, item) => {
    return acc.set(item.id, new DataRecord(item))
  } , new OrderedMap())
}

export function mapToArray(mapObject) {
  return mapObject.valueSeq().toArray()
}

export function limitString(string, limit = 10) {
  const length = string.length

  if (length > limit) {
    return string.substring(0, limit - 3) + '...'
  } else {
    return string
  }
}
