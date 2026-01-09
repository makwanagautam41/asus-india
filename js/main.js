// Initialize application when DOM is ready
document.addEventListener("DOMContentLoaded", function () {

  // Setup mobile menu
  setupMobileMenu();

  // Determine which page we're on and load appropriate content
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1);

  // Route to appropriate page loader
  if (page === "index.html" || page === "" || path.endsWith("/")) {
    loadHomePage();
  } else if (page === "products.html") {
    loadProductsPage();
  } else if (page === "cart.html") {
    loadCartPage();
  } else if (page === "product-detail.html") {
    loadProductDetailPage();
  } else if (page === "about.html") {
    loadAboutPage();
  } else if (page === "faq.html") {
    loadFAQPage();
  } else if (page === "contact.html") {
    loadContactPage();
  } else if (page === "warranty.html") {
    loadWarrantyPage();
  } else if (page === "support.html") {
    loadSupportPage();
  } else if (page === "checkout.html") {
    loadCheckoutPage();
  }

  // Setup scroll animations
  setupScrollAnimations();
});

// Setup scroll animations

function setupScrollAnimations() {
  // Observe elements with animate-fade-up class
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(".animate-fade-up");
  animatedElements.forEach((el) => observer.observe(el));
}

// Page loaders for content pages

function loadAboutPage() {
  console.log("About page loaded");
  // Content is static in HTML
}

function loadFAQPage() {
  console.log("FAQ page loaded");
  setupAccordion();
}

function loadContactPage() {
  console.log("Contact page loaded");
  setupContactForm();
}

function loadWarrantyPage() {
  console.log("Warranty page loaded");
  // Content is static in HTML
}

function loadSupportPage() {
  console.log("Support page loaded");
  // Content is static in HTML
}

function loadCheckoutPage() {
  console.log("Checkout page loaded");
  setupCheckoutForm();
  updateCheckoutSummary();
}

// Setup accordion for FAQ page

function setupAccordion() {
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      // Close all other accordions
      accordionTriggers.forEach((t) => {
        t.classList.remove("active");
        if (t.nextElementSibling) {
          t.nextElementSibling.classList.remove("active");
        }
      });

      // Toggle current accordion
      if (!isActive) {
        this.classList.add("active");
        if (content) {
          content.classList.add("active");
        }
      }
    });
  });
}

// Setup contact form

function setupContactForm() {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      console.log("Contact form submitted:", data);

      // Show success message
      toastManager.show(
        "Message Sent",
        "Thank you for contacting us. We'll get back to you soon!",
        5000
      );

      // Reset form
      form.reset();
    });
  }
}

// Setup checkout form

function setupCheckoutForm() {
  const form = document.getElementById("checkoutForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      console.log("Checkout form submitted:", data);

      // Show success message
      toastManager.show(
        "Order Placed",
        "Thank you for your order! You will receive a confirmation email shortly.",
        5000
      );

      // Clear cart
      cartState.clear();

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    });
  }
}

function updateCheckoutSummary() {
  const items = cartState.items;
  const checkoutItems = document.getElementById("checkoutItems");

  if (checkoutItems && items.length > 0) {
    checkoutItems.innerHTML = "";

    items.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "summary-row";
      itemEl.innerHTML = `
                <span class="summary-label">${item.product.name} × ${
        item.quantity
      }</span>
                <span class="summary-value">$${(
                  item.product.price * item.quantity
                ).toLocaleString()}</span>
            `;
      checkoutItems.appendChild(itemEl);
    });
  }

  // Update totals
  const totalPrice = cartState.getTotalPrice();
  const shipping = totalPrice >= 999 ? 0 : 49;
  const tax = Math.round(totalPrice * 0.08);
  const total = totalPrice + shipping + tax;

  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutShipping = document.getElementById("checkoutShipping");
  const checkoutTax = document.getElementById("checkoutTax");
  const checkoutTotal = document.getElementById("checkoutTotal");

  if (checkoutSubtotal)
    checkoutSubtotal.textContent = `$${totalPrice.toLocaleString()}`;
  if (checkoutShipping)
    checkoutShipping.textContent = shipping === 0 ? "Free" : `$${shipping}`;
  if (checkoutTax) checkoutTax.textContent = `$${tax.toLocaleString()}`;
  if (checkoutTotal) checkoutTotal.textContent = `$${total.toLocaleString()}`;
}

// Utility functions

// Smooth scroll to element
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
