// ===========================
// LumiSky™ — Boutique Française
// JavaScript interactif
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // --- Sélecteur de variante ---
  const variantCards = document.querySelectorAll('.variant-card');
  const priceDisplay  = document.getElementById('price-display');
  const ctaBtn        = document.getElementById('cta-btn');

  const variants = {
    starter: { price: '27,95 $', label: 'Starter — 1 disque HD' },
    premium: { price: '64,95 $', label: 'Premium — 10 disques HD' }
  };

  let currentVariant = 'premium';

  variantCards.forEach(card => {
    card.addEventListener('click', () => {
      variantCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      currentVariant = card.dataset.variant;
      if (priceDisplay) priceDisplay.textContent = variants[currentVariant].price;
    });
  });

  // --- Panier ---
  const cart = { items: [], total: 0 };

  const overlay   = document.getElementById('cart-overlay');
  const panel     = document.getElementById('cart-panel');
  const closeBtn  = document.getElementById('cart-close');
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total-price');

  function openCart() {
    overlay.classList.add('open');
    panel.classList.add('open');
  }

  function closeCart() {
    overlay.classList.remove('open');
    panel.classList.remove('open');
  }

  if (overlay) overlay.addEventListener('click', closeCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);

  function addToCart() {
    const v = variants[currentVariant];
    const existing = cart.items.find(i => i.variant === currentVariant);
    if (existing) {
      existing.qty++;
    } else {
      cart.items.push({ variant: currentVariant, label: v.label, price: v.price, qty: 1 });
    }
    updateCartUI();
    openCart();

    // Animation bouton
    if (ctaBtn) {
      ctaBtn.textContent = '✓ Ajouté !';
      ctaBtn.style.background = '#2ecc71';
      setTimeout(() => {
        ctaBtn.textContent = `Ajouter au panier — ${v.price}`;
        ctaBtn.style.background = '';
      }, 1500);
    }
  }

  function updateCartUI() {
    const count = cart.items.reduce((s, i) => s + i.qty, 0);
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    if (cartItems) {
      if (cart.items.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
      } else {
        cartItems.innerHTML = cart.items.map(item => `
          <div class="cart-item">
            <div style="width:50px;height:50px;border-radius:8px;background:#12122a;display:flex;align-items:center;justify-content:center;font-size:22px;">⭐</div>
            <div class="cart-item-info">
              <div class="cart-item-name">${item.label}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:4px;">Qté : ${item.qty}</div>
              <div class="cart-item-price">${item.price}</div>
            </div>
          </div>
        `).join('');
      }
    }

    // Calcul total (simplifié)
    const prices = { starter: 27.95, premium: 64.95 };
    const total = cart.items.reduce((s, i) => s + (prices[i.variant] * i.qty), 0);
    if (cartTotal) cartTotal.textContent = total.toFixed(2).replace('.', ',') + ' $';
  }

  // Boutons "Ajouter au panier"
  if (ctaBtn) ctaBtn.addEventListener('click', addToCart);

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', addToCart);
  });

  // Bouton nav panier
  const navCartBtn = document.getElementById('nav-cart-btn');
  if (navCartBtn) navCartBtn.addEventListener('click', openCart);

  // Initialisation panier
  updateCartUI();

  // --- FAQ Accordéon ---
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Fermer tous les autres
      document.querySelectorAll('.faq-q.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });

      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // --- Animation d'apparition au scroll ---
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .scene-item, .review-card, .perfect-card, .stat-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // --- Bouton retour en haut ---
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.style.opacity = window.scrollY > 400 ? '1' : '0';
      backTop.style.pointerEvents = window.scrollY > 400 ? 'all' : 'none';
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});
