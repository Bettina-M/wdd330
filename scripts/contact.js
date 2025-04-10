import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const orderId = form["order-id"].value.trim();
    const message = form.message.value.trim();
  
    // Simulate saving or sending
    const complaint = {
      name,
      email,
      orderId,
      message,
      date: new Date().toLocaleString()
    };
  
    console.log("Complaint submitted:", complaint);
  
    // localStorage.setItem("lastComplaint", JSON.stringify(complaint));
  
    document.getElementById("response-message").textContent =
      "Thank you! Your message has been received. We'll get back to you shortly.";
  
    // Reset form
    form.reset();
  });