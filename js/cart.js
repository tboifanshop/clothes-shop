const Cart = (() => {
  const CART_KEY = "clothes_shop_cart";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function addItem(product, quantity = 1) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        stripePriceId: product.stripePriceId,
        quantity
      });
    }
    saveCart(cart);
    return cart;
  }

  function removeItem(productId) {
    const cart = getCart().filter((item) => item.id !== productId);
    saveCart(cart);
    return cart;
  }

  function updateQuantity(productId, quantity) {
    const cart = getCart();
    if (quantity <= 0) {
      return removeItem(productId);
    }
    const item = cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      saveCart(cart);
    }
    return cart;
  }

  function getTotal() {
    return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function getItemCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
  }

  function clear() {
    localStorage.removeItem(CART_KEY);
  }

  function toLineItems() {
    return getCart().map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity
    }));
  }

  return {
    getCart,
    addItem,
    removeItem,
    updateQuantity,
    getTotal,
    getItemCount,
    clear,
    toLineItems
  };
})();
