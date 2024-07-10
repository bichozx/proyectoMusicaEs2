'use strict'

import mongoose from 'mongoose';

const PORT = process.env.Port2 || 9000;

const dbConnection2 = async () => {
  
  try {
    await mongoose.connect(process.env.dbURI, {
      
    });
    console.log('Base de datos en línea para música2');
  } catch (error) {
    console.error(error);
    throw new Error('Error al conectar con la base de datos');
  }
};

export { dbConnection2 };