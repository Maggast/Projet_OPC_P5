fetch("http://localhost:3000/api/products/")
.then(function(res) {
    if (res.ok) {
      return res.json();
      
    }
  })
  .then(function(value) {
    console.log(value) ; 
    let sauvegardePanier = JSON.parse(localStorage.getItem("produit"));

    if(sauvegardePanier == null){
      alert("Votre panier est vide .Veuillez saisir un article.")

    }else{
    // recupération description produit de l'API
      var totalQuantité = 0 ;
      var totalPrix = 0 ;

      for ( NumProduit = 0; NumProduit < value.length ;NumProduit ++ )  {
        
      const IdProduit = value[NumProduit]._id;
      const DescriptionProduit = value[NumProduit].description;
      const AltTxtProduit = value[NumProduit].altTxt;
      const NomProduit = value[NumProduit].name;
      const ImageProduit = value[NumProduit].imageUrl;
      var PrixProduit = value[NumProduit].price;
    
    // récupération du panier dans le localstorage
      console.log(sauvegardePanier);

       for (var i =0 ; i < sauvegardePanier.length;i++){
       var IdProduitPanier = sauvegardePanier[i].id;
     
      if (IdProduit == IdProduitPanier){
      var QuantitéProduit = sauvegardePanier[i].quantité;
      const CouleurProduit = sauvegardePanier[i].couleur;
      totalQuantité =  totalQuantité + Number(QuantitéProduit);
      totalPrix = totalPrix +(QuantitéProduit * PrixProduit);
      
    // Affichage des produits du panier sur la page
    
      const AffichageProduitsPanier = `<article class="cart__item" data-id="${IdProduitPanier}" data-color="${CouleurProduit}">
        <div class="cart__item__img"><img src="${ImageProduit}" alt="${AltTxtProduit}></div>
        <div class="cart__item__content"><div class="cart__item__content__description">
        <h2>${NomProduit}</h2><p>${CouleurProduit}</p><p>${PrixProduit} €</p></div>
        <div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity">
        <p>Qté : ${QuantitéProduit}</p>
        <input type="number" class="itemQuantity" data-id="${IdProduitPanier}" data-color="${CouleurProduit}" name="itemQuantity" min="1" max="100" value="${QuantitéProduit}"></div>
        <div class="cart__item__content__settings__delete"data-id="${IdProduitPanier}" data-color="${CouleurProduit}" >
        <p class="deleteItem">Supprimer</p></div></div></div></article> `;

      document.getElementById('cart__items').innerHTML =  document.getElementById('cart__items').innerHTML + AffichageProduitsPanier;
      document.getElementById("totalQuantity").innerHTML = totalQuantité;
      document.getElementById("totalPrice").innerHTML = totalPrix ;

     

// modification quantité dans le panier----------------------------------------------------------------
      //suppression de l'article
      let restantApresSuppProduit = [];
     const tousLesboutonsSupprimer = document.querySelectorAll (".cart__item__content__settings__delete");
     console.log(tousLesboutonsSupprimer);

     tousLesboutonsSupprimer.forEach ((boutonSupprimer) => {

      boutonSupprimer.addEventListener("click",( ) =>{
        console.log(boutonSupprimer);
        console.log(sauvegardePanier.length);
         

        if (sauvegardePanier.length == 1 ){
           localStorage.removeItem("produit");
           document.location = "../html/cart.html "; 
           alert(`L'article est supprimé!!`);
           

          } else {
            restantApresSuppProduit = sauvegardePanier.filter((el)=>{
              if(boutonSupprimer.dataset.id != el.id || boutonSupprimer.dataset.color != el.couleur)
                {
                  return true;
                }
            });
            console.log(restantApresSuppProduit);
            localStorage.setItem("produit", JSON.stringify(restantApresSuppProduit));
            alert(`L'article est supprimé!!`);
            document.location = "../html/cart.html "; 
          }

             console.log( AffichageProduitsPanier);
             
       
      });
     });
     //modification quantité article
      
      const inputQuantité = document.querySelectorAll(".itemQuantity");
      console.log(inputQuantité);
      
      inputQuantité.forEach((champQuantité)=> {

          champQuantité.addEventListener("change",() =>{
          console.log(champQuantité);

          for (q = 0;q < sauvegardePanier.length ; q++) {
           
            if( sauvegardePanier[q].id == champQuantité.dataset.id && sauvegardePanier[q].couleur == champQuantité.dataset.color ) {
              sauvegardePanier[q].quantité = champQuantité.value;
              console.log(sauvegardePanier[q].quantité);
              console.log(sauvegardePanier);

              if(champQuantité.value )
              localStorage.setItem("produit",JSON.stringify(sauvegardePanier));
              document.location = "../html/cart.html ";
              alert("Votre panier a été modifié!")

            }}})
             })
      }}
      console.log(totalPrix);
      console.log(totalQuantité);  
      
  }}})
  
    .catch(function(err) {
        console.log(err);
        alert(err);
      });

// vérification du formulaire ================================================================================
   
   



     