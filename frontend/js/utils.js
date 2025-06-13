// utils.js

// Utility function to clear all inputs in a form
export function clearForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.reset(); // Resets input values to default

  // If any custom fields like readonly inputs or textareas need to be manually cleared
  const inputs = form.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    if (input.type !== "hidden") {
      input.value = "";
    }
  });
}
