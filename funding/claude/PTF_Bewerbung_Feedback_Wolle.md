# PTF Bewerbung - Formular-Format

---

## 1. ALLGEMEINE INFORMATIONEN

### Projekttitel

Real Life Stack – Modularer Baukasten für lokale Vernetzung

Wolle: Schreibweise unterschiedlich

### Name für den Account

Real Life Stack


### Vorname / Name

Anton Tranelis


### E-Mail-Adresse

???


### GitHub-Account (optional)

https://github.com/antontranelis

---

## 2. PROJEKTBESCHREIBUNG (max. 100 Wörter)


Lokale Gemeinschaften brauchen digitale Werkzeuge, die echte Begegnungen fördern statt ersetzen. Der Real Life Stack ist ein Baukasten, mit dem Gruppen ihre eigene App für lokale Vernetzung und Zusammenarbeit gestalten können. Bausteine wie Karte, Kalender, Gruppen, Feed und Profile lassen sich flexibel kombinieren und an Kontexte wie Nachbarschaftsinitiativen, Gemeinschaftsgärten oder Transition-Town-Projekte anpassen.

Mechanismen wie Geo-Filter für den Nahbereich und ein Web-of-Trust, das durch reale Treffen entsteht, unterstützen vertrauensbasierte Kooperation und erhöhen „Meeting-Time“ statt „Screen-Time“.

Die Whitelabel-App kann einfach selbst gehostet werden. Eine klare Schnittstelle zwischen Frontend und Backend ermöglicht heute klassische Server und künftig auch dezentrale, verschlüsselte oder local-first Architekturen.

---
Old Content:

Die Whitelabel-App kann ohne technisches Know-how selbst gehostet werden. **(1)**  
Durch eine klare Schnittstelle zwischen Frontend und Backend entsteht ein Baukasten, der heute mit klassischen Servern arbeitet und morgen dezentrale, verschlüsselte oder local-first Architekturen unterstützen kann. **(2)**

---

Echte Veränderung passiert im echten Leben. Mit dem **Real Life Stack** entwickeln wir einen modularen Baukasten, mit dem Gemeinschaften ihre eigene App für Vernetzung und Zusammenarbeit gestalten können, die konsequent für Vernetzung und Kooperation im echten Leben optimiert sind.  Bausteine wie Karte, Kalender, Gruppen und Profile lassen sich flexibel an unterschiedliche Kontexte anpassen und fördern praktische Kooperation vor Ort.

Gemeinschaften ohne technisches Know-how können eine selbsthostbare Whitelabel-App nutzen. **(1)** Gleichzeitig bildet der Baukasten die Grundlage für zukünftige lokal betriebene oder verschlüsselte Anwendungen, sodass Gruppen Inhalte langfristig sicher und vertrauensbasiert innerhalb ihres eigenen Netzwerks teilen können.**

---
**Feedback**
- **Wolle**:
  - **(1)** Wolle: Wie ist das ohne technisches Know-How zu hosten?
  - **(2)** Wolle: Unklar - nicht verstanden. Abstraktion nicht klar. Wichtige Informationen fehlen, um das zu verstehen. Backend-Agnostisch/Austauschbarkeit benennen.
  - Projektbeschreibung sollte klarer sein.

## 3. GESELLSCHAFTLICHE HERAUSFORDERUNG (max. 175 Wörter)


Große gesellschaftliche Herausforderungen erfordern lokales, eigenverantwortliches Handeln. Doch während die meisten Menschen mehr Zeit online verbringen, nimmt lokale Vernetzung ab. Über 40% der Menschen in Deutschland fühlen sich regelmäßig einsam. Bestehende digitale Plattformen sind primär auf Aufmerksamkeit und Reichweite optimiert, nicht auf lokale Zusammenarbeit und reale Begegnungen.

Gleichzeitig fehlt es an offener digitaler Infrastruktur für lokale Selbstorganisation. Kleine Initiativen, Nachbarschaftsprojekte und Community-Gruppen besitzen meist weder die Ressourcen noch das technische Know-how, um eigene Systeme aufzubauen. Sie sind auf zentrale Plattformen angewiesen, die ihre Daten kontrollieren, Werbung einblenden und Kommunikation nach eigenen Regeln gestalten.

Das Problem ist zweifach: Erstens behindern aktuelle Tools vertrauensbasierte Beziehungen und gemeinsames Handeln in der realen Welt. Zweitens fehlt eine modulare, anpassbare Infrastruktur, die Communities selbstbestimmt nutzen können.

Software kann Menschen nicht ersetzen, aber sie kann lokale Gruppen dabei unterstützen, sich einfacher zu organisieren, ihre Daten zu schützen und reale Begegnungen zu fördern. Genau hier setzt der Real Life Stack an – als Werkzeug, das echte Gemeinschaft stärkt, statt sie zu ersetzen.

---
Old Content:

Software kann zur Lösung beitragen, indem sie lokale Vernetzung technisch unterstützt, Datenhoheit ermöglicht und echte Begegnungen fördert. Genau hier setzt der Real Life Stack an.

---

Viele digitale Werkzeuge fördern vor allem Online-Zeit statt lokale Begegnungen. Die meistgenutzten "sozialen" Apps sind Teil einer Aufmerksamkeitsökonomie, die darauf ausgelegt ist, Nutzer*innen möglichst lange am Bildschirm zu halten. Dadurch ersetzen Nachrichten und Chats häufig reale Treffen, und lokale Beziehungen bleiben auf der Strecke. Gleichzeitig fehlt es an offener digitaler Infrastruktur, die Zusammenarbeit, Vertrauen und reale Begegnungen unterstützt.

Besonders betroffen sind kleinere Initiativen, Projekte und Nachbarschaftsnetzwerke, die weder die Ressourcen noch das technische Know-how besitzen, um eigene Infrastruktur aufzubauen. Für sie wäre ein Werkzeug notwendig, das echte Kooperation unterstützt, vertrauliche Informationen schützt und unabhängig von einzelnen Plattformen funktioniert **(2)**.

Das gesellschaftliche Problem besteht somit aus zwei Teilen: dem Mangel an selbstbestimmten, sicheren Werkzeugen für lokale Zusammenarbeit und der wachsenden Abhängigkeit von zentralen Netzwerken. Durch offene, anpassbare digitale Infrastruktur können Gruppen wieder selbst entscheiden, wie sie sich vernetzen und welche Daten sie teilen. Genau hier setzt unser Projekt an.

---

**Feedback**
- **Wolle**:
  - **(1)** Software einfach nicht einsetzen ist eine Lösung. Muss entkräftet werden. Warum sollte es solche Software geben?
  - **(2)** Unverständlich warum/was/wie unabhängig von einzelnen Plattformen. Was bedeutet das?

## 4. TECHNISCHE UMSETZUNG (max. 175 Wörter)

Der Real Life Stack wird als modularer Frontend-Baukasten in TypeScript mit React oder Vue entwickelt. Er umfasst eigenständige Komponenten für Karte (Leaflet/MapLibre), Kalender (mit iCal-Export)*, Feed, Gruppen und Profile, die sowohl in der Referenzanwendung als auch in eigenen Projekten genutzt werden können.

Alle Komponenten greifen auf eine gemeinsame Daten- und Identitätsschnittstelle im Frontend zu. Diese definiert einheitliche Funktionen zum Laden und Speichern von Daten (Gruppen, Events, Profile, Vertrauensbeziehungen) – unabhängig vom zugrundeliegenden Backend.

Darunter liegt eine schlanke Connector-Struktur: Wir definieren das Muster, nach dem verschiedene Backend-Typen angebunden werden können, und liefern eine erste Implementierung mit. Weitere Connectoren (REST, GraphQL, local-first, p2p) können von der Community entwickelt werden.

Wir stellen zudem eine selbsthostbare Referenz-Implementierung mit einem leichtgewichtigen Node.js-Backend und Docker-Setup bereit, damit Communities ohne technisches Know-how sofort starten können.

Für Identitäten setzen wir auf schlüsselbasierte Accounts, die optional als Decentralized Identifiers (DIDs) abgebildet werden können.


---

Der Real Life Stack wird als modularer Frontend-Baukasten in einem modernen JavaScript-Framework wie React oder Vue entwickelt. Er umfasst eigenständige Komponenten wie Karte, Kalender, Gruppen, Profile und Feed, die sowohl in der mitgelieferten Referenzanwendung als auch in eigenen Projekten eingesetzt werden können.

Alle Komponenten greifen auf eine gemeinsame **Daten- und Identitätsschnittstelle** im Frontend zurück. Diese Schnittstelle definiert einheitliche Funktionen für das Laden und Speichern von Gruppen, Terminen, Profilen oder Vertrauensbeziehungen. Dadurch bleibt die Logik des Baukastens stabil, unabhängig davon, wo die Daten tatsächlich liegen oder wie Identitäten verwaltet werden.


Unterhalb dieser Ebene liegt eine schlanke **Connector-Struktur**: Wir definieren das Muster, nach dem Backends angebunden werden können, und liefern eine erste Implementierung mit. Weitere Connectoren können von Communities oder Entwickler*innen selbst erstellt werden – zum Beispiel für lokal-first-, p2p- oder E2EE-basierte Systeme.

Wir liefern zudem eine **selbsthostbare Referenzimplementierung** mit einem leichtgewichtigen Open-Source-Backend und einem Docker-Setup, damit Gemeinschaften ohne technisches Know-how sofort starten können.**


---

*Ulf: Import & Export
*Wolle: iCal - nicht einheitlich benannt - weiter unten calDAV
**Wolle: Nicht verstanden was Referenzanwendung meint. Warum wird ein Frontend Entwickelt und eine Referenzanwendung fürs Backend? Unklar. Explizit erklären.
(***)Wolle: Die Anforderung an das austauschbares Backend erhöht die Komplexität und den Implementierungsaufwand? Teile der Logik sind im Backend? Ulf: Austauschbarkeit nicht gegeben?
**Wolle: Ohne technisches Know-How -> unrealistisch

## 5. AKTUELLER STAND (max. 100 Wörter)

Das Projekt baut auf zwei bestehenden Open-Source-Ansätzen auf: der [Utopia Map](https://github.com/utopia-os/utopia-map) (seit 2021) – einer kollaborativen Kartenanwendung für selbstorganisierte Gemeinschaften – und [Ocelot Social](https://github.com/Ocelot-Social-Community/Ocelot-Social) (seit 2018), einem selbsthostbaren sozialen Netzwerk. Beide wurden über Jahre weiterentwickelt und verfolgen das gleiche Ziel: reale Begegnungen und lokale Zusammenarbeit zu fördern. Aus diesen Erfahrungen entsteht nun der Real-Life Stack als gemeinsame, modularisierte Weiterführung. Die konzeptionelle Grundlage ist erarbeitet; es existieren bereits ein Repository mit Anforderungs- und Konzeptdokumenten sowie erste Click-Dummy-Prototypen. Der Stack selbst ist noch nicht implementiert und befindet sich in der Vorbereitungsphase.

---

## 6. LINK ZUM PROJEKT (optional)


[https://github.com/IT4Change/spec](https://github.com/IT4Change/real-life-stack)

Ulf: Link noch falsch
---

## 7. INNOVATION (max. 100 Wörter)


Projekte wie Karrot, Bonfire und Mobilizon decken einzelne Aspekte unseres Ansatzes ab: Karrot stärkt Face-to-Face-Aktivitäten, bietet aber keine modulare oder föderierbare Architektur. Bonfire ist modular, jedoch nicht auf hyperlokale Begegnungen oder Geo-Mechanismen ausgerichtet. Mobilizon ermöglicht Events und Gruppen im Fediverse und bietet Ortsfilter, verfügt aber weder über modulare Komponenten noch über eine Geo-Logik für lokale Selbstorganisation.

Der Real Life Stack kombiniert diese Ansätze in einer wiederverwendbaren Infrastruktur: ein modularer Frontend-Baukasten mit einheitlicher Daten- und Identitätsschnittstelle, backend-agnostisch und auf lokale Kooperation optimiert. Geo-Filter und ein Web-of-Trust durch reale Treffen fördern vertrauensbasierte Zusammenarbeit und Datenhoheit.

---
Old - Content

- Karrot fokussiert auf Face-to-Face-Aktivitäten, hat aber keine Federation und keinen modularen Ansatz
- Bonfire bietet modulare Architektur, aber keinen Fokus auf lokale Begegnungen und Geo-Filter
- Mobilizon kombiniert Events und Karte, ist aber monolithisch aufgebaut

Der Real Life Stack vereint erstmals alle Dimensionen: modularer Baukasten + lokaler Fokus + vertrauensbasierte Identität + offene Standards. Statt einer weiteren Plattform schaffen wir wiederverwendbare Infrastruktur. Communities können einzelne Module* nutzen oder die Whitelabel-App selbst hosten – mit voller Datenhoheit und ohne Abhängigkeit von zentralen Diensten.


----


Der Real Life Stack ist der erste modulare Frontend-Baukasten, der radikal auf lokale Begegnungen und gemeinschaftliche Aktivitäten im echten Leben optimiert ist. Statt eine weitere Plattform zu bauen, liefert er wiederverwendbare Komponenten (Karte, Kalender, Gruppen, Feed, Profile) und eine einheitliche Daten- und Identitätsschnittstelle. Projekte wie Mobilizon, Karrot und Bonfire decken einzelne dieser Aspekte ab, sind jedoch monolithisch oder sozialnetzwerk-orientiert. Der Real Life Stack unterscheidet sich durch echte Modularität, Backend-Agnostik, hyperlokalen Fokus und Real-Life-Mechanismen wie Geo-Filter und Web-of-Trust durch physische Treffen. Communities können eigene Apps bauen, selbst hosten und ihre digitale Infrastruktur vollständig kontrollieren.

---

*Wolle: Was ist ein einzelnes Modul? Werden Sachen an und ausgeschaltet? Wie funktioniert das? Wie funktioniert der Baukasten?

## 8. ZIELGRUPPE (max. 100 Wörter)


Primäre Zielgruppen:
- Lokale Initiativen und Nachbarschaftsprojekte (Urban Gardening, Repair-Cafés, Foodsharing-Circles)
- Selbstorganisierte Gemeinschaften (freie Schulen, Solidarische Landwirtschaften, Genossenschaften)
- Progressive Vereine und Transition Towns*

Sekundäre Zielgruppen:
- Entwickler*innen, die Community-Tools bauen wollen
- Organisationen, die lokale Vernetzung ermöglichen

Erreichen der Zielgruppen:
- Direkter Kontakt zu bestehenden Nutzergruppen von Ocelot.social und Utopia Map
- Präsentation auf Open-Source-Konferenzen (FOSDEM, FOSS Backstage)
- Dokumentation und Tutorials für Selbsthoster*innen
- Kooperation mit busFaktor() e.V. und IT4C-Netzwerk


---

*Wolle: Völlig unklar was das ist? "Progressive Vereine und Transition Towns"

## 9. MEILENSTEINE (max. 100 Wörter)


#### M1: Architektur & Grundlagen (Monat 1)
- Definition der Daten- und Identitätsschnittstelle
- Connector-Struktur mit Referenz-Connector
- Projekt-Setup (Monorepo, TypeScript, CI/CD Pipeline inkl. autom. Testing)

#### M2: Kernmodule (Monate 2-4)
- Map-Modul (Leaflet, Geo-Queries, Clustering)
- Kalender-Modul (Events, CalDAV-Integration)
- Feed-Modul (Aktivitäten-Timeline)
- Profile-Modul
- Gruppen-Modul (Membership, Rollen)
- regelmäßige Usability Tests

#### M3: Integration & Referenz-App (Monat 5)
- Whitelabel-Referenz-App mit allen Modulen
- Docker-Setup für Selfhosting
- Admin Dashboard

#### M4: Vorbereitung für Roll-Out und Second Stage (Monat 6)
- Stage/Demo Umgebung einrichten
- Website mit Dokumentation und Tutorials
- User-Testing mit Pilotgruppen
- Integration von Analytics und weitere Metriken


---

## 10. TEAM (max. 30 Wörter)

- **Anton Tranelis** — Projektkoordination, System-Architektur, Full Stack  
  https://github.com/antontranelis

- **Ulf Gebhardt** — Full Stack, DevOps, Infrastruktur  
  https://github.com/ulfgebhardt

- **Sebastian Stein** — Frontend-Entwicklung, UX/UI  
  https://github.com/sebastian2357
  
- **Mathias Lenz** — Qualitätssicherung, Testing, Dokumentation  
  https://github.com/mahula

---

## 11. ERFAHRUNG (max. 100 Wörter)

**Anton Tranelis**:
- [Utopia Map](https://github.com/utopia-os/utopia-map) - Initiator und Maintainer (Projektkoordination, Architektur, Entwicklung, UX)

**Ulf Gebhardt:**
- [Utopia Map](https://github.com/utopia-os/utopia-map) - Entwicklung, Github-Verwaltung, Github-Workflows, Typescript & Typisierungen, Reviews, Hosting der Lösung
- [ocelot.social](https://github.com/Ocelot-Social-Community/Ocelot-Social) - Entwicklung, Testing, Öffentlichkeitsarbeit, Hosting der Lösung, Refactoring, Bumps, Koordinierung der Entwicklung
- [DEMOCRACY App](https://github.com/demokratie-live) - Architektur & Entwicklung

**Sebastian Stein**:
- [ocelot.social](https://github.com/Ocelot-Social-Community/Ocelot-Social) - Entwicklung, UX
- Vairnana - Gründer, Entwicklung, UX (Vairnana war eine App mit Umkreissuche zur Förderung von Nachhaltigkeit im stationäen Einzelhandel)
- [ESD](https://www.keysight.com/de/de/product/SL1091A/sl1091a-scienlab-energy-storage-discover-software.html) - Entwicklung, UX

**Mathias Lenz:**
- [Utopia Map](https://github.com/utopia-os/utopia-map) - Entwicklung, Testautomatisierung, DevOps
- [ocelot.social](https://github.com/Ocelot-Social-Community/Ocelot-Social) - Entwicklung, Testautomatisierung, DevOps, Dokumentation


---

## 12. ARBEITSSTUNDEN

```
1900
```


---

## 13. MOTIVATION (max. 100 Wörter)


Wir erleben täglich, wie lokale Initiativen an fehlenden digitalen Werkzeugen scheitern. Bestehende Plattformen passen nicht zu ihren Bedürfnissen, sind zu komplex oder zu unflexibel. Gleichzeitig fehlt Communities das technische Know-how, eigene Lösungen zu bauen.

Mit Ocelot.social* und Utopia Map haben wir gesehen, dass selbsthostbare, anpassbare Tools funktionieren – aber jedes Projekt muss zu viel selbst entwickeln. Der Real Life Stack ist unsere Antwort: Wir schaffen wiederverwendbare Infrastruktur, die anderen hilft, schneller zu starten.

Uns treibt die Vision einer dezentralen, selbstbestimmten digitalen Welt an, in der Gemeinschaften Kontrolle über ihre Daten haben und Tools nutzen können, die echte Begegnungen fördern.


---

*Wolle: Ocelot.social vorne klein

## 14. SECOND-STAGE-FÖRDERUNG

Ja


---

## 15. SECOND STAGE: SCHWERPUNKT (max. 175 Wörter)

In der Second Stage wollen wir uns intensiv auf die Zusammenarbeit mit realen Communities konzentrieren. Wir arbeiten direkt mit verschiedenen Gruppen zusammen und unterstützen sie bei der Einführung unserer Software und beobachten gemeinsam, wie sie ihn im Alltag nutzen*.

Dabei wollen wir verstehen, welche Funktionen echte Begegnungen, lokale Vernetzung und Kooperation fördern – und welche nicht. Dafür werten wir Metriken zu Aktivität, Vernetzung und Real-Life-Treffen aus, führen Interviews und übersetzen diese Erkenntnisse in weitere Optimierungen des Stacks.

Parallel erforschen wir, ob und wie spielerische Mechanismen wie Quests, Badges und Fortschrittsanzeigen Menschen motivieren, neue Kontakte zu knüpfen, Treffen zu organisieren oder an ihnen teilzunehmen sowie eigene Gruppen und Projekte zu starten.

Wir entwickeln ein Playbook für neue Communities – mit Hosting-Guides, einfachen Einstiegsmaterialien und einer Roadmap, die zeigt, wie Gruppen den Stack einsetzen, anpassen und erweitern können.

Wir bereiten unsere Ergebnisse in Tutorials, Blogbeiträgen, Videos und Interviews so auf, dass weitere Communities inspiriert werden. Damit schaffen wir eine stabile Grundlage, auf der Communities den Real-Life Stack** eigenständig nutzen und gemeinsam mit ihm wachsen können.

---

*Wolle: "wie sie ihn im Alltag nutzen" - falschen Pronomen? "wie sie sie im Alltag nutzen"
** Wolle: "Real-Life Stack" einheitliche Schreibweise

## 16. SECOND STAGE: MEILENSTEINE (max. 100 Wörter)

#### M1: Community-Onboarding & Testing (Monate 7-8)

* 3 Pilot-Communities onboarden (Nachbarschaft, Bildung, Ressourcen-Sharing)
* Stage-1-Prototypen deployen und im Real-World-Einsatz begleiten
* Metriken erfassen: Nutzungsverhalten, Vernetzungsdynamik, Real-Life Begegnungen*, Commitment-Gap

*Wolle: Schreibweise?

#### M2: Iteration & Skalierung (Monat 9)

* Learnings aus M1 in Produkt integrieren
* 3-5 weitere Communities onboarden (Self-Service mit Dokumentation)
* Best-Practices dokumentieren (Admin-Guides, Community-Building-Playbooks)

#### M3: Impact & Nachhaltigkeit (Monat 10)
* Impact-Report: Welche Aktivierungs-Mechanismen funktionieren?
* Sustainability-Strategie (Community-Support-Modell, Post-Förderungs-Roadmap)
* Conference-Präsentationen (z.B. FOSDEM, GPN, Bits & Bäume)
* Öffentlichkeitsarbeit (Tutorials, Videos, Blog, Interviews)

---

## 17. BESTÄTIGUNGEN

```
✅ Ich habe die Checkliste für Bewerber*innen gelesen.

✅ Ich bin über 18 Jahre alt und habe meinen Hauptwohnsitz in Deutschland.

✅ Ich bin damit einverstanden, die Projektergebnisse unter einer Open-Source-Lizenz 
   (MIT oder Apache 2.0) öffentlich zugänglich über GitHub zur Verfügung zu stellen.
```

---

## LETZTE PRÜFUNG VOR EINREICHUNG

- [ ] Alle Teammitglieder haben zugestimmt
- [ ] E-Mail-Adresse ist korrekt und wird regelmäßig gecheckt
- [ ] GitHub-Links funktionieren
- [ ] Externe Person hat Bewerbung gelesen
- [ ] Lizenz wurde im Team entschieden (MIT empfohlen)
- [ ] Projekttitel wurde final bestätigt
