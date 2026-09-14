document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("offer-form");
  const ddiSelect = document.getElementById("phone-ddi");
  const phoneInput = document.getElementById("phone");
  const phoneGroup = phoneInput.closest(".phone-input");
  const phoneError = document.getElementById("phone-error");
  const submitBtn = document.getElementById("submit-btn");
  const submitLabel = document.getElementById("submit-label");

  function formatPhone(value, ddi) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    // Outside Brazil we don't know the exact local format, so we
    // just group the digits in blocks of 3 to make it more readable.
    if (ddi !== "55") {
      return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
    }

    const ddd = digits.slice(0, 2);
    const rest = digits.slice(2);

    if (digits.length === 0) return "";
    if (digits.length <= 2) return ddd;

    if (rest.length <= 4) {
      return `${ddd} ${rest}`;
    }

    const firstPart = rest.slice(0, rest.length - 4);
    const lastPart = rest.slice(-4);
    return `${ddd} ${firstPart}-${lastPart}`;
  }

  function isValidPhone(value, ddi) {
    const digits = value.replace(/\D/g, "");
    if (ddi === "55") {
      return digits.length === 10 || digits.length === 11;
    }
    return digits.length >= 6 && digits.length <= 14;
  }

  function updatePlaceholder() {
    const selected = ddiSelect.options[ddiSelect.selectedIndex];
    phoneInput.placeholder = selected.dataset.placeholder || "phone number";
  }

  updatePlaceholder();

  ddiSelect.addEventListener("change", () => {
    updatePlaceholder();
    phoneInput.value = "";
    phoneGroup.classList.remove("has-error");
    phoneError.classList.remove("visible");
  });

  phoneInput.addEventListener("input", (event) => {
    event.target.value = formatPhone(event.target.value, ddiSelect.value);
    if (phoneGroup.classList.contains("has-error") && isValidPhone(event.target.value, ddiSelect.value)) {
      phoneGroup.classList.remove("has-error");
      phoneError.classList.remove("visible");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!isValidPhone(phoneInput.value, ddiSelect.value)) {
      phoneGroup.classList.add("has-error");
      phoneError.classList.add("visible");
      phoneInput.focus();
      return;
    }

    phoneGroup.classList.remove("has-error");
    phoneError.classList.remove("visible");

    const fullNumber = `+${ddiSelect.value}${phoneInput.value.replace(/\D/g, "")}`;
    console.log("Number registered:", fullNumber);

    // TODO: send `fullNumber` to the backend/API responsible for registration.
    submitBtn.disabled = true;
    phoneInput.disabled = true;
    ddiSelect.disabled = true;
    submitLabel.textContent = "Sending...";
    submitBtn.classList.add("is-loading");

    setTimeout(() => {
      const params = new URLSearchParams({
        tel: phoneInput.value,
        ddi: ddiSelect.value,
      });
      window.location.href = `confirmacao.html?${params.toString()}`;
    }, 1400);
  });
});
