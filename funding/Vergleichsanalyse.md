# Vergleichsanalyse: [PROJEKTNAME_PLATZHALTER] vs. bestehende Lösungen

**Stand: November 2025**

---

## 1. Vergleichstabelle (Open-Source-Projekte)

| Feature                        | Mobilizon | Karrot  | Bonfire | Hubzilla   | Epicyon | Nextcloud  |
|--------------------------------|-----------|---------|---------|------------|---------|------------|
| **Open Source**                | ✅ AGPL   | ✅ AGPL | ✅ AGPL | ✅ MIT     | ✅ AGPL | ✅ AGPL    |
| **Self-Hosted**                | ✅        | ✅      | ✅      | ✅         | ✅      | ✅         |
| **Modular**                    | ❌        | ✅ ^1^  | ✅      | ✅         | ❌      | ✅         |
| **White-Label**                | 🟡        | 🟡      | ✅      | ✅         | 🟡      | ✅         |
| **Federation**                 | ✅ AP     | ❌      | ✅ AP   | ✅ Zot+AP  | ✅ AP   | 🟡         |
| **Karte/Geo**                  | ✅        | ✅      | ✅ ^2^  | ❌         | ❌      | ❌         |
| **Geo-First (<5km)**           | ❌        | 🟡      | ❌      | ❌         | ❌      | ❌         |
| **Kalender**                   | ✅ ICS    | ✅      | 🟡 ^3^  | ✅         | ✅      | ✅ CalDAV  |
| **Feed/Social**                | 🟡        | ✅      | ✅      | ✅         | ✅      | 🟡         |
| **Gruppen**                    | ✅        | ✅      | ✅      | ✅         | ❌      | 🟡         |
| **Web-of-Trust**               | ❌        | 🟡      | ❌      | ❌         | ❌      | ❌         |
| **Real-Life-Aktivierung**      | 🟡        | ✅      | ❌      | ❌         | ❌      | ❌         |
| **Datenhoheit**                | ✅        | ✅      | ✅      | ✅         | ✅      | ✅         |
| **UX für Nicht-Techies**       | ✅        | ✅      | 🟡      | ❌         | 🟡      | 🟡         |
| **Aktive Entwicklung (2025)**  | ✅        | ✅      | ✅      | ✅         | ✅      | 🟡         |

**Legende:** ✅ = Ja | 🟡 = Teilweise/Via Extension/Geplant | ❌ = Nein | AP = ActivityPub

**Fußnoten:**
- ^1^ Karrot: Neues Plugin-System seit 2024/2025
- ^2^ Bonfire: Via `bonfire_geolocate` Extension (Leaflet-basiert, Geocoding, GraphQL API)
- ^3^ Bonfire: Via `bonfire_gatherings` (Events-Template) + Mosaic-Initiative (CalDAV geplant)

---

## 2. Rangliste der relevantesten Projekte

### Rang 1: Karrot 🥇

**Warum am nächsten:**
- Identische Kernphilosophie: "face-to-face activities on a local, autonomous and voluntary basis"
- Real-Life-Aktivierung als Kern-Feature
- Feedback-System für Aktivitäten
- Gruppen mit Governance (Rollen, Sanctions, Membership-Review)

**Kritische Lücken gegenüber [PROJEKTNAME_PLATZHALTER]:**
- Keine Federation
- Kein Web-of-Trust via physische Treffen (QR/NFC)
- Kein OAuth/OIDC als Identitäts-Glue
- Kein <5km Geo-Filter als Kern-Feature

### Rang 2: Bonfire 🥈

**Warum relevant:**
- Modulare Architektur ("Building blocks for communities")
- Hat Geo/Karte via `bonfire_geolocate` (Leaflet, Geocoding, GraphQL)
- Hat Events-Grundlagen via `bonfire_gatherings`
- Kalender-Integration via Mosaic geplant (CalDAV)
- ActivityPub + Bluesky-Bridges
- OIDC-Unterstützung (`bonfire_open_id`)

**Kritische Lücken gegenüber [PROJEKTNAME_PLATZHALTER]:**
- Kein Geo-First (<5km Filter)
- Kalender noch nicht als fertiges Kern-Feature
- Kein Web-of-Trust
- Kein Real-Life-Aktivierungs-Kreislauf

### Rang 3: Mobilizon 🥉

**Warum relevant:**
- Vollständige Federation (ActivityPub)
- Starke Schnittstellen (GraphQL, iCal, RSS)
- Events + Gruppen + Karte kombiniert

**Kritische Lücken gegenüber [PROJEKTNAME_PLATZHALTER]:**
- Monolithisch, nicht modular
- Kein Feed im klassischen Sinne
- Kein Web-of-Trust

### Rang 4-6: Hubzilla, Epicyon, Nextcloud

Diese Projekte haben jeweils spezifische Stärken, aber größere Lücken im Vergleich zu [PROJEKTNAME_PLATZHALTER].

---

## 3. Detailanalyse: Bonfire Geo-Extension

### bonfire_geolocate

| Aspekt         | Details                                        |
|----------------|------------------------------------------------|
| **Repository** | github.com/bonfire-networks/bonfire_geolocate  |
| **Lizenz**     | AGPL-3.0                                       |
| **Commits**    | 228 (aktiv gepflegt)                           |
| **Sprache**    | Elixir (73%), JavaScript (19.7%)               |

**Features:**
- Geolocation Schema
- Optional GraphQL API für Geolocations
- Geocoding (Adressen → Koordinaten)
- Reverse Geocoding (Koordinaten → Adressen)
- Leaflet Map LiveView Component

**Vergleich mit [PROJEKTNAME_PLATZHALTER]:**

| Aspekt                 | bonfire_geolocate | [PROJEKTNAME_PLATZHALTER] |
|------------------------|-------------------|---------------------------|
| **Kartenbibliothek**   | Leaflet           | Leaflet/MapLibre ✅       |
| **Geocoding**          | ✅                | Geplant ✅                |
| **Reverse Geocoding**  | ✅                | Geplant ✅                |
| **Geo-Filter (<5km)**  | ❌                | ✅ Kern-Feature           |
| **Privacy-Zones**      | ❌                | ✅ Geplant                |
| **Bounding-Box-Suche** | ❓                | ✅ Geplant                |

**Fazit:** Die Extension bietet solide Geo-Grundlagen, aber keinen Geo-First-Ansatz.

---

## 4. Schnittmengen-Analyse

### Bonfire & [PROJEKTNAME_PLATZHALTER]

| Gemeinsamer Aspekt   | Bonfire                              | [PROJEKTNAME_PLATZHALTER]  |
|----------------------|--------------------------------------|----------------------------|
| **Modularität**      | Extensions-System mit 50+ Modulen    | Modularer Baukasten        |
| **Karte/Geo**        | `bonfire_geolocate` mit Leaflet      | Leaflet/MapLibre           |
| **Events**           | `bonfire_gatherings` (Template)      | Kalender-Events            |
| **OIDC**             | `bonfire_open_id`                    | OAuth+OIDC als "Kleber"    |
| **Federation**       | ActivityPub + Bridges                | ActivityPub-kompatibel     |
| **Community-First**  | "Communities own their digital spaces" | Community-Ownership      |

### Karrot & [PROJEKTNAME_PLATZHALTER]

| Gemeinsamer Aspekt | Karrot                      | [PROJEKTNAME_PLATZHALTER]        |
|--------------------|-----------------------------|----------------------------------|
| **Philosophie**    | "face-to-face activities"   | "Meeting-Time statt Screen-Time" |
| **Aktivitäten**    | Aktivitäten-System          | Kalender-Events                  |
| **Feedback**       | Feedback nach Aktivitäten   | Post-Event-Vorschläge            |
| **Vertrauen**      | Newcomer-Trust-Prozess      | Web-of-Trust via QR/NFC          |
| **Gruppen**        | Gruppen mit Rollen          | Gruppen mit Governance           |

---

## 5. Unterschieds-Analyse

> **Hinweis:** Beide Tabellen vergleichen dieselben 6 Kern-Dimensionen, um eine direkte Gegenüberstellung zu ermöglichen. Diese Dimensionen entsprechen den Alleinstellungsmerkmalen aus Sektion 6.

### Bonfire vs. [PROJEKTNAME_PLATZHALTER]

| Dimension                    | Bonfire                   | [PROJEKTNAME_PLATZHALTER] | Bewertung                    |
|------------------------------|---------------------------|---------------------------|------------------------------|
| **Geo-First (<5km)**         | 🟡 Extension, kein Filter | ✅ Kern-Feature           | Bonfire hat Geo, aber nicht als Fokus |
| **Web-of-Trust (physisch)**  | ❌                        | ✅ QR/NFC                 | Fehlt bei Bonfire komplett   |
| **Anti-Social-Media-Design** | ❌                        | ✅                        | Bonfire ist klassisches Social Network |
| **Modularer Baukasten**      | ✅ 50+ Extensions         | ✅ Konzipiert             | **Stärke von Bonfire**       |
| **Standards (CalDAV, OIDC)** | 🟡 OIDC ✅, CalDAV 🚧     | ✅ Beide als Kern         | CalDAV noch in Entwicklung   |
| **Aktivierender Kreislauf**  | ❌                        | ✅                        | Fehlt bei Bonfire komplett   |

**Fazit Bonfire:** Starke technische Basis (Modularität, OIDC, Federation), aber philosophisch nicht auf Real-Life-Aktivierung ausgerichtet.

### Karrot vs. [PROJEKTNAME_PLATZHALTER]

| Dimension                    | Karrot                    | [PROJEKTNAME_PLATZHALTER] | Bewertung                    |
|------------------------------|---------------------------|---------------------------|------------------------------|
| **Geo-First (<5km)**         | 🟡 Implizit               | ✅ Explizit <5km          | Karrot hat Geo, aber nicht als Filter |
| **Web-of-Trust (physisch)**  | 🟡 Newcomer-Trust         | ✅ QR/NFC                 | Karrot hat Ansatz, aber nicht physisch |
| **Anti-Social-Media-Design** | ✅                        | ✅                        | **Gemeinsame Stärke**        |
| **Modularer Baukasten**      | 🟡 Plugin-System (neu)    | ✅ Konzipiert             | Karrot wird modularer        |
| **Standards (CalDAV, OIDC)** | ❌                        | ✅ Beide als Kern         | **Kritische Lücke** bei Karrot |
| **Aktivierender Kreislauf**  | ✅ Aktivitäten-Feedback   | ✅                        | **Gemeinsame Stärke**        |

**Fazit Karrot:** Philosophisch sehr nah (Anti-Social-Media, Aktivierung), aber technisch ohne Federation/OIDC-Standards.

---

## 6. Alleinstellungsmerkmal

| Dimension                      | Karrot | Bonfire | Mobilizon | **[PROJEKTNAME_PLATZHALTER]** |
|--------------------------------|--------|---------|-----------|-------------------------------|
| **Geo-First (<5km)**           | 🟡     | ❌      | ❌        | ✅ 🎯                         |
| **Web-of-Trust (physisch)**    | 🟡     | ❌      | ❌        | ✅ 🎯                         |
| **Anti-Social-Media-Design**   | ✅     | ❌      | ❌        | ✅ 🎯                         |
| **Modularer Baukasten**        | 🟡     | ✅      | ❌        | ✅ 🎯                         |
| **Self-Hosted + White-Label**  | ✅     | ✅      | ✅        | ✅ 🎯                         |
| **Standards (CalDAV, OIDC)**   | ❌     | ✅      | ✅        | ✅ 🎯                         |
| **Aktivierender Kreislauf**    | ✅     | ❌      | 🟡        | ✅ 🎯                         |

**Kernaussage:**
> Kein bestehendes Projekt vereint **alle** Dimensionen. [PROJEKTNAME_PLATZHALTER] schließt die Lücke zwischen Karrot (Philosophie) und Bonfire (Architektur) mit dem einzigartigen Fokus auf **Geo-First + Web-of-Trust + Aktivierender Kreislauf**.

---

## 7. Empfehlungen

1. **Bonfire genauer evaluieren** - Architektonisch am nächsten, `bonfire_geolocate` ist ausgereift
2. **Karrot-Team kontaktieren** - Philosophisch am nächsten, mögliche Lessons Learned
3. **Technische Entscheidung** - React/Vue vs. Elixir/LiveView abwägen

