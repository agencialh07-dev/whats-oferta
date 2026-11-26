/*
 * Locally generated SVG artwork: avatars and sample photo illustrations.
 * No external images are used — everything is drawn here.
 */
(function () {
  'use strict';
  var uid = 0;

  /* ---------- Person avatars ---------- */
  var HAIR = {
    long: {
      back: 'M17 30c0-13 7-20 15-20s15 7 15 20v22c-4 2-8 2-10 0H27c-2 2-6 2-10 0z',
      front: 'M19.5 27c1.5-9 6.5-14 12.5-14s11 5 12.5 14c-6-1-10.5-4-12.5-8-2 4-6.5 7-12.5 8z'
    },
    wavy: {
      back: 'M18 29c0-12 6-19 14-19s14 7 14 19v10c-2 3-5 3-7 1H25c-2 2-5 2-7-1z',
      front: 'M19.5 27c2-9 7.5-14 13.5-14 5.5 0 10 3.5 11.5 11-6-.5-12-3.5-14.5-7-3 4.5-6 8-10.5 10z'
    },
    short: { front: 'M19.5 26c0-10 5.5-15 12.5-15s12.5 5 12.5 15c-3-3.5-7.5-5.5-12.5-5.5s-9.5 2-12.5 5.5z' },
    buzz: { front: 'M20.3 24c1-8 5.5-12 11.7-12s10.7 4 11.7 12c-3.2-2.2-7.2-3.4-11.7-3.4s-8.5 1.2-11.7 3.4z' },
    bun: {
      front: 'M19.5 26c0-10 5.5-15 12.5-15s12.5 5 12.5 15c-3-3.5-7.5-5.5-12.5-5.5s-9.5 2-12.5 5.5z',
      extra: '<circle cx="32" cy="9" r="6"/>'
    },
    curly: {
      extra: '<circle cx="21" cy="23" r="5.5"/><circle cx="23.5" cy="16" r="6"/><circle cx="30" cy="12" r="6.5"/>' +
        '<circle cx="37.5" cy="13" r="6"/><circle cx="42.5" cy="19" r="5.5"/><circle cx="43.5" cy="25" r="4.5"/><circle cx="20.5" cy="27" r="4"/>'
    }
  };

  function person(c) {
    var h = HAIR[c.hair] || HAIR.short;
    var mouth = c.beard ? '#f3d6c6' : '#7a3b2e';
    return '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<rect width="64" height="64" fill="' + c.bg + '"/>' +
      (h.back ? '<path d="' + h.back + '" fill="' + c.hairColor + '"/>' : '') +
      '<path d="M8 66c2-13 12-19 24-19s22 6 24 19z" fill="' + c.shirt + '"/>' +
      '<rect x="27" y="37" width="10" height="11" rx="4" fill="' + c.skin + '"/>' +
      '<ellipse cx="32" cy="29" rx="12" ry="13.5" fill="' + c.skin + '"/>' +
      (c.beard ? '<path d="M20.5 30c.5 9.5 5.5 14 11.5 14s11-4.5 11.5-14c-2.5 4-6 6-11.5 6s-9-2-11.5-6z" fill="' + c.hairColor + '"/>' : '') +
      '<circle cx="27" cy="30" r="1.5" fill="#2a1d17"/><circle cx="37" cy="30" r="1.5" fill="#2a1d17"/>' +
      '<path d="M28.5 36q3.5 2.6 7 0" stroke="' + mouth + '" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
      (c.glasses ? '<g fill="none" stroke="#1d1d1d" stroke-width="1.3"><circle cx="27" cy="30" r="3.8"/><circle cx="37" cy="30" r="3.8"/><path d="M30.8 30h2.4"/></g>' : '') +
      (h.front ? '<path d="' + h.front + '" fill="' + c.hairColor + '"/>' : '') +
      (h.extra ? '<g fill="' + c.hairColor + '">' + h.extra + '</g>' : '') +
      '</svg>';
  }

  /* ---------- Group avatars ---------- */
  var GROUP_ART = {
    van: '<rect width="64" height="64" fill="#ffcf70"/>' +
      '<rect x="14" y="17" width="34" height="4" rx="2" fill="#3fa7d6"/>' +
      '<rect x="9" y="22" width="46" height="21" rx="6" fill="#ff6b6b"/>' +
      '<rect x="13" y="26" width="10" height="7" rx="2" fill="#d6f1ff"/><rect x="26" y="26" width="10" height="7" rx="2" fill="#d6f1ff"/>' +
      '<rect x="39" y="26" width="12" height="7" rx="2" fill="#d6f1ff"/><rect x="9" y="36" width="46" height="3" fill="#fff" opacity=".6"/>' +
      '<circle cx="20" cy="44" r="5" fill="#2d2d2d"/><circle cx="44" cy="44" r="5" fill="#2d2d2d"/>' +
      '<circle cx="20" cy="44" r="2" fill="#bbb"/><circle cx="44" cy="44" r="2" fill="#bbb"/>',
    books: '<rect width="64" height="64" fill="#b8e0d2"/>' +
      '<rect x="13" y="18" width="10" height="30" rx="1.5" fill="#e76f51"/><rect x="25" y="14" width="9" height="34" rx="1.5" fill="#2a9d8f"/>' +
      '<rect x="36" y="22" width="8" height="26" rx="1.5" fill="#f4a261"/>' +
      '<rect x="43" y="19" width="9" height="30" rx="1.5" fill="#264653" transform="rotate(12 47 34)"/>' +
      '<rect x="15" y="24" width="6" height="2" fill="#fff" opacity=".7"/><rect x="27" y="20" width="5" height="2" fill="#fff" opacity=".7"/>' +
      '<rect x="9" y="48" width="46" height="4" rx="1" fill="#6b4f3a"/>',
    house: '<rect width="64" height="64" fill="#c3d4ff"/>' +
      '<circle cx="50" cy="38" r="8" fill="#52b788"/><rect x="49" y="42" width="2" height="9" fill="#6b4f3a"/>' +
      '<rect x="17" y="31" width="28" height="20" fill="#fff"/><path d="M13 32 31 16l18 16z" fill="#e63946"/>' +
      '<rect x="28" y="39" width="7" height="12" fill="#457b9d"/><rect x="20" y="35" width="6" height="6" fill="#ffd166"/>' +
      '<rect x="37" y="35" width="6" height="6" fill="#ffd166"/><rect x="8" y="51" width="48" height="3" fill="#6a994e"/>'
  };

  function avatar(cfg) {
    if (cfg.art) {
      return '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' + GROUP_ART[cfg.art] + '</svg>';
    }
    return person(cfg);
  }

  /* ---------- Sample photo illustrations (320×200) ---------- */
  function trees(list, color) {
    return list.map(function (p) {
      var x = p[0], y = p[1], s = p[2];
      return '<path d="M' + x + ' ' + (y - 34 * s) + 'l' + 11 * s + ' ' + 20 * s + 'h-' + 5 * s + 'l' + 8 * s + ' ' + 14 * s +
        'h-' + 28 * s + 'l' + 8 * s + '-' + 14 * s + 'h-' + 5 * s + 'z" fill="' + color + '"/>';
    }).join('');
  }

  var ART = {
    sunset: function (id) {
      return '<defs><linearGradient id="' + id + 'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4c93"/><stop offset=".5" stop-color="#f4845f"/><stop offset="1" stop-color="#ffd29d"/></linearGradient>' +
        '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e98a6a"/><stop offset="1" stop-color="#264653"/></linearGradient></defs>' +
        '<rect width="320" height="128" fill="url(#' + id + 'a)"/>' +
        '<circle cx="205" cy="122" r="34" fill="#fff1c1"/>' +
        '<rect y="122" width="320" height="78" fill="url(#' + id + 'b)"/>' +
        '<g fill="#ffe2a8" opacity=".75"><rect x="173" y="132" width="64" height="3" rx="1.5"/><rect x="183" y="142" width="44" height="3" rx="1.5"/><rect x="193" y="152" width="24" height="3" rx="1.5"/></g>' +
        '<path d="M0 178c30-8 60-8 90 0s60 8 90 0 60-8 90 0 40 6 50 4V200H0z" fill="#e9c896"/>' +
        '<g fill="#2a1e2e"><path d="M52 200c1-28 4-52 11-72l3.4 1c-6 19-8.5 43-9.4 71z"/>' +
        '<path d="M64 128c-14-7-30-5-40 4 13-3 26-1 38 6zM64 128c9-13 24-18 40-14-13 2-26 7-37 15zM64 128c-3-14-13-23-28-26 10 6 19 15 25 27zM64 128c15-3 28 3 37 14-11-7-23-9-35-11z"/></g>' +
        '<g fill="none" stroke="#3b2a3c" stroke-width="1.8" stroke-linecap="round"><path d="M250 58q5-4 10 0q5-4 10 0"/><path d="M278 44q4-3 8 0q4-3 8 0"/></g>';
    },

    lake: function (id) {
      return '<defs><linearGradient id="' + id + 'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec9f2"/><stop offset="1" stop-color="#e3f4ff"/></linearGradient>' +
        '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a9cc9"/><stop offset="1" stop-color="#1f5f85"/></linearGradient></defs>' +
        '<rect width="320" height="122" fill="url(#' + id + 'a)"/>' +
        '<ellipse cx="70" cy="32" rx="26" ry="8" fill="#fff" opacity=".85"/><ellipse cx="240" cy="24" rx="30" ry="7" fill="#fff" opacity=".8"/>' +
        '<polygon points="0,122 60,52 105,96 160,38 228,112 268,70 320,112 320,122" fill="#7f9cbd"/>' +
        '<polygon points="160,38 146,56 154,54 160,61 167,54 175,57" fill="#fff"/><polygon points="60,52 50,64 57,62 63,67 69,62" fill="#fff"/>' +
        '<polygon points="0,122 45,92 95,122 150,86 210,122" fill="#5a7898"/>' +
        '<rect y="120" width="320" height="80" fill="url(#' + id + 'b)"/>' +
        '<g fill="#fff" opacity=".28"><rect x="40" y="140" width="60" height="2" rx="1"/><rect x="150" y="152" width="80" height="2" rx="1"/><rect x="90" y="170" width="50" height="2" rx="1"/></g>' +
        trees([[14, 124, 1.1], [32, 126, 0.9], [300, 124, 1.2], [282, 126, 0.85]], '#1f4d3a') +
        '<rect x="196" y="150" width="124" height="8" fill="#8b5e3c"/><g fill="#6b4529"><rect x="206" y="158" width="4" height="22"/><rect x="246" y="158" width="4" height="22"/><rect x="286" y="158" width="4" height="22"/></g>';
    },

    cabin: function (id) {
      var stars = [[20, 20], [60, 40], [96, 14], [140, 30], [180, 12], [215, 44], [300, 20], [120, 60], [40, 70], [280, 74]]
        .map(function (s, i) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + (i % 3 ? 1.1 : 1.7) + '"/>'; }).join('');
      return '<defs><linearGradient id="' + id + 'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1a33"/><stop offset="1" stop-color="#2c3f66"/></linearGradient>' +
        '<radialGradient id="' + id + 'g"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient></defs>' +
        '<rect width="320" height="200" fill="url(#' + id + 'a)"/><g fill="#fff" opacity=".85">' + stars + '</g>' +
        '<circle cx="262" cy="42" r="16" fill="#f6f1d5"/><circle cx="270" cy="37" r="14" fill="#172442"/>' +
        '<path d="M0 152Q80 124 160 146T320 138V200H0z" fill="#1e3b2c"/>' +
        trees([[24, 156, 1.2], [52, 152, 0.9], [292, 150, 1.25], [314, 154, 0.95]], '#10241a') +
        '<rect x="180" y="76" width="10" height="20" fill="#4a2c1a"/>' +
        '<rect x="110" y="104" width="90" height="56" fill="#8b5a3c"/>' +
        '<g stroke="#6f4529" stroke-width="2"><path d="M110 118h90M110 132h90M110 146h90"/></g>' +
        '<polygon points="100,108 155,70 210,108" fill="#5a3522"/>' +
        '<rect x="122" y="116" width="24" height="19" fill="#ffd56b"/><path d="M134 116v19M122 125.5h24" stroke="#8b5a3c" stroke-width="2"/>' +
        '<rect x="164" y="124" width="22" height="36" fill="#4a2c1a"/>' +
        '<circle cx="250" cy="166" r="42" fill="url(#' + id + 'g)"/>' +
        '<ellipse cx="250" cy="172" rx="20" ry="5" fill="#5b5b5b"/>' +
        '<path d="M240 170c-2-10 4-14 6-22 3 6 2 9 5 12 1-4 3-6 5-9 2 7 6 11 3 19z" fill="#ff9f1c"/>' +
        '<path d="M246 170c-1-5 2-8 4-12 2 5 4 7 3 12z" fill="#ffe08a"/>';
    },

    cookies: function () {
      var checks = '';
      for (var y = 0; y < 200; y += 20) {
        for (var x = (y / 20) % 2 ? 20 : 0; x < 320; x += 40) checks += '<rect x="' + x + '" y="' + y + '" width="20" height="20"/>';
      }
      var cookie = function (cx, cy, r) {
        var chips = [[-8, -6], [6, -9], [9, 4], [-4, 7], [0, -1]].map(function (o) {
          return '<ellipse cx="' + (cx + o[0]) + '" cy="' + (cy + o[1]) + '" rx="3" ry="2.4" fill="#3e2618"/>';
        }).join('');
        return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#c98a4b" stroke="#a96d33" stroke-width="2"/>' +
          '<circle cx="' + (cx - 4) + '" cy="' + (cy - 5) + '" r="' + (r - 8) + '" fill="#d99d5c" opacity=".55"/>' + chips;
      };
      return '<rect width="320" height="200" fill="#f4e8d8"/><g fill="#e5a0a0" opacity=".35">' + checks + '</g>' +
        '<rect x="38" y="26" width="244" height="148" rx="14" fill="#9aa6b2"/><rect x="48" y="36" width="224" height="128" rx="9" fill="#b9c3cc"/>' +
        cookie(92, 74, 24) + cookie(160, 70, 25) + cookie(228, 76, 23) + cookie(98, 130, 23) + cookie(164, 128, 24) + cookie(230, 130, 22);
    },

    latte: function () {
      return '<rect width="320" height="200" fill="#7b4f32"/>' +
        '<g fill="#6a4229"><rect y="38" width="320" height="3"/><rect y="88" width="320" height="3"/><rect y="138" width="320" height="3"/><rect y="186" width="320" height="3"/></g>' +
        '<g fill="#8a5c3c" opacity=".6"><rect x="30" y="58" width="60" height="2" rx="1"/><rect x="230" y="110" width="70" height="2" rx="1"/><rect x="20" y="160" width="50" height="2" rx="1"/></g>' +
        '<circle cx="160" cy="100" r="80" fill="#e8e1d6"/><circle cx="160" cy="100" r="64" fill="#f6f2ea"/>' +
        '<rect x="200" y="90" width="44" height="20" rx="10" fill="#fff"/>' +
        '<circle cx="160" cy="100" r="52" fill="#fff"/><circle cx="160" cy="100" r="44" fill="#a0612f"/>' +
        '<circle cx="160" cy="100" r="44" fill="none" stroke="#c8864b" stroke-width="5" opacity=".7"/>' +
        '<path d="M160 126C130 106 128 82 145 78c8-2 13 3 15 8 2-5 7-10 15-8 17 4 15 28-15 48z" fill="#f6e6cc"/>' +
        '<path d="M160 120c-16-12-18-26-10-30M160 120c16-12 18-26 10-30" stroke="#e7c9a0" stroke-width="2" fill="none"/>' +
        '<rect x="58" y="150" width="70" height="7" rx="3.5" fill="#c9ced4" transform="rotate(-24 93 153)"/>';
    },

    chart: function () {
      var vals = [52, 68, 61, 84, 97], labels = ['NA', 'EU', 'APAC', 'LATAM', 'MEA'];
      var bars = vals.map(function (v, i) {
        var x = 58 + i * 50, h = v * 0.95;
        return '<rect x="' + x + '" y="' + (158 - h) + '" width="26" height="' + h + '" rx="3" fill="' + (i === 4 ? '#22c3a6' : '#4f7cff') + '"/>' +
          '<rect x="' + (x + 6) + '" y="' + (158 - h * 0.82 - 2) + '" width="14" height="2" fill="#f59e0b"/>' +
          '<text x="' + (x + 13) + '" y="171" text-anchor="middle" font-size="9" fill="#5b6475">' + labels[i] + '</text>';
      }).join('');
      return '<rect width="320" height="200" fill="#f5f7fb"/>' +
        '<rect width="320" height="34" fill="#1f2a44"/>' +
        '<text x="16" y="22" font-size="14" font-weight="700" fill="#fff" font-family="Segoe UI, Arial, sans-serif">Q3 Growth Review</text>' +
        '<text x="304" y="22" text-anchor="end" font-size="10" fill="#9fb0d0" font-family="Segoe UI, Arial, sans-serif">Slide 6</text>' +
        '<g stroke="#d7dce6"><path d="M48 158h262M48 128h262M48 98h262M48 68h262"/></g>' +
        '<g font-family="Segoe UI, Arial, sans-serif">' + bars +
        '<rect x="104" y="181" width="9" height="9" rx="2" fill="#4f7cff"/><text x="117" y="189" font-size="9" fill="#5b6475">Revenue</text>' +
        '<rect x="168" y="184" width="10" height="3" fill="#f59e0b"/><text x="182" y="189" font-size="9" fill="#5b6475">Target</text></g>';
    },

    game: function (id) {
      var blocks = '';
      for (var x = 0; x < 320; x += 20) {
        if (x >= 160 && x < 220) continue;
        blocks += '<rect x="' + x + '" y="160" width="20" height="40" fill="#8d5a2b" stroke="#6e4220"/><rect x="' + x + '" y="160" width="20" height="7" fill="#5cb85c"/>';
      }
      return '<defs><linearGradient id="' + id + 'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ab8f5"/><stop offset="1" stop-color="#c3ecff"/></linearGradient></defs>' +
        '<rect width="320" height="200" fill="url(#' + id + 'a)"/>' +
        '<g fill="#fff"><ellipse cx="70" cy="52" rx="24" ry="9"/><ellipse cx="88" cy="46" rx="16" ry="9"/><ellipse cx="250" cy="66" rx="28" ry="9"/></g>' +
        '<rect x="160" y="172" width="60" height="28" fill="#ff5722"/><g fill="#ffc107"><circle cx="172" cy="178" r="3"/><circle cx="196" cy="184" r="4"/><circle cx="210" cy="176" r="2.5"/></g>' +
        blocks +
        '<g fill="#d98b3a" stroke="#a8641f" stroke-width="2"><rect x="150" y="112" width="20" height="20"/><rect x="170" y="112" width="20" height="20"/><rect x="190" y="112" width="20" height="20"/></g>' +
        '<g fill="#ffd23f" stroke="#e0a800" stroke-width="1.5"><circle cx="160" cy="96" r="6"/><circle cx="180" cy="96" r="6"/><circle cx="200" cy="96" r="6"/></g>' +
        '<rect x="70" y="134" width="20" height="26" rx="3" fill="#6c5ce7"/><rect x="74" y="139" width="14" height="7" rx="2" fill="#e8f7ff"/>' +
        '<rect x="72" y="156" width="6" height="4" fill="#2d2a5a"/><rect x="82" y="156" width="6" height="4" fill="#2d2a5a"/>' +
        '<g font-family="Consolas, Menlo, monospace" font-weight="700"><rect x="10" y="10" width="130" height="24" rx="5" fill="#1d2b53" opacity=".85"/>' +
        '<text x="20" y="27" font-size="13" fill="#fff">BEST 48,210</text>' +
        '<rect x="250" y="10" width="60" height="24" rx="5" fill="#1d2b53" opacity=".85"/><text x="280" y="27" font-size="13" fill="#ffd23f" text-anchor="middle">LVL 7</text></g>';
    },

    meme: function () {
      var txt = 'font-family="Impact, Arial Black, sans-serif" font-weight="900" fill="#fff" stroke="#000" stroke-width="1.5" paint-order="stroke" text-anchor="middle"';
      return '<rect width="320" height="200" fill="#2b2d42"/>' +
        '<polygon points="112,88 122,46 147,74" fill="#f4a261"/><polygon points="208,88 198,46 173,74" fill="#f4a261"/>' +
        '<polygon points="120,80 125,56 138,72" fill="#e76f51"/><polygon points="200,80 195,56 182,72" fill="#e76f51"/>' +
        '<ellipse cx="160" cy="112" rx="56" ry="46" fill="#f4a261"/>' +
        '<g fill="#d98245"><path d="M150 72l4 14M160 70v15M170 72l-4 14" stroke="#d98245" stroke-width="3" stroke-linecap="round"/></g>' +
        '<rect x="116" y="96" width="38" height="20" rx="7" fill="#111"/><rect x="166" y="96" width="38" height="20" rx="7" fill="#111"/>' +
        '<rect x="152" y="101" width="16" height="4" fill="#111"/><rect x="122" y="99" width="10" height="4" rx="2" fill="#fff" opacity=".5"/>' +
        '<path d="M154 124h12l-6 6z" fill="#e76f51"/><path d="M160 130q-6 7-12 3M160 130q6 7 12 3" stroke="#2b2d42" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<g stroke="#fff" stroke-width="1.5" opacity=".7"><path d="M118 126l-28-4M118 132l-28 4M202 126l28-4M202 132l28 4"/></g>' +
        '<text x="160" y="38" font-size="28" ' + txt + '>2 HP.</text>' +
        '<text x="160" y="190" font-size="22" ' + txt + '>FULL CONFIDENCE.</text>';
    }
  };

  function illustration(kind) {
    if (/^private-[1-6]$/.test(kind)) {
      var prefix = document.body.classList.contains('saas2-mode') || document.body.classList.contains('saas3-mode') ? '../' : '';
      return '<img src="' + prefix + 'img/' + kind + '.png" alt="" draggable="false">';
    }
    var id = 'il' + (uid++);
    var draw = ART[kind];
    return '<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      (draw ? draw(id) : '<rect width="320" height="200" fill="#333"/>') + '</svg>';
  }

  window.SpyWhatsApp = window.SpyWhatsApp || {};
  window.SpyWhatsApp.assets = { avatar: avatar, illustration: illustration };
})();
