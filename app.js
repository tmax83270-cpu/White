// Initialise Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Gestion des clics sur les actions (Livraison / Meet-up / Horaires)
document.querySelectorAll('.action').forEach(btn => {
  btn.addEventListener('click', () => {
    const data = btn.dataset.send;
    console.log('Action envoyée :', data);
    tg.sendData(data);
  });
});

// Gestion des clics sur les produits
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const productData = btn.closest('.product').dataset.send;
    console.log('Produit choisi :', productData);
    alert(`Vous avez choisi : ${JSON.parse(productData).product}`);
    tg.sendData(productData);
  });
});
