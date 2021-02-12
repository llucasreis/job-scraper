import { Request, Response } from 'express';
import SubscribeUserUseCase from './SubscribeUserUseCase';
import { SubscribeUserRequestDTO } from './SubscribeUserDTO';

export default class SubscribeUserController {
  constructor(private useCase: SubscribeUserUseCase) {}

  public async execute(req: Request, res: Response): Promise<Response> {
    const { name, email, platform } = req.body as SubscribeUserRequestDTO;

    const newUser = await this.useCase.execute({
      name,
      email,
      platform,
    });

    return res.status(200).json(newUser);
  }
}
