import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();


function orderSummary(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-summary");

    
    let totalItems = cart.length;
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.quantity * item.price;
        container.innerHTML = `<p>Total items: ${totalItems}</p>
        Sub Total: ${totalPrice}
        `;
    });

    
}

orderSummary();

let form = document.querySelector(".form-box");
form.addEventListener("submit", function (event){
    event.preventDefault();

    const formData = new FormData(form); //collects all inputs//
    const fullname = formData.get ("full-name");
    const street = formData.get("street");
    const city = formData.get("city");
    const state = formData.get("state");
    const code = formData.get("zip");

    const userDetails = {
        fullname,
        address: `${street}, ${city} ${state} ${code}`,
    };

    localStorage.setItem("UserDetails", JSON.stringify(userDetails));
    window.location.href= "thankyou.html"
    
    fetch("https://formspree.io/f/abc123",{
        method: "POST",
        body: new FormData(form),
    })

    .then(response =>{
        if (response.ok){
            alert("Details Saved!");
            
        } else{
            alert("Submision failed, try again!")
        }
    })
    .catch((error) =>{
        console.error("Fetch error:", error);
        alert("Form Submission Failed")
    });
        
});
