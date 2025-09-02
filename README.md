# 🌍 Local Change Platform

**Eine modulare Open-Source-Plattform für lokale Vernetzung und gesellschaftlichen Wandel**

## Vision

Wir schaffen eine gemeinsame technische Grundlage für Projekte, die gesellschaftlichen Wandel vorantreiben, Menschen vernetzen und koordinierte dezentrale Veränderung ermöglichen. Anstatt dass jedes Projekt das Rad neu erfindet, bieten wir einen modularen Baukasten, der von verschiedensten Initiativen genutzt und erweitert werden kann.

## 🎯 Ziele

- **Vereinheitlichung**: Eine gemeinsame technische Basis für Wandel-Projekte
- **Modularität**: Flexibles Plugin-System für unterschiedliche Anwendungsfälle
- **Interoperabilität**: Offene Standards für nahtlose Kommunikation zwischen Plattformen
- **Dezentralisierung**: Lokale Autonomie bei globaler Vernetzung
- **Wiederverwendbarkeit**: Einmal entwickeln, vielfach nutzen

## 🏗️ Architektur

### Technologie-Stack

- **Frontend**: TypeScript + React/Vue/Angular Components
- **Backend**: Microservices-Architektur
- **Datenbank**: Graph Database
- **Protokolle**: OAuth 2.0, CalDAV, ActivityPub, Murmurations, ...
- **Container**: Docker & Kubernetes für Deployment

### Kernkomponenten

1. **Modularer Frontend-Baukasten**
   - Plugin-basierte Architektur
   - Wiederverwendbare UI-Komponenten
   - Themeable Design-System

2. **Backend-Microservices**
   - Authentifizierung & Autorisierung
   - Notifications
   - Event-Management
   - Geo-Services
   - Matchmaking
   - File Storage
   - Automation

3. **Datenmodell & Standards**
   - Einheitliches Kern-Datenmodell
   - Erweiterbare Schemas
   - API-Versionierung

## 📁 Projektstruktur

```
local-change-platform/
│
├── /modules/                 # User Stories & Modul-Definitionen
│   ├── calendar.md          # Kalender-Modul für Events
│   ├── map.md              # Karten-Modul für lokale Übersicht
│   ├── feed.md             # Aktivitäts-Feed & Neuigkeiten
│   ├── market.md           # Marktplatz für Ressourcen-Austausch
│   ├── groups.md           # Gruppen & Gemeinschaften
│   └── messaging.md        # Kommunikations-Modul
├── /services/             # Backend-Microservices
│   ├── auth/            # Authentifizierungs-Service
│   ├── api-gateway/     # API-Gateway
│   ├── notification/    # Benachrichtigungs-Service
│   ├── sync/           # Synchronisations-Service
│   └── federation/     # Föderation & ActivityPub
├── /data/                   # Datenmodell-Definitionen
├── /prototypes/            # Frontend-Prototypen
└── /tests/            # Test-Suites
```

## 🚀 Schnellstart

## 📦 Module

### Verfügbare Module

| Modul | Beschreibung | Status |
|-------|--------------|--------|
| **Calendar** | Event-Management und Terminkoordination | 🟢 Stabil |
| **Map** | Geografische Visualisierung lokaler Ressourcen | 🟡 Beta |
| **Feed** | Aktivitäts-Stream und Neuigkeiten | 🟢 Stabil |
| **Market** | Ressourcen-Austausch und Sharing-Economy | 🔴 Planung |
| **Groups** | Community-Bildung und Gruppenverwaltung | 🟡 Beta |
| **Messaging** | Sichere Kommunikation | 🔴 Planung |

### Protokolle

- **OAuth 2.0**: Sichere Authentifizierung und Autorisierung
- **CalDAV**: Kalender-Synchronisation
- **ActivityPub**: Föderierte soziale Netzwerke
- **Murmurations**: Dezentrales Daten-Sharing-Protokoll
- **GeoJSON**: Geografische Datenformate


## 👥 Beitragen

Wir freuen uns über Beiträge! Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Details.

## 📊 Roadmap

### Phase 1: Fundament (Q1 2025)
- [ ] Projekt-Setup und Architektur
- [ ] Kern-Datenmodell
- [ ] Basis-Module (Calendar, Feed, Map)
- [ ] Authentication-Service

### Phase 2: Erweiterung (Q2 2025)
- [ ] Groups & Projects Module
- [ ] ActivityPub-Integration
- [ ] Mobile Apps (React Native)
- [ ] Föderations-Features

### Phase 3: Skalierung (Q3 2025)
- [ ] Marketplace-Modul
- [ ] Governance-Tools
- [ ] Performance-Optimierung
- [ ] Multi-Tenancy-Support

### Phase 4: Ökosystem (Q4 2025)
- [ ] Plugin-Marketplace
- [ ] Entwickler-Portal
- [ ] Hosting-Service
- [ ] Community-Building

## 🤝 Partner & Nutzer

Organisationen, die unsere Plattform nutzen oder daran mitarbeiten:

- [Utopia Map]
- [ozelot.social]
- [GeDANKE]
- [Klanggarten Projektportal]

*Füge deine Organisation hinzu durch einen PR!*


## 🙏 Danksagungen

- Allen Contributor:innen und der Open-Source-Community
- Projekten, die uns inspiriert haben
- Lokalen Initiativen, die den Wandel vorantreiben

---

**Gemeinsam gestalten wir die Zukunft - lokal vernetzt, global gedacht.** 🌱

*"Sei du selbst die Veränderung, die du dir wünschst für diese Welt." - Mahatma Gandhi*
