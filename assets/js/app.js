/* -------------------------------------
   Mobile Menu Toggle
-------------------------------------- */
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const desktopMenu = document.querySelector('.desktop-menu');

mobileToggle.addEventListener('click', () => {
  desktopMenu.classList.toggle('show-menu');
  mobileToggle.classList.toggle('open');
});

/* -------------------------------------
   Fade-Up Animation Helper
-------------------------------------- */
function fadeUpAnimation(element, delay = 0) {
  element.style.opacity = 0;
  element.style.transform = 'translateY(20px)';
  setTimeout(() => {
    element.style.transition = 'all 0.6s ease';
    element.style.opacity = 1;
    element.style.transform = 'translateY(0)';
  }, delay);
}

// Apply fade-up animation on all sections
document.querySelectorAll('.section, .hero-content, .form-container').forEach((el, i) => {
  fadeUpAnimation(el, i * 200);
});

/* -------------------------------------
   Get Appraisal Function
   Uses 0.2 (20%) tax on the entered price
-------------------------------------- */
function getAppraisal() {
  const priceValue = document.getElementById('price')?.value;
  const resultEl = document.getElementById('appraisalResult');

  if (!priceValue) {
    alert("Please enter a price to get an estimate!");
    return;
  }

  const price = parseFloat(priceValue);
  if (isNaN(price)) {
    alert("Price must be a valid number.");
    return;
  }

  const taxRate = 0.2; // 20% tax
  const estimate = (price + price * taxRate).toFixed(2);

  resultEl.innerText = '';
  const text = `Estimated Appraisal: $${estimate}`;
  let index = 0;
  const typeInterval = setInterval(() => {
    resultEl.innerText += text[index];
    index++;
    if (index === text.length) clearInterval(typeInterval);
  }, 40);
}

/* -------------------------------------
   Like & Wishlist Buttons
-------------------------------------- */
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.dataset.count = 0;
  btn.addEventListener('click', () => {
    let count = parseInt(btn.dataset.count);
    count++;
    btn.dataset.count = count;
    btn.innerText = `♥ Like (${count})`;
    btn.classList.add('btn-clicked');
    setTimeout(() => btn.classList.remove('btn-clicked'), 300);
  });
});

// Vault like & view buttons (static demo)
let vaultLikesTotal = 0;
const likesReceivedEl = document.getElementById('likesReceivedCount');

document.querySelectorAll('.vault-like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('svUserLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = 'user.html';
      return;
    }
    btn.classList.add('btn-clicked');
    setTimeout(() => btn.classList.remove('btn-clicked'), 300);

    // Increment total likes received (per page session)
    vaultLikesTotal += 1;
    if (likesReceivedEl) {
      likesReceivedEl.textContent = vaultLikesTotal.toString();
    }

    const currentVaultLikes = parseInt(localStorage.getItem('svStatsVaultLikes') || '0', 10);
    localStorage.setItem('svStatsVaultLikes', String(currentVaultLikes + 1));

    wishlistToast.textContent = 'You liked this pair';
    showWishlistToast();
  });
});

// Vault view modal setup
const vaultViewModal = document.createElement('div');
vaultViewModal.className = 'vault-view-modal';
vaultViewModal.innerHTML = `
  <div class="vault-view-modal-backdrop"></div>
  <div class="vault-view-modal-card">
    <h3 class="vault-view-title"></h3>
    <p class="vault-view-comment"></p>
  </div>
`;
document.body.appendChild(vaultViewModal);

const vaultViewTitleEl = vaultViewModal.querySelector('.vault-view-title');
const vaultViewCommentEl = vaultViewModal.querySelector('.vault-view-comment');
const vaultViewBackdrop = vaultViewModal.querySelector('.vault-view-modal-backdrop');

function openVaultViewModal(titleText) {
  vaultViewTitleEl.textContent = titleText;
  vaultViewCommentEl.textContent = `${titleText} pairs soft gradients with clean lines for a modern, collectible look. Perfect for a pastel-driven vault like SneakerVault.`;
  vaultViewModal.classList.add('show');
}

function closeVaultViewModal() {
  vaultViewModal.classList.remove('show');
}

vaultViewBackdrop.addEventListener('click', closeVaultViewModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVaultViewModal();
  }
});

document.querySelectorAll('.vault-view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('svUserLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = 'user.html';
      return;
    }
    btn.classList.add('btn-clicked');
    setTimeout(() => btn.classList.remove('btn-clicked'), 300);

    const card = btn.closest('.vault-card');
    const title = card?.querySelector('.vault-card-title')?.textContent?.trim() || 'Sneaker detail';
    openVaultViewModal(title);
  });
});

// Offer buttons (Buy page)
document.querySelectorAll('.offer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('svUserLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = 'user.html';
      return;
    }
    btn.classList.add('btn-clicked');
    setTimeout(() => btn.classList.remove('btn-clicked'), 300);
    const currentOffers = parseInt(localStorage.getItem('svStatsOffersSent') || '0', 10);
    localStorage.setItem('svStatsOffersSent', String(currentOffers + 1));
    wishlistToast.textContent = 'Offer sent';
    showWishlistToast();
  });
});

// Wishlist toast setup
const wishlistToast = document.createElement('div');
wishlistToast.id = 'wishlistToast';
wishlistToast.className = 'wishlist-toast';
wishlistToast.textContent = 'Added on wishlist';
document.body.appendChild(wishlistToast);

function showWishlistToast() {
  wishlistToast.classList.add('show');
  setTimeout(() => {
    wishlistToast.classList.remove('show');
  }, 1400);
}

document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('svUserLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = 'user.html';
      return;
    }
    btn.classList.add('btn-clicked');
    setTimeout(() => btn.classList.remove('btn-clicked'), 300);
    const currentWishlist = parseInt(localStorage.getItem('svStatsWishlistAdds') || '0', 10);
    localStorage.setItem('svStatsWishlistAdds', String(currentWishlist + 1));
    wishlistToast.textContent = 'Added on wishlist';
    showWishlistToast();
  });
});

// Sell form Submit Listing (static showcase)
const sellForm = document.getElementById('sellForm');
if (sellForm) {
  sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem('svUserLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = 'user.html';
      return;
    }
    const submitBtn = sellForm.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.classList.add('btn-clicked');
      setTimeout(() => submitBtn.classList.remove('btn-clicked'), 300);
    }
    const currentListings = parseInt(localStorage.getItem('svStatsListingsSubmitted') || '0', 10);
    localStorage.setItem('svStatsListingsSubmitted', String(currentListings + 1));
    wishlistToast.textContent = 'Listing submitted';
    showWishlistToast();
    // Simulate refreshing the list: clear form and appraisal text
    sellForm.reset();
    const resultEl = document.getElementById('appraisalResult');
    if (resultEl) {
      resultEl.innerText = '';
    }
  });
}

/* -------------------------------------
   Product Image Modal
-------------------------------------- */
const modal = document.createElement('div');
modal.id = 'imgModal';
modal.style.cssText = `
  position: fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center;
  opacity:0; visibility:hidden; transition: 0.3s ease;
  z-index:9999;
`;
const modalImg = document.createElement('img');
modalImg.style.cssText = 'max-width:90%; max-height:80%; border-radius:8px; box-shadow:0 8px 20px rgba(0,0,0,0.5)';
modal.appendChild(modalImg);
document.body.appendChild(modal);

document.querySelectorAll('.product-card img, .gallery-card img, .blog-card img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
  });
});

modal.addEventListener('click', () => {
  modal.style.opacity = '0';
  setTimeout(() => modal.style.visibility = 'hidden', 300);
});

/* -------------------------------------
   Home Quick Filters (search demo)
-------------------------------------- */
const quickSearchSection = document.querySelector('.quick-search');
if (quickSearchSection) {
  const quickInput = quickSearchSection.querySelector('input[type="text"]');
  const quickButton = quickSearchSection.querySelector('button');

  const messageEl = document.createElement('p');
  messageEl.className = 'quick-search-message';
  quickSearchSection.appendChild(messageEl);

  const featuredNames = [
    'Air Max Sky Pastel',
    'Jordan 1 Soft Bloom',
    'Dunk Low Cloud Shift',
    'Air Force 1 Neon'
  ];

  if (quickButton && quickInput) {
    quickButton.addEventListener('click', () => {
      const term = quickInput.value.trim();
      if (!term) {
        messageEl.textContent = 'Please type a word to search.';
        return;
      }

      const lowerTerm = term.toLowerCase();
      const hasMatch = featuredNames.some(name =>
        name.toLowerCase().includes(lowerTerm)
      );

      if (!hasMatch) {
        messageEl.textContent = `No results for "${term}". Try searching another sneaker name.`;
      } else {
        messageEl.textContent = `Showing matches for "${term}" (demo only).`;
      }
    });
  }
}

/* -------------------------------------
   Product Filters Demo (Buy Page)
-------------------------------------- */
const buyFiltersSection = document.querySelector('.filters-section');
if (buyFiltersSection) {
  const buyFilterBtn = buyFiltersSection.querySelector('button');
  if (buyFilterBtn) {
    buyFilterBtn.addEventListener('click', () => {
      alert('Filters applied! (demo placeholder)');
    });
  }
}

/* -------------------------------------
   Button Hover Animation
-------------------------------------- */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.transform = 'scale(1.05)';
    btn.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = 'none';
  });
});

/* -------------------------------------
   Profile Login & Create Account
   Using Form ID: Fjq31lwWw
-------------------------------------- */
const loginForm = document.getElementById('Fjq31lwWw-login');
const createForm = document.getElementById('Fjq31lwWw-create');

loginForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const firstName = document.getElementById('loginFirstName').value.trim();
  if(firstName) {
    alert(`Hi, ${firstName}! Form ID: Fjq31lwWw`);
    loginForm.reset();
  } else {
    alert('Please enter your first name.');
  }
});

createForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const firstName = document.getElementById('createFirstName').value.trim();
  if(firstName) {
    alert(`Hi, ${firstName}! Form ID: Fjq31lwWw`);
    createForm.reset();
  } else {
    alert('Please enter your first name.');
  }
});

/* -------------------------------------
   Global Button Click Feedback
-------------------------------------- */
document.querySelectorAll('button, a.btn').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.add('btn-clicked');
    setTimeout(() => {
      el.classList.remove('btn-clicked');
    }, 180);
  });
});

/* -------------------------------------
   Comment Button Interaction (Vault)
-------------------------------------- */
document.querySelectorAll('.comment-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const comment = prompt('Please type your comment:');
    if (comment && comment.trim().length > 0) {
      alert('Thank you for commenting');
    } else {
      alert('Comment cannot be empty.');
    }
  });
});
