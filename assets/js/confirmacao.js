document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const rawPhone = params.get("tel") || "";
  const ddi = params.get("ddi") || "55";
  const formattedPhone = rawPhone ? `+${ddi} ${rawPhone}` : "";

  const introPhone = document.getElementById("intro-phone");
  const statusPhone = document.getElementById("status-phone");
  const detailPhone = document.getElementById("detail-phone");

  if (formattedPhone) {
    introPhone.textContent = formattedPhone;
    statusPhone.textContent = formattedPhone;
    detailPhone.textContent = formattedPhone;
  } else {
    statusPhone.textContent = "your number";
    detailPhone.textContent = "your number";
  }

  const playBtn = document.getElementById("play-btn");
  const watchBtn = document.getElementById("watch-btn");
  const videoCard = document.getElementById("video-card");

  function focusVideo() {
    videoCard.scrollIntoView({ behavior: "smooth", block: "center" });
    // TODO: once the real VSL embed is inserted, call the player's
    // play/unmute method here (e.g. iframe.contentWindow.postMessage(...)).
  }

  playBtn.addEventListener("click", focusVideo);
  watchBtn.addEventListener("click", focusVideo);

  const avatarRing = document.getElementById("avatar-ring");
  const progressFill = document.getElementById("progress-fill");
  const percentValue = document.getElementById("percent-value");
  const percentLabel = document.getElementById("percent-label");
  const statusBadge = document.getElementById("status-badge");
  const statusWait = document.getElementById("status-wait");
  const statusDetail = document.getElementById("status-detail");
  const trustTitle = document.getElementById("trust-title");
  const ctaBtn = document.getElementById("cta-btn");
  const checklistItems = Array.from(document.querySelectorAll(".checklist-item"));

  ctaBtn.href = `ofertas.html?tel=${encodeURIComponent(rawPhone)}&ddi=${encodeURIComponent(ddi)}`;

  const totalSteps = checklistItems.length;
  const thresholds = checklistItems.map((_, index) => Math.round(((index + 1) / totalSteps) * 100) - 5);

  // Start: the first item already enters "processing" (spinner).
  checklistItems[0].classList.add("is-pending");

  let activatedCount = 0;

  function activateStepsUpTo(percent) {
    while (activatedCount < totalSteps && percent >= thresholds[activatedCount]) {
      const item = checklistItems[activatedCount];
      item.classList.remove("is-pending");
      item.classList.add("is-active");

      const next = checklistItems[activatedCount + 1];
      if (next) {
        next.classList.add("is-pending");
      }
      activatedCount += 1;
    }
  }

  function setPercent(percent) {
    const rounded = Math.round(percent);
    percentValue.textContent = `${rounded}%`;
    progressFill.style.width = `${rounded}%`;
    avatarRing.style.setProperty("--p", rounded);
    activateStepsUpTo(rounded);
  }

  function finish() {
    setPercent(100);
    percentLabel.textContent = "Ready!";
    statusBadge.classList.add("is-done");
    statusBadge.innerHTML = '<i class="dot"></i>Registration confirmed';
    statusWait.textContent = "ALL SET!";
    statusDetail.innerHTML = `Your offers for the number <strong>${
      formattedPhone || "registered"
    }</strong> are now unlocked.`;
    trustTitle.textContent = "Registration completed successfully.";

    avatarRing.classList.remove("is-loading");
    avatarRing.classList.add("is-done");

    // The button only appears once the analysis reaches 100%.
    ctaBtn.classList.remove("is-hidden");
    ctaBtn.classList.add("is-ready");
  }

  // Simulates a real loading process: moves fast at the start and slows
  // down near 100%, with small variations to feel like a real analysis.
  // TODO: placeholder value — adjust once the ideal timing is defined.
  const totalDurationMs = 16000;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / totalDurationMs, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const percent = eased * 100;

    setPercent(percent);

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(finish, 300);
    }
  }

  requestAnimationFrame(tick);
});
