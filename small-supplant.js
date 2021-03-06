'use strict'

module.exports = supplant

function supplant (str, data) {
  return str.replace(supplant.delimiters, function (matched, keypath) {
    return supplant.transform.call(this, matched, keypath, data)
  })
}

function getProp (obj, keypath) {
  var paths = keypath.split('.')
  if (paths.length === 1) return obj[keypath]
  return getProp(obj[paths.shift()], paths.join('.'))
}

function makeRegex (delimiters) {
  delimiters = delimiters.map(function (re) {
    return re.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  })
  var d1 = delimiters[0]
  var d2 = delimiters[1]
  var re = d1 + '([^' + d1 + d2 + ']*)' + d2
  return new RegExp(re, 'g')
}

Object.defineProperty(supplant, 'delimiters', {
  set: function (newDelimiters) {
    this._delimitersRegex = makeRegex(newDelimiters)
  },
  get: function () {
    return this._delimitersRegex
  }
})

supplant.delimiters = ['{{', '}}']

supplant.transform = function (matched, keypath, data) {
  try {
    var value = getProp(data, keypath.trim())
    return value === undefined
      ? matched
      : value
  } catch (e) {
    return matched
  }
}
