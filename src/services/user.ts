import User, { UserDocument } from '../models/User'

function create(user: UserDocument): Promise<UserDocument> {
  return user.save()
}

function findById(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec() // .exec() will return a true Promise
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      return user
    })
}

function findAll(): Promise<UserDocument[]> {
  return User.find().sort({ email: 1 }).exec() // Return a Promise
}

function updateUser(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const user = User.findById(userId)
  if (!user) throw new Error(`User ${userId} not found`)

  return User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  }).exec()
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec()
}

function updateProfile(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const user = User.findById(userId)
  if (!user) throw new Error(`User ${userId} not found`)

  return User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  }).exec()
}

//don't delete from the DB but only set active to false
function deleteProfile(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndUpdate(userId, { active: false }).exec()
}

export default {
  create,
  findById,
  findAll,
  updateUser,
  deleteUser,
  updateProfile,
  deleteProfile,
}
