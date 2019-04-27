import http from 'http';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export const server = http.createServer(app);

export const startServer = (port) => {
  server.listen(port, () => {
    console.info(`App running on port: ${port}`);
  });
};
