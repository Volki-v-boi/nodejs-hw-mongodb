import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    gender: String,

    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    // versiooKey: false,
    timestamps: true,
  },
);

const StudentCollection = model('student', studentSchema);

export default StudentCollection;
