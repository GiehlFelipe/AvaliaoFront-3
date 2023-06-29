// CONFIGURACAO DO CLIENT HTTP AXIOS
const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
});

// CAPTURAR OS ELEMENTOS DA DOM QUE SERÃO MODIFICADOS PELO JS
const espacoCardsRow2 = document.getElementById('espaco-cards')
const qtdLocalizaSpan = document.getElementById('qtd-localiza')             //Busca as localizações 
const qtdEpisodesSpan = document.getElementById('qtd-episodes') 
const qtdPersonagensSpan = document.getElementById('qtd-personagens')

document.addEventListener('DOMContentLoaded',async () =>{
    const personagemId = localStorage.getItem('personagemId')
    //console.log({personagemId})

    const dadosRetornados = await pegarDadosPersonagem(personagemId)
    const dadosRetornados1 = await buscarLocalizas();
    const dadosRetornados3 = await buscarEpisodes();
    const dadosRetornados4 = await buscarPersonagens();

    qtdLocalizaSpan.innerText = dadosRetornados1.totalLocaliza
    qtdEpisodesSpan.innerText = dadosRetornados3.totalEpisode
    qtdPersonagensSpan.innerText = dadosRetornados4.totalPersonagens

    montarColunasCards(dadosRetornados)
})

async function pegarDadosPersonagem(personagemId){
    try {
        const resposta = await api.get(`/character/${personagemId}`)

        return resposta.data

    } catch (erro) {
        console.log(erro) // debug (erros de requisicao e erros de sintaxe - 400, 401, 500 ...
        alert('Erro na busca de personagens.')
        // aqui é momento de mostrar uma mensagem se der erro na requisicao
    }
}
              
async function montarColunasCards(personagem) {
    espacoCardsRow2.innerHTML = ""

    
                /*<div class="col-12 espaco-card">
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                                    class="img-fluid rounded-start" alt="Texto alt">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Nome Personagem</h5>
                                    <p class="card-text">
                                        <span class="text-danger">
                                            <i class="bi bi-caret-right-fill"></i>
                                        </span>
                                        Vivo - Humano
                                    </p>

                                    <dl>
                                        <dt>Última localização conhecida:</dt>
                                        <dd>Planeta XPTO</dd>

                                        <dt>Visto a última vez em:</dt>
                                        <dd>Nome do Capitulo</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                */  

        // CRIA COLUNA
        const divCol = document.createElement('div')
        divCol.setAttribute('class', 'col-12 espaco-card')

        // CRIA CARD
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card w-100 rounded-4 shadow')

        // CRIA IMAGEM
        const imgCard = document.createElement('img')
        imgCard.setAttribute('src', `${personagem.image}`)
        imgCard.setAttribute('class', 'card-img-top rounded-top-4')
        imgCard.setAttribute('alt', `${personagem.name}`)

        // CRIA CARD BODY
        const divCardBody = document.createElement('div')
        divCardBody.setAttribute('class', 'card-body px-4')

        // CRIA TITULO CARD
       const linkElement = document.createElement('a')
       linkElement .setAttribute('href','personagem.html')
       
       const tituloCard = document.createElement('h5')
       tituloCard.innerText = personagem.name

        linkElement.appendChild(tituloCard)
        //// CRIA TITULO CARD
        //const tituloCard = document.createElement('h5')
        //tituloCard.setAttribute('class', 'card-title')
        //tituloCard.innerText = personagem.name
        
       // CRIA PARAGRAFO
        const descricaoPersonagem = document.createElement('p')
        descricaoPersonagem.setAttribute('class', 'card-text')

        switch (personagem.status) {
            case 'Alive':
                descricaoPersonagem.innerHTML = `
                    <span class="text-success">
                        <i class="bi bi-caret-right-fill"></i>
                    </span>
                    Vivo - ${personagem.species}
                `
                break;

            case 'Dead':
                descricaoPersonagem.innerHTML = `
                    <span class="text-danger">
                        <i class="bi bi-caret-right-fill"></i>
                    </span>
                    Morto - ${personagem.species}
                `
                break;

            default:
                descricaoPersonagem.innerHTML = `
                    <span class="text-secondary">
                        <i class="bi bi-caret-right-fill"></i>
                    </span>
                    Desconhecido - ${personagem.species}
                `
        }



        const dadosEpisodio = await buscarDadosEpisodio(personagem.episode[personagem.episode.length - 1])

        // CRIA DL
        const detalhamentoPersonagem = document.createElement('dl');
        detalhamentoPersonagem.innerHTML = `
            <dt>Última localização conhecida:</dt>
            <dd>${personagem.location.name}</dd>

            <dt>Visto a última vez em:</dt>
            <dd>${dadosEpisodio.nomeEpisodio}</dd>

            <dt>Foi ao ar em:</dt>
            <dd>${dadosEpisodio.dataLancamento}</dd>
        `

        // APPENDS - criar os filhos dentros dos respectivos elementos pais
        divCardBody.appendChild(tituloCard)
        divCardBody.appendChild(descricaoPersonagem)
        divCardBody.appendChild(detalhamentoPersonagem)

        divCard.appendChild(imgCard)
        divCard.appendChild(divCardBody)

        divCol.appendChild(divCard)

        espacoCardsRow2.appendChild(divCol)

}
async function buscarDadosEpisodio(url) {
    try {
        const resposta = await axios.get(url)

        // resposta.data
        return {
            id: resposta.data.id,
            nomeEpisodio: resposta.data.name,
            dataLancamento: resposta.data.air_date
        }
    } catch {
        alert("Deu algo errado na busca do episódio")
    }
}
// FUNÇÃO PARA BUSCAR AS LoCALIZAÇÔES
async function buscarLocalizas() {
    try {
        const resposta = await api.get('/location')

        const dadosApi = {
            totalLocaliza: resposta.data.info.count
        }

        return dadosApi

    } catch (erro) {
        console.log(erro) // debug (erros de requisicao e erros de sintaxe - 400, 401, 500 ...
        alert('Erro na busca de personagens.')
        // aqui é momento de mostrar uma mensagem se der erro na requisicao
    }
}
// FUNÇÃO PARA BUSCAR OS EPISODIOS
async function buscarEpisodes() {
    try {
        const resposta = await api.get('/episode')

        const dadosApi = {
            totalEpisode: resposta.data.info.count
        }

        return dadosApi

    } catch (erro) {
        console.log(erro) // debug (erros de requisicao e erros de sintaxe - 400, 401, 500 ...
        alert('Erro na busca de personagens.')
        // aqui é momento de mostrar uma mensagem se der erro na requisicao
    }
}
async function buscarPersonagens() {
    try {
        const resposta = await api.get('/character')

        const dadosApi = {
            totalPersonagens: resposta.data.info.count
        }

        return dadosApi

    } catch (erro) {
        console.log(erro) // debug (erros de requisicao e erros de sintaxe - 400, 401, 500 ...
        alert('Erro na busca de personagens.')
        // aqui é momento de mostrar uma mensagem se der erro na requisicao
    }
}