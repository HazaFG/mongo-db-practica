// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/nexus_banca', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API Banco Nexus funcionando');
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));