# Uni-Mensa: csv-2-json

Das Studentenwerk Niederbayer/Oberpfalz stellt den Speiseplan der Uni Mensa als CSV-Datei zum Download bereit. Für die Verwendung dieser Daten in einer eigenen Anwendungen ist eine (aufbereitete) Repräsentation im JSON-Format oft leichter verarbeitbar. Über die CSV2JSON-Bridge können Sie die Speisepläne der Uni Mensa im JSON-Format über eine REST-Schnittstelle beziehen. Die Speiseplänge werden täglich mit dem Server des Studentenwerks abgeglichen und können für jeden Tag der aktuellen Woche einzeln abgerufen werden. Das zurückgelieferte JSON besteht aus einem Array, in dem alle verfügbaren Hauptgerichte, Suppen, Beilagen und Desserts des entsprechenden Tags als einzelne Objekte formatiert sind. Über die Eigenschaften der Objekte kann auf deren Beschreibung, Kategorie, Preis und Labels zugegriffen werden.

## Build

Run `npm install` to install dependencies and prepare the data folder. All required node modules are copied to `api/node_modules`.

Run `npm run create-certs` to create SSL certificates to serve the API via HTTPS. `openssl` has to be installed on the host machine.

## Run

To start the node server (distributing the rest interface) run `npm start`

## Usage
```
http://{{server url}}/mensa/uni/{{day}}
{{day}}: mo || di || mi || do || fr
Speiseplan für Montag der aktuellen Woche:https://regensburger-forscher.de:9001/mensa/uni/mo
```

## Response
```
[
            {
                "name":"Feine Kräutersuppe",
                "day":"Mo",
                "category":"Suppe",
                "labels":"V",
                "cost":
                    {
                        "students":"0,60",
                        "employees":"0,80",
                        "guests":"1,30"
                    },
                "id": 50,
                "upvotes": 7,
                "downvotes": 2
            },

            {
                "name":"Grüne Nudeln mit Gorgonzola",
                "day":"Mo",
                "category":"HG1",
                "labels":"V",
                "cost":
                    {
                        "students":"1,90",
                        "employees":"2,70",
                        "guests":"3,50"
                    },

                "id": 12,
                "upvotes": 12,
                "downvotes": 1
            },
 ... ]

```
