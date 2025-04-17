document.addEventListener('DOMContentLoaded', function() {
  // 1. Configuração do Menu Mobile
  const navbarToggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.mobile__menu');
  const body = document.body;

  if (!navbarToggle || !mobileMenu) return;

  // Overlay corrigido
  const overlay = document.createElement('div');
  overlay.classList.add('mobile__overlay');
  body.appendChild(overlay);

  // Função para toggle do menu
  const toggleMenu = () => {
    navbarToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  // Event listeners
  navbarToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // 2. Navegação Suave e Feedback Visual
  const navLinks = document.querySelectorAll('.navbar__link, .mobile__link');
  const sections = document.querySelectorAll('section, footer'); // Inclui o footer

  // Função para scroll suave
  const smoothScroll = (targetId) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = targetId === '#footer' ? 0 : 80; // Ajuste especial para o footer
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };

  // Adiciona evento de clique a todos os links de navegação
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash) {
        e.preventDefault();
        const targetId = this.hash;

        // Fecha o menu mobile se estiver aberto
        if (mobileMenu.classList.contains('active')) {
          toggleMenu();
        }

        // Scroll suave
        smoothScroll(targetId);

        // Atualiza a URL
        history.pushState(null, null, targetId);

        // Atualiza os links ativos
        updateActiveLinks();
      }
    });
  });

  // 3. Scroll Spy Aprimorado (inclui footer)
  const updateActiveLinks = () => {
    let currentSection = '';
    const scrollPosition = window.scrollY + 150; // Offset ajustado

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.id;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }

      // Verificação especial para o footer quando estiver no final da página
      if (sectionId === 'footer' && 
          (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        currentSection = 'footer';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.hash === `#${currentSection}`) {
        link.classList.add('active');
        
        // Efeito visual de clique
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = '';
        }, 200);
      }
    });
  };

  // 4. Configurações de Scroll
  let isScrolling;
  window.addEventListener('scroll', () => {
    // Efeito de scroll na navbar
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    
    // Debounce para melhor performance
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      updateActiveLinks();
    }, 100);
  }, { passive: true });

  // Atualiza estado inicial
  updateActiveLinks();

  // 5. Garante que o footer seja detectado corretamente
  window.addEventListener('load', updateActiveLinks);
});