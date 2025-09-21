# Feed

* Der Feed zeigt Previes von Beiträgen in einer vertikalen Liste
* Der Feed zeigt neben Beiträgen auch automatisch generierte Meldungen
  * Nutzer A ist dem Netzwerk begetreten
  * Beitrag X wurde geupdatet
  * Nutzer Y nimmt an Veranstaltung Z teil

## Sortierung / Algorithmus / Zuammensetzung des Feeds

* Aktualität: Als Nutzer möchte ich Einträge nach ihrem Datum sortieren können, um die neusten Einträge zu sehen.
* Entfernung: Als Nutzer möchte ich Einträge nach der Entfernung von meinem Standort sortieren können, um zu sehen was in meiner Nähe los ist.
* Persönliches Netzwerk: Als Nutzer möchte ich Einträge nach der Enternung im "Social Graph" sortieren können, um zu sehen was in meinem persönlichen Kreis los ist. 


## Verknüfung mit der Karte

* Als Nutzer möchte ich Einträge auf der Karte im Feed gezeigt bekommen, um neue Einträge und Updates zu sehen.
* Beim Klick auf einen Beitrag mit Geostandort wird vom Feed auf die Karte gewechselt
   * die Detailansicht legt sich über die Karte
   * Der entspechende Marker wird auf der Karte zentriert
   * Desktop
      * Die Vorschau aus dem Feed expandiert zur Detailansicht, während sie auf die rechte Bildschirmhälfte (Heroanimation, hält den Fokus) wandert, während gleichzeit im hintergrund auf die karte gewechselt wird
      * Links ist die Karte zu sehen
   * Mobile
      * Sie füllt die unteren 70% des Bildschrims
      * Oben ist die Karte zu sehen

## Layout Ideen

* Einspaltiger Feed für bessere Übersicht
* Beiträge werden über dem Feed geöffnet
* Beiträge haben Kommentare und Antworten auf Kommentare
* Beiträge haben Reaktionen (Herz, Daumen hoch, ... )
* Auf großen Bildschirmen wird der Einträge über den halben Bildschirm angezeigt
    * Bei Einträgen mit Standortdaten, ist eine Karte neben dem Eintrage (Zeigt Standort des Beitrags und alle weiteren geographischen Einträge, die verlinkt sind)
    * Bei Einträgen mit Medien, ist eine Gallery neben dem Eintrag (Zeigt alle Verknüpften Medien)
* Auf mobilen Geräten soll der Eintrag in der Größe geändert werden können. Man kann ihn von unten in die Karte hineinziehen oder rausschieben.


