const jwt = require('jsonwebtoken')
const secret = 'webtoken-xinyu20190830'

const getJWTInfo = (_token) => {
  if(!_token) return
  return jwt.verify(_token, secret);
}

const getToken = (payload = {}) => {
  return jwt.sign(payload, secret, { expiresIn: '4h' })
}

module.exports = {
  getJWTInfo,
  getToken
}