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

// Navigation interne
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    // Supprimer la classe active sur tous les boutons
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    // Afficher la page correspondante
    let pageId = '';
    switch(btn.textContent.trim()) {
      case '🏠 Accueil': pageId = 'page-accueil'; break;
      case '🛍️ Produits': pageId = 'page-produits'; break;
      case '📱 Catégories': pageId = 'page-categories'; break;
      case '✉️ Contact': pageId = 'page-contact'; break;
    }

    if(pageId) document.getElementById(pageId).style.display = 'block';
  });
});
