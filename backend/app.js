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
const expressSession = require('express-session');
const http = require('http')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/authRoute')

const mainLogger = require('./utils/mainLogger')

const app = express()

const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy //todo
const NaverStrategy = require('passport-naver-v2').Strategy //todo

passport.use(new KakaoStrategy({
  clientID: '220de28dc17371d455e627e1f440924c', //key
  callbackURL: '/auth/kakao/callback',
}, async (accessToken, refreshToken, profile, done) => {
  done(null, { token: accessToken, id: profile.id, username: profile.username, _json: profile._json})
}))

passport.use(new NaverStrategy({
  clientID: 'r61oHeThSeN_fa2_eofN', //key
  clientSecret: 'GQlWWJzE2m',
  callbackURL: '/auth/naver/callback',
}, async (accessToken, refreshToken, profile, done) => {
  console.log(accessToken)
  console.log(profile)
  done(null, { token: accessToken, id: profile.id, username: profile.username, _json: profile._json})
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(expressSession({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 12 // 12 hours
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', express.static(__dirname + '/public'))
app.use('/', indexRouter)
app.use('/auth', authRouter)

app.use('*', (req, res) => {
  res.status(404).send('404')
})

http.createServer(app).listen(HTTP_PORT, '0.0.0.0')

mainLogger.getLogo()