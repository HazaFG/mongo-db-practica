// scripts/crearBaseDeDatos.js
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/nexus_banca");

const Cuenta = mongoose.model("Cuenta", {
  numero: String,
  saldo: Number,
});

(async () => {
  await Cuenta.deleteMany({});
  await Cuenta.create({ numero: "123456", saldo: 1000 });
  console.log("Cuenta creada");
  mongoose.disconnect();
})();

