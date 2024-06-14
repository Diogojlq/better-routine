const express = require("express");
const registerRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

registerRouter.post('/', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10)
    try {
      const newRegister = await prisma.User.create({
        data: {
          name,
          email,
          password
        }
      });
      console.log('New user created:', newRegister);
      res.json({ mensagem: 'Sucessful user registration' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ erro: 'An error ocurred while creating the user.' });
    }
});

module.exports = registerRouter;