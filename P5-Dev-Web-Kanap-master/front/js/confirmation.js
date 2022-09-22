//recuperation  du n°de commande depuis le local storage
let commande = JSON.parse(localStorage.getItem("commande"));

// affichage du n° de commande sur la page
for (i = 0;i < commande.length ; i++) {
const order = commande[i].order;
console.log(order);
const orderId = document.querySelector("#orderId");
orderId.textContent =order;
};
// suppression des infos dans le local storage
localStorage.removeItem("commande");