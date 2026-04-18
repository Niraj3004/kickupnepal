// ============================================================
//  KickUpNepal – Cart Manager (localStorage based)
// ============================================================

const KUNCart = {
  get() {
    return JSON.parse(localStorage.getItem('kun_cart') || '[]');
  },
  save(cart) {
    localStorage.setItem('kun_cart', JSON.stringify(cart));
    KUNCart.updateBadge();
  },
  add(productId, size) {
    const cart = KUNCart.get();
    const product = KUN_PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const key = `${productId}-${size}`;
    const existing = cart.find(item => item.key === key);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ key, id: productId, size, qty: 1, name: product.name, price: product.price, brand: product.brand, image: product.image });
    }
    KUNCart.save(cart);
    KUNCart.showToast(`${product.name} added to cart!`);
  },
  remove(key) {
    let cart = KUNCart.get().filter(item => item.key !== key);
    KUNCart.save(cart);
  },
  updateQty(key, delta) {
    let cart = KUNCart.get();
    const item = cart.find(i => i.key === key);
    if (item) {
      item.qty = Math.max(1, item.qty + delta);
      KUNCart.save(cart);
    }
  },
  count() {
    return KUNCart.get().reduce((sum, item) => sum + item.qty, 0);
  },
  total() {
    return KUNCart.get().reduce((sum, item) => sum + item.price * item.qty, 0);
  },
  updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent = KUNCart.count();
      b.style.display = KUNCart.count() > 0 ? 'flex' : 'none';
    });
  },
  showToast(msg) {
    // Remove old toast
    const old = document.getElementById('kun-toast');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.id = 'kun-toast';
    toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.2rem;vertical-align:middle;">check_circle</span> ${msg}`;
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; z-index:99999;
      background:#003893; color:#fff; padding:1rem 1.5rem; border-radius:12px;
      font-weight:700; font-size:0.95rem; display:flex; align-items:center; gap:0.5rem;
      box-shadow:0 8px 32px rgba(0,0,0,0.18); animation:slideInUp 0.4s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3000);
  }
};

// Run on load
document.addEventListener('DOMContentLoaded', () => {
  KUNCart.updateBadge();

  // Attach event to any "Add to Cart" button with data-product-id
  document.addEventListener('click', e => {
    const addBtn = e.target.closest('[data-add-cart]');
    if (addBtn) {
      const id = parseInt(addBtn.getAttribute('data-add-cart'));
      const size = addBtn.getAttribute('data-size') || 'One Size';
      KUNCart.add(id, size);
    }
  });
});
