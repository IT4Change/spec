# Narativ

## A) Annahmen

### **1. Nutzer & gesellschaftlicher Kontext**

#### **1.1 Gesellschaftliche Entwicklung**

* Große gesellschaftliche Herausforderungen erfordern **lokales, eigenverantwortliches Handeln**.
* Digitale Tools sollten **reale Begegnungen und Gemeinschaft** stärken – nicht ersetzen.

#### **1.2 Bedürfnisse von Initiativen & Communities**

* Menschen und Gruppen wollen sich **dezentral, kollaborativ und selbstbestimmt** organisieren.
* Es fehlt eine **offene, modulare Infrastruktur** für lokale, selbstorganisierte Vernetzung.
* Die meisten Initiativen besitzen **kaum technisches Know-how**, haben aber hohen Bedarf an praktikablen Werkzeugen.

#### **1.3 Probleme bestehender Plattformen**

* Aktuelle Tools sind primär auf **Aufmerksamkeit und Reichweite** optimiert, nicht auf lokale Zusammenarbeit.
* Sie behindern **vertrauensbasierte Beziehungen** und **gemeinsames Handeln in der realen Welt**.

#### **1.4 Soziale Mechanismen**

* Lokale Gruppen funktionieren über **Vertrauensnetzwerke, Reputation und Nähe**.
* Digitale Systeme müssen solche **sozialen Dynamiken unterstützen**, nicht stören.

---

### **2. Technischer Kontext**

#### **2.1 Stand der Technik**

* Lokale Communities nutzen überwiegend **zentrale Client-Server-Plattformen**, obwohl sie dezentral arbeiten.
* Moderne Ansätze wie **Local-first**, **p2p** und **E2EE** bieten bessere Grundlagen für lokale Selbstorganisation.
* Diese Technologien sind jedoch **noch jung, kaum standardisiert und nicht breit erprobt**.
* Deshalb basieren die meisten real existierenden Tools weiterhin auf **klassischer Client-Server-Infrastruktur**.

#### **2.2 Architektur-Anforderungen**

* Ein Baukasten muss **Backend-agnostisch** sein, um klassische und neue Architekturformen gleichermaßen zu unterstützen.
* Eine **klare Schnittstelle** zwischen Frontend und Backend ist dafür zentral.
* Architektur muss **erweiterbar, modular und austauschbar** sein (Plugins, Module).

#### **2.3 Sicherheit & Identität**

* Nutzer-Identitäten sollten nicht von zentralen Diensten abhängig sein → **Schlüsselbasierte IDs / DIDs**.
* Private Kommunikation sollte **Ende-zu-Ende verschlüsselt** sein.
* Daten sollen dezentral verwaltbar sein, ohne Abhängigkeit von externen Servern.

#### **2.4 Nutzung & Deployment**

* Communities benötigen **einfach anpassbare Whitelabel-Apps**, ohne technische Hürden.
* Die Architektur muss flexibel sein (self-hosted, Föderation, später p2p).

---

## B) Projektziele

1. **Modularer Baukasten**, aus dem Communities ihre eigenen lokalen Vernetzungs-Apps zusammenstellen können.
2. **Flexibel anpassbare Whitelabel-App**, die sofort nutzbar ist.
3. **Frontend-first Architektur**, unabhängig vom Backend.
4. **Klare Daten- und Identitätsschnittstelle**, die Frontend und Backend trennt.
5. **Connector-Modell**, mit dem verschiedene Backends angebunden werden können.
6. **Minimaler, stabiler Prototyp** (Map, Kalender, Gruppen, Profile, Feed).
7. **Einstiegsfreundliche Selbsteinrichtung** (Docker, einfache Konfiguration über Admin-Oberfläche).
8. **Web of Trust** (Schlüsselpaare, Einladungen, Bestätigungen).
9. **Zukunftsfähige Grundlage** für Local-first-, p2p- oder E2EE-Funktionen.
10. **Offene Weiterentwicklung** durch die Community.
11. **Plugin-Architektur**.

---

## C) Bewerbungsziele

1. Das Projekt ist **realistisch** in 6 Monaten umsetzbar.
2. Es baut auf **bestehender Erfahrung** (ocelot.social, utopia-map) auf.
3. Es ist ein **Infrastrukturprojekt**, kein weiteres soziales Netzwerk.
4. Es erfüllt beide Prototype-Fund-Förderschwerpunkte:

   * **Software-Infrastruktur**
   * **Datensicherheit** (durch Identitätsschicht & E2EE-Fähigkeit)
5. Die Architektur lässt **Weiterentwicklung in der Second Stage** zu:

   * Federation
   * E2EE für mehrere Datentypen
   * CRDT / local-first
   * komplexeres Web-of-Trust
6. Der Impact ist **gesellschaftlich relevant** (lokale Vernetzung stärken).
7. Die Zielgruppen sind **real & konkret** (Urban Gardening, Repair-Cafés, Nachbarschaften, Jugendgruppen etc.).
8. Das Projekt ist **kein Monolith**, sondern **Baukasten + Referenz-App**.
9. Der Stack ist **wiederverwendbar** und kann Teil eines entstehenden Ökosystems werden.
10. Das Projekt adressiert die **Aufmerksamkeitsökonomie** als gesellschaftliches Problem.

---

## D) Technische Ziele

1. Implementieren eines **Frontend-Baukastens** in React oder Vue.
2. Definieren einer **einheitlichen Daten- und Identitätsschnittstelle**.
3. Erstellen einer **Connector-Struktur** (mit 1 konkretem Referenz-Connector).
4. Bereitstellen einer **Whitelabel-Referenz-App** (Docker).
5. Implementierung der Kernmodule:
   * Map
   * Kalender
   * Gruppen
   * Profile
   * Feed
6. Basis legen für Schlüsselbasierte Identität:
7. Basis für Trust-Graph und Web-of-Trust-Modell.
8. Vorbereitung der Architektur für:
   * Local-first
   * Federation / Interoperabilität
   * E2EE
   * p2p
9. Dokumentation
   * User Docs
   * Admin Docs 
   * Developer Docs
10. Testbetrieb mit Pilotgruppen

---

## E) Ziele aus sicht des Nutzers

1. **Einfach zu bedienen** — auch ohne Tech-Wissen.
2. **Sofort nutzbar**, aber **frei anpassbar**.
3. **Hilft bei echter Kooperation**, nicht nur Kommunikation.
4. Unterstützt:
   * Netzwerke aufbauen
   * Menschen einladen
   * Treffen planen
   * Orte koordinieren
   * Aufgaben verteilen
   * Fortschritt sichtbar machen
5. **Kein Vendor Lock-in** → Daten und Infrastruktur selbstbestimmt.
6. **Vertrauensbasierte Struktur** für sensible Inhalte.
7. Ermöglicht Gruppen, zu wachsen, statt in Tools zu stagnieren.
8. Macht lokal-organisierte Aktionen wirklich einfacher (statt Chat-Chaos).

---

## **F) Community- & Zukunftsziele**

*(Second Stage + Beyond)*

1. Aufbau einer **aktiven Maintainer- und Contributor-Community**.
2. Vollwertiges Web-of-Trust.
3. Implementierung von **E2EE** für mehrere Datentypen.
4. Aufbau eines **Local-first / CRDT-Backends**.
5. Optionaler **p2p-Connector**.
6. Optionale **Federation** (ActivityPub, Murmurations).
7. Governance-Konzept für:
   * Module
   * Connectoren
   * Whitelabel-App
8. Nachhaltige Weiterentwicklung (Release-Zyklen, Roadmap).
9. Zusammenarbeit mit:
   * Civic-Tech-Initiativen
   * Commons-Projekten
   * Kommunen / Bildungsprojekten
10. Launch einer **Public Beta** mit Onboarding-Workflows.
