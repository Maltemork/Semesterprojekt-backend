# Semesterprojekt - Periamma App Backend

### Dette er et Github Repository til backend af semesterprojektet Periamma App. <br>
Github-projektet er deployet til Azure som man kan tilgå med linket: <br>
https://periamma-projekt-app.azurewebsites.net <br>
Fra dette link kan man prøve at tilgå nogle af de routes der er lavet f.eks: <br>
- /sponsors
- /children
- /payments

Det også muligt at opsætte backenden lokalt, men her skal der ændres lidt i koden. <br>
Først skal der installeres node.js via terminalen med kommandoen: <br>
*npm install node* <br>
Da der allerede er angivet dependecies i package.json vil den automatisk installere resten, <br>
som f.eks. express og cors.
For at forbinde til en port skal der laves en .env-fil der indeholder informationerne om databasen. <br>
.env-filen skal indeholde: <br>
<br>
MYSQL_HOST=localhost<br>
MYSQL_USER=PeriammaAdmin<br>
MYSQL_PASSWORD=E#v%eoBcDh5mFqAB4&<br>
MYSQL_DATABASE=periamma-projekt-server.mysql.database.azure.com<br>
<br>
Herefter skal man gå ind i backend.js, hvor man skal ændre parameteren til app.listen(). <br>
I stedet for process.env.PORT, skal der skrives et tilfældigt port som er ledigt. <br>
Der kunne f.eks. bruges porten 8080: app.listen(8080) <br>
Nu kan backend-app'en køre lokalt og startes op gennem terminalen med følgende kommando: <br>
*node ./backend.js*
