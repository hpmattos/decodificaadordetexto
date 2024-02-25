const textoInput = document.getElementById('texto');
const botaoCriptografar = document.getElementById('criptografar');
const botaoDescriptografar = document.getElementById('descriptografar');
const botaoCopiar = document.getElementById('copiar');
const resultado = document.getElementById('resultado');

// Define os caracteres que serão substituídos na codificação e na decodificação
const codificacao = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat"
};

const decodificacao = {
  "ai": "a",
  "enter": "e",
  "imes": "i",
  "ober": "o",
  "ufat": "u"
};

function codificar(texto) {
  //Codifica o texto usando o mapa
  return texto.replace(/[aeiou]/g, caractere => codificacao[caractere]);
}

function decodificar(texto) {
  // Decodifica o texto usando o mapa
  let temp = texto;
  Object.keys(decodificacao).map(key => {
    temp = temp.replaceAll(key, decodificacao[key]);
  })
  return temp;
  
}

function atualizarResultado(criptografar) {
  const texto = textoInput.value;
  
  let resultadoTexto;

  // inicialmente desabilita o botão de copiar 
  botaoCopiar.disabled = true;

  if (criptografar) {
    resultadoTexto = codificar(texto);
  } else {
    resultadoTexto = decodificar(texto);
  }

  // Mostra o resultado
  resultado.textContent = resultadoTexto;
  if (resultadoTexto.trim().length == 0) {
    resultado.style.visibility = "hidden"
  }
  else {
    resultado.style.visibility = "visible"
  }


  // Habilita o o botão copiar de acordo com o resultado
  botaoCopiar.disabled = resultadoTexto.length <= 0;

}

// Add event listeners nos botões
botaoCriptografar.addEventListener('click', () => {
  botaoCriptografar.classList.add('ativo');
  botaoDescriptografar.classList.remove('ativo');
  atualizarResultado(true);
});

botaoDescriptografar.addEventListener('click', () => {
  botaoCriptografar.classList.remove('ativo');
  botaoDescriptografar.classList.add('ativo');
  atualizarResultado(false);
});

botaoCopiar.addEventListener('click', () => {
  // Usa o Clipboard para copiar o texto
  navigator.clipboard.writeText(resultado.textContent).then(() => {
    alert('Texto copiado com sucesso!');
  }, () => {
    alert('Falha ao copiar o texto.');
  });
});

// Chama o atualizarResultado inicialmene para mostrar o ressultado vazio
atualizarResultado();
document.getElementById("texto").focus();