'use strict'

import { response } from 'express';

const validarArchivoSubir2 = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msn: 'No files were uploaded. - validarArchivoSubir',
    });
    return;
  }
  next();
};

export {
  validarArchivoSubir2,
};
