const tg = window.Telegram.WebApp;
tg.expand();

// Navigation
document.querySelectorAll('.nav-item').forEach(btn=>{
  btn.addEventListener('click', ()=>{
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

// Cartes interactives
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click',()=>card.classList.toggle('expanded'));
});

// Catégories toggle
document.querySelectorAll('.category-header').forEach(header=>{
  header.addEventListener('click',()=>{
    const products=header.nextElementSibling;
    products.style.display=products.style.display==='flex'?'none':'flex';
  });
});

// Produits données
const productsData={
  cali_weed_us:{
    title:"Cali Weed US 🇺🇸", subtitle:"Zkittles 🍒",
    description:"Sativa de Californie, très puissante et parfumée.",
    video:"assets/cali_weed_us.mp4",
    prices:[{qty:"10g", price:"90€"},{qty:"20g",price:"180€"},{qty:"50g",price:"400€"}]
  },
  cocaine:{
    title:"Cocaine ❄️", subtitle:"",
    description:"Produit de haute pureté.",
    video:"assets/cocaine.mp4",
    prices:[{qty:"1g", price:"80€"},{qty:"5g",price:"350€"}]
  },
  zkittles:{title:"Zkittles 🍒",subtitle:"",description:"Variété sucrée très populaire.",video:"assets/zkittles.mp4",prices:[{qty:"5g",price:"50€"}]},
  produit_d:{title:"Produit D",subtitle:"",description:"Description D",video:"assets/produit_d.mp4",prices:[{qty:"10g",price:"60€"}]}
};

// Cliquer produit
document.querySelectorAll('.product, .category-product').forEach(prod=>{
  prod.addEventListener('click',()=>{
    const key=prod.dataset.product;
    const data=productsData[key];
    if(!data) return;
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
      div.classList.add('price-option');
      div.innerHTML=`<label><input type="radio" name="quantity" ${i===0?'checked':''}> ${p.qty}</label><span>${p.price}</span>`;
      pricesContainer.appendChild(div);
    });
  });
});

// Retour produits
document.getElementById('back-to-produits').addEventListener('click',()=>{
  document.getElementById('page-produit-detail').style.display='none';
  document.getElementById('page-produits').style.display='block';
});

// Commander
document.getElementById('order-btn').addEventListener('click',()=>{
  const selected=document.querySelector('input[name="quantity"]:checked');
  const qty=selected?selected.parentNode.textContent.trim():'';
  const productName=document.getElementById('product-title').textContent;
  tg.sendData(JSON.stringify({product:productName,quantity:qty}));
  alert(`Commande envoyée : ${productName} - ${qty}`);
});
