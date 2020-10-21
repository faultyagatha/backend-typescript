import User, { UserDocument } from '../models/User'

async function create(user: UserDocument): Promise<UserDocument> {
  return await user.save()
}

async function findById(userId: string): Promise<UserDocument | null> {
  const user = await User.findById(userId).exec() // .exec() will return a true Promise
  if (!user) {
    throw new Error(`User ${userId} not found`)
  }
  return user
}

async function findAll(): Promise<UserDocument[]> {
  return await User.find().sort({ email: 1 }).exec() // Return a Promise
}

async function updateUser(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const user = await User.findById(userId).select('-password')
  if (!user) throw new Error(`User ${userId} not found`)
  return await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  }).exec()
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec()
}

async function updateProfile(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const user = await User.findById(userId).select('-password')
  if (!user) throw new Error(`User ${userId} not found`)

  update.isAdmin = user.isAdmin
  update.products = user.products

  return await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  }).exec()
}

export default {
  create,
  findById,
  findAll,
  updateUser,
  deleteUser,
  updateProfile
}
