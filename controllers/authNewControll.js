'use strict'

// import User from '../models/userMusica.js';
import bcrypt from 'bcryptjs';
import { generarJWT2 } from '../helpers/generarNewJwt.js';
import { googleVerify2 } from '../helpers/google-NewVerify.js';
import { response } from 'express';
import userNewModel from '../models/userNewModel.js';

const login3 = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    console.log('Email recibido:', email); // Verificar el email recibido
    console.log('Password recibido:', password); // Verificar la contraseña recibida

    //Verificar si el usuario existe
    const users = await userNewModel.findOne({ email });
    if (!users) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo',
      });
    }

    //Si el usuario esta activo
    if (!users.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado:false',
      });
    }

    //Verificar contraseña
    const validatePassword = bcrypt.compareSync(password, users.password);
    if (!validatePassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      });
    }

    // Generar Jwt
    const token = await generarJWT2(users.id);

    res.json({
      users,
      token,
      msg: 'login ok',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el el administrador',
    });
  }
};

const googleSingIn3 = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, name, img } = await googleVerify2(id_token);

    let users = await User.findOne({ email });

    if (!users) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true,
      };

      users = new User(data);
      await users.save();
    }

    // Si el usuario en DB
    if (!users.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado',
      });
    }

    // Generar el JWT
    const token = await generarJWT2(users.id);

    res.json({
      users,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Token de Google no es válido',
    });
  }
};

export {
  login3,
  googleSingIn3,
};
