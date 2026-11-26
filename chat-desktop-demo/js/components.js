/*
 * Reusable UI components. Each function returns an HTML string;
 * app.js decides where and when they are rendered.
 */
(function () {
  'use strict';
  var I = SpyWhatsApp.icons, A = SpyWhatsApp.assets;
  var paidMode = document.body.classList.contains('saas2-mode');
  var assetPrefix = paidMode || document.body.classList.contains('saas3-mode') ? '../' : '';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (I[name] || '') + '</svg>';
  }

  // Profile photo slot: loads avatars/<id>.jpg if you add it, otherwise shows the default silhouette.
  var DEFAULT_AVATAR = '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect width="64" height="64" fill="#3b4a54"/>' +
    '<circle cx="32" cy="25" r="11" fill="#8696a0"/><path d="M10 62c2-12 11-18 22-18s20 6 22 18z" fill="#8696a0"/></svg>';
  function avatar(id, size, profile, unlocked, loading) {
    var locked = !unlocked;
    var lock = loading
      ? '<span class="avatar-loading" role="status" aria-label="Loading profile photo"><i class="credit-spinner"></i></span>'
      : locked ? '<span class="avatar-lock" aria-hidden="true">' + icon('lock') + '</span>' : '';
    var portrait = profile ? A.avatar(profile) : DEFAULT_AVATAR;
    return '<span class="avatar' + (locked ? ' avatar-locked' : unlocked ? ' profile-unlocked' : '') + (loading ? ' profile-loading' : '') + '"' +
      (paidMode ? ' aria-label="Profile photo locked" title="Profile photo locked"' : ' data-action="profile" aria-label="View profile photo for 1,000 credits" title="View profile photo · 1,000 credits"') +
      ' data-profile-id="' + esc(id) + '" style="--size:' + size + 'px">' + portrait +
      '<img src="' + assetPrefix + 'avatars/' + esc(id) + '.jpg" alt="" onerror="this.remove()">' + lock + '</span>';
  }

  function ticks(status) {
    var label = { sent: 'Sent', delivered: 'Delivered', read: 'Read' }[status] || 'Sent';
    return '<span class="ticks ' + status + '" role="img" aria-label="' + label + '">' + icon(status === 'sent' ? 'check' : 'dcheck') + '</span>';
  }

  function lastMsg(c) { return c.messages[c.messages.length - 1]; }
  function senderName(c, key) { return (c.members && c.members[key]) ? c.members[key].name : key; }
  function timeLabel(m) { return m.day === 'Today' ? m.time : m.day; }

  function messageSummary(m) {
    if (m.type === 'image') return m.caption || 'Photo';
    if (m.type === 'audio') return 'Voice message (' + m.duration + ')';
    if (m.type === 'viewonce') return 'View once photo';
    return m.text;
  }

  function preview(c, draft) {
    if (draft) return '<span class="draft">Draft:</span> ' + esc(draft);
    var m = lastMsg(c), pre = '', body;
    if (m.from === 'me') pre = ticks(m.status) + ' ';
    else if (c.type === 'group') pre = '<span class="sender">' + esc(senderName(c, m.from)) + ':</span> ';
    if (m.type === 'image') body = icon('camera', 'inline') + ' ' + esc(m.caption || 'Photo');
    else if (m.type === 'audio') body = icon('mic', 'inline') + ' ' + esc(m.duration);
    else if (m.type === 'viewonce') body = icon('viewOnce', 'inline') + ' Photo';
    else body = esc(m.text);
    return pre + body;
  }

  function chatItem(c, opts) {
    var m = lastMsg(c);
    var sensitive = !!opts.sensitive;
    var unread = c.unread > 0, marked = c.markedUnread && !unread;
    var label = sensitive ? 'Sensitive contact locked.' : c.name + (c.type === 'group' ? ' (group)' : '') +
      (unread ? ', ' + c.unread + ' unread message' + (c.unread > 1 ? 's' : '') : marked ? ', marked as unread' : '') +
      (c.pinned ? ', pinned' : '') + (c.favorite ? ', favorite' : '') + (c.muted ? ', muted' : '') +
      (paidMode ? '. Open conversation.' : '. Open conversation for 200 credits.');

    return '<li class="chat-row' + (opts.active ? ' active' : '') + (unread || marked ? ' is-unread' : '') + (sensitive ? ' is-sensitive' : '') + '">' +
      '<button class="chat-item" type="button" data-action="open" data-id="' + c.id + '"' + (sensitive ? ' disabled' : '') + (opts.active ? ' aria-current="true"' : '') +
      ' aria-label="' + esc(label) + '">' +
        avatar(c.id, 49, c.avatar, opts.profileUnlocked, opts.profileLoading) +
        '<span class="chat-body">' +
          '<span class="chat-top"><span class="chat-name">' + esc(c.name) + '</span><span class="chat-time">' + esc(timeLabel(m)) + '</span></span>' +
          '<span class="chat-bottom"><span class="chat-preview chat-credit-hint">' + (paidMode ? 'Open conversation' : 'Open conversation · 200 credits') + '</span>' +
            '<span class="chat-badges">' +
              (c.muted ? icon('mute', 'badge-icon') : '') +
              (c.pinned ? icon('pin', 'badge-icon') : '') +
              (unread ? '<span class="badge">' + c.unread + '</span>' : marked ? '<span class="badge dot"></span>' : '') +
            '</span></span>' +
        '</span>' +
      '</button>' +
      '<button class="chat-more' + (paidMode ? ' locked' : '') + '" type="button"' + (paidMode ? ' disabled aria-disabled="true"' : '') + ' data-action="chat-menu" data-id="' + c.id + '" aria-label="Contact menu for ' + esc(c.name) + (paidMode ? ', locked' : ', 1,000 credits') + '" aria-haspopup="menu" aria-expanded="false">' +
        icon('chevronDown') + '</button>' +
    '</li>';
  }

  function rail(me, profileUnlocked, profileLoading) {
    var btn = function (label, ic, extra, cls) {
      var chats = label === 'Chats';
      return '<button class="rail-btn ' + (cls || '') + (chats ? '' : ' locked') + '" type="button" data-action="rail" data-label="' + label + '"' +
        ' aria-label="' + label + (chats ? '' : ' (unavailable)') + '" title="' + label + '"' +
        (chats ? ' aria-current="page"' : ' aria-disabled="true"') + '>' + ic + (extra || '') + '</button>';
    };
    return '<div class="rail-group">' +
        btn('Chats', icon('chats'), '<span class="rail-badge" id="rail-badge"></span>', 'active') +
        btn('Calls', icon('phone')) +
        btn('Status', icon('status'), '<span class="rail-dot"></span>') +
        btn('Channels', icon('channels'), '', 'rail-optional') +
        btn('Communities', icon('communities')) +
        '<hr class="rail-sep">' +
        btn('Archived', icon('archive'), '<span class="rail-badge">2</span>', 'rail-optional') +
      '</div>' +
      '<div class="rail-group">' +
        btn('Media', icon('media'), '', 'rail-optional') +
        btn('Settings', icon('settings')) +
        btn('Profile', avatar('me', 28, me.avatar, profileUnlocked, profileLoading), '', 'rail-optional rail-profile') +
      '</div>';
  }

  function chips(state, counts) {
    var defs = [['all', 'All'], ['unread', 'Unread', counts.unread], ['favorites', 'Favorites'], ['groups', 'Groups', counts.groups]];
    return defs.map(function (f) {
      return '<button class="chip" type="button" data-action="filter" data-filter="' + f[0] + '" aria-pressed="' + (state.filter === f[0]) + '">' +
        f[1] + (f[2] ? ' <span class="chip-count">' + f[2] + '</span>' : '') + '</button>';
    }).join('') +
      '<button class="chip chip-icon locked" type="button" aria-disabled="true" aria-label="More filters (unavailable)">' + icon('chevronDown') + '</button>';
  }

  function listEmpty(state) {
    var q = state.query.trim();
    if (q) {
      return '<div class="list-empty">' + icon('search') + '<p>No chats found for <strong>“' + esc(q) + '”</strong></p>' +
        '<p class="muted">Try another name — search looks at contact and group names.</p>' +
        '<button class="link-btn" type="button" data-action="clear-search">Clear search</button></div>';
    }
    var text = {
      unread: ['No unread chats', 'You’re all caught up. 🎉'],
      favorites: ['No favorites yet', 'Open a chat’s menu and choose “Add to favorites”.'],
      groups: ['No groups', 'Groups you join will show up here.']
    }[state.filter] || ['No chats', ''];
    return '<div class="list-empty">' + icon(state.filter === 'favorites' ? 'star' : 'chats') + '<p>' + text[0] + '</p>' +
      '<p class="muted">' + text[1] + '</p>' +
      '<button class="link-btn" type="button" data-action="filter" data-filter="all">View all chats</button></div>';
  }

  function welcome() {
    var actions = [['doc', 'Send document'], ['addContact', 'Add contact'], ['mail', 'Invite friends'], ['sparkle', 'Ask assistant']];
    return '<section class="welcome" aria-labelledby="welcome-title">' +
      '<h2 id="welcome-title" class="sr-only">No chat selected</h2>' +
      '<div class="welcome-actions">' + actions.map(function (a) {
        return '<button class="welcome-btn locked" type="button" aria-disabled="true" aria-label="' + a[1] + ' (unavailable)"><span class="welcome-icon">' + icon(a[0]) + '</span><span>' + a[1] + '</span></button>';
      }).join('') + '</div>' +
      '<p class="welcome-hint">Pick a conversation on the left to start chatting.</p>' +
      '<p class="welcome-foot">' + icon('lock', 'inline') + ' Sample interface — messages stay in this browser</p>' +
    '</section>';
  }

  function convHeader(c, profileUnlocked, profileLoading) {
    var status = c.type === 'group'
      ? Object.keys(c.members).map(function (k) { return c.members[k].name; }).join(', ') + ', You'
      : c.status;
    return '<header class="conv-header" id="conv-header">' +
      '<button class="icon-btn back-btn" id="back-btn" type="button" data-action="back" aria-label="Back to chats">' + icon('back') + '</button>' +
      '<button class="conv-contact" type="button" data-action="profile" aria-label="Ver perfil de ' + esc(c.name) + '">' +
        avatar(c.id, 40, c.avatar, profileUnlocked, profileLoading) +
        '<span class="conv-titles"><span class="conv-name">' + esc(c.name) + '</span>' +
        '<span class="conv-status' + (status === 'online' ? ' online' : '') + '">' + esc(status) + '</span></span>' +
      '</button>' +
      '<div class="conv-actions">' +
        '<button class="icon-btn locked" type="button" aria-disabled="true" aria-label="Video call (unavailable)">' + icon('video') + '</button>' +
        '<button class="icon-btn locked" type="button" aria-disabled="true" aria-label="Voice call (unavailable)">' + icon('phone') + '</button>' +
        '<button class="icon-btn locked hide-sm" type="button" aria-disabled="true" aria-label="Search messages (unavailable)">' + icon('search') + '</button>' +
        '<button class="icon-btn locked" type="button" aria-disabled="true" aria-label="Chat menu (unavailable)">' + icon('dots') + '</button>' +
      '</div>' +
    '</header>';
  }

  function notice() {
    return '<div class="e2e-notice">' + icon('lock', 'inline') +
      '<span>Fictional conversation — messages stay on this page.</span></div>';
  }

  function daySep(label) { return '<div class="day-sep"><span>' + esc(label) + '</span></div>'; }

  function unreadDivider(n) {
    return '<div class="unread-divider"><span>' + n + ' unread message' + (n > 1 ? 's' : '') + '</span></div>';
  }

  function historyGate() {
    return '<div class="history-gate"><span>OLDER MESSAGES HIDDEN</span>' +
      '<button type="button" data-action="unlock-history">Unlock history · 1,000 credits</button></div>';
  }

  function contactGate() {
    return '<li class="contact-gate"><span>MORE CONTACTS LOCKED</span>' +
      '<button type="button" data-action="unlock-contacts">View unlock option · 1,000 credits</button></li>';
  }

  function waveform(seed) {
    var h = 0, bars = '';
    for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    for (var b = 0; b < 34; b++) {
      h = (h * 1103515245 + 12345) >>> 0;
      bars += '<i style="height:' + (4 + (h % 19)) + 'px"></i>';
    }
    return bars;
  }

  function audioBody(m, c, unlocked, loading, profileUnlocked, profileLoading) {
    var out = m.from === 'me';
    var face = !out && c.type === 'direct'
      ? '<span class="audio-face">' + avatar(c.id, 40, c.avatar, profileUnlocked, profileLoading) + '<span class="mic-badge">' + icon('mic') + '</span></span>'
      : '<span class="audio-face mic-only">' + icon('mic') + '</span>';
    return '<div class="audio' + (unlocked ? ' is-unlocked' : '') + (loading ? ' is-loading' : '') + '" role="group" data-action="unlock-audio" data-id="' + m.id + '" aria-label="Voice message, ' + esc(m.duration) + '. Costs 500 credits to open.">' +
      (out ? '' : face) +
      '<button class="audio-play" type="button" aria-label="Open audio for 500 credits">' + icon('play') + '</button>' +
      '<div class="audio-main"><div class="wave" aria-hidden="true">' + waveform(m.id + m.duration) + '</div>' +
        '<div class="audio-sub"><span>' + esc(m.duration) + '</span>' + (loading ? '<span>Loading audio…</span>' : unlocked ? '<span class="audio-unlocked-label">Audio preview ready</span>' : '<span>500 credits</span>') + '</div></div>' +
      (out ? face : '') +
      (loading ? '<span class="audio-loading" role="status"><i class="credit-spinner"></i>Loading audio…</span>' : '') +
    '</div>';
  }

  function message(m, c, opts) {
    var out = m.from === 'me';
    var meta = '<span class="meta' + (m.type === 'image' && !m.caption ? ' on-media' : '') + '"><time>' + esc(m.time) + '</time>' + (out ? ticks(m.status) : '') + '</span>';
    var sender = !out && c.type === 'group' && opts.tail
      ? '<div class="sender-name" style="color:' + c.members[m.from].color + '">' + esc(senderName(c, m.from)) + '</div>' : '';
    var kind = '', body;

    if (m.type === 'image') {
      kind = ' media-bubble';
      // Empty slot: shows img/<art>.jpg if you add that file, otherwise stays blank.
      body = '<figure class="media' + (opts.unlocked ? ' is-unlocked' : '') + (opts.loading ? ' is-loading' : '') + '" data-action="unlock-media" data-id="' + m.id + '" tabindex="0" role="button" aria-label="Open photo for 500 credits"><div class="media-art' + (opts.unlocked ? ' is-unlocked' : '') + '" role="img" aria-label="Photo">' +
        A.illustration(m.art) + (opts.loading ? '<span class="media-loading" role="status"><i class="credit-spinner"></i><small>Loading photo…</small></span>' : opts.unlocked ? '' : '<span class="media-lock">' + icon('lock') + '<small>500 credits</small></span>') + '</div>' +
        (m.caption ? '<figcaption class="text-wrap"><span class="text">' + esc(m.caption) + '</span><span class="meta-spacer"></span></figcaption>' : '') +
        '</figure>';
    } else if (m.type === 'viewonce') {
      kind = ' viewonce-bubble';
      body = '<figure class="media' + (opts.unlocked ? ' is-unlocked' : '') + (opts.loading ? ' is-loading' : '') + '" data-action="unlock-media" data-id="' + m.id + '" tabindex="0" role="button" aria-label="Open photo for 500 credits"><div class="media-art' + (opts.unlocked ? ' is-unlocked' : '') + '" role="img" aria-label="View-once photo preview">' +
        A.illustration(m.art || 'sunset') + (opts.loading ? '<span class="media-loading" role="status"><i class="credit-spinner"></i><small>Loading photo…</small></span>' : opts.unlocked ? '' : '<span class="media-lock">' + icon('lock') + '<small>500 credits</small></span>') + '</div><figcaption class="viewonce-caption">' + icon('viewOnce') + '<span>View-once photo</span></figcaption></figure>';
    } else if (m.type === 'audio') {
      kind = ' audio-bubble';
      body = audioBody(m, c, opts.unlocked, opts.loading, opts.profileUnlocked, opts.profileLoading);
    } else {
      body = '<div class="text-wrap"><span class="text">' + esc(m.text) + '</span><span class="meta-spacer"></span></div>';
    }

    return '<div class="msg-row ' + (out ? 'out' : 'in') + (opts.tail ? ' tail' : '') + '" data-id="' + m.id + '">' +
      '<div class="bubble' + kind + '">' + sender + body + meta + '</div></div>';
  }

  function composer() {
    return '<footer class="composer">' +
      '<div class="composer-box blocked" aria-disabled="true">' +
        '<button class="icon-btn" type="button" disabled aria-label="Attach (unavailable)">' + icon('plus') + '</button>' +
        '<button class="icon-btn" type="button" disabled aria-label="Emoji (unavailable)">' + icon('emoji') + '</button>' +
        '<label for="composer-input" class="sr-only">Messaging unavailable</label>' +
        '<textarea id="composer-input" rows="1" placeholder="Messaging unavailable" autocomplete="off" disabled></textarea>' +
        '<button class="send-btn" id="send-btn" type="button" disabled aria-label="Messaging unavailable">' + icon('send') + '</button>' +
      '</div>' +
    '</footer>';
  }

  window.SpyWhatsApp.ui = {
    esc: esc, icon: icon, avatar: avatar, ticks: ticks, chatItem: chatItem, rail: rail, chips: chips,
    listEmpty: listEmpty, welcome: welcome, convHeader: convHeader, notice: notice, daySep: daySep,
    unreadDivider: unreadDivider, historyGate: historyGate, contactGate: contactGate, message: message, composer: composer
  };
})();
