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

module.exports.sessionCheck = (req, res) => {
  if (typeof(req.user) !== 'undefined'){
    if (req.user.isvote === true){
      mysql.getConnection((error, connection) => {
        if (error) throw error
  
        connection.query('SELECT * FROM auth WHERE kakao_id = ?', [req.user.id], (error, results, fields) => {
          if (error) throw error

          connection.release()

          if (results[0].vote === null){
            req.user.isvote = false
          }

          let sessionData = {
            islogin: true,
            isgps: req.user.isgps,
            isvote: req.user.isvote,
            vote_status: fs.readFileSync('/root/backend/setting.txt', 'utf8', () => {})
          }

          res.status(200).json(sessionData)
        })
      })
    }else{
      let sessionData = {
        islogin: true,
        isgps: req.user.isgps,
        isvote: req.user.isvote,
        vote_status: fs.readFileSync('/root/backend/setting.txt', 'utf8', () => {})
      }

      res.status(200).json(sessionData)
    }
  }else{
    let sessionData = {
      islogin: false,
      isgps: false,
      isvote: false,
      vote_status: fs.readFileSync('/root/backend/setting.txt', 'utf8', () => {})
    }
    
    res.status(200).json(sessionData)
  }
}
