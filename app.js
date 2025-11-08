// Initialise Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// --- Navigation Onglets ---
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    let pageId = '';
    switch(btn.textContent.trim()) {
      case '🏠 Accueil': pageId = 'page-accueil'; break;
      case '📱 Catégories': pageId = 'page-categories'; break;
      case '🛍️ Produits': pageId = 'page-produits'; break;
      case '✉️ Contact': pageId = 'page-contact'; break;
    }
    if(pageId) document.getElementById(pageId).style.display = 'block';
  });
});

// --- Cartes Accueil ---
document.querySelectorAll('.card').forEach(card => {
  const arrow = document.createElement('span');
  arrow.textContent = '▾';
  arrow.style.float = 'right';
  arrow.style.transition = 'transform 0.3s';
  card.querySelector('.card-header').appendChild(arrow);

  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    const details = card.querySelector('.card-details');
    if(card.classList.contains('expanded')) {
      details.style.display = 'block';
      arrow.style.transform = 'rotate(180deg)';
    } else {
      details.style.display = 'none';
      arrow.style.transform = 'rotate(0deg)';
    }
  });
});

// --- Données Produits ---
const productsData = {
  cali_weed_us: {
    title: "CALI WEED 🇺🇸", 
    subtitle: "Zkittles 🍒", 
    description: "Sativa Californienne, très puissante.", 
    video: "assets/cali_weed_us.mp4", 
    prices: [{qty:"10g", price:"90€"},{qty:"20g", price:"180€"}]
  },
  cocaine: {
    title: "COCAINE ❄️", 
    subtitle: "", 
    description: "Produit de haute pureté.", 
    video: "assets/cocaine.mp4", 
    prices: [{qty:"1g", price:"80€"},{qty:"5g", price:"350€"}]
  },
  filtre_73u: {
    title: "FILTRÉ 73U", 
    subtitle: "No Farm ⚡️", 
    description: "Hash de qualité supérieure.", 
    video: "assets/filtre_73u.mp4", 
    prices: [{qty:"5g", price:"70€"},{qty:"10g", price:"130€"}]
  },
  jaune_mousse: {
    title: "JAUNE MOUSSE 🧽", 
    subtitle: "Flavors 🌸", 
    description: "Hash aromatique et puissant.", 
    video: "assets/jaune_mousse.mp4", 
    prices: [{qty:"5g", price:"75€"},{qty:"10g", price:"140€"}]
  }
};

// --- Fonction pour afficher liste produits ---
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

// --- Affiche tous les produits dans onglet Produits ---
showProductList(document.querySelector('#page-produits .product-list'), Object.keys(productsData));

// --- Ouvrir produit détail ---
function openProductDetail(key){
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
    if(i === 0) div.classList.add('selected');
    div.addEventListener('click', () => {
      document.querySelectorAll('.price-option').forEach(c => c.classList.remove('selected'));
      div.classList.add('selected');
    });
    pricesContainer.appendChild(div);
  });
}

// --- Cliquer sur VOIR produit ---
document.addEventListener('click', e => {
  if(e.target.classList.contains('voir-btn')){
    const prodKey = e.target.closest('.product').dataset.product;
    openProductDetail(prodKey);
  }
});

// --- Retour page produits ---
document.getElementById('back-to-produits').addEventListener('click', () => {
  document.getElementById('page-produit-detail').style.display = 'none';
  document.getElementById('page-produits').style.display = 'block';
});

// --- Commander ---
document.getElementById('order-btn').addEventListener('click', () => {
  const selected = document.querySelector('.price-option.selected');
  const qty = selected ? selected.textContent : '';
  const productName = document.getElementById('product-title').textContent;
  tg.sendData(JSON.stringify({product: productName, quantity: qty}));
  alert(`Commande envoyée : ${productName} - ${qty}`);
});

// --- Catégories ---
const categories = {
  festifs: ['cocaine', '3mmc'],
  weed: ['cali_weed_us'],
  hash: ['filtre_73u','jaune_mousse']
};

document.querySelectorAll('.see-products').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const catCard = e.target.closest('.category-card');
    const catKey = catCard.dataset.category;
    const container = catCard.querySelector('.category-products');
    container.style.display = 'block';
    container.innerHTML = '';
    showProductList(container, categories[catKey]);
    // Masque les autres pages
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-categories').style.display = 'block';
  });
});
