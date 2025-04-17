document.addEventListener('DOMContentLoaded', function() {
  // Filtro de projetos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Ativa o botão clicado
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.dataset.filter;
      
      // Filtra os projetos
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Efeito de carregar mais projetos (simulação)
  const loadMoreBtn = document.querySelector('.btn-load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // Aqui você pode implementar a lógica para carregar mais projetos via AJAX
      // ou adicionar mais elementos ao DOM
      loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
      setTimeout(() => {
        loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Todos os projetos carregados';
        loadMoreBtn.disabled = true;
      }, 1500);
    });
  }
  
  // Animação ao scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.6s ease';
      observer.observe(element);
    });
  };
  
  animateOnScroll();
});