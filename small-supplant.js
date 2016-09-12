module.exports = supplant

function supplant (str, data) {
  return str.replace(supplant.delimiters, function (matched, keypath) {
    return getProp(data, keypath.trim())
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
