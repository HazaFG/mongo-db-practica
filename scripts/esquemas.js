// Cliente
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, unique: true },
  telefono: String,
  direccion: String,
  creado_en: { type: Date, default: Date.now }
});

const cuentaSchema = new mongoose.Schema({
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  tipo: { type: String, enum: ['corriente', 'ahorro'], required: true },
  saldo: { type: Number, default: 0 },
  numeroCuenta: { type: String, unique: true },
  creada_en: { type: Date, default: Date.now }
});

const transaccionSchema = new mongoose.Schema({
  cuenta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta' },
  tipo: { type: String, enum: ['deposito', 'retiro'], required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = {
  Cliente: mongoose.model('Cliente', clienteSchema),
  Cuenta: mongoose.model('Cuenta', cuentaSchema),
  Transaccion: mongoose.model('Transaccion', transaccionSchema)
};

