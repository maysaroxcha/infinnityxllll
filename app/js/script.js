
// 1. Smooth Scroll - Navegação suave para as seções do site
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const topOffset = target.getBoundingClientRect().top + window.scrollY - 100; // Ajuste para barra fixa
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    });
});

 // 2. Animação de contagem dos números (seção "Entrada")
// Função para verificar se o elemento está visível na viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
};

// Função para animar os contadores com sincronização e estabilidade do layout
const animateCounters = () => {
    const counters = document.querySelectorAll('.contador');
    const duration = 2000; // Duração total da animação em milissegundos
    const frameRate = 60; // Taxa de quadros por segundo
    const totalFrames = Math.round((duration / 1000) * frameRate);

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-numero')); // Valor final do contador
        let count = 0; // Começa a partir de 0
        const increment = target / totalFrames; // Incremento por frame

        let frame = 0;
        const updateCount = () => {
            if (frame < totalFrames) {
                count += increment;
                counter.innerText = Math.floor(count); // Garante números inteiros
                frame++;
                requestAnimationFrame(updateCount); // Controle preciso de quadros
            } else {
                counter.innerText = target; // Garante que atinja o valor final exato
            }
        };

        updateCount(); // Inicia a contagem
    });
};

// Observador para iniciar a contagem apenas quando a seção estiver visível
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // Para observar apenas uma vez
            }
        });
    },
    { threshold: 0.5 } // Inicia quando 50% da seção estiver visível
);

// Observa a seção dos números
document.addEventListener('DOMContentLoaded', () => {
    const numerosSection = document.querySelector('.numeros');
    if (numerosSection) {
        observer.observe(numerosSection);
    }
});



// 3. Configuração de horários indisponíveis para reuniões
const ocupados = {
    "2024-01-02": ["09:30", "10:30"], // Ocupado em 2 de janeiro
    "2024-01-03": ["13:30"],          // Ocupado em 3 de janeiro
};

document.getElementById("data").addEventListener("change", function () {
    const dataSelecionada = this.value;
    const horarioSelect = document.getElementById("horariocomercial");

    if (horarioSelect) {
        // Reseta as opções de horário
        [...horarioSelect.options].forEach(option => {
            option.classList.remove("disabled");
            option.disabled = false;
        });

        // Desativa os horários ocupados
        if (ocupados[dataSelecionada]) {
            ocupados[dataSelecionada].forEach(horario => {
                const option = [...horarioSelect.options].find(opt => opt.value === horario);
                if (option) {
                    option.classList.add("disabled");
                    option.disabled = true;
                }
            });
        }
    }
});




// 4.serviços
const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let scrollPosition = 0; // Posição inicial do carrossel
const itemWidth = carousel.offsetWidth / 3; // Largura de um item (ajustar conforme a quantidade visível)

// Duplicar os itens para criar o loop infinito
const cloneItems = () => {
  const items = [...carousel.children];
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone); // Adiciona os clones ao final
  });
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    carousel.insertBefore(clone, carousel.firstChild); // Adiciona os clones ao início
  });
};

// Inicializar o loop infinito
const initializeLoop = () => {
  cloneItems();
  carousel.scrollLeft = carousel.scrollWidth / 2; // Posiciona na metade
  scrollPosition = carousel.scrollLeft;
};

// Botão "Próximo"
nextBtn.addEventListener("click", () => {
  scrollPosition += itemWidth;
  carousel.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });

  // Ajustar a posição para criar o loop infinito
  setTimeout(() => {
    if (scrollPosition >= carousel.scrollWidth - carousel.offsetWidth) {
      scrollPosition = carousel.scrollWidth / 2;
      carousel.scrollLeft = scrollPosition;
    }
  }, 500); // Tempo para a rolagem suave terminar
});

// Botão "Anterior"
prevBtn.addEventListener("click", () => {
  scrollPosition -= itemWidth;
  carousel.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });

  // Ajustar a posição para criar o loop infinito
  setTimeout(() => {
    if (scrollPosition <= 0) {
      scrollPosition = carousel.scrollWidth / 2 - carousel.offsetWidth;
      carousel.scrollLeft = scrollPosition;
    }
  }, 500); // Tempo para a rolagem suave terminar
});

// Inicializar o carrossel
initializeLoop();






// 5.tecnologias
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carouseltecn-track');
    const items = document.querySelectorAll('.carouseltecn-item');
    const btnLeft = document.querySelector('.carouseltecn-btn.left');
    const btnRight = document.querySelector('.carouseltecn-btn.right');
  
    const itemWidth = items[0].clientWidth; // Largura de um item
    const totalItems = items.length; // Número total de itens
    let currentIndex = 0; // Índice inicial do carrossel
  
    // Atualizar a posição do carrossel
    const updateCarousel = () => {
      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };
  
    // Clique no botão "Próximo"
    btnRight.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
  
      // Quando atingir o último item, volte para o primeiro
      setTimeout(() => {
        if (currentIndex >= totalItems) {
          track.style.transition = 'none'; // Remove a transição
          currentIndex = 0; // Volta para o primeiro item
          track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }
      }, 0); // Tempo igual à duração da transição
    });
  
    // Clique no botão "Anterior"
    btnLeft.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();
  
      // Quando atingir o primeiro item, volte para o último
      setTimeout(() => {
        if (currentIndex < 0) {
      track.style.transition = 'none'; // Remove a transição
          currentIndex = totalItems - 1; // Vai para o último item
          track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }
      }, 500); // Tempo igual à duração da transição
    });
  
    // Responsividade: Atualiza a largura dos itens ao redimensionar a janela
    window.addEventListener('resize', () => {
      track.style.transition = 'none'; // Remove a transição durante o redimensionamento
      track.style.transform = `translateX(-${currentIndex * items[0].clientWidth}px)`;
    });
  
    // Inicializar o carrossel na posição inicial
    updateCarousel();
  });

  








// 6. Formulário: Resetar e exibir mensagem de sucesso
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o comportamento padrão do envio do formulário

    // Redefine os campos do formulário
    this.reset();

    // Exibe a mensagem de sucesso
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    mensagemSucesso.style.display = 'block';

    // Desativa o botão de envio temporariamente
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    // Esconde a mensagem após 12 segundos e reativa o botão
    setTimeout(() => {
        mensagemSucesso.style.display = 'none';
        submitButton.disabled = false;
    }, 12000); // 12 segundos
});

// telefone ajustes
document.getElementById("telefone").addEventListener("input", function (e) {
    let input = e.target.value;
    input = input.replace(/\D/g, ""); // Remove qualquer caractere que não seja número
    input = input.replace(/^(\d{2})(\d)/, "($1) $2"); // Adiciona os parênteses
    input = input.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona o traço após os 5 primeiros dígitos
    e.target.value = input;
});


//rolaem de contato para entre em contato//
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offset = 160; // Altura da barra fixa
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    });
});


//rolaem de fale conosco para entre em contato//
document.querySelector('.btn[href="#contato"]').addEventListener('click', function (e) {
    e.preventDefault(); // Evita o comportamento padrão
    const target = document.querySelector('#contato');
    const offset = 100; // Ajuste para a altura do cabeçalho, se necessário
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth', // Rolagem suave
    });
});





  
