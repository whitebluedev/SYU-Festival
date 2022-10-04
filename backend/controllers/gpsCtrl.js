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
const request = require('request-promise')

const secuUtil = require('../utils/secu')
const loggerUtil = require('../utils/logger')

module.exports.gpsCheck = async(req, res) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return param + ': ' + msg
  }
  
  const result = validationResult(req).formatWith(errorFormatter)
  
  if (!result.isEmpty()){
    res.status(401).json(result)
    return
  }

  const { x, y } = req.body

  if (typeof(req.user) === 'undefined'){
    res.status(401).json({ 'msg': '로그인이 되어있지 않습니다.' })
    return
  }
  
  const option = {
    uri: 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=' + x + '&y=' + y,
    method: 'POST',
    headers: {
      'Authorization' : 'KakaoAK ' + Buffer.from(secuUtil.kakaoClientID, 'base64').toString('utf8')
    },
    json: true
  }
  
  await request(option)
  .then((body) => {
    if (body.documents[0].address_name != '서울특별시 노원구 공릉동'){
      req.user.isgps = false
      loggerUtil.getInfo('kakao ID: ' + '\x1b[93m' + req.user.id + '\x1b[0m' + ', gps failed, ' + body.documents[0].address_name)
      res.status(400).json({ 'msg': '위치 인증에 실패했습니다.' })
      return
    }
    
    req.user.isgps = true
    loggerUtil.getInfo('kakao ID: ' + '\x1b[93m' + req.user.id + '\x1b[0m' + ', gps completed, ' + body.documents[0].address_name)
    res.status(200).json({ 'msg': '정상적으로 처리가 되었습니다.'})
  })
  .catch((error) => {
    req.user.isgps = false
    loggerUtil.getInfo('kakao ID: ' + '\x1b[93m' + req.user.id + '\x1b[0m' + ', gps failed')
    res.status(400).json({ 'msg': '위치 인증에 실패했습니다.' })
  })
}
