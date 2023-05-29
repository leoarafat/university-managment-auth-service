import config from '../../../config'
import { IUser } from './users.interface'
import User from './users.model'
import { generateUserId } from './users.utils'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  //Need a incremental unique id
  const id = await generateUserId()
  user.id = id
  //Need a default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const newUser = await User.create(user)
  if (!newUser) {
    throw new Error('Failed to create user')
  }
  return newUser
}
