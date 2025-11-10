// Example: replace '#' with your WhatsApp link (with phone & prefilled message)
const link_grupo = 'https://chat.whatsapp.com/Gi3PsE21Zjo4JhoecuAl4A';
const link_direto = 'https://wa.me/5511951192135?text=Ol%C3%A1!%20%0AN%C3%A3o%20estou%20conseguindo%20entrar%20no%20grupo%20do%20evento%20tortas%20no%20palito.%20%0APode%20me%20adicionar%3F';





// Atualiza todos os links dinamicamente para os botões de grupo
document.querySelectorAll('.link-group').forEach(a => {
  // Atualiza os links dinamicamente
  a.setAttribute("href", link_grupo);
  a.setAttribute("target", "_blank");
  a.setAttribute("rel", "noopener noreferrer");
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
