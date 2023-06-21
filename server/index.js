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
      const record = JSON.parse(req.body);
      mockData.push(record);
      res.send(200);
    });

    server.put('api/todolist/:id', (req, res) => {
      const record = JSON.parse(req.body);
      const index = mockData.findIndex(
        (item) => item.id === parseInt(req.params.id)
      );
      mockData[index] = { ...mockData[index], ...record };
      res.send(200, mockData[index]);
    });

    server.delete('api/todolist/:id', (req, res) => {
      const newList = mockData.filter(
        (item) => item.id !== parseInt(req.params.id)
      );
      // set newList into the datastore
      res.send(200, newList);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
