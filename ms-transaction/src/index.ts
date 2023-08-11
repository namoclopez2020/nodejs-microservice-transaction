import express from 'express'

const app = express();

app.get('/greetings', (req, res) => {
  res.send('Hola, bienvenido a mi servidor Express!');
});

app.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
