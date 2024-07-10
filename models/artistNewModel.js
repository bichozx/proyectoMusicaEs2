'use strict'

import { Schema, model } from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  descripcion: {
    type: String,
  },
  img: {
    type: String,
  },
});

export default model('ArtistMusica2', ArtistSchema);
