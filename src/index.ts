import 'reflect-metadata';
import 'dotenv/config';
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

    app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

run();
