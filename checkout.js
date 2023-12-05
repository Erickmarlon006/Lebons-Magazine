import {
  saveLocalStorage,
  deleteFromLocalStorage,
  readLocalStorage,
} from "./src/catalog.js";

var products = [];
async function getProducts() {
  await fetch("http://localhost:3000/items")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      products = data;
      drawCheckoutItems();
      updateTotalPrice();
    })
    .catch((error) => {
      alert("Error ao buscar dados do banco");
      console.log(error);
    });
}
getProducts();

function drawCheckoutItems() {
  const idsCartItems = readLocalStorage("cart") ?? {};
  for (const itemId in idsCartItems) {
    drawSimpleItem(itemId, "checkout-products-container", idsCartItems[itemId]);
  }
}

export function drawSimpleItem(productId, containerId, itemCount) {
  const product = products.find((item) => item.id === productId);
  const cartShopping = document.getElementById(containerId);

  const articleElement = document.createElement("article");
  articleElement.className = "checkout-item";

  const cartItem = `<img src="${product.img}" alt="${product.title}">
  <div>
    <h3>${product.title}</h3>
    <p>R$${product.price.toFixed(2)}</p>
  </div>
  <div>    
    <p id='count-${product.id}'>${itemCount}</p
  </div>`;

  articleElement.innerHTML = cartItem;
  cartShopping.appendChild(articleElement);
}

function finishBuy(event) {
  event.preventDefault();
  const idsCartItems = readLocalStorage("cart") ?? {};
  if (Object.keys(idsCartItems).length === 0) {
    return;
  }
  const actualDate = new Date();
  const doneOrder = {
    data: actualDate,
    order: idsCartItems,
  };
  const orderHistory = readLocalStorage("history") ?? [];
  const orderHistoryUpdated = [doneOrder, ...orderHistory];
  saveLocalStorage("history", orderHistoryUpdated);
  deleteFromLocalStorage("cart");
  window.location.href = window.location.origin + "/orders.html";
}

document.addEventListener("submit", (evt) => finishBuy(evt));

function updateTotalPrice() {
  const idsCartItems = readLocalStorage("cart") ?? {};
  const totalPricePlace = document.querySelector("#total-price");
  let totalPrice = 0;
  for (const productId in idsCartItems) {
    totalPrice +=
      products.find((item) => item.id === productId).price *
      idsCartItems[productId];
  }
  totalPricePlace.textContent = `Total: R$${totalPrice.toFixed(2)}`;
}
