// Example: replace '#' with your WhatsApp link (with phone & prefilled message)
const link_grupo = 'https://mais.red/wpp/SEMANA_TORTA_PALITO';
const link_direto = 'https://wa.me/5511951190867?text=Ol%C3%A1!%20%0AN%C3%A3o%20estou%20conseguindo%20entrar%20no%20grupo%20do%20evento%20tortas%20no%20palito.%20%0APode%20me%20adicionar%3F';





// Atualiza todos os links dinamicamente para os botões de grupo
document.querySelectorAll('.link-group').forEach(a => {
  // Atualiza os links dinamicamente
  a.setAttribute("href", link_grupo);
  a.setAttribute("target", "_blank");
  a.setAttribute("rel", "noopener noreferrer");

  // // Listener do evento
  // a.addEventListener("click", function () {
  //   // Evita duplicação de evento
  //   if (!this.dataset.pixelSent) {

  //     // Monta descrição segura e padronizada
  //     const botao_id = this.id ? this.id : 'sem-id';

  //     fbq('track', 'Lead', {
  //       content_name: `Lead - Torta Palito`,
  //       content_id: botao_id,
  //       value: 2.00,
  //       currency: 'BRL',
  //       event_source: window.location.origin,
  //       page_path: window.location.pathname,
  //     });

  //     this.dataset.pixelSent = "true";
  //     console.log("✅ Evento Meta Pixel 'Lead' enviado com sucesso.");
  //   }
  // });
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
