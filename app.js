const tg = window.Telegram.WebApp;
tg.expand();

// --- Navigation onglets ---
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    let pageId = '';
    switch(btn.textContent.trim()){
      case '🏠 Accueil': pageId = 'page-accueil'; break;
      case '🛍️ Produits': pageId = 'page-produits'; break;
      case '📱 Catégories': pageId = 'page-categories'; break;
      case '✉️ Contact': pageId = 'page-contact'; break;
    }
    if(pageId) document.getElementById(pageId).style.display = 'block';

    // Si page Produits, afficher tous les produits
    if(pageId === 'page-produits'){
      showProductList(document.querySelector('#page-produits .product-list'), Object.keys(productsData));
    }
  });
});

// --- Accueil cartes expandables ---
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});

// --- Données produits ---
const productsData = {
  cali_weed_us: {title:"CALI WEED 🇺🇸", subtitle:"Zkittles 🍒", description:"Sativa Californienne, très puissante.", video:"assets/cali_weed_us.mp4", prices:[{qty:"10g", price:"90€"},{qty:"20g", price:"180€"}]},
  cocaine: {title:"COCAINE ❄️", subtitle:"", description:"Produit de haute pureté.", video:"assets/cocaine.mp4", prices:[{qty:"1g", price:"80€"},{qty:"5g", price:"350€"}]},
  filtre_73u: {title:"FILTRÉ 73U ⚡", subtitle:"No Farm", description:"Produit Hash filtré 73U.", video:"assets/filtre_73u.mp4", prices:[{qty:"5g", price:"50€"},{qty:"10g", price:"90€"}]},
  jaune_mousse: {title:"JAUNE MOUSSE 🧽", subtitle:"Flavors 🌸", description:"Hash Jaune Mousse parfumé.", video:"assets/jaune_mousse.mp4", prices:[{qty:"5g", price:"60€"},{qty:"10g", price:"110€"}]},
  _3mmc: {title:"3MMC 🇳🇱", subtitle:"Cailloux 🧊", description:"Produit stimulant 3MMC.", video:"assets/3mmc.mp4", prices:[{qty:"1g", price:"70€"},{qty:"5g", price:"300€"}]}
};

// --- Catégories produits ---
const categoriesData = {
  festifs: ['cocaine', '_3mmc'],
  weed: ['cali_weed_us'],
  hash: ['filtre_73u', 'jaune_mousse']
};

// --- Afficher produits ---
function showProductList(container, keys){
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

// --- Ouvrir produit détaillé ---
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
  data.prices.forEach((p,i) => {
    const div = document.createElement('div');
    div.className = 'price-option';
    div.textContent = `${p.qty} : ${p.price}`;
    if(i === 0) div.classList.add('selected');
    div.addEventListener('click', ()=>{
      document.querySelectorAll('.price-option').forEach(c => c.classList.remove('selected'));
      div.classList.add('selected');
    });
    pricesContainer.appendChild(div);
  });
}

// --- Cliquer sur VOIR ---
document.addEventListener('click', e => {
  if(e.target.classList.contains('voir-btn')){
    openProductDetail(e.target.closest('.product').dataset.product);
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
  tg.sendData(JSON.stringify({product:productName, quantity:qty}));
  alert(`Commande envoyée : ${productName} - ${qty}`);
});

// --- Bouton "Voir les produits >" pour catégories ---
document.querySelectorAll('.see-products').forEach(btn => {
  btn.addEventListener('click', e => {
    const categoryCard = e.target.closest('.category-card');
    const cat = categoryCard.dataset.category;
    const keys = categoriesData[cat] || [];
    showProductList(document.querySelector('#page-produits .product-list'), keys);

    // Affiche page produits
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-produits').style.display = 'block';
  });
});
