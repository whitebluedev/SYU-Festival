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

module.exports.voteGPS = (req, res) => {
  res.render('gps')
}

module.exports.voteManager = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'msg': '로그인이 되어있지 않습니다.' })
    return
  }

  if (req.user.id != '2422524396' && req.user.id != '2438047578' && req.user.id != '2434729902'){ // admin kakao id
    res.status(401).json({ 'msg': '관리자 권한이 없습니다.' })
    return
  }

  let datas = {
    2422524396: '김상윤',
    2438047578: '임채진',
    2434729902: '김지윤'
  }

  res.render('vote', { info: datas[req.user.id] })
}

module.exports.status = (req, res) => {
  const setting = fs.readFileSync('/root/backend/setting.txt', 'utf8', () => {})
  res.status(200).json({ status: setting })
}

module.exports.statusDisable = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'msg': '로그인이 되어있지 않습니다.' })
    return
  }

  if (req.user.id != '2422524396' && req.user.id != '2438047578' && req.user.id != '2434729902'){ // admin kakao id
    res.status(401).json({ 'msg': '관리자 권한이 없습니다.' })
    return
  }

  fs.writeFileSync('/root/backend/setting.txt', 'disable', 'utf8', () => {})
  res.status(200).json({ 'msg': '정상적으로 처리가 되었습니다.'})
}

module.exports.statusEnable = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'msg': '로그인이 되어있지 않습니다.' })
    return
  }

  if (req.user.id != '2422524396' && req.user.id != '2438047578' && req.user.id != '2434729902'){ // admin kakao id
    res.status(401).json({ 'msg': '관리자 권한이 없습니다.' })
    return
  }

  fs.writeFileSync('/root/backend/setting.txt', 'enable', 'utf8', () => {})
  res.status(200).json({ 'msg': '정상적으로 처리가 되었습니다.'})
}

module.exports.statusResult = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'msg': '로그인이 되어있지 않습니다.' })
    return
  }

  if (req.user.id != '2422524396' && req.user.id != '2438047578' && req.user.id != '2434729902'){ // admin kakao id
    res.status(401).json({ 'msg': '관리자 권한이 없습니다.' })
    return
  }

  fs.writeFileSync('/root/backend/setting.txt', 'result', 'utf8', () => {})
  res.status(200).json({ 'msg': '정상적으로 처리가 되었습니다.'})
}

module.exports.voteGetAll = (req, res) => {
  mysql.getConnection((error, connection) => {
    if (error) throw error

    connection.query('SELECT * FROM vote', (error, results, fields) => {
      if (error) throw error

      connection.release()

      let voteData = {
        'vote_status': fs.readFileSync('/root/backend/setting.txt', 'utf8', () => {}),
        'date': loggerUtil.getYMD() + ' ' + loggerUtil.getHMS(),
        'vote_1': [],
        'vote_2': [],
        'vote_3': [],
        'vote_4': [],
        'vote_5': [],
        'vote_6': [],
        'vote_7': [],
        'vote_8': [],
        'vote_9': []
      }

      // TEST DATA
      // let voteData = {
      //   'vote_status': fs.readFileSync('/root/backend/setting.txt', 'utf8', () => {}),
      //   'date': loggerUtil.getYMD() + ' ' + loggerUtil.getHMS(),
      //   'vote_1': [{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},],
      //   'vote_2': [{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},],
      //   'vote_3': [{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},],
      //   'vote_4': [{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},],
      //   'vote_5': [{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},],
      //   'vote_6': [{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},],
      //   'vote_7': [{1: true},{1: true},],
      //   'vote_8': [{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},],
      //   'vote_9': [{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},{1: true},]
      // }

      //res.status(200).json(voteData)

      if (results.length <= 0){
        res.status(200).json(voteData)
        return
      }

      results.forEach(votes => {
        const users = JSON.parse(votes.users)
        for (let key in voteData){
          if (users.vote_id === key){
            voteData[key].push(users)
          }
        }
      })
      
      res.status(200).json(voteData)
    })
  })
}

module.exports.voteRemoveAll = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'msg': '로그인이 되어있지 않습니다.' })
    return
  }
  
  if (req.user.id != '2422524396' && req.user.id != '2438047578' && req.user.id != '2434729902'){ // admin kakao id
    res.status(401).json({ 'msg': '관리자 권한이 없습니다.' })
    return
  }

  mysql.getConnection((error, connection) => {
    if (error) throw error

    connection.query('update auth set vote = NULL', (error, results, fields) => {
      if (error) throw error
    })

    connection.query('truncate vote', (error, results, fields) => {
      if (error) throw error
    })

    connection.release()
  })

  res.status(200).json({ 'msg': '정상적으로 처리가 되었습니다.'})
}