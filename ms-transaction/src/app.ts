import { loadControllers } from 'awilix-express';
import Server from './server';
import container from './container';

async function startServer() {
  const server = new Server();
  await server.initializeApp();

  const app = server.getApp();
  container(app);
  app.use(loadControllers('api/modules/**/*.controller.ts', { cwd: __dirname }));

  return app;
}

const appInstance = startServer();

export { appInstance };
