 fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    
// affichage de tous les produits sur la page
for ( NumProduit = 0; NumProduit < value.length ;NumProduit ++ )  {
  
    const IdProduit = value[NumProduit]._id;
    const DescriptionProduit = value[NumProduit].description;
    const AltTxtProduit = value[NumProduit].altTxt;
    const NomProduit = value[NumProduit].name;
    const ImageProduit = value[NumProduit].imageUrl;
     
    const AffichageProduits= `<a href="./product.html?id=${IdProduit}"><article><img src=" ${ImageProduit}" alt= "${AltTxtProduit}" ><h3 class= "productName">${NomProduit}</h3><p class="productDescription">${DescriptionProduit}</p></article></a>`;
    document.getElementById('items').innerHTML =  document.getElementById('items').innerHTML + AffichageProduits;
   
    
   
  }
  

  
 } )
  .catch(function(err) {
   // Une erreur est survenue
  });





