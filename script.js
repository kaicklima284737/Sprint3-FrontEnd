document.addEventListener("DOMContentLoaded", () => {

    // MENU MOBILE
    const btnMobile = document.getElementById("btnMobile");
    const menu = document.getElementById("menu");
    if (btnMobile && menu) {
        btnMobile.addEventListener("click", () => menu.classList.toggle("aberto"));
        document.querySelectorAll(".menu a").forEach(link => {
            link.addEventListener("click", () => menu.classList.remove("aberto"));
        });
    }

    // TOAST
    const toast = document.getElementById("toast");
    function mostrarToast(texto) {
        if (!toast) return;
        toast.textContent = texto;
        toast.classList.add("mostrar");
        setTimeout(() => toast.classList.remove("mostrar"), 3200);
    }

    // ABAS (HERO)
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            const pane = document.getElementById(btn.getAttribute("data-tab"));
            if (pane) pane.classList.add("active");
        });
    });

    // GALERIA (MODAL)
    const modal = document.getElementById("modalGaleria");
    const modalImg = document.getElementById("modalImg");
    const modalLegenda = document.getElementById("modalLegenda");
    const modalFechar = document.getElementById("modalFechar");

    document.querySelectorAll(".item-galeria").forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            if (!img || !modal || !modalImg) return;
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            if (modalLegenda) modalLegenda.textContent = item.getAttribute("data-title") || img.alt;
            modal.classList.add("mostrar");
        });
    });

    if (modalFechar && modal) {
        modalFechar.addEventListener("click", () => modal.classList.remove("mostrar"));
        modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("mostrar"); });
    }

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal && modal.classList.contains("mostrar")) modal.classList.remove("mostrar");
    });

    // SIMULADOR
    const btnReflexo = document.getElementById("btnReflexo");
    const btnOCR = document.getElementById("btnOCR");
    const btnFlashcard = document.getElementById("btnFlashcard");
    const mockupOutput = document.getElementById("mockupOutput");
    const mockupView = document.getElementById("mockupView");

    if (btnReflexo && btnOCR && btnFlashcard && mockupOutput && mockupView) {
        btnReflexo.addEventListener("click", () => {
            mockupView.style.borderColor = "#2563eb";
            mockupOutput.textContent = "Filtro antirreflexo aplicado! Nitidez da lousa ajustada.";
        });
        btnOCR.addEventListener("click", () => {
            mockupOutput.textContent = "OCR concluído: Equação de Ondas: v = λ × f extraída para as anotações.";
        });
        btnFlashcard.addEventListener("click", () => {
            mockupOutput.textContent = "IA: 3 flashcards gerados! Ex: O que representa λ? → Comprimento de onda.";
        });
    }

    // FAQ
    document.querySelectorAll(".faq-pergunta").forEach(btn => {
        btn.addEventListener("click", () => btn.parentElement && btn.parentElement.classList.toggle("aberto"));
    });

    // FORMULÁRIO DE CONTATO
    const formContato = document.getElementById("formContato");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const mensagemInput = document.getElementById("mensagem");

    function exibirErro(id, mensagem) {
        const erro = document.getElementById(id);
        if (!erro) return;
        erro.textContent = mensagem;
        erro.style.display = "block";
    }

    if (formContato && nomeInput && emailInput && mensagemInput) {
        formContato.setAttribute("novalidate", "true"); // as mensagens de erro ficam por conta do JS

        formContato.addEventListener("submit", event => {
            event.preventDefault();
            let valido = true;

            document.querySelectorAll(".erro-msm").forEach(erro => {
                erro.textContent = "";
                erro.style.display = "none";
            });

            const nome = nomeInput.value.trim();
            if (nome === "") {
                exibirErro("erroNome", "Por favor, informe seu nome.");
                valido = false;
            } else if (nome.length < 3) {
                exibirErro("erroNome", "O nome deve possuir pelo menos 3 caracteres.");
                valido = false;
            }

            const email = emailInput.value.trim();
            if (email === "") {
                exibirErro("erroEmail", "Por favor, informe seu e-mail.");
                valido = false;
            } else if (!email.includes("@") || !email.includes(".")) {
                exibirErro("erroEmail", "Informe um endereço de e-mail válido.");
                valido = false;
            }

            const mensagem = mensagemInput.value.trim();
            if (mensagem === "") {
                exibirErro("erroMensagem", "Por favor, informe sua mensagem.");
                valido = false;
            } else if (mensagem.length < 10) {
                exibirErro("erroMensagem", "A mensagem deve possuir pelo menos 10 caracteres.");
                valido = false;
            }

            if (valido) {
                mostrarToast("Mensagem enviada com sucesso!");
                formContato.reset();
            }
        });
    }

});