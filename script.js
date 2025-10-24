let tamanhoDaLetra = 100;
let modoEscuro = false;
let leitorLigado = false;

let botaoMais = document.getElementById("increaseFont");
let botaoMenos = document.getElementById("decreaseFont");
let botaoEscuro = document.getElementById("toggleContrast");
let botaoLeitor = document.getElementById("toggleVoice");

const modoEscuroSalvo = localStorage.getItem('modoEscuro') === 'true';
modoEscuro = modoEscuroSalvo;
document.body.classList.toggle("dark-mode", modoEscuro);

const modoDaltonismoSalvo = localStorage.getItem('modoDaltonismo');
if (modoDaltonismoSalvo) {
    document.body.classList.add(modoDaltonismoSalvo);
}

let botaoVideos = document.getElementById("botaoVideos");

botaoMais.onclick = function () {
    if (tamanhoDaLetra < 170) {
        tamanhoDaLetra += 10;
        document.body.style.fontSize = tamanhoDaLetra + "%";
    }
};

botaoMenos.onclick = function () {
    if (tamanhoDaLetra > 80) {
        tamanhoDaLetra -= 10;
        document.body.style.fontSize = tamanhoDaLetra + "%";
    }
};

botaoEscuro.onclick = function () {
    modoEscuro = !modoEscuro;
    document.body.classList.toggle("dark-mode", modoEscuro);
    localStorage.setItem('modoEscuro', modoEscuro);
};


function falar(texto) {
    if (leitorLigado && texto.trim() !== "") {
        let som = new SpeechSynthesisUtterance(texto);
        som.lang = "pt-BR";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(som);
    }
}

function lerPaginaCompleta() {
    let textoCompleto = ""

    let elementos = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, button, a, label, span, figcaption")

    elementos.forEach(el => {
        let conteudo = el.innerText.trim();
        if (conteudo) textoCompleto += conteudo + ". ";
    });

    falar("Lendo conteúdo da página. " + textoCompleto);
}

botaoLeitor.onclick = function () {
    leitorLigado = !leitorLigado;
    if (leitorLigado) {
        alert("Leitor de tela ligado!");
        lerPaginaCompleta()
    } else {
        window.speechSynthesis.cancel();
        alert("Leitor de tela desligado!");
    }
};


let elementos = document.querySelectorAll("h1, h2, h3, p, button, a, li, label, span");
for (let item of elementos) {
    item.addEventListener("focus", () => falar(item.innerText));
    item.addEventListener("mouseover", () => falar(item.innerText));
    item.addEventListener("click", () => falar(item.innerText));
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
            falar((aberta ? "Fechando: " : "Abrindo: ") + botao.innerText);
        }
    };
}


if (botaoVideos) {
    botaoVideos.onclick = function () {
        falar("Abrindo página de vídeos");
        window.location.href = "videos.html";
    };
}


const menuToggle = document.getElementById("menuToggle");
const accessibilityMenu = document.getElementById("accessibilityMenu");

menuToggle.addEventListener("click", () => {
    accessibilityMenu.classList.toggle("active");
});

// 🎨 Daltonismo
function aplicarDaltonismo(tipo) {
    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (tipo) {
        document.body.classList.add(tipo);
        localStorage.setItem('modoDaltonismo', tipo);
    } else {
        localStorage.removeItem('modoDaltonismo');
    }
}

function ativarDaltonismo() {
    const modoAtual = localStorage.getItem('modoDaltonismo');
    let novoModo;

    if (modoAtual === 'protanopia') {
        novoModo = 'deuteranopia';
        alert('🔵 Modo Daltonismo: Deuteranopia ativado');
    } else if (modoAtual === 'deuteranopia') {
        novoModo = 'tritanopia';
        alert('🟢 Modo Daltonismo: Tritanopia ativado');
    } else if (modoAtual === 'tritanopia') {
        novoModo = null;
        alert('🔁 Modo Daltonismo desativado');
    } else {
        novoModo = 'protanopia';
        alert('🔴 Modo Daltonismo: Protanopia ativado');
    }

    aplicarDaltonismo(novoModo);
}

document.getElementById('btnDaltonismo').addEventListener('click', ativarDaltonismo);
