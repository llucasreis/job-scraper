import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());

app.get('/', (_req, _res) => {
  console.log('hello world');
});

app.use(routes);

export default app;
