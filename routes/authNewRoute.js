'use strict'

import { googleSingIn3, login3 } from '../controllers/authNewControll.js';

import { Router } from 'express';
import { check } from 'express-validator';
import { validateElements2 } from '../middlewares/validateNewElements.js';

const router = Router();

router.post(
  '/login',
  [
    check('password', 'El password es obligatorio y debe ser más de 6 letras')
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validateElements2,
  ],
  login3
);

router.post(
  '/google',
  [
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validateElements2,
  ],
  googleSingIn3
);

export default router;
