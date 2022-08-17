import { WORDS } from "./words.js"; // importa as palavras

const NUMBER_OF_GUESSES = 6; //quantas vezes eu posso adivinhar
let guessesRemaining = NUMBER_OF_GUESSES; //no inicio sempre sobrarao seis chances
let currentGuess = []; // lista vazia para a quantidade de vezes que eu posso adivinhar
let nextLetter = 0;
let respostaCorreta = WORDS[Math.floor(Math.random() * WORDS.length)] //sorteia uma palavra da lista

console.log(respostaCorreta) //mostra a palavra certa só para teste



function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(respostaCorreta)

    for (const val of currentGuess) {
         guessString += val
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // nesse else a letra esta na mesma palavra
            //o index da palavra certa e da tentativa tem de ser o mesmo
            if (currentGuess[i] === rightGuess[i]) {
                // troca a classe para verde
                letterColor = 'green'
            } else {
                // troca a classe para amarelo
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
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

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})