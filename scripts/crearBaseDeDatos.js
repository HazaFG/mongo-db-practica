const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
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
        { _id: 3, nombre: 'Ricardo Garayzar', curp: 'LAOM030604HDFZRGA4' }
    ]);

    // Insertar cuentas con nuevos IDs y montos
    await cuentas.insertMany([
      { _id: 201, idCliente: 1, saldo: 15000 },
      { _id: 202, idCliente: 2, saldo: 20000 }
    ]);

    // Insertar transacciones con los nuevos IDs y montos
    await transacciones.insertMany([
      { idCuenta: 201, tipo: 'deposito', monto: 2500, fecha: new Date() },
      { idCuenta: 201, tipo: 'retiro', monto: 1200, fecha: new Date() },
      { idCuenta: 202, tipo: 'deposito', monto: 4500, fecha: new Date() }
    ]);

    console.log('Datos insertados correctamente');
  } catch (error) {
    console.error('Error insertando los datos:', error);
  } finally {
    await client.close();
  }
}

run();

