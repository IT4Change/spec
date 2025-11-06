import { subDays, subHours, subMinutes, addDays, addWeeks, set } from 'date-fns';
import { initializeNotifications } from './mockNotifications';
import { initializeMessages } from './mockMessages';

const mockUsers = {
  'user-1': { name: 'Lena Weber', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
  'user-2': { name: 'Max Schmidt', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face' },
  'user-3': { name: 'Julia Klein', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face' },
  'user-4': { name: 'Thomas Müller', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
  'user-5': { name: 'Sarah Fischer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
  'user-6': { name: 'Michael Wagner', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  'user-7': { name: 'Anna Becker', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face' },
  'user-8': { name: 'David Hoffmann', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
  'user-9': { name: 'Emma Schulz', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
  'user-10': { name: 'Felix Richter', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face' },
};

const mockPosts = [
  // Event 1: Yoga im Park (Tomorrow morning)
  {
    id: 'post-1',
    type: 'event',
    authorId: 'user-1',
    createdAt: subHours(new Date(), 2).toISOString(),
    title: 'Yoga im Park',
    content: 'Lasst uns gemeinsam den Tag mit einer entspannten Yoga-Session im Stadtpark beginnen. Bringt eure Matten mit!',
    startTime: set(addDays(new Date(), 1), { hours: 9, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 1), { hours: 10, minutes: 30, seconds: 0 }).toISOString(),
    location: { lat: 52.52, lon: 13.40, name: 'Stadtpark Mitte' },
    reactions: { '❤️': 15, '👍': 25 },
    comments: [
      { id: 'c-1', authorId: 'user-2', text: 'Tolle Idee! Bin dabei.', createdAt: subMinutes(new Date(), 90).toISOString(), replies: [] },
      { id: 'c-2', authorId: 'user-3', text: 'Ich auch!', createdAt: subMinutes(new Date(), 60).toISOString(), replies: [] },
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80' }
    ]
  },

  // Event 2: Community Meeting (In 3 days, evening)
  {
    id: 'post-event-2',
    type: 'event',
    authorId: 'user-2',
    createdAt: subDays(new Date(), 1).toISOString(),
    title: 'Community Meeting',
    content: 'Monatliches Treffen der Nachbarschaft. Wir besprechen aktuelle Projekte und planen neue Aktivitäten.',
    startTime: set(addDays(new Date(), 3), { hours: 19, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 3), { hours: 21, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.515, lon: 13.405, name: 'Gemeinschaftsraum' },
    reactions: { '👍': 32 },
    comments: [],
    media: []
  },

  // Event 3: Nachbarschaftsfest (Next Saturday, all day)
  {
    id: 'post-event-3',
    type: 'event',
    authorId: 'user-4',
    createdAt: subDays(new Date(), 2).toISOString(),
    title: 'Nachbarschaftsfest',
    content: 'Großes Sommerfest mit Grill, Musik und Kinderprogramm. Jeder bringt etwas mit!',
    startTime: set(addDays(new Date(), 6), { hours: 14, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 6), { hours: 22, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.518, lon: 13.398, name: 'Hinterhof Müller Straße' },
    reactions: { '🎉': 45, '❤️': 28 },
    comments: [],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80' }
    ]
  },

  // Event 4: Coding Workshop (Next week Tuesday)
  {
    id: 'post-event-4',
    type: 'event',
    authorId: 'user-8',
    createdAt: subDays(new Date(), 1).toISOString(),
    title: 'Coding Workshop für Anfänger',
    content: 'Einführung in JavaScript und Webentwicklung. Keine Vorkenntnisse nötig!',
    startTime: set(addDays(new Date(), 9), { hours: 18, minutes: 30, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 9), { hours: 21, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.512, lon: 13.395, name: 'CoWorking Space Berlin' },
    reactions: { '💻': 18, '👍': 12 },
    comments: [],
    media: []
  },

  // Event 5: Book Club (Tomorrow evening)
  {
    id: 'post-event-5',
    type: 'event',
    authorId: 'user-7',
    createdAt: subHours(new Date(), 5).toISOString(),
    title: 'Buchclub Treffen',
    content: 'Diesen Monat lesen wir "Der Schwarm" von Frank Schätzing. Neue Mitglieder willkommen!',
    startTime: set(addDays(new Date(), 1), { hours: 20, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 1), { hours: 22, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.508, lon: 13.392, name: 'Café Literatur' },
    reactions: { '📚': 8 },
    comments: [],
    media: []
  },

  // Event 6: Lauftreff (In 2 days, early morning)
  {
    id: 'post-event-6',
    type: 'event',
    authorId: 'user-6',
    createdAt: subDays(new Date(), 3).toISOString(),
    title: 'Lauftreff am Morgen',
    content: 'Gemeinsam joggen durch den Park. Tempo: gemütlich. Treffpunkt am Haupteingang.',
    startTime: set(addDays(new Date(), 2), { hours: 7, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 2), { hours: 8, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.52, lon: 13.40, name: 'Stadtpark Eingang Nord' },
    reactions: { '🏃': 12, '👍': 15 },
    comments: [],
    media: []
  },

  // Event 7: Flohmarkt (Next Sunday)
  {
    id: 'post-event-7',
    type: 'event',
    authorId: 'user-5',
    createdAt: subDays(new Date(), 2).toISOString(),
    title: 'Nachbarschaftsflohmarkt',
    content: 'Verkaufe gebrauchte Kleidung, Bücher und Haushaltswaren. Tauschen auch möglich!',
    startTime: set(addWeeks(new Date(), 1), { hours: 10, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addWeeks(new Date(), 1), { hours: 16, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.514, lon: 13.402, name: 'Schulhof Goethe-Schule' },
    reactions: { '🛍️': 22 },
    comments: [],
    media: []
  },

  // Event 8: Kino Abend (In 4 days)
  {
    id: 'post-event-8',
    type: 'event',
    authorId: 'user-9',
    createdAt: subHours(new Date(), 10).toISOString(),
    title: 'Open-Air Kino',
    content: 'Filmvorführung im Hinterhof. Heute: Klassiker der 80er Jahre. Decken mitbringen!',
    startTime: set(addDays(new Date(), 4), { hours: 21, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 4), { hours: 23, minutes: 30, seconds: 0 }).toISOString(),
    location: { lat: 52.516, lon: 13.408, name: 'Hinterhof Kastanienallee' },
    reactions: { '🎬': 28, '❤️': 19 },
    comments: [],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80' }
    ]
  },

  // Event 9: Repair Café (Next Wednesday afternoon)
  {
    id: 'post-event-9',
    type: 'event',
    authorId: 'user-10',
    createdAt: subDays(new Date(), 4).toISOString(),
    title: 'Repair Café',
    content: 'Repariere kaputte Geräte mit Hilfe unserer Experten. Elektronik, Textilien, Möbel - wir versuchen alles!',
    startTime: set(addDays(new Date(), 10), { hours: 15, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 10), { hours: 19, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.510, lon: 13.400, name: 'Werkstatt Müllerstraße' },
    reactions: { '🔧': 15, '♻️': 20 },
    comments: [],
    media: []
  },

  // Event 10: Spiel Nachmittag für Kinder (This Saturday)
  {
    id: 'post-event-10',
    type: 'event',
    authorId: 'user-3',
    createdAt: subHours(new Date(), 15).toISOString(),
    title: 'Spielnachmittag für Kinder',
    content: 'Brettspiele, Basteln und Spaß für Kinder zwischen 5 und 12 Jahren. Eltern dürfen gerne dabei bleiben!',
    startTime: set(addDays(new Date(), 5), { hours: 14, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 5), { hours: 17, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.513, lon: 13.397, name: 'Jugendclub Neukölln' },
    reactions: { '🎨': 25, '👶': 18 },
    comments: [],
    media: []
  },

  // Event 11: Fahrradtour (Next Sunday morning)
  {
    id: 'post-event-11',
    type: 'event',
    authorId: 'user-2',
    createdAt: subDays(new Date(), 5).toISOString(),
    title: 'Fahrradtour ans Wasser',
    content: 'Gemütliche 30km Tour zum See. Picknick am Ziel. Alle Levels willkommen!',
    startTime: set(addWeeks(new Date(), 1), { hours: 9, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addWeeks(new Date(), 1), { hours: 15, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.52, lon: 13.40, name: 'Stadtpark Treffpunkt' },
    reactions: { '🚴': 22, '☀️': 16 },
    comments: [],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=500&q=80' }
    ]
  },

  // Event 12: Sprachcafé (In 5 days)
  {
    id: 'post-event-12',
    type: 'event',
    authorId: 'user-1',
    createdAt: subDays(new Date(), 3).toISOString(),
    title: 'Internationales Sprachcafé',
    content: 'Übe Deutsch, Englisch, Spanisch oder andere Sprachen in entspannter Atmosphäre.',
    startTime: set(addDays(new Date(), 5), { hours: 18, minutes: 0, seconds: 0 }).toISOString(),
    endTime: set(addDays(new Date(), 5), { hours: 21, minutes: 0, seconds: 0 }).toISOString(),
    location: { lat: 52.511, lon: 13.394, name: 'Café International' },
    reactions: { '🌍': 14, '💬': 11 },
    comments: [],
    media: []
  },

  // Project post (not an event)
  {
    id: 'post-2',
    type: 'project',
    authorId: 'user-2',
    createdAt: subDays(new Date(), 1).toISOString(),
    title: 'Community-Garten anlegen',
    content: 'Wir suchen Helfer, um ein neues Beet für unseren Gemeinschaftsgarten anzulegen. Werkzeug ist vorhanden, gute Laune bitte mitbringen!',
    members: ['user-1', 'user-2', 'user-3'],
    location: { lat: 52.51, lon: 13.41, name: 'Nachbarschaftsgarten' },
    reactions: { '👍': 42, '🌱': 18 },
    comments: [],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80' }
    ]
  },

  // Offer post (not an event)
  {
    id: 'post-3',
    type: 'offer',
    authorId: 'user-3',
    createdAt: subDays(new Date(), 3).toISOString(),
    title: 'Biete Bohrmaschine zum Verleih',
    content: 'Habe eine kaum benutzte Schlagbohrmaschine, die ich gerne an Nachbarn verleihe. Einfach melden!',
    reactions: { '❤️': 5 },
    comments: [],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80' }
    ]
  },
];

export const initializeMockData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem('posts')) {
    localStorage.setItem('posts', JSON.stringify(mockPosts));
  }
  // Initialize notifications
  initializeNotifications();
  // Initialize messages
  initializeMessages();
};

export { mockUsers };