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
const KakaoStrategy = require('passport-kakao').Strategy
const NaverStrategy = require('passport-naver-v2').Strategy

const secuUtil = require('../utils/secu')

const kakaoOptions = {
  clientID: Buffer.from(secuUtil.kakaoClientID, 'base64').toString('utf8'),
  clientSecret: Buffer.from(secuUtil.kakaoClientSecret, 'base64').toString('utf8'),
  callbackURL: '/auth/kakao/callback'
}

const naverOptions = {
  clientID: Buffer.from(secuUtil.naverClientID, 'base64').toString('utf8'),
  clientSecret: Buffer.from(secuUtil.naverClientSecret, 'base64').toString('utf8'),
  callbackURL: '/auth/naver/callback'
}

module.exports.init = () => {
  passport.use(new KakaoStrategy(kakaoOptions, async(accessToken, refreshToken, profile, done) => {
    done(null, { type: 'kakao', token: accessToken, id: profile.id, username: profile.username, _json: profile._json })
  }))
  
  passport.use(new NaverStrategy(naverOptions, async(accessToken, refreshToken, profile, done) => {
    done(null, { type: 'naver', token: accessToken, id: profile.id, username: profile.name, _json: profile._json })
  }))
  
  passport.serializeUser((user, done) => { // login check
    done(null, user)
  })
  
  passport.deserializeUser((user, done) => { // login after check
    done(null, user)
  })
}