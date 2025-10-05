// Example: replace '#' with your WhatsApp link (with phone & prefilled message)
const link_grupo = 'https://chat.whatsapp.com/SEU_GRUPO_AQUI';
const link_direto = 'https://wa.me/5511975037855?text=Ol%C3%A1!%20%0AN%C3%A3o%20estou%20conseguindo%20entrar%20no%20grupo%20do%20evento%20tortas%20no%20palito.%20%0APode%20me%20adicionar%3F';

window.addEventListener('load', () => {
  const waBtn = document.querySelector('.whatsapp-float');
  if (!waBtn) return;

  // Garante que ele comece invisível (mesmo que o CSS demore a carregar)
  waBtn.classList.remove('show');

  setTimeout(() => {
    waBtn.classList.add('show');
  }, 5000); // 5 segundos
});



    document.querySelectorAll('.link-group').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        
        // smooth micro-animation
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => window.open(link_grupo, '_blank'), 600);
      });
    });


    document.querySelectorAll('.link-direto').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        
        // smooth micro-animation
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => window.open(link_direto, '_blank'), 600);
      });
    });