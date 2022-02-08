// const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const usersService = require('../services/usersService');

// const secret = process.env.SECRET || 'secret'; 

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.login({ email, password });
  res.status(200).json(user);
});

const create = rescue(async (req, res) => {
  const { name, email, password, role } = req.body;
  const token = await usersService.create({ name, email, password, role });
  req.headers.authorization = token;
  res.status(201).send({ token });
});

const getByEmail = rescue(async (req, res) => {
  const { email } = req.params;
  // console.log('cont', req.params);
  const user = await usersService.getByEmail({ email });
  console.log(user);
  res.status(201).send(user);
});

const getUsers = async (_req, res) => {
  const users = await usersService.getUsers();
  return res.status(200).json(users);
};

const removeOne = async (req, res) => {
  const { id } = await req.body;
  // console.log('req.body', req.body);
  await usersService.deleteUser(id);
  res.status(200).json({ message: 'User deleted successfully' });
};

module.exports = {
  login,
  create,
  getByEmail,
  getUsers,
  removeOne,
};
