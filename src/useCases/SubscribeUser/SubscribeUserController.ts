import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SubscribeUser from './SubscribeUser';
import { SubscribeUserRequestDTO } from './SubscribeUserDTO';

export default class SubscribeUserController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const subscribeUser = container.resolve(SubscribeUser);

    const { name, email, platform } = req.body as SubscribeUserRequestDTO;

    const newUser = await subscribeUser.execute({ name, email, platform });

    return res.status(200).json(newUser);
  }
}
