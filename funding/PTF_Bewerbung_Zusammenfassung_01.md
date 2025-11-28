# PTF Bewerbung - Prototype Fund

## 1. PROJEKTTITEL

[PROJEKTNAME_PLATZHALTER]

---

## 2. PROJEKTBESCHREIBUNG

**Länge: 100 Wörter | Aktuell: 69 Wörter ✅**

[PROJEKTNAME_PLATZHALTER] ist ein modularer Frontend-Baukasten für lokale Communities, die echte Begegnungen fördern möchten. Wir entwickeln wiederverwendbare Komponenten (Karte, Kalender, Gruppen, Profile, Feed) mit einheitlicher Daten- und Identitätsschnittstelle. Eine Connector-Struktur entkoppelt Frontend von Backend-Implementierungen. Communities können die Komponenten als anpassbare Whitelabel-App selbst hosten. Statt dass jede Initiative eigene Tools bauen muss, schaffen wir gemeinsame Infrastruktur für dezentrale, selbstbestimmte Zusammenarbeit. Ein Referenz-Backend (Docker) und Dokumentation senken die Einstiegshürde für nicht-technische Gruppen.

---

## 3. GESELLSCHAFTLICHE HERAUSFORDERUNG

**Länge: 175 Wörter | Aktuell: 127 Wörter ✅**

Echte Veränderung passiert im echten Leben — doch viele digitale Werkzeuge fördern vor allem Online-Zeit statt lokale Begegnungen. Die meistgenutzten "sozialen" Apps sind Teil einer Aufmerksamkeitsökonomie, die darauf ausgelegt ist, Menschen möglichst lange am Bildschirm zu halten. Studien zeigen: Die Begrenzung von Social-Media-Nutzung reduziert Einsamkeit und Depression signifikant (Hunt et al., 2018: https://guilfordjournals.com/doi/10.1521/jscp.2018.37.10.751).

Besonders betroffen sind kleinere Initiativen, Nachbarschaftsnetzwerke und lokale Projekte: Sie wollen sich dezentral und selbstbestimmt organisieren, besitzen aber weder die Ressourcen noch das technische Know-how, um eigene Infrastruktur aufzubauen. Bestehende Plattformen sind primär auf Aufmerksamkeit und Reichweite optimiert, nicht auf vertrauensbasierte Zusammenarbeit vor Ort.

Es fehlt eine offene, modulare Infrastruktur, die Communities nach ihren Bedürfnissen anpassen können — ohne Abhängigkeit von zentralen Diensten, ohne technische Hürden, mit Fokus auf echte Begegnungen und kollektives Handeln.

---

## 4. TECHNISCHE UMSETZUNG

**Länge: 175 Wörter | Aktuell: 130 Wörter ✅**

Wir entwickeln einen modularen Frontend-Baukasten in TypeScript mit React oder Vue. Das Herzstück ist eine einheitliche Daten- und Identitätsschnittstelle, die alle Komponenten nutzen. Eine Connector-Struktur abstrahiert Backend-Zugriffe und ermöglicht verschiedene Implementierungen — von klassischen REST-APIs bis zu föderierten Protokollen.

Die fünf Kernmodule sind:
- **Karte** (Leaflet/MapLibre mit Geo-Filter für lokale Suche)
- **Kalender** (CalDAV-Integration für Event-Koordination und Synchronisation mit externen Kalender Clients)
- **Gruppen** (Rollen, Governance-Strukturen)
- **Profile** (Identitätsverwaltung) und **Feed** (Activity Streams).
Alle Modul ist eigenständig nutzbar und über die gemeinsame Schnittstelle interoperabel.

Als Referenz-Backend entwickeln wir eine Node.js-Implementierung mit Docker-Setup für einfaches Self-Hosting. Die Whitelabel-Referenz-App zeigt, wie Communities die Komponenten nach ihren Bedürfnissen zusammenstellen können. Wir bauen auf bewährten Standards (CalDAV, iCal, OAuth/OIDC) und dokumentieren Schnittstellen ausführlich, damit andere Projekte die Komponenten integrieren oder eigene Backends anbinden können.

---

## 5. AKTUELLER STAND

**Länge: 100 Wörter | Aktuell: 73 Wörter ✅**

Das Projekt [PROJEKTNAME_PLATZHALTER]befindet sich in der Konzeptphase. Wir haben die Architektur entworfen, Module spezifiziert und eine Vergleichsanalyse mit bestehenden Projekten (Karrot, Bonfire, Mobilizon und weiteren) durchgeführt.
Erste Konzeptenetwürfe auch für Gamification und Web-of-Trust liegen vor.  
Unser Team hat Erfahrung aus den Projekten ocelot.social (Community-Plattform) und Utopia-Map (Karte für nachhaltige Initiativen). Die PTF-Förderung würde die Entwicklung des Frontend-Baukastens, der Connector-Struktur und der fünf Kernmodule ermöglichen — von der Konzeption zur nutzbaren Open Source ReferenzInfrastruktur.

---

## 6. LINK ZUM PROJEKT

https://github.com/it4c/spec

---

## 7. INNOVATION / ÄHNLICHE ANSÄTZE

**Länge: 100 Wörter | Aktuell: 83 Wörter ✅**

Ähnliche Open Source Projekte existieren, aber keines vereint alle Dimensionen:
- **Karrot** teilt unsere Face-to-Face-Philosophie, ist aber eher monolithisch und nicht föderierbar.
- **Bonfire** hat eine modulare Architektur, fokussiert aber nicht auf Real-Life-Aktivierung.
- **Mobilizon** bietet Events und Federation, aber keine modulare Komponenten-Bibliothek.
- **Nextcloud** und **Hubzilla** sind umfassende Plattformen, aber nicht speziell für lokale Vernetzung optimiert.

[PROJEKTNAME_PLATZHALTER] schließt diese Lücke: Die Kombination aus Geo-First-Ansatz, modularem Frontend-Baukasten, Web-of-Trust durch physische Begegnungen, Gamification für Aktivierung und Standards-basierter Architektur — alles selbst hostbar und anpassbar.

---

## 8. ZIELGRUPPE

**Länge: 100 Wörter | Aktuell: 67 Wörter ✅**

Primäre Zielgruppe sind lokale Initiativen wie Nachbarschaftsnetzwerke, Transition-Town-Gruppen, solidarische Landwirtschaft, Repair-Cafés und ähnliche selbstorganisierte Communities. Sekundär: Entwicklerinnen, die Tools für lokale Vernetzung bauen.

Wir erreichen sie über bestehende Netzwerke (Utopia-Map-Community, ocelot.social-Partner), Konferenzen (Bits & Bäume, FOSDEM, re:publica) und direkte Zusammenarbeit mit 3-5 Pilotgruppen in der Second Stage. Die ausführliche Dokumentation und Docker-Setup ermöglichen technisch weniger versierten Gruppen den Einstieg. Open-Source-Veröffentlichung auf GitHub/Codeberg fördert Beiträge aus der Entwickler-Community.

---

## 9. MEILENSTEINE (6 MONATE FÖRDERUNG)

**Länge: 100 Wörter | Aktuell: 79 Wörter ✅**

**M1 (Monat 1-2): Frontend-Baukasten & Schnittstelle** — Komponenten-Bibliothek (React/Vue, TypeScript), einheitliche Daten- und Identitäts-API, Basis-Styling.

**M2 (Monat 2-3): Connector-Struktur** — Abstraktionsschicht ausdefinieren, Referenz-Connector für REST-API implementieren, Dokumentation.

**M3 (Monat 3-4): Kernmodule** — Map (Leaflet/MapLibre, Geo-Filter), Kalender (CalDAV-Integration), Gruppen (Rollen, Governance), Profile, Feed.

**M4 (Monat 4-5): Whitelabel-App** — Referenz-Backend (Node.js), Docker-Setup, Deployment-Dokumentation, Beispiel-Konfigurationen.

**M5 (Monat 5-6): Trust-Graph Basis** — Datenmodell für Beziehungen, API-Schnittstelle, Visualisierung "Gemeinsame Events".

**M6 (Monat 6): Gamification-Konzept** — Recherche, Design-Entwürfe, technische Grundlagen (Datenmodell, API-Vorbereitung für Second Stage).

---

## 10. TEAM

**4 Personen:**

- **Anton Tranelis** — Projektkoordination, System-Architektur und Identitätssysteme  
  https://github.com/antontranelis

- **Ulf Gebhardt** — Entwicklung, DevOps, Infrastruktur  
  https://github.com/ulfgebhardt

- **Sebastian Stein** — Frontend-Entwicklung, UX/UI  
  https://github.com/sebastian2357
  
- **Mathias Lenz** — Entwicklung, Testing, Dokumentation      
  https://github.com/mahula

---

## 11. ERFAHRUNG

**Länge: 100 Wörter | Aktuell: 30 Wörter** ⚠️ (TODOs ausfüllen!)

**Anton Tranelis:**
- TODO

**Ulf Gebhardt:**
- TODO

**Sebastian Stein:**
- TODO

**Mathias Lenz:**
- Utopia Map (https://github.com/utopia-os/utopia-map) - Entwickling, Testautomatisierung, DevOps
- ocelot.social (https://github.com/Ocelot-Social-Community/Ocelot-Social) - Entwickling, Testautomatisierung, DevOps, Dokumentation

---

## 12. ARBEITSSTUNDEN

**1900 Stunden** (Maximalförderung für 4-Personen-Team)

---

## 13. MOTIVATION

**Länge: 100 Wörter | Aktuell: 84 Wörter ✅**

Wir haben bei ocelot.social und Utopia-Map erlebt, wie schwer es ist, lokale Communities digital zu unterstützen, ohne sie in zentralisierte Plattformen zu zwingen. Jede Initiative baut eigene Tools oder nutzt proprietäre Dienste — Ressourcen werden verschwendet, Daten gehen verloren, Communities bleiben isoliert.

Wir glauben: Echte Veränderung braucht echte Begegnungen. Digitale Tools sollten Menschen zusammenbringen, nicht binden. Als erfahrene Open-Source-Entwickler wollen wir Infrastruktur schaffen, die Communities selbstbestimmt nutzen können — modular, anpassbar, selbst hostbar. Die PTF-Förderung ermöglicht uns, diese Vision in nutzbaren Code zu verwandeln.

---

## 14. SECOND STAGE FÖRDERUNG

**Ja**, wir beantragen die viermonatige Second-Stage-Förderung.

---

## 15. SECOND STAGE: SCHWERPUNKT

**Länge: 175 Wörter | Aktuell: 112 Wörter ✅**

Nach der sechsmonatigen Entwicklungsphase haben wir einen funktionsfähigen Prototyp — aber für nachhaltige Nutzung braucht es mehr als Code. Die Second Stage fokussiert auf **Praxistest, Community-Aufbau und Nachhaltigkeit**.

**Pilotgruppen-Testing:** Wir arbeiten mit 3-5 lokalen Initiativen zusammen (z.B. Transition-Town-Gruppen, solidarische Landwirtschaft, Repair-Cafés), die den Baukasten in realen Szenarien testen. Ihr Feedback fließt in Verbesserungen ein.

**Gamification-Implementierung:** Basierend auf dem Konzept aus Phase 1 entwickeln wir das vollständige Gamification-System (Badges, Streaks, Leaderboards) und QR/NFC-Scanning für Event-Check-ins.

**Web-of-Trust-Erweiterung:** Trust-Score-Berechnung, Feed-Priorisierung basierend auf Vertrauen, erweiterte Visualisierungen.

**Community & Dokumentation:** Tutorials, Video-Anleitungen, Onboarding-Material für nicht-technische Nutzer*innen. Präsentationen auf Konferenzen (Bits & Bäume, FOSDEM). Aufbau einer Contributor-Community.

**Ziel:** Ein produktionsreifes Tool, das Communities eigenständig nutzen und weiterentwickeln können.

---

## 16. SECOND STAGE: MEILENSTEINE (4 MONATE)

**Länge: 100 Wörter | Aktuell: 45 Wörter ✅**

**SS1 (Monat 1): Pilotgruppen-Onboarding** — 3-5 Initiativen auswählen, Installation begleiten, initiales Feedback sammeln.

**SS2 (Monat 2): Gamification & QR-Scanning** — Vollständiges System implementieren, Event-Check-ins, Badge-Vergabe.

**SS3 (Monat 3): Web-of-Trust-Erweiterung** — Trust-Score, Feed-Priorisierung, erweiterte Visualisierungen.

**SS4 (Monat 4): Dokumentation & Community** — Tutorials, Videos, Konferenz-Präsentationen, Contributor-Onboarding.

---
