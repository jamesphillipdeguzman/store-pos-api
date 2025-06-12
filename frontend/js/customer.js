document.addEventListener("DOMContentLoaded", async () => {
  const customerSelect = document.getElementById("saleCustomer");

  try {
    const response = await fetch(
      "https://store-pos-api.onrender.com/api/customers"
    );
    const customers = response.json();

    customers.forEach((customer) => {
      const option = document.createElement("option");
      option.value = customer._id;
      option.textContent =
        `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
        "unknown customer";
      customerSelect.appendChild(option);
    });
  } catch (error) {
    console.log("Failed to load customers: ", error);
  }
});
