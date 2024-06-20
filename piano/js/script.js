const keys = document.querySelectorAll(".key");
const checkbox = document.querySelector(".checkbox__keys");
const switcher = document.querySelector(".switcher");
const keysSection = document.querySelector(".piano__keys");

// Função que toca uma nota musical
const playNote = (note) => {
  // Chama as notas e passa para o "audio"
  const audio = new Audio(`notes/${note}.wav`);
  audio.play();
};

// Função que é chamada quando o mouse é pressionado em uma tecla
const handleMouseDown = (key) => {
  // Toca a nota correspondente à tecla
  playNote(key.getAttribute("data-note"));

  // Se a tecla é uma tecla preta, adiciona a classe "black--pressed"
  if (key.className.includes("black")) {
    key.classList.add("black--pressed");
    return;
  }

  // Se precionar uma tecla branca, muda a cor de fundo da tecla para cinza claro
  key.style.background = "#ddd";
};

// Função que é chamada quando clica em uma tecla
const handleMouseUp = (key) => {
  // Se a tecla é uma tecla preta, remove a classe "black--pressed"
  if (key.className.includes("black")) {
    key.classList.remove("black--pressed");
    return;
  }

  // Se a tecla é uma tecla branca, muda a cor de fundo para branco
  key.style.background = "white";
};

// Adiciona os eventos de pressionar e soltar o mouse em cada tecla
keys.forEach((key) => {
  key.addEventListener("mousedown", () => handleMouseDown(key));
  key.addEventListener("mouseup", () => handleMouseUp(key));
});

// Adiciona um evento de mudança ao checkbox
checkbox.addEventListener("change", ({ target }) => {
  // Se o checkbox está marcado, ativa o switcher e desaparece as teclas do tecaldo
  if (target.checked) {
    switcher.classList.add("switcher--active");
    keysSection.classList.remove("disabled-keys");
    return;
  }

  // Se o checkbox não está marcado, desativa o switcher e mostra as teclas do teclado
  switcher.classList.remove("switcher--active");
  keysSection.classList.add("disabled-keys");
});

// Mapeia as teclas do teclado para as funções de pressionar o mouse
const keyDownMapper = {
  Tab: () => handleMouseDown(keys[0]),
  1: () => handleMouseDown(keys[1]),
  q: () => handleMouseDown(keys[2]),
  2: () => handleMouseDown(keys[3]),
  w: () => handleMouseDown(keys[4]),
  e: () => handleMouseDown(keys[5]),
  4: () => handleMouseDown(keys[6]),
  r: () => handleMouseDown(keys[7]),
  5: () => handleMouseDown(keys[8]),
  t: () => handleMouseDown(keys[9]),
  6: () => handleMouseDown(keys[10]),
  y: () => handleMouseDown(keys[11]),
  u: () => handleMouseDown(keys[12]),
  8: () => handleMouseDown(keys[13]),
  i: () => handleMouseDown(keys[14]),
  9: () => handleMouseDown(keys[15]),
  o: () => handleMouseDown(keys[16]),
  p: () => handleMouseDown(keys[17]),
  "-": () => handleMouseDown(keys[18]),
  "[": () => handleMouseDown(keys[19]),
  "=": () => handleMouseDown(keys[20]),
  "]": () => handleMouseDown(keys[21]),
  Backspace: () => handleMouseDown(keys[22]),
  "\\": () => handleMouseDown(keys[23]),
};

// Mapeia as teclas do teclado para as funções de soltar o mouse
const keyUpMapper = {
  Tab: () => handleMouseUp(keys[0]),
  1: () => handleMouseUp(keys[1]),
  q: () => handleMouseUp(keys[2]),
  2: () => handleMouseUp(keys[3]),
  w: () => handleMouseUp(keys[4]),
  e: () => handleMouseUp(keys[5]),
  4: () => handleMouseUp(keys[6]),
  r: () => handleMouseUp(keys[7]),
  5: () => handleMouseUp(keys[8]),
  t: () => handleMouseUp(keys[9]),
  6: () => handleMouseUp(keys[10]),
  y: () => handleMouseUp(keys[11]),
  u: () => handleMouseUp(keys[12]),
  8: () => handleMouseUp(keys[13]),
  i: () => handleMouseUp(keys[14]),
  9: () => handleMouseUp(keys[15]),
  o: () => handleMouseUp(keys[16]),
  p: () => handleMouseUp(keys[17]),
  "-": () => handleMouseUp(keys[18]),
  "[": () => handleMouseUp(keys[19]),
  "=": () => handleMouseUp(keys[20]),
  "]": () => handleMouseUp(keys[21]),
  Backspace: () => handleMouseUp(keys[22]),
  "\\": () => handleMouseUp(keys[23]),
};

// Faz tocar as notas através do teclado
// Adiciona um evento de pressionar uma tecla
document.addEventListener("keydown", (event) => {
  // Previne o comportamento padrão da tecla
  event.preventDefault();
  // Chama a função correspondente à tecla pressionada
  keyDownMapper[event.key]();
});

// Adiciona um evento de soltar uma tecla
document.addEventListener("keyup", (event) => {
  // Chama a função correspondente à tecla solta
  keyUpMapper[event.key]();
});
