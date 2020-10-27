import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';
import cors from 'cors';

import { MONGODB_URI } from './util/secrets';

import productRouter from './routers/product';
import userRouter from './routers/user';

import apiErrorHandler from './middlewares/apiErrorHandler';

const app = express();
const mongoUrl = MONGODB_URI;

mongoose.Promise = bluebird;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    );
    process.exit(1);
  });

// Express configuration
app.set('port', process.env.PORT || 5000);

// Use common 3rd-party middlewares
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(passport.initialize());
app.use(passport.session());

// Use routers
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);


// Custom API error handler
app.use(apiErrorHandler);


export default app;
