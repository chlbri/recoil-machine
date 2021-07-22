
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./recoil-machine.cjs.production.min.js')
} else {
  module.exports = require('./recoil-machine.cjs.development.js')
}
