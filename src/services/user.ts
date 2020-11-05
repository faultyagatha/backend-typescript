import User, { UserDocument } from '../models/User';

async function create(user: UserDocument): Promise<UserDocument> {
  return await user.save();
}

async function findById(userId: string): Promise<UserDocument> {
  const user = await User.findById(userId).exec(); // .exec() will return a true Promise
  if (!user) {
    throw new Error(`User ${userId} not found`);
  }
  return user;
}

async function findAll(): Promise<UserDocument[]> {
  return await User.find().sort({ email: 1 }).exec();
}

async function updateUser(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error(`User ${userId} not found`);
  return await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  }).exec();
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec();
}

async function updateProfile(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const user = await User.findById(userId).select('-password -passwordConfirm');
  if (!user) throw new Error(`User ${userId} not found`);
  if (update.firstName) {
    user.firstName = update.firstName;
  }
  if (update.lastName) {
    user.lastName = update.lastName;
  }
  if (update.email) {
    user.email = update.email;
  }

  return user.save();
}

export default {
  create,
  findById,
  findAll,
  updateUser,
  deleteUser,
  updateProfile
};
