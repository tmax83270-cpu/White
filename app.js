// Gestion des clics sur les produits
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const productData = btn.closest('.product').dataset.send;
    console.log('Produit choisi :', productData);

    // Affiche un message ou détail côté front-end
    alert(`Vous avez choisi : ${JSON.parse(productData).product}`);

    // Envoie au bot Telegram
    tg.sendData(productData);
  });
});
