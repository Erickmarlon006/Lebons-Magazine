const productsContainer = document.querySelector(".items-collection");

function showEletronics() {
  showAll();
  hideBooks();
  hideShoes();
}
function showBooks() {
  showAll();
  hideEletronics();
  hideShoes();
}
function showShoes() {
  showAll();
  hideEletronics();
  hideBooks();
}

function hideEletronics() {
  const eletronicProducts = Array.from(
    productsContainer.getElementsByClassName("Eletronic")
  );
  for (const product of eletronicProducts) {
    product.classList.add("hidden");
  }
}
function hideBooks() {
  const bookProducts = Array.from(
    productsContainer.getElementsByClassName("Book")
  );
  for (const product of bookProducts) {
    product.classList.add("hidden");
  }
}
function hideShoes() {
  const shoesProducts = Array.from(
    productsContainer.getElementsByClassName("Shoes")
  );
  for (const product of shoesProducts) {
    product.classList.add("hidden");
  }
}
function showAll() {
  const hiddenProducts = Array.from(
    productsContainer.getElementsByClassName("hidden")
  );
  for (const product of hiddenProducts) {
    product.classList.remove("hidden");
  }
}
export function initFilters() {
  document.querySelector("#show-all").addEventListener("click", showAll);
  document.querySelector("#show-books").addEventListener("click", showBooks);
  document
    .querySelector("#show-eletronics")
    .addEventListener("click", showEletronics);
  document.querySelector("#show-shoes").addEventListener("click", showShoes);
}
