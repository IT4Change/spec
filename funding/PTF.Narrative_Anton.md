# Narativ

## A) Annahmen

### **1. Nutzer & gesellschaftlicher Kontext**

#### **1.1 Gesellschaftliche Entwicklung**

* Große gesellschaftliche Herausforderungen erfordern **lokales, eigenverantwortliches Handeln**.
* Digitale Tools sollten auf die **reale Begegnungen und Gemeinschaft** stärken – nicht ersetzen.

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

* Communities nutzen überwiegend **zentrale Client-Server-Plattformen**, obwohl sie dezentral arbeiten.
* Moderne Ansätze wie **Local-first**, **p2p** und **E2EE** bieten bessere Grundlagen für lokale Selbstorganisation.
* Diese Technologien sind jedoch **noch jung, kaum standardisiert und nicht breit erprobt**.
* Deshalb basieren die meisten real existierenden Tools weiterhin auf **klassischer Client-Server-Infrastruktur**.

#### **2.2 Architektur-Anforderungen**

* Ein Baukasten muss **Backend-agnostisch** sein, um klassische und neue Architekturformen gleichermaßen zu unterstützen.
* Eine **klare Schnittstelle** zwischen Frontend und Backend ist dafür zentral.
* Architektur muss **erweiterbar, modular und austauschbar** sein (Plugins, Module).

#### **2.3 Sicherheit & Identität**

* Nutzer-Identitäten dürfen nicht von zentralen Diensten abhängig sein → **Schlüsselbasierte IDs / DIDs**.
* Private Kommunikation sollte **Ende-zu-Ende verschlüsselt** sein.
* Daten sollen dezentral verwaltbar sein, ohne Abhängigkeit von externen Servern.

#### **2.4 Nutzung & Deployment**

* Communities benötigen **einfach anpassbare Whitelabel-Apps**, ohne technische Hürden.
* Hosting muss flexibel sein (self-hosted, Föderation, später p2p).

---

## B) Projektziele

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

