/**
 * Created by Note on 30.04.2015.
 */


var createRouter = require('./createHero');
var humanRouter = require('./humanRouter');
var necroRouter = require('./necroRouter');
var mimoRouter = require('./mimo'); //роутер для не валідних запитів



module.exports = function (app){

          function errHandler(err, req, res, next) {
          var status = err.status || 500;
          var message;
          if (process.env.NODE_ENV === 'development') {
               message = err.message + '\n\r ' + err.stack;
          } else {
               message = err.message;
          }
          //ToDo check env production || development

          res.status(status).send(message);
          console.log(message);
          };


     app.use('/create', createRouter);
     app.use('/human', humanRouter);
     app.use('/necromant', necroRouter);
     app.use('*', mimoRouter);

     app.use(errHandler);




};