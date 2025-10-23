
// let tamanhoFonte = 100;

// const btnAumentar = document.getElementById("increaseFont");
// const btnDiminuir = document.getElementById("decreaseFont");
// const btnContraste = document.getElementById("toggleContrast");
// const btnCores = document.getElementById("toggleColors");

// btnAumentar.addEventListener("click", () => {
//   tamanhoFonte += 10;
//   if (tamanhoFonte > 30) {
//     return
//   }

//   document.body.style.fontSize = `${tamanhoFonte}%`;
// });

// btnDiminuir.addEventListener("click", () => {
//   if (tamanhoFonte > 50) {
//     tamanhoFonte -= 10;
//     document.body.style.fontSize = `${tamanhoFonte}%`
//   }
// });

// btnContraste.addEventListener("click", () => {
//   document.body.classList.toggle("modo-escuro")
// });

// btnCores.addEventListener("click", () => {
//   document.body.classList.toggle("cores-alternativas");
// });



let tamanhoDaLetra = 100;
let modoEscuro = false;
let leitorLigado = false;

const modoEscuroSalvo = localStorage.getItem('modoEscuro') === 'true';
modoEscuro = modoEscuroSalvo;
document.body.classList.toggle("dark-mode", modoEscuro);



const modoDaltonismoSalvo = localStorage.getItem('modoDaltonismo');
if (modoDaltonismoSalvo) {
    document.body.classList.add(modoDaltonismoSalvo);
}




// let modoPronatopia = false
// let modoDeuteratopia = false
// let modoTritanopia = false

let botaoMais = document.getElementById("increaseFont");
let botaoMenos = document.getElementById("decreaseFont");
let botaoEscuro = document.getElementById("toggleContrast");
let botaoLeitor = document.getElementById("toggleVoice");

// let botaoDaltonismoProtanopia = document.getElementById('toggleColors1')
// let botaoDaltonismoDeuteranopia = document.getElementById('toggleColors2')
// let botaoDaltonismoTritanopia = document.getElementById('toggleColors3')

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


// function limparModosDaltonismo() {
//     document.body.classList.remove("protanopia", "deuteranopia", "tritanopia", "dark-mode");
//     modoPronatopia = false;
//     modoDeuteratopia = false;
//     modoTritanopia = false;
//     modoEscuro = false
// }

// function ativarDaltonismoTritanopia() {
//     const ativo = !modoTritanopia;
//     limparModosDaltonismo();
//     modoTritanopia = ativo;
//     if (ativo) {
//         document.body.classList.add("tritanopia");
//         alert("Modo daltonismo tritanopia")
//     }
// }

// function ativarDaltonismoDeuteratopia() {
//     const ativo = !modoDeuteratopia;
//     limparModosDaltonismo();
//     modoDeuteratopia = ativo;
//     if (ativo) {
//         document.body.classList.add("deuteranopia");
//         alert("Modo daltonismo deuteratopia")
//     }

// }





// function ativarDaltonismoProtanopia() {
//     const ativo = !modoPronatopia;
//     limparModosDaltonismo();
//     modoPronatopia = ativo;
//     if (ativo) {
//         document.body.classList.add("protanopia");
//         alert("Modo daltonismo protanopia")
//     }
// }

// document.getElementById('toggleColors1').addEventListener('click', ativarDaltonismoTritanopia)
// document.getElementById('toggleColors2').addEventListener('click', ativarDaltonismoDeuteratopia)
// document.getElementById('toggleColors3').addEventListener('click', ativarDaltonismoProtanopia)



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


const menuToggle = document.getElementById("menuToggle");
const accessibilityMenu = document.getElementById("accessibilityMenu");

menuToggle.addEventListener("click", () => {
  accessibilityMenu.classList.toggle("active");
});




function aplicarDaltonismo(tipo) {
  document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia')

  if (tipo) {
    document.body.classList.add(tipo)
    localStorage.setItem('modoDaltonismo', tipo)
  } else {
    localStorage.removeItem('modoDaltonismo')
  }
}

function ativarDaltonismo() {
  const modoAtual = localStorage.getItem('modoDaltonismo')
  let novoModo;

  if (modoAtual === 'protanopia') {
    novoModo = 'deuteranopia'
    alert('🔵 Modo Daltonismo: Deuteranopia ativado')
  } else if (modoAtual === 'deuteranopia') {
    novoModo = 'tritanopia'
    alert('🟢 Modo Daltonismo: Tritanopia ativado')
  } else if (modoAtual === 'tritanopia') {
    novoModo = null;
    alert('🔁 Modo Daltonismo desativado')
  } else {
    novoModo = 'protanopia'
    alert('🔴 Modo Daltonismo: Protanopia ativado')
  }

  aplicarDaltonismo(novoModo)

}


document.getElementById('btnDaltonismo').addEventListener('click', ativarDaltonismo)



const perguntas = document.querySelectorAll(".pergunta");

perguntas.forEach((pergunta) => {
  const botoes = pergunta.querySelectorAll(".resposta");
  const resultado = pergunta.querySelector(".resultado");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const texto = botao.innerText.trim();

      const respostaCerta1 = "Ter internet e acessar a loja de apps";
      const respostaCerta2 = "Como baixar e fazer login";
      const respostaCerta3 = "Abrir o aplicativo do banco e enviar um pix";
      const respostaCerta4 = "Como pedir uma corrida e usar o app";

      if (
        texto === respostaCerta1 ||
        texto === respostaCerta2 ||
        texto === respostaCerta3 ||
        texto === respostaCerta4
      ) {
        resultado.textContent = "✅ Parabéns! Você acertou!";
        resultado.style.color = "green";
      } else {
        resultado.textContent = "❌ Tente novamente!";
        resultado.style.color = "red";
      }
    });
  });
});





document.addEventListener("DOMContentLoaded", () => {
  console.log("Inclusive.com carregado com sucesso!");
});
