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

const express = require('express')
const { body, validationResult } = require('express-validator')

const gpsCtrl = require('../controllers/gpsCtrl')
const kakaoAuth = require('../controllers/kakaoAuth')
//const naverAuth = require('../controllers/naverAuth')
const sessionCtrl = require('../controllers/sessionCtrl')

const router = express.Router()

router.get('/sessionCheck', sessionCtrl.sessionCheck) // { islogin, isgps, isvote }

router.post('/gpsCheck', body('x').exists(), body('y').exists(), gpsCtrl.gpsCheck)

router.get('/kakao/login', kakaoAuth.loginCheck, kakaoAuth.login)
router.get('/kakao/logout', kakaoAuth.logoutCheck, kakaoAuth.logout)
router.get('/kakao/callback', kakaoAuth.loginCheck, kakaoAuth.callback)

//router.get('/naver/login', naverAuth.loginCheck, naverAuth.login)
//router.get('/naver/logout', naverAuth.logoutCheck, naverAuth.logout)
//router.get('/naver/callback', naverAuth.loginCheck, naverAuth.callback)

module.exports = router
