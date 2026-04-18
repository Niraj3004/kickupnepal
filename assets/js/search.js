// ============================================================
//  KickUpNepal – Live Search
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Inject toast keyframe once
  if (!document.getElementById('kun-anim-style')) {
    const style = document.createElement('style');
    style.id = 'kun-anim-style';
    style.textContent = `
      @keyframes slideInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      #kun-search-dropdown {
        position:absolute; top:calc(100% + 6px); left:0; right:0;
        background:#fff; border-radius:12px; box-shadow:0 12px 40px rgba(0,0,0,0.14);
        z-index:9999; max-height:420px; overflow-y:auto; border:1px solid #e2e8f0;
      }
      .kun-search-item {
        display:flex; align-items:center; gap:1rem; padding:0.75rem 1rem;
        text-decoration:none; color:inherit; transition:background 0.15s;
        border-bottom:1px solid #f1f5f9;
      }
      .kun-search-item:last-child { border-bottom:none; }
      .kun-search-item:hover { background:#f8fafc; }
      .kun-search-item img { width:52px; height:52px; object-fit:contain; border-radius:8px; background:#f8f9fa; }
      .kun-search-item .s-info { flex:1; }
      .kun-search-item .s-name { font-weight:700; font-size:0.9rem; margin-bottom:2px; }
      .kun-search-item .s-brand { font-size:0.75rem; color:#64748b; }
      .kun-search-item .s-price { font-weight:800; font-size:0.9rem; color:#DC143C; white-space:nowrap; }
      .kun-search-no-result { padding:2rem; text-align:center; color:#94a3b8; font-size:0.9rem; }
      #kun-search-dropdown .view-all-link {
        display:block; text-align:center; padding:0.75rem; background:#f8fafc;
        font-weight:700; font-size:0.85rem; color:#003893; text-decoration:none;
        border-top:1px solid #e2e8f0;
      }
      #kun-search-dropdown .view-all-link:hover { background:#eef2ff; }
    `;
    document.head.appendChild(style);
  }

  // Find all search inputs
  const setupSearch = (input) => {
    if (!input) return;
    const wrapper = input.closest('.search-wrapper') || input.parentElement;
    wrapper.style.position = 'relative';

    let dropdown = null;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (dropdown) dropdown.remove();
      if (!q || q.length < 2) return;

      const results = KUN_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      ).slice(0, 6);

      dropdown = document.createElement('div');
      dropdown.id = 'kun-search-dropdown';

      if (results.length === 0) {
        dropdown.innerHTML = `<div class="kun-search-no-result">No products found for "<strong>${q}</strong>"</div>`;
      } else {
        results.forEach(p => {
          // Determine correct relative path to shop.html
          const isRoot = !window.location.pathname.includes('/pages/');
          const shopPath = isRoot ? 'pages/shop.html' : 'shop.html';
          const item = document.createElement('a');
          item.href = `${shopPath}?search=${encodeURIComponent(p.name)}&id=${p.id}`;
          item.className = 'kun-search-item';
          item.innerHTML = `
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <div class="s-info">
              <div class="s-name">${p.name}</div>
              <div class="s-brand">${p.brand}</div>
            </div>
            <div class="s-price">Rs. ${p.price.toLocaleString()}</div>
          `;
          dropdown.appendChild(item);
        });
        const isRoot = !window.location.pathname.includes('/pages/');
        const shopPath = isRoot ? 'pages/shop.html' : 'shop.html';
        const viewAll = document.createElement('a');
        viewAll.href = `${shopPath}?search=${encodeURIComponent(q)}`;
        viewAll.className = 'view-all-link';
        viewAll.textContent = `View all results for "${q}" →`;
        dropdown.appendChild(viewAll);
      }

      wrapper.appendChild(dropdown);
    });

    // Handle Enter key
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        const isRoot = !window.location.pathname.includes('/pages/');
        const shopPath = isRoot ? 'pages/shop.html' : 'shop.html';
        window.location.href = `${shopPath}?search=${encodeURIComponent(input.value.trim())}`;
      }
      if (e.key === 'Escape') {
        if (dropdown) { dropdown.remove(); dropdown = null; }
        input.blur();
      }
    });

    // Click on search button
    const searchBtn = wrapper.querySelector('.search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        if (input.value.trim()) {
          const isRoot = !window.location.pathname.includes('/pages/');
          const shopPath = isRoot ? 'pages/shop.html' : 'shop.html';
          window.location.href = `${shopPath}?search=${encodeURIComponent(input.value.trim())}`;
        }
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', e => {
      if (dropdown && !wrapper.contains(e.target)) {
        dropdown.remove();
        dropdown = null;
      }
    });
  };

  // Run after components load (header is injected via fetch)
  const trySetupSearch = () => {
    document.querySelectorAll('.search-input').forEach(setupSearch);
  };

  // Try immediately
  trySetupSearch();

  // Also try after a short delay (for dynamically loaded header)
  setTimeout(trySetupSearch, 600);

  // ─────────────────────────────────────────
  //  Shop page: read URL params and filter
  // ─────────────────────────────────────────
  const isShopPage = window.location.pathname.includes('shop.html');
  if (isShopPage) {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      // Update the search input placeholder
      setTimeout(() => {
        const inputs = document.querySelectorAll('.search-input');
        inputs.forEach(i => { i.value = searchQuery; });
        // Filter the shop page using the query
        filterShopBySearch(searchQuery);
        // Show banner
        const banner = document.createElement('div');
        banner.style.cssText = 'background:#eef2ff;border-radius:10px;padding:0.75rem 1.25rem;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:0.9rem;color:#3730a3;';
        banner.innerHTML = `<span>🔍 Showing results for: <strong>"${searchQuery}"</strong></span> <a href="shop.html" style="color:#DC143C;font-size:0.85rem;">Clear Search ×</a>`;
        const grid = document.getElementById('shop-product-grid') || document.querySelector('.shop-grid, .grid');
        if (grid && grid.parentElement) grid.parentElement.insertBefore(banner, grid);
      }, 400);
    }
  }

  function filterShopBySearch(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  }
});
