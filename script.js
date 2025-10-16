
let tamanhoDaLetra = 100;
let modoEscuro = false;
let leitorLigado = false;


let modoPronatopia = false
let modoDeuteratopia = false
let modoTritanopia = false

let botaoMais = document.getElementById("increaseFont");
let botaoMenos = document.getElementById("decreaseFont");
let botaoEscuro = document.getElementById("toggleContrast");
let botaoLeitor = document.getElementById("toggleVoice");

let botaoDaltonismoProtanopia = document.getElementById('toggleColors1')
let botaoDaltonismoDeuteranopia = document.getElementById('toggleColors2')
let botaoDaltonismoTritanopia = document.getElementById('toggleColors3')

let botaoVideos = document.getElementById("botaoVideos")


botaoMais.onclick = function () {
    if (tamanhoDaLetra == 170) {
        return
    }
    tamanhoDaLetra = tamanhoDaLetra + 10;
    document.body.style.fontSize = tamanhoDaLetra + "%"
};

botaoMenos.onclick = function () {
    if (tamanhoDaLetra > 80) {
        tamanhoDaLetra = tamanhoDaLetra - 10;
        document.body.style.fontSize = tamanhoDaLetra + "%";
    }
};


function limparModosDaltonismo() {
    document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");
    modoPronatopia = false;
    modoDeuteratopia = false;
    modoTritanopia = false;
}


function ativarDaltonismoTritanopia() {
    const ativo = !modoTritanopia;
    limparModosDaltonismo();
    modoTritanopia = ativo;
    if (ativo) document.body.classList.add("tritanopia");
        alert("Modo daltonismo tritanopia")

}

function ativarDaltonismoDeuteratopia() {
    const ativo = !modoDeuteratopia;
    limparModosDaltonismo();
    modoDeuteratopia = ativo;
    if (ativo) document.body.classList.add("deuteranopia");
        alert("Modo daltonismo deuteratopia")

}


function ativarDaltonismoProtanopia() {
    const ativo = !modoPronatopia;
    limparModosDaltonismo();
    modoPronatopia = ativo;
    if (ativo) document.body.classList.add("protanopia");
    alert("Modo daltonismo protanopia")
}

document.getElementById('toggleColors1').addEventListener('click', ativarDaltonismoTritanopia)
document.getElementById('toggleColors2').addEventListener('click', ativarDaltonismoDeuteratopia)
document.getElementById('toggleColors3').addEventListener('click', ativarDaltonismoProtanopia)












botaoEscuro.onclick = function () {
    modoEscuro = !modoEscuro;
    document.body.classList.toggle("dark-mode", modoEscuro);
};


botaoLeitor.onclick = function () {
    leitorLigado = !leitorLigado;
    if (leitorLigado) {
        alert("Leitor de tela ligado!");
    } else {
        alert("Leitor de tela desligado!");
    }
};


function falar(texto) {
    if (leitorLigado) {
        let som = new SpeechSynthesisUtterance(texto);
        som.lang = "pt-BR";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(som);
    }
}


let elementos = document.querySelectorAll("h1, h2, p, button");
for (let item of elementos) {
    item.addEventListener("focus", function () {
        falar(item.innerText);
    });
}

document.onkeydown = function (tecla) {
    if (tecla.ctrlKey && tecla.key === "+") botaoMais.click();
    if (tecla.ctrlKey && tecla.key === "-") botaoMenos.click();
    if (tecla.ctrlKey && tecla.key.toLowerCase() === "m") botaoEscuro.click();
};


let botoesAcordeao = document.querySelectorAll(".accordion-button");
for (let botao of botoesAcordeao) {
    botao.onclick = function () {
        let caixa = botao.nextElementSibling;
        let aberta = !caixa.hidden;
        caixa.hidden = aberta;

        if (leitorLigado) {
            if (aberta) {
                falar("Fechando: " + botao.innerText);
            } else {
                falar("Abrindo: " + botao.innerText);
            }
        }
    };
}

if (botaoVideos) {
    botaoVideos.onclick = function () {
        falar("Abrindo página de vídeos");
        window.location.href = "videos.html";
    };
}
