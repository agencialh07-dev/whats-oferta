document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const rawPhone = params.get("tel") || "";
  const ddi = params.get("ddi") || "55";
  const formattedPhone = rawPhone ? `+${ddi} ${rawPhone}` : "your number";

  document.getElementById("alert-phone").textContent = formattedPhone;
  document.getElementById("profile-phone").textContent = formattedPhone;
  document.getElementById("divider-phone").textContent = formattedPhone;
  document.getElementById("chat-phone").textContent = formattedPhone;
  document.getElementById("chat-phone-body").textContent = formattedPhone;
  document.getElementById("chat-mockup-phone").textContent = formattedPhone;
  document.getElementById("photo-phone").textContent = formattedPhone;
  document.getElementById("clock-phone").textContent = formattedPhone;
  document.getElementById("clock-phone-body").textContent = formattedPhone;
  document.getElementById("audio-phone").textContent = formattedPhone;
  document.getElementById("map-phone").textContent = formattedPhone;
  document.getElementById("map-phone-body").textContent = formattedPhone;

  // Urgency countdown (does not reset during the visit).
  const countdownEl = document.getElementById("countdown");
  let remainingSeconds = 10 * 60;

  function renderCountdown() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    countdownEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  renderCountdown();
  const countdownTimer = setInterval(() => {
    remainingSeconds = Math.max(0, remainingSeconds - 1);
    renderCountdown();
    if (remainingSeconds === 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);

  // TODO: replace with a real redirect to checkout (payment gateway)
  // once the payment flow is ready.
  function handleUnlockClick(event) {
    event.preventDefault();
    console.log("Unlock VIP offers — connect to checkout here.");
    document.querySelector(".price-card").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  document.getElementById("unlock-btn").addEventListener("click", handleUnlockClick);
  document.getElementById("unlock-btn-2").addEventListener("click", handleUnlockClick);
});
