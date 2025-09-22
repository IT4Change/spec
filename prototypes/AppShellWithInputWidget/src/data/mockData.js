import { subDays, subHours, subMinutes } from 'date-fns';

const mockUsers = {
  'user-1': { name: 'Lena Weber', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
  'user-2': { name: 'Max Schmidt', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face' },
  'user-3': { name: 'Julia Klein', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face' },
};

const mockPosts = [
  {
    id: 'post-1',
    type: 'event',
    authorId: 'user-1',
    createdAt: subHours(new Date(), 2).toISOString(),
    title: 'Yoga im Park',
    content: 'Lasst uns gemeinsam den Tag mit einer entspannten Yoga-Session im Stadtpark beginnen. Bringt eure Matten mit!',
    startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 1),
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
};