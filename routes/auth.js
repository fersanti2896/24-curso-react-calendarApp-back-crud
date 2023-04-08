const { Router } = require('express');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/authController');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

router.post(
    '/new', 
    [ check('name', 'El nombre es obligatorio.').not().isEmpty(),
      check('email', 'El email es obligatorio.').isEmail(), 
      check('password', 'El password debe contener 8 caracteres.').isLength({ min: 8 }),
      validarCampos
    ], 
    crearUsuario
);

router.post( 
    '/', 
    [ check('email', 'El email es obligatorio.').isEmail(),
      check('password', 'El password debe contener 8 caracteres.').isLength({ min: 8 }),
      validarCampos
    ],
    loginUsuario 
);

router.get( '/renew', validarJWT, renovarToken );

module.exports = router;