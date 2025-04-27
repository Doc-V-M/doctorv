document.addEventListener('DOMContentLoaded', function() {
    // Lista de Casos Clínicos
    const casosClinicos = [
        {
            titulo: "Paciente com Dislipidemia Primária",
            introducao: "Você está atendendo um paciente de 45 anos, sem sintomas aparentes. Em exames laboratoriais, observou-se LDL elevado (180 mg/dL) e triglicerídeos aumentados (250 mg/dL).",
            respostas: {
                "sintomas": "Eu estou me sentindo bem, sem dores ou desconfortos.",
                "histórico familiar": "Meu pai teve um infarto aos 52 anos e minha mãe tem diabetes.",
                "medicação": "Não estou usando medicamentos atualmente.",
                "atividade física": "Eu faço caminhadas leves, 1 a 2 vezes por semana.",
                "alimentação": "Minha alimentação é ruim, como muita gordura e fast food.",
                "alcool": "Bebo socialmente, umas duas vezes por semana.",
                "tabagismo": "Não fumo."
            },
            gabarito: "Conduta esperada: Educação em saúde, mudanças no estilo de vida, considerar início de estatinas de acordo com o risco cardiovascular global."
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
    casoIntro.textContent = `🩺 Caso: ${casoAtual.titulo}\n\n📄 Introdução: ${casoAtual.introducao}`;
    chatBox.appendChild(casoIntro);
    speak(casoIntro.textContent);

    submitButton.addEventListener('click', function() {
        const userText = userInput.value.toLowerCase();
        const messageElement = document.createElement('div');
        messageElement.textContent = `Você: ${userInput.value}`;
        chatBox.appendChild(messageElement);
        userInput.value = '';

        // Verifica se a pergunta existe nas respostas
        let resposta = "Não entendi, poderia reformular sua pergunta?";
        for (let chave in casoAtual.respostas) {
            if (userText.includes(chave)) {
                resposta = casoAtual.respostas[chave];
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
