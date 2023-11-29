import { items, readLocalStorage, saveLocalStorage } from "./catalog.js";
const shoppingCart = document.querySelector("#cart-shopping");
const idsCartItems = readLocalStorage("cart") ?? {};

export function initCart() {
  var cartIcon = document.querySelector("#cart-icon");
  var closeCart = document.querySelector("#close-cart");
  cartIcon.addEventListener("click", showShoppingCart);
  closeCart.addEventListener("click", closeShoppingCart);
}

function showShoppingCart() {
  shoppingCart.style.right = "0px";
}

function closeShoppingCart() {
  shoppingCart.style.right = "-300px";
}

export function addToShoppingCart(id) {
  if (id in idsCartItems) {
    incrementItemNumber(id);
    return;
  }
  idsCartItems[id] = 1;
  saveLocalStorage("cart", idsCartItems);
  drawItemCard(id);
  updateTotalPrice();
}

function drawItemCard(productId) {
  const product = items.find((item) => item.id === productId);
  const cartShopping = document.querySelector("#cart-items");

  const articleElement = document.createElement("article");
  articleElement.className = "cart-item";

  const cartItem = `<img src="${product.img}" alt="${product.title}">
  <div>
    <button id="removeBtn-${product.id}">
      <i class="fa-solid fa-xmark" ></i>
    </button>
    <h3>${product.title}</h3>
    <p>${product.price}</p>
  </div>
  <div> 
    <input id="decrementBtn-${product.id}" type="button" value="-">
    <p id='count-${product.id}'>${idsCartItems[product.id]}</p>
    <input id="incrementBtn-${product.id}" type="button" value="+">
  </div>`;

  articleElement.innerHTML = cartItem;
  cartShopping.appendChild(articleElement);

  document
    .querySelector(`#decrementBtn-${product.id}`)
    .addEventListener("click", () => decrementItemNumber(product.id));
  document
    .querySelector(`#incrementBtn-${product.id}`)
    .addEventListener("click", () => incrementItemNumber(product.id));
  document
    .querySelector(`#removeBtn-${product.id}`)
    .addEventListener("click", () => removeFromShoppingCart(product.id));
}

function incrementItemNumber(id) {
  idsCartItems[id]++;
  saveLocalStorage("cart", idsCartItems);
  updateTotalPrice();
  updateCountInfo(id);
}
function decrementItemNumber(id) {
  if (idsCartItems[id] === 1) {
    removeFromShoppingCart(id);
    return;
  }
  idsCartItems[id]--;
  saveLocalStorage("cart", idsCartItems);
  updateTotalPrice();
  updateCountInfo(id);
}

function updateCountInfo(id) {
  var p = document.querySelector(`#count-${id}`);
  p.textContent = idsCartItems[id];
}
function removeFromShoppingCart(id) {
  delete idsCartItems[id];
  saveLocalStorage("cart", idsCartItems);
  updateTotalPrice();
  renderCart();
}
export function renderCart() {
  const cartShopping = document.querySelector("#cart-items");
  cartShopping.innerHTML = "";
  for (const itemId in idsCartItems) {
    drawItemCard(itemId);
  }
}
export function updateTotalPrice() {
  const totalPricePlace = document.querySelector("#total-price");
  let totalPrice = 0;
  for (const productId in idsCartItems) {
    totalPrice +=
      items.find((item) => item.id === productId).price *
      idsCartItems[productId];
  }
  totalPricePlace.textContent = `Total: R$${totalPrice.toFixed(2)}`;
}
