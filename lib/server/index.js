import http from 'http';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import MakeMeMonster from '../make-me-monster';

export const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/ping', (req, res) => res.json('OK'));
app.post('/api/monster', (req, res) => {
  const { player } = req.body;
  try {
    const monster = MakeMeMonster.getRandomMonster(player);
    res.status(200).json(monster);
  } catch (err) {
    res.status(400).json({
      message: 'Invalid Player data provided',
    });
  }
});

export const server = http.createServer(app);

export const startServer = (port) => {
  server.listen(port, () => {
    console.info(`App running on port: ${port}`);
  });
};
