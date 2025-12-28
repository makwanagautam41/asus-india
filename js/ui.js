// Render Product Card
function renderProductCard(product, index = 0) {
  const hasOriginalPrice = product.originalPrice ? true : false;
  const isOutOfStock = !product.inStock;
  const hasProductImages = product.images.length > 0 ? true : false;

  const card = document.createElement("div");
  card.className = "animate-fade-up";
  card.style.animationDelay = `${index * 0.1}s`;
  console.log(product.images[0]);

  card.innerHTML = `
        <a href="product-detail.html?id=${product.id}" class="product-card">
            <div class="product-image-wrapper">
                ${hasProductImages
      ? `<img src=${[product.images[0]]} />`
      : `
      <svg
        class="product-laptop-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    `
    }

                ${hasOriginalPrice
      ? '<div class="product-badge">Sale</div>'
      : ""
    }
                ${isOutOfStock
      ? '<div class="product-badge product-badge-out">Out of Stock</div>'
      : ""
    }
            </div>
            <div class="product-content">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-specs">${product.specs.processor} • ${product.specs.ram
    }</p>
                <div class="product-footer">
                    <div class="product-price-group">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                        ${hasOriginalPrice
      ? `<span class="product-price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>`
      : ""
    }
                    </div>
                    <button 
                        class="btn btn-ghost product-add-btn" 
                        onclick="handleAddToCart(event, '${product.id}')"
                        ${isOutOfStock ? "disabled" : ""}
                        aria-label="Add to cart"
                    >
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </a>
    `;

  return card;
}

// Render Category Card
function renderCategoryCard(category, index = 0) {
  const iconName = getCategoryIcon(category.id);
  const iconSVG = getIconSVG(iconName);

  const card = document.createElement("div");
  card.className = "animate-fade-up";
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
        <a href="pages/products.html?category=${category.id}" class="category-card">
            <div class="category-icon">${iconSVG}</div>
            <h3 class="category-name">${category.name}</h3>
            <p class="category-description">${category.description}</p>
        </a>
    `;

  return card;
}

// Render Trust Indicator
function renderTrustIndicator(indicator, index = 0) {
  const iconPath = getTrustIcon(indicator.icon);

  const item = document.createElement("div");
  item.className = "trust-item animate-fade-up";
  item.style.animationDelay = `${index * 0.1}s`;

  item.innerHTML = `
        <div class="trust-icon-wrapper">
            <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${iconPath}
            </svg>
        </div>
        <h3 class="trust-title">${indicator.title}</h3>
        <p class="trust-description">${indicator.description}</p>
    `;

  return item;
}

// Render Cart Item
function renderCartItem(item, index = 0) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item animate-fade-up";
  cartItem.style.animationDelay = `${index * 0.1}s`;

  cartItem.innerHTML = `
        <div class="cart-item-image">
            <svg class="cart-item-laptop-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
        </div>
        <div class="cart-item-details">
            <a href="product-detail.html?id=${item.product.id
    }" class="cart-item-name">
                ${item.product.name}
            </a>
            <p class="cart-item-specs">${item.product.specs.processor}</p>
            <p class="cart-item-price">₹${item.product.price.toLocaleString('en-IN')}</p>
        </div>
        <div class="cart-item-actions">
            <button 
                class="cart-item-remove" 
                onclick="handleRemoveFromCart('${item.product.id}')"
                aria-label="Remove item"
            >
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
            <div class="quantity-controls">
                <button 
                    class="btn btn-outline quantity-btn" 
                    onclick="handleUpdateQuantity('${item.product.id}', ${item.quantity - 1
    })"
                    aria-label="Decrease quantity"
                >
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <span class="quantity-value">${item.quantity}</span>
                <button 
                    class="btn btn-outline quantity-btn" 
                    onclick="handleUpdateQuantity('${item.product.id}', ${item.quantity + 1
    })"
                    aria-label="Increase quantity"
                >
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
        </div>
    `;

  return cartItem;
}

// Event Handlers

// Add to Cart Handler
function handleAddToCart(event, productId) {
  event.preventDefault();
  event.stopPropagation();

  const product = products.find((p) => p.id === productId);
  if (product && product.inStock) {
    cartState.addItem(product);
    toastManager.show(
      "Added to cart",
      `${product.name} has been added to your cart.`
    );
  }
}

// Remove from Cart Handler
function handleRemoveFromCart(productId) {
  cartState.removeItem(productId);

  // Reload cart page if we're on it
  if (window.location.pathname.includes("cart.html")) {
    loadCartPage();
  }
}

// Update Quantity Handler
function handleUpdateQuantity(productId, newQuantity) {
  cartState.updateQuantity(productId, newQuantity);

  // Reload cart page if we're on it
  if (window.location.pathname.includes("cart.html")) {
    loadCartPage();
  }
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      uiState.toggleMobileMenu();
    });
  }

  // Close menu when clicking overlay
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", () => {
      uiState.closeMobileMenu();
    });
  }

  // Close menu when clicking a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      uiState.closeMobileMenu();
    });
  });
}

// Page Loaders

// Load Home Page
function loadHomePage() {
  // Render categories
  const categoriesGrid = document.getElementById("categoriesGrid");
  if (categoriesGrid) {
    categoriesGrid.innerHTML = "";
    categories.forEach((category, index) => {
      categoriesGrid.appendChild(renderCategoryCard(category, index));
    });
  }

  // Render featured products
  const featuredProducts = products.filter((p) => p.featured);
  const featuredGrid = document.getElementById("featuredProducts");
  if (featuredGrid) {
    featuredGrid.innerHTML = "";
    featuredProducts.forEach((product, index) => {
      featuredGrid.appendChild(renderProductCard(product, index));
    });
  }

  // Render trust indicators
  const trustGrid = document.getElementById("trustGrid");
  if (trustGrid) {
    trustGrid.innerHTML = "";
    trustIndicators.forEach((indicator, index) => {
      trustGrid.appendChild(renderTrustIndicator(indicator, index));
    });
  }
}

// Load Products Page
function loadProductsPage() {
  // Load filters from URL
  filterState.loadFromURL();

  // Setup search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = filterState.searchQuery;
    searchInput.addEventListener("input", (e) => {
      filterState.searchQuery = e.target.value;
      renderFilteredProducts();
    });
  }

  // Setup search clear button
  const searchClear = document.getElementById("searchClear");
  if (searchClear) {
    searchClear.addEventListener("click", () => {
      filterState.searchQuery = "";
      if (searchInput) searchInput.value = "";
      renderFilteredProducts();
    });
  }

  // Setup sort select
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.value = filterState.sortBy;
    sortSelect.addEventListener("change", (e) => {
      filterState.sortBy = e.target.value;
      renderFilteredProducts();
    });
  }

  // Setup category filters
  setupCategoryFilters();

  // Setup mobile filter toggle
  const filterToggle = document.getElementById("filterToggle");
  const sidebar = document.getElementById("sidebar");
  if (filterToggle && sidebar) {
    filterToggle.addEventListener("click", () => {
      sidebar.classList.toggle("hidden-mobile");
    });
  }

  // Initial render
  renderFilteredProducts();
}

// Render Filtered Products
function renderFilteredProducts() {
  const filteredProducts = filterState.getFilteredProducts();
  const productsGrid = document.getElementById("productsGrid");
  const productsCount = document.getElementById("productsCount");

  if (productsCount) {
    const count = filteredProducts.length;
    productsCount.textContent = `${count} product${count !== 1 ? "s" : ""}`;
  }

  if (productsGrid) {
    productsGrid.innerHTML = "";

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <p class="empty-state-text">No products found</p>
                    <button class="btn btn-outline" onclick="clearFilters()">Clear Filters</button>
                </div>
            `;
    } else {
      filteredProducts.forEach((product, index) => {
        productsGrid.appendChild(renderProductCard(product, index));
      });
    }
  }

  // Update search clear button visibility
  const searchClear = document.getElementById("searchClear");
  if (searchClear) {
    searchClear.style.display = filterState.searchQuery ? "block" : "none";
  }
}

// Setup Category Filters
function setupCategoryFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach((button) => {
    const category = button.dataset.category;

    // Set active state
    if (category === filterState.category) {
      button.classList.add("active");
    }

    // Add click handler
    button.addEventListener("click", () => {
      filterState.category = category;
      filterState.updateURL();

      // Update active states
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      renderFilteredProducts();
    });
  });
}

// Clear Filters
function clearFilters() {
  filterState.category = "all";
  filterState.searchQuery = "";
  filterState.sortBy = "featured";
  filterState.updateURL();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.value = "featured";

  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach((btn) => {
    if (btn.dataset.category === "all") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderFilteredProducts();
}

// Load Cart Page
function loadCartPage() {
  const cartItems = cartState.items;
  const cartItemsContainer = document.getElementById("cartItems");
  const emptyState = document.getElementById("emptyState");
  const cartContent = document.getElementById("cartContent");

  if (cartItems.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (cartContent) cartContent.style.display = "none";
  } else {
    if (emptyState) emptyState.style.display = "none";
    if (cartContent) cartContent.style.display = "block";

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";
      cartItems.forEach((item, index) => {
        cartItemsContainer.appendChild(renderCartItem(item, index));
      });
    }

    updateOrderSummary();
  }
}

// Update Order Summary
function updateOrderSummary() {
  const totalPrice = cartState.getTotalPrice();
  const shipping = totalPrice >= 82917 ? 0 : 4067;
  const tax = Math.round(totalPrice * 0.08);
  const total = totalPrice + shipping + tax;

  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");

  if (subtotalEl) subtotalEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
  if (shippingEl)
    shippingEl.textContent = shipping === 0 ? "Free" : `₹${shipping}`;
  if (taxEl) taxEl.textContent = `₹${tax.toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Load Product Detail Page
function loadProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    window.location.href = "../pages/products.html";
    return;
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    window.location.href = "../pages/products.html";
    return;
  }

  // Render product details
  renderProductDetail(product);
}

// Render Product Detail
function renderProductDetail(product) {
  const container = document.getElementById("productDetail");
  if (!container) return;

  const hasOriginalPrice = product.originalPrice ? true : false;
  const stars =
    "★".repeat(Math.floor(product.rating)) +
    "☆".repeat(5 - Math.floor(product.rating));

  container.innerHTML = `
  <div class="product-detail-layout animate-fade-up">

    <!-- LEFT COLUMN -->
    <div style="display:flex;flex-direction:column;gap:16px;">

      <!-- MAIN IMAGE (RED BOX) -->
      <div 
        class="product-detail-image">
        <img 
          id="mainProductImage"
          src="${product.images[0]}" 
          alt="${product.name}"/>
      </div>

      <!-- SUB IMAGES (BEIGHT BELOW RED BOX) -->
      <div class="product-detail-sub-images">
      ${product.images
      .map(
        (img, index) => `
        <div
          style="
            width:80px;
            height:80px;
            background:#e5e7eb;
            border-radius:10px;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
          "
        >
          <img
          alt="${product.name}"
          src="${img}" 
          class="product-thumbnail ${index === 0 ? "active" : ""}"
          onclick="changeProductImage('${img}', this)"
        />
        </div>
      `
      )
      .join("")}
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="product-detail-info">
      <p class="product-detail-category">${product.category}</p>
      <h1 class="product-detail-title">${product.name}</h1>

      <div class="product-detail-rating">
        <span class="rating-stars">${stars}</span>
        <span class="rating-text">
          ${product.rating} (${product.reviewCount} reviews)
        </span>
      </div>

      <div class="product-detail-price-group">
        <span class="product-detail-price">
          ₹${product.price.toLocaleString("en-IN")}
        </span>
        ${hasOriginalPrice
      ? `<span class="product-detail-price-original">
                ₹${product.originalPrice.toLocaleString("en-IN")}
              </span>`
      : ""
    }
      </div>

      <p class="product-detail-description">
        ${product.description}
      </p>

      <div class="product-detail-specs">
        <h3 class="specs-title">Specifications</h3>
        <div class="specs-list">
          <div class="spec-item">
            <span class="spec-label">Processor</span>
            <span class="spec-value">${product.specs.processor}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">RAM</span>
            <span class="spec-value">${product.specs.ram}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Storage</span>
            <span class="spec-value">${product.specs.storage}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Display</span>
            <span class="spec-value">${product.specs.display}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Graphics</span>
            <span class="spec-value">${product.specs.graphics}</span>
          </div>
        </div>
      </div>

      <div class="stock-badge ${product.inStock ? "in-stock" : "out-of-stock"}">
        ${product.inStock ? "In Stock" : "Out of Stock"}
      </div>

      <div class="product-detail-actions">
        <button
          class="btn btn-primary btn-lg"
          onclick="handleAddToCart(event, '${product.id}')"
          ${!product.inStock ? "disabled" : ""}
        >
          Add to Cart
        </button>

        <a href="../pages/products.html" class="btn btn-outline btn-lg">
          Back to Products
        </a>
      </div>
    </div>

  </div>
`;
}

function changeProductImage(src, el) {
  document.getElementById("mainProductImage").src = src;

  document
    .querySelectorAll(".product-thumbnail")
    .forEach(t => t.classList.remove("active"));

  el.classList.add("active");
}
