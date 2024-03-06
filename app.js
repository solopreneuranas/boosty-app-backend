var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var pool = require('./routes/pool');
pool();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var userRouter = require('./routes/user')
var companyRouter = require('./routes/company')
var addonsRouter = require('./routes/addons')
var ticketsRouter = require('./routes/tickets')
var adminRouter = require('./routes/admin')
var documentRouter = require('./routes/documents')
var mailroomRouter = require('./routes/mailroom')
var orderStatusRouter = require('./routes/orderStatus')
var graphRouter = require('./routes/graph')

var app = express();

// view engine setup
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter)
app.use('/company', companyRouter)
app.use('/addons', addonsRouter)
app.use('/tickets', ticketsRouter)
app.use('/admin', adminRouter)
app.use('/document', documentRouter)
app.use('/mailroom', mailroomRouter)
app.use('/orderstatus', orderStatusRouter)
app.use('/graph', graphRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
