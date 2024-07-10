'use strict'

import { request, response } from 'express';

import bcrypt from 'bcryptjs';
import userNewModel from '../models/userNewModel.js';

const userGet2 = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const [total, users] = await Promise.all([
    userNewModel.countDocuments(query),
    userNewModel.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const userPost2 = async (req = request, res = response) => {
  try {
    console.log('Body recibido:', req.body); // Verificar el cuerpo de la solicitud
    const { name, surname, email, password, rol } = req.body;
    console.log('Datos recibidos:', { name, surname, email, password, rol }); // Verificar los datos a extraer
    const user = new userNewModel({ name, surname, email, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente',
      user,
    });
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al guardar usuario',
      error: error.message,
    });
  }
};

const userPut2 = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, email, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    //Encontrar la contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const userUpdate = await userNewModel.findByIdAndUpdate(id, resto);

  res.json({
    msg: 'put Api',
    id,
    userUpdate,
  });
};

export {
  userGet2,
  userPost2,
  userPut2,
};
