# Info over nextjs
### Opstarten

Om de nextjs omgeving op te starten run je:

```bash
npm install

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) In je browser om het resultaat te zien.
### Informatie
Als je meer informatie wil zien over de API, zie: https://assessment.notanumber.digital/

In deze repo vind je alle pagina's in de map `/app`. 

Compontenten die gebruik worden staan in de map `/components`. 

Er staan al 2 standaard pagina's klaar, een overzichtspagina met een tabel en een detail pagina met een formulier.

Wij gebruiken tailwind standaard als manier van stylen. Maar het is ook mogelijk om normaal scss te gebruiken, zie `MainLayout.js` en `MainLayout.module.scss` voor een voorbeeld

### Meer leren

Om meer te leren over Next.js, bekijk de volgende bronnen:

- [Next.js Documentatie](https://nextjs.org/docs) - leer over Next.js functies en API.
- [Leer Next.js](https://nextjs.org/learn) - een interactieve Next.js tutorial.

# Assessment:
### Als Not a Number wil ik in een overzicht de belangrijkste gegevens van mijn producten kunnen zien.
Acceptatie criteria:
- Tabel met de volgende velden:
    - Naam
    - Kleur
    - Prijs
    - Omschrijving
- Als je op een regel klikt moet hij naar het detail gaan.
- Er moet gebruik worden gemaakt van de flowbite tabel: https://www.flowbite-react.com/docs/components/table
- De gegevens van alle products kunnen worden opgehaald met een GET request naar https://assessment.notanumber.digital/api/products/
- Zie https://assessment.notanumber.digital/docs/api#/operations/product.getAll voor de documentatie van het endpoint

### Als Not a number wil ik op een pagina alle details van een enkel product kunnen inzien.
Acceptatie criteria:
-  Elk product moet een eigen pagina hebben.
-  Alle details van het product moeten inzichtelijk zijn
-  De gegevens van een product kunnen worden opgehaald met een GET request naar https://assessment.notanumber.digital/api/products/{product_id} (voorbeeld: https://assessment.notanumber.digital/api/products/15)
-  Zie https://assessment.notanumber.digital/docs/api#/operations/product.get voor de documentatie van het endpoint


### Als Not a number wil ik de gegevens van een product kunnen bewerken
Acceptatie criteria:
- Alle velden moet te bewerken zijn in een formulier
- Alle velden kan je inschieten door middel van een POST request naar https://assessment.notanumber.digital/api/products/{product_id}
- De categorie moet een van de volgende waardes hebben: "Fiets", "Auto", "Motor", "Bus"
- Zie https://assessment.notanumber.digital/docs/api#/operations/product.update voor de documentatie van het endpoint


