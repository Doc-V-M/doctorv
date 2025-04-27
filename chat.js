// Função de envio de mensagens
async function sendMessage() {
    const inputText = document.getElementById('inputText').value;
    if (inputText === '') return;
    
    // Exibir mensagem do usuário no chat
    document.getElementById('chatbox').innerHTML += `<p><strong>Você:</strong> ${inputText}</p>`;

    // Aqui você pode integrar com o modelo de IA do Hugging Face ou outras APIs para responder
    const response = await fetch("https://api-inference.huggingface.co/models/gpt-2", {
        method: "POST",
        headers: {
            "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({ inputs: inputText })
    });
    const data = await response.json();
    const iaResponse = data[0]?.generated_text || "Desculpe, não entendi a sua pergunta.";
    
    // Exibir resposta da IA no chat
    document.getElementById('chatbox').innerHTML += `<p><strong>Paciente:</strong> ${iaResponse}</p>`;
    
    // Limpar o campo de texto
    document.getElementById('inputText').value = '';
}
