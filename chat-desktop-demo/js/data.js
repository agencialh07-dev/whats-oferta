/*
 * Sample data — every contact, group and message here is fictional.
 * Nothing is loaded from or sent to any server.
 *
 * Message helpers:
 *   t(from, time, text, status)                 text message
 *   img(from, time, art, caption, alt, status)   static sample illustration
 *   aud(from, time, duration, status)            decorative voice note
 *   vo(from, time, status)                       "view once" photo bubble
 * Image messages load img/<art>.jpg — drop your own files there with those names.
 * If a file is missing, the bubble keeps an empty space.
 * `from` is "me", "them" (direct chats) or a member key (groups).
 * `status` (only for "me") is "sent" | "delivered" | "read".
 */
(function () {
  'use strict';

  var d = function (label, offset, messages) { return { label: label, offset: offset, messages: messages }; };
  var t = function (from, time, text, status) { return { type: 'text', from: from, time: time, text: text, status: status }; };
  var img = function (from, time, art, caption, alt, status) {
    return { type: 'image', from: from, time: time, art: art, caption: caption, alt: alt, status: status };
  };
  var aud = function (from, time, duration, status) { return { type: 'audio', from: from, time: time, duration: duration, status: status }; };
  var vo = function (from, time, status, art) { return { type: 'viewonce', from: from, time: time, status: status, art: art }; };

  var TODAY = 0, YESTERDAY = -1, SUNDAY = -2, SATURDAY = -3, FRIDAY = -4;

  window.SpyWhatsApp = window.SpyWhatsApp || {};
  window.SpyWhatsApp.data = {
    me: { name: 'You', avatar: { bg: '#5b6b7a', skin: '#e9c3a0', hair: 'short', hairColor: '#40302a', shirt: '#21c063' } },

    chats: [
      {
        id: 'sophie', name: 'Riley', type: 'direct', status: 'online',
        pinned: true, favorite: true, muted: false, unread: 0,
        avatar: { bg: '#f6b8c8', skin: '#f2c9a8', hair: 'long', hairColor: '#6b3f26', shirt: '#3f7d5c' },
        history: [
          d('Yesterday', YESTERDAY, [
            t('them', '10:12 PM', 'Still grinning about last night. Sneaking out after your roommates went to bed was worth every quiet step 😉'),
            t('me', '10:15 PM', 'You almost laughed loud enough to wake the whole place up 😭', 'read'),
            t('them', '10:16 PM', 'Only because you looked way too pleased with yourself 😏'),
            t('me', '10:17 PM', "Text me when they're asleep next time... I'll meet you by the side door 💛", 'read')
          ]),
          d('Today', TODAY, [
            t('them', '7:42 AM', 'Morning ☀️ Did you get back in without waking anyone?'),
            t('me', '7:58 AM', "Barely 😂 I still can't stop thinking about last night", 'read'),
            t('them', '8:01 AM', 'Good. I was hoping you would be a little distracted today 😉'),
            vo('them', '12:28 PM', undefined, 'private-1'),
            img('them', '12:30 PM', 'private-2', 'This was from that quiet spot we snuck off to. Still thinking about last night 😏', 'Blurred photo'),
            t('me', '12:34 PM', "Same. Next time I'll try not to laugh so loud on the way out 😂", 'read'),
            t('them', '6:10 PM', 'Okay so… dinner Friday? I booked that little Italian place on Maple Ave 🍝'),
            t('me', '6:12 PM', "Lucia's?! You remembered 😍", 'read'),
            aud('them', '6:13 PM', '0:24'),
            aud('me', '6:20 PM', '0:11', 'read'),
            vo('me', '6:22 PM', 'read', 'private-4'),
            t('me', '8:44 PM', "Friday at 7 it is. I'll wear the green dress you like... but you'll have to earn that first dance 😉", 'read'),
            t('them', '8:46 PM', "Challenge accepted. I'll save my best compliments for dessert... and you 😏"),
            t('me', '8:47 PM', 'Now I have two reasons to look forward to Friday 😘', 'read')
          ])
        ]
      },

      {
        id: 'crew', name: 'The Weekend Crew', type: 'group',
        pinned: true, favorite: false, muted: false, unread: 4,
        avatar: { art: 'van' },
        members: {
          ethan: { name: 'Jordan', color: '#53bdeb' },
          mia: { name: 'Casey', color: '#f59fb8' },
          jake: { name: 'Jake', color: '#ffd279' },
          priya: { name: 'Priya', color: '#a5e57a' }
        },
        history: [
          d('Yesterday', YESTERDAY, [
            t('mia', '6:00 PM', "Okay crew — lake trip in two weeks. Who's in? 🏕️"),
            t('jake', '6:02 PM', 'IN'),
            t('priya', '6:05 PM', 'In, as long as someone else drives 😅'),
            t('me', '6:09 PM', 'I can drive. The van fits six', 'read'),
            t('ethan', '6:10 PM', 'road trip playlist is my responsibility. no objections allowed')
          ]),
          d('Today', TODAY, [
            t('ethan', '10:20 AM', 'THE FIRE PIT 🔥'),
            t('priya', '10:31 AM', 'Split six ways it comes to about $58 each'),
            t('me', '12:02 PM', 'Booking it tonight unless anyone objects', 'read'),
            t('jake', '7:10 PM', "no objections. I'm in charge of s'mores"),
            t('priya', '7:18 PM', 'Packing list coming tomorrow'),
            t('ethan', '7:19 PM', 'bringing the speaker 🔊')
          ])
        ]
      },

      {
        id: 'ethan', name: 'Jordan', type: 'direct', status: 'last seen today at 7:35 PM',
        pinned: false, favorite: false, muted: false, unread: 3,
        avatar: { bg: '#8ec5ff', skin: '#e8b690', hair: 'short', hairColor: '#2b1d16', shirt: '#ff7a45' },
        history: [
          d('Yesterday', YESTERDAY, [
            t('them', '11:20 PM', 'bro that last round was criminal'),
            t('me', '11:21 PM', 'I had 2 HP and a dream', 'read'),
            t('them', '11:21 PM', 'the dream died 💀'),
            t('them', '11:22 PM', 'respectfully')
          ]),
          d('Today', TODAY, [
            t('me', '4:20 PM', "How'd you get past the lava bridge? I grabbed lunch and came back to find my character gone 😂", 'read'),
            t('them', '4:22 PM', 'Third block. Double jump and trust it lol'),
            t('them', '4:23 PM', 'Jake made a meme about your 2 HP moment 😭'),
            t('me', '4:30 PM', 'I want royalties. Also, have you eaten anything today or just had coffee?', 'read'),
            t('them', '4:31 PM', 'Coffee and half a sandwich. I know, I know 😅'),
            t('them', '7:31 PM', 'Saturday still on? Co-op, pizza, and an actual dinner this time 🍕'),
            t('them', '7:32 PM', "I'll bring the extra controller. You pick the toppings"),
            aud('them', '7:33 PM', '0:38')
          ])
        ]
      },

      {
        id: 'olivia', name: 'Morgan', type: 'direct', status: 'last seen today at 5:21 PM',
        pinned: false, favorite: true, muted: false, unread: 0,
        avatar: { bg: '#c9bcff', skin: '#8a5a3c', hair: 'bun', hairColor: '#1b1310', shirt: '#2f3e66', glasses: true },
        history: [
          d('Yesterday', YESTERDAY, [
            t('them', '5:40 PM', 'Quick heads-up: the client moved the review to tomorrow at 4'),
            t('me', '5:42 PM', "Got it. I'll finish the deck tonight", 'read')
          ]),
          d('Today', TODAY, [
            t('them', '9:02 AM', 'Morning! I grabbed coffee. Did you get a chance to look at slides 4–7?'),
            t('me', '9:15 AM', 'Yep, left a few comments. Slide 6 still needs the Q3 numbers', 'read'),
            t('them', '9:16 AM', "On it 👍 I'll send the updated deck before lunch."),
            t('them', '11:48 AM', 'Updated version is ready. Sorry, got pulled into a last-minute call.'),
            t('me', '11:52 AM', 'No worries. Looks much better—can we move the legend under the bars?', 'read'),
            t('them', '11:53 AM', 'Done. Finally stepping away for lunch 😅'),
            t('them', '2:30 PM', 'Quick reminder: dry run with Mark at 3:30. Are you bringing the adapter?'),
            t('me', '2:31 PM', 'Yep, room 3B is booked. Adapter is already in my bag 📌', 'read'),
            t('me', '5:12 PM', 'Great job today. The client loved it. I’m logging off before another call pops up', 'read'),
            t('them', '5:20 PM', "Team effort 🙌 Go enjoy your evening. I'll send the follow-up tomorrow")
          ])
        ]
      },

      {
        id: 'noah', name: 'Parker', type: 'direct', status: 'online',
        pinned: false, favorite: false, muted: false, unread: 1,
        avatar: { bg: '#ffd37a', skin: '#c48a5c', hair: 'curly', hairColor: '#3a2417', shirt: '#5b4636', beard: true },
        history: [
          d('Yesterday', YESTERDAY, [
            t('them', '3:10 PM', "Found a coffee spot by the office — Ember & Oak. Their cold brew's actually good ☕"),
            t('me', '3:14 PM', 'Better than Grind House?', 'read'),
            t('them', '3:15 PM', "Don't make me choose... okay, yeah. Better. Wanna grab one after work?"),
            vo('them', '3:15 PM', undefined, 'private-5'),
            img('them', '3:16 PM', 'private-6', 'Look at this latte art. I almost felt bad drinking it ☕', 'Blurred photo'),
            t('them', '10:30 PM', "Still thinking about last night. Sneaking out after your roommate went to bed was kinda thrilling 😉"),
            t('me', '10:33 PM', 'You were trying so hard not to laugh on the stairs. I thought we were gonna get caught 😏', 'read'),
            t('them', '10:35 PM', "Next time, wait for my text when the house is quiet. I'll meet you outside 😉")
          ]),
          d('Today', TODAY, [
            t('me', '1:05 PM', 'Need a movie for tonight. Pick something we might actually watch this time 😏', 'read'),
            t('them', '1:20 PM', '"Paper Lanterns" if you want cozy. "The Quiet Orbit" if you want slow sci-fi with a ridiculous soundtrack'),
            t('me', '1:22 PM', "Both on the list. Save me the seat next to you? I'll try to behave... no promises 😉", 'read'),
            aud('them', '3:45 PM', '1:02'),
            t('them', '3:47 PM', "That was me humming the theme badly. I'll try to keep the movie on this time... no promises I'll pay attention 😏")
          ])
        ]
      },

      {
        id: 'grace', name: 'Mom', type: 'direct', status: 'last seen today at 11:12 AM',
        pinned: false, favorite: true, muted: false, unread: 0,
        avatar: { bg: '#a8e3c6', skin: '#f3d2b6', hair: 'wavy', hairColor: '#d4d4d4', shirt: '#b55b7d', glasses: true },
        history: [
          d('Yesterday', YESTERDAY, [
            t('them', '2:00 PM', 'Hey sweetie! Still coming by Sunday?'),
            t('me', '2:06 PM', "Wouldn't miss it! Want me to bring anything?", 'read'),
            t('them', '2:09 PM', "Just bring your appetite 😊 I'm making lemon chicken"),
            t('me', '2:10 PM', 'The lemon chicken 🙌 save me the crispy bits', 'read')
          ]),
          d('Today', TODAY, [
            t('them', '10:30 AM', 'Tried that brown butter cookie recipe. First batch disappeared already 😂'),
            t('me', '10:45 AM', 'Save me a couple!!', 'read'),
            aud('them', '10:58 AM', '0:51'),
            t('them', '11:02 AM', "The recipe card is on the fridge, I'll make you a copy 💛"),
            t('me', '11:10 AM', "You're the best. See you around 1 on Sunday?", 'delivered')
          ])
        ]
      },

      {
        id: 'dad', name: 'Dad', type: 'direct', status: 'last seen today at 9:42 AM',
        pinned: false, favorite: true, muted: false, unread: 0,
        avatar: { bg: '#9fb8d9', skin: '#e2b48f', hair: 'buzz', hairColor: '#b8b8b8', shirt: '#3d5a80', beard: true, glasses: true },
        history: [
          d('Yesterday', YESTERDAY, [
            t('them', '7:05 PM', 'Did you get the oil changed yet?'),
            t('me', '7:20 PM', 'Tomorrow morning, promise', 'read'),
            t('them', '7:21 PM', "Good. Don't wait until the light comes on 😄")
          ]),
          d('Today', TODAY, [
            t('them', '8:15 AM', "Game's Sunday at 4. You sticking around for lunch after?"),
            t('me', '9:30 AM', "Yep! I'll bring wings 🍗", 'read'),
            t('them', '9:32 AM', 'That’s my kid 👍'),
            aud('them', '9:34 AM', '0:19'),
            t('me', '9:41 AM', 'Haha deal. See you Sunday, Dad', 'read')
          ])
        ]
      },

      {
        id: 'daniel', name: 'Drew', type: 'direct', status: 'last seen yesterday at 9:02 PM',
        pinned: false, favorite: false, muted: false, unread: 0,
        avatar: { bg: '#ffb48c', skin: '#efc09a', hair: 'buzz', hairColor: '#b9823e', shirt: '#2d6cdf', beard: true },
        history: [
          d('Yesterday', YESTERDAY, [
            t('me', '6:30 PM', 'Hey, still need that ladder this week?', 'read'),
            t('them', '8:55 PM', 'Yep! Finally getting around to that gutter 😅'),
            t('them', '8:56 PM', "I'll bring it back Thursday, promise"),
            t('me', '9:01 PM', "No rush. It's in the garage—the side door's open", 'read'),
            t('them', '9:02 PM', "Thanks, you're a lifesaver 🙏")
          ])
        ]
      },

      {
        id: 'mia', name: 'Casey', type: 'direct', status: 'last seen Sunday at 8:41 PM',
        pinned: false, favorite: false, muted: false, unread: 0,
        avatar: { bg: '#9fe5df', skin: '#e8b894', hair: 'wavy', hairColor: '#b4532a', shirt: '#f2c94c' },
        history: [
          d('Sunday', SUNDAY, [
            t('them', '8:20 PM', 'You finish that puzzle book I lent you yet?'),
            t('me', '8:31 PM', 'Two left. Page 40 is killing me 😂', 'read'),
            t('them', '8:33 PM', '12 across is a cheese 🧀'),
            t('me', '8:40 PM', "...gouda. Wow, how did I miss that", 'read'),
            t('them', '8:41 PM', 'lol told you')
          ])
        ]
      },

      {
        id: 'bookclub', name: 'Book Club 📚', type: 'group',
        pinned: false, favorite: false, muted: true, unread: 2,
        avatar: { art: 'books' },
        members: {
          rachel: { name: 'Rachel', color: '#f7a072' },
          tom: { name: 'Tom', color: '#7ad3ff' },
          ava: { name: 'Avery', color: '#e39bff' },
          lucas: { name: 'Logan', color: '#9be27a' }
        },
        history: [
          d('Sunday', SUNDAY, [
            t('rachel', '4:00 PM', 'Next book: "The Lighthouse Keeper\'s Map" 📖'),
            t('tom', '4:12 PM', 'Heard the ending is wild 👀'),
            t('me', '4:20 PM', 'Tom, no spoilers lol', 'read'),
            t('ava', '5:05 PM', "Book night at my place on the 10th? I'll bring snacks"),
            t('lucas', '5:30 PM', "I'm in. I'll bring tea")
          ])
        ]
      },

      {
        id: 'neighbors', name: 'Maple Street Neighbors', type: 'group',
        pinned: false, favorite: false, muted: true, unread: 0,
        avatar: { art: 'house' },
        members: {
          linda: { name: 'Linda', color: '#ffb86b' },
          greg: { name: 'Greg', color: '#6bd5c4' },
          carlos: { name: 'Carlos', color: '#c3a6ff' }
        },
        history: [
          d('Saturday', SATURDAY, [
            t('linda', '9:15 AM', 'Anyone seen a gray tabby? Answers to Biscuit 🐈'),
            t('greg', '9:40 AM', "Pretty sure I saw him by the Hendersons' porch"),
            t('me', '10:02 AM', "I'll keep an eye out when I walk the dog", 'read'),
            t('linda', '1:47 PM', 'Found him! He was asleep in our garage the whole time 😂 Thanks, everyone!'),
            t('carlos', '1:50 PM', 'Classic Biscuit lol')
          ])
        ]
      },

      {
        id: 'lucas', name: 'Logan', type: 'direct', status: 'last seen Friday at 10:15 PM',
        pinned: false, favorite: false, muted: false, unread: 0,
        avatar: { bg: '#d3e67c', skin: '#6c4530', hair: 'buzz', hairColor: '#120d0a', shirt: '#1f8a70' },
        history: [
          d('Friday', FRIDAY, [
            t('them', '9:30 PM', 'Still on for leg day tomorrow?'),
            t('me', '9:45 PM', 'Ugh, fine. 6? 😭', 'read'),
            t('them', '9:46 PM', '6 AM. No backing out now 💪'),
            t('me', '10:14 PM', 'I regret agreeing already. See you there', 'read')
          ])
        ]
      },

      {
        id: 'ava', name: 'Avery', type: 'direct', status: 'last seen 11/18/2026',
        pinned: false, favorite: false, muted: false, unread: 0,
        avatar: { bg: '#f5c4ee', skin: '#fde1ca', hair: 'long', hairColor: '#e9c46a', shirt: '#7a5cff' },
        history: [
          d('11/18/2026', -6, [
            t('them', '3:00 PM', 'I GOT THE JOB!!!'),
            t('me', '3:02 PM', 'AVERY!!! I knew it! Congratulations 🎉', 'read'),
            t('them', '3:03 PM', "Drinks are on me. I'm still smiling about you waiting till the house was quiet before sneaking out to see me 😉"),
            t('me', '3:05 PM', "Worth every whispered step. Text me when your roommates are asleep next time 😏", 'read')
          ])
        ]
      }
    ]
  };

  // The post-purchase game view has fuller fictional chat histories. Keep the
  // original preview conversations unchanged on the entry page.
  if (document.body.classList.contains('saas2-mode')) {
    function addToday(id, messages) {
      var chat = window.SpyWhatsApp.data.chats.find(function (item) { return item.id === id; });
      if (!chat) return;
      var today = chat.history.find(function (day) { return day.offset === TODAY && day.label === 'Today'; });
      if (!today) {
        today = d('Today', TODAY, []);
        chat.history.push(today);
      }
      messages.forEach(function (message) {
        today.messages.push(t(message[0], message[1], message[2], message[3]));
      });
    }

    addToday('crew', [
      ['mia', '7:28 PM', 'I made a shared checklist for the cabin. Add anything I missed!'],
      ['jake', '7:34 PM', 'Flashlights and extra blankets are on me.'],
      ['me', '7:41 PM', 'I added coffee, mugs, and a first-aid kit.', 'read'],
      ['priya', '7:48 PM', 'Could someone bring a deck of cards?'],
      ['ethan', '8:02 PM', 'Already packed two decks. One is missing a queen, though 😅'],
      ['mia', '8:14 PM', 'That makes it more interesting.'],
      ['me', '8:27 PM', 'I will pick everyone up at 9 on Saturday.', 'read'],
      ['jake', '8:31 PM', 'I will be outside with the s’mores before you arrive.']
    ]);
    addToday('ethan', [
      ['them', '7:36 PM', 'That last level was much easier once we stopped rushing.'],
      ['me', '7:42 PM', 'Turns out reading the map helps 😂', 'read'],
      ['them', '7:51 PM', 'Pizza order is in. I got the veggie one you like.'],
      ['me', '8:03 PM', 'Perfect, I will bring drinks.', 'read'],
      ['them', '8:18 PM', 'The new controller is charged too.'],
      ['me', '8:26 PM', 'You are officially the MVP of game night.', 'read'],
      ['them', '8:39 PM', 'Same time next Saturday?'],
      ['me', '8:45 PM', 'Count me in! 🎮', 'read']
    ]);
    addToday('olivia', [
      ['them', '5:34 PM', 'I sent the revised slides to the client. The updated chart reads much better.'],
      ['me', '5:42 PM', 'Agreed. The new labels make the main point clear.', 'read'],
      ['them', '5:56 PM', 'Thanks for catching that number on slide six.'],
      ['me', '6:08 PM', 'Happy to help. I saved the source data in the shared folder.', 'read'],
      ['them', '6:19 PM', 'Found it. I will add a note for tomorrow’s review.'],
      ['me', '6:27 PM', 'Great. Let’s keep the first section short.', 'read'],
      ['them', '6:40 PM', 'Done. Have a relaxing evening!'],
      ['me', '6:44 PM', 'You too. Talk tomorrow 👋', 'read']
    ]);
    addToday('grace', [
      ['them', '12:05 PM', 'I put the cookie recipe in your bag so you can try it at home.'],
      ['me', '12:18 PM', 'Thank you! I will make a batch this weekend.', 'read'],
      ['them', '12:25 PM', 'Use the smaller pan or they spread too much.'],
      ['me', '12:39 PM', 'Noted. Would you like me to bring some on Sunday?', 'read'],
      ['them', '1:02 PM', 'That would be lovely. Your dad already asked for extra.'],
      ['me', '1:16 PM', 'I will save him a few 😄', 'read'],
      ['them', '4:50 PM', 'Dinner is at six, just so you know.'],
      ['me', '5:03 PM', 'Thanks for the reminder. See you soon!', 'read']
    ]);
    addToday('dad', [
      ['them', '10:14 AM', 'I checked the tire pressure. You are all set for the drive.'],
      ['me', '10:28 AM', 'Thanks! I appreciate you taking a look.', 'read'],
      ['them', '10:36 AM', 'The gauge is back in the garage drawer.'],
      ['me', '10:44 AM', 'Found it. I will put it away after lunch.', 'read'],
      ['them', '12:10 PM', 'The game is on channel four this afternoon.'],
      ['me', '12:19 PM', 'I will bring snacks over.', 'read'],
      ['them', '12:27 PM', 'Sounds good. Kickoff is at four.'],
      ['me', '12:35 PM', 'See you then! 🏈', 'read']
    ]);
    addToday('daniel', [
      ['them', '9:18 AM', 'I returned the ladder to the garage. Thanks again!'],
      ['me', '9:26 AM', 'No problem. Did the gutter clean out okay?', 'read'],
      ['them', '9:33 AM', 'Yep, water is draining properly now.'],
      ['me', '9:47 AM', 'Great. I should tackle mine before the next rain.', 'read'],
      ['them', '10:02 AM', 'I can bring the extension next week if you need it.'],
      ['me', '10:16 AM', 'That would be helpful. I will check the forecast.', 'read'],
      ['them', '10:30 AM', 'Let me know what day works.'],
      ['me', '10:42 AM', 'Will do. Have a good one!', 'read']
    ]);
    addToday('mia', [
      ['them', '10:03 AM', 'I found another puzzle book at the library sale. Want it?'],
      ['me', '10:14 AM', 'Definitely! I am nearly done with the one you lent me.', 'read'],
      ['them', '10:26 AM', 'I will leave it by your door this afternoon.'],
      ['me', '10:40 AM', 'Thanks. I can bring your book back tomorrow.', 'read'],
      ['them', '11:12 AM', 'No rush. There is a little café next to the library now.'],
      ['me', '11:28 AM', 'We should check it out after work sometime.', 'read'],
      ['them', '11:39 AM', 'Sure! Their cinnamon rolls look great.'],
      ['me', '11:47 AM', 'You had me at cinnamon rolls 😄', 'read']
    ]);
    addToday('bookclub', [
      ['rachel', '9:10 AM', 'I finished the first half last night. The map detail is so clever.'],
      ['tom', '9:26 AM', 'I noticed that too. I have a few theories about the lighthouse.'],
      ['me', '9:41 AM', 'Saving my theories for book night. No spoilers!', 'read'],
      ['ava', '10:02 AM', 'I will bring sticky notes for everyone.'],
      ['lucas', '10:17 AM', 'I can bring tea and the extra mugs.'],
      ['rachel', '10:33 AM', 'Saturday at six still works for everyone?'],
      ['me', '10:45 AM', 'Yes, I will be there with snacks.', 'read'],
      ['tom', '11:03 AM', 'Confirmed. Looking forward to it!']
    ]);
    addToday('neighbors', [
      ['linda', '8:05 AM', 'The community garden needs a few volunteers this weekend.'],
      ['greg', '8:19 AM', 'I can bring gloves and a couple of small shovels.'],
      ['me', '8:34 AM', 'I will bring bags for the leaves.', 'read'],
      ['carlos', '8:48 AM', 'I have extra seedlings if anyone wants some.'],
      ['linda', '9:02 AM', 'Tomatoes would be great for the sunny corner.'],
      ['greg', '9:15 AM', 'I will bring the watering cans too.'],
      ['me', '9:29 AM', 'Saturday at ten? I can stay for an hour.', 'read'],
      ['carlos', '9:41 AM', 'Works for me. See you all there!']
    ]);
    addToday('lucas', [
      ['them', '6:35 AM', 'Leg day survived. Barely, but it counts 💪'],
      ['me', '6:48 AM', 'The last set was rough. I am getting coffee now.', 'read'],
      ['them', '7:02 AM', 'Same here. Want to try the new place on Oak Street?'],
      ['me', '7:15 AM', 'Sure. I can meet you there after work.', 'read'],
      ['them', '7:29 AM', 'They have good breakfast sandwiches too.'],
      ['me', '7:42 AM', 'That is dangerous information before lunchtime 😂', 'read'],
      ['them', '8:03 AM', 'Saturday morning next week?'],
      ['me', '8:16 AM', 'Deal. Maybe 7 AM this time?', 'read']
    ]);
  }
})();
