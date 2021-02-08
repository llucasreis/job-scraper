import { UserDocument } from '../mongoose/models/User';
import { SubscribeUserRequestDTO } from '../../useCases/SubscribeUser/SubscribeUserDTO';

export default interface UsersRepository {
  subscribe(data: SubscribeUserRequestDTO): Promise<UserDocument>;
}
