document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.createElement('div');
    chatBox.style.width = '300px';
    chatBox.style.height = '400px';
    chatBox.style.border = '1px solid #ccc';
    chatBox.style.padding = '10px';
    chatBox.style.overflowY = 'scroll';
    chatBox.style.backgroundColor = '#fff';
    document.body.appendChild(chatBox);

    const userInput = document.createElement('input');
    userInput.style.width = '100%';
    userInput.style.marginTop = '10px';
    document.body.appendChild(userInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Enviar';
    submitButton.style.marginTop = '10px';
    document.body.appendChild(submitButton);

    submitButton.addEventListener('click', function() {
        const userText = userInput.value;
        const messageElement = document.createElement('div');
        messageElement.textContent = `Você: ${userText}`;
        chatBox.appendChild(messageElement);
        userInput.value = '';

        // Simulação de resposta da IA (Você pode substituir isso por uma API de IA depois)
        setTimeout(function() {
            const botResponse = document.createElement('div');
            botResponse.textContent = `IA: (simulação) Estou com dificuldades em respirar.`;
            chatBox.appendChild(botResponse);
            chatBox.scrollTop = chatBox.scrollHeight;

            // Chama a função de voz após a resposta
            speak(botResponse.textContent);
        }, 1000);
    });

    // Função para usar Speech-to-Text
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';

    // Quando o microfone captar o que você disser, ele coloca no input
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
    };

    // Função para iniciar o reconhecimento de voz
    const startVoiceInput = () => {
        recognition.start();
    };

    // Função para falar as respostas da IA
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        window.speechSynthesis.speak(utterance);
    }

    // Coloca um botão para ativar o reconhecimento de voz
    const voiceButton = document.createElement('button');
    voiceButton.textContent = 'Falar';
    voiceButton.style.marginTop = '10px';
    document.body.appendChild(voiceButton);

    voiceButton.addEventListener('click', startVoiceInput);
});
