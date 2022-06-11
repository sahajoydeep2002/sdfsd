const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = express.Router();
const cors = require('cors');

// Initialize dotenv
dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const featuresRouter = require('./routes/features');

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/features', featuresRouter);
app.use('/api', router);
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Not Found',
  });
});

module.exports = app;
