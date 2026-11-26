(function () {
  'use strict';
  var country = document.getElementById('country');
  var code = document.getElementById('calling-code');
  var flag = document.getElementById('country-flag');
  var form = document.getElementById('access-form');
  var phone = document.getElementById('phone');
  var feedback = document.getElementById('form-feedback');
  var entryScreen = document.getElementById('entry-screen');
  var tutorial = document.querySelector('.tutorial');
  var footer = document.querySelector('.footer');
  var loadingScreen = document.getElementById('loading-screen');
  var progressFill = document.getElementById('progress-fill');
  var progressBar = document.querySelector('.progress-track');
  var progressPercent = document.getElementById('progress-percent');
  var progressTime = document.getElementById('progress-time');
  var loadingTitle = document.getElementById('loading-title');
  var loadingDetail = document.getElementById('loading-detail');
  var purchaseButton = document.getElementById('purchase-button');
  var purchaseNote = document.getElementById('purchase-note');
  var purchaseCard = document.getElementById('full-access-card');
  var unlockedNumber = document.getElementById('unlocked-number');
  var unlockedScreen = document.getElementById('unlocked-screen');
  var regionName = document.getElementById('region-name');
  var mapPhoneNumber = document.getElementById('map-phone-number');
  var countryMap = document.getElementById('country-map');
  var lockedMap = document.getElementById('locked-map');
  var mapShapes = {
    US: 'M12 28 21 20 38 22 48 17 61 20 73 17 82 24 95 23 105 30 118 29 128 35 141 32 152 39 168 39 181 48 173 58 163 61 153 71 143 72 137 84 128 85 123 96 114 90 109 79 98 76 89 68 76 69 69 62 57 64 51 57 40 59 34 50 26 48 21 39 13 38Z M137 85 145 88 151 99 149 112 144 108 141 97Z',
    CA: 'M17 34 26 20 39 24 48 13 61 22 75 15 86 25 99 18 109 27 125 20 134 30 149 26 160 35 178 34 185 46 174 56 162 55 152 65 138 62 126 71 111 65 100 74 88 65 76 70 64 61 51 64 43 54 28 55 22 45Z',
    BR: 'M101 8 118 13 126 24 139 28 146 40 157 48 151 59 159 70 151 83 143 87 138 103 126 113 116 107 109 97 96 94 91 83 82 78 85 65 77 56 83 44 80 34 90 25 91 15Z',
    PT: 'M85 15 112 12 119 25 113 37 116 49 108 60 112 72 102 84 106 98 94 108 84 102 87 88 80 76 85 64 78 51 83 39 77 28Z',
    GB: 'M100 13 111 18 108 29 117 37 110 47 116 56 107 64 111 73 101 83 105 95 95 104 88 98 93 87 84 78 91 68 84 57 94 48 88 38 97 30 92 21Z M128 91 139 96 134 106 124 102Z',
    AR: 'M79 12 116 16 121 28 111 39 118 51 107 64 114 77 103 89 108 104 97 116 87 103 91 89 81 76 87 64 77 50 84 37 75 25Z',
    MX: 'M23 35 38 27 51 31 62 28 73 34 85 31 96 38 107 39 114 50 127 52 138 63 151 66 156 75 145 80 132 77 123 69 111 72 102 64 92 67 82 58 71 61 63 53 51 56 43 48 31 48Z M143 78 152 82 161 91 157 98 149 92Z',
    FR: 'M76 25 92 15 109 21 126 18 139 30 135 45 147 56 137 70 123 72 115 88 99 91 89 82 73 84 64 71 68 56 60 44 69 35Z',
    DE: 'M84 17 109 19 120 28 116 40 128 51 121 62 126 74 115 85 101 81 91 90 81 78 72 71 77 58 69 49 77 39 72 29Z',
    ES: 'M58 30 76 22 93 25 106 19 124 27 141 25 151 37 144 49 151 61 139 73 123 72 112 81 96 77 82 85 69 76 56 72 50 59 56 47Z',
    IT: 'M85 14 111 18 119 30 113 44 122 54 130 68 144 73 152 83 145 90 132 81 122 79 115 91 105 88 101 77 92 72 87 59 78 50 84 37 77 26Z M144 91 157 98 163 107 155 112 145 105Z',
    JP: 'M118 15 128 19 126 31 119 39 123 50 116 61 120 71 111 81 114 92 106 101 99 95 104 83 98 72 105 61 101 49 109 38 105 27Z M82 20 88 22 85 30 79 29Z M96 105 101 109 97 114 92 111Z'
  };
  var detailedMaps = {
    US: {
      viewBox: '0 0 600 300',
      outline: 'M42 49 66 40 100 44 119 32 164 43 207 41 244 53 281 48 319 57 356 51 391 62 420 58 449 66 471 75 494 73 510 87 525 85 535 101 526 115 513 122 501 144 492 156 487 180 479 198 470 211 465 233 453 244 444 230 440 212 431 197 418 184 403 177 389 183 374 176 360 171 339 176 327 188 311 193 296 190 284 180 260 184 242 177 226 182 207 177 196 165 174 167 160 154 144 153 134 144 117 146 109 135 93 136 87 124 72 119 67 106 52 101 48 86 39 76Z',
      borders: 'M58 37 52 103 70 121 74 161 91 171 M111 34 108 134 116 150 111 176 M160 40 159 153 170 167 166 183 M208 41 207 177 219 187 M247 48 242 177 253 190 M286 49 284 180 296 196 M326 55 327 188 M365 54 360 171 371 188 M405 59 403 177 416 190 M445 65 440 153 450 169 M480 72 471 140 M62 77 505 91 M51 103 497 119 M69 126 489 145 M91 151 480 169 M116 174 464 193 M166 187 450 216',
      dots: '88,94 142,112 183,132 228,100 269,139 319,112 359,128 407,121 451,126 468,101 391,93 329,159 251,159 184,82'
    },
    BR: {
      viewBox: '0 0 600 300',
      outline: 'M290 31 323 35 344 49 368 54 383 68 405 77 411 94 430 105 422 123 431 138 420 154 408 160 401 182 388 195 373 189 361 175 341 172 328 157 308 152 297 137 280 130 283 112 270 98 277 80 269 64 280 49Z',
      borders: 'M284 48 322 56 357 54 393 68 M275 77 310 83 345 78 376 88 414 91 M277 99 308 105 337 99 370 110 426 108 M282 122 310 126 339 119 369 132 424 128 M298 143 327 145 355 137 400 149 M310 59 306 91 312 122 323 155 M338 52 337 82 345 113 344 170 M366 58 362 90 372 119 365 174 M390 69 383 101 398 128 388 160',
      dots: '303,77 345,91 381,85 317,117 361,126 398,118 339,151 374,153'
    }
  };

  function renderMap(countryCode) {
    var detailed = detailedMaps[countryCode];
    if (detailed) {
      var clipId = 'region-clip-' + countryCode.toLowerCase();
      var dots = detailed.dots.split(' ').map(function (pair) {
        var point = pair.split(',');
        return '<circle class="map-city" cx="' + point[0] + '" cy="' + point[1] + '" r="2"/>';
      }).join('');
      countryMap.setAttribute('viewBox', detailed.viewBox);
      countryMap.innerHTML = '<defs><clipPath id="' + clipId + '"><path d="' + detailed.outline + '"/></clipPath></defs>' +
        '<path class="map-country-shape" d="' + detailed.outline + '"/>' +
        '<g class="map-country-borders" clip-path="url(#' + clipId + ')"><path d="' + detailed.borders + '"/>' + dots + '</g>';
      return;
    }
    countryMap.setAttribute('viewBox', '0 0 200 120');
    countryMap.innerHTML = '<path class="map-country-shape" d="' + (mapShapes[countryCode] || mapShapes.US) + '"/>';
  }
  renderMap('US');

  function phoneDigits(value, countryCode) {
    var digits = String(value || '').replace(/\D/g, '');
    var max = countryCode === 'BR' ? 11 : countryCode === 'PT' ? 9 : 10;
    return digits.slice(0, max);
  }

  function formatPhone(value, countryCode) {
    var digits = phoneDigits(value, countryCode);
    if (!digits) return '';
    if (countryCode === 'US' || countryCode === 'CA') {
      if (digits.length < 4) return '(' + digits;
      if (digits.length < 7) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
      return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
    }
    if (countryCode === 'BR') {
      var area = digits.slice(0, 2);
      var local = digits.slice(2);
      if (!local) return '(' + area;
      if (local.length <= 4) return '(' + area + ') ' + local;
      var split = local.length > 8 ? 5 : 4;
      return '(' + area + ') ' + local.slice(0, split) + '-' + local.slice(split);
    }
    if (countryCode === 'PT') return digits.match(/.{1,3}/g).join(' ');
    if (countryCode === 'GB') return digits.length <= 4 ? digits : digits.slice(0, 4) + ' ' + digits.slice(4);
    if (countryCode === 'FR') return digits.match(/.{1,2}/g).join(' ');
    if (countryCode === 'DE') return digits.length <= 3 ? digits : digits.slice(0, 3) + ' ' + digits.slice(3, 6) + (digits.length > 6 ? ' ' + digits.slice(6) : '');
    if (countryCode === 'ES') return digits.match(/.{1,3}/g).join(' ');
    if (countryCode === 'IT') return digits.length <= 3 ? digits : digits.slice(0, 3) + ' ' + digits.slice(3, 6) + (digits.length > 6 ? ' ' + digits.slice(6) : '');
    if (countryCode === 'JP') {
      if (digits.length <= 2) return digits;
      return digits.slice(0, 2) + '-' + digits.slice(2, 6) + (digits.length > 6 ? '-' + digits.slice(6) : '');
    }
    if (countryCode === 'AR') {
      if (digits.length <= 2) return '(' + digits;
      return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + (digits.length > 6 ? '-' + digits.slice(6) : '');
    }
    if (countryCode === 'MX') {
      if (digits.length <= 2) return digits;
      return digits.slice(0, 2) + ' ' + digits.slice(2, 6) + (digits.length > 6 ? ' ' + digits.slice(6) : '');
    }
    return digits;
  }

  country.addEventListener('change', function () {
    var option = country.options[country.selectedIndex];
    code.textContent = option.dataset.code;
    flag.textContent = option.dataset.flag;
    phone.placeholder = country.value === 'US' || country.value === 'CA' ? '(555) 123-4567' : country.value === 'BR' ? '(11) 99999-9999' : 'Phone number';
    phone.value = formatPhone(phone.value, country.value);
    renderMap(country.value);
    lockedMap.setAttribute('aria-label', 'Blurred map preview for ' + option.textContent.replace(/\s+\(\+\d+\)$/, ''));
  });

  phone.addEventListener('input', function () {
    phone.value = formatPhone(phone.value, country.value);
    feedback.classList.remove('show');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var digits = phone.value.replace(/\D/g, '');
    if (digits.length < 7) {
      phone.setCustomValidity('Enter a valid phone number.');
      phone.reportValidity();
      phone.setCustomValidity('');
      return;
    }
    phone.value = formatPhone(phone.value, country.value);
    unlockedNumber.textContent = code.textContent + ' ' + phone.value;
    mapPhoneNumber.textContent = code.textContent + ' ' + phone.value;
    regionName.textContent = country.options[country.selectedIndex].textContent.replace(/\s+\(\+\d+\)$/, '');
    entryScreen.hidden = true;
    tutorial.hidden = true;
    footer.hidden = true;
    loadingScreen.hidden = false;
    document.body.classList.add('is-loading');
    runPreparation();
  });

  function runPreparation() {
    var duration = 10000;
    var started = Date.now();
    var phases = [
      { at: 0, title: 'Syncing contacts', detail: 'Preparing names and profile details…' },
      { at: 2500, title: 'Loading conversations', detail: 'Organizing your recent chats…' },
      { at: 5000, title: 'Preparing voice messages', detail: 'Getting audio messages ready…' },
      { at: 7500, title: 'Preparing images', detail: 'Loading shared photos…' }
    ];
    var stepItems = Array.prototype.slice.call(document.querySelectorAll('.loading-steps li'));
    var timer = window.setInterval(function () {
      var elapsed = Date.now() - started;
      var progress = Math.min(100, elapsed / duration * 100);
      var secondsLeft = Math.ceil(Math.max(0, duration - elapsed) / 1000);
      var phase = phases.filter(function (item) { return elapsed >= item.at; }).pop();
      progressFill.style.width = progress + '%';
      progressPercent.textContent = Math.floor(progress) + '%';
      progressBar.setAttribute('aria-valuenow', String(Math.floor(progress)));
      progressTime.textContent = secondsLeft ? secondsLeft + (secondsLeft === 1 ? ' second remaining' : ' seconds remaining') : 'Ready';
      loadingTitle.textContent = phase.title;
      loadingDetail.textContent = phase.detail;
      var currentStep = Math.min(3, Math.floor(elapsed / 2500));
      stepItems.forEach(function (item, index) {
        var state = item.querySelector('.step-state');
        var label = item.querySelector('small');
        item.classList.toggle('current', index === currentStep && elapsed < duration);
        item.classList.toggle('done', index < currentStep || elapsed >= duration);
        state.textContent = index < currentStep || elapsed >= duration ? '✓' : index === currentStep && elapsed < duration ? '◌' : '○';
        label.textContent = index < currentStep || elapsed >= duration ? 'Ready' : index === currentStep && elapsed < duration ? 'Loading' : 'Waiting';
      });
      if (elapsed >= duration) {
        window.clearInterval(timer);
        loadingScreen.classList.add('is-complete');
        loadingTitle.textContent = 'WhatsApp access is ready';
        loadingDetail.textContent = 'Your access is prepared.';
        purchaseButton.disabled = false;
        purchaseButton.innerHTML = 'Purchase access <span aria-hidden="true">→</span>';
        purchaseNote.textContent = 'Unlock access to continue to WhatsApp.';
      }
    }, 100);
  }

  purchaseButton.addEventListener('click', function () {
    if (purchaseButton.disabled) return;
    loadingScreen.classList.add('is-unlocked');
    unlockedScreen.hidden = false;
  });

  function goToPurchase() {
    purchaseCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  document.querySelectorAll('[data-scroll-purchase]').forEach(function (item) {
    item.addEventListener('click', goToPurchase);
    item.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goToPurchase();
      }
    });
  });
})();
