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
              if(champQuantité.value < 101 && champQuantité.value > 0){
              sauvegardePanier[q].quantité = champQuantité.value;
              console.log(sauvegardePanier[q].quantité);
              console.log(sauvegardePanier);

              if(champQuantité.value )
              localStorage.setItem("produit",JSON.stringify(sauvegardePanier));
              document.location = "../html/cart.html ";
              alert("Votre panier a été modifié!")
              }else{
                alert("La quantité doit être comprise entre 1 et 100.");
              }
            }}})
             })
      }}
      console.log(totalPrix);
      console.log(totalQuantité);  
      
  }}
})
  
.catch(function(err) {
    console.log(err);
    alert(err);
  });
 // vérification du formulaire ================================================================================

 let formulaire = document.querySelector('.cart__order__form');

 // définition des expressions régulières
 const emailRegExp = new RegExp('^[a-z0-9\.]+@[a-z]+\.[a-z]{2,3}$');
 const nomRegExp = new RegExp('^(([A-Za-z]{1}[àâäéèêëïîôöùûüÿa-z]{2,11})|([A-Za-z]{1}[àâäéèêëïîôöùûüÿa-z]{2,11}-{1,2}[A-Za-z]{1}[àâäéèêëïîôöùûüÿa-z]{2,11}))$');
 const villeRegExp = new RegExp('^[a-zA-Z \-\/]+$');
 const adresseRegExp = new RegExp('^[a-zA-Z0-9 \-\/\']+$');

 //validation email
 formulaire.email.addEventListener('input', function() {
  validEmail(this);
 });
 const validEmail = function(saisieEmail){
 let messageEMail = saisieEmail.nextElementSibling;
 
  if(emailRegExp.test(saisieEmail.value)) {
    messageEMail.innerHTML = 'Adresse email Valide';
    messageEMail.classList.remove('text-incorrect');
    messageEMail.classList.add('text-valide');
  }else{
    messageEMail.innerHTML = 'Adresse email Incorrecte!(Ex:dupond@hjk.com)';
    messageEMail.classList.remove('text-valide');
    messageEMail.classList.add('text-incorrect');
  }};

//validation prénom 
formulaire.firstName.addEventListener('input', function() {
  validPrenom(this);
 });
 const validPrenom = function(saisiePrenom){
 let messagePrenom = saisiePrenom.nextElementSibling;

  if(nomRegExp.test(saisiePrenom.value)) {
    messagePrenom.innerHTML = 'Prénom Valide';
    messagePrenom.classList.remove('text-incorrect');
    messagePrenom.classList.add('text-valide');
  }else{
    messagePrenom.innerHTML = 'Prénom Incorrect!(ex:Jean-Paul)';
    messagePrenom.classList.remove('text-valide');
    messagePrenom.classList.add('text-incorrect');
  }};

  //validation nom
formulaire.lastName.addEventListener('input', function() {
  validNom(this);
 });
 const validNom = function(saisieNom){
 let messageNom = saisieNom.nextElementSibling;

  if(nomRegExp.test(saisieNom.value)) {
    messageNom.innerHTML = 'Nom Valide';
    messageNom.classList.remove('text-incorrect');
    messageNom.classList.add('text-valide');
  }else{
    messageNom.innerHTML = 'Nom Incorrect!(ex:Dupond)';
    messageNom.classList.remove('text-valide');
    messageNom.classList.add('text-incorrect');
  }};

  //validation ville
formulaire.city.addEventListener('input', function() {
  validVille(this);
 });
 const validVille = function(saisieVille){
 let messageVille = saisieVille.nextElementSibling;

  if(villeRegExp.test(saisieVille.value)) {
    messageVille.innerHTML = 'Ville Valide';
    messageVille.classList.remove('text-incorrect');
    messageVille.classList.add('text-valide');
  }else{
    messageVille.innerHTML = 'Ville Incorrecte!(ex:Marseille)';
    messageVille.classList.remove('text-valide');
    messageVille.classList.add('text-incorrect');
  }};

  // validation adresse postale

formulaire.address.addEventListener('input', function() {
  validAdresse(this);
 });
 
 const validAdresse = function(saisieAdresse){
 
 let messageAdresse = saisieAdresse.nextElementSibling;

  if(adresseRegExp.test(saisieAdresse.value)) {
    messageAdresse.innerHTML = 'Adresse Valide';
    messageAdresse.classList.remove('text-incorrect');
    messageAdresse.classList.add('text-valide');
  }else{
    messageAdresse.innerHTML = 'Adresse Incorrecte!(ex:34 chemin du pont)';
    messageAdresse.classList.remove('text-valide');
    messageAdresse.classList.add('text-incorrect');
  }};
  

// envoi formulaire et panier dans API///////////////////////////////////////////////////////////////////

 // ecoute du formulaire
formulaire.addEventListener("submit" ,(e)=> {
  e.preventDefault();
  console.log("pas d'envoi");
  console.log(adresseRegExp.test(address.value));
  console.log(villeRegExp.test(city.value));
  console.log(nomRegExp.test(lastName.value));
  console.log(nomRegExp.test(firstName.value));
  console.log(emailRegExp.test(email.value));

 
  if(adresseRegExp.test(address.value) && villeRegExp.test(city.value) && nomRegExp.test(lastName.value) && nomRegExp.test(firstName.value) && emailRegExp.test(email.value)){
   console.log("envoi ok")
    const recapCommande = JSON.parse(localStorage.getItem("produit"));
    let recapProduitId = [];
    console.log(recapCommande);
    console.log(recapProduitId);

// récupération des données pour l'API

    recapCommande.forEach((commande) =>{
      recapProduitId.push(commande.id);
    });
   
    console.log(recapProduitId);
    const infoCommande ={
    contact: {
      firstName : firstName.value,
      lastName : lastName.value,
      address : address.value,
      city : city.value,
      email : email.value
       },
       products : recapProduitId
      };
console.log(infoCommande);

}else{
  alert("Merci de remplir le formulaire correctement.")
}});



   



     