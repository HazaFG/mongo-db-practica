const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('nexus_banca');

    const clientes = db.collection('clientes');
    const cuentas = db.collection('cuentas');
    const transacciones = db.collection('transacciones');

    // Limpia las colecciones antes de insertar
    await clientes.deleteMany({});
    await cuentas.deleteMany({});
    await transacciones.deleteMany({});

   // Insertar clientes
await clientes.insertMany([ 
  { _id: 1, nombre: 'Hazael Flores Gastelum', curp: 'FOGH030HBSLSZA5' },
  { _id: 2, nombre: 'Agustin Abaroa', curp: 'PEMJ950312HDFRRN03' },
  { _id: 3, nombre: 'Ricardo Garayzar', curp: 'LAOM030604HDFZRGA4' },
  { _id: 4, nombre: 'María López Hernández', curp: 'LOHM920715MDFLRR08' },
  { _id: 5, nombre: 'Carlos Sánchez Pérez', curp: 'SANC800102HDFCRL05' },
  { _id: 6, nombre: 'Ana Torres Romero', curp: 'TORA880323MDFNRN01' }
]);

// Insertar cuentas con nuevos IDs y montos
await cuentas.insertMany([
  { _id: 201, idCliente: 1, saldo: 15000 },
  { _id: 202, idCliente: 2, saldo: 20000 },
  { _id: 203, idCliente: 3, saldo: 5000 },
  { _id: 204, idCliente: 4, saldo: 12000 },
  { _id: 205, idCliente: 5, saldo: 8000 },
  { _id: 206, idCliente: 6, saldo: 10000 }
]);

// Insertar transacciones con los nuevos IDs y montos
await transacciones.insertMany([
  { idCuenta: 201, tipo: 'deposito', monto: 2500, fecha: new Date() },
  { idCuenta: 201, tipo: 'retiro', monto: 1200, fecha: new Date() },
  { idCuenta: 202, tipo: 'deposito', monto: 4500, fecha: new Date() },
  { idCuenta: 203, tipo: 'deposito', monto: 1500, fecha: new Date() },
  { idCuenta: 203, tipo: 'retiro', monto: 500, fecha: new Date() },
  { idCuenta: 204, tipo: 'deposito', monto: 3000, fecha: new Date() },
  { idCuenta: 205, tipo: 'retiro', monto: 2000, fecha: new Date() },
  { idCuenta: 206, tipo: 'deposito', monto: 5000, fecha: new Date() },
  { idCuenta: 206, tipo: 'retiro', monto: 1000, fecha: new Date() }
]);

console.log('Datos insertados correctamente');
  } catch (error) {
    console.error('Error insertando los datos:', error);
  } finally {
    await client.close();
  }
}

run();

