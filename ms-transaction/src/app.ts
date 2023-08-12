import { loadControllers } from 'awilix-express';
import Server from './Infrastructure/Server/server';
import container from './Infrastructure/Server/container';

async function startServer() {
  const server = new Server();
  await server.initializeApp();

  const app = server.getApp();
  container(app);
  app.use(loadControllers('Infrastructure/Controllers/*.controller.ts', { cwd: __dirname }));

  return app;
}

const appInstance = startServer();

export { appInstance };