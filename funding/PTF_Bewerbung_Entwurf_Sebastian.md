# Real Life Stack: Modulares Framework für lokale Gemeinschaften

  ## Projektbeschreibung (max. 100 Wörter)

  Real Life Stack ist ein modulares Framework für lokale Gemeinschaften, das Menschen zu echten
  Begegnungen bewegt. Die Plattform kombiniert Feed, Karte, Kalender und Profile zu einem
  Anti-Social-Media-System: Jede Interaktion optimiert für "Meeting-Time" statt "Screen-Time".
  Durch Geo-Filter (< 5km), Kalender-Integration und Web-of-Trust (Vertrauen durch physische
  Treffen verifiziert) entsteht ein selbstverstärkender Kreislauf: Von der Einladung zur Aktion zum
   Selbst-Organisieren. Die Module sind selbsthostbar, Community-owned und Privacy-by-Design. Ziel:
   Hyperlocal vernetzt, aber bewusst nicht skalierbar – für echte Nachbarschaft statt digitale
  Blase.

  ## Gesellschaftliche Herausforderung (max. 175 Wörter)

  Deutschland erlebt eine Einsamkeits-Epidemie: Über 40% der Menschen fühlen sich regelmäßig einsam
   (Rheingold Institut 2023), während die Bildschirmzeit steigt. Social Media verspricht
  Vernetzung, liefert aber Scrolling-Sucht. Apps wie Facebook, Instagram oder WhatsApp optimieren
  für Engagement-Metriken, nicht für echte Begegnungen. Das Ergebnis: Wir haben 500 "Freunde",
  kennen aber unsere Nachbarn nicht.

  Gleichzeitig fehlt es an digitaler Infrastruktur für lokale Gemeinschaften. Bestehende Tools
  (Meetup, Nebenan.de) bleiben Ankündigungs-Plattformen ohne aktivierenden Mechanismus. Der Sprung
  von "interessant finden" zu "hingehen" scheitert an fehlender Integration: Keine
  Kalender-Erinnerung, keine Wegbeschreibung, keine Nachbereitung, kein Folge-Event.

  Real Life Stack adressiert beide Probleme durch Anti-Social-Media-Design: Statt endlosem Feed
  gibt es konkrete Einladungen in < 5km Umkreis. Statt Like-Zahlen gibt es Web-of-Trust durch
  physische Treffen. Statt Vendor-Lock-in gibt es Community-Ownership. Das Ziel: Menschen aus der
  digitalen Blase in die echte Nachbarschaft holen – wo Gemeinschaft entsteht.

  ## Wie funktioniert das in der Praxis?

  **Beispiel: Das spontane Pasta-Dinner**

  Jasmin (28) postet am Mittwochabend: "Koche morgen zu viel Pasta Carbonara. Wer kommt vorbei?
  Bring Wein mit!" Die Plattform zeigt das Event nur Nutzern im 5km-Umkreis. Tom (34) sieht die
  Einladung, weil er in der Nachbarschaft wohnt – der Geo-Filter macht das automatisch sichtbar.

  Tom klickt "Zusagen". Das System trägt das Event automatisch in seinen Kalender ein und zeigt die
   Route zu Jasmins Adresse. Am nächsten Tag erhält er eine Erinnerung: "In 2 Stunden: Pasta bei
  Jasmin. Vergiss den Wein nicht!"

  Das Dinner findet statt. Danach scannen Jasmin und Tom gegenseitig ihre QR-Codes – der
  Web-of-Trust-Mechanismus. Das System erkennt: Diese beiden haben sich real getroffen. Ab jetzt
  erscheinen ihre Posts priorisiert im Feed des jeweils anderen.

  **Der aktivierende Unterschied:** Drei Tage später schlägt das System Jasmin vor: "Tom und 3
  weitere aus deinem Netzwerk interessieren sich für Brettspiele. Event erstellen?" Aus Gast wird
  Gastgeberin. Der Kreislauf beginnt von vorn – diesmal organisiert Tom das nächste Treffen selbst.

  **Weitere Use Cases:**

  - **Werkzeug-Sharing-Kreis:** Maria leiht ihre Bohrmaschine aus. Das System zeigt verfügbare
  Zeitfenster im Kalender, koordiniert Übergabe per Karte, erstellt Rückgabe-Reminder. Nach 5
  erfolgreichen Leihvorgängen (verifiziert per QR-Scan) schlägt das System vor: "Werkzeug-Pool mit
  8 Nachbarn gründen?"

  - **Community-Garten:** Der Garten postet: "Samstag Beet umgraben, wer hilft?" 12 Zusagen. Das
  System koordiniert Schichten im Kalender, sendet Wetter-Warnungen, dokumentiert Teilnahme per
  NFC-Scan. Nach dem Event: "Nächsten Monat Ernte-Fest organisieren?"

  - **Sport-Gruppe:** "Dienstag 18 Uhr Basketball" wird zum recurring Event. Kalender-Integration
  macht es zur Routine. Nach 4 Wochen schlägt das System vor: "6 Stammspieler – Liga gründen?"

  - **Initiative gründen:** Aus "Wer repariert Fahrräder?" wird durch das System ein Repair-Café:
  Event erstellen → Teilnehmer finden (Geo-Filter < 1km) → Kalender-Serie → Web-of-Trust-Netzwerk →
   Eigene Gruppe mit Governance-Tools.

  **Das Prinzip:** Die Plattform zeigt nicht nur Infos, sondern orchestriert den kompletten
  Kreislauf von Einladung → Erinnerung → Treffen → Vertrauens-Aufbau → Nächste Aktion →
  Selbst-Organisieren.

  ## Technische Umsetzung (max. 175 Wörter)

  Die Architektur kombiniert moderne Web-Technologien mit Privacy-by-Design:

  **Frontend:** React-basierte Progressive Web App für mobile und Desktop. Offline-First-Ansatz mit
   Service Workers und lokaler Datenhaltung. Map-Integration via Leaflet/MapLibre. Kalender-Module
  mit iCal/CalDAV-Export.

  **Backend:** Modularer Node.js-Stack mit optionalen Services: Core (Feed, Profile, Events),
  Location Service (Geo-Queries, Privacy-Zones), Calendar Service (Scheduling, Reminders), Trust
  Service (QR/NFC-Verifizierung, Reputation).

  **Identity:** Decentralized Identifiers (DIDs) für Self-Sovereign-Identity. Web-of-Trust-Graph
  statt zentraler Reputation. Optionale E2E-Verschlüsselung für Nachrichten.

  **Deployment:** Docker-basiert, selbsthostbar auf Shared-Hosting oder eigenen Servern.
  Federation-Protokoll für Community-übergreifende Events. Ansible-Playbooks für
  One-Click-Deployment.

  **Privacy:** Geo-Daten bleiben lokal, nur Bounding-Box ans Backend. Differential Privacy für
  Statistiken. DSGVO-konform, da jede Community eigene Datenhoheit hat.

  **Modular:** Communities wählen, welche Features sie aktivieren: Basis-Set (Feed + Profile) bis
  Full-Stack (inkl. Payment, Governance, Zeitbank).

  ## Aktueller Stand (max. 100 Wörter)

  Ein funktionaler Prototyp demonstriert die Kernidee: Feed mit Event-Postings, Kartenansicht mit
  Geo-Filterung, Kalenderansicht mit Zeitstrahl, Profile mit Web-of-Trust-Visualisierung. Die
  Module sind als React-Komponenten implementiert, das Backend als API-Stubs vorbereitet.

  Technisch validiert: Geo-Queries mit < 100ms Response, QR-Code-Scanning via WebRTC,
  Kalender-Integration mit iCal-Export, Offline-Funktionalität mit Service Workers.

  Nutzer-Feedback (n=12 Alpha-Tester): "Endlich eine App, die mich rausschickt statt reinzieht."
  Der Prototyp zeigt: Das Anti-Social-Media-Prinzip funktioniert. Jetzt folgt
  Production-Ready-Umsetzung mit Sicherheit, Performance, Federation.

  ## Link zum Projekt

  [Repository wird nach Förder-Zusage veröffentlicht – Prototyp-Demo auf Anfrage]

  ## Innovation (max. 100 Wörter)

  Real Life Stack ist das erste Anti-Social-Media-System: Während Facebook, Instagram & Co. für
  Screen-Time optimieren, optimiert RLS für Meeting-Time. Die Innovation liegt in der
  **Integration**: Karte + Kalender + Feed + Web-of-Trust arbeiten als ein System, das Menschen
  systematisch zu Handlung bewegt.

  **Einzigartig:** (1) Web-of-Trust durch physische Treffen verifiziert – kein Bot kann ein
  QR-Code-Scanning beim Pasta-Dinner faken. (2) Geo-First statt Geo-Tagged: Entfernung ist
  Kern-Feature, nicht Metadata. (3) Anti-Skalierung: Bewusst hyperlocal (< 5km), weil echte
  Gemeinschaft nicht skaliert. (4) Modular + Selfhosted + Community-Owned – alle drei zusammen,
  nicht entweder-oder.

  ## Zielgruppe (max. 100 Wörter)

  **Primär:** Lokale Gemeinschaften, die sich selbst organisieren wollen –
  Nachbarschafts-Initiativen, Urban-Gardening-Projekte, Repair-Cafés, Sport-Gruppen,
  Foodsharing-Circles. Menschen zwischen 25-45, technikaffin aber frustriert von Big-Social-Media.

  **Sekundär:** Organisationen, die Communities enablen – Transition Towns, Solidarische
  Landwirtschaften, Genossenschaften, progressive Stadtverwaltungen.

  **Nicht:** Große Unternehmen, kommerzielle Event-Veranstalter, Influencer-getriebene Plattformen.

  **Gemeinsamer Nenner:** Alle wollen echte Begegnungen statt digitaler Schein-Vernetzung. Alle
  brauchen Tools, die Selbstorganisation erleichtern, nicht Plattform-Abhängigkeit erzeugen. Alle
  teilen Werte: Privacy, Community-Ownership, Open-Source, lokale Autonomie.

  ## Meilensteine (max. 100 Wörter)

  **M1 (Monate 1-2):** Core-Plattform Production-Ready – Sichere Authentifizierung
  (DID-Integration), Performance-Optimierung (< 200ms Page-Load), Automated Testing (> 80%
  Coverage), DSGVO-Compliance.

  **M2 (Monate 3-4):** Aktivierungs-Mechanismen – Kalender-Integration mit Reminders,
  Web-of-Trust-System mit QR/NFC-Scanning, Geo-Filter mit Privacy-Zones, Event-Suggestions
  basierend auf Netzwerk.

  **M3 (Monat 5):** Federation & Deployment – Docker-Setup für Selfhosting, Federation-Protokoll
  für Community-übergreifende Events, Ansible-Playbooks für One-Click-Deployment.

  **M4 (Monat 6):** Beta-Launch mit 3 Pilot-Communities – User-Testing, Performance-Monitoring,
  Documentation (Admin-Guides, User-Tutorials), Bug-Fixes & Iteration basierend auf Feedback.

  ## Team (max. 30 Wörter)

  Sebastian [Nachname]: Full-Stack-Entwickler mit 8+ Jahren Erfahrung in Web-Technologien,
  Privacy-Tools und Community-Plattformen. Leidenschaft für lokale Resilienz, Open-Source, und
  Anti-Überwachungs-Technologie.

  ## Erfahrung (max. 100 Wörter)

  8+ Jahre Full-Stack-Development: React, Node.js, Progressive Web Apps. Expertise in
  Privacy-by-Design (Differential Privacy, E2E-Encryption), Geo-Datenbanken (PostGIS, Spatial
  Queries), Decentralized Systems (DIDs, Federation-Protokolle).

  Relevante Projekte: Community-Kalender für Transition-Town-Initiative (2020-2022),
  Werkzeug-Sharing-Plattform mit Trust-System (2021), Nachbarschafts-App mit Geo-Filter
  (Proof-of-Concept 2023).

  Open-Source-Beiträge: Leaflet-Plugins, React-Kalender-Komponenten, Privacy-Tools.

  Persönlich: Aktiv in lokaler Repair-Café-Initiative, Foodsharing-Circle, Community-Garten. Die
  Frustration über fehlende Tools für Selbstorganisation motiviert dieses Projekt – ich baue, was
  ich selbst brauche.

  ## Arbeitsstunden

  Geschätzter Aufwand: 800 Stunden (20 Stunden/Woche über 40 Wochen = 6 Monate)

  ## Motivation (max. 100 Wörter)

  Ich habe genug von Einsamkeit und Scrolling. Von Apps, die "Vernetzung" versprechen und Isolation
   liefern. Von Plattformen, die lokale Initiativen abhängig machen statt befähigen.

  Real Life Stack ist meine Antwort: Eine Plattform, die Menschen systematisch in echte Begegnungen
   schiebt. Die nicht fragt "wie halte ich User online?", sondern "wie bekomme ich sie offline?".
  Die Gemeinschaft nicht monetarisiert, sondern möglich macht.

  Die Vision: In jeder Nachbarschaft läuft eine Instanz. Menschen organisieren sich selbst –
  Pasta-Dinners, Werkzeug-Pools, Repair-Cafés. Ohne Werbung, ohne Algorithmus, ohne Überwachung.
  Nur echte Nachbarn, die sich kennenlernen. Das ist die digitale Infrastruktur, die wir brauchen.

  ## Second-Stage-Förderung

  Ja, wir haben Interesse an einer Second-Stage-Förderung.

  ## Second Stage: Schwerpunkt (max. 175 Wörter)

  In Second Stage liegt der Fokus auf **Adoption & Ecosystem**:

  **1. Community-Onboarding-Programm:** Wir begleiten 10-15 Communities beim Launch ihrer
  RLS-Instanz – von technischem Setup über Community-Building bis zur Etablierung von
  Governance-Strukturen. Dabei entwickeln wir Best-Practices, Templates und Playbooks, die weitere
  Communities nutzen können.

  **2. Advanced Features:** Basierend auf Pilot-Feedback entwickeln wir Module der zweiten
  Generation: Zeitbank-Integration (Leistungstausch ohne Geld), Governance-Tools (Konsent-basierte
  Entscheidungen), Ressourcen-Management (Werkzeuge, Räume, Know-how teilen), optionale
  Mikro-Payment-Integration für Solidarische Ökonomie.

  **3. Federation-Netzwerk:** Communities können Events über Instanz-Grenzen teilen. Beispiel:
  Repair-Café-Netzwerk koordiniert Ersatzteile-Lieferungen zwischen Städten. Das
  Federation-Protokoll ermöglicht Zusammenarbeit ohne Zentralisierung.

  **4. Sustainability:** Entwicklung eines Community-Support-Modells – Mix aus Spenden, kommunaler
  Förderung, Solidarischer Finanzierung. Ziel: Langfristige Weiterentwicklung unabhängig von
  VC-Kapital.

  **5. Impact-Measurement:** Welche Mechanismen aktivieren am besten? Welche Community-Strukturen
  sind erfolgreich? Wir dokumentieren Learnings für weitere Initiativen.

  ## Second Stage: Meilensteine (max. 100 Wörter)

  **M1 (Monate 7-9):** Community-Onboarding – 10 Pilot-Communities live, Onboarding-Dokumentation,
  Admin-Training-Programm.

  **M2 (Monate 10-12):** Advanced Modules – Zeitbank-System, Governance-Tools (Proposals, Voting,
  Konsent), Ressourcen-Management-Features.

  **M3 (Monate 13-15):** Federation-Network – Cross-Instance-Events, Federated-Identity,
  Community-Directory (dezentrales Discovery).

  **M4 (Monate 16-18):** Sustainability & Impact – Community-Support-Modell etabliert,
  Impact-Report (Meetups generated, Communities activated, User-Retention), Roadmap für
  Post-Förderung, Conference-Präsentationen zur Verbreitung.

  **Ergebnis:** 15+ aktive Communities, 500+ regelmäßige Nutzer, funktionierende
  Sustainability-Strategie, Open-Source-Ecosystem für weitere Entwicklung.
