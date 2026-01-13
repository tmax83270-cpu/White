const tg = window.Telegram.WebApp;
tg.expand();

// --- Navigation onglets ---
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    const pageId = btn.dataset.page;
    document.getElementById(pageId).style.display = 'block';

    if (pageId === 'page-produits') {
      showProductList(document.querySelector('#page-produits .product-list'), Object.keys(productsData));
    }
  });
});

// --- Accueil cartes ---
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});

// --- Données produits ---
const productsData = {
  cali_weed_us_1: {
    title: "CALI WEED 🇺🇸",
    subtitle: "Super Boof ✨",
    description: "Sativa Californienne, très puissante.",
    video: "assets/cali_weed_us_1.mp4",
    prices: [{ qty: "4g", price: "50€" }, { qty: "8g", price: "90€" }]
  },
  cocaine: {
    title: "COCAINE ❄️",
    subtitle: "Ecaille ⚡️",
    description: "Produit de Top qualité ressors a 0.9 convient tout autant pour les fumeurs que les sniffeurs 👃.",
    video: "assets/cocaine.mp4",
    prices: [{ qty: "1g", price: "60€" }, { qty: "2g", price: "100€" }, {qty: "5g", price: "240€" }, {qty: "10g", price: "380€" }]
  },
  trois_mmc: {
    title: "3MMC 🇳🇱",
    subtitle: "Cailloux 🧊",
    description: "Produit stimulant, effet intense.",
    video: "assets/trois_mmc.mp4",
    prices: [{ qty: "2g", price: "50€" }, { qty: "5g", price: "110€" }]
  },
  filtre_73u: {
    title: "FILTRÉ 73U ⚡️",
    subtitle: "NO FARM",
    description: "Hash top qualité, 73u.",
    video: "assets/filtre_73u.mp4",
    prices: [{ qty: "❌❌", price: "❌❌" }, { qty: "❌❌", price: "❌❌" }]
  },
  jaune_mousse: {
    title: "JAUNE MOUSSE 🧽",
    subtitle: "Gelato",
    description: "Hash aromatique, texture unique.",
    video: "assets/jaune_mousse.mp4",
    prices: [{ qty: "10g", price: "50€" }, { qty: "100g", price: "280€" }]
  },
  amnesia: {
    title: "WEED 🇳🇱",
    subtitle: "Amnesia 🌿🇳🇱",
    description: "Description complète de ton produit ici.",
    video: "assets/amnesia.mp4",
    prices: [{ qty: "❌❌", price: "❌❌" }, { qty: "❌❌", price: "❌❌" }]
  }
};

// --- Produits page ---
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

// --- Catégories ---
const categoriesData = {
  festifs: ['cocaine', 'trois_mmc'],
  weed: ['cali_weed_us_1', 'amnesia'],
  hash: ['filtre_73u', 'jaune_mousse']
};

document.querySelectorAll('.category-card').forEach(card => {
  const category = card.dataset.category;
  const seeBtn = card.querySelector('.see-products');
  seeBtn.addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-produits').style.display = 'block';
    showProductList(document.querySelector('#page-produits .product-list'), categoriesData[category]);
  });
});

// --- Ouvrir produit détail ---
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

// --- Cliquer sur VOIR ---
document.addEventListener('click', e => {
  if (e.target.classList.contains('voir-btn')) {
    openProductDetail(e.target.closest('.product').dataset.product);
  }
});

// --- Retour page produit détaillé vers la liste des produits ---
document.getElementById('back-to-produits').addEventListener('click', () => {
  document.getElementById('page-produit-detail').style.display = 'none';
  document.getElementById('page-produits').style.display = 'block';
});

// --- Commander ---
document.getElementById('order-btn').addEventListener('click', () => {
  const selected = document.querySelector('.price-option.selected');
  const qty = selected ? selected.textContent : '';
  const productName = document.getElementById('product-title').textContent;
  tg.sendData(JSON.stringify({ product: productName, quantity: qty }));
  alert(`Commande envoyée : ${productName} - ${qty}`);
});
