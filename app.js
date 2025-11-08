const tg = window.Telegram.WebApp;
tg.expand();

// Navigation
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

// Accueil cartes
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click',()=>card.classList.toggle('expanded'));
});

// Produits données
const productsData={
  cali_weed_us:{title:"Cali Weed US 🇺🇸", subtitle:"Zkittles 🍒", description:"Sativa Californienne, très puissante.", video:"assets/cali_weed_us.mp4", prices:[{qty:"10g", price:"90€"},{qty:"20g", price:"180€"},{qty:"50g", price:"400€"}]},
  cocaine:{title:"Cocaine ❄️", subtitle:"", description:"Produit de haute pureté.", video:"assets/cocaine.mp4", prices:[{qty:"1g", price:"80€"},{qty:"5g", price:"350€"}]},
  produit_d:{title:"Produit D", subtitle:"", description:"Description D", video:"assets/produit_d.mp4", prices:[{qty:"10g", price:"60€"}]}
};

// Page Produits
function showProductList(container, keys){
  container.innerHTML='';
  keys.forEach(k=>{
    const div=document.createElement('div');
    div.className='product';
    div.dataset.product=k;
    div.textContent=productsData[k].title;
    container.appendChild(div);
  });
}
showProductList(document.querySelector('#page-produits .product-list'), Object.keys(productsData));

// Ouvrir produit détail
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

// Cliquer produit dans produits
document.addEventListener('click', e=>{
  if(e.target.classList.contains('product')){
    openProductDetail(e.target.dataset.product);
  }
});

// Retour page produit
document.getElementById('back-to-produits').addEventListener('click',()=>{
  document.getElementById('page-produit-detail').style.display='none';
  document.getElementById('page-produits').style.display='block';
});

// Commander
document.getElementById('order-btn').addEventListener('click',()=>{
  const selected=document.querySelector('.price-option.selected');
  const qty=selected?selected.textContent:'';
  const productName=document.getElementById('product-title').textContent;
  tg.sendData(JSON.stringify({product:productName, quantity:qty}));
  alert(`Commande envoyée : ${productName} - ${qty}`);
});

// Catégories
const categoryMapping={
  festifs:['cali_weed_us','cocaine'],
  hash:['produit_d'],
  weed:['cali_weed_us','produit_d']
};

document.querySelectorAll('.category-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const productsContainer = card.querySelector('.category-products');
    if(productsContainer.style.display==='flex'){
      productsContainer.style.display='none';
    } else {
      // Fermer les autres cartes
      document.querySelectorAll('.category-products').forEach(c=>c.style.display='none');
      // Ajouter produits
      productsContainer.innerHTML='';
      categoryMapping[card.dataset.category].forEach(k=>{
        const div=document.createElement('div');
        div.className='product';
        div.dataset.product=k;
        div.textContent=productsData[k].title;
        productsContainer.appendChild(div);
      });
      productsContainer.style.display='flex';
      productsContainer.style.flexDirection='column';
      productsContainer.style.gap='5px';
    }
  });
});
