const md5 = require('md5');
const { User } = require('../database/models');
const { AppError } = require('../errors/AppError');
const { create: createToken } = require('../auth/jwtFunctions');

const login = async ({ email, password }) => {
  const user = { email, password: md5(password) };
  const userExists = await User.findOne({ where: { ...user } });
  if (!userExists) {
    throw new AppError(404, 'Not found');
  }
  console.log(userExists.dataValues);
  const token = createToken(userExists.id, email);
  return { user: { ...userExists.dataValues, token } };
};

const create = async ({ name, email, password, role }) => {
  // adicionar validação de nome, senha e email
  if (name.length < 12) {
    throw new AppError(400, 'name should have at least 12 characters');
  }
  const userRole = (role === undefined) ? 'customer' : role;
  const user = { name, email, password: md5(password), role: userRole };
  const userExists = await User.findOne({ where: { ...user } });
  if (userExists) {
    throw new AppError(409, 'User already registered');
  }
  const newUser = await User.create({ name, email, password: md5(password), role: userRole });
  const token = createToken(newUser.id, email);
  return token;
};

const getByEmail = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  console.log(user.dataValues);
  return user.dataValues;
};

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  login,
  create,
  getByEmail,
  getUsers,
  deleteUser,
};
