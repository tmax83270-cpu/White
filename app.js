// Initialise Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Sélectionne tous les boutons d'action
document.querySelectorAll('.action').forEach(btn => {
  btn.addEventListener('click', () => {
    const data = btn.dataset.send; // récupère le JSON
    tg.sendData(data); // envoie au bot Telegram
  });
});
