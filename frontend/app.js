document.getElementById("deposito-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cuenta = e.target.cuenta.value;
  const monto = e.target.monto.value;

  const res = await fetch("http://localhost:3000/deposito", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cuenta, monto })
  });

  const data = await res.json();
  alert(data.mensaje || "Depósito realizado");
});