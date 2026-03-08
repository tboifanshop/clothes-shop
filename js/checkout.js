// Replace with your Stripe publishable key (starts with pk_test_ or pk_live_)
const STRIPE_PUBLISHABLE_KEY = "pk_test_YOUR_PUBLISHABLE_KEY_HERE";

// Base URL for success/cancel redirects (works for both root and sub-path deployments)
const SITE_URL = window.location.origin;

const Checkout = (() => {
  let stripe = null;

  function init() {
    if (typeof Stripe === "undefined") {
      console.error("Stripe.js failed to load.");
      return;
    }
    stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
  }

  async function redirectToCheckout() {
    if (!stripe) {
      init();
    }

    const lineItems = Cart.toLineItems();

    if (lineItems.length === 0) {
      if (typeof showToast === "function") {
        showToast("Your cart is empty. Please add items before checking out.");
      }
      return;
    }

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = "Redirecting…";
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems,
      mode: "payment",
      successUrl: SITE_URL + "/success.html",
      cancelUrl: SITE_URL + "/cancel.html"
    });

    if (error) {
      console.error("Stripe Checkout error:", error);
      if (typeof showToast === "function") {
        showToast("Payment failed to start: " + error.message);
      }
      if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = "Checkout";
      }
    }
  }

  return { init, redirectToCheckout };
})();
