import { Router } from 'express';
import SubscribeUserController from '../../useCases/SubscribeUser/SubscribeUserController';

const routes = Router();
const subscribeUserController = new SubscribeUserController();

routes.post('/subscribe', subscribeUserController.execute);

export default routes;
