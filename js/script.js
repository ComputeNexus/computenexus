const phrases = [
    "I'm looking for GPUs to buy or rent.",
    "I need 4 megawatts of liquid-cooled, Tier III data center colocation.",
    "I want a private cloud with no egress fees on a monthly contract."
];

const typedText = document.getElementById("typed-text");

let currentPhrase = 0;

function rotateText() {
    if (!typedText) return;

    typedText.classList.remove("visible");

    setTimeout(() => {
        typedText.textContent = phrases[currentPhrase];
        typedText.classList.add("visible");

        currentPhrase = (currentPhrase + 1) % phrases.length;
    }, 350);
}

document.addEventListener("DOMContentLoaded", () => {
    rotateText();
    setInterval(rotateText, 3600);
});