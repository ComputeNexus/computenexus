const phrases = [
    "I'm looking for GPUs to buy or rent.",
    "I need 4 megawatts of liquid-cooled, Tier III data center colocation.",
    "I want a private cloud with no egress fees on a monthly contract."
];

const typedText = document.getElementById("typed-text");

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function animateText() {
    if (!typedText) return;

    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            deleting = true;
            setTimeout(animateText, 1600);
            return;
        }
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(animateText, deleting ? 20 : 38);
}

document.addEventListener("DOMContentLoaded", animateText);