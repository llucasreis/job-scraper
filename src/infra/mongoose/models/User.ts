import mongoose from 'mongoose';

interface UserAttrs {
  name: string;
  email: string;
  platform: 'kenoby' | 'gupy';
}

export interface UserDocument extends UserAttrs, mongoose.Document {}

export interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
