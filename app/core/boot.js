/**
 * Load 'morgan' module for HTTP logging. Refer to the following link
 * for reference: https://github.com/expressjs/morgan
 */
var morgan = require('morgan');

/**
 * Load the 'path' module
 */
var path = require('path');
var cors = require('cors')

/**
 * Load the 'body-parser' module. This is basically used to parse data
 * from your forms (as well as any HTTP requests) when you submit them to
 * the server. Refer here: https://github.com/expressjs/body-parser
 */
var bodyParser = require('body-parser');

/**
 * Load the 'serve-static' module. This basically serves the asset files
 * (CSS and JS) that are required in the <head> tag. This can also serve
 * other assets such as media files (photos, music, PDFs, etc.) stored on
 * the server. Refer here: https://github.com/expressjs/serve-static
 */
var serveStatic = require('serve-static');

/**
 * Load the 'method-override' module. This basically enables us to programmatically
 * catch PUT and DELETE requests.
 */
var methodOverride = require('method-override');

/**
 * Load the 'express-session' module so the application can utilize web
 * sessions.
 */
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

/**
 * Export this module as a function accepting 'app', which is an
 * instance of an Express app defined from our main index file going through
 * the index of the 'app' directory, as the first parameter.
 */
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Strict-Transport-Security', '*');
  res.header('Content-Security-Policy', '*');
  res.header('X-Frame-Options', '*');
  res.header('X-Content-Type-Options', '*');
  res.header('Referrer-Policy', '*');
  res.header('Permissions-Policy', '*');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
const helmet = require("helmet");
module.exports = app => {
  /**
   * We are setting the port that the app will use, prioritizing the
   * first command line argument if present, then the value of PORT from
   * a .env file if present, and would default to 3000 in the absence
   * of both preceding values.
   */
  app.set('port', process.argv[2] || 3009 || 3000);

  app.use(cors())
  // app.use(helmet.contentSecurityPolicy());
  // app.use(helmet.dnsPrefetchControl());
  // app.use(helmet.expectCt());
  // app.use(helmet.frameguard());
  // app.use(helmet.hidePoweredBy());
  // app.use(helmet.hsts());
  // app.use(helmet.ieNoOpen());
  // app.use(helmet.noSniff());
  // app.use(helmet.permittedCrossDomainPolicies());
  // app.use(helmet.referrerPolicy());
  // app.use(helmet.xssFilter());
  app.use(allowCrossDomain);
  /**
   * We set the view (templating) engine as Pug
   * https://pugjs.org/api/getting-started.html
   */
  app.set('view engine', 'pug');

  app.locals.moment = require('moment');
  /**
   * We set the views directory. Where the application would start looking
   * for Pug files that should be rendered. Refer to notes below.
   * 
   * path.dirname() - returns the parent directory of the path you pass to it
   * as argument. https://nodejs.org/api/path.html#path_path_dirname_path
   */
  app.set('views', path.join(path.dirname(__dirname), 'modules'));

  /**
   * Anything beyond this comment are all called middlewares. Notice how we use
   * app.use() here but not define any routes, and instead use modules? That's
   * because this third-party modules created by other developers are also routes,
   * specifically called middlewares (we'll get to this later on). Refer to this
   * link for more info: https://expressjs.com/en/guide/using-middleware.html
   */

  /**
   * Use 'morgan' middleware for HTTP logging purposes
   */
  app.use(morgan('dev'));

  /**
   * Use the 'serve-static' middleware to catch requests for asset files and serve
   * them from the public folder. Notice the use of path.dirname()
   */
  app.use(serveStatic(path.join(path.dirname(path.dirname(__dirname)), 'public')));
  var sessionStore = new MySQLStore({
    port: 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Whether or not to automatically check for and clear expired sessions:
    clearExpired: true,
    // How frequently expired sessions will be cleared; milliseconds:
    checkExpirationInterval: 120000,
    // The maximum age of a valid session; milliseconds:
    expiration: 28800000,
    endConnectionOnClose: true
  });
  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'WQcptX3p4W',
    store: sessionStore
  }));

  /**
   * Here we use methodOverride middleware to allow X-HTTP requests, as well as
   * PUT and DELETE methods passed in as query string
   */
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(methodOverride('_method'));

  /**
   * Use 'body-parser' middleware to parse data coming from forms and other
   * types of requests (programmatically-made requests, later on this one).
   */

  var express = require('express');
  /** https://github.com/expressjs/body-parser#bodyparserjsonoptions */
  app.use(bodyParser.raw({ limit: "50mb", extended: true }));
  app.use(bodyParser.json({ limit: "50mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 500000}));
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 500000}));
  /** https://github.com/expressjs/body-parser#bodyparserurlencodedoptions */
  const router = express.Router();



}