import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //Need a incremental unique id
  const id = await generateUserId();
  user.id = id;
  //Need a default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const newUser = await User.create(user);
  if (!newUser) {
    throw new ApiError(404, 'Failed to create user');
  }
  return newUser;
};
export const UserService = {
  createUser,
};
