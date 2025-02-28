'use strict'

const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo2 = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1].toLowerCase();

    // Validar la extensión
    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../upLoads/', carpeta, nombreTemp);

    // Mover el archivo al directorio de uploads
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      // Devolver el nombre del archivo subido
      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo2,
};
