const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const mockData = require('../data/todos.json');

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get('/api/todolist', (req, res) => {
      return res.send(mockData);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.post('/api/todolist/new', (req, res) => {
      const record = req.body;
      mockData.results.push(record);
      res.status(200).send(mockData);
    });

    server.put('api/todolist/:id', (req, res) => {
      const record = req.body;
      const index = mockData.findIndex(
        (item) => item.id === parseInt(req.params.id)
      );
      mockData[index] = { ...mockData[index], ...record };
      res.status(200).send({ response });
    }); // broken, needs more research

    server.delete('api/todolist/:id', (req, res) => {
      const newList = mockData.filter(
        (item) => item.id !== parseInt(req.params.id)
      );
      // set newList into the datastore
      res.status(200).send({ newList });
    }); // broken, needs more research

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
