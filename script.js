const numberDisplay = document.getElementById("number-display");
const userInput = document.getElementById("user-input");
const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");
const levelIndicator = document.getElementById("level-indicator");
const result = document.getElementById("result");
const restartButton = document.getElementById("restart-button");
const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");

let numberSequence = [];
let currentLevel = 0;

function generateNumberSequence(level) {
    numberSequence = [];
    const maxDigits = 20; // Máximo de dígitos permitidos
    for (let i = 0; i < Math.min(level, maxDigits); i++) {
        numberSequence.push(Math.floor(Math.random() * 10));
    }
}

function displayNumberSequence() {
    const sequenceString = numberSequence.join(""); // Convertir el array en una cadena
    numberDisplay.innerText = sequenceString; // Mostrar la secuencia completa

    let startTime = Date.now(); // Tiempo de inicio
    progressBarContainer.style.display = "block"; // Mostrar la barra de progreso
    userInput.style.display = "none"; // Ocultar el input del usuario
    submitButton.style.display = "none"; // Ocultar el botón de enviar

    const interval = setInterval(() => {
        let elapsedTime = Date.now() - startTime; // Tiempo transcurrido
        let progress = (elapsedTime / 3000) * 100; // Calcular progreso

        if (progress >= 100) {
            clearInterval(interval);
            numberDisplay.innerText = "Enter the number"; // Mostrar el mensaje después de 3 segundos
            progressBarContainer.style.display = "none"; // Ocultar la barra de progreso
            userInput.style.display = "block"; // Mostrar el input del usuario
            submitButton.style.display = "inline-block"; // Mostrar el botón de enviar
            userInput.focus(); // Enfocar el input del usuario
        } else {
            progressBar.style.width = `${progress}%`; // Actualizar el ancho de la barra de progreso
        }
    }, 100); // Revisar cada 100 milisegundos
}

function startGame() {
    generateNumberSequence(currentLevel + 1);
    displayNumberSequence();
    levelIndicator.innerText = `Level ${currentLevel + 1}`;
    startButton.style.display = "none"; // Oculta el botón "start"
    userInput.value = ""; // Limpiar el input del usuario
    result.innerText = ""; // Limpiar el resultado
    restartButton.style.display = "none"; // Oculta el botón "restart"
}

function submitAnswer() {
    const userAnswer = userInput.value.trim();
    if (userAnswer === numberSequence.join("")) {
        currentLevel++;
        levelIndicator.innerText = `Level ${currentLevel + 1}`;
        userInput.value = "";

        // Mostrar mensaje de "Correct" durante 3 segundos
        result.innerHTML = `<div class="correct-message">Correct<br>
                            Correct Answer: <span style="color: #7eff7e; font-weight: bold;">${numberSequence.join("")}</span><br>
                            Your Answer: <span style="color: #ff8282; font-weight: bold;">${userAnswer}</span><br>
                            Next Level: ${currentLevel + 1}</div>
                            <button id="next-button">Next</button>`;

        // Agregar evento click al botón "Next"
        const nextButton = document.getElementById("next-button");
        nextButton.addEventListener("click", () => {
            result.innerHTML = ""; // Limpiar el resultado
            startGame(); // Continuar con el siguiente nivel
        });

        // Ocultar automáticamente el mensaje después de 3 segundos
        setTimeout(() => {
            result.innerHTML = ""; // Limpiar el resultado después de 3 segundos
            startGame(); // Continuar con el siguiente nivel
        }, 3000);
    } else {
        endGame();
    }
}



function endGame() {
    let correctAnswer = numberSequence.join("");
    let userAnswer = userInput.value.trim();
    let scoreMessage = `Your Score: Level ${currentLevel}`;
    let resultHTML = `<div class="incorrect-message">Incorrect. Game Over:<br>`;
    resultHTML += `Correct Answer: <span style="color: #7eff7e; font-weight: bold;">${correctAnswer}</span><br>`;
    resultHTML += `Your Answer: <span style="color: #ffcccc; font-weight: bold;">${userAnswer}</span><br>`;
    resultHTML += `</div>${scoreMessage}`;
    result.innerHTML = resultHTML;
    restartButton.style.display = "inline-block";
    startButton.style.display = "none"; // Oculta el botón "start"
    userInput.style.display = "none"; // Oculta el input del usuario
    submitButton.style.display = "none"; // Oculta el botón de enviar
    progressBarContainer.style.display = "none"; // Oculta la barra de progreso
}



function restartGame() {
    generateNumberSequence(currentLevel + 1);
    displayNumberSequence();
    levelIndicator.innerText = `Level ${currentLevel + 1}`;
    startButton.style.display = "none"; // Oculta el botón "start"
    userInput.value = ""; // Limpiar el input del usuario
    result.innerText = ""; // Limpiar el resultado
    restartButton.style.display = "none"; // Oculta el botón "restart"
}

startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", submitAnswer);
restartButton.addEventListener("click", restartGame);
