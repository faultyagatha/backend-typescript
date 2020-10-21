import bcrypt from 'bcrypt'

const users = [
  {
    email: 'admin@test.com',
    firstName: 'Motoko',
    lastName: 'Kusanagi',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    email: 'test@test.com',
    firstName: 'Daisuke',
    lastName: 'Aramaki',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    email: 'test1@test.com',
    firstName: 'Batou',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    email: 'test3@test.com',
    firstName: 'Togusa',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users