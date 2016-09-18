# small-supplant

[![Build Status](https://travis-ci.org/gsantiago/small-supplant.svg?branch=master)](https://travis-ci.org/gsantiago/small-supplant)
[![npm version](https://badge.fury.io/js/small-supplant.svg)](http://badge.fury.io/js/small-supplant)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Small module that does variable replacement in strings:

```js
supplant('Hello, {{ name }}!', {name: 'John'})
// Hello, John
```

It also supports deep properties:

```js
supplant('Full name: {{person.first_name}} {{person.last_name}}', {
  person: {
    first_name: 'Peter',
    last_name: 'Parker'
  }
})

// Full name: Peter Parker
```

and custom delimiters:

```js
supplant.delimiters = ['${', '}']
supplant('<p>${text}</p>', text: 'Nice!') // <p>Nice!</p>

supplant.delimiters = ['<?=', '?>']
supplant('I love <?= language ?>!', {language: 'PHP'}) // I love PHP!
```

And nothing else. Just it!

## installation

`npm install small-supplant --save`

For browsers, you can copy the `small-supplant.browser.js`
in the `browser` folder, and include it into your page.

## tests

`npm install && npm test`

## browser support

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome.png" width="48" height="48"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox.png" width="48" height="48"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer.png" width="48" height="48"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera.png" width="48" height="48"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari.png" width="48" height="48"> |
| --- | --- | --- | --- | --- |
| <div align="center">✔</div> | <div align="center">✔</div> | <div align="center">+IE9 ✔</div> | <div align="center">✔</div> | <div align="center">✔</div> |

## license

MIT
