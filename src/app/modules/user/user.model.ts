import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

// Define the Mongoose Schema corresponding to the IUser interface
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique email
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, enum: ['admin', 'user'] },
    address: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
// Hide the password field when converting the document to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model<TUser>('User', userSchema);
