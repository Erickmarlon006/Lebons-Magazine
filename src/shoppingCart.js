import { items, readLocalStorage, saveLocalStorage } from "./catalog.js";
const shoppingCart = document.querySelector("#cart-shopping");
const idsCartItems = readLocalStorage("cart") ?? {};

function goToCheckout() {
  if (Object.keys(idsCartItems).length === 0) {
    return;
  }
  window.location.href = window.location.origin + "/checkout.html";
}

export function initCart() {
  const cartIcon = document.querySelector("#cart-icon");
  const closeCart = document.querySelector("#close-cart");
  const buyBtn = document.querySelector("#buyBtn");
  cartIcon.addEventListener("click", showShoppingCart);
  closeCart.addEventListener("click", closeShoppingCart);
  buyBtn.addEventListener("click", goToCheckout);
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
  drawItemCard(id);
  saveLocalStorage("cart", idsCartItems);
  updateTotalPrice();
}

function drawItemCard(productId) {
  const product = items.find((item) => item.id === productId);
  const cartItems = document.querySelector("#cart-items");

  const articleElement = document.createElement("article");
  articleElement.className = "cart-item";

  const cartItem = `<img src="${product.img}" alt="${product.title}">
  <div>
    <h4>${product.title}</h4>
    <p>R$${product.price.toFixed(2)}</p>
  </div>
  <div>
    <span> 
      <button id="removeBtn-${product.id}">
        <i class="fa-solid fa-xmark" ></i>
      </button>
    </span>
    <span>
      <input id="decrementBtn-${product.id}" type="button" value="-">
      <p id='count-${product.id}'>${idsCartItems[product.id]}</p>
      <input id="incrementBtn-${product.id}" type="button" value="+">
    </span>
  </div>`;

  articleElement.innerHTML = cartItem;
  cartItems.appendChild(articleElement);

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
  updateTotalPrice();
  updateCountInfo(id);
  saveLocalStorage("cart", idsCartItems);
}
function decrementItemNumber(id) {
  if (idsCartItems[id] === 1) {
    removeFromShoppingCart(id);
    return;
  }
  idsCartItems[id]--;
  updateTotalPrice();
  updateCountInfo(id);
  saveLocalStorage("cart", idsCartItems);
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
  const cartItems = document.querySelector("#cart-items");
  cartItems.innerHTML = "";
  for (const itemId in idsCartItems) {
    drawItemCard(itemId);
  }
}
export function updateTotalPrice() {
  const totalPricePlace = document.querySelector("#total-price");
  const cartItems = document.querySelector("#cart-items");
  let totalPrice = 0;
  for (const productId in idsCartItems) {
    totalPrice +=
      items.find((item) => item.id === productId).price *
      idsCartItems[productId];
  }
  if (totalPrice === 0) {
    cartItems.style.display = "none";
    totalPricePlace.innerHTML =
      `<i class="fa-solid fa-cart-shopping"></i>
      Seu carrinho está vazio. Procure no site os produtos que vão te deixar feliz. Quando encontrá-los, clique no botão adicionar ao carrinho`;
  } else {
    cartItems.style.display = "flex";
    totalPricePlace.textContent = `Total: R$${totalPrice.toFixed(2)}`;
  }
}
