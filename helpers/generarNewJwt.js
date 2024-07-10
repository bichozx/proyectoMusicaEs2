'use strict'

import jwt from 'jsonwebtoken';

const generarJWT2 = async (uuid = '') => {
  try {
    const payload = { uuid };
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.SECRETORPRIVATEKEY,
        { expiresIn: '4h' },
        (err, token) => {
          if (err) {
            console.log(err);
            reject('No se pudo generar el token');
          } else {
            resolve(token);
          }
        }
      );
    });
    return token;
  } catch (error) {
    console.error('Error al generar JWT:', error);
    throw new Error('No se pudo generar el token');
  }
};

export {
  generarJWT2,
};
