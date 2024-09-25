import { Schema, model } from 'mongoose';

import { hendleSaveError, setUpdateOptions } from './hooks.js';

import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      Math: emailRegexp,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', hendleSaveError);

userSchema.post('findOneAndUpdate', hendleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateOptions);

const UserCollection = model('user', userSchema);

export default UserCollection;
