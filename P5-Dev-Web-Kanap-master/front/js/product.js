let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id) ;
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
      
    }
  })
  .then(function(value) {
    console.log(value) ;    
    
//affichage image
    const imageUrl = value.imageUrl;
    const descriptionImage = value.altTxt;
    const image = document.createElement("img");
    const item__img = document.querySelector(".item__img");
    item__img.appendChild(image);
    image.src =  `${imageUrl}`; 
    image.alt = `${descriptionImage}`;

//affichage nom dans fiche produit et titre page
    const nom = value.name;
    const title = document.querySelector("#title");
    title.textContent = `${nom}`;

    const titlepage =document.querySelector("title")
    titlepage.textContent = `${nom}`;
    
//affichage prix
    const montant = value.price;
    const prix = document.querySelector("#price");
    prix.textContent = ` ${montant} ` ;
    
//affichage description
    const description = value.description;
    const detail = document.querySelector("#description");
    detail.textContent = `${description}`;

//affichage couleur
for (NbreCouleur = 0; NbreCouleur < value.colors.length ;NbreCouleur ++ )  {

  const affichageCouleur = document.createElement("option");
  const option = document.querySelector("#colors");
  option.appendChild(affichageCouleur);
  const couleur = value.colors[NbreCouleur];
  affichageCouleur.value =`${couleur}`;
  affichageCouleur.textContent = `${couleur}`;

}





//-------------ajout articles au localstorage-----------------------------------------------------------

const boutonAjouter = document.querySelector('button');
const quantité =document.querySelector('#quantity');
const couleurProduit = document.querySelector('#colors');

boutonAjouter.addEventListener('click' , ajoutProduit => {
 
let detailProduit = {
id :`${id}`,
couleur :`${couleurProduit.value}`,
quantité :`${quantité.value}`,
prix : `${montant} `
};
 
//condition selection couleur et quantité
 if ((quantité.value > 0 )&&(couleurProduit.value != "")){
    let sauvegardePanier = JSON.parse(localStorage.getItem("produit"));
    console.log(sauvegardePanier);
    

//condition sauvegarde nouveau produit sans écrasement du précedent
    if(sauvegardePanier){
          
//condition cumul quantité si id+couleur produit identiques
      
      var trouveProduit =0;
      for (var i =0 ; i < sauvegardePanier.length;i++){
      var lecturePanier = sauvegardePanier[i];
      console.log( lecturePanier);

      if(lecturePanier.id == detailProduit.id && lecturePanier.couleur == detailProduit.couleur){
        let NouvelleQtitéProduit = Number(detailProduit.quantité) + Number(lecturePanier.quantité);
        if(NouvelleQtitéProduit < 100){
          sauvegardePanier[i].quantité = Number(detailProduit.quantité) + Number(lecturePanier.quantité);
        }else{
          alert ("!!! Quantité maximum par article atteinte !!!");
        }
        trouveProduit = 1;
      }
    }
    if (trouveProduit==0){
      sauvegardePanier.push(detailProduit);
    }
    localStorage.setItem("produit",JSON.stringify(sauvegardePanier));

    }else{
      sauvegardePanier=[];
      sauvegardePanier.push(detailProduit);
      localStorage.setItem("produit",JSON.stringify(sauvegardePanier));
      console.log(sauvegardePanier);

   
    }  
  
    alert (`L'article ${nom} a été ajouté au panier.`);

    /*/// mise à jour affichage quantité dans panier
    
      let totalQuantité = 0;
      //let sauvegardePanier = JSON.parse(localStorage.getItem("produit"));
      for (let produit of sauvegardePanier){
      totalQuantité += Number(produit.quantité);
      }
      const affichageQuantitéPanier = document.querySelector("#Panier");
      affichageQuantitéPanier.textContent = `Panier (${totalQuantité})`;*/

    
  } else {
    alert ("Merci de saisir une couleur valide et une quantité de 1 à 100.");
  }

  })

  } )
  .catch(function(err) {
    console.log(err);
    alert(err);

});
   