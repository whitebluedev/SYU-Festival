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

const { body, validationResult } = require('express-validator')
 
const mysql = require('../config/mysql')
const loggerUtil = require('../utils/logger')

module.exports.vote = (req, res) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return param + ': ' + msg
  }
  
  const result = validationResult(req).formatWith(errorFormatter)
  
  if (!result.isEmpty()){
    res.status(401).json(result)
    return
  }

  const ids = req.body.ids

  const votes = {
    'vote_1': true,
    'vote_2': true,
    'vote_3': true,
    'vote_4': true,
    'vote_5': true,
    'vote_6': true,
    'vote_7': true,
    'vote_8': true,
    'vote_9': true
  }

  if (Array.isArray(ids) === false){
    res.status(401).json({ 'msg': '잘못된 요청입니다. (1)' })
    return
  }

  if (ids.length !== 2){
    res.status(401).json({ 'msg': '잘못된 요청입니다. (2)' })
    return
  }

  ids.forEach(vote => {
    if (typeof(votes[vote]) === 'undefined'){
      res.status(401).json({ 'msg': '잘못된 요청입니다. (3)' })
      return
    }
  })

  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'msg': '로그인이 되어있지 않습니다.' })
    return
  }

  if (req.user.isgps === false){
    res.status(401).json({ 'msg': '위치 인증이 되어있지 않습니다.' })
    return
  }

  if (req.user.isvote === true){
    res.status(401).json({ 'msg': '이미 투표를 했습니다.' })
    return
  }

  mysql.getConnection((error, connection) => {
    if (error) throw error

    connection.query('SELECT * FROM auth WHERE kakao_id = ?', [req.user.id], (error, results, fields) => {
      if (error) throw error
  
      if (results.length <= 0){
        connection.release()
        res.status(401).json({ 'msg': '본인 정보가 없습니다.' })
        return
      }

      ids.forEach(vote => {
        const user_ = {
          'kakao_id': req.user.id,
          'vote_id': vote,
          'date': loggerUtil.getYMD() + ' ' + loggerUtil.getHMS()
        }
  
        connection.query('INSERT INTO vote (users) VALUES (?)', [JSON.stringify(user_)], (error, results, fields) => {
          if (error) throw error
        })
      })

      const vote_ = {
        'vote_id': ids,
        'date': loggerUtil.getYMD() + ' ' + loggerUtil.getHMS()
      }

      connection.query('UPDATE auth SET vote = ? WHERE kakao_id = ?', [JSON.stringify(vote_), req.user.id], (error, results, fields) => {
        if (error) throw error
      })

      connection.release()

      req.user.isvote = true
      loggerUtil.getInfo('kakao ID: ' + '\x1b[93m' + req.user.id + '\x1b[0m' + ', vote completed')
      res.status(200).json({ 'msg': '투표가 정상적으로 처리되었습니다.' })
    })
  })
}