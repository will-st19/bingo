function gerarCartelas(numJogadores, numCelulas) {
    const cartelas = [];
    for (let i = 0; i < numJogadores; i++) {
        const cartela = [];
        while (cartela.length < numCelulas) {
            const numero = Math.floor(Math.random() * 100) + 1;
            if (!cartela.includes(numero)) {
                cartela.push(numero);
            }
        }
        cartelas.push(cartela);
    }
    return cartelas;
}

function formatarCartela(cartela, numLinhas, numColunas) {
    const tabela = document.createElement("table");
    let idx = 0;
    for (let i = 0; i < numLinhas; i++) {
        const linha = document.createElement("tr");
        for (let j = 0; j < numColunas; j++) {
            const celula = document.createElement("td");
            if (idx < cartela.length) {
                celula.textContent = cartela[idx];
            }
            linha.appendChild(celula);
            idx++;
        }
        tabela.appendChild(linha);
    }
    return tabela;
}

const cartelas = gerarCartelas(3, 15);
const cartelasDiv = document.getElementById("cartelas");
for (let i = 0; i < cartelas.length; i++) {
    const cartelaDiv = document.createElement("div");
    cartelaDiv.appendChild(formatarCartela(cartelas[i], 3, 5));
    cartelaDiv.appendChild(document.createElement("hr"));
    cartelasDiv.appendChild(cartelaDiv);
}
