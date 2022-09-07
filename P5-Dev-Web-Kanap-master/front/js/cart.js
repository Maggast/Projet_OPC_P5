fetch("http://localhost:3000/api/products/")
.then(function(res) {
    if (res.ok) {
      return res.json();
      
    }
  })
  .then(function(value) {
    console.log(value) ; 

    // recupération description produit de l'API

      for ( NumProduit = 0; NumProduit < value.length ;NumProduit ++ )  {
      const IdProduit = value[NumProduit]._id;
      const DescriptionProduit = value[NumProduit].description;
      const AltTxtProduit = value[NumProduit].altTxt;
      const NomProduit = value[NumProduit].name;
      const ImageProduit = value[NumProduit].imageUrl;
      var PrixProduit = value[NumProduit].price;
    
    // récupération du panier dans le localstorage

      let sauvegardePanier = JSON.parse(localStorage.getItem("produit"));
      console.log(sauvegardePanier);
  

      for (var i =0 ; i < sauvegardePanier.length;i++){
      var IdProduitPanier = sauvegardePanier[i].id;
      if (IdProduit == IdProduitPanier){
      const QuantitéProduit = sauvegardePanier[i].quantité;
      const CouleurProduit = sauvegardePanier[i].couleur;
      
    // Affichage des produits du panier sur la page
    
      const AffichageProduitsPanier = `<article class="cart__item" data-id="${IdProduitPanier}" data-color="${CouleurProduit}">
        <div class="cart__item__img"><img src="${ImageProduit}" alt="${AltTxtProduit}></div>
        <div class="cart__item__content"><div class="cart__item__content__description">
        <h2>${NomProduit}</h2><p>${CouleurProduit}</p><p>${PrixProduit} €</p></div>
        <div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity">
        <p>Qté : ${QuantitéProduit}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${QuantitéProduit}"></div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p></div></div></div></article> `;

      document.getElementById('cart__items').innerHTML =  document.getElementById('cart__items').innerHTML + AffichageProduitsPanier;
    


      // Affichage total quantité 

     let totalQuantité = 0;
       
     for (let produit of sauvegardePanier){
      totalQuantité += Number(produit.quantité);
      console.log(produit.quantité);
     }
      console.log(totalQuantité);
      document.getElementById("totalQuantity").innerHTML = totalQuantité;

    // affichage total  prix
     let totalPrix = 0 ;
    
     for(let produit of sauvegardePanier){
     totalPrix += produit.prix * produit.quantité;
     console.log(produit.prix);
     }
     console.log(totalPrix);
     document.getElementById("totalPrice").innerHTML = totalPrix ;
      } 
   }
// modification de la quantité dans le panier


       
  }})
    .catch(function(err) {
        console.log(err);
        alert(err);
      });

     