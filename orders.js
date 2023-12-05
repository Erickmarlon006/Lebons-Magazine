import { readLocalStorage } from "./src/catalog.js";
import { drawSimpleItem } from "./checkout.js";

var products = [];
async function getProducts() {
  await fetch("http://localhost:3000/items")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      products = data;
      renderOrdersHistory();
    })
    .catch((error) => {
      alert("Error ao buscar dados do banco");
      console.log(error);
    });
}
getProducts();

function renderOrdersHistory() {
  const orderHistory = readLocalStorage("history");
  for (const entireOrder of orderHistory) {
    createOrdershistory(entireOrder);
  }
}

function createOrdershistory(entireOrder) {
  const orderElement = `<p>${new Date(entireOrder.data).toLocaleDateString(
    "pt-BR",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )}</p>
    <section id='orders-container-${entireOrder.data}'></section>`;
  const main = document.getElementsByTagName("main")[0];
  main.innerHTML += orderElement;

  for (const itemId in entireOrder.order) {
    drawSimpleItem(
      itemId,
      `orders-container-${entireOrder.data}`,
      entireOrder.order[itemId]
    );
  }
}
