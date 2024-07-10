'use strict'

import userNewModel from '../models/userNewModel.js';

// const isRoleValidate = async (rol = '') => {
//   const existRol = await findOneRole({ rol });
//   if (!existRol) {
//     throw new Error(`El rol ${rol} no está registrado en la base de datos`);
//   }
// };

const isEmailValidate2 = async (email = '') => {
  const existEmail = await userNewModel.findOne({ email });
  if (existEmail) {
    throw new Error(`El email ${email} ya existe`);
  }
};

const isValidateId2 = async (id = '') => {
  const existId = await userNewModel.findById(id);
  if (!existId) {
    throw new Error(`El id ${id} no existe`);
  }
};

// const existeCategoriaPorId = async (id = '') => {
//   const existCategoria = await Categoria.findById(id);
//   if (!existCategoria) {
//     throw new Error(`El id ${id} no existe`);
//   }
// };

// const existeProductoPorId = async (id = '') => {
//   const existProducto = await Producto.findById(id);
//   if (!existProducto) {
//     throw new Error(`El id ${id} no existe`);
//   }
// };

// const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
//   const incluida = colecciones.includes(coleccion);

//   if (!incluida) {
//     throw new Error(
//       `La colección ${coleccion} no es permitida, colecciones permitidas: ${colecciones}`
//     );
//   }
//   return true;
// };

export {
  // isRoleValidate,
  isEmailValidate2,
  isValidateId2,
  // existeCategoriaPorId,
  // existeProductoPorId,
  // coleccionesPermitidas,
};
