'use strict';

import cors from 'cors';
import { dbConnection2 } from '../dataBaseDb/configDb.js';
import express from 'express';
import fileUpload from 'express-fileupload';

class Server2 {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3977; // Puerto por defecto 3977

    this.paths = {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      uploads: '/api/uploads',
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de la app
    this.routes();
  }

  async conectarDB() {
    await dbConnection2();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Lectura y parseo del body en formato x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true }));

    // Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  async routes() {
    this.app.use(this.paths.auth, (await import('../routes/authNewRoute.js')).default);
    this.app.use(
      this.paths.usuarios,
      (await import('../routes/userNewRoute.js')).default
    );
    // this.app.use(
    //   this.paths.uploads,
    //   (await import('../routes/upLoads.js')).default
    // );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto nuevo http://localhost:${this.port}`);
    });
  }
}

export default Server2;
