//recuperation  du n°de commande depuis le local storage
let commande = JSON.parse(localStorage.getItem("commande"));

// ciblage dernier n° de commande
for (i = 0;i < commande.length ; i++) {
const order = commande[i].order;
console.log(order);

// affichage du n° de commande sur la page
const orderId = document.querySelector("#orderId");
orderId.textContent =order;
};