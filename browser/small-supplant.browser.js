(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.supplant = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

module.exports = supplant

function supplant (str, data) {
  return str.replace(supplant.delimiters, function (matched, keypath) {
    try {
      var value = getProp(data, keypath.trim())
      return value === undefined
        ? matched
        : value
    } catch (e) {
      return matched
    }
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

},{}]},{},[1])(1)
});