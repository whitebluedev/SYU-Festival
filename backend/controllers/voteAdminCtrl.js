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

module.exports.voteManager = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'status': 401 })
    return
  }

  if (req.user.id != '2422524396'){ // admin kakao id
    res.status(401).json({ 'status': 401 })
    return
  }

  res.render('vote')
}

module.exports.status = (req, res) => {
  const setting = fs.readFileSync('/root/backend/setting.txt', 'utf8', () => {})

  res.status(200).json({ status: setting })
}

module.exports.statusDisable = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'status': 401 })
    return
  }

  if (req.user.id != '2422524396'){ // admin kakao id
    res.status(401).json({ 'status': 401 })
    return
  }

  fs.writeFileSync('/root/backend/setting.txt', 'disable', 'utf8', () => {})

  res.status(200).json({})
}

module.exports.statusEnable = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'status': 401 })
    return
  }

  if (req.user.id != '2422524396'){ // admin kakao id
    res.status(401).json({ 'status': 401 })
    return
  }

  fs.writeFileSync('/root/backend/setting.txt', 'enable', 'utf8', () => {})

  res.status(200).json({})
}

module.exports.statusResult = (req, res) => {
  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'status': 401 })
    return
  }

  if (req.user.id != '2422524396'){ // admin kakao id
    res.status(401).json({ 'status': 401 })
    return
  }

  fs.writeFileSync('/root/backend/setting.txt', 'result', 'utf8', () => {})

  res.status(200).json({})
}

module.exports.voteGetAll = (req, res) => {
  mysql.getConnection((error, connection) => {
    if (error) throw error

    connection.query('SELECT * FROM vote', (error, results, fields) => {
      if (error) throw error

      connection.release()

      let voteData = {
        'vote_1': [],
        'vote_2': [],
        'vote_3': [],
        'vote_4': [],
        'vote_5': [],
        'vote_6': [],
        'vote_7': [],
        'vote_8': [],
        'vote_9': [],
      }

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

  res.status(200).json({})
}