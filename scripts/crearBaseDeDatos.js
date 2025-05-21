const mongoose = require('mongoose');
const { Cliente, Cuenta, Transaccion } = require('./esquemas');

// Conexión
mongoose.connect('mongodb://localhost:27017/nexus_banca')
  .then(async () => {
    console.log("Conectado a MongoDB");

    // Limpia colecciones
    await Cliente.deleteMany({});
    await Cuenta.deleteMany({});
    await Transaccion.deleteMany({});

    // Crear cliente de ejemplo
    const cliente = await Cliente.create({
      nombre: "Juan Pérez",
      correo: "juanperez@example.com",
      telefono: "555-1234",
      direccion: "Av. Central 123"
    });

    // Crear cuenta para el cliente
    const cuenta = await Cuenta.create({
      cliente_id: cliente._id,
      tipo: "ahorro",
      saldo: 1000,
      numeroCuenta: "NX-100001"
    });

    // Transacción inicial
    await Transaccion.create({
      cuenta_id: cuenta._id,
      tipo: "deposito",
      monto: 1000
    });

    console.log("Base de datos inicializada con cliente y cuenta");
    process.exit();
  })
  .catch(err => console.error("Error:", err));

