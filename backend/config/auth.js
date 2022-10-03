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

const requestIp = require('request-ip')

const mysql = require('../config/mysql')
const loggerUtil = require('../utils/logger')

const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy

const secuUtil = require('../utils/secu')

const kakaoOptions = {
  clientID: Buffer.from(secuUtil.kakaoClientID, 'base64').toString('utf8'),
  clientSecret: Buffer.from(secuUtil.kakaoClientSecret, 'base64').toString('utf8'),
  callbackURL: '/auth/kakao/callback',
  passReqToCallback: true
}

module.exports.init = () => {
  passport.use(new KakaoStrategy(kakaoOptions, async(req, accessToken, refreshToken, profile, done) => {

    mysql.getConnection((error, connection) => {
      if (error) throw error

      connection.query('SELECT * FROM auth WHERE kakao_id = ?', [profile.id], (error, results, fields) => {
        if (error) throw error

        let sessionData = {
          type: 'kakao',
          token: accessToken,
          id: profile.id,
          username: profile.username,
          isgps: false,
          isvote: false
        }

        const date = loggerUtil.getYMD() + ' ' + loggerUtil.getHMS()
        const ip = requestIp.getClientIp(req)
    
        if (results.length <= 0){
          connection.query('INSERT INTO auth (kakao_id, kakao_name, first_date, last_date, first_ip, last_ip) VALUES (?, ?, ?, ?, ?, ?)', [profile.id, profile.username, date, date, ip, ip], (error, results, fields) => {
            if (error) throw error

            connection.release()
          })
          return
        }

        if (results[0].vote !== null){
          sessionData.isvote = true
        }

        connection.query('UPDATE auth SET last_date = ?, last_ip = ? WHERE kakao_id = ?', [date, ip, profile.id], (error, results, fields) => {
          if (error) throw error

          connection.release()
        })
        done(null, sessionData)
      })
    })
  }))
  
  passport.serializeUser((sessionData, done) => {
    loggerUtil.getInfo('kakao ID: ' + '\x1b[93m' + sessionData.id + '\x1b[0m' + ', kakao login completed')
    done(null, sessionData)
  })
  
  passport.deserializeUser((sessionData, done) => {
    done(null, sessionData)
  })
}