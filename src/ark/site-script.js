function extractDinosInfo() {
    const tabela = document.querySelector('.cargo-creature-table');
    const linhas = tabela.querySelectorAll('tbody tr');

    const dados = [];

    const indiceNome = 0;

    for (const linha of linhas) {

        const name = linha.cells[indiceNome].textContent.trim();
        const link = linha.cells[indiceNome].querySelector('a').href;

        dados.push({ name, link });
    }

    return dados;
}

async function saveDino(dinos) {
    for (const dino of dinos) {
        try {
            const response = await fetch("http://localhost:3000/ark/dinos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dino)
            })
            
            const message = await response.json();

            console.log(`Response: ${dino.name} --- ${message.msg} `)
        } catch (error) {
            console.error('Error saving dino:', error)
        }
    }
}

async function main() {
    const dinos = extractDinosInfo();
    await saveDino(dinos);
}

main().then(() => console.log("SUCCESS!!!!"))
