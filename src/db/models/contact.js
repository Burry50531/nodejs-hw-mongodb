import { Schema, model } from 'mongoose';

export const contactSortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      index: true, 
    },
  },
  {
    timestamps: true,   
    versionKey: false,  
  },
);

const ContactCollection = model('contacts', contactSchema);

export default ContactCollection;