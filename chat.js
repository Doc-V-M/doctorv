// A chave de API deve ser colocada diretamente no código.
const HUGGINGFACE_TOKEN = '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'; // Substitua pela sua chave de API

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return; // Se não houver texto, não envia

    addMessage('Você', userInput); // Exibe a mensagem do usuário
    document.getElementById('user-input').value = ''; // Limpa o campo de entrada

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HUGGINGFACE_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: `Imagine que você é um paciente com dislipidemia (colesterol e triglicérides altos). Eu sou o médico e vou fazer perguntas para realizar o atendimento clínico. Você deve responder de forma realista e com base nas condições de saúde de um paciente com dislipidemia. Responda como um paciente. Minha pergunta é: ${userInput}`
            })
        });

        const data = await response.json(); // Recebe a resposta da API
        console.log(data); // Exibe a resposta da API no console para depuração

        if (data.error) {
            addMessage('Paciente', 'Desculpe, estou com dificuldades para responder agora.');
            console.error(data.error);
        } else {
            const botResponse = data.generated_text || (data[0] && data[0].generated_text) || "Desculpe, não entendi.";
            addMessage('Paciente', botResponse); // Exibe a resposta da IA
        }
    } catch (error) {
        console.error('Erro na requisição à API:', error);
        addMessage('Paciente', 'Houve um erro ao tentar responder.');
    }
}

// Função para adicionar as mensagens ao chat
function addMessage(sender, message) {
    const chatContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;  // Rolagem automática
}
