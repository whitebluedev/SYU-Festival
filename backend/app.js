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

const HTTP_PORT = 1234

const express = require('express')
const expressSession = require('express-session')
const http = require('http')
const logger = require('morgan')
const passport = require('passport')

const authConfig = require('./config/auth')
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const loggerUtil = require('./utils/logger')
const secuUtil = require('./utils/secu')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(expressSession({
  secret: Buffer.from(secuUtil.sessionSecret, 'base64').toString('utf8'),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 12 // 12 hours
  }
}))

authConfig.init()

app.use(passport.initialize())
app.use(passport.session())

app.use('/', express.static(__dirname + '/public'))
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('*', (req, res) => { res.status(404).send('404') })

http.createServer(app).listen(HTTP_PORT, '0.0.0.0')

loggerUtil.getLogo()