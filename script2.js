document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const categoriesMenu = document.getElementById('categories-menu');
    const categoriesDropdown = document.getElementById('categories-dropdown');
    const cartModal = document.getElementById('cart-modal');
    const cartButton = document.getElementById('cart-button');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const startShopping = document.getElementById('start-shopping');
    const dealsButton = document.getElementById('deals-button');
    const sellButton = document.getElementById('sell-button');
    const sellModal = document.getElementById('sell-modal');
    const closeSellModal = document.getElementById('close-sell-modal');
    const sellForm = document.getElementById('sell-form');
  
    // Sample categories
    const categories = [
      'Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors',
      'Books & Media', 'Toys & Games', 'Automotive', 'Jewelry & Watches'
    ];
  
    // Sample second-hand product data
    let products = [
      { id: 1, name: 'Vintage Leather Jacket', description: 'Genuine leather jacket from the  80s, excellent condition.', price: 89.99, category: 'Clothing' },
      { id: 2, name: 'Retro Gaming Console', description: 'Classic gaming system from the 90s with 20 built-in games.', price: 59.99, category: 'Electronics' },
      { id: 3, name: 'Antique Wooden Desk', description: 'Beautiful oak desk from the early 20th century, some wear but sturdy.', price: 199.99, category: 'Home & Garden' },
      { id: 4, name: 'Pre-owned Smartphone', description: 'Latest model smartphone, barely used, comes with original accessories.', price: 349.99, category: 'Electronics' },
      { id: 5, name: 'Vintage Vinyl Records', description: 'Collection of 10 classic rock albums from the 70s.', price: 79.99, category: 'Books & Media' },
      { id: 6, name: 'Second-hand Bicycle', description: 'Well-maintained mountain bike, perfect for beginners.', price: 129.99, category: 'Sports & Outdoors' },
      { id: 7, name: 'Used Textbooks', description: 'Set of college textbooks for Computer Science, great condition.', price: 49.99, category: 'Books & Media' },
      { id: 8, name: 'Refurbished Laptop', description: 'Professionally refurbished laptop, 1-year warranty included.', price: 399.99, category: 'Electronics' },
      { id: 9, name: 'Vintage Camera', description: 'Fully functional film camera from the 1970s, collector\'s item.', price: 149.99, category: 'Electronics' },
      { id: 10, name: 'Antique Coffee Table', description: 'Solid wood coffee table with intricate carvings, minor scratches.', price: 89.99, category: 'Home & Garden' },
      { id: 11, name: 'Used Golf Clubs', description: 'Complete set of golf clubs, suitable for beginners to intermediate players.', price: 199.99, category: 'Sports & Outdoors' },
      { id: 12, name: 'Vintage Wristwatch', description: 'Classic analog watch from a renowned brand, recently serviced.', price: 299.99, category: 'Jewelry & Watches' },
      { id: 13, name: 'Retro Polaroid Camera', description: 'Instant camera from the 90s, fully functional with film included.', price: 69.99, category: 'Electronics' },
      { id: 14, name: 'Antique Brass Telescope', description: 'Decorative telescope with wooden stand, great for home decor.', price: 129.99, category: 'Home & Garden' },
      { id: 15, name: 'Vintage Comic Book Collection', description: 'Set of 20 rare comic books from the 60s and 70s.', price: 299.99, category: 'Books & Media' },
      { id: 16, name: 'Pre-owned Designer Handbag', description: 'Authentic designer handbag, gently used, comes with dust bag.', price: 499.99, category: 'Clothing' },
    ];
  
    let cart = [];
  
    // Generate category menu
    const categoryGrid = categoriesMenu.querySelector('.grid');
    const sellFormCategory = document.getElementById('item-category');
    categories.forEach(category => {
      const categoryItem = document.createElement('a');
      categoryItem.href = '#';
      categoryItem.className = 'hover:text-accent';
      categoryItem.textContent = category;
      categoryItem.addEventListener('click', (e) => {
        e.preventDefault();
        filterProducts(category);
        categoriesMenu.classList.add('hidden');
      });
      categoryGrid.appendChild(categoryItem);
  
      // Add category to sell form
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      sellFormCategory.appendChild(option);
    });
  
    // Toggle categories menu
    categoriesDropdown.addEventListener('click', (e) => {
      e.preventDefault();
      categoriesMenu.classList.toggle('hidden');
    });
  
    // Generate product cards
    function renderProducts(productsToRender) {
      productGrid.innerHTML = '';
      productsToRender.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-muted rounded-lg shadow-md overflow-hidden product-card';
        productCard.innerHTML = `
          <img src="/placeholder.svg?height=200&width=300" alt="${product.name}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="font-semibold mb-2">${product.name}</h3>
            <p class="text-muted-foreground mb-2">${product.description}</p>
            <p class="text-sm text-muted-foreground mb-4">Category: ${product.category}</p>
            <div class="flex justify-between items-center">
              <span class="font-bold">$${product.price.toFixed(2)}</span>
              <button class="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm hover:bg-secondary/90" data-id="${product.id}">Add to Cart</button>
            </div>
          </div>
        `;
        productGrid.appendChild(productCard);
      });
    }
  
    renderProducts(products);
  
    // Filter products by category
    function filterProducts(category) {
      const filteredProducts = category === 'All' 
        ? products 
        : products.filter(product => product.category === category);
      renderProducts(filteredProducts);
    }
  
    // Search products
    function searchProducts(query) {
      const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      renderProducts(searchResults);
    }
  
    searchButton.addEventListener('click', () => {
      searchProducts(searchInput.value);
    });
  
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        searchProducts(searchInput.value);
      }
    });
  
    // Add to cart functionality
    productGrid.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        if (product) {
          addToCart(product);
          updateCartCount();
        }
      }
    });
  
    function addToCart(product) {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
    }
  
    function updateCartCount() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  
    function renderCart() {
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="flex justify-between">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
      });
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }
  
    // Toggle cart modal
    cartButton.addEventListener('click', () => {
      renderCart();
      cartModal.classList.remove('hidden');
    });
  
    closeCart.addEventListener('click', () => {
      cartModal.classList.add('hidden');
    });
  
    // Checkout functionality
    checkoutButton.addEventListener('click', () => {
      alert('Thank you for your purchase! This is where you would implement the checkout process.');
      cart = [];
      updateCartCount();
      cartModal.classList.add('hidden');
    });
  
    // Start shopping button
    startShopping.addEventListener('click', () => {
      window.scrollTo({
        top: productGrid.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  
    // Deals button
    dealsButton.addEventListener('click', (e) => {
      e.preventDefault();
      const dealsProducts = products.filter(product => product.price < 100);
      renderProducts(dealsProducts);
    });
  
    // Sell button
    sellButton.addEventListener('click', (e) => {
      e.preventDefault();
      sellModal.classList.remove('hidden');
    });
  
    closeSellModal.addEventListener('click', () => {
      sellModal.classList.add('hidden');
    });
  
    // Sell form submission
    sellForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newItem = {
        id: products.length + 1,
        name: document.getElementById('item-name').value,
        description: document.getElementById('item-description').value,
        price: parseFloat(document.getElementById('item-price').value),
        category: document.getElementById('item-category').value
      };
      products.push(newItem);
      renderProducts(products);
      sellModal.classList.add('hidden');
      sellForm.reset();
      alert('Your item has been listed successfully!');
    });
  });
