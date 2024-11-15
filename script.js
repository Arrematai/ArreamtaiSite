 //Verifica o dispositivo e muda o banner
 document.addEventListener("DOMContentLoaded", function() {
     var banner = document.getElementById("banner");

     // Verifica se a largura da tela é menor que 768px
     if (window.innerWidth <= 768) {
         banner.src = "Banner Vertical.jpg"; // Imagem para dispositivos móveis
     }
 });

//Busca os dados na API Python
async function fetchResults() {
    const query = document.getElementById('queryInput').value; // Pega o valor digitado pelo usuário
    console.log("Query enviada:", query); // Log para verificação

    // Faz uma requisição POST para a API
    const response = await fetch('https://python-flask-x5fd.onrender.com/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
    });

    const results = await response.json(); // Extrai os resultados em JSON
    document.getElementById('loader').style.display = 'none';
    populateTable(results); // Chama a função para preencher a tabela
}

// Preenche a tabela com os dados da API
function populateTable(results) {
    console.log("Resultados recebidos:", results);
    const tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpa os resultados anteriores

    // Adiciona cada item à tabela
    results.forEach(item => {
        const row = document.createElement('tr');

        // Adiciona cada coluna à linha da tabela
        row.innerHTML = `
            <td>${item.lote}</td>
            <td>${item.marca}</td>
            <td>${item.modelo}</td>
            <td>${item.monta}</td>
            <td>${item.ano}</td>
            <td><img src="${item.thumb}" alt="Imagem" width="100"></td>
            <td><a href="${item.link}" target="_blank">Ver Mais</a></td>
        `;
        tableBody.appendChild(row); // Adiciona a linha à tabela
    });
}

let ListaLeiloes = [];

// Função para carregar o CSV
function loadCSV() {
    fetch('TodosSudeste.csv')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar o arquivo CSV');
            return response.text();
        })
        .then(data => {
            // Processar o CSV e armazenar as URLs na ListaLeiloes
            ListaLeiloes = data.split('\n').map(url => url.trim());
            console.log('URLs carregadas:', ListaLeiloes);
        })
        .catch(error => console.error('Erro:', error));
}

// Função para validar a URL
function validateURL() {
    const userInput = document.getElementById("urlInput").value.trim();
    const validationResult = document.getElementById("validationResult");

    if (ListaLeiloes.includes(userInput)) {
        validationResult.textContent = "Link válido";
        validationResult.style.color = "green";
    } else {
        validationResult.textContent = "Link falso";
        validationResult.style.color = "red";
    }
}

// Carregar o CSV ao iniciar
loadCSV();
