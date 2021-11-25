import mongoose from 'mongoose';
import { AccountRolesEnum } from '../../domain/enums/account';
import BycryptHelper from '../../utilities/bcrypt-helper';

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: AccountRolesEnum[];
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, min: 6, max: 64 },
    avatar: { type: String },
    role: {
      type: [String],
      default: [AccountRolesEnum.SUBSCRIBER],
      enum: [
        AccountRolesEnum.SUBSCRIBER,
        AccountRolesEnum.INSTRUCTOR,
        AccountRolesEnum.ADMIN
      ]
    }
  },
  { timestamps: true }
);

// Encrypt user password before saving
UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    // hash user password
    const password = await BycryptHelper.encryptPassword(this.get('password'));
    this.set({ password });
  }
});

// Encrypt user password if password is updated
UserSchema.pre('findOneAndUpdate', async function (this) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates = { ...this.getUpdate() } as any;
  if (updates.$set.password) {
    this.findOneAndUpdate(
      {},
      { password: await BycryptHelper.encryptPassword(this.get('password')) }
    );
  }
});

export default mongoose.model<UserDocument>('User', UserSchema);
