// Cart State Management
const cartState = {
    items: [],
    
    // Load cart from localStorage
    load() {
        try {
            const saved = localStorage.getItem('asus-cart');
            if (saved) {
                this.items = JSON.parse(saved);
                this.updateUI();
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    },
    
    // Save cart to localStorage
    save() {
        try {
            localStorage.setItem('asus-cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    },
    
    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                product: product,
                quantity: 1
            });
        }
        
        this.save();
        this.updateUI();
    },
    
    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.save();
        this.updateUI();
    },
    
    // Update item quantity
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
            this.save();
            this.updateUI();
        }
    },
    
    // Clear cart
    clear() {
        this.items = [];
        this.save();
        this.updateUI();
    },
    
    // Get total items count
    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    // Get total price
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    },
    
    // Update UI (cart badge)
    updateUI() {
        const totalItems = this.getTotalItems();
        const badges = document.querySelectorAll('.cart-badge');
        
        badges.forEach(badge => {
            if (totalItems > 0) {
                badge.textContent = totalItems;
                badge.classList.add('active');
            } else {
                badge.textContent = '0';
                badge.classList.remove('active');
            }
        });
        
        // Trigger custom event for cart updates
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: {
                items: this.items,
                totalItems: totalItems,
                totalPrice: this.getTotalPrice()
            }
        }));
    }
};

// Filter State for products page

const filterState = {
    category: 'all',
    searchQuery: '',
    sortBy: 'featured',
    
    // Get filtered and sorted products
    getFilteredProducts() {
        let result = [...products];
        
        // Filter by category
        if (this.category !== 'all') {
            result = result.filter(p => p.category === this.category);
        }
        
        // Filter by search query
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.specs.processor.toLowerCase().includes(query)
            );
        }
        
        // Sort
        switch (this.sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }
        
        return result;
    },
    
    // Set category from URL
    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        if (category) {
            this.category = category;
        }
    },
    
    // Update URL with current filters
    updateURL() {
        const params = new URLSearchParams();
        if (this.category !== 'all') {
            params.set('category', this.category);
        }
        
        const newURL = params.toString() 
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname;
        
        window.history.replaceState({}, '', newURL);
    }
};

// UI State

const uiState = {
    mobileMenuOpen: false,
    
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const menuToggle = document.getElementById('menuToggle');
        
        if (mobileMenu) {
            if (this.mobileMenuOpen) {
                mobileMenu.classList.add('active');
            } else {
                mobileMenu.classList.remove('active');
            }
        }
        
        if (mobileMenuOverlay) {
            if (this.mobileMenuOpen) {
                mobileMenuOverlay.classList.add('active');
            } else {
                mobileMenuOverlay.classList.remove('active');
            }
        }
        
        // Prevent body scroll when menu is open
        if (this.mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        if (menuToggle) {
            const menuIcon = menuToggle.querySelector('.menu-icon');
            const closeIcon = menuToggle.querySelector('.close-icon');
            
            if (this.mobileMenuOpen) {
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        }
    },
    
    closeMobileMenu() {
        if (this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }
};

// Toast Notifications

const toastManager = {
    show(title, description, duration = 3000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after duration
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
};

// Animation Utilities

const animationUtils = {
    // Observe elements for fade-in animation
    observeElements(selector) {
        const elements = document.querySelectorAll(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    },
    
    // Stagger animation for multiple elements
    staggerAnimation(elements, delay = 100) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }
};

// Initialize State on page load

function initializeState() {
    // Load cart from localStorage
    cartState.load();
    
    // Set active navigation link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || 
            (currentPath.includes(href) && href !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeState);
} else {
    initializeState();
}
