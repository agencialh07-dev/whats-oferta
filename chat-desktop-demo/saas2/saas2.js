(function () {
  'use strict';
  var delay = 7000;
  window.setTimeout(function () {
    var offer = document.getElementById('security-offer');
    var app = document.querySelector('.app');
    if (!offer || !app) return;
    document.body.classList.add('offer-active');
    app.inert = true;
    app.setAttribute('aria-hidden', 'true');
    offer.hidden = false;
    var accept = offer.querySelector('button');
    if (accept) accept.focus();
  }, delay);
})();
