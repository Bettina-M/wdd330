import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

let cart = [];

async function fetchProducts(){
    try{
        let response = await fetch("https://fakestoreapi.com/products");

            products = await response.json();

            return products;

        }catch(error){
        console.log(error);
    }    
}

function addToCart(productId, products, cart){
    let product = products.find(p=> p.id ==productId);
    if(product){
        cart.push(product);
        //add items to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`${product} added to cart`);
    }else
    {
     console.log("Product not found");
    }
}

async function addToCart(){
    const addBtn = document.querySelector(".addBtn");
    let products = await fetchProducts();

    addBtn.addEventListener('click', ()=>{
        let productId;
        addToCart(productId,products,cart);
        displayCart();
    })
}



function displayCart(){
   let savedProducts = localStorage.getItem("cart");
    const cartProducts = document.getElementById("cart-products");

    cartProducts.innerHTML = savedProducts;
}



function removeFromCart(productId) {
    // Filter out the product with the given ID
    cart = cart.filter(product => product.id !== productId);
    
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    console.log(`Product with ID ${productId} has been removed.`);
    displayCart();
    updateCartIcon()
}

removeFromCart();

document.querySelectorAll('.removeButton').forEach(button => {
    button.addEventListener('click', event => {
        let productId = parseInt(event.target.getAttribute('data-id')); // Get the product ID from the button
        removeFromCart(productId); // Call the remove function
        updateCartIcon()
    });
});


function updateCartIcon(){
    const cartCount = cart.length;
    document.getElementById("cart-count").innerText = cartCount.length;

}


