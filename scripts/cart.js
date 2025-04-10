import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter().then(() => {
    updateCartIcon(); // Ensures the cart icon is updated after the header is loaded
});


function displayCart(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-products");

    if (cart.length == 0){
        container.innerHTML = `<p>Your cart is empty &#128530<p>`;
        return;
    }

    let total = 0;
    container.innerHTML = "";
    cart.forEach(product => {
        total += Number(product.price) * Number(product.quantity);
        
        container.innerHTML += `
        <div>
            <img src="${product.image}" width="50" />
            <h4>${product.title}</h4>
            <p>Qty: ${product.quantity}</p>
            <p>Total: $${(product.price * product.quantity)}</p>
            <button class="remove-btn" data-id = "${product.id}">Remove</button>
      </div>
    `;
    });
    
    document.getElementById("cart-total").innerHTML = `Sum Total: $${total.toFixed(2)}`;

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = parseInt(this.getAttribute("data-id"));
            removeItemFromCart(productId);
        });
    });
    updateCartIcon();
}

function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const foundItem = cart.find(item => item.id === productId);

    if (foundItem) {
        if (foundItem.quantity > 1) {
            foundItem.quantity -= 1; // Reduce the quantity by 1
        } else {
            // If quantity is 1, remove the item entirely
            cart = cart.filter(item => item.id !== productId);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartIcon();// Update the cart in localStorage
    displayCart(); // Re-render the cart

}

export function updateCartIcon(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    document.getElementById("cart-count").innerHTML = cartCount;
}

displayCart();