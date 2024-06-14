const inputs = document.querySelectorAll("input"),
  button = document.querySelector("button");

inputs.forEach((input, index) => {
  input.addEventListener("keyup", (event) => {
    const currentInput = input;
    const nextInput = input.nextElementSibling;
    const prevInput = input.previousElementSibling;

    // Limit input to single digit
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    // Enable next input on valid input
    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    // Handle backspace
    if (event.key === "Backspace") {
      if (prevInput) {
        currentInput.value = "";
        currentInput.setAttribute("disabled", true);
        prevInput.focus();
      }
    }

    // Update button state
    button.classList.toggle("active", inputs[3].value !== "" && !inputs[3].disabled);
  });
});

// Focus on first input on load
window.addEventListener("load", () => inputs[0].focus());
