var supplant = require('..')
var expect = require('expect')
var originalTransform = supplant.transform

describe('Supplant', function () {
  beforeEach(function () {
    supplant.delimiters = ['{{', '}}']
    supplant.transform = originalTransform
  })

  it('should replace the name', function () {
    var str = 'Hello, {{name}}!'
    var result = supplant(str, {name: 'John'})
    var expected = 'Hello, John!'
    expect(result).toEqual(expected)
  })

  it('should replace the attributes values', function () {
    var str = '<a href="mailto:{{email}}" class="link {{context}}">{{name}}</a>'
    var result = supplant(str, {
      email: 'user@email.com',
      context: 'primary',
      name: 'USER NAME'
    })
    var expected = '<a href="mailto:user@email.com" class="link primary">USER NAME</a>'
    expect(result).toEqual(expected)
  })

  it('should support deep properties', function () {
    var str = '<li>{{user.name}} - {{user.email}}</li>'
    var result = supplant(str, {
      user: {
        name: 'Clark Kent',
        email: 'contact@clark-kent.com'
      }
    })
    var expected = '<li>Clark Kent - contact@clark-kent.com</li>'
    expect(result).toEqual(expected)
  })

  it('should return the expression itself', function () {
    var str = 'It {{foo.barz}} does not exist, but {{bar}} does!'
    var result = supplant(str, {bar: 'bar property'})
    var expected = 'It {{foo.barz}} does not exist, but bar property does!'
    expect(result).toEqual(expected)
  })

  describe('Custom delimiters', function () {
    it('should support {delimiters}', function () {
      supplant.delimiters = ['{', '}']
      var str = '1 + 1 = {result}'
      var result = supplant(str, {result: 2})
      var expected = '1 + 1 = 2'
      expect(result).toEqual(expected)
    })

    it('should support ${delimiters}', function () {
      supplant.delimiters = ['${', '}']
      var str = 'Hello, mr. ${hero.name}!'
      var result = supplant(str, {
        hero: {
          name: 'Batman'
        }
      })
      var expected = 'Hello, mr. Batman!'
      expect(result).toEqual(expected)
    })

    it('should support @[delimiters]', function () {
      supplant.delimiters = ['@[', ']']
      var str = 'Primary skill: @[user.skills.primary]'
      var result = supplant(str, {user: {
        skills: {
          primary: 'NONE'
        }
      }})
      var expected = 'Primary skill: NONE'
      expect(result).toEqual(expected)
    })

    it('should support <?= delimiters ?>', function () {
      supplant.delimiters = ['<?=', '?>']
      var str = 'I like the <?= language ?> language!'
      var result = supplant(str, {
        language: 'PHP'
      })
      var expected = 'I like the PHP language!'
      expect(result).toEqual(expected)
    })

    it('should support #(delimiters)', function () {
      supplant.delimiters = ['#(', ')']
      var str = 'I hate #(person.name)!!!'
      var result = supplant(str, {
        person: {
          name: 'YOU'
        }
      })
      var expected = 'I hate YOU!!!'
      expect(result).toEqual(expected)
    })
  })

  describe('Custom transforms', function () {
    it('should use the evil `eval`', function () {
      supplant.transform = function (matched, value, data) {
        return eval(value)
      }
      var result = supplant('result is {{ 2 * 5 }}')
      var expected = 'result is 10'
      expect(result).toEqual(expected)
    })
  })
})
