import { Schema, model } from 'mongoose';

import { hendleSaveError, setUpdateOptions } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sessionSchema.post('save', hendleSaveError);

sessionSchema.post('findOneAndUpdate', hendleSaveError);

sessionSchema.pre('findOneAndUpdate', setUpdateOptions);

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;
