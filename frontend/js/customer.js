import { BACKEND_ORIGIN } from "./auth.js";

window.addEventListener("DOMContentLoaded", () => {
  const customerForm = document.getElementById("customerForm");

  customerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const customer = {
      name: document.getElementById("customerName").value,
      email: document.getElementById("customerEmail").value,
      phone: document.getElementById("customerPhone").value,
      address: document.getElementById("customerAddress").value,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BACKEND_ORIGIN}/api/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(customer),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Customer creation failed: ${data.message}`);
        return;
      }

      alert("Customer created successfully!");
      console.log("Customer created", data);

      // Prefill customerId in sale form
      const customerSelect = document.getElementById("saleCustomer");
      const option = document.createElement("option");
      option.value = data._id;
      option.textContent = data.name;
      customerSelect.appendChild(option);
      customerSelect.value = data._id;

      // Show product form
      document.getElementById("productForm").style.display = "flex";

      // Optionally reset customer form
      customerForm.reset();
    } catch (err) {
      console.error("Error submitting customer:", err);
      alert("Error creating customer.");
    }
  });
});
