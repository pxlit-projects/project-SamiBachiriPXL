# Fullstack Java Project

## Sami Bachiri (3AONC)

## Folder structure

- Readme.md
- _architecture_: this folder contains documentation regarding the architecture of your system.
- `docker-compose.yml` : to start the backend (starts all microservices)
- _backend-java_: contains microservices written in java
- _demo-artifacts_: contains images, files, etc that are useful for demo purposes.
- _frontend-web_: contains the Angular webclient

Each folder contains its own specific `.gitignore` file.  
**:warning: complete these files asap, so you don't litter your repository with binary build artifacts!**

## How to setup and run this application

:heavy_check_mark:_(COMMENT) Add setup instructions and provide some direction to run the whole  application: frontend to backend._

Eerst kijk je als de pom.xml fatsoenlijk is gelukt.
Je runt daarna de dockercompose van in de backend. Vervolgens start je jouw backend applicatie met de juiste volgorde dat hieronder wordt vermeld:
- config-server
- discovery-service
- gateway-service
- post-service
- review-service
- comment-service

In de frontend build je jouw dockerfile eerst en dan je run de docker file hieronder vindt je de commando's voor het builden en runnen, je moet in de folder zitten van dockerfile 
om deze commando's uit te voeren:
- docker build -t <naam> .
- docker run -p 'port':90 'image_naam'
