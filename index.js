import { initCart, renderCart, updateTotalPrice } from "./src/shoppingCart.js";
import { getItems } from "./src/catalog.js";
import { initFilters } from "./src/filters.js";

getItems();
initCart();
renderCart();
updateTotalPrice();
initFilters();
