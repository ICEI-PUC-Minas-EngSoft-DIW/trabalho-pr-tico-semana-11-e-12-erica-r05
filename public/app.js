
async function carregarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const detalhesContainer = document.getElementById('detalhes-container');

    if (!itemId) {
        detalhesContainer.innerHTML = '<p>Erro: ID do item faltando na URL.</p>';
        return;
    }
    
    const entidades = ['obras', 'albuns', 'pinturas'];
    let item = null;
    for (const entidade of entidades) {
        try {
            const endpoint = `http://localhost:3000/${entidade}/${itemId}`;
            const response = await fetch(endpoint);
            
            if (response.ok) {
                item = await response.json();
                break;
            }
        } catch (error) {
            console.warn(`Tentativa falhou para /${entidade}. Tentando a próxima...`);
        }
    }
    if (!item) {
        detalhesContainer.innerHTML = '<p>Item não encontrado em nenhuma das coleções da API.</p>';
        return;
    }
    detalhesContainer.innerHTML = `
        <div class="detalhes-obra">
            <img src="${item.imagem}" alt="${item.titulo}" class="imagem-detalhes">
            <div class="info-detalhes">
                <h1>${item.titulo}</h1>
                <p class="artista">${item.artista}</p>
                ${item.descricao ? `<p class="descricao">${item.descricao}</p>` : ''}
                <a href="index.html" class="btn-voltar">← Voltar para Home</a>
            </div>
        </div>
    `;
}

// ----------------------------------------------------------------------
// Garante que a função carregarDetalhes seja executada ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDetalhes);