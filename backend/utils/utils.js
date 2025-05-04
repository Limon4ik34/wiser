import fs from 'fs'
import _ from 'lodash'

export function getQueryParams(query) {
  if (query.limit === undefined) {
    query.limit = 10
  }
  if (query.offset === undefined) {
    query.offset = 0
  }
  return Object.keys(query).reduce((acc, field) => ({
    ...acc,
    [field]: ['limit', 'offset'].includes(field) ? Number(query[field]) : query[field],
  }), {})
}

export function getSortedList(list, query) {
  if (query.sort) {
    const sort = query.direction || 'asc'
    return _.orderBy(list, query.sort, sort)
  }
  return list
}

export function getSearchedList(list, query, field) {
  if (query.search) {
    const search = query.search.toLowerCase()
    return list.filter(i => i[field].toLowerCase().includes(search))
  }
  return list
}

export function increment(list) {
  const increment = list.reduce((acc, item) => {
    const id = Number(item.id)
    return acc <= id ? id : acc
  }, 0)
  return (increment + 1).toString()
}

export function readData(location, defaultData = []) {
  return fs.existsSync(location) ? JSON.parse(fs.readFileSync(location)) : defaultData
}

export function saveData(location, data) {
  fs.writeFileSync(location, JSON.stringify(data))
}

export function successWrapper(data) {
  return { data }
}
