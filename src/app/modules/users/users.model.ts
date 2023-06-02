import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

//For statics
type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// const UserModel = model<IUser>('User', userSchema)
//Statics
const User = model<IUser, UserModel>('User', userSchema)

export default User