# small-supplant

[![Build Status](https://travis-ci.org/gsantiago/small-supplant.svg?branch=master)](https://travis-ci.org/gsantiago/small-supplant)
[![npm version](https://badge.fury.io/js/small-supplant.svg)](http://badge.fury.io/js/small-supplant)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Small module that does variable replacement in strings:

```js
supplant('Hello, {{ name }}!', {name: 'Dragon'})
// Hello, Dragon
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

## Installation

`npm install small-supplant --save`

For browsers, you can copy the `small-supplant.browser.js`
in the `browser` folder, and include it into your page.


## Tests

Make sure you have the devDependencies installed:

`npm install`

Then, just run:

`npm test`

## License

MIT
