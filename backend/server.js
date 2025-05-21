const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { Cliente, Cuenta, Transaccion } = require('../scripts/esquemas');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/nexus_banca')
  .then(() => console.log('✅ Conectado a MongoDB desde backend'))
  .catch(err => console.error('❌ Error al conectar:', err));

// Rutas básicas

// Obtener todos los clientes
app.get('/api/clientes', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

// Crear cuenta para un cliente
app.post('/api/cuentas', async (req, res) => {
  const { cliente_id, tipo, numeroCuenta } = req.body;
  const cuenta = new Cuenta({ cliente_id, tipo, numeroCuenta, saldo: 0 });
  await cuenta.save();
  res.json(cuenta);
});

// Hacer una transacción (deposito o retiro)
app.post('/api/transacciones', async (req, res) => {
  const { cuenta_id, tipo, monto } = req.body;

  const cuenta = await Cuenta.findById(cuenta_id);
  if (!cuenta) return res.status(404).send('Cuenta no encontrada');

  if (tipo === 'deposito') {
    cuenta.saldo += monto;
  } else if (tipo === 'retiro') {
    if (cuenta.saldo < monto) return res.status(400).send('Fondos insuficientes');
    cuenta.saldo -= monto;
  }

  await cuenta.save();

  const transaccion = new Transaccion({ cuenta_id, tipo, monto });
  await transaccion.save();

  res.json({ cuenta, transaccion });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

