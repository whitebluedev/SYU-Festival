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
const fetch = require('node-fetch') /** 2.6.6 */
const requestIp = require('request-ip')

const VERSION = '1.0v'

const getInfo = (content) => {
  writeLog(prefix() + ' ' + content)
}

const writeLog = (content) => {
  const path =  './log/' + getYMD() + '.txt'
  
  if (!fs.existsSync('./log')){
    fs.mkdirSync('./log', (error) => {
      if (error) throw error
    })
  }
  
  if (!fs.existsSync(path)){
    fs.open(path, 'w', (error, fd) => {
      if (error) throw error
    })
  }
  
  fs.appendFile(path, content + "\n", (error) => {
    if (error) throw error
  })
  
  console.log(content)
}

const getClientCountry = async(ip) => {
  try{
    const response = await fetch('http://ip-api.com/json/' + ip)
    const json = await response.json()
    getInfo('country: ' + json['country'])
  }catch(error){
    getInfo(error)
  }finally{
  }
}

const getYMD = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)
  return year + '-' + month + '-' + day
}

const getHMS = () => {
  const today = new Date()
  const hours = ('0' + today.getHours()).slice(-2)
  const minutes = ('0' + today.getMinutes()).slice(-2)
  const seconds = ('0' + today.getSeconds()).slice(-2)
  return hours + ':' + minutes + ':' + seconds
}

const prefix = () => {
  return '[' + getYMD() + ' ' + getHMS() + ']'
}

const getLogo = () => {
  let logo = ''
  logo += "\n"
  logo += "\n"
  logo += "           888                                               .d8888b.   .d8888b.  " + "\n"
  logo += "         888                                               d88P  Y88b d88P  Y88b " + "\n"
  logo += "        888                                                     .d88P 888        " + "\n"
  logo += "    .d88888  .d88b.  888  888        888  888 .d8888b         8888\"  888d888b.  " + "\n"
  logo += "  d88\" 888 d8P  Y8b 888  888       888  888 88K               \"Y8b. 888P \"Y88b " + "\n"
  logo += " 888  888 88888888 Y88  88P      888  888 \"Y8888b.      888    888 888    888 " + "\n"
  logo += " Y88b 888 Y8b.      Y8bd8P       Y88b 888      X88      Y88b  d88P Y88b  d88P " + "\n"
  logo += " \"Y88888  \"Y8888    Y88P         \"Y88888  88888P'       \"Y8888P\"   \"Y8888P\"  " + "\n"
  logo += "                                    888                                       " + "\n"
  logo += "                              Y8b d88P                                       " + "\n"
  logo += "                               \"Y88P\"                                        " + "\n"
  
  getInfo(logo)
  getInfo('Version: ' + VERSION)
  getInfo('Author: dev-ys-36 / https://github.com/dev-ys-36')
}

const userInfo = (req) => {
  getInfo('client IP: ' + '\x1b[90m' + requestIp.getClientIp(req) + '\x1b[0m' + ' | url: ' + '\x1b[32m' + req.originalUrl + '\x1b[0m')
  //getClientCountry(requestIp.getClientIp(req))
}

module.exports.getInfo = getInfo
module.exports.getYMD = getYMD
module.exports.getHMS = getHMS
module.exports.getLogo = getLogo
module.exports.userInfo = userInfo