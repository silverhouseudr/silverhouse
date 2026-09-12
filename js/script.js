let allProducts = window.allProducts || [];
let activeMaterial = "all";
let selectedTypes = {
  silver: new Set(["ring", "necklace", "kada"]),
  oxidized: new Set(["ring", "necklace", "kada"])
};

function loadProducts() {
  setupFilterControls();
  renderProducts(allProducts);
  renderProductDetail();
}

function setupFilterControls() {
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  const optionGroups = document.querySelectorAll(".filter-options");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      activeMaterial = filter;

      document.querySelectorAll(".filter-btn[data-filter]").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === filter);
      });

      optionGroups.forEach(group => {
        const shouldShow = group.dataset.material === filter && filter !== "all";
        group.style.display = shouldShow ? "block" : "none";
      });

      applyFilters();
    });
  });

  optionGroups.forEach(group => {
    group.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        const material = group.dataset.material;
        const checkedValues = Array.from(
          group.querySelectorAll('input[type="checkbox"]:checked')
        ).map(input => input.value.toLowerCase());

        selectedTypes[material] = new Set(checkedValues);
        applyFilters();
      });
    });
  });
}

function normalizeCategory(category) {
  return String(category || "").trim().toLowerCase();
}

function getProductType(productName) {
  const name = productName.toLowerCase();

  if (name.includes("ring")) return "ring";
  if (name.includes("necklace")) return "necklace";
  if (name.includes("kada")) return "kada";

  return "";
}

function applyFilters() {
  let filteredProducts = [...allProducts];

  if (activeMaterial !== "all") {
    filteredProducts = filteredProducts.filter(product => {
      const categoryMatch = normalizeCategory(product.category) === activeMaterial;
      const type = getProductType(product.name);
      const typeAllowed = selectedTypes[activeMaterial].has(type);
      return categoryMatch && typeAllowed;
    });
  }

  renderProducts(filteredProducts);
}

// Render Products
function renderProducts(products) {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" />
      <div class="card-content">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    productList.appendChild(card);
  });
}

// Filter
function filterProducts(category) {
  const normalizedCategory = category.toLowerCase();

  const filtered = normalizedCategory === "all"
    ? allProducts
    : allProducts.filter(product => product.name.toLowerCase().includes(normalizedCategory));

  renderProducts(filtered);
}

function renderProductDetail() {
  const productDetail = document.getElementById("product-detail");

  if (!productDetail) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const product = allProducts.find(item => item.id == id);

  if (product) {
    productDetail.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.image}" />
      <p>${product.description}</p>
      <h3 class="price">₹${product.price}</h3>

      <a class="whatsapp-btn" 
         href="https://wa.me/917014220167?text=I am interested in ${product.name}"
         target="_blank">
         Enquire on WhatsApp
      </a>
    `;
  }
}

// Load Page
document.addEventListener("DOMContentLoaded", loadProducts);
