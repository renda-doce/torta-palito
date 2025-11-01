// ==========================
// Configurações
// ==========================
const PIXEL_ID = '03af56d0-f5c0-4455-bd34-7719b4b383c8';
const API_URL = 'https://njsxezhedrldrfrowpml.supabase.co/functions/v1/meta-conversion';
const FACEBOOK_PIXEL_ID = '324230336566459';


// ==========================
// Função principal (único ponto de entrada)
// ==========================
async function enviarEvento(eventName, userData = {}, customData = { currency: 'BRL', value: 0 }) {
  try {
    // --- 1. Gera event_id único
    const eventId = crypto.randomUUID();

    // --- 2. Envia via Pixel (client-side)
    if (typeof fbq === 'function') {
      fbq('track', eventName, customData, { eventID: eventId });
      console.log(`Evento '${eventName}' enviado via Pixel (event_id: ${eventId})`);
    } else {
      console.warn('Meta Pixel (fbq) não carregado.');
    }

    // --- 3. Monta o payload para a API (server-side)
    const evento = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId, // mesmo ID do evento do Pixel
      action_source: 'website',
      event_source_url: window.location.href,
      user_data: userData,
      custom_data: customData,
    };

    // --- 4. Envia via API
    await sendConversion(evento);
  } catch (error) {
    console.error('Erro ao enviar evento:', error);
  }
}


// ==========================
// Envio via API de Conversões
// ==========================
async function sendConversion(evento) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-pixel-id': PIXEL_ID,
        'x-origin': window.location.origin
      },
      body: JSON.stringify(evento)
    });

    const result = await response.json();
    console.log('Evento enviado à API de conversões:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar conversão API:', error);
  }
}


// ==========================
// Utilitários
// ==========================
async function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashEmail(email) {
  return sha256(email);
}

async function hashPhone(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  return sha256(cleanPhone);
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

  async function getUserData() {
    return {
      client_user_agent: navigator.userAgent,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc')
    };
  }


document.querySelectorAll('.link-group').forEach(a => {
    a.addEventListener("click", async function () {
        if (!this.dataset.pixelSent) {
            const userData = await getUserData();

            const botao_id = this.id ? this.id : 'sem-id';
            enviarEvento('Lead', userData, {
                content_name: `Lead - Torta Palito`,
                content_id: botao_id,
                value: 0.00,
                currency: 'BRL'
            },
            
          );
        }
    });
});