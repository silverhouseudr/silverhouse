let allProducts = [
  {
    "id": 1,
    "name": "Silver Necklace",
    "price": 1200,
    "image": "images/images.jpeg",
    "description": "Pure silver Necklace"
  },
  {
    "id": 2,
    "name": "Silver Necklace",
    "price": 3500,
    "image": "images/images2.jpeg",
    "description": "Elegant silver necklace"
  },
  {
    "id": 3,
    "name": "Silver Necklace",
    "price": 3500,
    "image": "images/images3.jpeg",
    "description": "Elegant silver necklace"
  },
  {
    "id": 4,
    "name": "Silver Necklace",
    "price": 3500,
    "image": "images/images4.jpeg",
    "description": "Elegant silver necklace"
  },
  {
    "id": 5,
    "name": "Silver Necklace",
    "price": 3500,
    "image": "images/images5.jpeg",
    "description": "Elegant silver necklace"
  },
       {
      "id": 6,
      "name": "Silver Ring",
      "price": "3XXX",
      "image": "images/images6.jpeg",
      "description": "Elegant silver ring"
    },
    {
      "id": 7,
      "name": "Silver Kada",
      "price": "2XXX",
      "image": "images/images7.jpeg",
      "description": "Elegant silver kada"
    },
    {
      "id": 8,
      "name": "Silver Kada",
      "price": "2XXX",
      "image": "images/images8.jpeg",
      "description": "Elegant silver kada"
    },
    {
      "id": 9,
      "name": "Silver Kada",
      "price": "2XXX",
      "image": "images/images9.jpeg",
      "description": "Elegant silver kada"
    },
    {
      "id": 10,
      "name": "Silver Ring",
      "price": "1XXX",
      "image": "images/images10.jpeg",
      "description": "Elegant silver ring"
    }
];

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
  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Load Page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(allProducts);

  const productDetail = document.getElementById("product-detail");

  if (productDetail) {
    const id = new URLSearchParams(window.location.search).get("id");
    const product = allProducts.find(p => p.id == id);

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
});
