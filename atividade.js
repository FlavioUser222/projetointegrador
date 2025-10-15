
let tamanhoFonte = 100;

const btnAumentar = document.getElementById("increaseFont");
const btnDiminuir = document.getElementById("decreaseFont");
const btnContraste = document.getElementById("toggleContrast");
const btnCores = document.getElementById("toggleColors");

btnAumentar.addEventListener("click", () => {
  tamanhoFonte += 10;
  if (tamanhoFonte > 30) {
    return
  }

  document.body.style.fontSize = `${tamanhoFonte}%`;
});

btnDiminuir.addEventListener("click", () => {
  if (tamanhoFonte > 50) {
    tamanhoFonte -= 10;
    document.body.style.fontSize = `${tamanhoFonte}%`
  }
});

btnContraste.addEventListener("click", () => {
  document.body.classList.toggle("modo-escuro")
});

btnCores.addEventListener("click", () => {
  document.body.classList.toggle("cores-alternativas");
});




const botoesResposta = document.querySelectorAll(".resposta");
const resultado = document.getElementById("resultado");

botoesResposta.forEach((botao) => {
  botao.addEventListener("click", () => {
    const texto = botao.innerText.trim();


    const respostaCerta1 = "Ter internet e acessar a loja de apps";
    const respostaCerta2 = "Como baixar e fazer login";

    if (texto === respostaCerta1 || texto === respostaCerta2) {
      resultado.textContent = "✅ Parabéns! Você acertou!";
      resultado.style.color = "green";
    } else {
      resultado.textContent = "❌ Tente novamente!";
      resultado.style.color = "red";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  console.log("Inclusive.com carregado com sucesso!");
});
