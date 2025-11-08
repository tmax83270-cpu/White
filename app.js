// Initialise Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Navigation interne
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

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

// Cartes interactives
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});

// Boutons action des cartes
document.querySelectorAll('.action').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation(); // éviter de trigger le toggle de la carte
    const data = btn.dataset.send;
    tg.sendData(data);
  });
});

// Produits boutons
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const productData = btn.closest('.product').dataset.send;
    alert(`Vous avez choisi : ${JSON.parse(productData).product}`);
    tg.sendData(productData);
  });
});

// Catégories toggle
document.querySelectorAll('.category-header').forEach(header => {
  header.addEventListener('click', () => {
    const products = header.nextElementSibling;
    products.style.display = products.style.display === 'flex' ? 'none' : 'flex';
  });
});
