const closeBtn = document.querySelector("#close-btn");
const sidePanelProduct = document.querySelector(".sidepanel-product");
const productsSideBar = document.querySelector("#display-sideBar");
const productCards = document.querySelectorAll(".product-cards");
const productsItems = document.querySelector("#display-sideBar");
const productsSideContainer = document.querySelector(".sidepanel-container");
const totalPrice = document.querySelector("#total-price");
const itemStatus = document.querySelector(".item-status");

const addProductItems = JSON.parse(localStorage.getItem("Product_Cart")) || [];

productCards.forEach((value) => {
  const imageUrl = value.querySelector("img");
  const productId = value.dataset.id;
  const addBtn = value.querySelector(".add-btn");
  const productPrice = value.querySelector(".product-price");
  const productName = value.querySelector(".product-name");
  const srcUrl = imageUrl.alt;

  addToCartFunction(
    imageUrl,
    addBtn,
    productPrice,
    productName,
    productId,
    srcUrl,
  );
});

function addToggleFunction() {
  closeBtn.addEventListener("click", () => {
    sidePanelProduct.classList.toggle("sidepanel-product-toggle");
  });

  productsSideBar.addEventListener("click", () => {
    sidePanelProduct.classList.toggle("sidepanel-product-toggle");
  });
}

function addToCartFunction(
  imageUrl,
  addBtn,
  productPrice,
  productName,
  productId,
  srcUrl,
) {
  addBtn.addEventListener("click", () => {
    const name = productName.innerText;
    const price = productPrice.innerText.replace("₹", "");
    const img = imageUrl.src;
    const altSrc = srcUrl;

    const productCards = {
      id: Number(productId),
      productName: name,
      productUrl: img,
      productAlt: altSrc,
      productPrice: price,
    };

    addProductItems.push(productCards);
    localStorage.setItem("Product_Cart", JSON.stringify(addProductItems));
    renderCart();
    alert("Product Added Successfully!");
  });
  
  renderCart();
  productSidePanel(productCards);
}

function productSidePanel(product) {
  const productSideCard = `
  <div class="sidepanel-box" data-id=${product.id}>
  <div class="sidepanel-section">
              <img
              src="${product.productUrl}"
              alt="${product.productAlt}"
                width="80"
                height="80"
                />
                </div>
                
                <div class="sidepanel-title">
                <h3>${product.productName}</h3>
                </div>

                <div class="sidepanel-price">
                <h3>₹${Number(product.productPrice)}.00</h3>
            </div>

            <div class="delete-btn">
            <i class="fa-solid fa-trash-alt" onclick="deleteProductItem(${product.id})"></i>
            </div>
            </div>`;

  productsSideContainer.innerHTML += productSideCard;
  productsItems.innerHTML = `${addProductItems.length} Items`;
  addPriceTotal(addProductItems);
}

function addPriceTotal(addProductItems) {
  const price = addProductItems.reduce((acc, curr) => {
    return acc + Number(curr.productPrice);
  }, 0);

  const priceTotal = price.toLocaleString("hi-IN", {
    style: "currency",
    currency: "INR",
  });

  totalPrice.textContent = `${priceTotal}`;
}

function deleteProductItem(id) {
  const index = addProductItems.findIndex((product) => product.id === id);
  index !== -1 ? addProductItems.splice(index, 1) : null;
  localStorage.setItem("Product_Cart", JSON.stringify(addProductItems));
  renderCart();
}

function renderCart() {
  productsSideContainer.innerHTML = "";

  if (addProductItems.length === 0) {
    productNotFoundFunction();
  } else {
    addProductItems.forEach((product) => {
      productSidePanel(product);
    });
  }

  productsItems.innerHTML = `${addProductItems.length} Items`;
  addPriceTotal(addProductItems);
}

function productNotFoundFunction() {
  productsSideContainer.innerHTML = `
    <div class="item-status">
      <p style="color: #fff;">Items Not Found.</p>
    </div>
  `;
}

addToggleFunction();