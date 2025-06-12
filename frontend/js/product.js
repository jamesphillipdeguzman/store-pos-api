document.addEventListener("DOMContentLoaded", async () => {
  const productSelect = document.getElementById("saleProduct");

  try {
    const response = await fetch(
      "https://store-pos-api.onrender.com/api/products"
    );
    const products = await response.json();

    // Add default option first
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--Select product--";
    productSelect.appendChild(defaultOption);

    // Then append each product
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product._id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  } catch (error) {
    console.log("Failed to load products: ", error);
  }
});
