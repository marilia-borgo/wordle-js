

const   TENTATIVAS = 6; //quantas vezes eu posso adivinhar
let guessesRemaining =  TENTATIVAS; //no inicio sempre sobrarao seis chances
let currentGuess = []; // lista vazia para a quantidade de vezes que eu posso adivinhar
let nextLetter = 0;
let respostaCorreta = WORDS[Math.floor(Math.random() * WORDS.length)] //sorteia uma palavra da lista

console.log(respostaCorreta) //mostra a palavra certa só para teste


function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining] //pega as letras da div
    let guessString = '' //inicia a variavel vazia
    let respostaCertaArray = Array.from(respostaCorreta) //transforma a palavra corrtea em uma string

    for (const val of currentGuess) {
         guessString += val //vai adicionando as letras
    }
//incia o loop para verificação
    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i] //só pode ser cinco valores
        let letter = currentGuess[i]  //cada letra dentro da lista
        
        let letterPosition = respostaCertaArray.indexOf(currentGuess[i])
        // is letter in the correct guess
        //-1 é do indexof() retorna -1 se não existe no array
        if (letterPosition === -1) {
            letterColor = 'gray'
        } else {
            // nesse else a letra esta na mesma palavra
            //o index da palavra certa e da tentativa tem de ser o mesmo
            if (currentGuess[i] === respostaCertaArray[i]) {
                // troca a classe para verde
                letterColor = 'green'
            } else {
                // troca a classe para amarelo
                letterColor = 'yellow'
            }

            respostaCertaArray[letterPosition] = "#"
        }

        let delay = 100 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor
        }, delay)
    }

    if (guessString === respostaCorreta) {
        window.alert("Você acertou!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            window.alert("Acabram as suas chances o jogo acabou!")
            window.alert(`A palavra certa era"${respostaCorreta}"`)
        }
    }
}

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  //cria a promessa para fazer a animação
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

   //quando a animação termina resolve a promessa tbm
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})
