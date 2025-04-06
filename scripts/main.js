import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

//function to fetch data from API and show product cateogories//

async function getData(){
    try{
        let response = await fetch("https://fakestoreapi.com/products?limit=5");

            let categories = await response.json();

            showCategories(categories)

        }catch(error){
        console.log(error);
    }

    
}

function showCategories(categories){
   const container = document.getElementById("categories-container");

   container.innerHTML = ""; 

    categories.forEach(category => {
       
            let card = document.createElement("div");
            card.innerHTML = `
            <img src="${category.image}" alt="${category.title}" width="200px"><br>
            
            <a href="shop.html?category=${encodeURIComponent(category.category)}">
            <button>${category.category}</button>
            </a>`

            container.appendChild(card);
        
    
    });
}

getData();
