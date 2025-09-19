# Input Formular

* Als Nutzer möchte ich Einträge verschiedener Art posten können (Posts, Veranstaltungen, Gruppe, Angebote oder Nachfragen)

* Als Nutzer möchte ich unterschiedliche Angaben beim Erstellen eines Eintrags machen können:
   * Titel
   * Text
   * Ort
   * Medien
   * Datum
   * Menschen
   * Tags / Kategorie
* Als Nutzer würe ich gerne eine Vorschau meines Beitrags ansehen können
* Als Nutzermöchte ich sehen, wie mein Beitrag später im Feed aussieht (Teaser)
* Als technisch nicht versierter Nutzer möchte ich nicht durch unnötige Button irritiert werden
* Als Nutzer möchte ich einen Standort auf der Karte auswählen können
* Als Nutzer möchte ich einen Standort nach seiner Adresse oder Koordinaten finden können
* Ich möchte den Typ meines Eintrags während des Erstellen ändern können (z.B. einen Post beim Erstellen  zu einem Event machen)
* Ich möchte den Typ meines Eintrags später ändern können (z.B. einen Post nachträglich zu einem Event machen)

* Als Nutzer möchte ich eine öffentlichen Beitrag erstellen können, damit ich den Link verteilen kann und jeder ihn direkt sehen kann.
* Als Nutzer möchte ich einen privaten Post erstellen können, den nur meine Kontakte sehen können, wenn sie eingeloggt sind.

One approach to think about the platform we want to create is to figure out what kind of Data the users want to put into it.
This document describes different user stories in how and why certain users want to contribute certain content.

After an story based description, the document lists all types of content, including implicit content like authorship and in what combinations those datasets occur.

## User stories

### US01 - Funny Video
An user wants to post a Video he just found on the Internet. He downloaded the video and reuploads it on the platform.
E.g. "Funny Cat Video.wmv"

### US02 - Article
An user wants to publish an article about a topic he currently is researching. He provides a title image, a title and text including images.
E.g. "Article about Black Holes"

### US03 - Question
An user is new and just wants to ask a simple question. He provides the question as text.
E.g. "Am I in the right place here?"

### US04 - Online-Event
An user wants to promote an online video call event in the future. He provides a location link, a title image, a title, a date+timespan & a description text 
E.g. "My new Breathwork Coaching Season has started"

### US05 - Offline-Event
An user wants to promote a gathering event in the future. He provides a location position, a title image, a title, a date+timespan & a description text 
E.g. "Join our IT4C Meetup Event in Kassel"

### US06 - Short News
An user wants to promote a recent development in his life without a lot of details. He provides an Text and sometimes he would also provide an image.
E.g. "I got my drivers license"

### US07 - Reminder
The system reminds all users of a short fact. Provides a text and possibly an related user.
E.g. "Peter has birthday today"

### US08 - Location
An user provides location information for a thing. He descries the thing with a short text.
E.g. "Apple tree"

### US09 - Past Event
An user describes an event which had taken place. He provides a location position. a title video, a title, a data+timespan in the past, a description text with lots of images and a list of users who have participated in that event.
E.g. "Around he Fire - last weekend was wonderful"

### US10 - Event gets an update
An user has posted about an event in the past and now wants to post an update with images, statement about how the event was and list of participants. The images and statement should inform all users again about this event.
E.g. "The fire was wonderful - look at all those happy faces"

### US11 - Call to Action
An user wants to promote some link and urges others to click his link. He provides an CTA Link, Title, Title Image, Text with embeded Video and Product Images
E.g. "Buy the new beauty products from SkinCancerTM"

## Data

This table describes which data is provided by the user for each user story above. It also defines wether this input is implicit or explicit and how the input is received

| Data              | Implicit | Method              | US01 | US02 | US03 | US04 | US05 | US06 | US07 | US08 | US09 | US10 | US11 |
|-------------------|----------|---------------------|----- |------|------|------|------|------|------|------|------|------|------|
| Title Video       | No       | File Upload         | x    |      |      |      |      |      |      |      | x    |      |      |
| Title Image       | No       | File Upload         |      | x    |      | x    | x    | -    |      |      |      | x    | x    |
| Title Text        | No       | Input Text          |      | x    |      | x    | x    |      |      |      | x    | x    | x    |
| Text              | No       | Input Text          |      |      | x    | x    | x    | x    | x    | x    |      | x    |      |
| Text w. Images    | No       | Input + File Upload |      | x    |      |      |      |      |      |      | x    |      | x    |
| Text w. Video emb.| No       | Input Text          |      |      |      |      |      |      |      |      |      |      | x    |
| Images            | No       | File Upload         |      |      |      |      |      |      |      |      |      | x    | x    |
| Date+Timespan     | No       | Input Calendar      |      |      |      | x    | x    |      |      |      | x    | x    |      |
| Location Link     | No       | Input Link          |      |      |      | x    |      |      |      |      |      |      |      |
| Location Position | No       | Input Link          |      |      |      |      | x    |      |      | x    | x    | x    |      |
| User Related      | No       | Input User          |      |      |      |      |      |      | -    |      | x    | x    |      |
| Update            | No       | ???                 |      |      |      |      |      |      |      |      |      | x    |      |
| CTA               | No       | Input Link          |      |      |      |      |      |      |      |      |      |      | x    |
| Author            | Yes      | Token               | x    | x    | x    | x    | x    | x    | x    | x    | x    | x    | x    |
| Date              | Yes      | Servertime          | x    | x    | x    | x    | x    | x    | x    | x    | x    | x    | x    |
