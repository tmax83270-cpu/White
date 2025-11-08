// --- Initialisation Telegram ---
const tg = window.Telegram.WebApp;
tg.expand();

// --- Navigation entre les pages ---
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    let pageId = '';
    switch (btn.textContent.trim()) {
      case '🏠 Accueil': pageId = 'page-accueil'; break;
      case '📱 Catégories': pageId = 'page-categories'; break;
      case '🛍️ Produits': pageId = 'page-produits'; break;
      case '✉️ Contact': pageId = 'page-contact'; break;
    }
    if (pageId) document.getElementById(pageId).style.display = 'block';
  });
});

// --- Animation d'ouverture des cartes de l'accueil ---
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('expanded'));
});

// --- Données produits ---
const productsData = {
  cali_weed_us: {
    title: "CALI WEED 🇺🇸",
    subtitle: "Zkittles 🍒",
    description: "Variété premium directement importée de Californie. Arôme fruité et effet puissant garanti.",
    video: "assets/cali_weed_us.mp4",
    prices: [
      { qty: "10g", price: "90€" },
      { qty: "20g", price: "180€" },
      { qty: "50g", price: "400€" }
    ]
  },
  cocaine: {
    title: "COCAÏNE ❄️",
    subtitle: "Pureté supérieure",
    description: "Produit de haute qualité, raffiné et pur. Destiné à un public averti.",
    video: "assets/cocaine.mp4",
    prices: [
      { qty: "1g", price: "80€" },
      { qty: "5g", price: "350€" },
      { qty: "10g", price: "650€" }
    ]
  },
  "3mmc": {
    title: "3MMC 🇳🇱",
    subtitle: "Cailloux 🧊",
    description: "Cristaux hollandais purs, effets intenses et montée rapide. Produit chimique de synthèse de haute qualité.",
    video: "assets/3mmc.mp4",
    prices: [
      { qty: "1g", price: "40€" },
      { qty: "5g", price: "180€" },
      { qty: "10g", price: "350€" }
    ]
  },
  jaune_mousse: {
    title: "JAUNE MOUSSE 🧽",
    subtitle: "Flavors 🌸",
    description: "Hash mousseux de couleur dorée, texture souple, goût floral et effet relaxant.",
    video: "assets/jaune_mousse.mp4",
    prices: [
      { qty: "10g", price: "80€" },
      { qty: "20g", price: "150€" },
      { qty: "50g", price: "350€" }
    ]
  },
  filtre_73u: {
    title: "FILTRÉ 73U ⚡️",
    subtitle: "NO FARM",
    description: "Hash raffiné issu d’une extraction filtrée à 73 microns. Goût puissant et pur.",
    video: "assets/filtre_73u.mp4",
    prices: [
      { qty: "10g", price: "100€" },
      { qty: "20g", price: "190€" },
      { qty: "50g", price: "450€" }
    ]
  }
};

// --- Affichage des produits ---
function showProductList(container, keys) {
  container.innerHTML = '';
  keys.forEach(k => {
    const prod = productsData[k];
    const div = document.createElement('div');
    div.className = 'product';
    div.dataset.product = k;
    div.innerHTML = `
      <div class="product-top"><img src="assets/${k}.jpg" alt="${prod.title}"></div>
      <div class="product-bottom">
        <h2>${prod.title}</h2>
        <h3>${prod.subtitle}</h3>
        <div class="voir-btn">VOIR</div>
      </div>
    `;
    container.appendChild(div);
  });
}

// Affiche tous les produits dans la page "Produits"
showProductList(document.querySelector('#page-produits .product-list'), Object.keys(productsData));

// --- Page détail produit ---
function openProductDetail(key) {
  const data = productsData[key];
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById('page-produit-detail').style.display = 'block';

  document.getElementById('product-title').textContent = data.title;
  document.getElementById('product-subtitle').textContent = data.subtitle || '';
  document.getElementById('product-description').textContent = data.description;
  document.getElementById('product-video-src').src = data.video;
  document.getElementById('product-video').load();

  const pricesContainer = document.getElementById('product-prices');
  pricesContainer.innerHTML = '';
  data.prices.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'price-option';
    div.textContent = `${p.qty} : ${p.price}`;
    if (i === 0) div.classList.add('selected');
    div.addEventListener('click', () => {
      document.querySelectorAll('.price-option').forEach(c => c.classList.remove('selected'));
      div.classList.add('selected');
    });
    pricesContainer.appendChild(div);
  });
}

// --- Cliquer sur "VOIR" ---
document.addEventListener('click', e => {
  if (e.target.classList.contains('voir-btn')) {
    openProductDetail(e.target.closest('.product').dataset.product);
  }
});

// --- Bouton retour ---
document.getElementById('back-to-produits').addEventListener('click', () => {
  document.getElementById('page-produit-detail').style.display = 'none';
  document.getElementById('page-produits').style.display = 'block';
});

// --- Bouton Commander ---
document.getElementById('order-btn').addEventListener('click', () => {
  const selected = document.querySelector('.price-option.selected');
  const qty = selected ? selected.textContent : '';
  const productName = document.getElementById('product-title').textContent;
  tg.sendData(JSON.stringify({ product: productName, quantity: qty }));
  alert(`Commande envoyée : ${productName} - ${qty}`);
});
