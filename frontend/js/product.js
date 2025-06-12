document.addEventListener("DOMContentLoaded", async () => {
  const productSelect = document.getElementById("saleProduct");

  try {
    const response = await fetch(
      "https://store-pos-api.onrender.com/api/products"
    );
    const products = response.json();

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
