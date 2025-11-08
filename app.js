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

// Catégories toggle
document.querySelectorAll('.category-header').forEach(header => {
  header.addEventListener('click', () => {
    const products = header.nextElementSibling;
    products.style.display = products.style.display === 'flex' ? 'none' : 'flex';
  });
});

// Produits click -> page produit détaillée
const productsData = {
  cali_weed_us: {
    title: "Cali Weed US 🇺🇸",
    description: "Sativa de Californie, très puissante et parfumée.",
    price: "50€/g",
    video: "assets/cali_weed_us.mp4"
  },
  cocaine: {
    title: "Cocaine ❄️",
    description: "Produit de haute pureté.",
    price: "80€/g",
    video: "assets/cocaine.mp4"
  },
  produit_c: { title: "Produit C", description: "Description C", price: "40€", video: "assets/produit_c.mp4" },
  produit_d: { title: "Produit D", description: "Description D", price: "60€", video: "assets/produit_d.mp4" },
  produit_e: { title: "Produit E", description: "Description E", price: "70€", video: "assets/produit_e.mp4" },
  produit_f: { title: "Produit F", description: "Description F", price: "30€", video: "assets/produit_f.mp4" },
  produit_g: { title: "Produit G", description: "Description G", price: "90€", video: "assets/produit_g.mp4" },
};

document.querySelectorAll('.product').forEach(prod => {
  prod.addEventListener('click', () => {
    const key = prod.dataset.product;
    if(!productsData[key]) return;
    document.getElementById('page-produits').style.display = 'none';
    document.getElementById('page-categories').style.display = 'none';
    document.getElementById('page-produit-detail').style.display = 'block';
    document.getElementById('product-title').textContent = productsData[key].title;
    document.getElementById('product-description').textContent = productsData[key].description;
    document.getElementById('product-price').textContent = productsData[key].price;
    document.getElementById('product-video-src').src = productsData[key].video;
    document.getElementById('product-video').load();
  });
});

// Retour produits
document.getElementById('back-to-produits').addEventListener('click', () => {
  document.getElementById('page-produit-detail').style.display = 'none';
  document.getElementById('page-produits').style.display = 'block';
});
