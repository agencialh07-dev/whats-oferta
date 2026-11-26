/*
 * App state + interactions. All state lives in memory; reloading the page
 * restores the original sample conversations. No network requests are made.
 */
(function () {
  'use strict';
  var ui = SpyWhatsApp.ui;
  var paidMode = document.body.classList.contains('saas2-mode');
  var SENSITIVE_CHAT_IDS = { sophie: true, noah: true, ava: true };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var seq = 1;
  // Add the checkout URL for each pack here when it is ready.
  var CHECKOUT_URLS = { 100: '', 500: '', 1500: '', 5000: '', 10000: '' };

  function toMin(t) {
    var m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t);
    var h = +m[1] % 12;
    if (m[3].toUpperCase() === 'PM') h += 12;
    return h * 60 + +m[2];
  }
  function fmtTime(d) { return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); }

  // Browsers cap one timeout at 2^31-1 ms. Chain safe chunks for longer waits.
  function setLongTimeout(callback, delay) {
    var deadline = Date.now() + Math.max(0, Number(delay) || 0);
    function scheduleNext() {
      var remaining = deadline - Date.now();
      if (remaining <= 0) { callback(); return; }
      window.setTimeout(scheduleNext, Math.min(remaining, 2147483647));
    }
    scheduleNext();
  }

  function normalize(c) {
    var messages = [];
    c.history.forEach(function (day) {
      day.messages.forEach(function (m) {
        messages.push(Object.assign({ id: 'm' + (seq++), day: day.label, sortKey: day.offset * 1440 + toMin(m.time) }, m));
      });
    });
    var copy = Object.assign({}, c, { messages: messages, markedUnread: false });
    delete copy.history;
    return copy;
  }

  function loadFlagMap(key) {
    try { return JSON.parse(window.localStorage.getItem(key) || '{}') || {}; }
    catch (e) { return {}; }
  }

  function saveFlagMap(key, map) {
    try { window.localStorage.setItem(key, JSON.stringify(map)); }
    catch (e) { /* local browser only */ }
  }

  function loadFlag(key) {
    try { return window.localStorage.getItem(key) === 'true'; }
    catch (e) { return false; }
  }

  function migrateStorageKey(legacyKey, currentKey) {
    try {
      if (window.localStorage.getItem(currentKey) !== null) return;
      var saved = window.localStorage.getItem(legacyKey);
      if (saved !== null) window.localStorage.setItem(currentKey, saved);
    } catch (e) { /* keep the current browser's saved state when possible */ }
  }

  var STORAGE = {
    balance: 'spywhatsapp-credit-balance-v1',
    media: 'spywhatsapp-unlocked-media-v1',
    profiles: 'spywhatsapp-unlocked-profiles-v1',
    history: 'spywhatsapp-unlocked-history-v1',
    contacts: 'spywhatsapp-unlocked-contacts-v1'
  };
  [
    ['demo-credit-balance-testing', STORAGE.balance],
    ['demo-unlocked-media-v2', STORAGE.media],
    ['demo-unlocked-profiles-v2', STORAGE.profiles],
    ['demo-unlocked-history-v2', STORAGE.history],
    ['demo-unlocked-contacts-v2', STORAGE.contacts]
  ].forEach(function (keys) { migrateStorageKey(keys[0], keys[1]); });

  var state = {
    chats: SpyWhatsApp.data.chats.map(normalize),
    activeId: null,
    filter: 'all',
    query: '',
    drafts: {},
    divider: null,
    credits: (function () {
      try {
        var balanceKey = STORAGE.balance;
        var saved = window.localStorage.getItem(balanceKey);
        if (saved === null) {
          window.localStorage.setItem(balanceKey, '200');
          return 200;
        }
        return Math.max(0, parseInt(saved, 10) || 0);
      } catch (e) { return 200; }
    })(),
    unlockedMedia: loadFlagMap(STORAGE.media),
    loadingMedia: {},
    unlockedProfiles: loadFlagMap(STORAGE.profiles),
    loadingProfiles: {},
    unlockedConversations: loadFlagMap(STORAGE.history),
    pendingHistoryId: null,
    historyPromptDismissed: {},
    unlockedContacts: paidMode ? true : loadFlag(STORAGE.contacts),
    pendingContactsUnlock: false,
    contactPromptDismissed: false
  };

  // Session preview: two minutes free, then one extra minute per 100 credits.
  // The deadline is stored locally so a refresh does not reset the preview.
  var SESSION_MS = 2 * 60 * 1000;
  var SESSION_EXTENSION_MS = 60 * 1000;
  var SESSION_EXTENSION_CREDITS = 100;
  var SESSION_KEY = 'spywhatsapp-session-until-v1';
  var SESSION_DURATION_KEY = 'spywhatsapp-session-duration-v1';
  var sessionDuration = (function () {
    try {
      var saved = Number(window.localStorage.getItem(SESSION_DURATION_KEY));
      if (saved > 0) return saved;
      window.localStorage.setItem(SESSION_DURATION_KEY, String(SESSION_MS));
    } catch (e) { /* continue with the initial preview duration */ }
    return SESSION_MS;
  })();
  var sessionDeadline = (function () {
    try {
      var saved = Number(window.localStorage.getItem(SESSION_KEY));
      if (saved > 0) return saved;
      var fresh = Date.now() + SESSION_MS;
      window.localStorage.setItem(SESSION_KEY, String(fresh));
      return fresh;
    } catch (e) { return Date.now() + SESSION_MS; }
  })();
  var sessionExpired = false;

  function renderSession() {
    if (paidMode) return;
    var meter = $('#session-meter');
    var remaining = Math.max(0, sessionDeadline - Date.now());
    var seconds = Math.ceil(remaining / 1000);
    var minutesText = String(Math.floor(seconds / 60)).padStart(2, '0');
    var secondsText = String(seconds % 60).padStart(2, '0');
    $('#session-time').textContent = minutesText + ':' + secondsText;
    $('#session-progress').style.width = Math.min(100, Math.max(0, (sessionDuration - remaining) / sessionDuration * 100)) + '%';
    meter.classList.toggle('is-low', remaining <= 30000);

    if (remaining <= 0 && !sessionExpired) {
      sessionExpired = true;
      document.querySelector('.app').inert = true;
      $('#session-credit-balance').textContent = state.credits.toLocaleString('en-US') + ' credits available';
      $('#session-modal').hidden = false;
      $('#session-extend').focus();
    }
  }

  function extendSession() {
    if (state.credits < SESSION_EXTENSION_CREDITS) {
      if (!sessionExpired) {
        toast('You need 100 credits to add one minute');
        return;
      }
      $('#session-copy').textContent = 'You need 100 credits to add one minute. Choose a credit pack below to continue.';
      $('#session-packs').hidden = false;
      $('#session-packs-toggle').setAttribute('aria-expanded', 'true');
      return;
    }
    state.credits -= SESSION_EXTENSION_CREDITS;
    try { window.localStorage.setItem(STORAGE.balance, String(state.credits)); } catch (e) { /* local browser only */ }
    var now = Date.now();
    if (sessionDeadline > now) {
      sessionDeadline += SESSION_EXTENSION_MS;
      sessionDuration += SESSION_EXTENSION_MS;
    } else {
      sessionDeadline = now + SESSION_EXTENSION_MS;
      sessionDuration = SESSION_EXTENSION_MS;
    }
    try {
      window.localStorage.setItem(SESSION_KEY, String(sessionDeadline));
      window.localStorage.setItem(SESSION_DURATION_KEY, String(sessionDuration));
    } catch (e) { /* local browser only */ }
    sessionExpired = false;
    document.querySelector('.app').inert = false;
    $('#session-modal').hidden = true;
    $('#session-copy').textContent = 'Use 100 credits to add 1 more minute. You choose when to spend credits.';
    renderWallet();
    renderSession();
  }

  /* ---------- helpers ---------- */
  function getChat(id) { return state.chats.find(function (c) { return c.id === id; }); }
  function active() { return getChat(state.activeId); }
  function lastMsg(c) { return c.messages[c.messages.length - 1]; }
  function isUnread(c) { return c.unread > 0 || c.markedUnread; }
  function isMobile() { return window.matchMedia('(max-width: 760px)').matches; }
  function maxKey() {
    return state.chats.reduce(function (mx, c) { return Math.max(mx, lastMsg(c).sortKey); }, 0);
  }

  function orderedChats() {
    return state.chats.slice().sort(function (a, b) {
      return (b.pinned - a.pinned) || (lastMsg(b).sortKey - lastMsg(a).sortKey);
    });
  }

  function visibleChats() {
    var q = state.query.trim().toLowerCase();
    var ordered = orderedChats();
    if (!state.unlockedContacts) ordered = ordered.slice(0, 6);
    return ordered.filter(function (c) {
      if (q && c.name.toLowerCase().indexOf(q) === -1) return false;
      var keep = c.id === state.activeId; // an open chat stays visible while you read it
      if (state.filter === 'unread') return isUnread(c) || keep;
      if (state.filter === 'favorites') return c.favorite;
      if (state.filter === 'groups') return c.type === 'group';
      return true;
    });
  }

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  function renderWallet() {
    var balance = $('#credit-balance');
    if (balance) balance.textContent = state.credits.toLocaleString('en-US');
  }

  function spendCredits(amount) {
    if (state.credits < amount) {
      showInsufficientCredits(amount);
      return false;
    }
    state.credits -= amount;
    try { window.localStorage.setItem(STORAGE.balance, String(state.credits)); } catch (e) { /* local browser only */ }
    renderWallet();
    toast(amount.toLocaleString('en-US') + ' credits used · ' + state.credits.toLocaleString('en-US') + ' remaining');
    return true;
  }

  function loadMedia(el, type) {
    if (paidMode) { toast('This media stays locked'); return; }
    var id = el.dataset.id;
    if (!id || state.loadingMedia[id] || state.unlockedMedia[id]) return;
    if (!spendCredits(500)) return;
    state.unlockedMedia[id] = false;
    state.loadingMedia[id] = type;
    renderMessages();
    setLongTimeout(function () {
      delete state.loadingMedia[id];
      state.unlockedMedia[id] = true;
      saveFlagMap(STORAGE.media, state.unlockedMedia);
      var c = active();
      if (c && c.messages.some(function (m) { return m.id === id; })) renderMessages();
    }, 50000000000);
  }

  function toggleCreditPacks(forceOpen) {
    var panel = $('#credit-packs'), button = $('#wallet-toggle');
    if (!panel || !button) return;
    panel.hidden = forceOpen === true ? false : !panel.hidden;
    button.setAttribute('aria-expanded', panel.hidden ? 'false' : 'true');
  }

  function checkoutPackage(el) {
    var pack = el.dataset.pack, url = CHECKOUT_URLS[pack];
    if (!url) {
      if (!$('#session-modal').hidden) {
        $('#session-copy').textContent = 'Checkout for this pack is not connected yet. Connect its payment link to add credits.';
        return;
      }
      toast('Checkout link for ' + Number(pack).toLocaleString('en-US') + ' credits is not connected yet');
      return;
    }
    window.location.href = url;
  }

  /* ---------- rendering ---------- */
  function renderChips() {
    $('#filters').innerHTML = ui.chips(state, {
      unread: state.chats.filter(isUnread).length,
      groups: state.chats.filter(function (c) { return c.type === 'group'; }).length
    });
  }

  function renderList() {
    var chats = visibleChats();
    var empty = $('#list-empty');
    var gate = !state.unlockedContacts && state.chats.length > 6 ? ui.contactGate() : '';
    if (!chats.length) {
      $('#chat-list').innerHTML = gate;
      empty.innerHTML = ui.listEmpty(state);
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    $('#chat-list').innerHTML = chats.map(function (c) {
      return ui.chatItem(c, {
        active: c.id === state.activeId,
        sensitive: paidMode && !!SENSITIVE_CHAT_IDS[c.id],
        draft: c.id !== state.activeId ? (state.drafts[c.id] || '').trim() : '',
        profileUnlocked: paidMode ? false : !!state.unlockedProfiles[c.id],
        profileLoading: !!state.loadingProfiles[c.id]
      });
    }).join('') + gate;
  }

  function renderRailBadge() {
    var n = state.chats.filter(isUnread).length;
    var b = $('#rail-badge');
    b.textContent = n ? String(n) : '';
    b.parentElement.setAttribute('aria-label', 'Chats' + (n ? ', ' + n + ' unread' : ''));
  }

  function renderRail() {
    $('#rail').innerHTML = ui.rail(SpyWhatsApp.data.me, paidMode ? false : !!state.unlockedProfiles.me, paidMode ? false : !!state.loadingProfiles.me);
  }

  function refreshSidebar() { renderRail(); renderChips(); renderList(); renderRailBadge(); }

  function renderMain() {
    var c = active(), main = $('#main');
    $('#shell').classList.toggle('chat-open', !!c);
    if (!c) { main.innerHTML = ui.welcome(); main.setAttribute('aria-label', 'No chat selected'); return; }
    main.setAttribute('aria-label', 'Conversation with ' + c.name);
    main.innerHTML = ui.convHeader(c, paidMode ? false : !!state.unlockedProfiles[c.id], paidMode ? false : !!state.loadingProfiles[c.id]) +
      '<div class="messages" id="messages" role="log" aria-live="polite" aria-label="Messages" tabindex="0"></div>' +
      ui.composer();
    renderMessages();
    var ta = $('#composer-input');
    ta.value = state.drafts[c.id] || '';
    autosize(ta);
    updateSendBtn();
  }

  function renderHeader() {
    var c = active(), h = $('#conv-header');
    if (c && h) h.outerHTML = ui.convHeader(c, paidMode ? false : !!state.unlockedProfiles[c.id], paidMode ? false : !!state.loadingProfiles[c.id]);
  }

  function renderMessages() {
    var c = active(), box = $('#messages');
    if (!c || !box) return;
    var historyLocked = !paidMode && !state.unlockedConversations[c.id] && c.messages.length > 10;
    var visibleStart = historyLocked ? c.messages.length - 10 : 0;
    var visibleMessages = historyLocked ? c.messages.slice(visibleStart) : c.messages;
    var html = ui.notice() + (historyLocked ? ui.historyGate() : ''), prevDay = null, prevFrom = null;
    var divIdx = !historyLocked && state.divider && state.divider.id === c.id ? c.messages.length - state.divider.count : -1;
    visibleMessages.forEach(function (m, i) {
      if (m.day !== prevDay) { html += ui.daySep(m.day); prevDay = m.day; prevFrom = null; }
      if (i === divIdx) { html += ui.unreadDivider(state.divider.count); prevFrom = null; }
      html += ui.message(m, c, {
        tail: m.from !== prevFrom,
        unlocked: paidMode ? false : !!state.unlockedMedia[m.id],
        loading: paidMode ? '' : state.loadingMedia[m.id] || '',
        profileUnlocked: paidMode ? false : !!state.unlockedProfiles[c.id],
        profileLoading: paidMode ? '' : !!state.loadingProfiles[c.id]
      });
      prevFrom = m.from;
    });
    box.innerHTML = '<div class="messages-inner">' + html + '</div>';
    box.scrollTop = box.scrollHeight;
  }

  function renderAll() { refreshSidebar(); renderMain(); }

  /* ---------- chat actions ---------- */
  function saveDraft() {
    var ta = $('#composer-input');
    if (state.activeId && ta) state.drafts[state.activeId] = ta.value;
  }

  function focusItem(id) {
    var el = id && $('.chat-item[data-id="' + id + '"]');
    (el || $('#search')).focus();
  }

  function openChat(id) {
    var c = getChat(id);
    if (!c) return;
    var allowed = state.unlockedContacts || orderedChats().slice(0, 6).some(function (item) { return item.id === id; });
    if (!allowed) {
      showContactUnlock(true);
      return;
    }
    if (state.activeId === id) return;
    if (!paidMode && !spendCredits(200)) return;
    saveDraft();
    state.divider = c.unread > 0 ? { id: id, count: c.unread } : null;
    c.unread = 0;
    c.markedUnread = false;
    state.activeId = id;
    renderAll();
    if (isMobile()) $('#back-btn').focus();
    else $('#messages').focus();
  }

  var previousFocus = null;
  function showContactUnlock(force) {
    if (state.unlockedContacts || state.pendingContactsUnlock || (state.contactPromptDismissed && !force)) return;
    var modal = $('#offer-modal'), list = $('#chat-list');
    if (!modal) return;
    state.pendingContactsUnlock = true;
    previousFocus = document.activeElement;
    $('#offer-kicker').textContent = 'MORE CHATS LOCKED';
    $('#offer-warning-copy').textContent = 'Unlock the remaining conversations for 1,000 credits.';
    $('#offer-title').textContent = 'Unlock more contacts?';
    $('#offer-copy').textContent = 'The remaining chats will appear after you confirm the credit charge.';
    $('#offer-price').textContent = 'Cost: 1,000 credits';
    $('#offer-checkout').dataset.action = 'confirm-contacts';
    $('#offer-checkout').innerHTML = 'Confirm and unlock · 1,000 credits';
    if (list) list.style.overflowY = 'hidden';
    modal.hidden = false;
    $('.offer-close', modal).focus();
  }

  function confirmContactsUnlock() {
    if (!state.pendingContactsUnlock || !spendCredits(1000)) return;
    state.unlockedContacts = true;
    try { window.localStorage.setItem(STORAGE.contacts, 'true'); } catch (e) { /* local browser only */ }
    state.pendingContactsUnlock = false;
    state.contactPromptDismissed = false;
    closeOffer();
    refreshSidebar();
  }

  function showInsufficientCredits(amount) {
    var modal = $('#offer-modal');
    if (!modal) return;
    previousFocus = document.activeElement;
    var shortfall = amount - state.credits;
    $('#offer-kicker').textContent = 'NOT ENOUGH CREDITS';
    $('#offer-warning-copy').textContent = 'This action costs ' + amount.toLocaleString('en-US') + ' credits. You need ' + shortfall.toLocaleString('en-US') + ' more.';
    $('#offer-title').textContent = 'Add credits to continue';
    $('#offer-copy').textContent = 'Choose a pack from the sidebar. Purchases are not connected in this preview.';
    $('#offer-price').textContent = 'Your balance: ' + state.credits.toLocaleString('en-US') + ' credits';
    $('#offer-checkout').dataset.action = 'open-packs';
    $('#offer-checkout').innerHTML = 'View credit packs <span>↗</span>';
    var box = $('#messages');
    if (box) box.style.overflowY = 'hidden';
    var list = $('#chat-list');
    if (list && state.pendingContactsUnlock) list.style.overflowY = 'hidden';
    modal.hidden = false;
    $('.offer-close', modal).focus();
  }

  function showHistoryUnlock(id) {
    if (!id || state.unlockedConversations[id] || state.pendingHistoryId) return;
    var modal = $('#offer-modal'), box = $('#messages');
    if (!modal) return;
    state.pendingHistoryId = id;
    previousFocus = document.activeElement;
    $('#offer-kicker').textContent = 'OLDER MESSAGES LOCKED';
    $('#offer-warning-copy').textContent = 'Unlock the rest of this conversation for 1,000 credits.';
    $('#offer-title').textContent = 'Load earlier messages?';
    $('#offer-copy').textContent = 'The older part of this conversation is hidden until you confirm.';
    $('#offer-price').textContent = 'Cost: 1,000 credits';
    $('#offer-checkout').dataset.action = 'confirm-history';
    $('#offer-checkout').innerHTML = 'Unlock history · 1,000 credits';
    if (box) box.style.overflowY = 'hidden';
    modal.hidden = false;
    $('.offer-close', modal).focus();
  }

  function confirmHistoryUnlock() {
    var id = state.pendingHistoryId;
    if (!id || !spendCredits(1000)) return;
    state.unlockedConversations[id] = true;
      saveFlagMap(STORAGE.history, state.unlockedConversations);
    state.pendingHistoryId = null;
    closeOffer();
    if (state.activeId === id) {
      renderMessages();
      var box = $('#messages');
      if (box) box.scrollTop = 0;
    }
  }

  function closeOffer() {
    var modal = $('#offer-modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (state.pendingHistoryId) state.historyPromptDismissed[state.pendingHistoryId] = true;
    if (state.pendingContactsUnlock) state.contactPromptDismissed = true;
    state.pendingHistoryId = null;
    state.pendingContactsUnlock = false;
    var box = $('#messages');
    if (box) box.style.overflowY = 'auto';
    var list = $('#chat-list');
    if (list) list.style.overflowY = 'auto';
    if (previousFocus && document.body.contains(previousFocus)) previousFocus.focus();
  }

  function closeChat() {
    var id = state.activeId;
    if (!id) return;
    saveDraft();
    state.activeId = null;
    state.divider = null;
    renderAll();
    focusItem(id);
  }

  function markUnread(c) {
    c.markedUnread = true;
    if (state.activeId === c.id) { saveDraft(); state.activeId = null; state.divider = null; renderMain(); }
    refreshSidebar();
    toast('“' + c.name + '” marked as unread');
  }

  function markRead(c) {
    c.unread = 0;
    c.markedUnread = false;
    refreshSidebar();
    toast('“' + c.name + '” marked as read');
  }

  function toggleFavorite(c) {
    c.favorite = !c.favorite;
    refreshSidebar();
    renderHeader();
    toast(c.favorite ? 'Added “' + c.name + '” to favorites' : 'Removed “' + c.name + '” from favorites');
  }

  function sendMessage() {
    var c = active(), ta = $('#composer-input');
    if (!c || !ta) return;
    var text = ta.value.replace(/^\s+|\s+$/g, '');
    if (!text) return;
    var msg = { id: 'm' + (seq++), from: 'me', type: 'text', text: text, time: fmtTime(new Date()), day: 'Today', status: 'sent', sortKey: maxKey() + 1 };
    c.messages.push(msg);
    ta.value = '';
    state.drafts[c.id] = '';
    state.divider = null;
    autosize(ta);
    updateSendBtn();
    renderMessages();
    refreshSidebar();
    ta.focus();
    // Simulated delivery receipts — purely cosmetic.
    setTimeout(function () { setStatus(c, msg, 'delivered'); }, 900);
    setTimeout(function () { setStatus(c, msg, 'read'); }, 2300);
  }

  function setStatus(c, msg, status) {
    msg.status = status;
    var row = document.querySelector('.msg-row[data-id="' + msg.id + '"] .ticks');
    if (row) row.outerHTML = ui.ticks(status);
    if (lastMsg(c) === msg) {
      var focusedId = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.id : null;
      var focusedAction = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.action : null;
      renderList();
      if (focusedId && (focusedAction === 'open' || focusedAction === 'chat-menu')) {
        var el = $('[data-action="' + focusedAction + '"][data-id="' + focusedId + '"]');
        if (el) el.focus();
      }
    }
  }

  /* ---------- composer ---------- */
  function autosize(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 140) + 'px';
  }

  function updateSendBtn() {
    var ta = $('#composer-input'), btn = $('#send-btn');
    if (!ta || !btn) return;
    var has = ta.value.trim().length > 0;
    if (has === btn.classList.contains('is-send')) return;
    btn.classList.toggle('is-send', has);
    btn.dataset.action = has ? 'send' : 'mic';
    btn.setAttribute('aria-label', has ? 'Send message' : 'Record voice message');
    btn.innerHTML = ui.icon(has ? 'send' : 'mic');
  }

  function insertAtCursor(text) {
    var ta = $('#composer-input');
    if (!ta) return;
    var s = ta.selectionStart, e = ta.selectionEnd;
    ta.value = ta.value.slice(0, s) + text + ta.value.slice(e);
    ta.selectionStart = ta.selectionEnd = s + text.length;
    ta.focus();
    autosize(ta);
    updateSendBtn();
  }

  /* ---------- menus ---------- */
  var menuEl = null, menuAnchor = null;

  function closeMenu(returnFocus) {
    if (!menuEl) return;
    menuEl.remove();
    menuEl = null;
    if (menuAnchor && menuAnchor.setAttribute) {
      menuAnchor.setAttribute('aria-expanded', 'false');
      if (returnFocus && document.body.contains(menuAnchor)) menuAnchor.focus();
    }
    menuAnchor = null;
  }

  function openMenu(anchor, items, opts) {
    opts = opts || {};
    closeMenu(false);
    var m = document.createElement('div');
    m.className = 'menu' + (opts.grid ? ' grid' : '');
    m.setAttribute('role', 'menu');
    if (opts.label) m.setAttribute('aria-label', opts.label);
    m.innerHTML = items.map(function (it, i) {
      return '<button type="button" role="menuitem" class="menu-item" data-i="' + i + '" tabindex="-1"' +
        (it.aria ? ' aria-label="' + ui.esc(it.aria) + '"' : '') + '>' +
        (it.icon ? ui.icon(it.icon) : '') + '<span>' + ui.esc(it.label) + '</span></button>';
    }).join('');
    document.body.appendChild(m);

    // Position: below the anchor (or at a point), clamped to the viewport.
    var r = opts.point ? { left: opts.point.x, right: opts.point.x, top: opts.point.y, bottom: opts.point.y } : anchor.getBoundingClientRect();
    var mw = m.offsetWidth, mh = m.offsetHeight, vw = window.innerWidth, vh = window.innerHeight;
    var left = opts.point ? r.left : (opts.alignLeft ? r.left : r.right - mw);
    var top = opts.above ? r.top - mh - 6 : r.bottom + 6;
    if (top + mh > vh - 8) top = r.top - mh - 6;
    m.style.left = Math.max(8, Math.min(left, vw - mw - 8)) + 'px';
    m.style.top = Math.max(8, Math.min(top, vh - mh - 8)) + 'px';

    m.addEventListener('click', function (e) {
      var b = e.target.closest('[data-i]');
      if (!b) return;
      var it = items[+b.dataset.i];
      closeMenu(!it.keepFocusAway);
      it.action();
    });
    m.addEventListener('keydown', function (e) {
      var list = Array.prototype.slice.call(m.querySelectorAll('.menu-item'));
      var i = list.indexOf(document.activeElement);
      var cols = opts.grid ? 6 : 1;
      var go = function (n) { e.preventDefault(); list[(n + list.length) % list.length].focus(); };
      if (e.key === 'ArrowDown') go(i + cols);
      else if (e.key === 'ArrowUp') go(i - cols);
      else if (e.key === 'ArrowRight' && opts.grid) go(i + 1);
      else if (e.key === 'ArrowLeft' && opts.grid) go(i - 1);
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(list.length - 1);
      else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeMenu(true); }
      else if (e.key === 'Tab') { e.preventDefault(); closeMenu(true); }
    });

    menuEl = m;
    menuAnchor = anchor;
    if (anchor && anchor.setAttribute) anchor.setAttribute('aria-expanded', 'true');
    m.querySelector('.menu-item').focus();
  }

  function chatMenu(id, anchor, point) {
    var c = getChat(id);
    openMenu(anchor, [
      isUnread(c)
        ? { label: 'Mark as read', icon: 'dcheck', action: function () { markRead(c); focusItem(id); } }
        : { label: 'Mark as unread', icon: 'unread', action: function () { markUnread(c); focusItem(id); } },
      { label: c.favorite ? 'Remove from favorites' : 'Add to favorites', icon: 'star', action: function () { toggleFavorite(c); focusItem(id); } },
      { label: c.pinned ? 'Unpin chat' : 'Pin chat', icon: 'pin', action: function () {
        c.pinned = !c.pinned; refreshSidebar(); focusItem(id); toast(c.pinned ? 'Chat pinned' : 'Chat unpinned');
      } },
      { label: c.muted ? 'Unmute notifications' : 'Mute notifications', icon: 'mute', action: function () {
        c.muted = !c.muted; refreshSidebar(); focusItem(id); toast(c.muted ? 'Notifications muted' : 'Notifications unmuted');
      } }
    ], { label: 'Options for ' + c.name, point: point });
  }

  /* ---------- action dispatch ---------- */
  var actions = {
    open: function (el) { openChat(el.dataset.id); },
    'chat-menu': function (el) { if (paidMode) return; if (spendCredits(1000)) chatMenu(el.dataset.id, el); },
    filter: function (el) {
      state.filter = el.dataset.filter;
      renderChips();
      renderList();
      $('#filters [data-filter="' + state.filter + '"]').focus();
    },
    'clear-search': function () {
      var s = $('#search');
      s.value = '';
      state.query = '';
      $('.clear-search').hidden = true;
      renderList();
      s.focus();
    },
    rail: function (el) {
      var label = el.dataset.label;
      if (label === 'Chats') { if (state.activeId && isMobile()) closeChat(); else $('#search').focus(); return; }
      /* other sections are blocked: the not-allowed cursor is the feedback */
    },
    back: function () { closeChat(); },
    profile: function (el) {
      if (paidMode) return;
      var avatar = el.closest('.avatar') || el.querySelector('.avatar');
      if (!avatar) return;
      var id = avatar.dataset.profileId;
      if (state.loadingProfiles[id] || state.unlockedProfiles[id] || !spendCredits(1000)) return;
      state.loadingProfiles[id] = true;
      refreshSidebar();
      renderHeader();
      setLongTimeout(function () {
        delete state.loadingProfiles[id];
        state.unlockedProfiles[id] = true;
        saveFlagMap(STORAGE.profiles, state.unlockedProfiles);
        refreshSidebar();
        renderHeader();
        toast('Profile photo loaded');
      }, 500000000);
    },
    'unlock-media': function (el) {
      loadMedia(el, 'photo');
    },
    'unlock-audio': function (el) {
      loadMedia(el, 'audio');
    },
    'unlock-history': function () { if (!paidMode) showHistoryUnlock(state.activeId); },
    'confirm-history': function () { confirmHistoryUnlock(); },
    'unlock-contacts': function () { showContactUnlock(true); },
    'confirm-contacts': function () { confirmContactsUnlock(); },
    'toggle-packs': function () { toggleCreditPacks(); },
    'checkout-package': function (el) { checkoutPackage(el); },
    'open-packs': function () {
      closeOffer();
      if (isMobile() && state.activeId) closeChat();
      toggleCreditPacks(true);
      $('#credit-packs').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  /* ---------- events ---------- */
  function bind() {
    $('.offer-close').addEventListener('click', closeOffer);
    $('#session-extend').addEventListener('click', extendSession);
    $('#session-add-time').addEventListener('click', extendSession);
    $('#session-packs-toggle').addEventListener('click', function () {
      var packs = $('#session-packs'), button = $('#session-packs-toggle');
      packs.hidden = !packs.hidden;
      button.setAttribute('aria-expanded', packs.hidden ? 'false' : 'true');
    });
    document.addEventListener('scroll', function (e) {
      var box = e.target;
      if (!box) return;
      if (box.id === 'chat-list') {
        if (state.unlockedContacts || state.chats.length <= 6) return;
        var atBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 12;
        if (!atBottom) state.contactPromptDismissed = false;
        else showContactUnlock();
        return;
      }
      if (box.id !== 'messages') return;
      var c = active();
      if (!c) return;
      if (box.scrollTop > 12) { state.historyPromptDismissed[c.id] = false; return; }
      if (c.messages.length > 10 && !state.unlockedConversations[c.id] && !state.historyPromptDismissed[c.id]) showHistoryUnlock(c.id);
    }, true);
    document.addEventListener('click', function (e) {
      if (e.target === $('#offer-modal')) { closeOffer(); return; }
      // Clicking outside an open menu closes it (clicking its own button toggles it off).
      if (menuEl && !menuEl.contains(e.target)) {
        var onAnchor = menuAnchor && menuAnchor.contains && menuAnchor.contains(e.target);
        closeMenu(false);
        if (onAnchor) return;
      }
      var el = e.target.closest('[data-action]');
      if (el && actions[el.dataset.action]) actions[el.dataset.action](el);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !$('#offer-modal').hidden) { e.stopImmediatePropagation(); closeOffer(); return; }
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-action="unlock-media"]')) {
        e.preventDefault();
        actions['unlock-media'](e.target);
      }
    });

    document.addEventListener('contextmenu', function (e) {
      var row = e.target.closest('.chat-row');
      if (!row) return;
      e.preventDefault();
      var btn = row.querySelector('.chat-more');
      if (spendCredits(1000)) chatMenu(btn.dataset.id, btn, { x: e.clientX, y: e.clientY });
    });

    window.addEventListener('resize', function () { closeMenu(false); });

    var search = $('#search');
    search.addEventListener('input', function () {
      state.query = search.value;
      $('.clear-search').hidden = !search.value;
      renderList();
    });
    search.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && search.value) { e.preventDefault(); e.stopPropagation(); actions['clear-search'](); }
      else if (e.key === 'ArrowDown' || e.key === 'Enter') {
        var first = $('.chat-item');
        if (first) { e.preventDefault(); if (e.key === 'Enter') openChat(first.dataset.id); else first.focus(); }
      }
    });

    // Arrow-key navigation inside the chat list.
    $('#chat-list').addEventListener('keydown', function (e) {
      var item = e.target.closest('.chat-item');
      if (!item) return;
      var items = Array.prototype.slice.call(document.querySelectorAll('.chat-item'));
      var i = items.indexOf(item);
      if (e.key === 'ArrowDown' && i < items.length - 1) { e.preventDefault(); items[i + 1].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? items[i - 1] : search).focus(); }
      else if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
      else if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
        e.preventDefault();
        if (spendCredits(1000)) chatMenu(item.dataset.id, item.parentElement.querySelector('.chat-more'));
      }
    });

    // Composer (delegated because it is re-rendered per chat).
    document.addEventListener('input', function (e) {
      if (e.target.id !== 'composer-input') return;
      autosize(e.target);
      updateSendBtn();
      if (state.activeId) state.drafts[state.activeId] = e.target.value;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menuEl && state.activeId) {
        var ta = $('#composer-input');
        if (document.activeElement === ta && ta.value) return;
        closeChat();
      }
    });
  }

  /* ---------- boot ---------- */
  renderRail();
  $('#search-icon').innerHTML = ui.icon('search');
  $('#clear-icon').innerHTML = ui.icon('close');
  $('#list-menu-btn').innerHTML = ui.icon('dots');
  $('#new-chat-btn').innerHTML = ui.icon('plus');
  $('#title-logo').innerHTML = ui.icon('logo');
  bind();
  renderAll();
  renderWallet();
  renderSession();
  window.setInterval(renderSession, 1000);
  document.addEventListener('visibilitychange', renderSession);
})();
