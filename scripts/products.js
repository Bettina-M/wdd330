import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

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
            
            <h4>$${product.price}
            
            <a href="cart.html">
            </h4 class="addbtn" data-id="${product.id}"> <button>Add to Cart</button>
            </a>`
            
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


document.addEventListener("DOMContentLoaded", loadCategory);


