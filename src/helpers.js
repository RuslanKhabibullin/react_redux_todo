import { Map, OrderedMap } from "immutable"

export function arrayToMap(array, DataRecord = Map) {
  return array.reduce((acc, item) => {
    return acc.set(item.id, new DataRecord(item))
  } , new OrderedMap())
}

export function mapToArray(mapObject) {
  return mapObject.valueSeq().toArray()
}
