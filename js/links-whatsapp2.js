// Example: replace '#' with your WhatsApp link (with phone & prefilled message)
const link_grupo = 'https://chat.whatsapp.com/Gi3PsE21Zjo4JhoecuAl4A';
const link_direto = 'https://wa.me/5511951192135?text=Ol%C3%A1!%20%0AN%C3%A3o%20estou%20conseguindo%20entrar%20no%20grupo%20do%20evento%20tortas%20no%20palito.%20%0APode%20me%20adicionar%3F';





// DETECÇÃO DO NAVEGADOR
function isInstagramBrowser() {
  return navigator.userAgent.toLowerCase().includes("instagram");
}

function isMobile() {
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}

// GERADOR DE TENTATIVAS DE ABERTURA
function abrirWhatsAppFallback() {
  const numeroOuGrupo = link_grupo; // seu link atual
  const waStandard = numeroOuGrupo; // já válido (wa.me ou link do grupo)

  // 1. Deep link nativo (primeira tentativa)
  if (isMobile()) {
    // tentar abrir o grupo direto no WhatsApp
    window.location.href = `whatsapp://chat?link=${encodeURIComponent(waStandard)}`;

    setTimeout(() => {
      // 2. Intent para forçar app no Instagram / Android
      window.location.href =
        `intent://send?text=${encodeURIComponent(waStandard)}#Intent;scheme=whatsapp;package=com.whatsapp;end;`;

      setTimeout(() => {
        // 3. Abrir via navegador como fallback
        window.open(waStandard, "_blank", "noopener,noreferrer");

        // 4. Último recurso: mostrar QR / mensagem
        setTimeout(() => {
          const aviso = document.createElement("div");
          aviso.innerHTML = `
            <div style="
              position:fixed; top:0; left:0; width:100%; height:100%;
              background:rgba(0,0,0,0.7); display:flex; align-items:center;
              justify-content:center; z-index:99999; padding:20px; color:white;
              text-align:center;
            ">
              <div style="background:#fff; color:#222; padding:20px; border-radius:12px; max-width:320px;">
                <h3 style="font-size:18px; font-weight:bold;">Não conseguiu abrir o WhatsApp?</h3>
                <p style="margin-top:10px; font-size:15px;">
                  Toque abaixo para entrar no grupo:
                </p>
                <a href="${waStandard}" 
                   style="background:#25D366; display:block; padding:12px; margin-top:10px;
                          border-radius:8px; color:#fff; font-weight:bold;">
                  Abrir WhatsApp
                </a>
                <p style="margin-top:12px; font-size:13px;">Ou escaneie com a câmera:</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(waStandard)}"
                     alt="QR WhatsApp" style="margin:10px auto; display:block;">
              </div>
            </div>
          `;
          document.body.appendChild(aviso);
        }, 1500);

      }, 900);
    }, 700);
  } else {
    // Desktop: mostra link+QR
    window.open(waStandard, "_blank", "noopener,noreferrer");
  }
}


// APLICA NOS BOTÕES DO GRUPO
document.querySelectorAll('.link-group').forEach(a => {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    abrirWhatsAppFallback();
  });
});



// Atualiza todos os links dinamicamente para os botões de contato
document.querySelectorAll('.link-direto').forEach(a => {
  a.setAttribute("href", link_direto);
  a.setAttribute("target", "_blank"); // abre em nova aba
  a.setAttribute("rel", "noopener noreferrer"); //
});


let exibe_politica = false;

// Mostra ou esconde a política de privacidade
document.querySelectorAll('.link-politica-privacidade').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault(); // evita recarregar a página, se for <a>
    exibe_politica = !exibe_politica;

    const politica = document.querySelector('#politica-privacidade');
    politica.classList.toggle('hidden', !exibe_politica);
  });
});
