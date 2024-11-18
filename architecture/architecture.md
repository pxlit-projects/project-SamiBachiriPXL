# Architecture

## Client Applicaties
- **Web App (Angular):**  
  De front-end van het platform is ontwikkeld met Angular. Hier kunnen gebruikers en redacteurs eenvoudig gebruikmaken van alle functionaliteiten die het platform te bieden heeft.

## API Gateway
- **API Gateway:**  
  De API Gateway is het centrale toegangspunt voor de Web App naar de backend-services. Het zorgt ervoor dat verzoeken bij de juiste microservices terechtkomen en biedt daarnaast extra beveiliging en een betere controle over het verkeer tussen de frontend en de backend.

## Discovery Service
- **Discovery Service:**  
  Het zorgt ervoor dat microservices zichzelf automatisch kunnen registreren en ontdekken. Hierdoor kunnen nieuwe services eenvoudig worden toegevoegd en bestaande services bijgewerkt worden, zonder dat hiervoor handmatige aanpassingen in de configuratie nodig zijn. Dit maakt het systeem flexibeler en makkelijker om bij te houden.
---

## Cloud Services (Microservices)

- **AuthService:**  
  Deze service zorgt voor de beveiliging van het platform door gebruikers te authenticeren en te autoriseren. Het regelt het inlogproces en beheert wie toegang heeft tot welke functies. Alle gebruikersgegevens worden opgeslagen in een MySQL-database.

- **PostService:**  
  Deze service stelt redacteurs in staat om nieuwe posts te maken en bestaande posts aan te passen. De gegevens van de posts worden opgeslagen in een eigen MySQL-database, zodat alles goed georganiseerd blijft.

- **ReviewService:**  
  Deze service maakt het mogelijk voor redacteurs om posts goed te keuren of af te wijzen. Het werkt samen met de PostService via Open-Feign, zodat postgegevens efficiënt kunnen worden opgehaald zonder logica te dupliceren.

- **CommentService:**  
  Via deze service kunnen gebruikers reacties achterlaten op posts. De service zorgt ervoor dat reacties goed worden beheerd en opgeslagen in een aparte MySQL-database, zodat alles overzichtelijk blijft.

---

## Configuratie en Berichtenuitwisseling

- **Config Service:**  
  Deze service zorgt voor het beheer van gedeelde instellingen die door alle microservices worden gebruikt, zoals bijvoorbeeld logniveaus. Dit maakt het makkelijker om belangrijke configuraties centraal te beheren.

- **Event Bus:**  
  De Event Bus zorgt ervoor dat microservices met elkaar kunnen communiceren door berichten uit te wisselen. Dit maakt het mogelijk voor de services om onafhankelijk van elkaar te reageren op gebeurtenissen, zoals wanneer een nieuwe post wordt gepubliceerd.

---

## Communicatie en Loggen

- **Open-Feign:**  
  Open-Feign maakt asynchrone communicatie tussen microservices mogelijk, bijvoorbeeld tussen de PostService en ReviewService. Dit zorgt ervoor dat de communicatie efficiënter verloopt, zonder dat het prestaties van de services negatief beïnvloedt, en maakt de architectuur modulairder.

- **Message Bus:**  
  De Message Bus maakt asynchrone communicatie tussen microservices mogelijk, wat helpt om directe afhankelijkheden te vermijden. Hierdoor kunnen microservices elkaar niet blokkeren en blijven ze flexibel.
  - **PostService:** Verstuurt berichten naar de Event Bus wanneer posts worden aangemaakt, aangepast, goedgekeurd of afgewezen.
  - **ReviewService:** Verzendt meldingen naar de Event Bus wanneer posts worden goedgekeurd of afgewezen.
  - **CommentService:** Stuur berichten wanneer er nieuwe reacties worden geplaatst of bestaande reacties worden aangepast, zodat andere services, zoals de PostService, notificaties kunnen versturen.

- **LogBack:**  
  LogBack wordt in elke microservice gebruikt om loggegevens vast te leggen, zowel op het scherm als in bestanden. Dit maakt het eenvoudiger om problemen op te sporen en het systeem te monitoren.

---