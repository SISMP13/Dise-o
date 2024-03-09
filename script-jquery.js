$(document).ready(function(){
    const numberDisplay = $("#number-display");
    const userInput = $("#user-input");
    const startButton = $("#start-button");
    const submitButton = $("#submit-button");
    const levelIndicator = $("#level-indicator");
    const result = $("#result");
    const restartButton = $("#restart-button");
    const progressBarContainer = $("#progress-bar-container");
    const progressBar = $("#progress-bar");

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
        numberDisplay.text(sequenceString); // Mostrar la secuencia completa

        let startTime = Date.now(); // Tiempo de inicio
        progressBarContainer.css("display", "block"); // Mostrar la barra de progreso
        userInput.css("display", "none"); // Ocultar el input del usuario
        submitButton.css("display", "none"); // Ocultar el botón de enviar

        const interval = setInterval(() => {
            let elapsedTime = Date.now() - startTime; // Tiempo transcurrido
            let progress = (elapsedTime / 3000) * 100; // Calcular progreso

            if (progress >= 100) {
                clearInterval(interval);
                numberDisplay.text("Enter the number"); // Mostrar el mensaje después de 3 segundos
                progressBarContainer.css("display", "none"); // Ocultar la barra de progreso
                userInput.css("display", "block"); // Mostrar el input del usuario
                submitButton.css("display", "inline-block"); // Mostrar el botón de enviar
                userInput.focus(); // Enfocar el input del usuario
            } else {
                progressBar.width(`${progress}%`); // Actualizar el ancho de la barra de progreso
            }
        }, 100); // Revisar cada 100 milisegundos
    }

    function startGame() {
        generateNumberSequence(currentLevel + 1);
        displayNumberSequence();
        levelIndicator.text(`Level ${currentLevel + 1}`);
        startButton.css("display", "none"); // Oculta el botón "start"
        userInput.val(""); // Limpiar el input del usuario
        result.text(""); // Limpiar el resultado
        restartButton.css("display", "none"); // Oculta el botón "restart"
    }

    function submitAnswer() {
        const userAnswer = userInput.val().trim();
        if (userAnswer === numberSequence.join("")) {
            currentLevel++;
            levelIndicator.text(`Level ${currentLevel + 1}`);
            userInput.val("");

            // Mostrar mensaje de "Correct" durante 3 segundos
            result.html(`<div class="correct-message">Correct<br>
                            Correct Answer: <span style="color: #7eff7e; font-weight: bold;">${numberSequence.join("")}</span><br>
                            Your Answer: <span style="color: #ff8282; font-weight: bold;">${userAnswer}</span><br>
                            Next Level: ${currentLevel + 1}</div>
                            <button id="next-button">Next</button>`);

            // Agregar evento click al botón "Next"
            $("#next-button").click(function(){
                result.html(""); // Limpiar el resultado
                startGame(); // Continuar con el siguiente nivel
            });

            // Ocultar automáticamente el mensaje después de 3 segundos
            setTimeout(() => {
                result.html(""); // Limpiar el resultado después de 3 segundos
                startGame(); // Continuar con el siguiente nivel
            }, 3000);
        } else {
            endGame();
        }
    }

    function endGame() {
        let correctAnswer = numberSequence.join("");
        let userAnswer = userInput.val().trim();
        let scoreMessage = `Your Score: Level ${currentLevel}`;
        let resultHTML = `<div class="incorrect-message">Incorrect. Game Over:<br>`;
        resultHTML += `Correct Answer: <span style="color: #7eff7e; font-weight: bold;">${correctAnswer}</span><br>`;
        resultHTML += `Your Answer: <span style="color: #ffcccc; font-weight: bold;">${userAnswer}</span><br>`;
        resultHTML += `</div>${scoreMessage}`;
        result.html(resultHTML);
        restartButton.css("display", "inline-block");
        startButton.css("display", "none"); // Oculta el botón "start"
        userInput.css("display", "none"); // Oculta el input del usuario
        submitButton.css("display", "none"); // Oculta el botón de enviar
        progressBarContainer.css("display", "none"); // Oculta la barra de progreso
    }

    function restartGame() {
        generateNumberSequence(currentLevel + 1);
        displayNumberSequence();
        levelIndicator.text(`Level ${currentLevel + 1}`);
        startButton.css("display", "none"); // Oculta el botón "start"
        userInput.val(""); // Limpiar el input del usuario
        result.text(""); // Limpiar el resultado
        restartButton.css("display", "none"); // Oculta el botón "restart"
    }

    startButton.click(startGame);
    submitButton.click(submitAnswer);
    restartButton.click(restartGame);
});
