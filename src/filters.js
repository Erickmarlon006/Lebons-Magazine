const productsContainer = document.querySelector(".items-collection");

function hideEletronics() {
  showAll();
  const eletronicProducts = Array.from(
    productsContainer.getElementsByClassName("eletronic")
  );
  for (const product of eletronicProducts) {
    product.classList.add("hidden");
  }
}
function hideBooks() {
  showAll();
  const bookProducts = Array.from(
    productsContainer.getElementsByClassName("book")
  );
  for (const product of bookProducts) {
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
  document
    .querySelector("#show-books")
    .addEventListener("click", hideEletronics);
  document
    .querySelector("#show-eletronics")
    .addEventListener("click", hideBooks);
}
