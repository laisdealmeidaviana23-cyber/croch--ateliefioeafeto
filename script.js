async function calcularFrete() {

  const cepDestino = document.getElementById("cep").value;
  const valorProduto = parseFloat(document.getElementById("valorProduto").innerText);

  // EDITE AQUI
  const peso = 0.5; // peso em kg
  const cepOrigem = "60000000"; // seu CEP
  const token = "SEU_TOKEN_DO_MELHOR_ENVIO";

  const response = await fetch("https://www.melhorenvio.com.br/api/v2/me/shipment/calculate", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      from: { postal_code: cepOrigem },
      to: { postal_code: cepDestino },
      package: {
        weight: peso,
        height: 10,
        width: 20,
        length: 20
      },
      services: "1" // SEDEX
    })
  });

  const data = await response.json();
  const frete = parseFloat(data[0].price);
  const total = valorProduto + frete;

  document.getElementById("resultado").innerHTML =
    `Frete SEDEX: R$ ${frete.toFixed(2)}<br>
     Total: R$ ${total.toFixed(2)}`;
}
