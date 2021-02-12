import { SubscribeUserControllerFactory } from '@infra/factories/controllers/SubscribeUserControllerFactory';
import { Router } from 'express';

const routes = Router();
const subscribeUserController = SubscribeUserControllerFactory();

routes.post('/subscribe', subscribeUserController.execute);

export default routes;
