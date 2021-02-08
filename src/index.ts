import 'reflect-metadata';
import 'dotenv/config';
import './container';
import mongoose from 'mongoose';
import app from './infra/http/app';

const port = process.env.PORT || 3333;

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

run();