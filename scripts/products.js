
import { loadHeaderFooter } from "./utils.mjs";
//import { updateCartIcon } from "./cart.js"; //


//function to get category from the url
function getCategoryUrl(){
    const params = new URLSearchParams(window.location.search);
    
    return params.get("category");
}
//display category products depending on what category the user clicks
async function loadCategory(){
    const selectCategory = getCategoryUrl();

    let products = [];

    try{
        let response = await fetch("https://fakestoreapi.com/products");

            products = await response.json();

            console.log("Products data:", products);

        }catch(error){
        console.log(error);
    }

    if (selectCategory){
     products = products.filter(product=> product.category == selectCategory);
    }
    showProducts(products);
    
}
//by default all products are shown
function showProducts(products){
   const container = document.getElementById("product-container");
   
   container.innerHTML = ""; 
    
   products.forEach(product => {
       
        let card = document.createElement("div");
            card.innerHTML = `
            <img loading="lazy" src="${product.image}" alt="${product.title}" width="250px">
            
            <h3>${product.title}</h3>
            
            <h4>$${product.price}</h4>
            
            <button class="addbtn" data-id="${product.id}"> Add to Cart</button>`;
            
            container.appendChild(card);         
    });

    const addButtons = document.querySelectorAll(".addbtn");
    addButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = parseInt(event.target.getAttribute("data-id"));
            addToCart(productId);
        });
    });

}




async function addToCart(productId){
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();

    let cart = JSON.parse(localStorage.getItem("cart")) || []; //fetch cart items from local storage
    const foundItem = cart.find(item => item.id === product.id); //if similar item is selected thats already in cart, update quantity

    if (foundItem){
        foundItem.quantity +=1;
    }else{
    product.quantity = 1; 
    cart.push(product);
    }

    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Added to cart!");

}

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter().then(() => {
        //updateCartIcon(); // Ensure cart count updates
    });
    loadCategory(); // Load and display category products
});


