const html = document.querySelector('html')
const buttonDescansoCurto = document.querySelector(".app__card-button--curto")
const buttonDescansoLongo = document.querySelector(".app__card-button--longo")
const buttonFoco = document.querySelector(".app__card-button--foco")
const imagemBanner = document.querySelector(".app__image")
const tituloBanner = document.querySelector(".app__title")
const switchMusica = document.querySelector("#alternar-musica")
const switchMusicaNormal = document.querySelector("#alternar-musica-normal")
const musica = new Audio("/sons/02-voando-pro-para-joelma-calypso-331273.mp3")
const musicaRelaxante = new Audio("/sons/luna-rise-part-one.mp3")
const botaoComecar = document.querySelector("#start-pause")
const musicaPlay = new Audio("/sons/play.wav")
const musicaPause = new Audio("/sons/pause.mp3")
const musicaAcabou = new Audio("/sons/beep.mp3")
const botaoComecarPausar = document.querySelector("#start-pause span")
const iconeBotaoStart = document.querySelector('.app__card-primary-butto-icon')
const timerNaTela = document.querySelector("#timer")

// manipulando contador
var intervaloId = null
var tempoDecorridoEmSegundos = 1500

function contagemRegressiva() {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaAcabou.play()
        zerar()
        return
    } else {
        tempoDecorridoEmSegundos -= 1
        mostrarTempo()
    }
}

function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        musicaPause.play()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    musicaPlay.play()
    botaoComecarPausar.innerText = 'Pausar'
    iconeBotaoStart.setAttribute("src", "/imagens/pause.png")
}

function zerar() {
    botaoComecarPausar.innerText = 'Começar'
    iconeBotaoStart.setAttribute("src", "/imagens/play_arrow.png")
    clearInterval(intervaloId)
    intervaloId = null
}

botaoComecar.addEventListener("click", iniciarOuPausar)

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})

    timerNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

// add evento de clique nos botões e chamando funcao alterarContexto
buttonDescansoCurto.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    mostrarTempo()
    alterarContexto("descanso-curto")
    
})

buttonDescansoLongo.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    mostrarTempo()
    alterarContexto("descanso-longo")
 
})

buttonFoco.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
    mostrarTempo()
    alterarContexto("foco")
})

function alterarContexto(contexto) {
    // alterando background através de data-contexto
    html.setAttribute('data-contexto', contexto)
    // alterando imagem do banner via querySelector(".app__image")
    imagemBanner.setAttribute("src", `/imagens/${contexto}.png`)

    if (contexto == "descanso-curto") {
        // alterando texto do banner com tituloBanner.innerHTML
        tituloBanner.innerHTML = `Que tal dar uma respirada?<strong class="app__title-strong">Faça uma pausa curta!</strong>`
        // alterando active class do botao selecionado
        buttonDescansoCurto.classList.add("active");
        buttonDescansoLongo.classList.remove("active");
        buttonFoco.classList.remove("active");
    }

    if (contexto == "descanso-longo") {
        // alterando texto do banner com tituloBanner.innerHTML
        tituloBanner.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        // alterando active class do botao selecionado
        buttonDescansoLongo.classList.add("active");
        buttonDescansoCurto.classList.remove("active");
        buttonFoco.classList.remove("active");
    }

    if (contexto == "foco") {
        // alterando texto do banner com tituloBanner.innerHTML
        tituloBanner.innerHTML = ` Otimize sua produtividade,<strong class="app__title-strong"> mergulhe no que importa.</strong>`
        // alterando active class do botao selecionado
        buttonDescansoLongo.classList.remove("active");
        buttonDescansoCurto.classList.remove("active");
        buttonFoco.classList.add("active");
    }
}

// play e pause na musica de foco com change do switch
musica.loop = true
musica.currentTime = 92
switchMusica.addEventListener('change', () => {
    if (musica.paused == true) {
        musica.play()
        switchMusicaNormal.checked = false
        musicaRelaxante.pause()
    } else {
        musica.pause()
    }
})

musicaRelaxante.loop = true
switchMusicaNormal.addEventListener('change', ()=>{
    if(musicaRelaxante.paused){
        musicaRelaxante.play()
        switchMusica.checked = false
        musica.pause()
    } else{
        musicaRelaxante.pause()
    }
})