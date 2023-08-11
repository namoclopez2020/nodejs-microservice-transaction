import express from 'express'
import envConfig from './config';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/greetings', (req, res) => {
  res.send('Hola, bienvenido a mi servidor Express!');
});

app.listen(envConfig.PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${envConfig.PORT}`);
});
