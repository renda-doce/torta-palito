// Example: replace '#' with your WhatsApp link (with phone & prefilled message)
const link_grupo = 'https://chat.whatsapp.com/DlIcBaIiCdOITb4HRS9NIE';
const link_direto = 'https://wa.me/5511975037855?text=Ol%C3%A1!%20%0AN%C3%A3o%20estou%20conseguindo%20entrar%20no%20grupo%20do%20evento%20tortas%20no%20palito.%20%0APode%20me%20adicionar%3F';





// Atualiza todos os links dinamicamente para os botões de grupo
document.querySelectorAll('.link-group').forEach(a => {
    a.setAttribute("href", link_grupo);
    a.setAttribute("target", "_blank"); // abre em nova aba
    a.setAttribute("rel", "noopener noreferrer"); //
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
        exibe_politica = !exibe_politica;
        if (exibe_politica) {
            document.querySelector('#politica-privacidade').classList.remove('hidden');
        } else {
            document.querySelector('#politica-privacidade').classList.add('hidden');
        }
    });
});