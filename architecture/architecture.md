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
  Gebruikers kunnen reacties plaatsen op posts via deze service, die verantwoordelijk is voor het beheer en de opslag van reacties in een eigen MySQL-database.

---

## Configuratie en Berichtenuitwisseling

- **Config Service:**  
  Beheert gedeelde configuratie-instellingen voor alle microservices, zoals logniveaus en database-URL's.

- **Event Bus:**  
  Zorgt voor de uitwisseling van berichten tussen microservices, waardoor ze onafhankelijk kunnen reageren op gebeurtenissen (zoals het publiceren van een post).

---

## Communicatie en Loggen

- **Open-Feign:**  
  Voor asynchrone communicatie tussen microservices, zoals de PostService en ReviewService. Dit verhoogt de modulariteit en zorgt voor efficiënte communicatie zonder prestatieverlies.

- **Message Bus:**  
  Maakt asynchrone communicatie tussen microservices mogelijk om directe afhankelijkheden te vermijden.
  - **PostService:** Stuurt berichten naar de Event Bus bij het aanmaken, aanpassen, goedkeuren of afwijzen van posts.
  - **ReviewService:** Verzendt meldingen over goedkeuringen of afwijzingen van posts.
  - **CommentService:** Stuurt berichten bij nieuwe of gewijzigde reacties, zodat andere services zoals de PostService notificaties kunnen beheren.

- **LogBack:**  
  Geïmplementeerd in elke microservice voor het loggen van informatie op het scherm en in bestanden, wat debugging en monitoring vereenvoudigt.

---

## Testdekking

- **Backend:**  
  Er wordt een testdekking van 70% vereist, met focus op unit- en integratietests om de belangrijkste functionaliteiten te valideren.

- **Frontend:**  
  De testdekking moet 50% bedragen, waarbij cruciale UI-componenten en functies worden getest.

---