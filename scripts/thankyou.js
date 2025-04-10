import { loadHeaderFooter } from "./utils.mjs";
 loadHeaderFooter();

window.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("UserDetails"));
  
    if (data) {
      document.getElementById("form-details").innerHTML = `
        <h3>Thank you, ${data.fullname}!</h3>
        <p>Your order will be shipped to:</p>
        <p>${data.address}</p>
      `;
    } else {
      document.getElementById("form-details").innerHTML = "<p>No details found.</p>";
    }
  });

  