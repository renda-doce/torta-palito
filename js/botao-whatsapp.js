// Example: replace '#' with your WhatsApp link (with phone & prefilled message)
const link_grupo = 'https://chat.whatsapp.com/DlIcBaIiCdOITb4HRS9NIE';
const link_direto = 'https://wa.me/5511975037855?text=Ol%C3%A1!%20%0AN%C3%A3o%20estou%20conseguindo%20entrar%20no%20grupo%20do%20evento%20tortas%20no%20palito.%20%0APode%20me%20adicionar%3F';

document.querySelectorAll('.link-group').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(link_grupo, '_blank')
    });
});


document.querySelector('.link-direto').addEventListener('click', (e) => {
    e.preventDefault();
        window.open(link_direto, '_blank');
});

document.querySelector('#link-politica-privacidade').addEventListener('click', (e) => {
    document.querySelector('#politica-privacidade').classList.remove('hidden');
});


document.addEventListener('DOMContentLoaded', () => {
    // Link configurável
    const hint = document.getElementById('whatsapp-hint');
    const btn = document.getElementById('whatsapp-btn');

    // Define link dinamicamente
    btn.href = link_direto;

    // Mostra o botão e o texto após 5s
    setTimeout(() => {
        hint.classList.remove('opacity-0', 'invisible');
        btn.classList.remove('opacity-0', 'invisible');
        hint.classList.add('opacity-100', 'visible');
        btn.classList.add('opacity-100', 'visible');
    }, 5000);

    // Remove o texto de dica após 7s
    setTimeout(() => {
        if (hint) {
            hint.classList.add('opacity-0', 'transition-opacity', 'duration-700');
            setTimeout(() => hint.remove(), 700);
        }
    }, 12000);
});