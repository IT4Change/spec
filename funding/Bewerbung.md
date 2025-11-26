# :pencil: **Entwurf: Prototype-Fund-Bewerbung**

## 1. Projekttitel

**Real Life Stack**: Modularer Baukasten für lokale Vernetzung

## **2. Projektbeschreibung (max. 100 Wörter)**

Echte Veränderung passiert im echten Leben — doch viele digitale Werkzeuge fördern vor allem Online-Zeit statt lokale Begegnungen.

Mit dem **Real Life Stack** entwickeln wir einen modularen Baukasten, mit dem Gemeinschaften ihre eigene App für Vernetzung und Zusammenarbeit gestalten können. Bausteine wie Karte, Kalender, Gruppen und Profile lassen sich flexibel an unterschiedliche Kontexte anpassen und fördern praktische Kooperation vor Ort.

Gemeinschaften ohne technisches Know-how können eine selbsthostbare Whitelabel-App nutzen. Gleichzeitig bildet der Baukasten die Grundlage für zukünftige lokal betriebene oder verschlüsselte Anwendungen, sodass Gruppen Inhalte langfristig sicher und vertrauensbasiert innerhalb ihres eigenen Netzwerks teilen können.


---

## **3. Gesellschaftliche Herausforderung (max. 175 Wörter)**

Echte Veränderung passiert im echten Leben — doch viele digitale Werkzeuge fördern vor allem Online-Zeit statt lokale Begegnungen. Die meistgenutzten "sozialen" Apps sind Teil einer Aufmerksamkeitsökonomie, die darauf ausgelegt ist, Nutzer*innen möglichst lange am Bildschirm zu halten. Dadurch ersetzen Nachrichten und Chats häufig reale Treffen, und lokale Beziehungen bleiben auf der Strecke. Gleichzeitig fehlt es an offener digitaler Infrastruktur, die Zusammenarbeit, Vertrauen und reale Begegnungen unterstützt.

Besonders betroffen sind kleinere Initiativen, Projekte und Nachbarschaftsnetzwerke, die weder die Ressourcen noch das technische Know-how besitzen, um eigene Infrastruktur aufzubauen. Für sie wäre ein Werkzeug notwendig, das echte Kooperation unterstützt, vertrauliche Informationen schützt und unabhängig von einzelnen Plattformen funktioniert.

Das gesellschaftliche Problem besteht somit aus zwei Teilen: dem Mangel an selbstbestimmten, sicheren Werkzeugen für lokale Zusammenarbeit und der wachsenden Abhängigkeit von zentralen Netzwerken. Durch offene, anpassbare digitale Infrastruktur können Gruppen wieder selbst entscheiden, wie sie sich vernetzen und welche Daten sie teilen. Genau hier setzt unser Projekt an.

---

## **4. Technische Umsetzung (max. 175 Wörter)**

Der Real Life Stack wird als modularer Frontend-Baukasten in einem modernen JavaScript-Framework wie React oder Vue entwickelt. Er umfasst eigenständige Komponenten wie Karte, Kalender, Gruppen, Profile und Feed, die sowohl in der mitgelieferten Referenzanwendung als auch in eigenen Projekten eingesetzt werden können.

Alle Komponenten greifen auf eine gemeinsame **Daten- und Identitätsschnittstelle** im Frontend zurück. Diese Schnittstelle definiert einheitliche Funktionen für das Laden und Speichern von Gruppen, Terminen, Profilen oder Vertrauensbeziehungen. Dadurch bleibt die Logik des Baukastens stabil, unabhängig davon, wo die Daten tatsächlich liegen oder wie Identitäten verwaltet werden.

Unterhalb dieser Ebene liegt eine schlanke **Connector-Struktur**: Wir definieren das Muster, nach dem Backends angebunden werden können, und liefern eine erste Implementierung mit. Weitere Connectoren können von Communities oder Entwickler*innen selbst erstellt werden – zum Beispiel für lokal-first-, p2p- oder E2EE-basierte Systeme.

Wir liefern zudem eine **selbsthostbare Referenzimplementierung** mit einem leichtgewichtigen Open-Source-Backend und einem Docker-Setup, damit Gemeinschaften ohne technisches Know-how sofort starten können. Eine **schlüsselbasierte Identitätsebene** und ein **Web-of-Trust-Modell** schaffen die Grundlage für vertrauensbasierte Zusammenarbeit und dafür, dass sensible Inhalte bei Bedarf Ende-zu-Ende verschlüsselt geteilt werden können.
