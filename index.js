const express = require('express');
const server = express();
// const db = require('./data/db');
const dbRoutes = require('./data/db-routes');

server.use(express.json());
server.use('/api/posts', dbRoutes);

server.listen(4001, () => {
    console.log('\n*** Server Running on http://localhost:4001 ***\n');
  });