const tg = window.Telegram.WebApp;
tg.expand();

// --- Navigation ---
document.querySelectorAll('.nav-item').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p=>p.style.display='none');
    let pageId='';
    switch(btn.textContent.trim()){
      case '🏠 Accueil': pageId='page-accueil'; break;
      case '🛍️ Produits': pageId='page-produits'; break;
      case '📱 Catégories': pageId='page-categories'; break;
      case '✉️ Contact': pageId='page-contact'; break;
    }
    if(pageId) document.getElementById(pageId).style.display='block';
  });
});

// --- Accueil cartes ---
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click',()=>card.classList.toggle('expanded'));
});

// --- Données produits ---
const productsData={
  cali_weed_us:{title:"CALI WEED 🇺🇸", subtitle:"Zkittles 🍒", description:"Sativa Californienne, très puissante.", video:"assets/cali_weed_us.mp4", prices:[{qty:"10g", price:"90€"},{qty:"20g", price:"180€"}]},
  cocaine:{title:"COCAINE ❄️", subtitle:"", description:"Produit de haute pureté.", video:"assets/cocaine.mp4", prices:[{qty:"1g", price:"80€"},{qty:"5g", price:"350€"}]}
};

// --- Produits page ---
function showProductList(container, keys){
  container.innerHTML='';
  keys.forEach(k=>{
    const prod = productsData[k];
    const div=document.createElement('div');
    div.className='product';
    div.dataset.product=k;
    div.innerHTML=`
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

// --- Ouvrir produit détail ---
function openProductDetail(key){
  const data=productsData[key];
  document.querySelectorAll('.page').forEach(p=>p.style.display='none');
  document.getElementById('page-produit-detail').style.display='block';
  document.getElementById('product-title').textContent=data.title;
  document.getElementById('product-subtitle').textContent=data.subtitle||'';
  document.getElementById('product-description').textContent=data.description;
  document.getElementById('product-video-src').src=data.video;
  document.getElementById('product-video').load();

  const pricesContainer=document.getElementById('product-prices');
  pricesContainer.innerHTML='';
  data.prices.forEach((p,i)=>{
    const div=document.createElement('div');
    div.className='price-option';
    div.textContent=`${p.qty} : ${p.price}`;
    if(i===0) div.classList.add('selected');
    div.addEventListener('click',()=>{
      document.querySelectorAll('.price-option').forEach(c=>c.classList.remove('selected'));
      div.classList.add('selected');
    });
    pricesContainer.appendChild(div);
  });
}

// --- Cliquer sur VOIR ---
document.addEventListener('click', e=>{
  if(e.target.classList.contains('voir-btn')){
    openProductDetail(e.target.closest('.product').dataset.product);
  }
});

// --- Retour page produits ---
document.getElementById('back-to-produits').addEventListener('click',()=>{
  document.getElementById('page-produit-detail').style.display='none';
  document.getElementById('page-produits').style.display='block';
});

// --- Commander ---
document.getElementById('order-btn').addEventListener('click',()=>{
  const selected=document.querySelector('.price-option.selected');
  const qty=selected?selected.textContent:'';
  const productName=document.getElementById('product-title').textContent;
  tg.sendData(JSON.stringify({product:productName, quantity:qty}));
  alert(`Commande envoyée : ${productName} - ${qty}`);
});

// --- Produits par catégorie ---
const categoryProducts = {
    festifs: ['cali_weed_us', 'cocaine'],
    hash: [],
    weed: ['cali_weed_us']
};

// --- Cliquer sur "VOIR LES PRODUITS" dans catégorie ---
document.querySelectorAll('.voir-category-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
        const categoryCard = btn.closest('.category-card');
        const cat = categoryCard.dataset.category;
        const keys = categoryProducts[cat] || [];
        document.querySelectorAll('.page').forEach(p=>p.style.display='none');
        const produitsPage = document.getElementById('page-produits');
        produitsPage.style.display='block';
        showProductList(produitsPage.querySelector('.product-list'), keys);
        document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
        document.querySelector('.nav-item:nth-child(3)').classList.add('active');
    });
});
