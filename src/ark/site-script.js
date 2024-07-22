$(".cargo-creature-table tbody tr a:first-child").each((i, e) => {
  
    const name = e.title
    
    fetch("http://localhost:3000/ark/dinos", {
              method: 'POST', // Método da requisição
              headers: {
                  'Content-Type': 'application/json' // Tipo de conteúdo
              },
              body: JSON.stringify({name}) // Corpo da requisição
          })
          .then(response => response.json()) // Processa a resposta em JSON
          .then(() => console.log(`${name} salvo com sucesso`))
          .catch(error => console.error('Erro ao enviar dados:', error));
  })
