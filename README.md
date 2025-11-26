# 🌍 Real Life Stack

**Modularer Baukasten für lokale Vernetzung und dezentrale Zusammenarbeit**

## Vision

Der Real Life Stack schafft eine gemeinsame technische Grundlage für Projekte und Gemeinschaften, die lokale Vernetzung stärken, kollektives Handeln ermöglichen und echte Begegnungen fördern möchten. Statt dass jede Initiative eigene Tools bauen muss, bieten wir einen modularen, erweiterbaren Baukasten, mit dem Communities ihre eigene App gestalten oder mit bestehenden Backends verbinden können.

## 🎯 Ziele

* **Modularer UI-Baukasten:** Wiederverwendbare Komponenten für Karte, Kalender, Gruppen, Profile und Feed.
* **Konfigurierbare Whitelabel-App:** Sofort einsetzbare Anwendung, die ohne Programmierkenntnisse angepasst und selbst gehostet werden kann.
* **Klare Schnittstellen:** Eine einheitliche Daten- und Identitätsschnittstelle entkoppelt Frontend und Backend.
* **Flexible Backend-Anbindung:** Connector-Architektur ermöglicht klassische Server-Backends ebenso wie zukünftige local-first-, p2p- oder E2EE-basierte Systeme.
* **Grundlage für vertrauensbasierte Identität:** Schlüsselbasierte Accounts und ein einfaches Web-of-Trust-Modell können integriert werden.
* **Zukunftsfähige Infrastruktur:** Offener Baukasten, der erweitert, in andere Projekte eingebettet oder als Basis für neue Community-Tools genutzt werden kann.

## 🏗️ Architektur

### Frontend-Baukasten

* TypeScript + modernes Framework (React oder Vue)
* Klare **Daten- und Identitätsschnittstelle**
* Erweiterbare Modulstruktur
* Themebares Design-System

### Connector-Schicht

* Definiert ein Muster zur Anbindung verschiedener Backends
* Eine Referenzimplementierung wird mitgeliefert
* Weitere Connectoren können von der Community entwickelt werden (REST, local-first, p2p, E2EE …)

### Referenz-Backend

* Leichtgewichtiges Open-Source-Backend
* Docker-Setup für einfache Einrichtung
* Grundfunktionen: Gruppen, Events, Orte, Profile

### Identität & Sicherheit

* Schlüsselbasierte Identitäten (optional als DIDs abbildbar)
* Einfaches Web-of-Trust-Modell (Einladungen, Bestätigungen)
* Vorbereitung für E2EE-fähige Datenpfade

## 📁 Projektstruktur

```
real-life-stack/
│
├── /modules/               # Modul-Spezifikationen
│   ├── calendar.md
│   ├── map.md
│   ├── feed.md
│   ├── groups.md
│   └── profiles.md
├── /connectors/            # Backend-Connectoren
│   └── standard-backend/
├── /reference-app/         # Whitelabel-App
├── /design-system/         # UI-Komponenten & Themes
└── /tests/                 # Test-Suites
```

## 📦 Module

| Modul        | Beschreibung                | Status            |
| ------------ | --------------------------- | ----------------- |
| **Calendar** | Events & Terminkoordination | 🟡 In Entwicklung |
| **Map**      | Lokale Orte & Ressourcen    | 🟡 In Entwicklung |
| **Feed**     | Aktivitäten aus Modulen     | 🟡 In Entwicklung |
| **Groups**   | Gruppen & Rollen            | 🟡 In Entwicklung |
| **Profiles** | Nutzerprofile & Identität   | 🟡 In Entwicklung |

## 🔌 Connectoren

* **Standard-Backend** (mitgeliefert)
* **REST Connector** (Planung)
* **local-first / CRDT Connector** (Second Stage)
* **p2p/E2EE Connector** (Second Stage)

## 🤝 Partner & Nutzer

* [Utopia Map](https://github.com/utopia-os/utopia-map/)
* [ocelot.social](https://github.com/Ocelot-Social-Community/ocelot.social)

---


**Gemeinsam gestalten wir die Zukunft - lokal vernetzt, global gedacht.** 🌱

*"Sei du selbst die Veränderung, die du dir wünschst für diese Welt." - Mahatma Gandhi*

