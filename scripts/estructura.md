# Estructura de Base de Datos - Banco Nexus

## Cliente
- nombre: String
- correo: String (único)
- telefono: String
- direccion: String
- creado_en: Date

## Cuenta
- cliente_id: ObjectId (referencia a Cliente)
- tipo: 'corriente' | 'ahorro'
- saldo: Number
- numeroCuenta: String (único)
- creada_en: Date

## Transacción
- cuenta_id: ObjectId (referencia a Cuenta)
- tipo: 'deposito' | 'retiro'
- monto: Number
- fecha: Date

