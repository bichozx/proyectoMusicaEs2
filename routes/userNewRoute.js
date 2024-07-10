'use strict'

import { isEmailValidate2, isValidateId2 } from '../helpers/db-NewValidator.js';
import { userGet2, userPost2, userPut2 } from '../controllers/userNewControll.js';

import { Router } from 'express';
import { check } from 'express-validator';
import { validateElements2 } from '../middlewares/validateNewElements.js';

const router = Router();

router.get('/', userGet2);

router.post('/register', 
[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y debe ser más de 6 letras')
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
  check('email').custom(isEmailValidate2),

  // check('rol').custom(isRoleValidate),
  validateElements2,
],
userPost2
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidateId2),
    // check('rol').custom(/* isRoleValidate */),
    validateElements2,
  ],
  userPut2
);

export default router;
