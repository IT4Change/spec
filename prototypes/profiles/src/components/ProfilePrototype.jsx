import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileView from '@/components/profile/ProfileView';
import ProfileControls from '@/components/profile/ProfileControls';
import { Button } from '@/components/ui/button';
import { Settings, Eye } from 'lucide-react';

const ProfilePrototype = () => {
  const [showControls, setShowControls] = useState(true);
  const [profileConfig, setProfileConfig] = useState({
    itemType: 'person',
    navigation: 'tabs',
    components: {
      text: true,
      mediaGallery: true,
      eventFunctions: false,
      comments: true,
      crowdfunding: false,
      members: true,
      comingEvents: false,
      projects: true,
      quests: false,
      badges: true,
      contactInfo: true,
      shareButtons: true
    }
  });

  const mockData = {
    person: {
      name: 'Anna Schmidt',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      banner: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop',
      address: 'Musterstraße 123, 10115 Berlin',
      distance: '2.3 km',
      text: '# Über mich\n\nHallo! Ich bin **Anna** und liebe es, neue Menschen kennenzulernen und gemeinsam Projekte zu verwirklichen. Als *Grafikdesignerin* bringe ich gerne kreative Ideen ein.\n\n## Meine Interessen\n- Nachhaltigkeit\n- Urban Gardening\n- Community Building',
      contactInfo: {
        email: 'anna@example.com',
        phone: '+49 30 12345678',
        website: 'https://anna-schmidt.de'
      }
    },
    event: {
      name: 'Community Garden Workshop',
      avatar: null,
      banner: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=320',
      address: 'Volkspark Friedrichshain, Berlin',
      distance: '1.8 km',
      text: '# Workshop: Urban Gardening\n\nLernt die Grundlagen des **Urban Gardening** kennen! Wir zeigen euch, wie ihr auch auf kleinstem Raum erfolgreich Gemüse anbauen könnt.\n\n## Was erwartet euch?\n- Praktische Tipps für Balkon und Terrasse\n- Saisonale Pflanzplanung\n- Nachhaltige Anbaumethoden',
      eventDetails: {
        startDate: '2024-03-15',
        startTime: '14:00',
        endDate: '2024-03-15',
        endTime: '17:00',
        participants: [
          { name: 'Max Müller', status: 'confirmed' },
          { name: 'Lisa Weber', status: 'invited' },
          { name: 'Tom Fischer', status: 'confirmed' }
        ]
      }
    },
    offer: {
      name: 'Webdesign Services',
      avatar: 'https://www.svgrepo.com/show/528180/code-circle.svg',
      banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=200&fit=crop',
      address: 'Remote / Berlin',
      distance: '0 km',
      text: '# Professionelles Webdesign\n\nIch biete **maßgeschneiderte Webdesign-Lösungen** für kleine und mittlere Unternehmen.\n\n## Meine Services\n- Responsive Webdesign\n- E-Commerce Lösungen\n- SEO Optimierung\n- Wartung und Support',
      contactInfo: {
        email: 'info@webdesign-pro.de',
        phone: '+49 30 98765432'
      }
    },
    quest: {
      name: 'Nachbarschaftshilfe: Einkaufen',
      avatar: 'https://www.svgrepo.com/show/422987/trophy-winner-prize.svg',
      banner: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=200&fit=crop',
      address: 'Prenzlauer Berg, Berlin',
      distance: '0.5 km',
      text: '# Hilfe beim Einkaufen gesucht\n\nIch suche jemanden, der mir **einmal wöchentlich** beim Einkaufen helfen kann. Aufgrund meiner eingeschränkten Mobilität fällt mir das schwer.\n\n## Details\n- Jeden Donnerstag vormittag\n- Einkauf im nahegelegenen Supermarkt\n- Kleine Aufwandsentschädigung möglich',
      questDetails: {
        difficulty: 'Einfach',
        timeRequired: '1-2 Stunden',
        reward: '20€ pro Einsatz'
      }
    },
    project: {
      name: 'Community Garten Projekt',
      avatar: 'https://www.svgrepo.com/show/272036/gardener-work.svg',
      banner: 'https://images.unsplash.com/photo-1611843467160-25afb8df1074?w=640',
      address: 'Volkspark Friedrichshain, Berlin',
      distance: '1.8 km',
      text: '# Gemeinsam gärtnern in der Stadt\n\nWir bauen einen **Community Garden** auf! Unser Ziel ist es, einen Ort zu schaffen, wo Nachbarn zusammenkommen und gemeinsam Gemüse anbauen können.\n\n## Unsere Vision\n- Nachhaltiger Anbau von Bio-Gemüse\n- Bildungsangebote für Kinder\n- Stärkung der Nachbarschaft',
      crowdfunding: {
        raised: 3250,
        goal: 5000,
        donors: 42,
        donations: [
          { amount: 50, donor: 'Anonymous' },
          { amount: 100, donor: 'Maria K.' },
          { amount: 25, donor: 'Peter S.' }
        ]
      }
    }
  };

  const currentData = mockData[profileConfig.itemType];

  return (
    <div className="min-h-screen relative">
      {/* Map Background Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-20">
        <div className={`absolute inset-0 opacity-30 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]`}></div>
      </div>

      {/* Control Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowControls(!showControls)}
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm border-purple-200 hover:bg-purple-50"
        >
          {showControls ? <Eye className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
        </Button>
      </div>

      {/* Profile Controls */}
      <AnimatePresence>
        {showControls && (
          <ProfileControls
            config={profileConfig}
            onChange={setProfileConfig}
          />
        )}
      </AnimatePresence>

      {/* Profile View */}
      <ProfileView
        data={currentData}
        config={profileConfig}
      />
    </div>
  );
};

export default ProfilePrototype;