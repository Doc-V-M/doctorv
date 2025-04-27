document.addEventListener('DOMContentLoaded', function() {
    // Lista de Casos Clínicos
    const casosClinicos = [
        {
            titulo: "Paciente com Dislipidemia Primária",
            introducao: "Você está atendendo um paciente de 45 anos que veio para avaliação de rotina. Nos exames laboratoriais, foram encontrados níveis elevados de LDL e triglicerídeos.",
            respostas: {
                "quais são seus sintomas": "Não estou sentindo nada diferente, estou bem.",
                "histórico familiar": "Meu pai teve infarto aos 52 anos e minha mãe tem diabetes.",
                "você faz uso de medicamentos": "Não faço uso de medicamentos regularmente.",
                "você pratica atividade física": "Muito pouco, só caminhadas ocasionais.",
                "como está sua alimentação": "Como muita fritura e carnes gordurosas, pouca salada."
            },
            gabarito: "Você deveria orientar mudanças de estilo de vida (alimentação e exercícios), iniciar estatina de acordo com o risco cardiovascular e monitorar lipidograma."
        }
    ];

    // Sorteia um caso aleatório
    const casoAtual = casosClinicos[Math.floor(Math.random() * casosClinicos.length)];

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

    const voiceButton = document.createElement('button');
    voiceButton.textContent = 'Falar';
    voiceButton.style.marginTop = '10px';
    document.body.appendChild(voiceButton);

    document.body.appendChild(voiceButton);
    document.body.appendChild(submitButton);

    // Exibe a introdução do caso assim que abrir
    const casoIntro = document.createElement('div');
    casoIntro.textContent = `Caso: ${casoAtual.titulo}\n${casoAtual.introducao}`;
    chatBox.appendChild(casoIntro);
    speak(casoIntro.textContent);

    submitButton.addEventListener('click', function() {
        const userText = userInput.value.toLowerCase();
        const messageElement = document.createElement('div');
        messageElement.textContent = `Você: ${userInput.value}`;
        chatBox.appendChild(messageElement);
        userInput.value = '';

        // Verifica se a pergunta existe nas respostas
        let resposta = "Não entendi, poderia repetir?";
        for (let pergunta in casoAtual.respostas) {
            if (userText.includes(pergunta)) {
                resposta = casoAtual.respostas[pergunta];
                break;
            }
        }

        const botResponse = document.createElement('div');
        botResponse.textContent = `Paciente: ${resposta}`;
        chatBox.appendChild(botResponse);
        chatBox.scrollTop = chatBox.scrollHeight;
        speak(botResponse.textContent);
    });

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        submitButton.click();
    };

    recognition.onerror = function(event) {
        console.log("Erro no reconhecimento de voz:", event.error);
    };

    voiceButton.addEventListener('click', function() {
        recognition.start();
    });

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.name === "Google português do Brasil");
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
});
