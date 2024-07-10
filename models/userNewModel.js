'use strict';

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserMusicaSchema2 = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  surname: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ['MUSICO_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// UserMusicaSchema.methods.toJSON = function () {
//   const { __v, password, _id, ...user } = this.toObject();
//   user.uuid = _id;
//   return user;
// };

export default model('UserMusica2', UserMusicaSchema2);