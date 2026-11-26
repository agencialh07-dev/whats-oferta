/* Simple 24×24 stroke icons. */
(function () {
  'use strict';
  var F = 'fill="currentColor" stroke="none"';
  window.SpyWhatsApp = window.SpyWhatsApp || {};
  window.SpyWhatsApp.icons = {
    logo: '<path ' + F + ' d="M12 2.5a9.5 9.5 0 0 0-8.3 14.1L2.5 21.5l5-1.3A9.5 9.5 0 1 0 12 2.5z"/><path d="M8.3 10.3h7.4M8.3 13.7h4.6" stroke="#1d1f1f"/>',
    chats: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    phone: '<path d="M5.2 3.5h3.4l1.8 4.6-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2 4.6 1.8v3.4a1.7 1.7 0 0 1-1.8 1.7A16.5 16.5 0 0 1 3.5 5.3a1.7 1.7 0 0 1 1.7-1.8z"/>',
    status: '<circle cx="12" cy="12" r="9" stroke-dasharray="4.2 2.6"/><circle cx="12" cy="12" r="4.2"/>',
    channels: '<path d="M12 3a9 9 0 1 0 4.6 16.7L21 21l-1.3-4.4A9 9 0 0 0 12 3z"/><circle cx="12" cy="12" r="2.4"/>',
    communities: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.3"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15.5 14c3 0 5.5 1.6 5.5 4.5"/>',
    archive: '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11h14V8M12 11v5M9.5 13.5 12 16l2.5-2.5"/>',
    media: '<rect x="7" y="3" width="14" height="13" rx="2"/><path d="M3.5 7v11.5A2.5 2.5 0 0 0 6 21h11.5"/><path d="m9.5 13.5 3-3 2 2 2-2 2.5 2.5"/>',
    settings: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8"/>',
    dots: '<circle ' + F + ' cx="12" cy="5" r="1.7"/><circle ' + F + ' cx="12" cy="12" r="1.7"/><circle ' + F + ' cx="12" cy="19" r="1.7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
    emoji: '<circle cx="12" cy="12" r="9"/><path d="M8 14.5a5 5 0 0 0 8 0"/><circle ' + F + ' cx="9" cy="10" r="1.1"/><circle ' + F + ' cx="15" cy="10" r="1.1"/>',
    attach: '<path d="M20 11.5 12 19.5a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.7 17.2a1.7 1.7 0 0 1-2.4-2.4L15 7"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    send: '<path ' + F + ' d="M3.4 20.4 21 12 3.4 3.6l-.1 6.5L15 12 3.3 13.9z"/>',
    check: '<path d="m4.5 12.5 4.5 4.5L19.5 7"/>',
    dcheck: '<path d="m2 12.5 4.5 4.5L17 7"/><path d="m11.5 16.5.5.5L22.5 7"/>',
    pin: '<path d="M9 3h6l-1 6 3 3H7l3-3zM12 12v9"/>',
    mute: '<path d="M6 16v-5a6 6 0 0 1 9.4-4.9M18 11v5l1.5 2H8M10 21h4M3 3l18 18"/>',
    star: '<path d="m12 3.2 2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.8 1-6-4.3-4.2 6-.9z"/>',
    starFill: '<path ' + F + ' d="m12 3.2 2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.8 1-6-4.3-4.2 6-.9z"/>',
    play: '<path ' + F + ' d="M7.5 4.8v14.4L19.2 12z"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    addContact: '<circle cx="10" cy="8" r="4"/><path d="M3 20c0-3.9 3.1-6 7-6s7 2.1 7 6M19 8v6M16 11h6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    viewOnce: '<path d="M12 3a9 9 0 1 1-8.5 6"/><path d="M4.6 6.6l.1-.1M6.9 4.5l.1-.1M9.5 3.3h.1" stroke-width="2.4"/><path d="M10.3 9.4 12.6 8v8.2"/>',
    camera:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13.5" r="3.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    unread: '<path d="M20 12a8 8 0 1 1-3.2-6.4"/><circle ' + F + ' cx="19" cy="5" r="2.6"/>',
    group: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M13 14.3c.9-.2 1.9-.3 3-.3 3 0 5.5 2 5.5 5"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5L5 20"/>',
    poll: '<path d="M5 20V10M12 20V4M19 20v-7"/>',
    selectAll: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'
  };
})();
