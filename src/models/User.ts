import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
// import crypto from 'crypto'

export type UserDocument = Document & {
  googleId: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  products: mongoose.Types.ObjectId[];
  isCorrectPassword(
    candidatePassword: string
  ): Promise<boolean>;
};

const userSchema = new mongoose.Schema<UserDocument>({
  googleId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 3, // TODO: change for deployment (now it's for testing) 
    select: false, //never show a password in the output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

/** pre-save middleware will automatically run right before a new Document is saved */
//encrypt user's password
userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

/** pre-query middleware will automatically run right before a query is executed */
userSchema.pre<mongoose.Query<any>>(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre<mongoose.Query<any>>(/^find/, function (next) {
  this.populate({
    path: 'products',
    select: '-__v -users', //remove fields I don't want to show
  });
  next();
});

/** pre-validate middleware will automatically run to check the passwords match */
userSchema.pre<UserDocument>('validate', function (next) {
  if (this.password !== this.passwordConfirm) {
    this.invalidate('passwordConfirm', 'entered the same password');
  }
  next();
});

/** add instance methods to userSchema. */
userSchema.methods.isCorrectPassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<UserDocument>('User', userSchema);
