import { showItems } from "./itemCards.js";
export var items = [];
export async function getItems() {
  await fetch("http://localhost:3000/items")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      items = data;
      showItems(items);
    })
    .catch((error) => {
      alert("Error ao buscar dados do banco");
      console.log(error);
    });
}
export function saveLocalStorage(key, info) {
  localStorage.setItem(key, JSON.stringify(info));
}
export function readLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function deleteFromLocalStorage(key){
  localStorage.removeItem(key);
}