## Synchroon
Dit model gebruiken we wanneer een directe respons nodig is, bijvoorbeeld:

- **De Web App** communiceert met de **API Gateway** om data op te vragen.
- **ReviewService** haalt gegevens op bij de **PostService** via **Open-Feign**.

## Asynchroon
Dit model gebruiken we voor events waarbij een directe respons niet nodig is, bijvoorbeeld:

- **PostService** verstuurt events naar de **Event Bus** wanneer er nieuwe posts zijn, zodat **ReviewService** en **CommentService** deze kunnen verwerken.
- **ReviewService** verstuurt events bij goedkeuring of afwijzing van een post. Deze events worden verwerkt door de **PostService** en de **Web App**.
- **CommentService** verstuurt events bij nieuwe reacties, zodat de **PostService** en de **Web App** de updates kunnen verwerken.
