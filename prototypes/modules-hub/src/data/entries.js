export const entries = [
  {
    id: 'evt-1',
    type: 'event',
    subtype: 'offline',
    title: 'Repair Café Kassel',
    excerpt: 'Bring defekte Geräte vorbei und repariere sie gemeinsam mit dem Quartiersteam.',
    description:
      'Im monatlichen Repair Café helfen Ehrenamtliche beim Reparieren von Elektrogeräten, Textilien und Fahrrädern. Es gibt eine Materialkiste, Kaffee & Kuchen und eine Vorstellungsrunde der Initiativen des Hauses.',
    banner:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    location: {
      name: 'Nachbarschaftszentrum Mitte',
      address: 'Friedrichsplatz 1, Kassel',
      lat: 51.3115,
      lng: 9.4921,
    },
    start: '2024-11-28T16:00:00.000Z',
    end: '2024-11-28T19:00:00.000Z',
    distance: 1.2,
    networkDistance: 1,
    updatedAt: '2024-11-15T11:30:00.000Z',
    tags: ['Reparieren', 'Nachhaltigkeit', 'Community'],
    author: {
      name: 'Sara Malik',
      role: 'Quartiersmanagerin',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=60',
    },
    participants: [
      { name: 'Timo Reuter', avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=200&q=60' },
      { name: 'Lena Hoff', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=60' },
      { name: 'Alina Brand', avatar: 'https://images.unsplash.com/photo-1482961674540-0b0e8363a005?auto=format&fit=crop&w=200&q=60' },
    ],
    stats: {
      comments: 8,
      reactions: {
        heart: 24,
        sparkles: 9,
        thumbs: 5,
      },
    },
  },
  {
    id: 'evt-2',
    type: 'event',
    subtype: 'online',
    title: 'Climate Futures – Online Salon',
    excerpt: 'Diskussion zu lokalen Klimaprojekten mit Gästen aus Berlin, Kassel und Perugia.',
    description:
      'Gemeinsam mit dem Europäischen Netzwerk CitiesAhead sprechen wir über Stadtnatur, bürgerwissenschaftliche Projekte und faire Mobilität. Der Link zum Jitsi-Raum wird nach Zusage verschickt.',
    banner:
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    location: {
      name: 'Online via Jitsi',
      address: 'Link folgt nach Anmeldung',
    },
    start: '2024-12-04T18:00:00.000Z',
    end: '2024-12-04T19:30:00.000Z',
    distance: 0,
    networkDistance: 2,
    updatedAt: '2024-11-17T19:00:00.000Z',
    tags: ['Klimawende', 'Dialog', 'Online'],
    author: {
      name: 'CitiesAhead Netzwerk',
      role: 'Partnerorga',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=60',
    },
    participants: [
      { name: 'Francesco Riva' },
      { name: 'Julia Danner' },
    ],
    stats: {
      comments: 4,
      reactions: {
        heart: 12,
        bulb: 6,
      },
    },
  },
  {
    id: 'grp-1',
    type: 'project',
    title: 'Essbare Stadt Kassel',
    excerpt: 'Offene Gartengruppe, die essbare Landschaften im Stadtraum etabliert.',
    description:
      'Wir bepflanzen Baumscheiben, pflegen Gemeinschaftsbeete und sammeln Rezepte für urbane Ernten. Neue Mitmacher:innen sind willkommen! Jede Woche gibt es einen Check-in und im Winter planen wir Pflanzaktionen.',
    banner:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    location: {
      name: 'Karlshospital Garten',
      address: 'Karlshafener Str. 2, Kassel',
      lat: 51.3238,
      lng: 9.4964,
    },
    start: '2024-11-19T15:00:00.000Z',
    end: '2024-11-19T17:00:00.000Z',
    recurring: 'weekly',
    distance: 2.8,
    networkDistance: 1,
    updatedAt: '2024-11-18T08:45:00.000Z',
    tags: ['Urban Gardening', 'Rezepte', 'Mitmachen'],
    media: [
      'https://images.unsplash.com/photo-1598032895152-9b01053c4cf0?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1485637701892-09ad422f6de6?auto=format&fit=crop&w=800&q=60',
    ],
    author: {
      name: 'Elif Kara',
      role: 'Projektkoordinatorin',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=60',
    },
    participants: [
      { name: 'Kaya B.' },
      { name: 'Thomas H.' },
      { name: 'Sascha W.' },
    ],
    stats: {
      comments: 14,
      reactions: {
        heart: 41,
        leaf: 16,
      },
    },
  },
  {
    id: 'med-1',
    type: 'media',
    subtype: 'video',
    title: 'Dokumentation: Quest „Brücken bauen“',
    excerpt: 'Kurzfilm zu einer Community-Quest, bei der Teams eine Fußgängerbrücke aus Recyclingmaterial errichtet haben.',
    description:
      'Der Film begleitet die Quest von der Ideenphase über die Materialbeschaffung bis hin zum Abschlussfest. Die teilnehmenden Teams haben Badges in Kooperation & Ressourcenmanagement erhalten.',
    banner:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    location: {
      name: 'Fuldaufer',
      lat: 51.3087,
      lng: 9.4972,
    },
    start: '2024-11-10T12:00:00.000Z',
    end: '2024-11-10T12:00:00.000Z',
    distance: 0.8,
    networkDistance: 3,
    updatedAt: '2024-11-16T14:00:00.000Z',
    tags: ['Questlog', 'Video', 'Community-Building'],
    author: {
      name: 'Kassel Media Lab',
      role: 'Content-Team',
      avatar: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=300&q=60',
    },
    participants: [
      { name: 'Quest-Team Brücke' },
    ],
    stats: {
      comments: 12,
      reactions: {
        heart: 52,
        star: 18,
      },
    },
  },
  {
    id: 'ofr-1',
    type: 'offer',
    title: 'Werkzeugsharing – Akkuschrauber & Stichsäge',
    excerpt: 'Werkzeug-Pool für Nachbarschaftsbauprojekte mit Abholzeiten am Wochenende.',
    description:
      'Der Werkzeugpool kann für gemeinnützige Aktionen kostenlos genutzt werden. Einfach Wunschtermine eintragen, Teilnehmer:innen der letzten Aktionen werden priorisiert. Es existiert ein Telegram-Bot für Erinnerungen.',
    banner:
      'https://images.unsplash.com/photo-1504148455341-9752e2236d2d?auto=format&fit=crop&w=1200&q=80',
    location: {
      name: 'Makerspace Hafen',
      address: 'Werftstraße 7, Kassel',
      lat: 51.3159,
      lng: 9.4956,
    },
    start: '2024-11-22T08:00:00.000Z',
    end: '2024-11-22T18:00:00.000Z',
    distance: 3.4,
    networkDistance: 2,
    updatedAt: '2024-11-18T10:10:00.000Z',
    tags: ['Sharing', 'Werkstatt', 'Marktplatz'],
    author: {
      name: 'FabLab Kassel',
      role: 'Verein',
      avatar: 'https://images.unsplash.com/photo-1549921296-3ecf98c5ff4d?auto=format&fit=crop&w=300&q=60',
    },
    stats: {
      comments: 6,
      reactions: {
        heart: 21,
        hammer: 8,
      },
    },
  },
  {
    id: 'qst-1',
    type: 'quest',
    title: 'Quest: Urbanes Pilzzentrum',
    excerpt: 'Erstelle mit deinem Team eine Pilzfarm aus Kaffeesatz. Sammle XP in Biodesign & Projektorganisation.',
    description:
      'Die Quest hat drei Phasen: Recherche, Aufbau, Fest. Vor Ort wird ein QR-Code gescannt, um XP zu erhalten. Teilnehmende werden automatisch in den Kalender importiert und erhalten Abzeichen für Teamwork.',
    banner:
      'https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=1200&q=80',
    location: {
      name: 'Halle 11 – Kulturzentrum',
      address: 'Sandershäuser Str. 79, Kassel',
      lat: 51.3276,
      lng: 9.5252,
    },
    start: '2024-12-01T10:00:00.000Z',
    end: '2024-12-15T18:00:00.000Z',
    distance: 4.6,
    networkDistance: 2,
    updatedAt: '2024-11-14T09:30:00.000Z',
    tags: ['Quest', 'Gamification', 'Circular Economy'],
    author: {
      name: 'Quest Office Kassel',
      role: 'Gamification Team',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=60',
    },
    quest: {
      xpReward: 350,
      badge: 'Biodesign Explorer',
      levelRequirement: 2,
      maxParticipants: 20,
    },
    stats: {
      comments: 17,
      reactions: {
        heart: 44,
        trophy: 7,
      },
    },
  },
];

export const contacts = [
  {
    id: 'contact-1',
    name: 'Tabea Sommer',
    status: 'online',
    connection: 'War bei Repair Café Kassel',
    lat: 51.3098,
    lng: 9.4978,
  },
  {
    id: 'contact-2',
    name: 'Luis Kramer',
    status: 'offline',
    connection: 'Kennt dich über Essbare Stadt Kassel',
    lat: 51.3241,
    lng: 9.5024,
  },
  {
    id: 'contact-3',
    name: 'Joyce Mensah',
    status: 'online',
    connection: 'Gemeinsam bei Quest Urbanes Pilzzentrum',
    lat: 51.3186,
    lng: 9.4891,
  },
];
