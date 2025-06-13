document.addEventListener("DOMContentLoaded", async () => {
  const productSelect = document.getElementById("saleProduct");

  try {
    const response = await fetch(
      "https://store-pos-api.onrender.com/api/products"
    );
    const results = await response.json();
    console.log("Fetched products: ", results); // check structure

    const products = results.products || results.data || results;

    if (Array.isArray(products)) {
      // Add default option first
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "--Select product--";
      productSelect.appendChild(defaultOption);

      // Then append each product
      products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product._id; // from product POST response
        option.textContent = product.name;
        productSelect.appendChild(option);
      });
    } else {
      console.warn("Expected an array but got: ", products);
    }
  } catch (error) {
    console.log("Failed to load products: ", error);
  }
});
