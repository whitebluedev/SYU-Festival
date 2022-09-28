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

const fs = require('fs')

const mysql = require('../config/mysql')
const loggerUtil = require('../utils/logger')

const isNumeric = (value) => {
  if (typeof value === 'number'){
    return value - value === 0
  }
  if (typeof value === 'string' && value.trim() !== ''){
    return Number.isFinite ? Number.isFinite(+value) : isFinite(+value)
  }
  return false
}

// voteUserCtrl.js
// voteAdminCtrl.js

module.exports.vote = (req, res) => {
  const id = req.params.id
  const vote_tables = {
    1: 'vote_1',
    2: 'vote_2',
    3: 'vote_3',
    4: 'vote_4',
    5: 'vote_5',
    6: 'vote_6',
    7: 'vote_7',
    8: 'vote_8',
    9: 'vote_9'
  }

  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'msg': '로그인이 되어있지 않습니다.' })
    return
  }

  if (!isNumeric(id)){
    res.status(401).json({ 'msg': '잘못된 get 요청입니다. (1)' })
    return
  }

  if (typeof(vote_tables[id]) === 'undefined'){
    res.status(401).json({ 'msg': '잘못된 get 요청입니다. (2)' })
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
        res.status(401).json({ 'msg': '정보가 없습니다.' })
        return
      }

      const vote = {
        'vote_id': vote_tables[id],
        'date': loggerUtil.getYMD() + ' ' + loggerUtil.getHMS()
      }

      connection.query('UPDATE auth SET vote = ? WHERE kakao_id = ?', [JSON.stringify(vote), req.user.id], (error, results, fields) => {
        if (error) throw error
      })

      const user = {
        'kakao_id': req.user.id,
        'date': loggerUtil.getYMD() + ' ' + loggerUtil.getHMS()
      }

      connection.query('INSERT INTO ?? (users) VALUES (?)', [vote_tables[id], JSON.stringify(user)], (error, results, fields) => {
        if (error) throw error
  
        connection.release()
      })

      req.user.isvote = true
      res.status(200).json({ 'msg': '투표가 정상적으로 처리되었습니다.' })
    })
  })
}