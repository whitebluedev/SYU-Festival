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

module.exports.kakaoClientID = '220de28dc17371d455e627e1f440924c'
module.exports.kakaoClientSecret = ''
module.exports.naverClientID = 'r61oHeThSeN_fa2_eofN'
module.exports.naverClientSecret = 'GQlWWJzE2m'

module.exports.init = () => {
  passport.use(new KakaoStrategy({
    clientID: this.kakaoClientID,
    clientSecret: this.kakaoClientSecret,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    done(null, { type: 'kakao', token: accessToken, id: profile.id, username: profile.username, _json: profile._json })
  }))
  
  passport.use(new NaverStrategy({
    clientID: this.naverClientID,
    clientSecret: this.naverClientSecret,
    callbackURL: '/auth/naver/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    done(null, { type: 'naver', token: accessToken, id: profile.id, username: profile.name, _json: profile._json })
  }))
  
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  
  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })
}