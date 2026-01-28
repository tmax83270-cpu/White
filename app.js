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
// --- SPLASH SCREEN 2s ========
// =============================
const splash = document.getElementById('splash');
const app = document.getElementById('app');

// Afficher le splash screen pendant 2 secondes puis basculer sur l'app
setTimeout(() => {
  splash.style.transition = 'opacity 0.4s ease';
  splash.style.opacity = '0';
  
  setTimeout(() => {
    splash.style.display = 'none';
    app.style.display = 'block';
  }, 400); // attendre que le fade out se termine

}, 2000); // splash visible 2 secondes
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
  amnesia: {
    title: "WEED 🇳🇱",
    subtitle: "Amnesia 🌿",
    description: "Description complète de ton produit ici.",
    video: "assets/amnesia.mp4",
    prices: [{ qty: "❌❌", price: "❌❌" }, { qty: "❌❌", price: "❌❌" }]
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
    subtitle: "Gelato,simpson",
    description: "Hash aromatique, texture unique.",
    video: "assets/jaune_mousse.mp4",
    prices: [{ qty: "10g", price: "50€" }, { qty: "100g", price: "230€" }, { qty: "1kilo", price: "2000€" }]
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
// --- 6️⃣ OUVRIR PRODUIT DÉTAILLÉ ---
// =============================
function openProductDetail(key) {
  haptic();
  const data = productsData[key];

  document.querySelectorAll('.page').forEach(p => {
    p.style.display = 'none';
    p.classList.remove('page-animate');
  });

  const pageDetail = document.getElementById('page-produit-detail');
  pageDetail.style.display = 'block';
  void pageDetail.offsetWidth; // reset CSS animation
  pageDetail.classList.add('page-animate');

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
  haptic();
  document.getElementById('page-produit-detail').style.display = 'none';
  document.getElementById('page-produits').style.display = 'block';
});

// =============================
// --- 9️⃣ COMMANDER ---
// =============================
document.getElementById('order-btn').addEventListener('click', () => {
  haptic();
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
  btn.addEventListener('click', () => haptic());
});

// =============================
// --- BOUTON RETOUR AUX CATEGORIES ---
// =============================
document.getElementById('back-to-categories').addEventListener('click', () => {
  haptic();
  document.getElementById('page-produits').style.display = 'none';
  document.getElementById('page-categories').style.display = 'block';
});

// =============================
// --- BANNIÈRE DÉFILEMENT ======
// =============================
const banner = document.getElementById('top-banner');
if (banner) {
  banner.innerHTML = '<span>🚀 Bienvenue sur PanameDelivery ! Promotions du jour : Gelato et CALI WEED disponibles ! 🔥</span>';
}

function startTicker() {
  const wrapper = document.querySelector('.ticker-wrapper');
  if (!wrapper) return;
  const tickers = wrapper.querySelectorAll('.ticker');
  let maxWidth = 0;
  tickers.forEach(t => { if (t.scrollWidth > maxWidth) maxWidth = t.scrollWidth; });
  const containerWidth = wrapper.offsetWidth;
  const pixelsPerSecond = 100;
  const duration = (maxWidth + containerWidth) / pixelsPerSecond;
  wrapper.style.animation = 'none';
  void wrapper.offsetWidth;
  wrapper.style.animation = `scrollTicker ${duration}s linear infinite`;
}
window.addEventListener('load', startTicker);
window.addEventListener('resize', startTicker);

// =============================
// --- NEIGE ========
// =============================
function createSnowflake() {
  const snowContainer = document.getElementById('snow-container');
  if (!snowContainer) return;
  const flake = document.createElement('div');
  flake.className = 'snowflake';
  flake.textContent = '❄';
  flake.style.left = Math.random() * window.innerWidth + 'px';
  flake.style.fontSize = (10 + Math.random() * 20) + 'px';
  flake.style.opacity = 0.5 + Math.random() * 0.5;
  const duration = 10 + Math.random() * 20;
  flake.style.animationDuration = duration + 's';
  flake.style.animationDelay = Math.random() * 5 + 's';
  snowContainer.appendChild(flake);
  setTimeout(() => { snowContainer.removeChild(flake); }, duration * 1000);
}
setInterval(createSnowflake, 200);
