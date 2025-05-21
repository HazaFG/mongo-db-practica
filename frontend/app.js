const API_URL = 'http://localhost:3000/api';

document.getElementById('btnCargar').addEventListener('click', async () => {
  const res = await fetch(`${API_URL}/clientes`);
  const clientes = await res.json();

  const ul = document.getElementById('listaClientes');
  ul.innerHTML = '';
  clientes.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.nombre} (${c.email})`;
    ul.appendChild(li);
  });
});

document.getElementById('formCuenta').addEventListener('submit', async (e) => {
  e.preventDefault();

  const cliente_id = document.getElementById('clienteId').value;
  const tipo = document.getElementById('tipoCuenta').value;
  const numeroCuenta = document.getElementById('numeroCuenta').value;

  const res = await fetch(`${API_URL}/cuentas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cliente_id, tipo, numeroCuenta })
  });

  const data = await res.json();
  alert(`✅ Cuenta creada: ${data.numeroCuenta}`);
});

