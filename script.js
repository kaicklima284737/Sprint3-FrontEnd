document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 0. Otimização e Skeleton Loading das Imagens dos Protótipos
    // =========================================================
    const imagensPrototipo = document.querySelectorAll(".item-galeria img");

    imagensPrototipo.forEach((img) => {
        // Aplica Lazy Loading para evitar carregamento desnecessário
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }

        const containerPai = img.parentElement;

        if (!img.complete) {
            containerPai.classList.add("skeleton-loading");

            img.addEventListener("load", () => {
                containerPai.classList.remove("skeleton-loading");
                img.classList.add("imagem-carregada");
            });

            img.addEventListener("error", () => {
                containerPai.classList.remove("skeleton-loading");
                containerPai.classList.add("erro-carregamento");
            });
        } else {
            img.classList.add("imagem-carregada");
        }
    });

    // =========================================================
    // 1. Menu Mobile
    // =========================================================
    const btnMobile = document.getElementById("btnMobile");
    const menu = document.getElementById("menu");

    if (btnMobile && menu) {
        btnMobile.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }

    // =========================================================
    // 2. Abas do Hero Section
    // =========================================================
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const target = btn.getAttribute("data-tab");
            const activePane = document.getElementById(target);
            if (activePane) {
                activePane.classList.add("active");
            }
        });
    });

    // =========================================================
    // 3. Modal da Galeria (Destaque das Imagens dos Protótipos)
    // =========================================================
    const galeriaItems = document.querySelectorAll(".item-galeria");
    const modalGaleria = document.getElementById("modalGaleria");
    const modalImg = document.getElementById("modalImg");
    const modalLegenda = document.getElementById("modalLegenda");
    const modalFechar = document.getElementById("modalFechar");

    function abrirModalGaleria(imgSrc, titulo) {
        if (modalGaleria && modalImg && modalLegenda) {
            modalImg.src = imgSrc;
            modalLegenda.textContent = titulo;
            modalGaleria.classList.add("ativo");
            document.body.style.overflow = "hidden";
        }
    }

    function fecharModalGaleria() {
        if (modalGaleria) {
            modalGaleria.classList.remove("ativo");
            document.body.style.overflow = "auto";
        }
    }

    galeriaItems.forEach(item => {
        item.addEventListener("click", () => {
            const imgElement = item.querySelector("img");
            const pElement = item.querySelector("p");
            
            const imgSrc = item.getAttribute("data-img") || (imgElement ? imgElement.src : "");
            const titulo = item.getAttribute("data-title") || (pElement ? pElement.textContent : "");
            
            if (imgSrc) {
                abrirModalGaleria(imgSrc, titulo);
            }
        });
    });

    if (modalFechar) {
        modalFechar.addEventListener("click", fecharModalGaleria);
    }

    if (modalGaleria) {
        modalGaleria.addEventListener("click", (e) => {
            if (e.target === modalGaleria) {
                fecharModalGaleria();
            }
        });
    }

    // =========================================================
    // 4. Modal dos Membros da Equipe
    // =========================================================
    const membros = document.querySelectorAll(".card-membro");
    const modalMembro = document.getElementById("modalMembro");
    const modalMembroNome = document.getElementById("modalMembroNome");
    const modalMembroBio = document.getElementById("modalMembroBio");
    const modalMembroFechar = document.getElementById("modalMembroFechar");

    membros.forEach(membro => {
        membro.addEventListener("click", () => {
            const h3Element = membro.querySelector("h3");
            const nome = h3Element ? h3Element.textContent : "";
            const bio = membro.getAttribute("data-bio") || "";
            
            if (modalMembro && modalMembroNome && modalMembroBio) {
                modalMembroNome.textContent = nome;
                modalMembroBio.textContent = bio;
                modalMembro.classList.add("ativo");
                document.body.style.overflow = "hidden";
            }
        });
    });

    function fecharModalMembro() {
        if (modalMembro) {
            modalMembro.classList.remove("ativo");
            document.body.style.overflow = "auto";
        }
    }

    if (modalMembroFechar) {
        modalMembroFechar.addEventListener("click", fecharModalMembro);
    }

    if (modalMembro) {
        modalMembro.addEventListener("click", (e) => {
            if (e.target === modalMembro) {
                fecharModalMembro();
            }
        });
    }

    // Fechar modais com a tecla ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            fecharModalGaleria();
            fecharModalMembro();
        }
    });

    // =========================================================
    // 5. FAQ Accordion
    // =========================================================
    const faqPerguntas = document.querySelectorAll(".faq-pergunta");
    faqPerguntas.forEach(pergunta => {
        pergunta.addEventListener("click", () => {
            const resposta = pergunta.nextElementSibling;
            const estaAberto = resposta && resposta.style.display === "block";

            document.querySelectorAll(".faq-resposta").forEach(r => r.style.display = "none");
            document.querySelectorAll(".faq-pergunta span").forEach(s => s.textContent = "+");

            if (!estaAberto && resposta) {
                resposta.style.display = "block";
                const span = pergunta.querySelector("span");
                if (span) span.textContent = "-";
            }
        });
    });

    // =========================================================
    // 6. Simulador Interativo
    // =========================================================
    const mockupView = document.getElementById("mockupView");
    const mockupOutput = document.getElementById("mockupOutput");
    const btnReflexo = document.getElementById("btnReflexo");
    const btnOCR = document.getElementById("btnOCR");
    const btnFlashcard = document.getElementById("btnFlashcard");
    const inputFoto = document.getElementById("inputFoto");

    if (btnReflexo) {
        btnReflexo.addEventListener("click", () => {
            if (mockupView) mockupView.style.filter = "contrast(120%) brightness(110%)";
            if (mockupOutput) mockupOutput.textContent = "✨ Filtro antirreflexo aplicado à imagem!";
        });
    }

    if (btnOCR) {
        btnOCR.addEventListener("click", () => {
            if (mockupOutput) mockupOutput.textContent = "📄 Texto Extraído: 'Equação de Ondas: v = λ * f'";
        });
    }

    if (btnFlashcard) {
        btnFlashcard.addEventListener("click", () => {
            if (mockupOutput) mockupOutput.textContent = "🧠 Flashcard Criado: Q: O que significa λ? | R: Comprimento de Onda.";
        });
    }

    if (inputFoto) {
        inputFoto.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    if (mockupView) {
                        mockupView.innerHTML = `<img src="${evt.target.result}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:8px;">`;
                    }
                    if (mockupOutput) mockupOutput.textContent = "📸 Imagem enviada para o simulador com sucesso!";
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // =========================================================
    // 7. Validação do Formulário de Contato e Toast Message
    // =========================================================
    const formContato = document.getElementById("formContato");
    const toast = document.getElementById("toast");
    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const inputMensagem = document.getElementById("mensagem");

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrarToast(mensagem) {
        if (toast) {
            toast.textContent = mensagem;
            toast.classList.add("ativo");
            setTimeout(() => {
                toast.classList.remove("ativo");
            }, 3500);
        }
    }

    // Funções auxiliares para feedback dos campos
    const setErro = (input, spanId, mensagem) => {
        const erroElemento = document.getElementById(spanId);
        if (erroElemento) erroElemento.textContent = mensagem;
        if (input) input.classList.add("campo-invalido");
    };

    const limparErro = (input, spanId) => {
        const erroElemento = document.getElementById(spanId);
        if (erroElemento) erroElemento.textContent = "";
        if (input) input.classList.remove("campo-invalido");
    };

    // Validações individuais
    const validarNome = () => {
        if (!inputNome) return true;
        const valor = inputNome.value.trim();
        if (valor === "") {
            setErro(inputNome, "erroNome", "O nome é obrigatório.");
            return false;
        } if (valor.length < 3) {
            setErro(inputNome, "erroNome", "O nome deve ter pelo menos 3 caracteres.");
            return false;
        }
        limparErro(inputNome, "erroNome");
        return true;
    };

    const validarEmail = () => {
        if (!inputEmail) return true;
        const valor = inputEmail.value.trim();
        if (valor === "") {
            setErro(inputEmail, "erroEmail", "O e-mail é obrigatório.");
            return false;
        } if (!regexEmail.test(valor)) {
            setErro(inputEmail, "erroEmail", "Insira um e-mail válido.");
            return false;
        }
        limparErro(inputEmail, "erroEmail");
        return true;
    };

    const validarMensagem = () => {
        if (!inputMensagem) return true;
        const valor = inputMensagem.value.trim();
        if (valor === "") {
            setErro(inputMensagem, "erroMensagem", "A mensagem não pode estar vazia.");
            return false;
        } if (valor.length < 10) {
            setErro(inputMensagem, "erroMensagem", "A mensagem deve ter pelo menos 10 caracteres.");
            return false;
        }
        limparErro(inputMensagem, "erroMensagem");
        return true;
    };

    // Escuta eventos de digitação em tempo real (input)
    inputNome?.addEventListener("input", validarNome);
    inputEmail?.addEventListener("input", validarEmail);
    inputMensagem?.addEventListener("input", validarMensagem);

    // Envio do formulário
    if (formContato) {
        formContato.addEventListener("submit", (e) => {
            e.preventDefault();

            const nomeValido = validarNome();
            const emailValido = validarEmail();
            const mensagemValida = validarMensagem();

            if (nomeValido && emailValido && mensagemValida) {
                mostrarToast("✅ Mensagem enviada com sucesso! Entraremos em contato.");
                formContato.reset();
            }
        });
    }
});