import { addToShoppingCart } from "./shoppingCart.js";
var itemsCollection = document.querySelector(".items-collection");
export function showItems(list) {
  for (const item of list) {
    let itemCard = `<div class='item-card ${item.type}'>
      <h2>${item.title}</h2>
      <img src='${item.img}'/>
      <h3>R$${item.price.toFixed(2)}</h3>
      <button class="addItemBtn" id='addBtn-${
        item.id
      }' type='button' ><i class="fa-solid fa-cart-shopping"</button>
      </div>`;
    itemsCollection.innerHTML += itemCard;
  }

  for (const item of list) {
    var addBtn = document.querySelector(`#addBtn-${item.id}`);
    addBtn.addEventListener("click", () => addToShoppingCart(item.id));
  }
}
