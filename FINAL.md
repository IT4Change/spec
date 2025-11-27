# Narrative

## Annahmen

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


#### Einsamkeit

- **Die Einsamkeits-Epidemie ist real:** Über 40% der Menschen in Deutschland fühlen sich
regelmäßig einsam (Rheingold Institut 2023), während die Bildschirmzeit steigt.

- **Social Media verschlimmert das Problem:** Wir haben 500 "Freunde", kennen aber unsere
Nachbarn nicht. Apps optimieren für Engagement, nicht für Begegnungen.

#### Nur Digitales Engangement

- **Der "Commitment-Gap" ist das Hauptproblem:** Menschen finden Events interessant, gehen aber
  nicht hin. Die Reibung zwischen "zusagen" und "erscheinen" ist zu hoch.

- Nutzer beiben an der Platform kleben. Screentime statt Meeting time.

#### Fälschungssicherheit & Spamschutz

- **Web-of-Trust durch physische Treffen ist fälschungssicher:** Kein Bot kann ein
QR-Code-Scanning beim echten Pasta-Dinner faken. Das ist einzigartiger Schutz gegen Manipulation.

- **Hyperlocal funktioniert besser als global:** Echte Gemeinschaft braucht < 5km Radius.
  Bewusste Anti-Skalierung ist ein Feature, kein Bug.


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
- Gemeinschaften haben das Bedürfnis die Lösungen an ihre Gemeinschaft anzupassen. Sie wünschen die Lösung zu ihrer zu machen. Wir machen die Erfahrung, dass dies besonders durch die White-Label Option unserer beiden Softwareprodukte gewährleistet wird. Eine Gemeinschaft möchte nicht zu Plattform XY kommen und dort eine Gruppe betreiben, sondern eine eigene Plattform in ihren Namen, nach ihren Bedürfnissen gestalten.

#### Zu komplexe Lösungen

- Gemeinschaften haben oft ähnliche Probleme, brauchen aber teilweise spezielle Lösungen oder nur Teile eine Komplettlösungen. So erscheinen angebotene Lösungen oft zu komplex oder unpassend für das konkrete Problem.

---

## Ziele

### Für das Projekt

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
8. Dokumentation
   * User Docs
   * Admin Docs 
   * Developer Docs
9. Testbetrieb mit Pilotgruppen

- Untersuchung von Gamification von Real-Life-Events

- Menschen wieder im echten Leben in Interaktion bringen
- Unterstützung lokaler Gemeinschaften, da diese Grundlage für lokale Interaktion sind

### Features

Ein **modulares Framework**, das Communities sich nach ihren Bedürfnissen zusammenstellen können:

**Core-Module (immer dabei):**
- Feed (Was passiert in der Gemeinschaft)
- Profile (Wer bin ich, Web-of-Trust-Visualisierung)
- Events (Einladungen, Zusagen)

**Aktivierungs-Module (das Neue):**
- Kalender-Integration (automatisch eintragen, Reminders)
- Geo-Filter (< 5km, Privacy-Zones)
- Web-of-Trust-System (QR/NFC-Scanning)
- Follow-up-Suggestions (aus Gast wird Gastgeber)
