import express from 'express'
import envConfig from './config';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(routes)

app.listen(envConfig.PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${envConfig.PORT}`);
});

export default app
