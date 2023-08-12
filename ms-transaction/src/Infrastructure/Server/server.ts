import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import myDataSource from '../Repositories/dataSources/data-source';

export default class Server {
  private port = Number(config.PORT);
  private app!: express.Application;
  private server: any | null = null;

  public async initializeApp(): Promise<void> {
    try {
      await myDataSource.initialize();
      console.log("Data Source has been initialized!");

      this.createApp();
      this.configApp();
      this.runServer();
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
    }
  }

  public getApp(): express.Application {
    return this.app;
  }

  private createApp(): void {
    this.app = express();
  }

  private configApp(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
  }

  private runServer(): void {
    this.server = this.app.listen(this.port, () => console.log('Running in the port %s', this.port));
  }

  async closeApp() {
    if (this.server) {
      this.server.close((err: any) => {
        if (err) {
          console.error('Error closing server:', err);
        }
      });
    }
  }
}
