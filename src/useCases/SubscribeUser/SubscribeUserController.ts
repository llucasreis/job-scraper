import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SubscribeUserUseCase from './SubscribeUserUseCase';
import { SubscribeUserRequestDTO } from './SubscribeUserDTO';

export default class SubscribeUserController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(SubscribeUserUseCase);

    const { name, email, platform } = req.body as SubscribeUserRequestDTO;

    const newUser = await useCase.execute({
      name,
      email,
      platform,
    });

    return res.status(200).json(newUser);
  }
}
