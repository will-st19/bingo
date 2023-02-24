// Define um array com todos os números possíveis de um bingo (1-75)
const bingoNumbers = Array.from(Array(75), (_, i) => i + 1);

// Define uma função que gera uma cartela aleatória
function generateBingoCard() {
    // Embaralha os números do bingo
    const shuffledNumbers = bingoNumbers.sort(() => Math.random() - 0.5);
    // Seleciona os primeiros 15 números para a cartela
    const cardNumbers = shuffledNumbers.slice(0, 15);
    // Separa os números em 3 colunas de 5 linhas cada
    const columns = [[], [], []];
    for (let i = 0; i < 15; i++) {
        const column = i % 3;
        const row = Math.floor(i / 3);
        columns[column][row] = cardNumbers[i];
    }
    // Retorna a cartela com os números organizados em 3 colunas e 5 linhas
    return columns;
}

// Cria uma lista de cartelas para os jogadores
const players = [];
for (let i = 0; i < 3; i++) {
    players.push(generateBingoCard());
}

// Cria elementos HTML para exibir as cartelas na tela
const bingoContainer = document.getElementById("bingo-container");
for (let i = 0; i < players.length; i++) {
    const playerCard = document.createElement("div");
    playerCard.classList.add("bingo-card");
    playerCard.innerHTML = "<h2>Cartela " + (i + 1) + "</h2>" + "<table>" +
        players[i].map(column => "<tr>" + column.map(number => "<td>" + number + "</td>").join("") + "</tr>").join("") +
        "</table>";
    bingoContainer.appendChild(playerCard);
}

// Cria um elemento HTML para exibir o número sorteado
const nextNumberButton = document.getElementById("next-number");
const currentNumberDiv = document.getElementById('current-number');
const nextNumberDisplay = document.createElement("div");
nextNumberDisplay.classList.add("current-number");
bingoContainer.appendChild(nextNumberDisplay);

// Define uma função para sortear o próximo número e atualizar as cartelas na tela
function nextNumber() {
    // Seleciona um número aleatório não sorteado ainda
    let nextNumber;
    do {
        nextNumber = Math.floor(Math.random() * 75) + 1;
    } while (drawnNumbers.includes(nextNumber));
    drawnNumbers.push(nextNumber);

    // Atualiza o número sorteado na tela
    // nextNumberDisplay.innerText = nextNumber;

    // Marca o número na cartela dos jogadores que o possuem
    for (let i = 0; i < players.length; i++) {
        const playerCard = document.querySelector("#bingo-container .bingo-card:nth-child(" + (i + 1) + ") table");
        const numberCells = playerCard.querySelectorAll("td");
        for (let j = 0; j < numberCells.length; j++) {
            if (numberCells[j].innerText == nextNumber) {
                numberCells[j].classList.add("marked");
            }
        }
    }

    // Verifica se algum jogador venceu
    const winner = players.find(playerCard => {
        const numberCells = playerCard.flat().filter(number => drawnNumbers.includes(number));
        return numberCells.length == 15;
    });
    if (winner) {
        alert((players.indexOf(winner) + 1) + " ganhou o bingo!");
        nextNumberButton.removeEventListener("click", nextNumber);
    }

    // Retorna o número sorteado
    return nextNumber;
}

// nextNumberButton.addEventListener('click', () => {
//     const numberDisplay = nextNumber();
//     console.log(currentNumberDiv)
//     currentNumberDiv.textContent = numberDisplay;
// });

nextNumberButton.addEventListener('click', () => {
    const numberDisplay = nextNumber();
    const currentNumberDiv = document.createElement("div");
    currentNumberDiv.classList.add("current-number");
    currentNumberDiv.textContent = numberDisplay;
    document.body.appendChild(currentNumberDiv);
});


// Cria um array para armazenar os números já sorteados
const drawnNumbers = [];