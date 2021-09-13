//https://fakestoreapi.com/products


const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR1VmNTd5b-6JnAYRsMPmaQdgv4k8n0lkJfcY8V6xnoOORyHMnC5SKkkjtM`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product border me-4 mb-4">
      <div>
    <img class="product-image pt-3" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h3>Price:$  ${product.price}</h3>
      <p><i class="fas fa-user"></i> ${product.rating.count}
      <i class="fas fa-star"></i>  ${product.rating.rate}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now ">add to cart</button>
      <button id="details-btn">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// product count //
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  let totalCost  = document.getElementById("total");
  const grandTotal = parseFloat( getInputValue("price") ) + parseFloat(getInputValue("delivery-charge")) + parseFloat(getInputValue("total-tax"));
    totalCost.innerText = grandTotal.toFixed(2);
};
