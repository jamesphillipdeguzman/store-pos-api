import { BACKEND_ORIGIN, updateAuthUI } from "./auth.js";
import { clearForm } from "./utils.js";
window.addEventListener("DOMContentLoaded", () => {
  let productForm;
  let saleForm;
  let productData;
  let saleData;

  let authState = {
    isAuthenticated: false,
    userName: null,
  };

  function generateSKU(category) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
    const catCode = category.slice(0, 3).toUpperCase();
    return `${catCode}-${year}${month}-${randomPart}`;
  }

  const categoryInput = document.getElementById("category");
  const skuInput = document.getElementById("sku");

  categoryInput.addEventListener("change", () => {
    const selectedCategory = categoryInput.value;
    if (selectedCategory) {
      const generatedSKU = generateSKU(selectedCategory);
      skuInput.value = generatedSKU;
    } else {
      skuInput.value = "";
    }
  });

  productForm = document.getElementById("productForm");
  saleForm = document.getElementById("saleForm");

  // Restore customer name and ID in the dropdown (after page reload)
  const saleCustomerSelect = document.getElementById("saleCustomer");
  const savedCustomerId = localStorage.getItem("customerId");
  const savedCustomerName = localStorage.getItem("customerName");

  if (saleCustomerSelect && savedCustomerId && savedCustomerName) {
    let exists = [...saleCustomerSelect.options].some(
      (opt) => opt.value === savedCustomerId
    );

    if (!exists) {
      const option = document.createElement("option");
      option.value = savedCustomerId;
      option.textContent = savedCustomerName;
      saleCustomerSelect.appendChild(option);
    }

    saleCustomerSelect.value = savedCustomerId;
  }

  // --- Set up totalAmount calculation when quantity changes ---
  const quantityInput = document.getElementById("quantity");
  const priceAtSaleInput = document.getElementById("priceAtSale");
  const totalAmountInput = document.getElementById("totalAmount");

  quantityInput.addEventListener("input", () => {
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceAtSaleInput.value);

    if (!isNaN(quantity) && !isNaN(price)) {
      totalAmountInput.value = (quantity * price).toFixed(2);
      //   alert("Please make sure all fields are field correctly.");
    } else {
      totalAmountInput.value = "";
    }
  });
  // -----------------------------------------------------------------------

  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // First, create a product
    const product = {
      name: document.getElementById("name").value,
      sku: document.getElementById("sku").value,
      stock: parseInt(document.getElementById("stock").value),
      description: document.getElementById("description").value,
      price: parseFloat(document.getElementById("price").value),
      category: document.getElementById("category").value,
      supplier: document.getElementById("supplier").value,
    };

    try {
      const productResponse = await fetch(`${BACKEND_ORIGIN}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(product),
      });

      productData = await productResponse.json();

      if (!productResponse.ok) {
        if (productResponse.status === 401) {
          alert("Your session has expired. Please login again.");
          authState.isAuthenticated = false;
          updateAuthUI();
          return;
        }
        alert(`Error: ${productData?.message || "Unknown error"}`);
        console.log("Raw product response:", productData);

        return;
      }

      alert("Product created successfully!");
      console.log("Product created", productData);

      saleForm.reset();
      saleForm.style.display = "flex";

      document.getElementById("productId").value =
        productData._id || productData.id;
      document.getElementById("priceAtSale").value =
        productData.price.toFixed(2);

      // Grab the customerId from local storage
      const savedCustomerId = localStorage.getItem("customerId");
      const customerIdInput = document.getElementById("customerId");

      if (customerIdInput && savedCustomerId) {
        customerIdInput.value = savedCustomerId;
      }

      // Grab the customerName from local storage
      const savedCustomerName = localStorage.getItem("customerName");
      const customerNameInput = document.getElementById("customerName");

      if (customerNameInput && savedCustomerName) {
        customerNameInput.value = savedCustomerName;
      }

      // Grab the userId from local storage
      const savedUserId = localStorage.getItem("userId");
      const userIdInput = document.getElementById("userId");

      if (userIdInput && savedUserId) {
        userIdInput.value = savedUserId;
      }

      // Select product in saleProduct dropdown
      const saleProductSelect = document.getElementById("saleProduct");

      let exists = [...saleProductSelect.options].some(
        (opt) => opt.value === productData._id
      );
      if (!exists) {
        const option = document.createElement("option");
        option.value = productData._id;
        option.textContent = productData.name;
        saleProductSelect.appendChild(option);
      }

      // Select the new product
      saleProductSelect.value = productData._id;
    } catch (error) {
      console.error("Error submitting product", error);
      alert("Error creating product. Please try again.");
    }
  });

  saleForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Second, create the sale
    const sale = {
      productId: document.getElementById("productId").value,
      customerId: document.getElementById("customerId").value,
      userId: document.getElementById("userId").value,
      priceAtSale: parseFloat(document.getElementById("priceAtSale").value),
      quantity: parseInt(document.getElementById("quantity").value),
      totalAmount: parseFloat(document.getElementById("totalAmount").value),
      cashierName: document.getElementById("cashierName").value,
      paymentMethod: document.getElementById("paymentMethod").value,
    };

    try {
      const saleResponse = await fetch(`${BACKEND_ORIGIN}/api/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(sale),
      });

      saleData = await saleResponse.json();

      if (!saleResponse.ok) {
        if (saleResponse.status === 401) {
          alert("Your session has expired. Please login again.");
          authState.isAuthenticated = false;
          updateAuthUI();
          return;
        }
        alert(`Error: ${saleData.message}`);
        console.log(`Error: ${saleData.message}`);
        return;
      }

      alert("Sale created successfully!");
      console.log("Sale created", saleData);

      // Hide sale form after transaction
      saleForm.style.display = "none";
      // Clear product form
      productForm.reset();
    } catch (error) {
      console.error("Error submitting sale", error);
      alert("Error creating sale. Please try again.");
    }
  });

  // Clear Customer Form
  const clearCustomerBtn = document.querySelector("#customerForm .clear");
  if (clearCustomerBtn) {
    clearCustomerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearForm("customerForm");
    });
  }

  // Clear Product Form
  const clearProductBtn = document.querySelector("#productForm .clear");
  if (clearProductBtn) {
    clearProductBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearForm("productForm");
    });
  }

  // Clear Sales Form
  const clearSaleBtn = document.querySelector("#saleForm .clear");
  if (clearSaleBtn) {
    clearSaleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearForm("saleForm");
    });
  }
});
