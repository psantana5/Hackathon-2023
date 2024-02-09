document.getElementById('send-button').addEventListener('click', () => {
    const inputField = document.getElementById('input-field');
    const userMessage = inputField.value;

    if (userMessage.trim() !== '') {
        addMessageToDom('User', userMessage);
        inputField.value = '';

        fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer #Not leaking any API keys today ;) '
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    max_tokens: 150,
                    n: 1,
                    stop: null,
                    temperature: 0.5
                })
            })
            .then(response => response.json())
            .then(data => {
                const chatbotResponse = data.choices[0].text.trim();
                addMessageToDom('TeenTalk', chatbotResponse);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
document.querySelector('.messages').innerHTML = '<div class="message"><p>Welcome to the TeenTalk chatbot! How can I help you today?</p></div>';

function addMessageToDom(sender, message) {
    const messagesDiv = document.getElementById('messages');
    const newMessageDiv = document.createElement('div');
    newMessageDiv.classList.add('message');
    newMessageDiv.innerHTML = `<b>${sender}:</b> ${message}`;
    messagesDiv.appendChild(newMessageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
