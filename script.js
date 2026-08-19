const screenEnv  = document.getElementById("screen-envelope");
const screenLtr  = document.getElementById("screen-letter");
const openBtn    = document.getElementById("open-btn");
const letterCard = document.getElementById("letter-card");
const noBtn      = document.getElementById("no-btn");
const yesBtn     = document.getElementById("yes-btn");
const question   = document.getElementById("letter-question");
const finalEl    = document.getElementById("letter-final");
const catImg     = document.getElementById("cat-img");

// ─── Open envelope ───────────────────────────────────────────────
openBtn.addEventListener("click", () => {
    // Fade out envelope screen
    screenEnv.style.transition = "opacity 0.4s ease";
    screenEnv.style.opacity = "0";

    setTimeout(() => {
        screenEnv.style.display = "none";
        screenLtr.style.display = "flex";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                letterCard.classList.add("open");
            });
        });
    }, 380);
});


// ─── No button: slides away smoothly ─────────────────────────────
noBtn.addEventListener("mouseover", () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Pick a random edge direction to escape to
    const angle = Math.random() * Math.PI * 2;
    const dist  = 180 + Math.random() * 120;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;

    noBtn.style.transition = "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease";
    noBtn.style.transform  = `translate(${tx}px, ${ty}px)`;
    noBtn.style.opacity    = "0.3";
});

noBtn.addEventListener("mouseleave", () => {
    // Sneaks back when mouse leaves
    setTimeout(() => {
        noBtn.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease";
        noBtn.style.transform  = "translate(0, 0)";
        noBtn.style.opacity    = "1";
    }, 600);
});


// ─── Yes button ───────────────────────────────────────────────────
yesBtn.addEventListener("click", () => {
    question.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    question.style.opacity = "0";
    question.style.transform = "translateY(-8px)";

    catImg.src = "cat_dance.gif";
    letterCard.classList.add("final");

    setTimeout(() => {
        question.style.display = "none";
        finalEl.style.display  = "flex";
        finalEl.style.flexDirection = "column";
    }, 300);

    spawnParticles(yesBtn);
});


// ─── Subtle shimmer particles on YES click ───────────────────────
function spawnParticles(origin) {
    const rect   = origin.getBoundingClientRect();
    const cx     = rect.left + rect.width / 2;
    const cy     = rect.top  + rect.height / 2;
    const colors = ["#e86fa3", "#f4a1b8", "#b06cd6", "#fde8d8", "#ffffff"];

    for (let i = 0; i < 28; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");

        const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.4;
        const dist  = 60 + Math.random() * 90;
        const tx    = Math.cos(angle) * dist;
        const ty    = Math.sin(angle) * dist;

        p.style.left      = cx + "px";
        p.style.top       = cy + "px";
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width     = (3 + Math.random() * 4) + "px";
        p.style.height    = p.style.width;
        p.style.setProperty("--tx", tx + "px");
        p.style.setProperty("--ty", ty + "px");
        p.style.animationDuration  = (0.6 + Math.random() * 0.6) + "s";
        p.style.animationDelay     = Math.random() * 0.15 + "s";

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1400);
    }
}
