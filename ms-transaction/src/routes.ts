import express from 'express';

const router = express.Router();

router.get('/greetings', (req, res) => {
  res.send('Hola, bienvenido a mi servidor Express!');
});

export default router;
