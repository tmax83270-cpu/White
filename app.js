const tg = window.Telegram.WebApp;
tg.expand();

// --- Données produits ---
const productsData = {
  cali_weed_us: {
    title: "CALI WEED 🇺🇸",
    subtitle: "Zkittles 🍒",
    description: "Sativa Californienne, très puissante.",
    video: "assets/cali_weed_us.mp4",
    prices: [{ qty: "10g", price: "90€" }, { qty: "20g", price: "180€" }]
  },
  cocaine: {
    title: "COCAINE ❄️",
    subtitle: "",
    description: "Produit de haute pureté.",
    video: "assets/cocaine.mp4",
    prices: [{ qty: "1g", price: "80€" }, { qty: "5g", price: "350€" }]
  },
  filtre_73u: {
    title: "FILTRÉ 73U ⚡️",
    subtitle: "NO FARM",
    description: "Hash de qualité premium.",
    video: "assets/filtre_73u.mp4",
    prices: [{ qty: "5g", price: "60€" }, { qty: "10g", price: "110€" }]
  },
  jaune_mousse: {
    title: "JAUNE MOUSSE 🧽",
    subtitle: "Flavors 🌸",
    description: "Hash aromatique.",
    video: "assets/jaune_mousse.mp4",
    prices: [{ qty: "5g", price: "55€" }, { qty: "10g", price: "100€" }]
  },
  mmc_3: {
    title: "3MMC 🇳🇱",
    subtitle: "Cailloux 🧊",
    description: "Produit synthétique stimulant.",
    video: "assets/3mmc.mp4",
    prices: [{ qty: "1g", price: "50€" }, { qty: "3g", price: "140€" }]
  }
};

// --- Catégories ---
const categoriesData = {
  festifs: ["cocaine", "mmc_3"],
  hash: ["filtre_73u", "jaune_mousse"],
  weed: ["cali_weed_us"]
};

// --- Navigation onglets ---
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    let pageId = '';
    switch (btn.textContent.trim()) {
      case '🏠 Accueil': pageId = 'page-accueil'; break;
      case '🛍️ Produits':
        pageId = 'page-produits';
        // Affiche toujours tous les produits
        showProductList(document.querySelector('#page-produits .product-list'), Object.keys(productsData));
        break;
      case '📱 Catégories': pageId = 'page-categories'; break;
      case '✉️ Contact': pageId = 'page-contact'; break;
    }
    if (pageId) document.getElementById(pageId).style.display = 'block';
  });
});

// --- Accueil cartes ---
document.querySelectorAll('.card').forEach(card => {
  const header = card.querySelector('.card-header h3');
  const details = card.querySelector('.card-details');
  const arrow = document.createElement('span');
  arrow.textContent = '▾';
  arrow.style.float = 'right';
  arrow.style.marginRight = '10px';
  header.appendChild(arrow);

  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    if (card.classList.contains('expanded')) arrow.style.display = 'none';
    else arrow.style.display = 'inline';
  });
});

// --- Fonction afficher liste produits ---
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

// --- Fonction ouvrir produit détail ---
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

// --- Cliquer sur VOIR produit ---
document.addEventListener('click', e => {
  if (e.target.classList.contains('voir-btn')) {
    openProductDetail(e.target.closest('.product').dataset.product);
  }
});

// --- Bouton retour page produits ---
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

// --- Voir produits par catégorie ---
document.querySelectorAll('.see-products').forEach(btn => {
  btn.addEventListener('click', () => {
    const categoryCard = btn.closest('.category-card');
    const catKey = categoryCard.dataset.category;
    const productKeys = categoriesData[catKey] || [];

    showProductList(document.querySelector('#page-produits .product-list'), productKeys);
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-produits').style.display = 'block';
  });
});
