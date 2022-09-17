/**
 * 
 *            888                                               .d8888b.   .d8888b.  
 *          888                                               d88P  Y88b d88P  Y88b 
 *         888                                                     .d88P 888        
 *     .d88888  .d88b.  888  888        888  888 .d8888b         8888"  888d888b.  
 *   d88" 888 d8P  Y8b 888  888       888  888 88K               "Y8b. 888P "Y88b 
 *  888  888 88888888 Y88  88P      888  888 "Y8888b.      888    888 888    888 
 *  Y88b 888 Y8b.      Y8bd8P       Y88b 888      X88      Y88b  d88P Y88b  d88P 
 *  "Y88888  "Y8888    Y88P         "Y88888  88888P'       "Y8888P"   "Y8888P"  
 *                                     888                                       
 *                               Y8b d88P                                       
 *                                "Y88P"                                        
 * 
 * @author dev-ys-36
 * @link https://github.com/dev-ys-36
 * @license MIT LICENSE
 * 
 * The copyright indication and this authorization indication shall be
 * recorded in all copies or in important parts of the Software.
 * 
 */

const passport = require('passport')
const request = require('request-promise')

const secuUtil = require('../utils/secu')

module.exports.loginCheck = (req, res, next) => {
  if (typeof(req.user) !== 'undefined'){
    //res.status(400).json({ status: 'fail' })
    res.redirect('/')
    return
  }
  next()
}

module.exports.logoutCheck = (req, res, next) => {
  if (typeof(req.user) === 'undefined'){
    //res.status(400).json({ status: 'fail' })
    res.redirect('/')
    return
  }

  if (req.user.type !== 'naver'){
    //res.status(400).json({ status: 'fail' })
    res.redirect('/')
    return
  }
  
  next()
}

module.exports.login = passport.authenticate('naver')

module.exports.logout = async(req, res) => {
  const option = {
    uri: 'https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=' + Buffer.from(secuUtil.naverClientID, 'base64').toString('utf8') + '&client_secret=' + Buffer.from(secuUtil.naverClientSecret, 'base64').toString('utf8') + '&access_token=' + req.user.token + '&service_provider=NAVER',
    method: 'GET',
    json: true
  }

  const out = await request(option, (error, res, body) => {
    if (!error){
      return res
    }
  })

  req.logout((error) => { if (error) throw error })
  //res.status(200).json({ status: 'success' })
  res.redirect('/')
}

module.exports.callback = passport.authenticate('naver', {
  successRedirect: '/',
  failureRedirect: '/',
})
