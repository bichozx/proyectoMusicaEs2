'use strict'

import { Schema, model } from 'mongoose';

const SongSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  numero: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  duracion: {
    type: String,
  },
  file: {
    type: String,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'AlbumMusica',
    required: [true, 'El álbum es obligatorio'],
  },
});

export default model('SongMusica2', SongSchema);