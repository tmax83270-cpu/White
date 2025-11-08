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
    if(pageId){
      document.getElementById(pageId).style.display='block';
      if(pageId==='page-produits') showProductList(document.querySelector('#page-produits .product-list'), Object.keys(productsData));
    }
  });
});

// Accueil
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click',()=>card.classList.toggle('expanded'));
});

// Produits data
const productsData={
  cali_weed_us:{title:"CALI WEED 🇺🇸", subtitle:"Zkittles 🍒", description:"Sativa Californienne, très puissante.", video:"assets/cali_weed_us.mp4", prices:[{qty:"10g", price:"90€"},{qty:"20g", price:"180€"}]},
  cocaine:{title:"COCAINE ❄️", subtitle:"", description:"Produit de haute pureté.", video:"assets/cocaine.mp4", prices:[{qty:"1g", price:"80€"},{qty:"5g", price:"350€"}]},
  trois_mmc:{title:"3MMC 🇳🇱", subtitle:"Cailloux 🧊", description:"Produit stimulant, effet intense.", video:"assets/3mmc.mp4", prices:[{qty:"1g", price:"70€"},{qty:"5g", price:"300€"}]},
  filtre_73u:{title:"FILTRÉ 73U ⚡️", subtitle:"NO FARM", description:"Hash de haute qualité, bien filtré.", video:"assets/filtre_73u.mp4", prices:[{qty:"5g", price:"120€"},{qty:"10g", price:"230€"}]},
  jaune_mousse:{title:"JAUNE MOUSSE 🧽", subtitle:"Flavors 🌸", description:"Hash aromatique, texture unique.", video:"assets/jaune_mousse.mp4", prices:[{qty:"5g", price:"110€"},{qty:"10g", price:"210€"}]}
};

// Catégories
const categoriesData={
  festifs:['cocaine','trois_mmc'],
  weed:['cali_weed_us'],
  hash:['filtre_73u','jaune_mousse']
};

// Afficher produits
function showProductList(container, keys){
  container.innerHTML='';
  keys.forEach(k=>{
    const prod=productsData[k];
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

// Clic sur voir produit
document.addEventListener('click',e=>{
  if(e.target.classList.contains('voir-btn')){
    openProductDetail(e.target.closest('.product').dataset.product);
  }
});

// Ouvrir produit détaillé
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

// Retour produit
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

// Catégorie -> produits
document.querySelectorAll('.category-card').forEach(card=>{
  const cat=card.dataset.category;
  card.querySelector('.see-products').addEventListener('click',()=>{
    document.querySelectorAll('.page').forEach(p=>p.style.display='none');
    document.getElementById('page-produits').style.display='block';
    showProductList(document.querySelector('#page-produits .product-list'), categoriesData[cat]);
  });
});
