// --- TELEGRAM WEBAPP INIT ---
const tg = window.Telegram.WebApp;
tg.expand();

// --- HAPTIC VIBRATION ---
function haptic() {
  if (window.Telegram && Telegram.WebApp && Telegram.WebApp.HapticFeedback) {
    Telegram.WebApp.HapticFeedback.impactOccurred('light');
  }
}

// =============================
// --- 1️⃣ NAVIGATION ONGLETS ---
// =============================
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    haptic(); // 🔔 vibration

    // Activer l'onglet cliqué
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Afficher la page correspondante
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    const pageId = btn.dataset.page;
    document.getElementById(pageId).style.display = 'block';

    // Si on clique sur Produits, afficher tous les produits
    if (pageId === 'page-produits') {
      showProductList(document.querySelector('#page-produits .product-list'), Object.keys(productsData));
    }
  });
});

// =============================
// --- 2️⃣ CARTES ACCUEIL ---
// =============================
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});

// =============================
// --- 3️⃣ DONNÉES PRODUITS ---
// =============================
const productsData = {
  cali_weed_us_1: {
    title: "CALI WEED 🇺🇸",
    subtitle: "Super Boof ✨",
    description: "Sativa Californienne, très puissante.",
    video: "assets/cali_weed_us_1.mp4",
    prices: [{ qty: "4g", price: "50€" }, { qty: "8g", price: "90€" }]
  },
  cali_weed_us_2: {
    title: "CALI WEED 🇺🇸",
    subtitle: "RS 11 ⛽️ ",
    description: "Sativa Californienne, très puissante.",
    video: "assets/cali_weed_us_2.mp4",
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

// =============================
// --- 4️⃣ AFFICHAGE PRODUITS ---
// =============================
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

// =============================
// --- 5️⃣ CATÉGORIES ---
// =============================
const categoriesData = {
  festifs: ['cocaine', 'trois_mmc'],
  weed: ['cali_weed_us_1', 'amnesia'],
  hash: ['filtre_73u', 'jaune_mousse']
};

document.querySelectorAll('.see-products').forEach(btn => {
  btn.addEventListener('click', () => {
    haptic(); // 🔔 vibration

    const category = btn.closest('.category-card').dataset.category;
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-produits').style.display = 'block';
    showProductList(document.querySelector('#page-produits .product-list'), categoriesData[category]);
  });
});

// =============================
// --- 6️⃣ OUVRIR PRODUIT DÉTAILLÉ ---
// =============================
function openProductDetail(key) {
  haptic(); // 🔔 vibration lors de l’ouverture

  const data = productsData[key];

  // Cacher toutes les pages
  document.querySelectorAll('.page').forEach(p => {
    p.style.display = 'none';
    p.classList.remove('page-animate');
  });

  // Afficher la page produit détaillée
  const pageDetail = document.getElementById('page-produit-detail');
  pageDetail.style.display = 'block';
  void pageDetail.offsetWidth; // reset CSS animation
  pageDetail.classList.add('page-animate');

  // Remplir les infos produit
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

// =============================
// --- 7️⃣ CLIQUER SUR VOIR ---
// =============================
document.addEventListener('click', e => {
  if (e.target.classList.contains('voir-btn')) {
    openProductDetail(e.target.closest('.product').dataset.product);
  }
});

// =============================
// --- 8️⃣ BOUTON RETOUR ---
// =============================
document.getElementById('back-to-produits').addEventListener('click', () => {
  haptic(); // 🔔 vibration
  document.getElementById('page-produit-detail').style.display = 'none';
  document.getElementById('page-produits').style.display = 'block';
});

// =============================
// --- 9️⃣ COMMANDER ---
// =============================
document.getElementById('order-btn').addEventListener('click', () => {
  haptic(); // 🔔 vibration lors de la commande
  const selected = document.querySelector('.price-option.selected');
  const qty = selected ? selected.textContent : '';
  const productName = document.getElementById('product-title').textContent;
  tg.sendData(JSON.stringify({ product: productName, quantity: qty }));
  alert(`Commande envoyée : ${productName} - ${qty}`);
});

// =============================
// --- 🔟 CONTACT (WhatsApp / Telegram) ---
// =============================
document.querySelectorAll('.contact-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    haptic(); // 🔔 vibration
    // lien <a> s'ouvrira normalement
  });
});


// --- BOUTON RETOUR AUX CATEGORIES ---
document.getElementById('back-to-categories').addEventListener('click', () => {
  haptic(); // 🔔 vibration
  document.getElementById('page-produits').style.display = 'none';
  document.getElementById('page-categories').style.display = 'block';
});

const banner = document.getElementById('top-banner');
banner.innerHTML = '<span>🚀 Bienvenue sur PanameDelivery ! Promotions du jour : Gelato et CALI WEED disponibles ! 🔥</span>';

function startTicker() {
  const wrapper = document.querySelector('.ticker-wrapper');
  const tickers = wrapper.querySelectorAll('.ticker');

  // On calcule la largeur totale du texte le plus long
  let maxWidth = 0;
  tickers.forEach(t => {
    if (t.scrollWidth > maxWidth) maxWidth = t.scrollWidth;
  });

  const containerWidth = wrapper.offsetWidth;
  const pixelsPerSecond = 100; // vitesse
  const duration = (maxWidth + containerWidth) / pixelsPerSecond;

  // Supprimer l'ancienne animation si elle existe
  wrapper.style.animation = 'none';

  // Forcer le recalcul
  void wrapper.offsetWidth;

  // Ajouter l'animation avec la durée calculée
  wrapper.style.animation = `scrollTicker ${duration}s linear infinite`;
}

// Lancer automatiquement au chargement
window.addEventListener('load', startTicker);
window.addEventListener('resize', startTicker);



// --- NEIGE ---
function createSnowflake() {
  const snowContainer = document.getElementById('snow-container');
  const flake = document.createElement('div');
  flake.className = 'snowflake';
  flake.textContent = '❄'; // tu peux mettre "*" ou "❄"
  
  // position et taille aléatoire
  flake.style.left = Math.random() * window.innerWidth + 'px';
  flake.style.fontSize = (10 + Math.random() * 20) + 'px';
  flake.style.opacity = 0.5 + Math.random() * 0.5;
  
  // vitesse aléatoire
  const duration = 10 + Math.random() * 20; // en secondes
  flake.style.animationDuration = duration + 's';
  flake.style.animationDelay = Math.random() * 5 + 's';
  
  snowContainer.appendChild(flake);

  // supprimer le flocon après qu’il soit tombé
  setTimeout(() => {
    snowContainer.removeChild(flake);
  }, duration * 1000);
}

// créer un nouveau flocon toutes les 200ms
setInterval(createSnowflake, 200);
