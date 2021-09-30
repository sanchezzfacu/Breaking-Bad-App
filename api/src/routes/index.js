const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const charactersRoute = require('./characters')
const occupationsRoute = require('./occupations')
const characterRoute = require('./character')

const router = Router();

// Configurar los routers
router.use('/character', characterRoute)
router.use('/characters', charactersRoute)
router.use('/occupations', occupationsRoute)
// Ejemplo: router.use('/auth', authRouter);


module.exports = router
    

