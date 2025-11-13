// =======================================================
// ** CONFIGURACIÓN CLAVE **
// REEMPLAZA ESTA URL con la dirección pública de tu API de ngrok
// =======================================================
const API_URL = 'https://c5da16412146.ngrok-free.app/api/chat'; 

// Referencias a los elementos del DOM (usando los IDs que definimos)
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// =======================================================
// 1. FUNCIONES DE UTILIDAD
// =======================================================

/**
 * Añade un nuevo mensaje al contenedor del chat.
 * @param {string} message - El texto del mensaje.
 * @param {string} sender - 'user' o 'bot'.
 */
function addMessageToChat(message, sender) {
    const messageContainer = document.createElement('div');
    const messageBubble = document.createElement('div');
    
    // Configura la burbuja de mensaje según el remitente
    if (sender === 'bot') {
        // Estilo para el bot (fondo verde)
        messageBubble.className = 'w-3/4 bg-green-100 text-green-800 p-2 rounded-lg';
    } else {
        // Estilo para el usuario (fondo gris y alineación a la derecha)
        messageContainer.className = 'flex justify-end';
        messageBubble.className = 'w-3/4 bg-gray-200 p-2 rounded-lg';
    }

    messageBubble.textContent = message;
    messageContainer.appendChild(messageBubble);
    chatMessages.appendChild(messageContainer);

    // Desplaza el chat hacia abajo para ver el nuevo mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Función principal para manejar el envío de mensajes.
 */
async function sendMessage() {
    const userMessage = chatInput.value.trim();

    // 1. No hacer nada si el campo está vacío
    if (userMessage === '') {
        return;
    }

    // 2. Mostrar el mensaje del usuario y limpiar el input
    addMessageToChat(userMessage, 'user');
    chatInput.value = '';
    
    // 3. Deshabilitar la entrada y el botón mientras se espera la respuesta
    sendButton.disabled = true;
    chatInput.disabled = true;
    sendButton.textContent = 'Cargando...'; // Feedback visual
    
    try {
        // 4. Enviar el mensaje a la API de ngrok
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // El backend espera el campo 'text', no 'message'
                // Además, debes enviar los campos 'user', 'text', 'use_context', 'k_context'
            },
            body: JSON.stringify({ 
                user: "web_user", // Valor fijo para el usuario web
                text: userMessage, 
                use_context: true,
                k_context: 3
            })
        });

        // 5. Manejar errores de HTTP (ej. 404, 500)
        if (!response.ok) {
            // Intenta leer el detalle del error del backend (FastAPI)
            const errorData = await response.json().catch(() => ({ detail: `Error HTTP: ${response.status}` }));
            throw new Error(`Error en la API: ${errorData.detail || errorData.reply || response.statusText}`);
        }

        // 6. Obtener la respuesta del bot (debe ser JSON)
        const data = await response.json();
        
        // CRÍTICO: El backend devuelve 'reply', el frontend espera 'response'.
        // Aquí ajustamos el frontend para esperar la clave 'reply'.
        const botResponse = data.reply || "Lo siento, no pude procesar tu solicitud o el servidor no devolvió el formato esperado (clave 'reply').";
        
        // 7. Mostrar la respuesta del bot
        addMessageToChat(botResponse, 'bot');

    } catch (error) {
        console.error('Error al comunicarse con la API:', error);
        // Mostramos el mensaje de error detallado del catch
        addMessageToChat(`¡Ups! Error de conexión/servidor: ${error.message}.`, 'bot');
    } finally {
        // 8. Habilitar la entrada y el botón, y restaurar el texto
        sendButton.disabled = false;
        chatInput.disabled = false;
        sendButton.textContent = 'Enviar';
        chatInput.focus(); // Devuelve el foco al campo de texto
    }
}

// =======================================================
// 2. EVENT LISTENERS
// =======================================================

// CRÍTICO: Mueve la asignación de eventos dentro de window.onload
// para evitar el 'Uncaught TypeError' si el script se carga antes que el HTML.
window.onload = () => {
    // 1. Asigna foco y verifica si los elementos existen
    if (!chatInput || !sendButton) {
        console.error("ERROR CRÍTICO: No se pudieron encontrar los elementos 'chat-input' o 'send-button'. Revisa los IDs en el HTML.");
        return;
    }
    
    chatInput.focus();

    // 2. Escucha el clic en el botón 'Enviar'
    sendButton.addEventListener('click', sendMessage);

    // 3. Escucha la tecla 'Enter' en el campo de texto
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
};