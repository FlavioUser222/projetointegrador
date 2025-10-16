
let tamanhoDaLetra = 100;
let modoEscuro = false;
let leitorLigado = false;

let botaoMais = document.getElementById("increaseFont");
let botaoMenos = document.getElementById("decreaseFont");
let botaoEscuro = document.getElementById("toggleContrast");
let botaoLeitor = document.getElementById("toggleVoice");
let botaoVideos = document.getElementById("botaoVideos");


botaoMais.onclick = function () {
    if(tamanhoDaLetra == 170){
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
